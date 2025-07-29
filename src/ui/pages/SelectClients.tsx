import { ClientCard, Button } from "@teddy/design-system";
import { useSelectedClientsStore } from "../../store/useSelectedClientsStore";
import { toast } from "react-toastify";

const SelectedClientsScreen = () => {
  const selectedClients = useSelectedClientsStore((s) => s.selectedClients);
  const removeClient = useSelectedClientsStore((s) => s.removeClient);
  const clearClients = useSelectedClientsStore((s) => s.clearClients);

  const handleClear = () => {
    clearClients();
    toast.success("Clientes selecionados limpos com sucesso!");
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-start py-8">
      <div className="max-w-[1200px] w-full flex flex-col gap-y-2.5">
        <p className="text-black text-lg font-bold mb-2">
          Clientes selecionados:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-2">
          {selectedClients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              salary={client.salary}
              company={client.companyValuation}
              variant="simple"
              onDeleteSelect={() => removeClient(client.id)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={handleClear}
          fullWidth
          className="text-red-500 border-red-300"
          size="sm"
        >
          Limpar clientes selecionados
        </Button>
      </div>
    </div>
  );
};

export default SelectedClientsScreen;
