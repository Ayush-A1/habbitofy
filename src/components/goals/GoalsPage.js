import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { MdAdd } from 'react-icons/md';
import Goal from './Goal';
import Button from '../input/Button';
import Icon from '../other/Icon';

function GoalsPage() {
  const goals = useSelector((state) => state.goalsReducer.goals);
  const navigate = useNavigate();

  const renderedGoals = goals.map((goal) => <Goal key={goal.id} data={goal} />);

  const pageClass = classNames(
    'flex', 'flex-col', 'justify-between', 'space-y-8', 'h-full', 'pt-[4.5rem]', 'pb-8', 'px-4', 'animate-slide-down',
    'overflow-auto', 'sm:h-auto', 'sm:pt-4', 'sm:rounded-xl', 'sm:shadow-lg', 'sm:shadow-neutral-2', 'sm:bg-[white]',
    'lg:min-w-[70%]', 'xl:min-w-[50%]');

  const goalsClass = classNames('flex', 'flex-col', 'space-y-2',
    { 'justify-center h-full': goals.length === 0 });

  return (
    <div className={pageClass}>
      <div className={goalsClass}>
        {(goals.length > 0) ?
          renderedGoals :
          <p className="text-xl text-center font-bold text-neutral-4">You haven't added any goals</p>}
      </div>

      <Button className="self-center" onClick={() => navigate('/goals/new-goal')} equalPaddings>
        <Icon icon={<MdAdd className="w-8 h-8" />} color="white" />
      </Button>
    </div>
  );
}

export default GoalsPage;
