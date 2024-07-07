import { createSlice } from '@reduxjs/toolkit';

const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
    sortingCriteria: 'Date',
    sortingOrder: null,
    habits: []
  },
  reducers: {
    setSortingCriteria(state, action) {
      state.sortingCriteria = action.payload.criteria;
      state.sortingOrder = action.payload.order;
    },
    addHabit(state, action) {
      state.habits.push(action.payload);
    },
    editHabit(state, action) {
      state.habits[state.habits.findIndex((habit) => habit.id === action.payload.id)] = { ...action.payload };
    },
    toggleHabitCompletion(state, action) {
      const editableHabitIndex = state.habits.findIndex((habit) => habit.id === action.payload.id);

      if (state.habits[editableHabitIndex].dates.includes(action.payload.date)) {
        state.habits[editableHabitIndex].dates = [...state.habits[editableHabitIndex].dates
          .filter((date) => date !== action.payload.date)];
      } else {
        state.habits[editableHabitIndex].dates.push(action.payload.date);
      }
    },
    deleteHabit(state, action) {
      state.habits = [...state.habits.filter((habit) => habit.id !== action.payload)];
    }
  }
});

export const habitsReducer = habitsSlice.reducer;
export const { setSortingCriteria, addHabit, editHabit, toggleHabitCompletion, deleteHabit } = habitsSlice.actions;
