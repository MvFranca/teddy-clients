import { Modal } from "@teddy/design-system";
import { ClientModalForm } from "../forms/ClientModalForm";

type Props = {
  isOpen: boolean;
  isEditing: boolean;
  isPending: boolean;
  formData: {
    name: string;
    salary: string;
    companyValuation: string;
  };
  errors: Record<string, string>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (label: string, value: string) => void;
};

export const ClientFormModal = ({
  isOpen,
  isEditing,
  isPending,
  formData,
  errors,
  onClose,
  onSubmit,
  onChange,
}: Props) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={isEditing ? "Editar Cliente:" : "Criar cliente:"}
    textButton={
      isEditing
        ? isPending
          ? "Salvando..."
          : "Salvar"
        : isPending
        ? "Criando..."
        : "Criar Cliente"
    }
    onSubmit={onSubmit}
  >
    <div className="mb-[5px]">
      {[
        { label: "Nome", type: "text", placeholder: "Digite o nome" },
        { label: "Salário", type: "number", placeholder: "Digite o salário" },
        {
          label: "Empresa",
          type: "text",
          placeholder: "Digite o valor da empresa",
        },
      ].map((input, i) => (
        <ClientModalForm
          key={i}
          input={input}
          value={formData}
          errors={errors}
          onChange={onChange}
        />
      ))}
    </div>
  </Modal>
);
