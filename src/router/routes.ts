import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";
import NotebookList from "@/components/NotebookList.vue";
import NoteDetail from "@/components/NoteDetail.vue";
import TrashDetail from "@/components/TrashDetail.vue";

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/notebooks",
    component: NotebookList,
  },
  {
    path: "/note/:noteId",
    component: NoteDetail,
  },
  {
    path: "/trash/:noteId",
    component: TrashDetail,
  },
];

export default routes;
