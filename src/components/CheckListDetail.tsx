import { useEffect, useRef, useState } from "react";
import CheckboxCheckedIcon from "@/assets/icons/checkbox/checked.svg"; // 체크된 상태의 아이콘
import CheckboxDefaultIcon from "@/assets/icons/checkbox/default.svg"; // 체크되지 않은 상태의 아이콘

interface CheckListDetailProps {
  iconSize?: number;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  text: string; // 투두 항목의 텍스트를 받을 prop 추가
  onTextChange: (newText: string) => void; // 텍스트 변경을 처리할 함수

  type?: "button" | "submit" | "checkbox";
  isDisabled?: boolean;
}

export default function CheckListDetail({
  iconSize = 32,
  isChecked,
  onChange,
  text,
  onTextChange,
  type = "checkbox",
  isDisabled = false,
}: CheckListDetailProps) {
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 텍스트의 실제 길이에 따라 input의 너비를 조정하는 함수
    const calculateWidth = () => {
      if (inputRef.current) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (context) {
          const style = window.getComputedStyle(inputRef.current);
          const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          context.font = font;
          const textMetrics = context.measureText(inputRef.current.value);
          const newWidth = Math.max(50, textMetrics.width + 10); // 최소 너비를 설정하고, 추가 공간을 더함
          setInputWidth(newWidth);
        }
      }
    };

    calculateWidth();
  }, [text]);

  const handleCheckboxClick = () => {
    if (!isDisabled) {
      onChange(!isChecked);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTextChange(e.target.value);
    setInputWidth(e.target.scrollWidth);
  };
  return (
    <div
      className={`relative w-full max-w-[996px] h-16 flex items-center justify-center
          rounded-3xl border-2 border-slate-900 mx-auto px-4
          ${isChecked ? "bg-violet-100" : "bg-white"}`}
    >
      <div className="flex items-center justify-center w-full space-x-4">
        <label className="cursor-pointer">
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
        {/* 텍스트 수정 가능하도록 input 필드 추가 */}

        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleTextChange}
          className="text-slate-900 text-2xl bg-transparent border-none focus:outline-none text-center"
          style={{
            width: `${inputWidth}px`,
          }}
        />
      </div>
    </div>
  );
}
