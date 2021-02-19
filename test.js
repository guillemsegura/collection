const Collection = require("./index");

test("creates collection", () => {
  expect(new Collection()).not.toBe(null);
});

test("creates collection with one grouping returns expected data", () => {
  const data = [
    { id: "A", group: "1", value: 1 },
    { id: "B", group: "2", value: 2 },
    { id: "C", group: "1", value: 3 },
    { id: "D", group: "2", value: 4 },
  ];

  const collection = new Collection(data)
    .group("group")
    .compose((previous, current) => {
      current.aggregatedValue = previous
        ? current.value + previous.value
        : current.value;
    });

  const expectedData = [
    { id: "A", group: "1", value: 1, aggregatedValue: 1 },
    { id: "C", group: "1", value: 3, aggregatedValue: 4 },
    { id: "B", group: "2", value: 2, aggregatedValue: 2 },
    { id: "D", group: "2", value: 4, aggregatedValue: 6 },
  ];

  expect(collection.get()).toEqual(expectedData);
});

test("creates collection with nexted grouping returns expected data", () => {
  const data = [
    { id: "A", group: "1", value: 1, x: 0 },
    { id: "B", group: "2", value: 2, x: 0 },
    { id: "C", group: "1", value: 3, x: 0 },
    { id: "D", group: "2", value: 4, x: 0 },
    { id: "E", group: "1", value: 5, x: 1 },
    { id: "F", group: "2", value: 6, x: 1 },
    { id: "G", group: "1", value: 7, x: 1 },
    { id: "H", group: "2", value: 8, x: 1 },
  ];

  const collection = new Collection(data)
    .group("group")
    .compose((previous, current, group, groupIndex) => {
      current.groupIndex = groupIndex;
    })
    .group("x")
    .compose((previous, current) => {
      current.aggregatedValue = previous
        ? current.value + previous.value
        : current.value;
    });

  const expectedData = [
    { id: "A", group: "1", value: 1, x: 0, aggregatedValue: 1, groupIndex: 0 },
    { id: "C", group: "1", value: 3, x: 0, aggregatedValue: 4, groupIndex: 0 },
    { id: "E", group: "1", value: 5, x: 1, aggregatedValue: 5, groupIndex: 0 },
    { id: "G", group: "1", value: 7, x: 1, aggregatedValue: 12, groupIndex: 0 },
    { id: "B", group: "2", value: 2, x: 0, aggregatedValue: 2, groupIndex: 1 },
    { id: "D", group: "2", value: 4, x: 0, aggregatedValue: 6, groupIndex: 1 },
    { id: "F", group: "2", value: 6, x: 1, aggregatedValue: 6, groupIndex: 1 },
    { id: "H", group: "2", value: 8, x: 1, aggregatedValue: 14, groupIndex: 1 },
  ];

  expect(collection.get()).toEqual(expectedData);
});
