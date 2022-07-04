module.exports = {
  process() {
    return { code: "" };
  },
  getCacheKey() {
    // The output is always the same.
    return "svgTransform";
  },
};
