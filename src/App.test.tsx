import * as React from "react";
import { render, cleanup } from "@testing-library/react";

import { App } from "./App";

afterEach(cleanup);

test("renders the correct content", () => {
    const { getByText, getByTestId } = render(<App />);
    getByText("PEAM")
    getByTestId("peam button");
});

test("renders the correct content2", () => {
    const { getByText, getByTestId } = render(<App />);
    getByText("PEAM")
    getByTestId("peam button");
});
