
import { create } from "zustand";


type ActivepageStore = {
    activePage: string,
    setActivePage: (page: string) => void
}

export const useActivePage = create<ActivepageStore>((set, get) => ({
    activePage: "",
    setActivePage: (page) => set({ activePage: page })
}))