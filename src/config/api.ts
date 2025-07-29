const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("Erro ao processar os dados.");
}

export { API_URL };