
import { createSlice,  } from '@reduxjs/toolkit';

const explanationsSlice = createSlice({
  name: 'explanations',
  initialState: { currentExplanation: 2 },
  reducers: {
    setCurrentExplanation: (state, action) => {
      state.currentExplanation = action.payload;
    },
  },
});

export const { setCurrentExplanation } = explanationsSlice.actions;
export default explanationsSlice.reducer;