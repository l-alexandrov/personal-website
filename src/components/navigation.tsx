/** @jsx jsx */
import * as React from "react";
import { jsx, Box, Flex, NavLink } from "theme-ui";
import ColorModeToggle from "./colormode-toggle";

const Navigation = () => {
  return (
    <Flex
      as="header"
      variant="header"
      sx={{
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        zIndex: 100,
        py: 3,
        px: [3, 4, 4, 5],
      }}
    >
      <Flex as="nav">
        <NavLink href="/" p={2}>
          Home
        </NavLink>
        <NavLink href="/blog" p={2}>
          Blog
        </NavLink>
      </Flex>

      <ColorModeToggle />
    </Flex>
  );
};

export default Navigation;
