import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import { MdAdd, MdEdit, MdDelete, MdArrowBack, MdArrowForward, MdCalendarMonth } from 'react-icons/md';
import classNames from 'classnames';
import {
  setHabitAdditionStage, setHabitName, toggleHabitDay, setHabitDeadlineTime, setHabitIcon,
  addHabit, setHabitInitialState, editHabit, deleteHabit
} from '../../store';
import habitTemplates from '../../habitTemplates';
import Button from '../input/Button';
import Icon from '../other/Icon';
import Input from '../input/Input';
import MultipleSelect from '../input/MultipleSelect';
import SeparatedInput from '../input/SeparatedInput';
import HabitTemplate from './HabitTemplate';

function NewHabitPage() {
  const {
    habitAdditionStage, habitName, habitDays, habitDeadlineTime, habitIcon
  } = useSelector((state) => state.newHabitReducer);
  const habits = useSelector((state) => state.habitsReducer.habits);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const editableHabit = { ...habits.find((habit) => habit.id === id) };

  useEffect(() => {
    if (!!id) {
      setTimeout(() => {
        const habit = { ...habits.find((habit) => habit.id === id) };
        dispatch(setHabitInitialState(habit));
      }, 500);
    }
  }, [id, habits, dispatch]);

  const renderedHabitTemplates = habitTemplates.map((habit) => <HabitTemplate key={habit.name} data={habit} />);

  const renderedHabitIcons = habitTemplates.map((habit) => {
    const iconClass = classNames(
      'p-2.5', 'bg-neutral-2', 'rounded-full', 'shadow-md', 'border-2', 'cursor-pointer', 'duration-200', 'hover:opacity-80',
      {
        'border-accent shadow-accent': habitIcon === habit.name,
        'border-[transparent] shadow-neutral-3': habitIcon !== habit.name
      });

    return (
      <div key={habit.name} className={iconClass}
        onClick={() => dispatch(setHabitIcon(habit.name))}>
        {habit.icon}
      </div>
    );
  });

  const handleAddEditHabit = (addOrEdit) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });

    const habit = {
      id: (addOrEdit) ? nanoid() : editableHabit.id, name: habitName,
      icon: habitIcon, days: habitDays,
      time: habitDeadlineTime,
      created: formattedDate,
      dates: (addOrEdit) ? [] : editableHabit.dates
    };

    dispatch((addOrEdit) ? addHabit(habit) : editHabit(habit));
    navigate('/habits');
  };

  const removeHabit = () => {
    dispatch(deleteHabit(editableHabit.id));
    navigate('/habits');
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const pageClass = classNames(
    'flex', 'flex-col', 'justify-between', 'space-y-8', 'h-full', 'pt-[4.5rem]', 'pb-8', 'px-4', 'animate-slide-down',
    'overflow-auto', 'sm:h-auto', 'sm:pt-4', 'sm:rounded-xl', 'sm:shadow-lg', 'sm:shadow-neutral-2', 'sm:bg-[white]',
    'lg:min-w-[70%]', 'xl:min-w-[50%]');

  return (
    <div className={pageClass}>
      <div className="flex flex-col space-y-2">
        {habitAdditionStage === 1 && <>
          <p className="-mx-4 mb-2 px-4 pb-1 text-lg font-bold text-neutral-4 border-b-[1.5px] border-neutral-3">
            Suggested habits
          </p>
          <div className="self-stretch grid grid-cols-[repeat(auto-fit,_10rem)] place-content-center gap-3">
            {renderedHabitTemplates}
          </div>
        </>}

        {habitAdditionStage === 2 && <>
          <Input value={habitName} onChange={(text) => dispatch(setHabitName(text))} placeholder="Habit name ..." />

          <div className="flex space-x-3">
            <MultipleSelect className="w-full h-full xl:w-1/2" value={habitDays} onChange={(day) => dispatch(toggleHabitDay(day))}
              options={weekDays} icon={<MdCalendarMonth className="w-6 h-6" />} label="Habit days" />
            <SeparatedInput value={habitDeadlineTime} onChange={(time) => dispatch(setHabitDeadlineTime(time))} label="Deadline time" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2 mx-4 lg:self-center lg:w-1/2">
            {renderedHabitIcons}
          </div>
        </>}
      </div>

      {habitAdditionStage === 1 &&
        <Button className="self-end" onClick={() => dispatch(setHabitAdditionStage('next'))}>
          <p className="text-lg text-[white]">Next</p>
          <Icon icon={<MdArrowForward className="w-6 h-6" color="white" />} />
        </Button>}

      {(habitAdditionStage === 2 && !id) &&
        <div className="flex justify-between space-x-2">
          <Button onClick={() => dispatch(setHabitAdditionStage('back'))}>
            <Icon icon={<MdArrowBack className="w-6 h-6" color="white" />} />
            <p className="text-lg text-[white]">Back</p>
          </Button>

          <Button onClick={() => handleAddEditHabit(true)}>
            <Icon icon={<MdAdd className="w-6 h-6" color="white" />} />
            <p className="text-lg text-[white]">Create habit</p>
          </Button>
        </div>}

      {!!id &&
        <div className="flex justify-center space-x-2">
          <Button className="basis-1/2" onClick={() => handleAddEditHabit(false)}>
            <Icon icon={<MdEdit className="w-6 h-6" color="white" />} />
            <p className="text-lg text-[white]">Edit habit</p>
          </Button>
          <Button className="basis-1/2" onClick={removeHabit}>
            <Icon icon={<MdDelete className="w-6 h-6" color="white" />} />
            <p className="text-lg text-[white]">Delete habit</p>
          </Button>
        </div>}
    </div>
  );
}

export default NewHabitPage;
