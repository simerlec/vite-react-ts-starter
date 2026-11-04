interface CountButtonProps {
  count: number;
  onClick: () => void;
}

export function CountButtonComponent({ count, onClick }: CountButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-hidden"
      onClick={onClick}
    >
      Count is: {count}
    </button>
  );
}
