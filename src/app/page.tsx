import TodoContainer from "@/containers/TodoContainer";

export default function Home() {
  const tenantId = "defaultUser"; // 고정된 tenantId 설정

  return (
    <div>
      <TodoContainer tenantId={tenantId} />
    </div>
  );
}
