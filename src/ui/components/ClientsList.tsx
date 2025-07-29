import { ClientCard } from "@teddy/design-system";
import type { Client } from "../../types/ClientType";

type Props = { clients: Client[] };

export function ClientsList({ clients }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          name={client.name}
          salary={client.salary}
          company={client.companyValuation}
        />
      ))}
    </div>
  );
}
