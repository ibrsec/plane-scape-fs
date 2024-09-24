import { Provider } from "react-redux";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>

      <ToastContainer />
    </div>
  );
}

export default App;
