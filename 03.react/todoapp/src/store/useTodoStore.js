import { create } from 'zustand';

export const useTodoStore = create((set) => ({
  edit: false,
  setEdit: (edit) => set({ edit }),
}));
