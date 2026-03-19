import { request } from "@/helpers/request";
import { friendlyDate } from "@/helpers/util";
import { de } from "element-plus/es/locale/index.mjs";

const URL = {
  GET: "/notebooks",
  ADD: `/notebooks`,
  UPDATE: `/notebooks/:id`,
  DELETE: `/notebooks/:id`,
};

export const NotebooksRequest = {
  getAll() {
    return new Promise((resolve: any, reject: any) => {
      request(URL.GET)
        .then((res: any) => {
          res.data.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          res.data = res.data.map((notebook: any) => {
            notebook.displayDate = friendlyDate(notebook.createdAt);
            return notebook;
          });
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  },
  add({ title = "" } = { title: "" }) {
    return request(URL.ADD, "POST", { title });
  },
  update(notebookId: string, { title = "" } = { title: "" }) {
    return request(URL.UPDATE.replace(":id", notebookId), "PATCH", { title });
  },
  delete(notebookId: string) {
    return request(URL.DELETE.replace(":id", notebookId), "DELETE");
  },
};
