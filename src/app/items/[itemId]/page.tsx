
// "use client";

// import { useParams, useSearchParams } from "next/navigation"; // useSearchParams 추가
// import { useEffect, useState } from "react";
// import TodoDetailContainer from "@/containers/TodoDetailContainer";

// interface Todo {
//   text: string;
//   isChecked: boolean;
//   itemId: string;
// }

// export default function TodoDetailPage() {
//   const { itemId } = useParams();
//   const searchParams = useSearchParams(); // URL에서 쿼리 파라미터를 가져오기 위한 훅
//   const tenantId = searchParams.get("tenantId"); // URL에서 tenantId 추출
//   const [todo, setTodo] = useState<Todo | null>(null);

//   useEffect(() => {
//     console.log("itemId and tenantId from URL:", { itemId, tenantId });

//     if (itemId && tenantId) {
//       fetch(`https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(tenantId)}/${itemId}`)
//         .then((response) => {
//           console.log("API Response status:", response.status);
//           return response.json();
//         })
//         .then((data) => {
//           console.log("API Response data:", data);
//           setTodo(data);
//         })
//         .catch((error) => {
//           console.error("API Error:", error);
//         });
//     }
//   }, [itemId, tenantId]);

//   if (!todo) {
//     return <div>Loading...</div>;
//   }

//   return <TodoDetailContainer text={todo.text} isChecked={todo.isChecked} />;
// }
// app/items/[itemId]/page.tsx

import { notFound } from 'next/navigation';
import TodoDetailContainer from '@/containers/TodoDetailContainer';

// 데이터 fetching 함수 (서버에서만 작동)
async function fetchTodoData(tenantId: string, itemId: string) {
  const res = await fetch(
    `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
      tenantId
    )}/items/${itemId}`
  );

  if (!res.ok) {
    return null; // 잘못된 itemId 또는 tenantId의 경우 null 반환
  }

  const data = await res.json();
  return data;
}

export default async function TodoDetailPage({
  params,
  searchParams,
}: {
  params: { itemId: string };
  searchParams: { [key: string]: string };
}) {
  const { itemId } = params;
  const tenantId = searchParams.tenantId;

  if (!tenantId) {
    return notFound(); // tenantId가 없을 경우 404 페이지로 리디렉션
  }

  const todo = await fetchTodoData(tenantId, itemId);

  if (!todo) {
    return notFound(); // 데이터가 없을 경우 404 페이지로 리디렉션
  }

  return (
    <TodoDetailContainer text={todo.name} isChecked={todo.isCompleted} itemId={todo.id} tenantId={tenantId}/>
  );
}
