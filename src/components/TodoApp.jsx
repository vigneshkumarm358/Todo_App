import React, { useState } from 'react';
import { FaTrashCan } from "react-icons/fa6";
import { MdMovieEdit } from "react-icons/md";

const TodoApp = () => {
  const [value, setValue] = useState([
    { id: 1, name: 'HTML5', checked: true },
    { id: 2, name: 'CSS3', checked: true },
    { id: 3, name: 'React.js', checked: false },
    { id: 4, name: 'Python', checked: false }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [newValue, setNewValue] = useState('');

  function handleCheck(id) {
    setValue(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleDelete(id) {
    setValue(prev => prev.filter(item => item.id !== id));
  }

  function handleSaveOrEdit() {
    if (isEditing) {
      setValue(prev =>
        prev.map(item =>
          item.id === currentEditId ? { ...item, name: newValue } : item
        )
      );
      setIsEditing(false);
      setCurrentEditId(null);
    } else {
      setValue(prev => [
        ...prev,
        { id: prev.length + 1, name: newValue, checked: false }
      ]);
    }
    setNewValue('');
  }

  function handleEdit(id) {
    const itemToEdit = value.find(item => item.id === id);
    setNewValue(itemToEdit.name);
    setIsEditing(true);
    setCurrentEditId(id);
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">

      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">📝 To-Do List</h1>

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          name="newVal"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Add new item..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSaveOrEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {isEditing ? "Save" : "Add"}
        </button>
      </div>

      <ul className="todo-list space-y-2">
        {value.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 border-b hover:bg-gray-100 rounded-md transition duration-200"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
                className="w-5 h-5 accent-blue-500"
              />
              <label
                className={`text-lg ${item.checked ? "line-through text-gray-500" : "text-black"}`}
              >
                {item.name}
              </label>
            </div>

            <div className="flex space-x-3">
              <MdMovieEdit
                role="button"
                tabIndex={0}
                onClick={() => handleEdit(item.id)}
                className="text-yellow-500 hover:text-yellow-600 text-2xl cursor-pointer"
              />
              <FaTrashCan
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-600 text-2xl cursor-pointer"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
