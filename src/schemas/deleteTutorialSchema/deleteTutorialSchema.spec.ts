import { deleteTutorialSchema } from "./deleteTutorialSchema";

describe("deleteTutorialSchema", () => {
  describe("when the params are valid", () => {
    it("parses it without errors", () => {
      expect(() => deleteTutorialSchema.parse({ params: { id: "1" } })).not.toThrow();
    });
  });

  describe.each`
    params                | expectedError
    ${null}               | ${"Expected object, received null"}
    ${{}}                 | ${"id is required"}
    ${{ id: "a string" }} | ${"id must be a number"}
  `("when the params = '$params' it throws '$expectedError'", ({ params, expectedError }) => {
    it("fails to parse it", () => {
      expect(() => deleteTutorialSchema.parse({ params })).toThrow(expectedError);
    });
  });
});

export default {};
