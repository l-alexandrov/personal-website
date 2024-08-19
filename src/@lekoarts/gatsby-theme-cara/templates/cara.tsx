import * as React from "react";
import type { HeadFC } from "gatsby";
import { Parallax } from "@react-spring/parallax";
import Layout from "@lekoarts/gatsby-theme-cara/src/components/layout";
import Hero from "@lekoarts/gatsby-theme-cara/src/components/hero";
import Projects from "../components/projects";
import About from "@lekoarts/gatsby-theme-cara/src/components/about";
import Contact from "@lekoarts/gatsby-theme-cara/src/components/contact";
import Seo from "@lekoarts/gatsby-theme-cara/src/components/seo";
import Navigation from "../../../components/navigation";

const Cara = () => (
  <Layout>
    <Parallax pages={5}>
      <Navigation />
      <Hero offset={0} factor={1} />
      <Projects offset={1} factor={2} />
      <About offset={3} factor={1} />
      <Contact offset={4} factor={1} />
    </Parallax>
  </Layout>
);

export default Cara;

export const Head: HeadFC = () => (
  <Seo
    children={
      process.env.NODE_ENV === "production" ? (
        <>
          {/* Start cookieyes banner */}
          <script
            id="cookieyes"
            type="text/javascript"
            src="https://cdn-cookieyes.com/client_data/406ed30202f70e7c0c8ae9c0/script.js"
          ></script>
          {/* End cookieyes banner */}
        </>
      ) : null
    }
  />
);
