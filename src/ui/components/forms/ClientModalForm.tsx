// forms/ClientModalForm.tsx
import { Input } from "@teddy/design-system";

interface ClientModalFormProps {
  input: { label: string; type: string; placeholder: string };
  value: {
    name: string;
    salary: string;
    companyValuation: string;
  };
  errors: Record<string, string>;
  onChange: (label: string, value: string) => void;
}

export const ClientModalForm = ({
  input,
  value,
  errors,
  onChange,
}: ClientModalFormProps) => {
  const key = input.label.toLowerCase().includes("empresa")
    ? "companyValuation"
    : input.label.toLowerCase().includes("salário")
    ? "salary"
    : "name";

  return (
    <div className="mb-2">
      <label className="block text-sm font-medium mb-1">{input.label}</label>
      <Input
        type={input.type}
        placeholder={input.placeholder}
        value={value[key]}
        onChange={(e) => onChange(input.label, e.target.value)}
        fullWidth
        size="sm"
        className={errors[key] ? "border-red-500" : ""}
      />
      {errors[key] && (
        <p className="text-red-600 text-sm mt-1">{errors[key]}</p>
      )}
    </div>
  );
};
