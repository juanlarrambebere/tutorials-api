import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { authenticateUser, decodeAccessToken } from "./authService";

jest.mock("argon2", () => ({
  verify: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe("authService", () => {
  describe("authenticateUser", () => {
    afterEach(jest.clearAllMocks);

    describe("when no user with the given email exists", () => {
      beforeEach(() => jest.spyOn(User, "findOne").mockResolvedValueOnce(null));

      it("returns null", async () => {
        const accessToken = await authenticateUser("email", "password");

        expect(accessToken).toBeNull();
      });
    });

    const user = {
      email: "email",
      password: "the hashed password",
      update: jest.fn(),
    } as unknown as User;

    describe("when the password is not the right one", () => {
      beforeEach(() => {
        jest.spyOn(User, "findOne").mockResolvedValueOnce(user);
        jest.mocked(argon2.verify).mockResolvedValueOnce(false);
      });

      it("returns null", async () => {
        const accessToken = await authenticateUser("email", "password");

        expect(accessToken).toBeNull();
      });
    });

    describe("when the user exists and the password is the right one", () => {
      const mockedAccessToken = "the access token";

      beforeEach(() => {
        jest.spyOn(User, "findOne").mockResolvedValueOnce(user);
        jest.mocked(argon2.verify).mockResolvedValueOnce(true);
        jest.mocked(jwt.sign).mockImplementationOnce(() => mockedAccessToken);
      });

      it("returns an access token for the user", async () => {
        const accessToken = await authenticateUser("email", "password");

        expect(accessToken).toEqual(mockedAccessToken);
      });

      it("stores the access token in the database", async () => {
        const accessToken = await authenticateUser("email", "password");

        expect(user.update).toHaveBeenCalledTimes(1);
        expect(user.update).toHaveBeenCalledWith({ accessToken });
      });
    });
  });

  describe("decodeAccessToken", () => {
    afterEach(jest.clearAllMocks);

    const encodedAccessToken = "the encoded access token";

    describe("when the token can't be verified", () => {
      beforeEach(() => {
        jest.mocked(jwt.verify).mockImplementationOnce(() => {
          throw new Error("Token can't be verified");
        });
      });

      it("it returns null", async () => {
        const decodedToken = await decodeAccessToken(encodedAccessToken);

        expect(decodedToken).toBeNull();
      });
    });

    const user = {
      id: 1,
      role: "user",
      update: jest.fn(),
    } as unknown as User;

    describe("when the token is verified, but the user doesn't exist", () => {
      beforeEach(() => {
        jest.mocked(jwt.verify).mockImplementationOnce(() => ({
          userId: user.id,
          role: user.role,
          signedAt: new Date(),
        }));

        jest.spyOn(User, "findByPk").mockResolvedValueOnce(null);
      });

      it("it returns null", async () => {
        const decodedToken = await decodeAccessToken(encodedAccessToken);

        expect(decodedToken).toBeNull();
      });
    });

    describe("when the token is verified, the user exists but it's not their latest token ", () => {
      beforeEach(() => {
        jest.mocked(jwt.verify).mockImplementationOnce(() => ({
          userId: user.id,
          role: user.role,
          signedAt: new Date(),
        }));

        jest.spyOn(User, "findByPk").mockResolvedValueOnce({ ...user, accessToken: "another token" } as User);
      });

      it("it returns null", async () => {
        const decodedToken = await decodeAccessToken(encodedAccessToken);

        expect(decodedToken).toBeNull();
      });
    });

    describe("when the token is verified, the user exists and happens to be their latest token", () => {
      const accessToken = {
        userId: user.id,
        role: user.role,
        signedAt: new Date(),
      };

      beforeEach(() => {
        jest.mocked(jwt.verify).mockImplementationOnce(() => accessToken);

        jest.spyOn(User, "findByPk").mockResolvedValueOnce({ ...user, accessToken: encodedAccessToken } as User);
      });

      it("it decodes the token correctly", async () => {
        const decodedToken = await decodeAccessToken(encodedAccessToken);

        expect(decodedToken).toEqual(accessToken);
      });
    });
  });
});

export default {};
