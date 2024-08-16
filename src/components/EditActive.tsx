import CheckIcon from "@/assets/icons/check.svg";

interface EditActiveProps {
  iconSize?: number;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function EditActive({
  iconSize = 16,
  onClick,
  type = "button",
}: EditActiveProps) {
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
          -z-[1]"
      />
      {/* 실제 버튼 */}
      <button
        type={type}
        onClick={onClick}
        className="
          w-[164.35px]
          h-[52px]
          flex
          items-center
          justify-center
          gap-1
          rounded-3xl
          bg-lime-300
          border-2
          border-slate-900"
      >
        <CheckIcon width={iconSize} height={iconSize} />

        <span className="text-slate-900 text-base inline">수정 완료</span>
      </button>
    </div>
  );
}
