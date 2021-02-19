# collection

Utility class that allows grouping and manipulation of datasets.

## Installation

```
$ npm install guillemsegura/collection
```

## Use

```
const data = [
  { id: "A", group: "1", value: 1 },
  { id: "B", group: "2", value: 2 },
  { id: "C", group: "1", value: 3 },
  { id: "D", group: "2", value: 4 },
];

const collection = new Collection(data);

// group by field `group`
collection.group("group");

// calculate aggregated value within each group
collection.compose((previous, current) => {
	current.aggregatedValue = previous ? current.value + previous.value : current.value;
});

console.log(collection.get());

// Returns:
// [
//    { id: "A", group: "1", value: 1, aggregatedValue: 1 },
//    { id: "C", group: "1", value: 3, aggregatedValue: 4 },
//    { id: "B", group: "2", value: 2, aggregatedValue: 2 },
//    { id: "D", group: "2", value: 4, aggregatedValue: 6 },
// ];
```
