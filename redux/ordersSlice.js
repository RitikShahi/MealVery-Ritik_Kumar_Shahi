import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: 'orders',
  initialState: JSON.parse(localStorage.getItem('orders')) || [],
  reducers: {
    addOrder(state, action) {
      // Set default status to "Food Processing" if not provided
      const newOrder = { status: "Food Processing", ...action.payload };
      state.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(state));
    },
    updateOrderStatus(state, action) {
      const { id, status } = action.payload;
      const order = state.find(o => o.id === id);
      if (order) {
        order.status = status;
      }
      localStorage.setItem('orders', JSON.stringify(state));
    },
    removeOrder(state, action) {
      const orderId = action.payload;
      const newState = state.filter(order => order.id !== orderId);
      localStorage.setItem('orders', JSON.stringify(newState));
      return newState;
    },
    clearOrders(state, action) {
      localStorage.removeItem('orders');
      return [];
    }
  }
});

export const { addOrder, updateOrderStatus, removeOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
