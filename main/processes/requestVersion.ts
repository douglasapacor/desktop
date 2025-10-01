import { IpcMainInvokeEvent } from "electron";
import fs from "fs/promises";
import path from "path";

export default {
  key: "request:version",
  handle: async (_: IpcMainInvokeEvent) => {
    try {
      const stringPackageJson = await fs.readFile(
        path.join(__dirname, "../package.json"),
        { encoding: "utf-8" }
      );

      if (!stringPackageJson) throw new Error("Erro");

      const packageJson = JSON.parse(stringPackageJson);

      return packageJson.version;
    } catch (error) {
      return { error: error.message };
    }
  },
};
