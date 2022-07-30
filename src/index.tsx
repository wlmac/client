import * as React from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import { App } from "./components/app";

const root = createRoot(document.getElementById("root"));
root.render(<App />);