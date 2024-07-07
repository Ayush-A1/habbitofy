import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { FiTarget } from 'react-icons/fi';

import {
  addGoal, changeMaxSkips, deleteGoal, editGoal, setFinalDate, setGoalName, setHabit, setInitialState
} from '../../store';
import Input from '../input/Input';
import MultipleSelect from '../input/MultipleSelect';
import Icon from '../other/Icon';
import DateInput from '../input/DateInput';
import Button from '../input/Button';

function NewGoalPage() {
  const { goalName, maxSkips, habit, finalDate } = useSelector((state) => state.newGoalReducer);
  const habits = useSelector((state) => state.habitsReducer.habits);
  const goals = useSelector((state) => state.goalsReducer.goals);

  const habitNames = habits.map((habit) => habit.name);
  const habitIds = habits.map((habit) => habit.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const editableGoal = { ...goals.find((goal) => goal.id === id) };

  useEffect(() => {
    if (!!id) {
      setTimeout(() => {
        const goal = { ...goals.find((goal) => goal.id === id) };
        goal.habit = habits.find((habit) => habit.id === goal.habit)?.name;
        dispatch(setInitialState(goal));
      }, 500);
    }
  }, [id, goals, habits, dispatch]);

  const handleAddEditGoal = (addOrEdit) => {
    const now = new Date();
    const creationDate = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });

    const final = new Date(`${finalDate.year}-${finalDate.month}-${finalDate.day}`);
    const finalFormattedDate = final.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });

    const goal = {
      id: (addOrEdit) ? nanoid() : editableGoal.id, name: goalName,
      skips: maxSkips, habit: habitIds[habitNames.indexOf(habit)],
      finalDate: finalFormattedDate, created: creationDate
    };

    dispatch((addOrEdit) ? addGoal(goal) : editGoal(goal));
    navigate('/goals');
  };

  const removeGoal = () => {
    dispatch(deleteGoal(editableGoal.id));
    navigate('/goals');
  }

  const pageClass = classNames(
    'flex', 'flex-col', 'space-y-2', 'pt-[4.5rem]', 'pb-8', 'px-4', 'animate-slide-down',
    'overflow-auto', 'sm:pt-4', 'sm:rounded-xl', 'sm:shadow-lg', 'sm:shadow-neutral-2', 'sm:bg-[white]',
    'lg:min-w-[70%]', 'xl:min-w-[50%]');

  return (
    <div className={pageClass}>
      <div className="flex items-center space-x-2">
        <Input value={goalName} onChange={(text) => dispatch(setGoalName(text))} placeholder="Goal name ..." />

        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <p className="text-2xl text-neutral-4">{maxSkips}</p>
            <div className="flex flex-col">
              <Icon icon={<BiSolidUpArrow className="w-4 h-4 cursor-pointer duration-200 hover:opacity-80"
                onClick={() => dispatch(changeMaxSkips('increase'))} />} color="#898C87" />
              <Icon icon={<BiSolidDownArrow className="w-4 h-4 cursor-pointer duration-200 hover:opacity-80"
                onClick={() => dispatch(changeMaxSkips('decrease'))} />} color="#898C87" />
            </div>
          </div>
          <p className="text-neutral-4">Max skips</p>
        </div>
      </div>

      <div className="flex space-x-4 pb-2">
        <MultipleSelect className="w-full xl:w-1/2" value={habit} onChange={(habit) => dispatch(setHabit(habit))}
          options={habitNames} icon={<FiTarget className="w-6 h-6" />} label="Select habit" singleOption />
        <DateInput value={finalDate} onChange={(date) => dispatch(setFinalDate(date))} label="Final date" />
      </div>

      {!id &&
        <Button onClick={() => handleAddEditGoal(true)}>
          <Icon icon={<MdAdd className="w-6 h-6" color="white" />} />
          <p className="text-lg text-[white]">Create goal</p>
        </Button>}
      {!!id &&
        <div className="flex justify-center space-x-2">
          <Button className="basis-1/2" onClick={() => handleAddEditGoal(false)}>
            <Icon icon={<MdEdit className="w-6 h-6" color="white" />} />
            <p className="text-lg text-[white]">Edit goal</p>
          </Button>
          <Button className="basis-1/2" onClick={removeGoal}>
            <Icon icon={<MdDelete className="w-6 h-6" color="white" />} />
            <p className="text-lg text-[white]">Delete goal</p>
          </Button>
        </div>}
    </div>
  );
}

export default NewGoalPage;
