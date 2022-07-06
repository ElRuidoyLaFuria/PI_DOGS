import './CreateDog.css'

import axios from 'axios';
import React from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AddDog } from '../../actions';

// Fijense en los test que SI O SI tiene que ser un functional component, de otra forma NO VAN A PASAR LOS TEST
// Deben usar Hooks para que los test pasen.
// No realicen un destructuring de ellos, sino que utilicenlos de la siguiente forma 'React.useState' y 'React.useEffect' ,
// Si no lo hacen asi los test no van a correr.

function toUppercase(string){
  console.log(string)
 const varSplit = string.charAt(0).toUpperCase()
  const arr = string.split('')
  arr.shift() 
  arr.unshift(varSplit) 
  return arr.join('') 
  }
  



const CreateDog = () => { 

   const [state, setState] = React.useState({

      name: '',
      minHeight: 0,
      maxHeight: 0,
      minWeight: 0,
      maxWeight: 0,
      lifeSpan: 0,
      url: "",
      temperamets: []

    });
    
    let history = useHistory();

    const handleChange = e => { 

      let ruta = e.target.value
      let fileName = ruta.split('\\').pop()

      e.preventDefault()      
      setState({
        ...state,
        [e.target.name]: e.target.value,             
        [e.target.name]: fileName        
      })    
    };

    const handleSubmit = e => { 
      //window.alert('llegué')     
      e.preventDefault();
      //Doy de alta el nombre del perro en mayúsculas
      //para que cuando haga el sort funcione bien
      //porque los nombres de los perros vienen
      //en mayúsculas desde la API.
       
      state.name = toUppercase(state.name)   
      axios.post('http://localhost:3001/dogs/', state)
      .then(function () {
        alert('Alta de raza con éxito.')
        history.push('/')
        
      })
      .catch(function () {        
        window.alert("Dog already found.");
      });
      
      }
     
    
 
  return (
 
<div>
  
<h1>Cree un perro</h1>
    <form action="" class="form" onSubmit={e => handleSubmit(e)}>   
 
   
      
      
       <div>
      <input class="input" placeholder="raza"
      onChange={e => handleChange(e)}
      //value={state.name}
      type="text"
      name="name"
      required="true"
      minlength="4"
      maxlength="20"     
      /> 
      </div>  
 
      <div>
        
        <input class="input" placeholder="altura mínima"
         onChange={e => handleChange(e)}
         //value={state.minHeight}
         type="number"
         name="minHeight"
         required="true"
         min="1"
         max="50"
        />
 
      </div>


<div>

 
</div>
 
      <div>
      <input class="input" placeholder="altura máxima en centímetros"
         onChange={e => handleChange(e)}
         //value={state.maxHeight}
         type="number"
         name="maxHeight"
         required="true"
         min="1"
         max="50"
        />         
       
      </div>

      <div>
        <input type="number" class="input" placeholder="peso mínimo"
         onChange={e => handleChange(e)}
         //value={state.minWeight}         
         name="minWeight"
         required="true"
         min="1"
         max="50"  
        />
    
      </div>

      <div>
        <input type="text" class="input" placeholder="peso máximo"
         onChange={e => handleChange(e)}
         //value={state.maxWeight}         
         name="maxWeight"
         required="true"
         min="1"
         max="50"
        />
 </div>
<div>
        <input type="text" class="input" placeholder="Esperanza de vida"
         onChange={e => handleChange(e)}
         //value={state.maxWeight}         
         name="lifeSpan"
         required="true"
         min="1"
         max="50"
        />
       {/* <select name="selectTemperament">
        <option value="value2" selected>Value 2</option>
        <option value="value3">Value 3</option>
      </select> */}

    
      </div>
      <label  className='labelTitle' htmlFor="">Imagen: </label>
      
      <div>
      <input
       id='fileInput'
       name="url"
       onChange={e => handleChange(e)} 
       type="file" 
     />
     </div>   

<div>
<input type="submit" class="submitBtn" value="Confirmar"/>
</div>

     
      <span id="successMessage" style={{visibility: 'hidden'}}>'Se realizó el alta con exito.'</span> 
    </form>
  













{/* 
   <form class='form' onSubmit={e => handleSubmit(e)} action="" id="addDog">
      
      <label className='labelTitle' htmlFor="">Nombre: </label>
     <input
       onChange={e => handleChange(e)}
       value={state.name}
       type="text"
       name="name"
       required="true"
       minlength="4"
       maxlength="20"
     />

     <label  className='labelTitle' htmlFor="">Altura minima: </label>
     <input
       onChange={e => handleChange(e)}
       value={state.minHeight}
       type="number"
       name="minHeight"
       required="true"
       min="1"
       max="50"
     />  
       

<label  className='labelTitle' htmlFor="">Altura máxima: </label>
     <input
       onChange={e => handleChange(e)}
       value={state.maxHeight}
       type="number"
       name="maxHeight"
       required="true"
       min="1"
       max="50"
     />  
      
     <label  className='labelTitle' htmlFor="">Peso mínimo: </label>
     <input
      onChange={e => handleChange(e)}
      value={state.minWeight}
       type="number"
       name="minWeight"
       required="true"
       min="1"
       max="50"
     />
     

<label  className='labelTitle' htmlFor="">Peso máximo: </label>
     <input
      onChange={e => handleChange(e)}
      value={state.maxWeight}
       type="number"
       name="maxWeight"
       required="true"
       min="1"
       max="50"
     />
     
    <label  className='labelTitle' htmlFor="">Años de Vida: </label>
     <input
       onChange={e => handleChange(e)}
       value={state.anosDeVida}
       type="number"
       name="anosDeVida"
       required="true"
       min="1"
       max="50"
     />   

    <label  className='labelTitle' htmlFor="">Imagen: </label>
     <input
       id='fileInput'
       name="url"
       onChange={e => handleChange(e)} 
       type="file" 
     />      
   <button type="submit">Crear</button>  
   <span id="successMessage" style={{visibility: 'hidden'}}>'Se realizó el alta con exito.'</span> 
  
   </form> */}
 </div>
   );
};

export default CreateDog;
