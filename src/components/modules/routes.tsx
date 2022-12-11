import { ReactElement } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ChangeRequestListPage } from "./change-request/list";
import { ConfigurePage } from "./configure";
import { IndexRoute } from "./index-route";
import { ViewOrCreateChangePage } from "./view-or-create-change";

const router = createMemoryRouter([
  {
    path: "/",
    element: <IndexRoute />,
  },
  {
    path: "/domain/:domain",
    element: <ViewOrCreateChangePage />,
  },
  {
    path: "/domain/:domain/change-request/:id",
    element: <>id</>,
  },
  {
    path: "/domain/:domain/change-request-list",
    element: <ChangeRequestListPage />,
  },
  {
    path: "/configure",
    element: <ConfigurePage />,
  },
]);

export const Routes = (): ReactElement => {
  return <RouterProvider router={router} />;
};
