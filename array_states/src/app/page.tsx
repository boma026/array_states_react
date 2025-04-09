"use client"

import { TodoItem } from "@/types/ToDoItem";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [list,setList] = useState<TodoItem[]> ([
    { label: "fazer dever de casa", checked: false}, //EXIBIR
    { label: "comprar o bolo", checked: false}
  ])

  const [itemInput, setItemInput] = useState("");

  const handleAddButton = () => {
    if(itemInput.trim() === "")
      return;
    setList([
      ...list,
      { label: itemInput, checked: false} 
    ]);
    setItemInput("")
  }

  const deleteItem = (index: number) => {
    setList(list.filter((item, key) => {
      if(key !== index) {
        return true;
      }
      return false;
    }))
  }

  const toggleItem = (index:number) => {
    let newList = [...list];
    for (let i in newList) {
      if(index === parseInt(i)){
        newList[i].checked = !newList[i].checked;
      }
    }

     setList(newList);
  }

  return (

    <div className="w-screen h-screen flex flex-col items-center text-2xl">
      <h1 className="text-4xl mt-5">Lista de Tarefas</h1>

      <div className="flex w-full max-w-lg my-3 p-4 rounded-md bg-gray-700 border-2 border-gray-700">
        <input
          type="text"
          placeholder="O que deseja fazer?"
          className="flex-1 border border-black p-3 text-2xl text-black rounded-md mr-3"
          value={itemInput}
          onChange={e => setItemInput(e.target.value)}
          />
        <button onClick={handleAddButton}>Adcionar</button>
      </div>

      <p className="my-4 mx-2">{list.length}itens na lista</p>

      <ul className="w-full max-w-lg list-disc pl-5">
        {list.map((item, index) => (
          <li key={index}>
            <input onClick={() => toggleItem(index)} type="checkbox" checked={item.checked} className="w-6 h-6 mr-3"/>
            {item.label} - <button onClick={() => deleteItem(index)} className="hover:underline">[ deletar ]</button> </li>
        ))}
      </ul>
    </div>
  );
}
