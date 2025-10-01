import { IpcMainInvokeEvent } from "electron";
import Seguranca from "../providers/Seguranca";
import userCredential from "../artifacts";

export default {
  key: "request:login",
  handle: async (
    _: IpcMainInvokeEvent,
    body: { uuid: string; login: string; senha: string }
  ) => {
    try {
      const seguranca = await new Seguranca().login(body);

      if (!seguranca.success) throw new Error(seguranca.message);

      const { data } = seguranca;

      await userCredential.save({
        name: data.nome,
        credential: data.credential,
        isLogged: true,
      });

      return { name: data.nome };
    } catch (error) {
      return { error: error.message };
    }
  },
};
