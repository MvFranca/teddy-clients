import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Client } from "../types/ClientType";


interface SelectedClientsStore {
  selectedClients: Client[];
  addClient: (client: Client) => void;
  removeClient: (id: string) => void;
  clearClients: () => void;
}

export const useSelectedClientsStore = create<SelectedClientsStore>()(
  persist(
    (set, get) => ({
      selectedClients: [],
      addClient: (client) => {
        const exists = get().selectedClients.some(c => c.id === client.id);
        if (exists) return; // evita duplicatas
        set({ selectedClients: [...get().selectedClients, client] });
      },
      removeClient: (id) =>
        set({
          selectedClients: get().selectedClients.filter((c) => c.id !== id),
        }),
      clearClients: () => set({ selectedClients: [] }),
    }),
    { name: "selected-clients" }
  )
);
