import { useSelector } from 'react-redux';
import classNames from 'classnames';
import ProgressCardsItem from './ProgressCardsItem';
import useAllCompletionsSeries from '../../hooks/use-all-completions-series';

function ProgressCards() {
  const habits = useSelector((state) => state.habitsReducer.habits);

  const sortedHabits = [...habits];
  const bestCompletions = sortedHabits.sort((habit1, habit2) => habit2.dates.length - habit1.dates.length)[0];
  const bestCompletionsSeries = useAllCompletionsSeries()[0];
  const totalCompletions = habits.reduce((accumulator, habit) => accumulator += habit.dates.length, 0);
  const totalSkips = habits.reduce((accumulator, habit) => {
    let skips = 0;
    for (let time = (new Date()).getTime(); time >= (new Date(habit.dates[0])).getTime(); time -= 8.64e+7) {
      const date = new Date(time);
      const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart('0', 2)}`;

      if (habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate)) {
        skips += 1;
      }
    }
    return accumulator += skips;
  }, 0);

  const cardsClass = classNames(
    'grid', 'grid-cols-[repeat(auto-fit,_minmax(8rem,_1fr))]', 'place-content-center', 'gap-3', 'pb-8', 'px-4',
    'xl:grid-cols-[repeat(2,_minmax(8rem,_1fr))]', 'xl:pb-0');

  return (
    <div className={cardsClass}>
      <ProgressCardsItem label="Best checks" value={bestCompletions.dates.length} habit={bestCompletions} />
      <ProgressCardsItem label="Best checks series" value={bestCompletionsSeries.dates.length} habit={bestCompletionsSeries} />
      <ProgressCardsItem label="Total checks" value={totalCompletions} />
      <ProgressCardsItem label="Total skips" value={totalSkips} />
    </div>
  );
}

export default ProgressCards;
