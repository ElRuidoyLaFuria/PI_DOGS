import React from 'react'
import { ASCENDENTE, DESCENDENTE, asc } from "../../constantes/sort"
import { sort, sortByName, sortByWeight, actualizaOrden, getRazas } from "../../actions"
import "../Dogs/dogs"
import './order.css'
import { useDispatch } from "react-redux"


export default function Order(){

const dispatch = useDispatch()
  //const [currentPage, setCurrentPage] = useState(1);
  //const [_orden, setOrden] = useState('');
  
  function handleSortByName(e) {     
    e.preventDefault();    
    dispatch(actualizaOrden(e.target.value))
    dispatch(sortByName(e.target.value));
    
     //setCurrentPage(1);
     //setOrden(`Ordenado ${e.target.value}`);
     
}

function handleSortByWeight(e) {     
  e.preventDefault();
  //dispatch(getRazas(e.target.value));
  dispatch(actualizaOrden(e.target.value))
  dispatch(sortByWeight(e.target.value));
  //setCurrentPage(1);
   //setOrden(`Ordenado ${e.target.value}`);
   
}

 
  
  return (
  <div id="order">
  <span> alfabeticamente </span>  
  <select name="select" onChange={(e) => handleSortByName(e)}>   
    <option value={asc} selected>ascendente</option>
    <option value={DESCENDENTE}>descendente</option>  
  </select>

 
<span> Por peso </span>   
  <select name="selectPeso" onChange={(e) => handleSortByWeight(e)}>   
    <option value={asc} selected>ascendente</option>
    <option value={DESCENDENTE}>descendente</option>  
  </select> 
  </div>
   
  )
  
  
}