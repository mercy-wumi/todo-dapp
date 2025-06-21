import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Todo({
  todo,
  completed,
  deleteTodo,
}: {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  completed: () => void;
  deleteTodo: () => void;
}) {
  const { id } = todo;
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      className={`todo__list ${todo.completed ? "todo__list--completed" : ""}`}
      key={todo.id}
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <div
        className={`todo__circle ${
          todo.completed ? "todo__circle--completed" : ""
        }`}
        onClick={completed}
      >
        <div
          className={`todo__circle-inner ${
            todo.completed ? "todo__circle-inner--completed" : ""
          }`}
        >
          {todo.completed && <img src="/img/icon-check.svg" alt="check" />}
        </div>
      </div>
      <p {...listeners}>{todo.title}</p>
      <img
        src="/img/icon-cross.svg"
        className="todo__list--cancel"
        alt="cancel"
        onClick={deleteTodo}
      />
    </div>
  );
}
