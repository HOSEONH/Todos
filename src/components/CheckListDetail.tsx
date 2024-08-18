import CheckboxCheckedIcon from "@/assets/icons/checkbox/checked.svg"; // 체크된 상태의 아이콘
import CheckboxDefaultIcon from "@/assets/icons/checkbox/default.svg"; // 체크되지 않은 상태의 아이콘

interface CheckListDetailProps {
  iconSize?: number;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  text: string; // 투두 항목의 텍스트를 받을 prop 추가

  type?: "button" | "submit" | "checkbox";
  isDisabled?: boolean;
}

export default function CheckListDetail({
  iconSize = 32,
  isChecked,
  onChange,
  text,
  type = "checkbox",
  isDisabled = false,
}: CheckListDetailProps) {
  const handleCheckboxClick = () => {
    if (!isDisabled) {
      onChange(!isChecked);
    }
  };

  return (
    <div
      className={`relative w-full max-w-[996px] h-16 flex items-center justify-center
          rounded-3xl border-2 border-slate-900 mx-auto
          ${isChecked ? "bg-violet-100" : "bg-white"}`}
    >
      <label className="flex items-center gap-4 ml-3 cursor-pointer">
        <input
          type={type}
          className="hidden"
          disabled={isDisabled}
          checked={isChecked}
          onChange={handleCheckboxClick}
        />
        {/* 체크 여부에 따라 아이콘을 변경 */}
        {isChecked ? (
          <CheckboxCheckedIcon width={iconSize} height={iconSize} />
        ) : (
          <CheckboxDefaultIcon width={iconSize} height={iconSize} />
        )}
        <p className="text-slate-900 text-2xl underline">{text}</p>
      </label>
    </div>
  );
}
