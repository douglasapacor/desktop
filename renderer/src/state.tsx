import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

type AppStateType = {
  view: { current: string; setCurrent: (view: string) => void };
};

const defaultContext: AppStateType = {
  view: { current: "inicio", setCurrent: (_: string) => {} },
};

const AppState = createContext<AppStateType>(defaultContext);

export function useAppStateContext(): AppStateType {
  return useContext(AppState);
}

const AppStateContext: FC<{ children?: ReactNode }> = ({ ...props }) => {
  const [current, setCurrent] = useState("inicio");

  return (
    <AppState.Provider value={{ view: { current, setCurrent } }}>
      {props.children}
    </AppState.Provider>
  );
};

export default AppStateContext;
