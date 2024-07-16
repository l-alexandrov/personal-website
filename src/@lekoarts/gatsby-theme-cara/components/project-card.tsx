/** @jsx jsx */
import { jsx } from "theme-ui";
import { ThemeUIStyleObject } from "@theme-ui/css";
import { Box } from "theme-ui";
import { StaticImage } from "gatsby-plugin-image";

type ProjectCardProps = {
  link: string;
  title: string;
  children: React.ReactNode;
  bg: string;
  rel?: string;
  style?: ThemeUIStyleObject;
  image?: typeof StaticImage;
};

const ProjectCard = ({
  link,
  title,
  children,
  bg,
  rel,
  style,
  image,
}: ProjectCardProps) => (
  <a
    href={link}
    target="_blank"
    rel={rel ?? "noreferrer noopener"}
    sx={{
      ...{
        width: `100%`,
        position: `relative`,
        textDecoration: `none`,
        borderRadius: `lg`,
        border: `4px solid SlateBlue`,
        px: 4,
        py: 4,
        color: `white`,
        background:
          bg ||
          `linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,255,0) 30%)`,
        transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important`,
        ":hover": {
          color: `white !important`,
          transform: `translateY(-5px)`,
          borderColor: `rgba(247,247,247,1)`,
          textShadow: `0 2px 10px black`,
        },
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        gap: 20,
      },

      ...style,
    }}
  >
    <div
      sx={{
        minWidth: "50%",
      }}
    >
      <div
        sx={{
          opacity: 0.85,
          p: {
            fontSize: [1, 2],
            color: `white`,
            margin: 0,
            lineHeight: 1.25,
          },
        }}
      >
        {children}
      </div>
      <div
        sx={{
          textTransform: `uppercase`,
          letterSpacing: `wide`,
          pt: 4,
          fontSize: [3, 4, 5],
          fontWeight: `medium`,
          lineHeight: 1.125,
        }}
      >
        {title}
      </div>
    </div>
    {image && <Box sx={{ width: `100%` }}>{image}</Box>}
  </a>
);
export default ProjectCard;
