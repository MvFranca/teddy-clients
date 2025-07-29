import { Modal } from "@teddy/design-system";

type Props = {
  client?: { id: string; name: string } | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ClientDeleteModal = ({ client, isDeleting, onClose, onConfirm }: Props) => (
  <Modal
    isOpen={!!client}
    onClose={onClose}
    title="Excluir Cliente:"
    textButton={isDeleting ? "Excluindo..." : "Excluir Cliente"}
    onConfirm={onConfirm}
  >
    <p>
      Você está prestes a excluir o cliente:{" "}
      <span className="text-black font-bold">{client?.name}</span>
    </p>
  </Modal>
);
