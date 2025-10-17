
import { createSlice,  } from '@reduxjs/toolkit';

const excersiceSlice = createSlice({
  name: 'excersice',
  initialState: { currentExcersice: 1 },
  reducers: {
    setCurrentExcersice: (state, action) => {
      state.currentExcersice = action.payload;
    },
  },
});

export const { setCurrentExcersice } = excersiceSlice.actions;
export default excersiceSlice.reducer;

