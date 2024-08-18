// 1. 체크박스: 상태를 토글
// 2. 라벨(텍스트): 해당 할 일의 디테일 페이지로 이동

import Link from "next/link";
import CheckboxCheckedIcon from "@/assets/icons/checkbox/checked.svg"; // 체크된 상태의 아이콘
import CheckboxDefaultIcon from "@/assets/icons/checkbox/default.svg"; // 체크되지 않은 상태의 아이콘
import { useRouter } from "next/navigation";

interface CheckListProps {
  iconSize?: number;
  isChecked: boolean;
  onChange: () => void;
  type?: "button" | "submit" | "checkbox";
  isDisabled?: boolean;
  text: string;
  itemId: number;
  tenantId: string;

}

export default function CheckList({
  iconSize = 32,
  isChecked,
  onChange,
  type = "checkbox",
  isDisabled = false,
  text,
  itemId,
  tenantId,
}: CheckListProps) {
  const router = useRouter();

  const handleCheckboxClick = () => {
    onChange(); // 부모 컴포넌트에 상태 변경 알림
  };

  return (
    <div
      className={`relative w-full h-[50px] flex items-center
          rounded-[27px] border-2 border-slate-900
          ${isChecked ? "bg-violet-100" : "bg-white"} px-3`}
    >
      <label className="flex items-center cursor-pointer">
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
      </label>
      {/* 투두 텍스트를 클릭하면 디테일 페이지로 이동 */}
      <Link href={`/items/${itemId}?tenantId=${encodeURIComponent(tenantId)}`}>
        <button
          className={`ml-4 text-slate-800 text-sm cursor-pointer ${
            isChecked ? "line-through" : ""
          }`}
        >
          {text}
        </button>
      </Link>
    </div>
  );
}
