import { Provider } from 'react-redux';
import store from './redux/store'
import Component from './Component.js';
function App() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}

export default App;

