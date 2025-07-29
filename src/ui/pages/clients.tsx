import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClientCard } from "@teddy/design-system";
import { useClients } from "../../hooks/useClients";
import { useEffect } from "react";

const queryClient = new QueryClient();

const ClientsContent = () => {
  const { data } = useClients(1);

  useEffect(() => {
  console.log(data);
  }, [data])

  return (
    <div className="p-4 w-screen h-screen flex flex-col items-center justify-center gap-4">
      {data?.clients?.map((client) => (
        <ClientCard
          key={client.id}
          name={client.name}
          salary={client.salary}
          company={client.companyValuation}
        />
      ))}
    </div>
  );
};

const ClientsScreen = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientsContent />
    </QueryClientProvider>
  );
};

export default ClientsScreen;
