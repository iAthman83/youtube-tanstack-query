import React from "react";
import type { Task } from "@/lib/data";

type Props = {
  data: Task;
};

const TodoCard = (props: Props) => {
  return (
    <div className="w-full bg-zinc-800">
      <p>{props.data.title}</p>
    </div>
  );
};

export default TodoCard;
