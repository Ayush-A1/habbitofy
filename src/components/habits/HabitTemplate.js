import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { setSelectedTemplate } from '../../store';

function HabitTemplate({ data }) {
  const { selectedTemplate } = useSelector((state) => state.newHabitReducer);
  const dispatch = useDispatch();

  const habitTemplateClass = classNames(
    'flex', 'flex-col', 'justify-center', 'items-center', 'space-y-2', 'h-full', 'p-2',
    'rounded-xl', 'bg-neutral-2', 'shadow-md', 'border-2',
    'cursor-pointer', 'duration-200', 'hover:opacity-80',
    {
      'border-accent shadow-accent': selectedTemplate === data.name,
      'border-[transparent] shadow-neutral-3': selectedTemplate !== data.name
    }
  );

  return (
    <div className={habitTemplateClass} onClick={() => dispatch(setSelectedTemplate(data.name))}>
      <div className="p-2.5 bg-[white] rounded-full">
        {data.icon}
      </div>
      <p className="text-center">{data.name}</p>
    </div>
  );
}

export default HabitTemplate;
