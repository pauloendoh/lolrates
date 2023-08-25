export const queryKeys = {
  dragItems: "dragItems",
  folders: "folders",
  files: "files",
  friends: "friends",
  paginatedResources: (page: number) => ["paginatedResources", page],
  paginatedResourcesInfinite: "paginatedResourcesInfinite",
  aramChampionsWinRates: (lolgraphsUrl: string) =>
    "aramChampionsWinRates?lolgraphsUrl=" + encodeURIComponent(lolgraphsUrl),
  myAramChampions: "myAramChampions",
};
