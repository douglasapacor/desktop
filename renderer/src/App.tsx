import Controller from "./components/Controller";
import ViewManager from "./components/ViewManager";
import AppStateContext from "./state";

const App = () => {
  return (
    <AppStateContext>
      <Controller>
        <ViewManager />
      </Controller>
    </AppStateContext>
  );
};

export default App;
