import { createStore, applyMiddleware  } from 'redux';
import reducer from '../reducers/index'
import thunk from  'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

//const store = createStore(rootReducer, applyMiddleware(thunk))
//const store = createStore(rootReducer, applyMiddleware(thunk))

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  ));

//Redux es un contenedor predecible del estado de aplicaciones JavaScript.
//crear store para hacer acciones con promesas

export default store;