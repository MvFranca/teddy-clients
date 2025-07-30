import { useState, useTransition } from "react";
import { Button } from "@teddy/design-system";
import { useClients } from "../../../hooks/useClients";
import { PaginationControls } from "../PaginationControls";
import { useSelectedClientsStore } from "../../../store/useSelectedClientsStore";
import { toast } from "react-toastify";

import {
  ClientGrid,
  ClientFormModal,
  ClientDeleteModal,
  ClientHeader,
} from "./index";
import { useClientForm } from "../../../hooks/useClientForm";
import { useClientDeletionUI } from "../../../hooks/useDeleteClientUI";
import type { Client } from "../../../types/ClientType";
import { Loading } from "../Loading";

export function ClientsList() {
  const [pagination, setPagination] = useState({ page: 1, perPage: 16 });
  const [isPending, startTransition] = useTransition();

  const { data, isLoading, isFetching } = useClients(
    pagination.page,
    pagination.perPage
  );

  const clients = data?.clients ?? [];
  const totalPages = data?.totalPages ?? 1;

  const {
    formData,
    errors,
    editingId,
    isModalOpen,
    isPendingCreate,
    isPendingEdit,
    handleInputChange,
    handleSubmit,
    openEdit,
    openCreate,
    closeModal,
  } = useClientForm();

  const {
    clientToDelete,
    isDeleting,
    openDeleteModal,
    confirmDeleteClient,
    closeDeleteModal,
  } = useClientDeletionUI();

  const addClient = useSelectedClientsStore((s) => s.addClient);
  const handleAdd = (client: Client) => {
    addClient(client);
    toast.success("Cliente adicionado com sucesso!");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-8">
      <div className="w-full max-w-[1200px] mx-4 flex-col gap-4 flex">
        <ClientHeader
          total={clients.length}
          perPage={pagination.perPage}
          onPerPageChange={(value) =>
            startTransition(() => {
              setPagination({ page: 1, perPage: value });
            })
          }
        />

        <ClientGrid
          clients={clients}
          onEdit={openEdit}
          onDelete={openDeleteModal}
          onAdd={handleAdd}
        />

        <Button onClick={openCreate} fullWidth variant="outline" size="sm">
          Criar Cliente
        </Button>

        <PaginationControls
          page={pagination.page}
          totalPages={totalPages}
          isFetching={isFetching}
          onPageChange={(page) =>
            startTransition(() => {
              setPagination((prev) => ({ ...prev, page }));
            })
          }
        />

        {isPending && (
          <span className="text-sm text-gray-500">Atualizando lista...</span>
        )}

        <ClientFormModal
          isOpen={isModalOpen}
          isEditing={!!editingId}
          isPending={editingId ? isPendingEdit : isPendingCreate}
          formData={formData}
          errors={errors}
          onClose={closeModal}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
        />

        <ClientDeleteModal
          client={clientToDelete}
          isDeleting={isDeleting}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteClient}
        />
      </div>
    </div>
  );
}
