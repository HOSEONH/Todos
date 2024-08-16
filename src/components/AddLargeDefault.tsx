import PlusIcon from "@/assets/icons/plus/plus.svg";

interface AddLargeDefaultProps {
  iconSize?: number;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function AddLargeDefault({
  iconSize = 16,
  onClick,
  type = "button",
}: AddLargeDefaultProps) {
  return (
    <div className="relative">
      {/* 그림자용 div */}
      <div
        className="
          absolute
          top-1
          left-[3.65px]
          w-[54.78px]
          h-[52px]
          mobile:w-[164.35px]
          mobile:h-[52px]
          rounded-full
          mobile:rounded-3xl
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
          w-[54.78px]
          h-[52px]
          mobile:w-[164.35px]
          mobile:h-[52px]
          flex
          items-center
          justify-center
          gap-0
          mobile:gap-1
          rounded-full
          mobile:rounded-3xl
          bg-slate-200
          border-2
          border-slate-900"
      >
        <PlusIcon width={iconSize} height={iconSize} className="text-slate-900" />

        {/* 큰 화면에서는 텍스트 보이게, 작은 화면에서는 숨김 */}
        <span className="text-slate-900 text-base hidden mobile:inline">
          추가하기
        </span>
      </button>
    </div>
  );
}
