import { createStore } from "vuex/types/index.js";
import { notesModule, noteState } from "./modules/note";

export const notebookStore = createStore({
  modules: {
    note: notesModule,
  },
});

export const notebookState = {
  note: noteState,
};
