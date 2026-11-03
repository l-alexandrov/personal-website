import { jsx } from "theme-ui";
import React from "react";
import { Flex, Box } from "@theme-ui/components";
import { Link } from "gatsby";

type BreadcrumbItem = {
  title: string;
  link: string;
};

export default ({ items }: { items: BreadcrumbItem[] }): JSX.Element => (
  <Flex
    sx={{
      flexDirection: "row",
      marginX: "auto",
      justifyContent: "center",
      fontSize: 2,
    }}
  >
    {items.map((item, i, items) => (
      <Box
        p={4}
        color="text"
        sx={
          items.length - 1 === i
            ? {}
            : {
                position: "relative",
                "::after": {
                  content: '""',
                  position: "absolute",
                  right: "-2px",
                  top: "25%",
                  width: "2px",
                  height: "50%",
                  backgroundColor: "rgb(0, 146,247)",
                },
              }
        }
      >
        {item.title && <Link to={item.link}>{item.title}</Link>}
      </Box>
    ))}
  </Flex>
);
