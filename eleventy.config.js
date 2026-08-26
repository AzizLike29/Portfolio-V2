/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addFilter("hasCategory", (projects, category) => {
    if (!Array.isArray(projects)) return [];
    if (category === "all") return projects;
    return projects.filter(
      (p) => Array.isArray(p.categories) && p.categories.includes(category)
    );
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "html", "md"],
  };
}
