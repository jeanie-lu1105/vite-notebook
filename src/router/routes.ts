const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: () => import("@/components/HelloWorld.vue"),
  },
  {
    path: "/login",
    component: () => import("@/components/Login.vue"),
  },
  {
    path: "/notebooks",
    component: () => import("@/components/NotebookList.vue"),
  },
  {
    path: "/note",
    component: () => import("@/components/NoteDetail.vue"),
  },
  {
    path: "/trash",
    component: () => import("@/components/TrashDetail.vue"),
  },
];

export default routes;
