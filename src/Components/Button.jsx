export function Button({ variant = "primary", children, onClick }) {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      className={`px-8 py-3.5 rounded-lg font-medium transition-all ${
        isPrimary
          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
      }`}
    >
      {children}
    </button>
  );
}