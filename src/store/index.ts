import { createStore } from "vuex";
import { notesModule, noteState } from "./modules/note";

export const notebookStore = createStore({
  modules: {
    note: notesModule,
  },
});

export const notebookState = {
  note: noteState,
};
