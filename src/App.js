import React, {useState, useEffect} from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  //Now after basckend
  //INSTEAD OF THIS LINE WE CAN WRITE BELOW ONE const [todos, setTodos] = useState(['Take dogs for a walk','Take rubbish out']);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed

  //useEffect(functon, dependencies);
  useEffect(() => {
    //this code here...fires when the app.js loads
    db.collection('todos').orderBy('timeStamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo}))); //here doc means todo sting that we add
    })
  }, []);

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault(); //will stop the REFRESH
    
    db.collection('todos').add({ 
      todo: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp() //want to get firebase server time not our time
    })
   
    setTodos([...todos, input]); //we are updating setTodo list...apped the input...and when we refresh it goes away cuz its in short term memory not in actual database
    setInput(''); //clear up the input after clicking add todo button
  }

  //we wrap it in a form cuz naturally when we write something and enter it gonna submit the form but without form it not gonna submit 
  
  return (
    <div className="App">
      <h1>Hello there! </h1>
      <form> 
        
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/> 
        </FormControl>
        
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
        { /*<button >Add Todo</button> */}
      </form>
      
      
      <ul>
        {todos.map(todo => ( //map goes through array(todo array) and gets first one and pops out and it loop through get the 2nd one 
          <Todo text={todo} />
          // <li>{todo}</li>   //{todo} =>it is jsx{}
        ))}
      </ul>
    
    </div>
  );
}

export default App;
