import React, { useEffect, useRef, useState } from 'react'
import "./App.css"
import { MdCancel } from "react-icons/md";

const App = () => {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState([])
const [count, setCount]=useState(0)

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
    setCount(count+1)
  }
  const handelDelete = (id) => {
    todos.forEach(ele => {
      if ((ele.id === id) && ele.status === false) {
        setCount(count - 1)
      }
    })
    const filterData = todos.filter((item) => item.id !== id);
    setTodos(filterData)
  }

  const handelStatus = (id) => {
    const updateData = todos.map((item) => {
      if (item.id === id) {
        count > 0 && setCount(count - 1)

        return { ...item, status: !item.status }

      } else {
        return item
      }
    })
    setTodos(updateData)
  }

 

  return (
    <div className='container'>
      <h1>Pending Task ({count})</h1>
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
