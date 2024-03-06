import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const handleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleDisplay = (e) => {
    setTodo(e.target.value);
  };
  const handleFinished = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let todoEdit = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(todoEdit[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] sm:w-[80vw] md:w-[60vw] lg:w-[40vw]">
        <h1 className="font-bold text-3xl text-center mb-5">
          iTask - Manage your Todos
        </h1>
        <div className="addTodo">
          <h2 className="font-bold text-lg m-2">Add a Todo</h2>
          <div className="flex mb-3 gap-3 justify-evenly">
            <input
              type="text"
              onChange={handleDisplay}
              value={todo}
              className="w-[85%] px-3 py-1 rounded-md"
            />
            <button
              onClick={handleSave}
              disabled={todo.length < 3}
              className="bg-violet-700 hover:bg-violet-900 disabled:bg-violet-700 text-white px-3 py-1 rounded-md
              font-bold text-sm"
            >
              Save
            </button>
          </div>
        </div>
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
          name=""
          id="finish"
        />
        <label htmlFor="finish" className="m-2">
          Show Finished
        </label>
        <h2 className="font-bold text-lg m-2">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex justify-between items-center gap-5 my-3"
              >
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={handleFinished}
                    name={item.id}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    <div>{item.todo}</div>
                  </div>
                </div>
                <div className="buttons flex">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="btnStyle mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="btnStyle mx-1"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
