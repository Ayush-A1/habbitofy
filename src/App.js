import { Route, Routes, useLocation } from "react-router-dom";
import NavDrawer from "./components/navigation/NavDrawer";

import HabitsPage from "./components/habits/HabitsPage";
import NewHabitPage from "./components/habits/NewHabitPage";
import TodaysHabitsPage from "./components/habits/TodaysHabitsPage";

import TotalProgressPage from "./components/progress/TotalProgressPage";
import GoalsPage from "./components/goals/GoalsPage";
import NewGoalPage from "./components/goals/NewGoalPage";

import NotFoundPage from "./components/other/NotFoundPage";
import Account from "./components/account/Account";

import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import GenralContext from "./context/GenralContext";

function App() {

  const location = useLocation()
  const { authMiddlware } = useContext(GenralContext);
  useEffect(() => {
    authMiddlware()
    // eslint-disable-next-line
  }, [location?.pathname])  

  return (
    <div className="relative h-screen bg-neutral-1 lg:flex">
      <NavDrawer />
      <Toaster />
      <div className="relative z-10 h-full sm:px-6 sm:pt-24 sm:pb-12 lg:grow lg:flex lg:justify-center lg:pb-24">
        <Routes>
          <Route index element={<TodaysHabitsPage />} />
          <Route path="/habits/*">
            <Route index element={<HabitsPage />} />
            <Route path="new-habit" element={<NewHabitPage />} />
            <Route path="edit-habit/:id" element={<NewHabitPage />} />
          </Route>
          <Route path="/progress" element={<TotalProgressPage />} />
          <Route path="/goals/*">
            <Route index element={<GoalsPage />} />
            <Route path="new-goal" element={<NewGoalPage />} />
            <Route path="edit-goal/:id" element={<NewGoalPage />} />
          </Route>
          <Route path="/auth/*">
            <Route path="login" element={<Account />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <div className="absolute bottom-0 w-full h-full waves"></div>
    </div>
  );
}

export default App;
