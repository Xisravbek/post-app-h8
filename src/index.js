import  ReactDOM  from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import {store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <>
  <ToastContainer/>
    <BrowserRouter >
      <Provider store={store}>
        <App />

      </Provider>
    </BrowserRouter>
  </>
)