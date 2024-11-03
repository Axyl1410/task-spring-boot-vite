import { cn } from "../../lib/utils";

interface TagColorProps {
  children?: string;
}

const TagColor = ({ children }: TagColorProps) => {
  const getColor = () => {
    switch (children) {
      case "pending":
        return "from-amber-400 to-amber-500";
      case "in_progress":
        return "from-sky-400 to-sky-500";
      case "completed":
        return "from-emerald-400 to-emerald-500";
      default:
        return "from-red-400 to-red-500";
    }
  };

  return (
    <span
      className={cn(
        "rounded-sm bg-gradient-to-r px-1 py-0.5 text-white",
        getColor(),
      )}
    >
      {children}
    </span>
  );
};

export default TagColor;
