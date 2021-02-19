const Collection = require("./index");

test("creates collection", () => {
  expect(new Collection()).not.toBe(null);
});
