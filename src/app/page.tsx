import TodoContainer from "@/containers/TodoContainer";

export default function Home() {
  const tenantId = "ho"; // 사용자 고유 ID 강제 설정

  return (
    <div>
      <TodoContainer tenantId={tenantId} />
    </div>
  );
}
