import { ScriptableObject } from "../lib";

interface IUserCredential {
  name: string | null;
  credential: string | null;
  isLogged: boolean;
}

export default class extends ScriptableObject<IUserCredential> {
  constructor() {
    super("data\\credential.json");
  }

  protected defaultData(): IUserCredential {
    return {
      credential: null,
      name: null,
      isLogged: false,
    };
  }
}
