"use client";

import { useState } from "react";
import Image from "next/image";
import CheckListDetail from "@/components/CheckListDetail";
import Delete from "@/components/Delete";
import EditDefault from "@/components/EditDefault";
import DetailPlus from "@/components/DetailPlus";

export default function TodoDetailContainer() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-[1200px] bg-white px-6 flex flex-col mx-auto overflow-hidden">
          <div className="pt-6">
            <CheckListDetail isChecked={isChecked} onChange={setIsChecked} />
          </div>

          <div className="flex flex-col tablet:flex-row justify-center gap-6 mt-6 space-y-4 tablet:space-y-0">
            {/* 이미지칸 */}
            <div className="relative w-full tablet:w-[384px] h-[311px] rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 flex justify-center items-center overflow-hidden">
              <Image src="/images/img.svg" alt="img" width={64} height={64} />
              <div className="absolute bottom-4 right-4">
                <DetailPlus />
              </div>
            </div>

            {/* 메모 입력칸 */}
            <div
              className="relative w-full tablet:w-[588px] h-[311px] rounded-3xl p-4 bg-cover bg-center overflow-hidden flex flex-col justify-center items-center"
              style={{ backgroundImage: "url('/images/memo.svg')" }}
            >
              <p className="text-lg text-amber-800 text-center mt-2">Memo</p>
              <div className="w-full h-[229px] mt-4 flex justify-center items-center overflow-hidden">
                <div
                  className="w-full h-full p-2 focus:outline-none bg-transparent text-center flex flex-col justify-start items-center overflow-auto text-sm text-slate-800 "
                  contentEditable="true"
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowAnchor: "none", // 스크롤 위치 고정 방지
                    minHeight: "100%",
                  }}
                  onInput={(e) => {
                    const element = e.target as HTMLElement;
                    element.scrollTop = 0; // 스크롤을 맨 위로 고정
                  }}
                >
                  메모를 입력해주세요!
                </div>
              </div>
            </div>
          </div>

          {/* 삭제 및 수정 버튼 */}
          <div className="flex justify-center tablet:justify-end gap-4 mt-10 tablet:mt-6 w-full tablet:max-w-[996px] mx-auto">
            <EditDefault />
            <Delete />
          </div>
        </div>
      </div>
    </>
  );
}
