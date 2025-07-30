import { useState } from "react";
import { clientSchema } from "../schemas/clientSchema";
import { useCreateClient } from "./useCreateClient";
import { useEditClient } from "./useEditClient";
import type { Client } from "../types/ClientType";

const emptyForm = {
  name: "",
  salary: "",
  companyValuation: "",
};

export function useClientForm(onSuccess?: () => void) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: createClient, isPending: isPendingCreate } = useCreateClient();
  const { mutate: editClient, isPending: isPendingEdit } = useEditClient();

  const handleInputChange = (label: string, value: string) => {
    const key = label.toLowerCase().includes("empresa")
      ? "companyValuation"
      : label.toLowerCase().includes("salário")
      ? "salary"
      : "name";
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    const reset = () => {
      setFormData(emptyForm);
      setEditingId(null);
      setIsModalOpen(false);
      onSuccess?.();
    };

    if (editingId) {
      editClient({ id: editingId, ...payload }, { onSuccess: reset });
    } else {
      createClient(payload, { onSuccess: reset });
    }
  };

  const openEdit = (client: Client) => {
    setEditingId(client.id);
    setFormData({
      name: client.name,
      salary: client.salary.toString(),
      companyValuation: client.companyValuation.toString(),
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
    setEditingId(null);
  };

  return {
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
  };
}
