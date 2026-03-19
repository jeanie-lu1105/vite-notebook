import { NoteRequest } from "@/apis/note";
import type { Note } from "@/model/note.interface";
import { ElMessage } from "element-plus";
import type { ActionContext } from "vuex/types/index.js";

export interface INotesState {
  notes: Note[];
  curNoteId: string;
  loading: boolean;
}
type NotesContext = ActionContext<INotesState, unknown>;

export const noteState: INotesState = {
  notes: [],
  curNoteId: "",
  loading: false,
};

const getters = {
  notes: (state: INotesState) => state.notes || [],
  curNote: (state: INotesState) => {
    if (!Array.isArray(state.notes)) return { title: "", content: "" };
    if (!state.curNoteId) return state.notes[0] || { title: "", content: "" };
    return (
      state.notes.find((note) => note.id == state.curNoteId) || {
        title: "",
        content: "",
      }
    );
  },
};

const mutations = {
  setNote(state: INotesState, payload: any) {
    state.notes = payload.notes;
  },
  addNote(state: INotesState, payload: any) {
    state.notes.unshift(payload.note);
  },

  updateNote(state: INotesState, payload: any) {
    let note = state.notes.find((note: Note) => note.id === payload.noteId) || {
      title: "",
      content: "",
    };
    note.title = payload.title;
    note.content = payload.content;
  },

  deleteNote(state: INotesState, payload: any) {
    state.notes = state.notes.filter((note) => note.id !== payload.noteId);
  },

  setCurNote(state: INotesState, payload: any = {}) {
    state.curNoteId = payload.curNoteId;
  },
};

const actions = {
  getNotes({ commit }: NotesContext, notebookId: string) {
    return NoteRequest.getNotes(notebookId).then((res: any) => {
      commit("setNote", { notes: res.data });
    });
  },

  addNote(
    { commit }: NotesContext,
    { notebookId = "", title = "", content = "" },
  ) {
    return NoteRequest.addNote(notebookId, { title, content }).then(
      (res: any) => {
        console.log("add success...", res);
        commit("addNote", { note: res.data });
      },
    );
  },

  updateNote(
    { commit }: NotesContext,
    { noteId = "", title = "", content = "" },
  ) {
    return NoteRequest.updateNote(noteId, { title, content }).then((res) => {
      commit("updateNote", { noteId, title, content });
    });
  },

  deleteNote({ commit }: NotesContext, noteId: string) {
    return NoteRequest.deleteNote(noteId).then((res: any) => {
      commit("deleteNote", { noteId });
      ElMessage.success(res.msg);
    });
  },
};

export const notesModule = {
  state: noteState,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
