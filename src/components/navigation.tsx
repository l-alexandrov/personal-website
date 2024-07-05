/** @jsx jsx */
import * as React from "react";
import { jsx, Box, Flex, NavLink } from "theme-ui";
import ColorModeToggle from "./colormode-toggle";

const Navigation = () => {
  return (
    <Flex
      pt={3}
      paddingX={[3, 4, 4, 5]}
      mb={[5, 5, 4, 3, 2]}
      as="header"
      variant="header"
      sx={{
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        zIndex: 100,
      }}
    >
      <Flex as="nav">
        {/* <NavLink href="https://bimbala.com" p={2}>
            Home
          </NavLink>
          <NavLink href="#!" p={2}>
            Blog
          </NavLink>
          <NavLink href="#!" p={2}>
            About
          </NavLink> */}
      </Flex>

      <ColorModeToggle />
    </Flex>
  );
};

export default Navigation;
