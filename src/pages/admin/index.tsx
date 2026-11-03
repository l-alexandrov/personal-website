import CMS from "@staticcms/core";
import "@staticcms/core/dist/main.css";
import config from "./config";
import * as React from "react";

CMS.init({ config });
// Now the registry is available via the CMS object.

const SomeName = () => <div></div>;
export default SomeName;
