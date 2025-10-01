import { Api } from "../lib";
import { defaultResponse } from "../lib/Api";
import { LOGIN_API } from "../static";

export default class extends Api {
  async login(params: {
    uuid: string;
    login: string;
    senha: string;
  }): Promise<defaultResponse<{ nome: string; credential: string }>> {
    return await this.post(LOGIN_API, params);
  }
}
