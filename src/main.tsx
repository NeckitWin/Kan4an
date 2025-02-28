import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
// @ts-expect-error: Ignoring CSS import error because the file is being bundled correctly by Webpack
import "./index.css"
import App from "./App.tsx"
import store from "./app/store.ts"
import { Provider } from "react-redux"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
