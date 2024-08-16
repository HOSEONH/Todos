interface SearchProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
  value: string;
}

export default function Search({
  onSubmit,
  placeholder = "할 일을 입력해주세요", // 기본 입력 텍스트
  value,
}: SearchProps) {
  // const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSubmit) {
      // onSubmit 함수가 존재하는지 확인
      onSubmit(e.target.value);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative max-w-[1011.94px] w-full"
    >
      {/* 그림자용 div */}
      <div
        className="
          absolute
          top-[3.5px]
          left-1
          w-full
          h-[52.5px]
          rounded-3xl
          bg-slate-900
          border-2
          border-slate-900
          -z-[1]"
      />
      {/* 실제 입력 필드 */}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="
          w-full
          h-[52.5px]
          px-4 // 텍스트 입력 시 왼쪽 여백을 추가
          rounded-3xl
          bg-slate-100
          border-2
          border-slate-900
          text-slate-900
          font-sm
          focus:outline-none
          overflow-hidden 
          whitespace-nowrap 
          text-ellipsis 
          "
      />
    </form>
  );
}
