# collection

Utility class that allows grouping and manipulation of datasets to the group and individual level.

## Installation

```
$ npm install guillemsegura/collection
```

## Use

### Simple grouping

```
// Creation:
const data = [
  { id: "A", group: "1", value: 1 },
  { id: "B", group: "2", value: 2 },
  { id: "C", group: "1", value: 3 },
  { id: "D", group: "2", value: 4 },
];
const collection = new Collection(data);

// Group by field `group`:
collection.group("group");

// Calculate aggregated value within each group:
collection.compose((previous, current) => {
	current.aggregatedValue = previous ? current.value + previous.value : current.value;
});

// Returns:
console.log(collection.get());
// [
//    { id: "A", group: "1", value: 1, aggregatedValue: 1 },
//    { id: "C", group: "1", value: 3, aggregatedValue: 4 },
//    { id: "B", group: "2", value: 2, aggregatedValue: 2 },
//    { id: "D", group: "2", value: 4, aggregatedValue: 6 },
// ]
```

### Nested grouping

```
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

// Creation, grouping and calculations:
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

// Returns:
console.log(collection.get());
// [
//    { id: "A", group: "1", value: 1, x: 0, aggregatedValue: 1, groupIndex: 0 },
//    { id: "C", group: "1", value: 3, x: 0, aggregatedValue: 4, groupIndex: 0 },
//    { id: "E", group: "1", value: 5, x: 1, aggregatedValue: 5, groupIndex: 0 },
//    { id: "G", group: "1", value: 7, x: 1, aggregatedValue: 12, groupIndex: 0 },
//    { id: "B", group: "2", value: 2, x: 0, aggregatedValue: 2, groupIndex: 1 },
//    { id: "D", group: "2", value: 4, x: 0, aggregatedValue: 6, groupIndex: 1 },
//    { id: "F", group: "2", value: 6, x: 1, aggregatedValue: 6, groupIndex: 1 },
//    { id: "H", group: "2", value: 8, x: 1, aggregatedValue: 14, groupIndex: 1 },
// ]
```
