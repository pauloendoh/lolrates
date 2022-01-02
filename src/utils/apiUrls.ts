export const apiUrls = {
  auth: {
    me: "/auth/me",
    login: "auth/login",
    register: "/auth/register",
  },
  lolRates: "/lolRates",
  playground: {
    dragContainers: "/playground/drag-containers",
    dragItems: `/playground/drag-items`,
    dragItemsPositions: `/playground/drag-items/positions`,
    dragContainerPositions: `/playground/drag-containers/positions`,
    folders: `/playground/folders`,
    folderId: (folderId: number) => `/playground/folders/${folderId}`,
    files: `/playground/files`,
    friends: "/playground/friends",
  },
};
