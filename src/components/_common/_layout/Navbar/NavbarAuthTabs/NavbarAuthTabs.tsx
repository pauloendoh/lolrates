import { Tabs } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { pageUrls } from "../../../../../utils/pageUrls";
import S from "./NavbarAuthTabs.styles";
import * as utils from "./NavbarAuthTabs.utils";

// PE 2/3
const NavbarAuthTabs = () => {
  const { pathname } = useRouter();
  const [tabIndex, setTabIndex] = useState<number | boolean>(false);

  useEffect(() => {
    if (pathname.startsWith(pageUrls.draft)) {
      setTabIndex(1);
    } else if (pathname.startsWith(pageUrls.playground)) {
      setTabIndex(2);
    } else if (pathname.startsWith(pageUrls.ration)) {
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
