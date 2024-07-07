import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Habit from './Habit';

function TodaysHabitsPage() {
  const habits = useSelector((state) => state.habitsReducer.habits);

  const getTodayDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  const habitsForToday = habits.filter((habit) => {
    const now = new Date();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return habit.days.includes(weekDays[now.getDay()]);
  });

  const toDoHabits = habitsForToday.filter((habit) => !habit.dates.includes(getTodayDate()));
  const completedHabits = habitsForToday.filter((habit) => habit.dates.includes(getTodayDate()));

  const renderedToDoHabits = toDoHabits.map((habit) => <Habit key={habit.id} data={habit} todaysHabit />);
  const renderedCompletedHabits = completedHabits.map((habit) => <Habit key={habit.id} data={habit} todaysHabit />);

  const pageClass = classNames(
    'flex', 'flex-col', 'space-y-8', 'h-full', 'pt-[4.5rem]', 'pb-8', 'px-4', 'animate-slide-down', 'overflow-auto',
    'sm:h-auto', 'sm:pt-4', 'sm:rounded-xl', 'sm:shadow-lg', 'sm:shadow-neutral-2', 'sm:bg-[white]',
    'lg:min-w-[70%]', 'xl:min-w-[50%]');

  const toDoHabitsWrapperClass = classNames('flex', 'flex-col', 'space-y-4',
    { 'h-full': habitsForToday.length === 0 });
  const toDoHabitsClass = classNames('flex', 'flex-col', 'space-y-2',
    { 'justify-center h-full': habitsForToday.length === 0 });

  return (
    <div className={pageClass}>
      <div className={toDoHabitsWrapperClass}>
        <p className="-mx-4 px-4 pb-1 text-lg font-bold text-neutral-4 border-b-[1.5px] border-neutral-3">
          To do
        </p>
        <div className={toDoHabitsClass}>
          {(habitsForToday.length > 0) ?
            (renderedToDoHabits.length > 0) ? renderedToDoHabits :
              <p className="text-center font-bold text-neutral-4">You have completed all the habits</p> :
            <p className="text-xl text-center font-bold text-neutral-4">No habits for today</p>}
        </div>
      </div>

      {habitsForToday.length > 0 &&
        <div className="flex flex-col space-y-4">
          <p className="-mx-4 px-4 pb-1 text-lg font-bold text-neutral-4 border-b-[1.5px] border-neutral-3">
            Completed
          </p>
          <div className="flex flex-col space-y-2">
            {(renderedCompletedHabits.length > 0) ?
              renderedCompletedHabits :
              <p className="text-center font-bold text-neutral-4">You haven't completed a single habit</p>}
          </div>
        </div>}
    </div>
  );
}

export default TodaysHabitsPage;
