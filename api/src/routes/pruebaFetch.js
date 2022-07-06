 const fetch = require('node-fetch');
// //fetch("https://jsonplaceholder.typicode.com/posts")
// //fetch("https://api.thedogapi.com/v1/breeds")

async function f1(){

    const response = await fetch("https://api.thedogapi.com/v1/breeds");
    const data = await response.json();    
    console.log(data);
}

async function f()
{

return fetch("https://api.thedogapi.com/v1/breeds")
.then((data)=>data.json())
.then(response=>console.log(response));
    
}

// function my_async_fn(url) {
//     return fetch(url).then(response => {
//         console.log(response.json( )); // Logs the response
//         //return response;
        
//     });
// }



// //nombre('zac3599').then(val => console.log(val))

// //my_async_fn("https://api.thedogapi.com/v1/breeds"); 

// f();

f();