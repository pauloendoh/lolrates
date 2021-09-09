export const pushOrReplace = (array: any[], item: any, equalityKey: string) => {
  let newArray = [...array];

  const indexFound = newArray.findIndex((a) => a[`${equalityKey}`] === item[`${equalityKey}`]);
  if (~indexFound) {
    // replace
    newArray[indexFound] = item;
  } else {
    // push
    newArray = [...newArray, item];
  }

  return newArray;
};
