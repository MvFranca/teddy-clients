import { PerPageSelector } from "../PerPageSelector";

type Props = {
  total: number;
  perPage: number;
  onPerPageChange: (value: number) => void;
};

export const ClientHeader = ({ total, perPage, onPerPageChange }: Props) => (
  <div className="flex justify-between items-center">
    <p className="text-black text-lg">
      <span className="font-bold">{total}</span> clientes encontrados:
    </p>
    <PerPageSelector perPage={perPage} onChange={onPerPageChange} />
  </div>
);
