import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const dummyTodos = [
  {
    id: 1,
    title: "Complete online Javascript course",
    completed: false,
  },

  {
    id: 2,
    title: "Revamp github porfile",
    completed: true,
  },

  {
    id: 3,
    title: "Watch a movie",
    completed: true,
  },

  {
    id: 4,
    title: "Read, play game and rest",
    completed: false,
  },

  {
    id: 5,
    title: "Go to church on Sunday",
    completed: false,
  },

  {
    id: 6,
    title: "Today is bored, productive and determined",
    completed: false,
  },
];

function App() {
  const { theme, setTheme } = useTheme();
  const [todos, setTodos] = useState(dummyTodos);
  const [filterdTodo, setFilteredTodo] = useState(todos);
  const [filter, setFilter] = useState<
    "all" | "active" | "completed" | "clear"
  >("all");
  const [inputTodo, setInputTodo] = useState("");

  const handleCompleted = (id: number) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
  };

  const handleClick = (): void => {
    if (!inputTodo) {
      alert("enter your task");
      return;
    }
    setTodos([
      ...todos,
      { id: todos.length + 1, title: inputTodo, completed: false },
    ]);

    setInputTodo("");
  };

  const handleActiveTodo = () => {
    setFilter("active");
    const active = todos.filter((t) => !t.completed);
    setFilteredTodo(active);
  };

  const handleCompletedTodo = () => {
    setFilter("completed");
    const completed = todos.filter((t) => t.completed);
    setFilteredTodo(completed);
  };

  const handleAllTodo = () => {
    setFilter("all");
  };

  const handleClearCompleted = () => {
    const clear = todos.filter((t) => !t.completed);
    setTodos(clear);
    setFilteredTodo([]);
  };

  const displayTodos = filter === "all" ? todos : filterdTodo;
  const itemsLeft = todos.filter((t) => !t.completed);

  return (
    <div className="todo">
      <>
        {theme === "light" ? (
          <img
            src="/img/bg-desktop-light.jpg"
            alt="background"
            className="todo__img-bkg"
          />
        ) : (
          <img
            src="/img/bg-desktop-dark.jpg"
            alt="background"
            className="todo__img-bkg"
          />
        )}
        {theme === "light" ? (
          <img
            src="/img/bg-mobile-light.jpg"
            alt="background"
            className="todo__img-bkg-mobile"
          />
        ) : (
          <img
            src="/img/bg-mobile-dark.jpg"
            alt="background"
            className="todo__img-bkg-mobile"
          />
        )}
      </>
      <div className="todo__main">
        <div className="todo__heading">
          <h1>Todo</h1>
          <div className="todo__theme-switch">
            {theme === "light" ? (
              <img
                src="/img/icon-moon.svg"
                alt="light-theme"
                onClick={() => setTheme("dark")}
              />
            ) : (
              <img
                src="/img/icon-sun.svg"
                alt="dark-theme"
                onClick={() => setTheme("light")}
              />
            )}
          </div>
        </div>
        <div className="todo__input-container todo__input-container--2">
          <div className="todo__circle" onClick={handleClick}>
            <div className="todo__circle-inner"></div>
          </div>
          <input
            type="text"
            name="inputTodo"
            placeholder="Create a new todo"
            onChange={(e) => setInputTodo(e.target.value)}
            value={inputTodo}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
          />
        </div>
        <div className="todo__content">
          {todos.length ? (
            <>
              <div className="todo__container">
                <div className="todo__all-list">
                  {displayTodos.length ? (
                    displayTodos.map((todo) => (
                      <div
                        className={`todo__list ${
                          todo.completed ? "todo__list--completed" : ""
                        }`}
                        key={todo.id}
                      >
                        <div
                          className={`todo__circle ${
                            todo.completed ? "todo__circle--completed" : ""
                          }`}
                          onClick={() => handleCompleted(todo.id)}
                        >
                          <div
                            className={`todo__circle-inner ${
                              todo.completed
                                ? "todo__circle-inner--completed"
                                : ""
                            }`}
                          >
                            {todo.completed && (
                              <img src="/img/icon-check.svg" alt="check" />
                            )}
                          </div>
                        </div>
                        <p>{todo.title}</p>
                        <img
                          src="/img/icon-cross.svg"
                          className="todo__list--cancel"
                          alt="cancel"
                          onClick={() => handleDelete(todo.id)}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="todo__empty">
                      No todo in your current filter
                    </p>
                  )}
                </div>
              </div>
              <div className="todo__footer">
                <p>{itemsLeft.length} item(s) left</p>
                <div className="todo__filter">
                  <span
                    className={filter === "all" ? "todo__filter--active" : ""}
                    onClick={handleAllTodo}
                  >
                    All
                  </span>
                  <span
                    className={
                      filter === "active" ? "todo__filter--active" : ""
                    }
                    onClick={handleActiveTodo}
                  >
                    Active
                  </span>
                  <span
                    className={
                      filter === "completed" ? "todo__filter--active" : ""
                    }
                    onClick={handleCompletedTodo}
                  >
                    Completed
                  </span>
                </div>
                <p
                  className="todo__footer-clear"
                  onClick={handleClearCompleted}
                >
                  Clear Completed
                </p>
              </div>
            </>
          ) : (
            <p className="todo__empty">Add your first Todo</p>
          )}
        </div>
        {todos.length ? (
          <div className="todo__filter--2">
            <span
              className={filter === "all" ? "todo__filter--active" : ""}
              onClick={handleAllTodo}
            >
              All
            </span>
            <span
              className={filter === "active" ? "todo__filter--active" : ""}
              onClick={handleActiveTodo}
            >
              Active
            </span>
            <span
              className={filter === "completed" ? "todo__filter--active" : ""}
              onClick={handleCompletedTodo}
            >
              Completed
            </span>
          </div>
        ) : null}
        <div className="todo__drag">
          <p>Drag and drop to reorder list</p>
        </div>
      </div>
    </div>
  );
}

export default App;
