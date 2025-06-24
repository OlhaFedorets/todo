import { App } from "@/app/App"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { HashRouter } from "react-router"
import { store } from "./app/store"

createRoot(document.getElementById("root")!).render(
  // <BrowserRouter basename={process.env.PUBLIC_URL} >
  <HashRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  // </BrowserRouter>,
)
