import { createStore, applyMiddleware } from 'redux';
import crateSagaMiddleware from 'redux-saga';

import rootSaga from './modules/rootSaga';
import rootReducer from './modules/rootReducer';

const sagaMiddleware = crateSagaMiddleware();
const enhancer =
  process.env.NODE_ENV === 'development'
    ? applyMiddleware(sagaMiddleware)
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);
export default store;
