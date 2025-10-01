import { IpcMainInvokeEvent } from "electron";
import { fetch } from "../lib";

export default {
  key: "request:home",
  handle: async (_: IpcMainInvokeEvent) => {
    try {
      return await fetch.get("https://api.publicacoesinr.com.br/home");
    } catch (error) {
      return { error: error.message };
    }
  },
};
