"use client";

import { useState } from "react";
import AddLargeActive from "@/components/AddLargeActive";
import Search from "@/components/Search";
import Image from "next/image";
import CheckList from "@/components/CheckList";

interface Todo {
  text: string;
  isChecked: boolean;
  itemId: string;
}

export default function TodoContainer() {
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        text: inputValue.trim(),
        isChecked: false,
        itemId: Date.now().toString(), // 고유한 itemId 생성
      };
      setActiveTodos([...activeTodos, newTodo]);
      setInputValue("");
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleToggleTodo = (index: number) => {
    const todo = activeTodos[index];
    const updatedActiveTodos = activeTodos.filter((_, i) => i !== index); // 현재 항목을 제외한 나머지를 유지
    todo.isChecked = true;
    setActiveTodos(updatedActiveTodos); // 남은 todo 리스트 업데이트
    setCompletedTodos([...completedTodos, todo]); // 완료된 리스트로 이동
  };

  const handleToggleCompletedTodo = (index: number) => {
    const todo = completedTodos[index];
    const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index); // 현재 항목을 제외한 나머지를 유지
    todo.isChecked = false;
    setCompletedTodos(updatedCompletedTodos); // 완료된 리스트에서 항목 제거
    setActiveTodos([...activeTodos, todo]); // 다시 todo 리스트로 이동
  };

  return (
    <>
      <div className="flex flex-col items-center mt-6 px-6">
        <div className="flex w-full justify-center gap-[23px]">
          <Search onSubmit={handleInputChange} value={inputValue} />
          <AddLargeActive onClick={handleAddTodo} />
        </div>

        <div className="flex flex-col w-full tablet:flex-row max-w-[1200px] justify-between mt-10">
          {/* Todo 입력 섹션 */}
          <div className="flex flex-col w-full tablet:w-1/2 justify-start">
            <div className="flex flex-col">
              <Image
                src="/images/todo.svg"
                alt="Todo"
                width={101}
                height={36}
              />
              <div className="flex flex-col items-center text-center">
                {activeTodos.length === 0 ? (
                  <>
                    <div className="relative w-[120px] h-[120px] mt-16 mobile:w-[240px] mobile:h-[240px]">
                      <Image
                        src="/images/empty/todo, large.svg"
                        alt="Empty Todo Large"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="block mt-6 text-base text-slate-400">
                      할 일이 없어요.
                      <br />
                      TODO를 새롭게 추가해주세요!
                    </span>
                  </>
                ) : (
                  <ul className="flex flex-col gap-4 mt-4 justify-start w-full">
                    {activeTodos.map((todo, index) => (
                      <CheckList
                        key={index}
                        iconSize={32}
                        isChecked={todo.isChecked}
                        onChange={() => handleToggleTodo(index)}
                        text={todo.text}
                        itemId={todo.itemId}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Done 섹션 */}
          <div className="flex flex-col w-full tablet:ml-[27px] tablet:w-1/2 mt-12 tablet:mt-0">
            <div className="flex flex-col">
              <Image src="/images/done.svg" alt="Done" width={97} height={36} />
              <div className="flex flex-col items-center text-center">
                {completedTodos.length === 0 ? (
                  <>
                    <div className="relative mt-16 w-[120px] h-[120px] mobile:w-[240px] mobile:h-[240px]">
                      <Image
                        src="/images/empty/done, large.svg"
                        alt="Empty Done Large"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="block mt-6 text-base text-slate-400">
                      아직 다 한 일이 없어요.
                      <br />
                      해야할 일을 체크해보세요!
                    </span>
                  </>
                ) : (
                  <ul className="flex flex-col gap-4 mt-4 justify-start w-full">
                    {completedTodos.map((todo, index) => (
                      <CheckList
                        key={index}
                        iconSize={32}
                        isChecked={todo.isChecked}
                        onChange={() => handleToggleCompletedTodo(index)}
                        text={todo.text}
                        itemId={todo.itemId}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
