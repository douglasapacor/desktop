import { createContext, FC, ReactNode, useContext } from "react";
import { context, IContext } from "./types";

const Ctx = createContext<IContext>(context);

export function useCtx(): IContext {
  return useContext(Ctx);
}

const Context: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const buildCtx: IContext = {};
  return <Ctx.Provider value={buildCtx}>{props.children}</Ctx.Provider>;
};

export default Context;
