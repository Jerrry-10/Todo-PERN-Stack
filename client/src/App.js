import React,{Fragment} from 'react';
import './App.css';
//components
import InputTodo from "./components/InputTodos"
import ListTodos from "./components/ListTodos"
import Login from "./components/login"
function App() {
  return (
    <Fragment>
    <div className = "container">
    <InputTodo/>
    <ListTodos/>
    <Login/>
    </div>
  
    </Fragment>
  );
}

export default App;
