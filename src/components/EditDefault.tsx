// import CheckIcon from "@/assets/icons/check.svg";

// interface EditDefaultProps {
//   iconSize?: number;
//   onClick?: () => void;
//   type?: "button" | "submit";
// }

// export default function EditDefault({
//   iconSize = 16,
//   onClick,
//   type = "button",
// }: EditDefaultProps) {
//   return (
//     <div className="relative">
//       {/* 그림자용 div */}
//       <div
//         className="
//           absolute
//           top-1
//           left-[3.65px]
//           w-[164.35px]
//           h-[52px]
//           rounded-3xl
//           bg-slate-900
//           border-2
//           border-slate-900"
//       />
//       {/* 실제 버튼 */}
//       <button
//         type={type}
//         onClick={onClick}
//         className="
//           relative
//           w-[164.35px]
//           h-[52px]
//           flex
//           items-center
//           justify-center
//           gap-1
//           rounded-3xl
//           bg-slate-200
//           border-2
//           border-slate-900"
//       >
//         <CheckIcon width={iconSize} height={iconSize} />
//         <span className="text-slate-900 text-base inline">수정 완료</span>
//       </button>
//     </div>
//   );
// }
