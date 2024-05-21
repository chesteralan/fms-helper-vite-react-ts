import * as fs from "fs";
import * as path from "path";
import * as pkg from "./package.json";

const manifestObject = {
  manifest_version: 3,
  version: pkg.version,
  name: pkg.title,
  description: pkg.description,
  icons: {
    16: "favicon-16x16.png",
    32: "favicon-32x32.png",
    96: "favicon-96x96.png",
  },
  web_accessible_resources: [
    {
      resources: ["main.css"],
      matches: ["<all_urls>"],
    },
  ],
  content_scripts: [
    {
      matches: ["<all_urls>"],
      run_at: "document_end",
      js: ["main.js"],
      css: ["main.css"],
    },
  ],
};

const creaseManifestFile = () => {
  fs.writeFile(
    path.join("dist", "manifest.json"),
    JSON.stringify(manifestObject),
    {},
    () => {
      console.log("Manifest File Created!");
    },
  );
};

export const runManifest = () => ({
  name: "create-manifest-file",
  handleHotUpdate: async () => {
    creaseManifestFile();
  },
  buildStart: async () => {
    creaseManifestFile();
  },
});
