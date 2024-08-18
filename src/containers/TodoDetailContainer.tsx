"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CheckListDetail from "@/components/CheckListDetail";
import DetailEdit from "@/components/DetailEdit";
import DetailPlus from "@/components/DetailPlus";
import EditButton from "@/components/EditButton";
import Delete from "@/components/Delete";

interface TodoDetailContainerProps {
  text: string;
  isChecked: boolean;
  itemId: number; // 항목 고유 ID
  tenantId: string; // 사용자 고유 ID
}

/**
 * TodoDetailContainer 컴포넌트
 * 특정 투두 항목의 상세 정보를 보고, 수정 및 삭제하는 컴포넌트
 * 기능 : 텍스트, 체크 상태 여부, 메모, 이미지 업로드 수정 및 삭제
 */
export default function TodoDetailContainer({
  text: initialText,
  isChecked: initialChecked,
  itemId,
  tenantId,
}: TodoDetailContainerProps) {
  const router = useRouter();

  const [text, setText] = useState(initialText); // 텍스트 상태 추가
  const [isChecked, setIsChecked] = useState(initialChecked); // 체크박스 상태 관리
  const [isEditActive, setIsEditActive] = useState(false); // 수정 완료 버튼 활성화 상태 관리
  const [memo, setMemo] = useState(""); // 메모 내용 상태 관리
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 URL 상태 관리

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /*
   * API를 호출하여 데이터를 가져오는 훅
   */
  useEffect(() => {
    fetch(
      `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
        tenantId
      )}/items/${itemId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMemo(data.memo || "");
        setImageUrl(data.imageUrl || null);
        setIsChecked(data.isCompleted || false);
        setText(data.name || "");
      })
      .catch((error) => {
        console.error("메모를 불러오는 중 오류 발생:", error);
      });
  }, [tenantId, itemId]);

  /**
   * 메모의 내용을 수평, 수직 중앙 정렬을 위해 높이를 자동으로 조정해주는 훅
   */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 기존 높이를 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞춰 높이 조정
    }
  }, [memo]);

  /**
   * 텍스트가 변경되면 호출되는 함수
   * @param newText - 사용자가 입력한 새로운 텍스트
   */
  const handleTextChange = (newText: string) => {
    setText(newText);
    setIsEditActive(true);
  };

  /**
   * 메모 내용이 변경되면 호출되는 함수
   * @param e - textarea 요소에서 발생한 이벤트
   */
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
    setIsEditActive(true);
  };

  /**
   * 사용자가 이미지를 업로드하면 호출되는 함수
   * @param e - 파일 입력 요소에서 발생한 이벤트
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기가 5MB를 초과할 수 없습니다.");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(
          `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
            tenantId
          )}/images/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("이미지 업로드 실패");
        }

        const data = await response.json();
        const uploadedUrl = data.url;

        if (uploadedUrl) {
          setImageUrl(uploadedUrl);
          setIsEditActive(true);
        } else {
          throw new Error("이미지 URL을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
      }
    }
  };

  /**
   * DetailPlus 버튼을 클릭하면 파일 입력 창이 열리게 하는 함수
   */
  const handleDetailPlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 창 열기
    }
  };

  /**
   * 수정 완료 버튼을 클릭하면 변경된 데이터를 서버로 전송하는 함수
   */
  const handleSave = () => {
    const updateData: {
      name?: string;
      memo?: string;
      imageUrl?: string;
      isCompleted?: boolean;
    } = {};

    // 변경할 내용이 있는 경우에만 업데이트
    if (text) updateData.name = text;
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
        setText(data.name || "");
        setMemo(data.memo || "");
        setImageUrl(data.imageUrl || null);
        setIsEditActive(false);
        router.push("/"); // 수정 후 투두 메인 페이지로 이동
      })
      .catch((error) => {
        console.error("업데이트 중 오류 발생:", error);
      });
  };

  /**
   * 체크 상태를 변경하고 서버로 전송하는 함수
   */
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

  /**
   * 삭제 함수
   */
  const handleDelete = () => {
    fetch(
      `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
        tenantId
      )}/items/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("삭제 실패");
        }
        return response.json();
      })
      .then(() => {
        console.log("삭제 성공");
        router.push("/"); // 삭제 성공 시 메인 페이지로 리다이렉트
      })
      .catch((error) => {
        console.error("삭제 중 오류 발생:", error);
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
              onTextChange={handleTextChange}
            />
          </div>

          <div className="flex flex-col tablet:flex-row justify-center gap-6 mt-6 space-y-4 tablet:space-y-0">
            {/* 이미지칸 */}
            <div
              className={`relative w-full tablet:w-[384px] h-[311px] rounded-3xl ${
                imageUrl
                  ? "border-none"
                  : "border-2 border-dashed border-slate-300"
              } bg-slate-50 flex justify-center items-center overflow-hidden`}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="img"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <Image src="/images/img.svg" alt="img" width={64} height={64} />
              )}
              <div className="absolute bottom-4 right-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {/* 이미지가 있을 때 DetailEdit 버튼, 없을 때 DetailPlus 버튼 */}
                {imageUrl ? (
                  <DetailEdit onClick={handleDetailPlusClick} />
                ) : (
                  <DetailPlus onClick={handleDetailPlusClick} />
                )}
              </div>
            </div>

            {/* 메모 입력칸 */}
            <div className="relative w-full tablet:w-[588px] h-[311px] rounded-3xl p-4 bg-cover bg-center bg-[url('/images/memo.svg')] flex flex-col justify-center items-center">
              <p className="flex w-12 h-[18px] top-6 justify-center text-lg text-amber-800 text-center absolute">
                Memo
              </p>
              <textarea
                ref={textareaRef}
                value={memo}
                onChange={handleMemoChange}
                className="w-full h-auto min-h-[100px] max-h-[220px] p-2 mt-14 border-slate-300 rounded-lg resize-none bg-transparent text-sm text-slate-800 text-center"
                placeholder="메모를 입력해주세요"
              />
            </div>
          </div>

          {/* 삭제 및 수정 버튼 */}
          <div className="flex justify-center tablet:justify-end gap-4 mt-10 tablet:mt-6 w-full tablet:max-w-[996px] mx-auto">
            <EditButton isActive={isEditActive} onClick={handleSave} />
            <Delete onClick={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
}
