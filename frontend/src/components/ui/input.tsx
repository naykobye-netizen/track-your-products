// Typing for the inputs of the Input component
type inputProps = {
  name: string;
  type: string;
  placeholder: string;
  isRequired?: boolean;
};

// Component for creating inputs with a consistent design
export default function Input({ name, type, placeholder, isRequired }: inputProps) {
  return (
    <label htmlFor={name} className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-800 capitalize">
        {name}
      </span>
      
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 font-normal focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm shadow-sm"
        required={isRequired}
      />
    </label>
  );
}