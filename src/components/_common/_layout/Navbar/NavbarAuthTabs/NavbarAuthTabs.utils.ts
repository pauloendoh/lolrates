import { urls } from "@/utils/urls/urls";

interface INavbarTabOption {
  href: string;
  tabIndex: number;
  id: string;
  label: string;
}

export const navbarTabOptions: INavbarTabOption[] = [
  {
    href: urls.pages.index,
    tabIndex: 0,
    id: "home-tab",
    label: "Home",
  },
  {
    href: urls.pages.draft,
    tabIndex: 1,
    id: "draft-tab",
    label: "Draft",
  },
  {
    href: urls.pages.playground,
    tabIndex: 2,
    id: "playground-tab",
    label: "Playground",
  },
  {
    href: urls.pages.rationSearch("", "movie"),
    tabIndex: 3,
    id: "ration-tab",
    label: "Ration",
  },
  {
    href: urls.pages.aramHelper,
    tabIndex: 4,
    id: "aram-helper",
    label: "Aram Helper",
  },
  {
    href: urls.pages.mal,
    tabIndex: 5,
    id: "mal",
    label: "MAL",
  },
];
