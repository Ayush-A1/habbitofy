import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
  newHabitReducer, setSelectedTemplate, setHabitAdditionStage, setHabitName, toggleHabitDay, setHabitDeadlineTime, setHabitIcon, setHabitInitialState
} from './slices/newHabitSlice';
import {
  habitsReducer, setSortingCriteria, addHabit, editHabit, toggleHabitCompletion, deleteHabit
} from './slices/habitsSlice';
import {
  goalsReducer, addGoal, editGoal, deleteGoal
} from './slices/goalsSlice';
import {
  newGoalReducer, setGoalName, changeMaxSkips, setHabit, setFinalDate, setInitialState
} from './slices/newGoalSlice';

const rootReducer = combineReducers({
  newHabitReducer,
  habitsReducer,
  goalsReducer,
  newGoalReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['habitsReducer', 'goalsReducer'],
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    });
  }
});

export const persistor = persistStore(store);
export {
  store, setSortingCriteria, setSelectedTemplate, setHabitAdditionStage, setHabitName, toggleHabitDay, setHabitDeadlineTime, setHabitIcon, setHabitInitialState,
  addHabit, editHabit, toggleHabitCompletion, deleteHabit,
  addGoal, editGoal, deleteGoal,
  setGoalName, changeMaxSkips, setHabit, setFinalDate, setInitialState
};
