import { createTutorialSchema } from "./createTutorialSchema";

describe("createTutorialSchema", () => {
  describe.each`
    title      | videoUrl                         | description      | status
    ${"title"} | ${"http://www.domain.com/title"} | ${"description"} | ${"published"}
    ${"title"} | ${"http://www.domain.com/title"} | ${"description"} | ${undefined}
    ${"title"} | ${"http://www.domain.com/title"} | ${undefined}     | ${undefined}
    ${"title"} | ${undefined}                     | ${undefined}     | ${undefined}
  `("when the input is well formed", ({ title, videoUrl, description, status }) => {
    it("parses it without errors", () => {
      expect(() =>
        createTutorialSchema.parse({
          body: {
            title,
            videoUrl,
            description,
            status,
          },
        })
      ).not.toThrow();
    });
  });

  describe.each`
    body                                           | expectedError
    ${null}                                        | ${"Expected object, received null"}
    ${{}}                                          | ${"title is required"}
    ${{}}                                          | ${"title is required"}
    ${{ title: "title", videoUrl: "invalid url" }} | ${"videoUrl must be a valid url"}
  `("when the body is '$body' it throws '$expectedError'", ({ body, expectedError }) => {
    it("fails to parse it", () => {
      expect(() => createTutorialSchema.parse({ body })).toThrow(expectedError);
    });
  });
});

export default {};
