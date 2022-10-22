import { createSlice } from '@reduxjs/toolkit';

const initialData = {
  selectedSeats: [],
  selectedVipSeats: [],
  bookingData: [],
  total: 0,
};

const seatSlice = createSlice({
  name: 'seat select',
  initialState: initialData,
  reducers: {
    selecting(state, action) {
      const { selectedSeats, selectedVipSeats, bookingData } = state;
      const { tenGhe, giaVe, loaiGhe, maGhe } = action.payload;
      const isSelected =
        selectedSeats.includes(tenGhe) || selectedVipSeats.includes(tenGhe);
      if (isSelected) {
        if (loaiGhe === 'Vip') {
          state.selectedVipSeats = selectedVipSeats.filter((s) => s !== tenGhe);
        } else {
          state.selectedSeats = selectedSeats.filter((s) => s !== tenGhe);
        }
        state.bookingData = bookingData.filter((s) => s.maGhe !== maGhe);
        state.total -= giaVe;
      } else {
        if (loaiGhe === 'Vip') selectedVipSeats.push(tenGhe);
        else {
          selectedSeats.push(tenGhe);
        }
        bookingData.push({ maGhe, giaVe });
        state.total += giaVe;
      }
    },
    reset() {
      return { ...initialData };
    },
  },
});

export const seatActions = seatSlice.actions;

export default seatSlice.reducer;
