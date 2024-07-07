import { createSlice } from '@reduxjs/toolkit'

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    goals: []
  },
  reducers: {
    addGoal(state, action) {
      state.goals.push(action.payload);
    },
    editGoal(state, action) {
      state.goals[state.goals.findIndex((goal) => goal.id === action.payload.id)] = { ...action.payload };
    },
    deleteGoal(state, action) {
      state.goals = [...state.goals.filter((goal) => goal.id !== action.payload)];
    }
  }
});

export const goalsReducer = goalsSlice.reducer;
export const { addGoal, editGoal, deleteGoal } = goalsSlice.actions;
