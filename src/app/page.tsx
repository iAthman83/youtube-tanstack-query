"use client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { type Task } from "@/lib/data";
import { FaRegTrashAlt } from "react-icons/fa";
import { FormEvent, FormEventHandler, useState } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  // access the client
  const queryClient = useQueryClient();

  // queries
  const { error, isPending, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("http://localhost:4000/todos").then((response) => response.json()),
  });

  // add todo mutations
  const addTodoMutation = useMutation({
    mutationFn: () =>
      fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now().toString(),
          title: userInput,
          completed: false,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setUserInput("");
    },
  });

  // delete todo mutation

  if (isPending) {
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Loading ...
    </main>;
  }
  if (error) {
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      An error occurred + {error.message}
    </main>;
  }

  if (data) {
    // console.log(data);
    const myTodos: Task[] = data;
    // setUserInput("");
    return (
      <main className="flex min-h-screen flex-col items-center p-24 space-y-8">
        <div className="bg-yellow-600 w-96 py-4 text-center text-xl">
          My todos
        </div>
        <div className="flex flex-col items-center">
          <ul className="bg-zinc-50 flex flex-col overflow-y-scroll gap-4 max-h-[350px] w-96 p-8">
            {myTodos.map((todo: any) => (
              <li key={todo.id}>
                <TodoTestCard data={todo} />
              </li>
            ))}
          </ul>
        </div>
        <section className="flex flex-row justify-between w-96">
          <input
            type="text"
            placeholder="Add todo"
            className="px-4 text-zinc-800"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            disabled={userInput === ""}
            type="submit"
            className="bg-yellow-600 py-2 px-4"
            onClick={() => addTodoMutation.mutate()}
          >
            New task
          </button>
        </section>
      </main>
    );
  }
}

type Props = {
  data: Task;
};

const TodoTestCard = (props: Props) => {
  // access the client
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: () =>
      fetch(`http://localhost:4000/todos/${props.data.id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return (
    <div className="w-full group items-center bg-zinc-800 justify-between flex flex-row p-2 border-l-4 border-l-yellow-600">
      <p>{props.data.title}</p>
      <FaRegTrashAlt
        onClick={() => deleteTodoMutation.mutate()}
        className="group-hover:inline hidden hover:cursor-pointer hover:text-red-400"
      />
    </div>
  );
};
