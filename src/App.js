import React, { useEffect, useRef, useState } from 'react'
import "./App.css"
import { MdCancel } from "react-icons/md";

const App = () => {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState([])
  const initialValue = useRef(0)


  const handelChange = (e) => {
    setText(e.target.value)
  }

  const handelAdding = () => {
    const newUser = {
      id: new Date() + text,
      title: text,
      status: false
    }
    setTodos([...todos, newUser])
    setText("")
  }

  const handelDelete = (id) => {
    const filterData = todos.filter(todo => todo.id != id)
    setTodos(filterData)
  }

  const handelStatus = (id) => {
    const updateData = todos.map((item) => {
      if (item.id === id) {
        initialValue.current = initialValue.current + 1
        return { ...item, status: !item.status }
      } else {
        return item
      }
    })
    setTodos(updateData)
  }

 

  return (
    <div className='container'>
      <h1>Pending Task {todos.length - initialValue.current}</h1>
      <div>
        {todos && todos.map((ele, index) => (
          <div key={index} className="Single-data">
            {ele.status ? <p> <strike> {ele.title}</strike></p> : <p>{ele.title}</p>}
            <div>
              <button onClick={() => handelStatus(ele.id)}>Completed</button>
              <MdCancel className='icon' onClick={() => handelDelete(ele.id)} />
            </div>
          </div>
        ))}
      </div>
      <div className='input-part'>
        <input type="text" value={text} onChange={(e) => handelChange(e)} />
        <button onClick={handelAdding}>Add</button>
      </div>
    </div>
  )
}

export default App