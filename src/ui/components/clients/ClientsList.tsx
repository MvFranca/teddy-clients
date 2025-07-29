import { useState } from "react";
import { Button } from "@teddy/design-system";
import { useClients } from "../../../hooks/useClients";
import { useCreateClient } from "../../../hooks/useCreateClient";
import { clientSchema } from "../../../schemas/clientSchema";
import { PaginationControls } from "../PaginationControls";
import { useEditClient } from "../../../hooks/useEditClient";
import { useDeleteClient } from "../../../hooks/useDeleteClients";
import { useSelectedClientsStore } from "../../../store/useSelectedClientsStore";
import { toast } from "react-toastify";

import {
  ClientGrid,
  ClientFormModal,
  ClientDeleteModal,
  ClientHeader,
} from "./index";

type FormData = {
  name: string;
  salary: string;
  companyValuation: string;
};

const emptyForm: FormData = {
  name: "",
  salary: "",
  companyValuation: "",
};

export function ClientsList() {
  const [pagination, setPagination] = useState({ page: 1, perPage: 16 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [clientToDelete, setClientToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, isFetching } = useClients(pagination.page, pagination.perPage);
  const { mutate: createClient, isPending: isPendingCreate } =
    useCreateClient();
  const { mutate: editClient, isPending: isPendingEdit } = useEditClient();
  const { mutate: deleteClient, isPending: isDeleting } = useDeleteClient();

  const clients = data?.clients ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleInputChange = (label: string, value: string) => {
    const key = label.toLowerCase().includes("empresa")
      ? "companyValuation"
      : label.toLowerCase().includes("salário")
      ? "salary"
      : "name";

    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addClient = useSelectedClientsStore((s) => s.addClient);

  const handleAdd = (client: {
    id: string;
    name: string;
    salary: number;
    companyValuation: number;
  }) => {
    addClient(client);
    toast.success("Cliente adicionado com sucesso!");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = clientSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(({ path, message }) => {
        const key = path[0] as string;
        fieldErrors[key] = message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const payload = {
      name: formData.name,
      salary: Number(formData.salary),
      companyValuation: Number(formData.companyValuation),
    };

    const onSuccess = () => {
      setIsModalOpen(false);
      setFormData(emptyForm);
      setEditingId(null);
    };

    if (editingId) {
      editClient({ id: editingId, ...payload }, { onSuccess });
    } else {
      createClient(payload, { onSuccess });
    }
  };

  const openEditModal = (client: {
    id: string;
    name: string;
    salary: number;
    companyValuation: number;
  }) => {
    setEditingId(client.id);
    setFormData({
      name: client.name,
      salary: client.salary.toString(),
      companyValuation: client.companyValuation.toString(),
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
    setIsModalOpen(true);
  };

  const openDeleteModal = (client: { id: string; name: string }) => {
    setClientToDelete(client);
  };

  const confirmDeleteClient = (event?: React.FormEvent) => {
    event?.preventDefault();

    if (!clientToDelete) return;
    deleteClient(clientToDelete.id, {
      onSuccess: () => setClientToDelete(null),
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-8">
      <div className="w-full max-w-[1200px] mx-4 flex-col gap-4 flex">
        <>
          <ClientHeader
            total={clients.length}
            perPage={pagination.perPage}
            onPerPageChange={(value) =>
              setPagination({ page: 1, perPage: value })
            }
          />

          <ClientGrid
            clients={clients}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onAdd={handleAdd}
          />

          <Button
            onClick={openCreateModal}
            fullWidth
            variant="outline"
            size="sm"
          >
            Criar Cliente
          </Button>

          <PaginationControls
            page={pagination.page}
            totalPages={totalPages}
            isFetching={isFetching}
            onPageChange={(page) =>
              setPagination((prev) => ({ ...prev, page }))
            }
          />

          <ClientFormModal
            isOpen={isModalOpen}
            isEditing={!!editingId}
            isPending={editingId ? isPendingEdit : isPendingCreate}
            formData={formData}
            errors={errors}
            onClose={() => {
              setIsModalOpen(false);
              setErrors({});
              setEditingId(null);
            }}
            onSubmit={handleSubmit}
            onChange={handleInputChange}
          />

          <ClientDeleteModal
            client={clientToDelete}
            isDeleting={isDeleting}
            onClose={() => setClientToDelete(null)}
            onConfirm={confirmDeleteClient}
          />
        </>
      </div>
    </div>
  );
}
