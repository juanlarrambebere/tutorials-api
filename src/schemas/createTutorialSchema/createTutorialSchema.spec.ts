import { createTutorialSchema } from "./createTutorialSchema";

describe("createTutorialSchema", () => {
  describe.each`
    body
    ${{ title: "title", videoUrl: "http://www.domain.com/title", description: "description", status: "published" }}
    ${{ title: "title", videoUrl: "http://www.domain.com/title", description: "description" }}
    ${{ title: "title", videoUrl: "http://www.domain.com/title" }}
    ${{ title: "title" }}
  `("when body = '$body'", ({ body }) => {
    it("parses it without errors", () => {
      expect(() => createTutorialSchema.parse({ body })).not.toThrow();
    });
  });

  describe.each`
    body                                           | expectedError
    ${null}                                        | ${"Expected object, received null"}
    ${{}}                                          | ${"title is required"}
    ${{}}                                          | ${"title is required"}
    ${{ title: "title", videoUrl: "invalid url" }} | ${"videoUrl must be a valid url"}
  `("when the body = '$body' it throws '$expectedError'", ({ body, expectedError }) => {
    it("fails to parse it", () => {
      expect(() => createTutorialSchema.parse({ body })).toThrow(expectedError);
    });
  });
});

export default {};
