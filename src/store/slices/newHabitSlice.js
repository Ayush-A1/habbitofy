import { createSlice } from '@reduxjs/toolkit';
import { addHabit, editHabit } from './habitsSlice';

const newHabitSlice = createSlice({
  name: 'newHabit',
  initialState: {
    selectedTemplate: null,
    habitAdditionStage: 1,
    habitName: '',
    habitDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    habitDeadlineTime: '',
    habitIcon: null
  },
  reducers: {
    setSelectedTemplate(state, action) {
      state.selectedTemplate = (action.payload === state.selectedTemplate) ? null : action.payload;
      state.habitName = action.payload;
      state.habitIcon = action.payload;
    },
    setHabitAdditionStage(state, action) {
      if (action.payload === 'next') {
        state.habitAdditionStage = 2;
        if (state.selectedTemplate) state.habitName = state.selectedTemplate;
      }
      if (action.payload === 'back') state.habitAdditionStage = 1;
    },
    setHabitName(state, action) {
      state.habitName = action.payload;
    },
    toggleHabitDay(state, action) {
      state.habitDays = (state.habitDays.includes(action.payload)) ?
        [...state.habitDays.filter((option) => option !== action.payload)] :
        [...state.habitDays, action.payload];
    },
    setHabitDeadlineTime(state, action) {
      const colonIndex = state.habitDeadlineTime.indexOf(':');
      if (action.payload.input === 'hours') {
        state.habitDeadlineTime = `${action.payload.text}:${state.habitDeadlineTime.slice(colonIndex + 1)}`;
      } else if (action.payload.input === 'minutes') {
        state.habitDeadlineTime = `${state.habitDeadlineTime.slice(0, colonIndex)}:${action.payload.text}`;
      }
    },
    setHabitIcon(state, action) {
      state.habitIcon = action.payload;
    },
    setHabitInitialState(state, action) {
      state.habitAdditionStage = 2;
      state.habitName = action.payload.name;
      state.habitDays = action.payload.days;
      state.habitDeadlineTime = action.payload.time;
      state.habitIcon = action.payload.icon;
    }
  },
  extraReducers(builder) {
    const resetState = (state) => {
      state.selectedTemplate = null;
      state.habitAdditionStage = 1;
      state.habitName = '';
      state.habitDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      state.habitDeadlineTime = '';
      state.habitIcon = null;
    };

    builder.addCase(addHabit, resetState);
    builder.addCase(editHabit, resetState);
  }
});

export const newHabitReducer = newHabitSlice.reducer;
export const {
  setSortingCriteria, setSelectedTemplate, setHabitAdditionStage, setHabitName, toggleHabitDay, setHabitDeadlineTime, setHabitIcon, setHabitInitialState
} = newHabitSlice.actions;
