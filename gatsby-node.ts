import { createPages } from "@lekoarts/gatsby-theme-cara/gatsby-node.mjs";
import { createRemoteFileNode, createFilePath } from "gatsby-source-filesystem";
import { GatsbyNode } from "gatsby";
import path from "path";
import { copyLibFiles } from "@builder.io/partytown/utils";

export const onPreBuild = async () => {
  await copyLibFiles(path.join(__dirname, "static", "~partytown"));
};

export const createResolvers: GatsbyNode["createResolvers"] = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;

  createResolvers({
    Query: {
      remoteImage: {
        type: "File",
        args: {
          url: {
            type: "String",
            description: "URL of the image",
          },
        },
        resolve: async (_: any, { url }: { url: string }) => {
          return await createRemoteFileNode({
            url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type BlogPost implements Node {
      frontmatter: BlogPostFrontmatter
      fields: MarkdownFields
    }

    type BlogPostFrontmatter {
      title: String
      date: Date @dateformat
      image: File @fileByRelativePath
      language: String
      keywords: [String]
    }

    type MarkdownFields {
      slug: String
    }
  `);
  };
