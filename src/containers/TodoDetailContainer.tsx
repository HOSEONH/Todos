"use client";

import { useState } from "react";
import Image from "next/image";
import CheckListDetail from "@/components/CheckListDetail";
import Delete from "@/components/Delete";
import EditDefault from "@/components/EditDefault";
import DetailPlus from "@/components/DetailPlus";
import EditButton from "@/components/EditButton";

interface TodoDetailContainerProps {
  text: string;
  isChecked: boolean;
  itemId: number;
  tenantId: string;
}

export default function TodoDetailContainer({ text, isChecked: initialChecked, itemId,  tenantId}: TodoDetailContainerProps) {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const [isEditActive, setIsEditActive] = useState(false);

  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 상태 관리

  
  const handleEditToggle = () => {
    setIsEditActive(!isEditActive);
    // 추가적인 로직을 여기에 추가할 수 있습니다. 예: API 호출 등.
  };

  const [memo, setMemo] = useState("");
  // const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setMemo(e.target.value);
  // };


    // 메모 내용 변경 시 버튼 활성화
    const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMemo(e.target.value);
      setIsEditActive(true); // 메모 내용이 변경되면 버튼 활성화
    };

    // 이미지 업로드 시 버튼 활성화 
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result as string); // 이미지 URL을 상태에 저장
          setIsEditActive(true); // 이미지가 업로드되면 버튼 활성화
        };
        reader.readAsDataURL(file);
      }
    };

  // const handleMemoSave = () => {
  //   fetch(
  //     `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
  //       tenantId
  //     )}/items/${itemId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ memo }),
  //     }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("메모 업데이트 실패");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("메모가 성공적으로 업데이트되었습니다:", data);
  //     })
  //     .catch((error) => {
  //       console.error("메모 업데이트 중 오류 발생:", error);
  //     });
  // };

  // 수정 완료 버튼 클릭 시 API로 변경된 내용 전송
  const handleSave = () => {
    const updateData = {
      memo,
      imageUrl,
    };
    fetch(
      `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
        tenantId
      )}/items/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("업데이트 실패");
        }
        return response.json();
      })
      .then((data) => {
        console.log("업데이트 성공:", data);
        setIsEditActive(false); // 수정 완료 후 버튼 비활성화
      })
      .catch((error) => {
        console.error("업데이트 중 오류 발생:", error);
      });
  };

  return (
    <>
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-[1200px] bg-white px-6 flex flex-col mx-auto overflow-hidden">
          <div className="pt-6">
            <CheckListDetail isChecked={isChecked} onChange={setIsChecked} text={text}/>
          </div>

          <div className="flex flex-col tablet:flex-row justify-center gap-6 mt-6 space-y-4 tablet:space-y-0">
            {/* 이미지칸 */}
            <div className="relative w-full tablet:w-[384px] h-[311px] rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 flex justify-center items-center overflow-hidden">

            {imageUrl ? (
              <Image src={imageUrl} alt="img" layout="fill" objectFit="cover" />
              
            ):(
              <Image src="/images/img.svg" alt="img" width={64} height={64} />
              
            )}
            {/* <div className="relative w-full tablet:w-[384px] h-[311px] rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 flex justify-center items-center overflow-hidden"> */}
              {/* <Image src="/images/img.svg" alt="img" width={64} height={64} /> */}
              <div className="absolute bottom-4 right-4">
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <DetailPlus />
              </div>
            </div>

            {/* 메모 입력칸 */}
            {/* <div
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
          </div> */}


            {/* 메모 입력칸 */}
            <div
              className="relative w-full tablet:w-[588px] h-[311px] rounded-3xl p-4 bg-cover bg-center overflow-hidden flex flex-col justify-center items-center"
              style={{ backgroundImage: "url('/images/memo.svg')" }}
            >
              <p className="text-lg text-amber-800 text-center mt-2">Memo</p>
              <textarea
                value={memo}
                onChange={handleMemoChange}
                // onBlur={handleMemoSave} // 포커스가 벗어났을 때 저장
                className="w-full h-[229px] p-2 border-slate-300 rounded-lg resize-none bg-transparent"
                placeholder="메모를 입력해주세요"
              />
            </div>
          </div>

          {/* 삭제 및 수정 버튼 */}
          <div className="flex justify-center tablet:justify-end gap-4 mt-10 tablet:mt-6 w-full tablet:max-w-[996px] mx-auto">
            <EditButton isActive={isEditActive} onClick={handleSave}/>
            <Delete />
          </div>
        </div>
      </div>
    </>
  );
}
