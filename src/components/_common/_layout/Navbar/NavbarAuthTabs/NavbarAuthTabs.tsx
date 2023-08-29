import { urls } from "@/utils/urls/urls";
import { Tabs } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import S from "./NavbarAuthTabs.styles";
import * as utils from "./NavbarAuthTabs.utils";

// PE 2/3
const NavbarAuthTabs = () => {
  const { pathname } = useRouter();
  const [tabIndex, setTabIndex] = useState<number | boolean>(false);

  useEffect(() => {
    if (pathname.startsWith(urls.pages.draft)) {
      setTabIndex(1);
    } else if (pathname.startsWith(urls.pages.playground)) {
      setTabIndex(2);
    } else if (pathname.startsWith(urls.pages.rationSearch())) {
      setTabIndex(3);
    } else setTabIndex(0);
  }, [pathname]);

  return (
    <Tabs
      style={{ position: "relative", top: 5, zIndex: 1202 }}
      value={tabIndex}
      indicatorColor="primary"
      textColor="primary"
    >
      {utils.navbarTabOptions.map((tabOption) => (
        <Link key={tabOption.id} href={tabOption.href} passHref>
          <S.NavbarTab
            selected={tabIndex === tabOption.tabIndex}
            id={tabOption.id}
            label={tabOption.label}
          />
        </Link>
      ))}
    </Tabs>
  );
};

export default NavbarAuthTabs;
