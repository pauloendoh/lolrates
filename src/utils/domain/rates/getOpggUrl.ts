// PE 1/3 -
export const getOpggUrl = (championName: string) => {
  // remove special characters
  const clearName = championName.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "");
  return `https://www.op.gg/champion/${clearName}/statistics`;
};
