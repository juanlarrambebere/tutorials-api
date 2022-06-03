import { createUserSchema } from "./createUserSchema";

describe("createUserSchema", () => {
  describe.each`
    body
    ${{ name: "user1", lastName: "last name", email: "user2.lastname@gmail.com", password: "a1Aaaaa%", role: "admin" }}
  `("when the body = '$body'", ({ body }) => {
    it("parses it without errors", () => {
      expect(() => createUserSchema.parse({ body })).not.toThrow();
    });
  });

  describe.each`
    body                                                                                             | expectedError
    ${null}                                                                                          | ${"Expected object, received null"}
    ${{}}                                                                                            | ${"name is required"}
    ${{ name: "name" }}                                                                              | ${"lastName is required"}
    ${{ name: "name", lastName: "lastName" }}                                                        | ${"email is required"}
    ${{ name: "name", lastName: "lastName", email: "invalid email" }}                                | ${"email must be a valid email"}
    ${{ name: "name", lastName: "lastName", email: "name@gmail.com", password: "Short%1" }}          | ${"password must contain at least one number, one uppercase and one lowercase letter, one special character and at least 8 characters long"}
    ${{ name: "name", lastName: "lastName", email: "name@gmail.com", password: "nocapitals%12" }}    | ${"password must contain at least one number, one uppercase and one lowercase letter, one special character and at least 8 characters long"}
    ${{ name: "name", lastName: "lastName", email: "name@gmail.com", password: "noSpecialChars32" }} | ${"password must contain at least one number, one uppercase and one lowercase letter, one special character and at least 8 characters long"}
    ${{ name: "name", lastName: "lastName", email: "name@gmail.com", password: "noNumbers@@" }}      | ${"password must contain at least one number, one uppercase and one lowercase letter, one special character and at least 8 characters long"}
  `("when the body is '$body' it throws '$expectedError'", ({ body, expectedError }) => {
    it("fails to parse it", () => {
      expect(() => createUserSchema.parse({ body })).toThrow(expectedError);
    });
  });
});

export default {};
