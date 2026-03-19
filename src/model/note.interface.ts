export interface Note {
  id: string;
  title: string;
  content: string;
  notebookId: string;
  createdAt: string;
  updatedAt: string;
  updatedAtFriendly: string;
  createdAtFriendly: string;
}

export interface Notebook {
  id: string;
  title: string;
  noteCounts: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  updatedAtFriendly: string;
  createdAtFriendly: string;
  displayDate: string;
}
