import { useMemo } from 'react';

function useCompletionsSeries(habit) {
  return useMemo(() => {
    let currentCompletionSeries = 0;
    if (habit.dates.length > 0) {
      let time = (new Date()).getTime();
      do {
        const date = new Date(time);
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        if (habit.days.includes(weekDays[date.getDay()]) && habit.dates.includes(stringDate)) {
          currentCompletionSeries += 1;
        } else if (habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate)) {
          break;
        }

        time -= 8.64e+7
      } while (time >= (new Date(habit.dates[0])).getTime());
    }

    return currentCompletionSeries;
  }, [habit]);
}

export default useCompletionsSeries;
