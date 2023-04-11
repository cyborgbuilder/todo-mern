import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components'

const api_base = "http://localhost:9000";

function App() {

  const [todos, setTodos] = useState([]);
  const [popUpAvtive, setPopUpActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, [])

  const GetTodos = () => {
    fetch(api_base + '/todo/sync')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err))
  }

  const completeTodo = async id => {
    const data = await fetch(api_base + '/todo/complete/' + id)
      .then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if(todo._id === data._id){
        todo.complete = data.complete;
      }

      return todo;
    }))  
  }

  const deleteTodo = async id => {
    const data = await fetch(api_base + '/todo/delete/' + id, {
      method: "DELETE"
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id))
  }
  
  return (
    <div className="App">
      <Container>
        <Wrap>
          <Head>
            <h1>FLORENCE TO-DO APP</h1>
          </Head>
          <Body>
            
              {todos.map(todo => (
                <Slot className={'todo ' + (todo.complete ? "is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}> 
                <div className='checkbox'></div>
                <h2>{todo.text}</h2>
                <div className='delete' onClick={() => deleteTodo(todo._id)}>x</div>
                </Slot>
              ))}

              <div className='addPopUp' onClick={() => setPopUpActive(true)}>+</div>

              {popUpAvtive ? (
                <div className='popUp'>
                  <div className='closePopUp' onClick={() => setPopUpActive(false)}>x</div>
                  <h3>Add Task</h3>
                  { newTodo }
                  <input type='text'
                  className='add-todo-input'
                  onChange={e => setNewTodo(e.target.value)}
                  value={newTodo} />
                </div>
              ) : ''}
          </Body>
        </Wrap>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  psoition: relative;


`

const Wrap = styled.div`
  width: 95%;
  height: 100%;
  flex-direction: column;

  

`

const Head = styled.div`
padding: 50px;
h1{
  text-align: center;
}
`

const Body = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;


`

const Slot = styled.div`
  background: black;
  width: 80%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  color: #fff;
  position: relative;

   
 


`



export default App;
