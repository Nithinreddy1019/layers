import { create } from "zustand";


type SidebarStore = {
    isExpanded: boolean,
    onExpand: () => void,
    onClose: () => void,
    onToggle: () => void
}


export const useSidebar = create<SidebarStore>((set, get) => ({
    isExpanded: false,
    onExpand: () => set({ isExpanded: true }),
    onClose:  () => set({ isExpanded: false }),
    onToggle: () => set({ isExpanded: !get().isExpanded})
}));