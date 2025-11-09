export default function Search({
  value,
  onChange,
  placeholder = "Search...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
    className="w-full p-2 rounded border border-zinc-600 bg-white text-black"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    />
  );
}
