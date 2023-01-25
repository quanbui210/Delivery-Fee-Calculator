import { Provider } from 'react-redux';
import { store } from './store/CalculatorSlice';
import DeliveryFeeCalculator from './components/Calculator';
const App = () => {
  return (
    <Provider store={store}>
      <DeliveryFeeCalculator />
    </Provider>
  );
}

export default App