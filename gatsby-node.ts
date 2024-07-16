import { createPages } from "@lekoarts/gatsby-theme-cara/gatsby-node.mjs";
import { createRemoteFileNode } from "gatsby-source-filesystem";
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
