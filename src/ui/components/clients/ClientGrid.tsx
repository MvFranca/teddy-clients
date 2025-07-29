import { ClientCard } from "@teddy/design-system";

type Client = {
  id: string;
  name: string;
  salary: number;
  companyValuation: number;
};

type Props = {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: { id: string; name: string }) => void;
  onAdd: (client: Client) => void;
};

export const ClientGrid = ({ clients, onEdit, onDelete, onAdd }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {clients.map((client) => (
      <ClientCard
        key={client.id}
        name={client.name}
        salary={client.salary}
        company={client.companyValuation}
        onEdit={() => onEdit(client)}
        onDelete={() => onDelete({ id: client.id, name: client.name })}
        onAdd={() => onAdd(client)}
      />
    ))}
  </div>
);
