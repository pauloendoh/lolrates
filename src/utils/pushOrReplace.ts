export const pushOrReplace = <T>(array: T[], item: T, idKey: keyof T) => {
  if (array === undefined || array === null) return [item];

  let newArray = [...array];

  const indexFound = newArray.findIndex(
    (a) => a[`${String(idKey)}`] === item[`${String(idKey)}`]
  );
  if (~indexFound) {
    // replace
    newArray[indexFound] = item;
  } else {
    // push
    newArray = [...newArray, item];
  }

  return newArray;
};

export const xd = <T>(array: T[], item: T, idKey: (keyof T)[]) => {
  let newArray = [...array];

  const indexFound = newArray.findIndex(
    (a) => a[`${idKey}`] === item[`${idKey}`]
  );
  if (~indexFound) {
    // replace
    newArray[indexFound] = item;
  } else {
    // push
    newArray = [...newArray, item];
  }

  return newArray;
};

const b = [
  { id: 1, name: "xd" },
  { id: 2, name: "lol" },
];
xd(b, { id: 2, name: "lmao" }, ["id", "name"]);

class OrderedEntity {
  id: number;
  position: number;
}

class Draggable extends OrderedEntity {
  name: string;
}

const reposition = <T>(entity: OrderedEntity, groupIdKeys: (keyof T)[]) => {};

const arr: Draggable[] = [
  {
    id: 1,
    position: 0,
    name: "xd",
  },
  {
    id: 2,
    position: 1,
    name: "paulo",
  },
];

const x = arr[0];

reposition<Draggable>(x, ["id"]);
