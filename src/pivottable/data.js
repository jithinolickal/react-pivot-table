// pivotData.items.task-1 should have id same as the key
// Ex : sameText : {id: "sameText", content: "any text"}

export const pivotData = {
  items: {
    "athlete": { id: "athlete", content: "athlete" },
    "age": { id: "age", content: "age" },
    "country": { id: "country", content: "country" },
    "year": { id: "year", content: "year" },
    "date": { id: "date", content: "date" },
    "sport": { id: "sport", content: "sport" },
    "gold": { id: "gold", content: "gold" },
    "silver": { id: "silver", content: "silver" },
    "bronze": { id: "bronze", content: "bronze" },
    "total": { id: "total", content: "total" },
  },
  columns: {
    "availablePanel": {
      id: "availablePanel",
      index: 0,
      title: "AVAILABLE",
      itemId: ["country","year","date","sport","gold","silver","bronze","total"],
    },
    "rowPanel": {
      id: "rowPanel",
      index: 1,
      title: "ROW",
      itemId: ["age"],
    },
    "columnPanel": {
      id: "columnPanel",
      index: 2,
      title: "COLUMN",
      itemId: ["athlete"],
    },
  },
  columnOrder: ["availablePanel", "rowPanel", "columnPanel"],
};
