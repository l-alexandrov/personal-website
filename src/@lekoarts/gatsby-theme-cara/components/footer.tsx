/** @jsx jsx */
import { Box, Flex, useColorMode, jsx } from "theme-ui"
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/linkedin'
import 'react-social-icons/x'
import 'react-social-icons/github'
import 'react-social-icons/mailto'
import useSiteMetadata from "@lekoarts/gatsby-theme-cara/src/hooks/use-site-metadata"

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode<"light" | "dark">()
  const isDark = colorMode === `dark`

  const {
    author: twitterHandle
  } = useSiteMetadata()
  const iconsAttributes = {
    style: {
      height: 50, 
      width: 50, 
      marginRight: 30 
    },
    bgColor: isDark ? "transparent" : null
  };

  return (
    <Box as="footer" variant="footer">      
       <Flex
        sx={{
          justifyContent: `center`,
          alignItems: `center`,
          mt: 3,
          mb: 10,
        }}
      >
        <SocialIcon url={`https://x.com/${twitterHandle}`}  {...iconsAttributes}/>
        <SocialIcon url={`https://github.com/l-alexandrov`} {...iconsAttributes} />
        <SocialIcon url={`https://linkedin.com/in/l-alexandrov`} {...iconsAttributes} />
        <SocialIcon url={`mailto:luboslavaleksandrov@gmail.com`} {...{
          ...iconsAttributes,
          ...{
            style: {
              mr: 0
            }
          }
        }} />
      </Flex>
      Copyright &copy; {new Date().getFullYear()}. All rights reserved.
    </Box>
  )
}

export default Footer
