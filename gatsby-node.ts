import { createPages } from "@lekoarts/gatsby-theme-cara/gatsby-node.mjs";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { GatsbyNode } from "gatsby";

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
