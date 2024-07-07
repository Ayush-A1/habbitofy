import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAllCompletionsSeries from './use-all-completions-series';

function useSortHabits() {
  const { habits, sortingCriteria, sortingOrder } = useSelector((state) => state.habitsReducer);
  const sortedBySeries = useAllCompletionsSeries();

  return useMemo(() => {
    let sortedHabits = [...habits];

    const getHabitSkips = (habit) => {
      let skips = 0;
      for (let time = (new Date()).getTime(); time >= (new Date(habit.dates[0])).getTime(); time -= 8.64e+7) {
        const date = new Date(time);
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart('0', 2)}`;

        if (habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate)) {
          skips += 1;
        }
      }
      return skips;
    }

    if (sortingCriteria === 'Created') {
      sortedHabits.sort((habit1, habit2) => ((new Date(habit1.created)).getTime() - (new Date(habit2.created)).getTime()) * sortingOrder);
    }
    else if (sortingCriteria === 'Total checks') {
      sortedHabits.sort((habit1, habit2) => (habit1.dates.length - habit2.dates.length) * sortingOrder);
    }
    else if (sortingCriteria === 'Checks series') {
      sortedHabits = (sortingOrder === 1) ? [...sortedBySeries].reverse() : [...sortedBySeries];
    }
    else if (sortingCriteria === 'Total skips') {
      sortedHabits.sort((habit1, habit2) => (getHabitSkips(habit1) - getHabitSkips(habit2)) * sortingOrder);
    }

    return sortedHabits;
  }, [habits, sortedBySeries, sortingCriteria, sortingOrder]);
}

export default useSortHabits;
