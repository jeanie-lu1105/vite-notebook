import { request } from "@/helpers/request";
import { friendlyDate } from "@/helpers/util";
import { ElMessage } from "element-plus";
const URL = {
  GET: `/notes/from/:NotebookId`,
  ADD: `/notes/to/:NotebookId`,
  DELETE_NOTES: `/notes/:id`,
  ADD_TRASH: `/notes/:id`,
};

export const NoteRequest = {
  getNotes(notebookId: string) {
    return new Promise((resolve: any, reject: any) => {
      request(URL.GET.replace(":NotebookId", notebookId))
        .then((res: any) => {
          res.data.sort(
            (a: any, b: any) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          );

          res.data = res.data.map((note: any) => {
            note.updatedAtFriendly = friendlyDate(note.updatedAt);
            note.createdAtFriendly = friendlyDate(note.createdAt);
            return note;
          });
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  },
  addNote(NotebookId: string, notes: { title: string; content: string }) {
    return new Promise((resolve: any, reject: any) => {
      request(URL.ADD.replace(":NotebookId", NotebookId), "POST", {
        ...notes,
      })
        .then((res: any) => {
          ElMessage.success(res.msg || "Note added successfully");
          res.data.createdAtFriendly = friendlyDate(res.data.createdAt);
          res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt);
          resolve(res);
        })
        .catch((err: any) => {
          ElMessage.error(
            err.message || "Failed to add note due to network error",
          );
          reject(err);
        });
    });
  },
  deleteNote(noteId: string) {
    return request(URL.DELETE_NOTES.replace(":id", noteId), "DELETE");
  },
  updateNote(noteId: string, notes: { title: string; content: string }) {
    return new Promise((resolve: any, reject: any) => {
      request(URL.DELETE_NOTES.replace(":id", noteId), "PATCH", {
        ...notes,
      })
        .then((res: any) => {
          ElMessage.success(res.msg || "Note updated successfully");
          res.data.createdAtFriendly = friendlyDate(res.data.createdAt);
          res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt);
          resolve(res);
        })
        .catch((err: any) => {
          ElMessage.error(
            err.message || "Failed to update note due to network error",
          );
          reject(err);
        });
    });
  },
};
