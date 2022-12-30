import { ReactElement } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ChangeRequestListPage } from "./change-request/list";
import { ChangeRequestShow } from "./change-request/show";
import { SubmitChangeRequest } from "./change-request/submit";
import { ConfigurePage } from "./configure";
import { IndexRoute } from "./index-route";
import { ViewOrCreateChangePage } from "./view-or-create-change";

const router = createMemoryRouter([
  {
    path: "/",
    element: <IndexRoute />,
  },
  {
    path: "/configure",
    element: <ConfigurePage />,
  },
  {
    path: "/domain/:domain",
    element: <ViewOrCreateChangePage />,
  },
  {
    path: "/domain/:domain/change-request-list",
    element: <ChangeRequestListPage />,
  },
  {
    path: "/domain/:domain/change-request/:id",
    element: <ChangeRequestShow />,
  },
  {
    path: "/domain/:domain/change-request/:id/submit",
    element: <SubmitChangeRequest />,
  },
]);

export const Routes = (): ReactElement => {
  return <RouterProvider router={router} />;
};
