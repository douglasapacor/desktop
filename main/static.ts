import { app } from "electron";
import path from "path";

const ICON_PATH = `${path.join(__dirname, "../resources/windowIcon.png")}`;
const IS_PROD = process.env.NODE_ENV === "production";
const OS_USER_DATA = app.getPath("userData");
const BASE_PATH_API = "https://api.publicacoesinr.com.br";
const LOGIN_API = `/seguranca/autenticacao/desktop`;

export { ICON_PATH, IS_PROD, OS_USER_DATA, BASE_PATH_API, LOGIN_API };
