import TodoDetailContainer from "@/containers/TodoDetailContainer";

interface TodoDetailPageProps {
  params: {
    itemId: string;
  };
}

export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { itemId } = params;

  return (
    <>
      <TodoDetailContainer />
    </>
  );
}
