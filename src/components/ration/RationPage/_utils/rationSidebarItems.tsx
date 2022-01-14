import Icons from "@/components/_common/Icons/Icons";
import RationItemType from "@/types/domain/ration/RationItemType";
import { ReactElement } from "react";

interface IRationSidebarItem {
  id: RationItemType;
  name: string;
  icon: ReactElement;
}

const rationSidebarItemTypes: IRationSidebarItem[] = [
  {
    id: "movie",
    name: "Movies",
    icon: <Icons.Movie />,
  },

  {
    id: "tv-series",
    name: "TV Series",
    icon: <Icons.LiveTv />,
  },
  {
    id: "book",
    name: "Books",
    icon: <Icons.Book />,
  },
  {
    id: "manga",
    name: "Mangas",
    icon: <Icons.ImportContacts />,
  },
  {
    id: "game",
    name: "Games",
    icon: <Icons.SportsEsports />,
  },
];

export default rationSidebarItemTypes;
