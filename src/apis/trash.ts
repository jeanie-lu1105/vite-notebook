import { request } from "@/helpers/request";
const URL = {
  ADD_TRASH: `/notes/:id`,
  DELETE_TRASH: `/notes/:id/confirm`,
  REVERT_NOTES: `/notes/:id/revert`,
  GET_TRASH: `/notes/trash`,
};

export const NotebooksRequest = {
  addTrash(noteId: string) {
    return request(URL.ADD_TRASH.replace(":id", noteId), "PATCH");
  },
  deleteTrash(noteId: string) {
    return request(URL.DELETE_TRASH.replace(":id", noteId), "DELETE");
  },
  revertNote(noteId: string) {
    return request(URL.REVERT_NOTES.replace(":id", noteId), "PATCH");
  },
  getTrash() {
    return request(URL.GET_TRASH);
  },
};
