export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export const todos: Task[] = [
  {
    id: 1,
    title: "wake up",
    completed: false,
  },
  {
    id: 2,
    title: "drink coffee",
    completed: false,
  },
  {
    id: 3,
    title: "write code",
    completed: false,
  },
  {
    id: 4,
    title: "play tennis",
    completed: true,
  },
  {
    id: 5,
    title: "have dinner",
    completed: false,
  },
];
