import { compose, createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../store/sagas';

const sagaMiddleware = createSagaMiddleware();

const initStore = () => {
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(sagaMiddleware),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default initStore();

export type RootState = ReturnType<typeof reducer>;
