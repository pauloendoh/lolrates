import buildUrl from "build-url-ts";

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
    paginatedResources: (page: number) =>
      buildUrl("/lolRates/paginated2", {
        queryParams: { per_page: 10, page },
      }),
  },
  ration: {
    movieResults: "https://imdb8.p.rapidapi.com/title/find",
    bookResults: "https://goodreads-books.p.rapidapi.com/search",
    mangaResults: "https://jikan1.p.rapidapi.com/search/manga",
    gameResults: "https://whatoplay.p.rapidapi.com/search",
  },
};
