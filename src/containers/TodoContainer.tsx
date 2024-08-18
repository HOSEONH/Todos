"use client";

import { useEffect, useState } from "react";
import AddLargeActive from "@/components/AddLargeActive";
import Search from "@/components/Search";
import Image from "next/image";
import CheckList from "@/components/CheckList";

interface Todo {
  id: number; // 항목의 고유 ID (서버에서 생성된 ID)
  name: string;
  isCompleted: boolean;
}

interface TodoContainerProps {
  tenantId: string;
}

export default function TodoContainer({ tenantId }: TodoContainerProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    console.log("Fetching todos for tenantId:", tenantId);
    fetch(
      `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
        tenantId
      )}/items`
    )
      .then((response) => {
        console.log("API Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("API Response data:", data);
        setTodos(data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [tenantId]);

  // 새로운 할 일 항목 추가
  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        name: inputValue.trim(),
      };
      console.log("Adding new todo:", newTodo);

      fetch(
        `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
          tenantId
        )}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        }
      )
        .then((response) => response.json())

        .then((data) => {
          console.log("Todo added successfully:", data);
          setTodos([...todos, data]);
          setInputValue("");
        })
        .catch((error) => {
          console.error("Failed to add todo:", error.message);
        });
    }
  };

  /** 할 일 항목 토긍 */
  const handleToggleTodo = (id: number) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      const updatedTodo = {
        isCompleted: !todos[todoIndex].isCompleted,
      };
      console.log("Toggling todo:", updatedTodo);

      const requestUrl = `https://assignment-todolist-api.vercel.app/api/${encodeURIComponent(
        tenantId
      )}/items/${id}`;
      console.log("PATCH request to:", requestUrl);

      fetch(requestUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(
                `Failed to update todo: ${data.message || response.statusText}`
              );
            });
          }
          const updatedTodos = [...todos];
          updatedTodos[todoIndex] = {
            ...todos[todoIndex],
            isCompleted: updatedTodo.isCompleted,
          };
          setTodos(updatedTodos);
        })
        .catch((error) => {
          console.error("Failed to toggle todo:", error.message);
        });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-6 px-6">
        <div className="flex w-full justify-center gap-[23px]">
          <Search onSubmit={setInputValue} value={inputValue} />
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
                {todos.filter((todo) => !todo.isCompleted).length === 0 ? (
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
                    {todos
                      .filter((todo) => !todo.isCompleted)
                      .map((todo) => (
                        <CheckList
                          key={todo.id}
                          iconSize={32}
                          isChecked={todo.isCompleted}
                          onChange={() => handleToggleTodo(todo.id)} // 토글 처리
                          text={todo.name}
                          itemId={todo.id}
                          tenantId={tenantId} // tenantId 전달
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
                {todos.filter((todo) => todo.isCompleted).length === 0 ? (
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
                    {todos
                      .filter((todo) => todo.isCompleted)
                      .map((todo) => (
                        <CheckList
                          key={todo.id}
                          iconSize={32}
                          isChecked={todo.isCompleted}
                          onChange={() => handleToggleTodo(todo.id)}
                          text={todo.name}
                          itemId={todo.id}
                          tenantId={tenantId}
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
