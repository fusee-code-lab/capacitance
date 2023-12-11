import pageRoute from "@/router/modular/page";
import dialogRoute from "@/router/modular/dialog";
import { Router } from "@youliso/granule";

const router = new Router("hash", {
  "/": {
    component: () => import("@/views/app"),
    children: Object.assign(pageRoute, dialogRoute),
  },
});

export default router;
