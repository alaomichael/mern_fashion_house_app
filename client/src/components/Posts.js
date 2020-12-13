import React from 'react';

const Posts = ({todos, loading}) => {
    if(loading){
        return <h2>Loading...</h2>;
    }
    return (
       <ul className='list-group mb-4'>
       {todos.map(todo => {
           <li key={todo.id} className='list-group-item'>
           {todo.name}
           </li>
       })}
       </ul>
    );
};

export default Posts;
