/** @jsx jsx */
import * as React from "react";
import { jsx, Container, Flex, Card, Text, Box, Grid } from "theme-ui";
import { HeadFC, Link, PageProps } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { Parallax } from "@react-spring/parallax";
import { Themed } from "@theme-ui/mdx";
import Layout from "@lekoarts/gatsby-theme-cara/src/components/layout";
import Svg from "@lekoarts/gatsby-theme-cara/src/components/svg";
import Seo from "@lekoarts/gatsby-theme-cara/src/components/seo";
import Inner from "@lekoarts/gatsby-theme-cara/src/elements/inner";
import Navigation from "../../components/navigation";
import { graphql } from "gatsby";
import Breadcrumb from "../../components/breadcrumb";
import memeGif from "../../images/nothing_here_jt.gif";

const getContent = ({ posts }): JSX.Element => {
  let content = (
    <Container
      p={4}
      bg="background"
      sx={{
        textAlign: "center",
        fontFamily: "heading",
        fontSize: "48px",
      }}
    >
      No blog posts for now...
      <Flex sx={{ justifyContent: "center", marginTop: "1em" }}>
        <img
          src={memeGif}
          alt="Nothing here meme with John Travolta"
          width={"576px"}
          height={"auto"}
          style={{ width: "75%" }}
        />
      </Flex>
    </Container>
  );
  if (posts.length > 0) {
    console.log(posts);
    content = (
      <Container
        p={4}
        sx={{
          maxWidth: "6xl",
        }}
      >
        <Grid gap={5} columns={[2, null, 3]}>
          {posts.map((post: BlogPost) => {
            const title = post.frontmatter.title;
            const image = getImage(post.frontmatter.image);
            return (
              <Card
                as="article"
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
                sx={{
                  p: 0,
                }}
              >
                <Box>
                  <GatsbyImage image={image} alt="" />
                </Box>
                <Box
                  sx={{
                    p: 3,
                  }}
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                  <footer>
                    <small>{post.frontmatter.date}</small>
                  </footer>
                </Box>
              </Card>
            );
          })}
        </Grid>
      </Container>
    );
  }
  content = (
    <div>
      <Breadcrumb items={[{ title: "Blog", link: "/blog" }]} />

      {content}
    </div>
  );
  return content;
};

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  return (
    <Layout>
      <Navigation />
      {getContent({ posts })}
    </Layout>
  );
};

export default BlogIndex;

export const Head = () => (
  <>
    <Seo title="All posts" />
  </>
);

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
          language
          keywords
        }
      }
    }
  }
`;
type BlogPost = {
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
    image: ImageDataLike;
    language: string;
    keywords: string[];
  };
  fields: {
    slug: string;
  };
};
