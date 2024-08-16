import PlusLargeIcon from "@/assets/icons/plus/plus, large.svg";

interface DetailPlusProps {
  size?: number;
  iconSize?: number;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function DetailPlus({
  size = 64,
  iconSize = 24,
  onClick,
  type = "button",
}: DetailPlusProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center justify-center rounded-full bg-slate-200"
      style={{ width: size, height: size }}
    >
      <PlusLargeIcon width={iconSize} height={iconSize} />
    </button>
  );
}
