import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux";
import SearchBar from '../SearchBar/searchBar'
import Dogs from '../Dogs/dogs'
import Order from '../Order/order'
import './Nav.css'
import {getRazas} from '../../actions/index';
import {connect} from 'react-redux';
//import {updateData} from '../Dogs/dogs'
import {emptyFilteredDogs, emptyDetailDog} from '../../actions/index';
//NO CAMBIEN EL CLASS COMPONENT A FUNCTIONAL COMPONENT PORQUE SINO LOS TEST NO VAN A CORRER!!!

function handleClick(e) {
  //window.alert('ok')
  e.preventDefault();
  //mapDispatchToProps;
  //setCurrentPage(1);
  //dispatch(getRazas())
}

// function emptyFiltered(){
//   let dispatch = useDispatch()  
//   dispatch(emptyfilteredDogs())
// }


export default function Nav(){ 
  let dispatch = useDispatch()
        return (     
              
            <div id="container">    
 
              <Link to="/">                
                 <button className='nav' onClick={()=>{
                   dispatch(emptyFilteredDogs());
                   //dispatch(emptyDetailDog());

                   //escribir la action que limpie
                   //el estado detailDog cada vez que
                   //vaya al index
                   
                   }}>
                  Home
                 </button>  
              </Link> 

                <Link to="/add">                  
                  <button className='nav' >
                    Nueva Raza
                  </button>
                </Link> 
              
               <SearchBar className="searchBar" />   
                          
            </div>
        )
    }
 
