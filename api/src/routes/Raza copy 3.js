require('dotenv').config();
const { spawn } = require('child_process');
const { Router } = require('express');
const {API_KEY} = process.env;
const { Op, BulkRecordError } = require("sequelize");
const axios = require('axios');
const { send, nextTick } = require('process');
const {Raza, Temperamento} = require('../db');
const { stripVTControlCharacters } = require('util');
const { notStrictEqual } = require('assert');
const { arrayBuffer } = require('stream/consumers');
//const path = require('C:\\Henry\\P.I\\PI-Dogs-main\\api\0c7390d0f6463b7591a428f0a90e611e.jpg');

 
const router = Router();

router.get('/', async (req, res, next) => { 

  let name = req.query.name   
  let razaPromiseApi
  let razaPromiseDb 

  try {

  //filtro de nombre en back.
  if (name){     
    razaPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds/search?q=' + name + '&api_key='+ API_KEY);  
    razaPromiseDb =  Raza.findAll({
    include: Temperamento,
    where: {
      name: {
        [Op.iLike]: '%' + name + '%'
      }        
    },
    order: [['name', 'asc']]
    })
  } else {    
     razaPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds');  
     razaPromiseDb =  Raza.findAll({include: Temperamento})   
  } 

  Promise.all([razaPromiseApi, razaPromiseDb])
  .then((respuesta)=>{ 

  const [razaApi, razaDb] = respuesta;
  let largo;
  
  let filteredRazasApi = razaApi.data.map((raza)=>{

  if (raza.weight.metric.length === 5){                    
     largo = raza.weight.metric.length   
     minWeight = parseInt(raza.weight.metric.substring(1,0)),
     maxWeight = parseInt(raza.weight.metric.substring(4,5))    
  }

  if (raza.weight.metric.length === 7){                    
    largo = raza.weight.metric.length  
    minWeight = parseInt(raza.weight.metric.substring(0,2))
    maxWeight = parseInt(raza.weight.metric.substring(5,7))     
 }

    return {
    id: raza.id,
    name: raza.name,
    largo: largo,
    minWeight,
    maxWeight,
    img: raza.reference_image_id,
    temperament: raza.temperament,
    origin: raza.origin,
    lifeSpan: raza.life_span,
    utility: raza.life_span,
    group: raza.breed_group   
    }

  })

  let filteredRazasDb = razaDb.map((raza)=>{    
    
  
  return {
      id: raza.id,
      name: raza.name,               
      img: raza.url,        
      minHeight: raza.altura,
      minWeight: parseFloat(raza.peso),
      lifeSpan: raza.anosDeVida,
      temperament: raza.temperamentos.map((temperamento) => temperamento.name)
    }    
  })   

  let allRazas=[...filteredRazasApi, ...filteredRazasDb]

  allRazas.sort(function (a, b) {
    // A va primero que B
    if (a.name.toUpperCase() < b.name.toUpperCase())
        return -1;
    // B va primero que A
    else if (a.name.toUpperCase() > b.name.toUpperCase())
        return 1;
    // A y B son iguales
    else 
        return 0;
});
res.send(allRazas)
})
 
    
  } catch (error) {
    next(error)
  } 
})

router.get('/:id', async (req, res, next) =>{  
  const id = req.params.id;   
  let SelectedfilteredRazas

  try {
     
    if (id.split('').find(element => element==='.'))
    return

    if (typeof id === 'string' && id.length>8){      
      
      razaPromise = await Raza.findByPk(id) 
      .then((respuesta)=>{
  
          // SelectedfilteredRazas = {
          //   name: respuesta.dataValues.name,
          //   altura: respuesta.dataValues.altura,
          //   peso:  respuesta.dataValues.peso,
          //   anosDeVida: respuesta.dataValues.anosDeVida, 
          //   img: respuesta.dataValues.url   
          // }

          SelectedfilteredRazas = {
            name: respuesta.dataValues.name,
            minHeight: respuesta.dataValues.minHeight,
            maxHeight: respuesta.dataValues.maxHeight,
            minWeight:  respuesta.dataValues.minWeight,
            maxWeight:  respuesta.dataValues.maxWeight,
            lifeSpan: respuesta.dataValues.lifeSpan, 
            img: respuesta.dataValues.url   
          }
      
    }) 
    res.status(200).send(SelectedfilteredRazas)
  }         
    else {
      
      razaPromise = axios.get('https://api.thedogapi.com/v1/breeds?api_key='+ API_KEY)    
      .then((respuesta)=>{    
  
        let filteredRazasApi = respuesta.data.find((raza)=> raza.id === parseInt(id))
        
         //SelectedfilteredRazas = {
  
          // name: filteredRazasApi.name,
          // peso: filteredRazasApi.weight.metric,
          // altura: filteredRazasApi.height.metric,
          // utilidad: filteredRazasApi.bred_for,
          // grupo: filteredRazasApi.breed_group,
          // esperandaDeVida: filteredRazasApi.life_span,
          // temperamento: filteredRazasApi.temperament,        
          // img: filteredRazasApi.image.url
          filteredRazasApi.map(raza=>{

            if (raza.weight.metric.length === 5){                    
              largo = raza.weight.metric.length   
              minWeight = parseInt(raza.weight.metric.substring(1,0)),
              maxWeight = parseInt(raza.weight.metric.substring(4,5))    
           }

           if (raza.weight.metric.length === 7){                    
            largo = raza.weight.metric.length  
            minWeight = parseInt(raza.weight.metric.substring(0,2))
            maxWeight = parseInt(raza.weight.metric.substring(5,7))     
         }

         return {
          id: raza.id,
          name: raza.name,
          largo: largo,
          minWeight,
          maxWeight,
          img: raza.reference_image_id,
          temperament: raza.temperament,
          origin: raza.origin,
          lifeSpan: raza.life_span,
          utility: raza.life_span,
          group: raza.breed_group   
          }
        

          })
        
    })

    }         
   res.status(200).send(SelectedfilteredRazas)
       
      
  }   
    
  catch (error) {
    next(error)
  }
}); 


   
module.exports = router;

       

// } catch (error) {
//   next(error)
//  }

// } catch (err) {
//     next(err);
// }
// });

    // return {
    //   a:1
    // }
    
  //   if (raza.weight.metric.length === 5){        
  //     obj.largo = raza.weight.metric.length,
  //     obj.minWeight = raza.weight.metric.substring(1,0)
  //     obj.maxWeight = raza.weight.metric.substring(4,5)  
  //   }

  //   else {     
  //     obj.largo = raza.weight.metric.length,
  //     obj.minWeight = raza.weight.metric.substring(1,0)
  //     obj.maxWeight = raza.weight.metric.substring(4,5)      
  // }    
  //     obj.id = raza.id
  //     name = raza.name
  //     img = raza.reference_image_id     

  // })   
    // razaApi.data.map((raza)=>{       
    //     obj.id = raza.id
    //     name = raza.name
    //     img = raza.reference_image_id        
      
    //  })     
     
  // let filteredRazasDb = razaDb.map((raza)=>{      
  //       return {
  //         id: raza.id,
  //         name: raza.name,         
  //        // url: raza.image.url,  
  //         altura: raza.altura,
  //         peso: raza.peso,
  //         anosDeVida: raza.anosDeVida,
  //         temperament: raza.temperamentos.map((temperamento) => temperamento.name)
  //       }    
  //     }) 
 


      //res.send(obj)
 
 

  //   .then((respuesta)=>{
      // const [razaApi, razaDb] = respuesta;  

      // let obj = {
      //   pMin: 0
      // }

      // let filteredRazasApi = razaApi.data.map((raza)=>{ 
      //   return {  
      //   id: raza.id,
      //   name: raza.name
      //   }
      // })

      // let filteredRazasDb = razaDb.map((raza)=>{      
      //   return {
      //     id: raza.id,
      //     name: raza.name,         
      //     url: raza.image.url,  
      //     altura: raza.altura,
      //     peso: raza.peso,
      //     anosDeVida: raza.anosDeVida,
      //     temperament: raza.temperamentos.map((temperamento) => temperamento.name)
      //   }    
      // }) 
      // let allRazas=[...filteredRazasApi, ...filteredRazasDb]  
      //res.send(filteredRazasApi); 
//       res.send(1)
//     })
//     .catch((error)=>{
//       next(error)
// })
 
     
      //let allRazas=[...filteredRazasApi]
      //const minWeight = razaApi.weight.metric.substring(1,3);       
      
        
    

 
        //  id: raza.id,         
        //  name: raza.name,
        //  img: raza.reference_image_id,
         //peso: parseInt(raza.weight.metric.substring(1,3))
       
         //pesoMin: minWeight         
         

        
 
  
 
  
  
  //  life_span: raza.life_span,
        //  weight: raza.weight.metric,
        //  img: raza.image.id,
        //  url: raza.image.url                  
        //}


     //})
     
  
/*

router.get('/:id', async (req, res, next) =>{  
  const id = req.params.id;   
  //let raza;
  let SelectedfilteredRazas
  
  if (typeof id === 'string' && id.length>8){
    razaPromise = await Raza.findByPk(id) 
    .then((respuesta)=>{

        SelectedfilteredRazas = {
          name: respuesta.dataValues.name,
          altura: respuesta.dataValues.altura,
          peso:  respuesta.dataValues.peso,
          anosDeVida: respuesta.dataValues.anosDeVida
        }
    
  }) 
  res.status(200).send(SelectedfilteredRazas)
}         

  else {
    
    razaPromise = axios.get('https://api.thedogapi.com/v1/breeds?api_key='+ API_KEY)    
    .then((respuesta)=>{     

      let filteredRazasApi = respuesta.data.find((raza)=> raza.id === parseInt(id))
      
       SelectedfilteredRazas = {

        name: filteredRazasApi.name,
        peso: filteredRazasApi.weight.metric,
        altura: filteredRazasApi.height.metric,
        utilidad: filteredRazasApi.bred_for,
        grupo: filteredRazasApi.breed_group,
        esperandaDeVida: filteredRazasApi.life_span,
        temperamento: filteredRazasApi.temperament,
        origen: filteredRazasApi.origin,
        url: filteredRazasApi.image.url
    }    
     res.status(200).send(SelectedfilteredRazas)
    })  
    
  }
  
       
   
  

// } catch (error) {
//   next(error)
// }

}); 

// router.get('/',(req, res, next)=>{
//   return Raza.findAll({include: Temperamento})
//   .then(raza=>{
//   res.send(raza)
//   })  
//   .catch((error)=>{
//     next(error)
//   })
// })
*/

router.post('/', async (req, res, next)=>{
  try {
    const { name, minHeight, maxHeight, minWeight, maxWeight, anosDeVida, url} = req.body
    const newRaza = await Raza.create({ name, minHeight, maxHeight, minWeight, maxWeight, anosDeVida, url })  
    res.status(200).send(newRaza)     
 } catch (error){
   next(error)
 }
})

// router.post('/:razaId/temperamento/:temperamentoId', async (req, res, next)=>{
  
//   try {
//     const {razaId, temperamentoId} = req.params;
//     const raza = await Raza.findByPk(razaId)
//     await raza.addTemperamento(temperamentoId)
//     res.sendStatus(200);
//   } catch (error) {
//     next(error);
//   }
  


  //console.log(Raza.addRazas(343));
  //console.log(Raza.addTemperamento(343));
//   try { 
//    //const Raza = await Raza.findByPk(razaId);
//   res.send(200)
// } catch (error) {
//     next(error)
// }
//})

// router.put('/',(req, res, next)=>{
//   res.send('soy put /raza')
// } )

// router.delete('/',(req,res, next)=>{
//     res.send('soy delete /raza')
//   } )
   