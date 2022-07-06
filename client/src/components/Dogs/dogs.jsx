import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRazas, emptyfilteredDogs, paginacion, sortByName, actualizaOrden} from '../../actions/index';
import Dog from '../Dog/dog'; 
import Paginado from "../Paginado/Paginado.jsx";
import { Link } from 'react-router-dom'
import Order from "../Order/order.jsx";
import './dogs.css'
import { ASCENDENTE, DESCENDENTE } from "../../constantes/sort"
let asc="asc"
let des="des"


export default function Dogs() {
   
  const [currentPage, setCurrentPage] = useState(1); // En una constante me guardo el estado local actual y la otra me setea el estado actual. El state inicial es 1 porque empiezo en la primer página.
  const [dogsPerPage, /*_setDogsPerPage*/] = useState(8); // Me guardo cuantos perros quiero por página.
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  let dispatch = useDispatch()  

  useEffect(()=>{
    dispatch(getRazas()) 
  },[])

   let allDogs  = useSelector((state) => state.dogs)
   let fDogs  = useSelector((state) => state.filteredDogs)
   let currentDogs

   if(fDogs.length) {
    currentDogs = fDogs.slice(indexOfFirstDog, indexOfLastDog); 
   } else currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); 

 let ord = useSelector((state) => state.orden)
      
 const paginado = (pageNumber) => {
  setCurrentPage(pageNumber);
}   
//ver cómo funciona esto:
const [orden, setOrden] = useState('');
const [valor, setValor] = useState(1);

return (
  <div>     
   <Paginado id="paginado" dogsPerPage={dogsPerPage} dogs={allDogs.length} paginado={paginado} />            
   {currentDogs.map((raza)=>{ return <Dog id={raza.id} name={raza.name} image={raza.img} minWeight={raza.minWeight} temperament={raza.temperament} key={raza.id} />})}          
 </div> 
  )   
}  