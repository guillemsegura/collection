# collection

Utility class that allows grouping and manipulation of datasets to the group and individual level.

## Installation

```
$ npm install guillemsegura/collection
```

## Use

Creation:

```
const data = [
  { id: "A", group: "1", value: 1 },
  { id: "B", group: "2", value: 2 },
  { id: "C", group: "1", value: 3 },
  { id: "D", group: "2", value: 4 },
];

const collection = new Collection(data);
```

Group by field `group`:

```
collection.group("group");
```

Calculate aggregated value within each group:

```
collection.compose((previous, current) => {
	current.aggregatedValue = previous ? current.value + previous.value : current.value;
});
```

Returns:

```
console.log(collection.get());

// [
//    { id: "A", group: "1", value: 1, aggregatedValue: 1 },
//    { id: "C", group: "1", value: 3, aggregatedValue: 4 },
//    { id: "B", group: "2", value: 2, aggregatedValue: 2 },
//    { id: "D", group: "2", value: 4, aggregatedValue: 6 },
// ];
```
