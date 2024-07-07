import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function useAllCompletionsSeries() {
  const { habits } = useSelector((state) => state.habitsReducer);

  return useMemo(() => {
    const sortedHabits = [...habits];

    const getCompletionsSeries = (habit) => {
      let completionsSeries = 0;
      if (habit.dates.length > 0) {
        for (let time = (new Date()).getTime(); time >= (new Date(habit.dates[0])).getTime(); time -= 8.64e+7) {
          const date = new Date(time);
          const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

          if (habit.days.includes(weekDays[date.getDay()]) && habit.dates.includes(stringDate)) {
            completionsSeries += 1;
          } else if (habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate)) {
            break;
          }
        }
      }
      return completionsSeries;
    }

    return sortedHabits.sort((habit1, habit2) => getCompletionsSeries(habit2) - getCompletionsSeries(habit1));
  }, [habits]);
}

export default useAllCompletionsSeries;
