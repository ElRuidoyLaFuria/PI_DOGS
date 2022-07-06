const { Router } = require('express');
const controller = require('../controllers/controllers.js')
const fetch = require('node-fetch');
const rutaRazas = require('./raza');
const rutaTemperamentos = require('./Temperamento');

//console.log("-->"+controller.getBreeds);

//.default
//import fetch from 'node-fetch';

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
//router.use(router.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 

// router.post("/posts", (req, res) => {
//     const {author, title, contents} = req.body; 
// });

router.use('/dogs', rutaRazas);
router.use('/temperamentos', rutaTemperamentos);

router.get('/',(req,res)=>{
 //res.send('/client/public/index.html');
})
  
// router.get('/dogs/breeds',(req, res)=>
// {  
// try 
// {
//   const promise = controller.getBreedsWithPromise();
//   promise.then(value=>res.status(200).json(value))
// }      
// catch (error) 
// {
//   res.status(400).json("error") 
// }
// })

// router.get('/dogs?name',(req,send)=>{

// })

// router.get('/dogs/:idRaza',(req,send)=>{


// })

// router.post('/dogs',(req,send)=>{


// })


// router.get('/temperaments', (req,send)=>{



// })



module.exports = router;
