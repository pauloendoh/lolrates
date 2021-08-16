import { IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import React from "react"
import useSidebarStore from "../../../hooks/stores/useSidebarStore"

const SidebarToggleButton = () => {
  const { toggleSidebar } = useSidebarStore()

  return (
    <IconButton
      onClick={toggleSidebar}
      aria-label="left-sidebar-toggle"
      size="small"
    >
      <MenuIcon fontSize="large" />
    </IconButton>

  )
}

export default SidebarToggleButton
