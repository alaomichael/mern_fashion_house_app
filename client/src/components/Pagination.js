import React from 'react'
import '../App.css';


const Pagination = ({todosPerPage, totalTodos,paginate}) => {
   
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++){
        pageNumbers.push(i)
        console.log(pageNumbers);
    }
    return (
<nav>
<br/>
<br/>
<ul className="pagination center" >
{ pageNumbers.map(number => {
return         <li key={ number } className="page-item">
<a onClick={ () => paginate(number) } href="#" className="page-link">{ number }</a>
</li>
}) }
</ul>
</nav>
)
}
 export default Pagination
