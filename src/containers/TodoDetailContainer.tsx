"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CheckListDetail from "@/components/CheckListDetail";
import Delete from "@/components/Delete";
import DetailPlus from "@/components/DetailPlus";
import EditButton from "@/components/EditButton";

interface TodoDetailContainerProps {
  text: string;
  isChecked: boolean;
  itemId: number;
  tenantId: string;
}

export default function TodoDetailContainer({
  text,
  isChecked: initialChecked,
  itemId,
  tenantId,
}: TodoDetailContainerProps) {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [isEditActive, setIsEditActive] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 상태 관리
  const [memo, setMemo] = useState("");

  useEffect(() => {
    // 초기 메모를 불러오는 API 호출
    fetch(
      `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
        tenantId
      )}/items/${itemId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMemo(data.memo || ""); // 초기 메모 값을 설정
        setImageUrl(data.imageUrl || null); // 초기 이미지 값을 설정
      })
      .catch((error) => {
        console.error("메모를 불러오는 중 오류 발생:", error);
      });
  }, [tenantId, itemId]);

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

  // 수정 완료 버튼 클릭 시 API로 변경된 내용 전송
  const handleSave = () => {
    const updateData: { name?: string; memo?: string; imageUrl?: string } = {};
    // 업데이트할 필드가 있는 경우에만 추가합니다.
    if (memo) updateData.memo = memo;
    if (imageUrl) updateData.imageUrl = imageUrl;
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
          // throw new Error("업데이트 실패");
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "업데이트 실패");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("업데이트 성공:", data);
        setMemo(data.memo || ""); // 업데이트된 메모를 textarea에 반영
        setImageUrl(data.imageUrl || null); // 업데이트된 이미지를 상태에 반영
        setIsEditActive(false); // 수정 완료 후 버튼 비활성화
      })
      .catch((error) => {
        console.error("업데이트 중 오류 발생:", error);
      });
  };

  // 체크박스 토글 시 isChecked 상태 변경 및 서버에 반영
  const handleToggleChecked = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);

    fetch(
      `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
        tenantId
      )}/items/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: newChecked }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("상태 변경 실패");
        }
        return response.json();
      })
      .then((data) => {
        console.log("상태 변경 성공:", data);
      })
      .catch((error) => {
        console.error("상태 변경 중 오류 발생:", error);
        setIsChecked(!newChecked); // 오류 발생 시 상태 복구
      });
  };


  return (
    <>
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-[1200px] bg-white px-6 flex flex-col mx-auto overflow-hidden">
          <div className="pt-6">
            <CheckListDetail
              isChecked={isChecked}
              onChange={handleToggleChecked}
              text={text}
            />
          </div>

          <div className="flex flex-col tablet:flex-row justify-center gap-6 mt-6 space-y-4 tablet:space-y-0">
            {/* 이미지칸 */}
            <div className="relative w-full tablet:w-[384px] h-[311px] rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 flex justify-center items-center overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="img"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
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
            <div
              className="relative w-full tablet:w-[588px] h-[311px] rounded-3xl p-4 bg-cover bg-center overflow-hidden flex flex-col justify-center items-center"
              style={{ backgroundImage: "url('/images/memo.svg')" }}
            >
              <p className="text-lg text-amber-800 text-center mt-2">Memo</p>
              <textarea
                value={memo}
                onChange={handleMemoChange}
                className="w-full h-[229px] p-2 border-slate-300 rounded-lg resize-none bg-transparent"
                placeholder="메모를 입력해주세요"
              />
            </div>
          </div>

          {/* 삭제 및 수정 버튼 */}
          <div className="flex justify-center tablet:justify-end gap-4 mt-10 tablet:mt-6 w-full tablet:max-w-[996px] mx-auto">
            <EditButton isActive={isEditActive} onClick={handleSave} />
            <Delete />
          </div>
        </div>
      </div>
    </>
  );
}
