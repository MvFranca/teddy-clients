import { useState } from "react";
import { useDeleteClient } from "./useDeleteClients";

type Client = { id: string; name: string };

export function useClientDeletionUI() {
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const { mutate: deleteClient, isPending: isDeleting } = useDeleteClient();

  const openDeleteModal = (client: Client) => {
    setClientToDelete(client);
  };

  const closeDeleteModal = () => {
    setClientToDelete(null);
  };

  const confirmDeleteClient = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!clientToDelete) return;
    deleteClient(clientToDelete.id, {
      onSuccess: closeDeleteModal,
    });
  };

  return {
    clientToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteClient,
  };
}
