import { createSlice, configureStore } from "@reduxjs/toolkit";


export interface State {
    cartValue: number;
    deliveryDistance: number;
    numberOfItems: number;
    deliveryFee: number;
    deliveryDate: string;
    deliveryTime: string;
}
  
const initialState: State = {
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    deliveryFee: 0,
    deliveryDate: '',
    deliveryTime: ''
};

const deliverySlice = createSlice({
    name: 'deliveryFee',
    initialState: initialState,
    reducers: {
        setCartValue(state, action) {
            state.cartValue = action.payload
        },
        setDeliveryDistance(state, action) {
            state.deliveryDistance = action.payload
        },
        setNumberOfItems(state, action) {
            state.numberOfItems = action.payload
        },
        setDeliveryDate: (state, action) => {
            state.deliveryDate = action.payload;
        },
        setDeliveryTime: (state, action) => {
            state.deliveryTime = action.payload;
        },
        calculateDeliveryFee: (state) => {
            let fee = 0;
            const smallOrderSurcharge = state.cartValue < 10 ? 10 - state.cartValue : 0;
            const distanceFee = Math.max(2 + Math.ceil((state.deliveryDistance - 1000) / 500), 1);
            const itemSurcharge = state.numberOfItems >= 5 ? (state.numberOfItems - 5) * 0.5 : 0;
            const bulkFee = state.numberOfItems > 12 ? 1.2 : 0;
            fee = smallOrderSurcharge + distanceFee + itemSurcharge + bulkFee;
      
            const deliveryDate = new Date(`${state.deliveryDate} ${state.deliveryTime}`);
            if(deliveryDate.getUTCHours() >= 15 && deliveryDate.getUTCHours() <= 19 && deliveryDate.getUTCDay() === 5) {
              fee = fee*1.2;
            }
            fee = Math.min(fee, 15);
            if (state.cartValue >= 100) {
                fee = 0
            }
            state.deliveryFee = fee
        }
    }
})

export const { 
    setCartValue, 
    setDeliveryDistance, 
    setNumberOfItems, 
    setDeliveryDate, 
    setDeliveryTime, 
    calculateDeliveryFee 
} = deliverySlice.actions;

export const store = configureStore({
  reducer: deliverySlice.reducer,
});


