import { create } from 'zustand';

const useTableStore = create((set) => ({
  sorting: [],
  filtering: '',
  selectFilter: '',
  setSorting: (newSorting) => set({ sorting: newSorting }),
  setFiltering: (newFiltering) => set({ filtering: newFiltering }),
  setSelectFilter: (newSelectFilter) => set({ selectFilter: newSelectFilter }),
}));

export default useTableStore;
