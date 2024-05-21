import fs from "fs";

const deleteIndexFile = () => {
  fs.unlinkSync("./dist/index.html");
  console.log("index.html file deleted successfully!");
};

export const postBuild = () => ({
  name: "postbuild-commands",
  closeBundle: async () => {
    deleteIndexFile();
  },
});
