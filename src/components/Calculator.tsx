import { useSelector, useDispatch } from 'react-redux';
import { 
  setCartValue, 
  setDeliveryDistance, 
  setNumberOfItems, 
  setDeliveryDate, 
  setDeliveryTime, 
  calculateDeliveryFee
} from '../store/CalculatorSlice';
import {State} from '../store/CalculatorSlice'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './Calculator.css'

interface Props{}

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
      <div style={{width: '70%', color: '#ccc', marginBottom :'90px', lineHeight: '28px'}}>
      <h3>
        Explaination
      </h3>
      <ul>Rules for calculating a delivery fee 
        <li>If the cart value is less than 10€, a small order surcharge is added to the delivery price.  
        The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.</li>
        <li>A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination.
           Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.</li>
        <li>If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m ={'>'} 4€ If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€</li>
        <li>The delivery is free (0€) when the cart value is equal or more than 100€.</li>
        <li>During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€).</li>
      </ul>
      </div>
       <Card style={{backgroundColor: '#ccc', marginBottom: '200px'}} sx={{ minWidth: 275 }}>
        <CardContent>
          <p style={{ fontSize: 14 }} color="text.secondary">
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
            <label>Order Date:</label>
            <input
              type="date"
              value={state.deliveryDate}
              onChange={handleDeliveryDateChange}
            />
            <br></br>
            <label>Order Time:</label>
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