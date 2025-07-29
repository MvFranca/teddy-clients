import { useState } from "react";
import { Button, ClientCard, Modal } from "@teddy/design-system";
import { useClients } from "../../hooks/useClients";
import { useCreateClient } from "../../hooks/useCreateClient";
import { clientSchema } from "../../schemas/clientSchema";
import { PaginationControls } from "./PaginationControls";
import { PerPageSelector } from "./PerPageSelector";
import { ClientModalForm } from "./forms/ClientModalForm";
import { useEditClient } from "../../hooks/useEditClient";
import { useDeleteClient } from "../../hooks/useDeleteClients";
import { useSelectedClientsStore } from "../../store/useSelectedClientsStore";
import { toast } from "react-toastify";

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

  const confirmDeleteClient = () => {
    if (!clientToDelete) return;
    deleteClient(clientToDelete.id, {
      onSuccess: () => setClientToDelete(null),
    });
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-start py-8">
      <div className="max-w-[1200px] w-full flex flex-col gap-y-2.5">
        <div className="flex justify-between items-center">
          <p className="text-black text-lg">
            <span className="font-bold">{clients.length}</span> clientes
            encontrados:
          </p>
          <PerPageSelector
            perPage={pagination.perPage}
            onChange={(value) => setPagination({ page: 1, perPage: value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-2">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              salary={client.salary}
              company={client.companyValuation}
              onEdit={() => openEditModal(client)}
              onDelete={() =>
                openDeleteModal({ id: client.id, name: client.name })
              }
              onAdd={() => handleAdd(client)}
            />
          ))}
        </div>

        <Button variant="outline" onClick={openCreateModal} fullWidth size="sm">
          Criar Cliente
        </Button>

        <PaginationControls
          page={pagination.page}
          totalPages={totalPages}
          isFetching={isFetching}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setErrors({});
          setEditingId(null);
        }}
        title={editingId ? "Editar Cliente:" : "Criar Cliente:"}
        alert=""
        textButton={
          editingId
            ? isPendingEdit
              ? "Salvando..."
              : "Salvar"
            : isPendingCreate
            ? "Criando..."
            : "Criar"
        }
        onSubmit={handleSubmit}
      >
        {[
          { label: "Nome", type: "text", placeholder: "Digite o nome" },
          { label: "Salário", type: "number", placeholder: "Digite o salário" },
          {
            label: "Empresa",
            type: "text",
            placeholder: "Digite o valor da empresa",
          },
        ].map((input, index) => (
          <ClientModalForm
            key={index}
            input={input}
            value={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        ))}
      </Modal>

      <Modal
        isOpen={!!clientToDelete}
        onClose={() => setClientToDelete(null)}
        title="Excluir Cliente:"
        textButton={isDeleting ? "Excluindo..." : "Excluir Cliente"}
        onSubmit={confirmDeleteClient}
      >
        <p>
          Você está prestes a excluir o cliente:{" "}
          <span className="text-black font-bold">{clientToDelete?.name}</span>
        </p>
      </Modal>
    </div>
  );
}
