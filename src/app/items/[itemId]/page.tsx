import { notFound } from "next/navigation";
import TodoDetailContainer from "@/containers/TodoDetailContainer";

/**
 * TodoDetailPage 특정 투두 항목의 상세 정보 페이지를 렌더링
 * @param tenantId - 사용자 고유 ID
 * @param itemId - 항목 고유 ID
 * @returns {Promise<object | null>} - Todo 데이터를 포함한 객체 또는 잘못된 ID일 경우 null을 반환
 */
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
    return notFound();
  }

  // 해당 tenantId와 itemId로 Todo 데이터 가져오기
  const todo = await fetchTodoData(tenantId, itemId);

  if (!todo) {
    return notFound();
  }

  return (
    <TodoDetailContainer
      text={todo.name}
      isChecked={todo.isCompleted}
      itemId={todo.id}
      tenantId={tenantId}
    />
  );
}
