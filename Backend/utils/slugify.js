const slugify = require("slugify");

module.exports = (...args) => {
  return slugify(args.join(" "), {
    lower: true,
    strict: true,
  });
};
