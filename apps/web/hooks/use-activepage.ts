
import { create } from "zustand";


type ActivepageStore = {
    activePage: string,
    setActivePage: (page: string) => void
}

export const useActivePage = create<ActivepageStore>((set, get) => ({
    activePage: "Home",
    setActivePage: (page) => set({ activePage: page })
}))