import { Request, Response } from "express";
import { UnauthorizedError } from "../../errors";
import { authenticateUser } from "../../services/authService";
import { authHandler } from "./authController";

jest.mock("../../services/authService", () => ({
  authenticateUser: jest.fn(),
}));

describe("authController", () => {
  describe("authHandler", () => {
    const request = {
      body: {
        email: "email",
        password: "password",
      },
    } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const next = jest.fn();

    afterEach(jest.clearAllMocks);

    describe("when the user credentials are valid", () => {
      const accessToken = "a valid access token";

      beforeEach(() => {
        jest.mocked(authenticateUser).mockResolvedValueOnce(accessToken);
      });

      it("ends the request with status = 200 OK and sends the access token", async () => {
        const token = await authHandler(request, response, next);

        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);

        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(
          expect.objectContaining({
            accessToken,
          })
        );
      });
    });

    describe("when the user credentials are not valid", () => {
      beforeEach(() => {
        jest.mocked(authenticateUser).mockResolvedValueOnce(null);
      });

      it("calls the next middleware in the chain with an error indicating the user is not authorized", async () => {
        await authHandler(request, response, next);

        expect(response.status).not.toHaveBeenCalled();
        expect(response.json).not.toHaveBeenCalled();

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(new UnauthorizedError("Invalid credentials"));
      });
    });

    describe("when something unexpected fails while validating the user's credentials", () => {
      const unexpectedError = new Error("Something unexpected happened");

      beforeEach(() => {
        jest.mocked(authenticateUser).mockRejectedValue(unexpectedError);
      });

      it("forwards the error to next middleware in the chain", async () => {
        await authHandler(request, response, next);

        expect(response.status).not.toHaveBeenCalled();
        expect(response.json).not.toHaveBeenCalled();

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(unexpectedError);
      });
    });
  });
});

export default {};
