import React from 'react'
import {useState} from 'react'
import {getDogsByName} from '../../actions/index';
import { useDispatch } from 'react-redux';
import './SearchBar.css'
import {emptyfilteredDogs} from '../../actions/index';

export default function SearchBar(){

const [search, setSearch] = useState('')
let dispatch = useDispatch()
    
function onSubmit(e){
 e.preventDefault();  
  dispatch(getDogsByName(search))
 //dispatch(emptyfilteredDogs())
}

function onInputChange(e){
  e.preventDefault()  
  setSearch(e.target.value)  
}
     
return (
  <form action="" onSubmit={onSubmit}>      
    <input type="text" placeholder="ingrese raza" onChange={onInputChange}  />
    <input type="submit" value="Buscar" />        
  </form>
  )
    
}
     
        
   