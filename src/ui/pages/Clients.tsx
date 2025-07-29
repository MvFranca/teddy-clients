import { ClientsList } from "../components/ClientsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ClientsScreen = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientsList />
    </QueryClientProvider>
  );
};

export default ClientsScreen;
