import { useSelector, useDispatch } from 'react-redux';
import { 
  setCartValue, 
  setDeliveryDistance, 
  setNumberOfItems, 
  setDeliveryDate, 
  setDeliveryTime, 
  calculateDeliveryFee 
} from '../store/CalculatorSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './Calculator.css'
const DeliveryFeeCalculator: React.FC<Props> = () => {
  const state = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const handleCartValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCartValue(Number(e.target.value)));
  };
  const handleDeliveryDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDeliveryDistance(Number(e.target.value)));
  };
  const handleNumberOfItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNumberOfItems(Number(e.target.value)));
  };
  const handleDeliveryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDeliveryDate(e.target.value));
  };
  const handleDeliveryTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDeliveryTime(e.target.value));
  };
  const handleCalculateDeliveryFee = () => {
    dispatch(calculateDeliveryFee());
  };


  return (
    <div className='container'>
       <Card style={{backgroundColor: '#ccc'}} sx={{ minWidth: 275 }}>
        <CardContent>
          <p sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Delivery Fee Calculator
          </p>
          <label>Cart Value (€):</label>
            <input
              min= '0'
              type="number"
              value={state.cartValue}
              onChange={handleCartValueChange}
            /> 
            <br />
            <label>Delivery Distance (m):</label>
            <input
              min= '0'
              type="number"
              value={state.deliveryDistance}
              onChange={handleDeliveryDistanceChange}
            />
            <br />
            <label>Number of Items:</label>
            <input
              min= '0'
              type="number"
              value={state.numberOfItems}
              onChange={handleNumberOfItemsChange}
            />
            <br />
            <label>Delivery Date:</label>
            <input
              type="date"
              value={state.deliveryDate}
              onChange={handleDeliveryDateChange}
            />
            <br></br>
            <label>Delivery Time:</label>
            <input
              type="time"
              value={state.deliveryTime}
              onChange={handleDeliveryTimeChange}
            />
            <br />
            <button onClick={handleCalculateDeliveryFee}>Calculate Delivery Fee</button>
            <br />
            <label className="fee-label">Delivery Fee:</label>
            <p>{state.deliveryFee} €</p>
            </CardContent>
            </Card>
          </div>
      );
    };
    
    export default DeliveryFeeCalculator;