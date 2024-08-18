import CheckIcon from "@/assets/icons/check.svg";

interface EditButtonProps {
  iconSize?: number;
  isActive: boolean; // 활성/비활성 상태를 결정하는 prop
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function EditButton({
  iconSize = 16,
  isActive,
  onClick,
  type = "button",
}: EditButtonProps) {
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
          border-slate-900
          "
      />
      {/* 실제 버튼 */}
      <button
        type={type}
        onClick={onClick}
        className={`
          relative
          w-[164.35px]
          h-[52px]
          flex
          items-center
          justify-center
          gap-1
          rounded-3xl
          border-2
          border-slate-900
          ${isActive ? "bg-lime-300" : "bg-slate-200"}
          `}
      >
        <CheckIcon width={iconSize} height={iconSize} />
        <span className="text-slate-900 text-base inline">수정 완료</span>
      </button>
    </div>
  );
}
