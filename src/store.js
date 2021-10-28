import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import { persistStore, persistReducer, createMigrate } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import persistState from 'redux-localstorage'
// import { createFilter } from 'redux-persist-transform-filter'
import rootReducer from 'reducers/rootReducer'
import rootSagas from 'sagas/rootSaga'
import { EventTypes, createTracker } from 'redux-segment'
const { page } = EventTypes

const customMapper = {
  mapper: {
    '@@router/INIT_PATH': page,
    '@@router/UPDATE_PATH': page,
    '@@router/LOCATION_CHANGE': page,
    '@@reduxReactRouter/initRoutes': page,
    '@@reduxReactRouter/routerDidChange': page,
    '@@reduxReactRouter/replaceRoutes': page
  }
  // mapper: {
  //   '@@router/CALL_HISTORY_LOCATION': EventTypes.page,
  //   '@@router/UPDATE_LOCATION': EventTypes.page,
  //   '@@reduxReactRouter/replaceRoutes': (getState, action) => {
  //     return {
  //       eventType: EventTypes.page,
  //       eventPayload: {
  //         name: 'PAGE_ANALYTICS',
  //         text: getState().text
  //       }
  //     }
  //   },
  //   // 'CUSTOM_LOGOUT_ACTION': (getState, action) => {
  //   //   return [{
  //   //     eventType: EventTypes.reset
  //   //   }, {
  //   //     eventType: EventTypes.page
  //   //   }]
  //   // }
  // }
}

const tracker = createTracker(customMapper)

// const authReducerFilter = createFilter(
//   'auth',
//   null,
//   ['user']
// )

// // Create new version while rehydrating to avoid conflicts
// const migrations = {
//   0: (state) => ({
//     // migration clear out device state
//     ...state,
//     device: undefined
//   }),
//   1: (state) => ({
//     // migration to keep only device state
//     device: state.device
//   })
// }

// Config for redux persist
// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
//   migrate: createMigrate(migrations, { debug: false }),
//   whitelist: ['auth'],
//   transforms: [authReducerFilter]
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create sagas middleware
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 100
    })) ||
  compose

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, tracker))
  )

  // Running sagas
  sagaMiddleware.run(rootSagas)
  return { store }
}





