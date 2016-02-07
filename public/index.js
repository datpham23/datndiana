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
import {syncReduxAndRouter,
        routeReducer}           from 'redux-simple-router';
import DevTools                 from './components/DevTools';
import co                       from 'co';
import guests                   from './reducers/guests';
import rsvp                     from './reducers/rsvp';



const reducers = combineReducers({
  routing: routeReducer,
  rsvp : rsvp,
  guests : guests
});


let middleWare = [thunk];
let createStoreWithMiddleware = compose(
            applyMiddleware(...middleWare)
            ,DevTools.instrument()
          )(createStore);

let store = createStoreWithMiddleware(reducers);


const history = createHistory({
  queryKey: false
});
syncReduxAndRouter(history, store);


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
  },
  admin : (location, cb)=>{
    require.ensure([], (require) => {
      cb(null, require('./pages/AdminPage').default);
    });
  },
  adminOverview : (location, cb)=>{
    require.ensure([], (require) => {
      cb(null, require('./pages/AdminOverview').default);
    });
  },
  adminMessaging : (location, cb)=>{
    require.ensure([], (require) => {
      cb(null, require('./pages/AdminMessaging').default);
    });
  },
  rsvp : (location, cb)=>{
    require.ensure([], (require) => {
      cb(null, require('./pages/RSVPPage').default);
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
            <Route path='admin' getComponent={components.admin}>
              <IndexRoute getComponent={components.adminOverview}/>
              <Route path='messaging' getComponent={components.adminMessaging}/>
            </Route>
            <Route path='rsvp/:guestId' getComponent={components.rsvp}/>
          </Route>
        </Router>
        <DevTools/>
      </div>
    </Provider>
  </div>
, document.getElementById('app'));
