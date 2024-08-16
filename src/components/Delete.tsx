import DeleteIcon from "@/assets/icons/x.svg";

interface DeleteProps {
  iconSize?: number;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Delete({
  iconSize = 16,
  onClick,
  type = "button",
}: DeleteProps) {
  return (
    <div className="relative">
      {/* 그림자용 div */}
      <div
        className="
          absolute
          top-1
          left-[3.65px]
          w-[164.35px]
          h-[52px]
          rounded-3xl
          bg-slate-900
          border-2
          border-slate-900"
      />
      {/* 실제 버튼 */}
      <button
        type={type}
        onClick={onClick}
        className="
          relative
          w-[164.35px]
          h-[52px]
          flex
          items-center
          justify-center
          gap-1
          rounded-3xl
          bg-rose-500
          border-2
          border-slate-900"
      >
        <DeleteIcon width={iconSize} height={iconSize} className="text-white" />
        <span className="text-white text-base inline">삭제하기</span>
      </button>
    </div>
  );
}
