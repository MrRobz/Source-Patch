import { ReactElement } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ConfigurePage } from "./configure";
import { IndexRoute } from "./index-route";

const router = createMemoryRouter([
  {
    path: "/",
    element: <IndexRoute />,
  },
  {
    path: "/configure",
    element: <ConfigurePage />,
  },
]);

export const Routes = (): ReactElement => {
  return <RouterProvider router={router} />;
};
