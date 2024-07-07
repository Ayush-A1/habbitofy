import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { MdAdd } from 'react-icons/md';
import { setSortingCriteria } from '../../store';
import useSortHabits from '../../hooks/use-sort-habits';
import SelectSorting from '../input/SelectSorting';
import Button from '../input/Button';
import Icon from '../other/Icon';
import Habit from './Habit';

function HabitsPage() {
  const { habits, sortingCriteria, sortingOrder } = useSelector((state) => state.habitsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (criteria, order) => {
    dispatch(setSortingCriteria({ criteria, order }));
  }

  console.log(useSortHabits())
  const renderedHabits = useSortHabits().map((habit) => <Habit key={habit.id} data={habit} />);

  const pageClass = classNames(
    'flex', 'flex-col', 'justify-between', 'space-y-8', 'h-full', 'pt-[4.5rem]', 'pb-8', 'px-4', 'animate-slide-down',
    'overflow-auto', 'sm:h-auto', 'sm:pt-4', 'sm:rounded-xl', 'sm:shadow-lg', 'sm:shadow-neutral-2', 'sm:bg-[white]',
    'lg:min-w-[70%]', 'xl:min-w-[50%]');

  const habitsClass = classNames('flex', 'flex-col', 'space-y-2',
    { 'justify-center h-full': habits.length === 0 });

  return (
    <div className={pageClass}>
      <div className={habitsClass}>
        {(habits.length > 0) ?
          <>
            <SelectSorting criteria={sortingCriteria} order={sortingOrder}
              onChange={handleChange} options={['Created', 'Total checks', 'Checks series', 'Total skips']} />
            {renderedHabits}
          </> :
          <p className="text-xl text-center font-bold text-neutral-4">You haven't added any habits</p>}
      </div>

      <Button className="self-center" onClick={() => navigate('/habits/new-habit')} equalPaddings>
        <Icon icon={<MdAdd className="w-8 h-8" />} color="white" />
      </Button>
    </div>
  );
}

export default HabitsPage;
