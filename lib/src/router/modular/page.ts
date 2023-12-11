import type { Routes } from "@youliso/granule/types/Router";

const routes: Routes = {
  home: {
    component: () => import("@/views/pages/home/index"),
  },
};

export default routes;
