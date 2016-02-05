//import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {createStore,
        combineReducers,
        applyMiddleware,
        compose}                from 'redux';
import {Provider}               from 'react-redux';
import thunk                    from 'redux-thunk';
import {Router,
        Route,
        IndexRoute}             from 'react-router';
import createHistory            from 'history/lib/createHashHistory';
// import {syncReduxAndRouter,
//         routeReducer}           from 'redux-simple-router';
// import DevTools                 from './components/DevTools';
import co                       from 'co';




const reducers = combineReducers({
// routing: routeReducer
});


let middleWare = [thunk];
let createStoreWithMiddleware = compose(
            applyMiddleware(...middleWare)
            //,DevTools.instrument()
          )(createStore);

let store = createStoreWithMiddleware(reducers);


const history = createHistory({
  queryKey: false
});
//syncReduxAndRouter(history, store);


import App       from './App';

const components = {
  index : (location, cb)=>{
    require.ensure([], (require) => {
      cb(null, require('./pages/IndexPage').default);
    });
  },
  photos : (location, cb)=>{
    require.ensure([], (require) => {
      cb(null, require('./pages/PhotosPage').default);
    });
  }
}

render(
  <div>
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path='/' component={App}>
            <IndexRoute getComponent={components.index}/>
            <Route path='photos' getComponent={components.photos}/>
          </Route>
        </Router>
        {/*<DevTools/>*/}
      </div>
    </Provider>
  </div>
, document.getElementById('app'));
