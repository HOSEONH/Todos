import EditIcon from "@/assets/icons/edit.svg";

interface DetailEditProps {
  size?: number;
  iconSize?: number;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function DetailEdit({
  size = 64,
  iconSize = 24,
  onClick,
  type = "button",
}: DetailEditProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center justify-center rounded-full bg-slate-900/50 border-2 border-slate-900"
      style={{ width: size, height: size }}
    >
      <EditIcon width={iconSize} height={iconSize} />
    </button>
  );
}
