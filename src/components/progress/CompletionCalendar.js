import { useState } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';
import { MdCheck, MdClose } from 'react-icons/md';
import Icon from '../other/Icon';

function CompletionCalendar() {
  const habits = useSelector((state) => state.habitsReducer.habits);
  const [showCompletionMenu, setShowCompletionMenu] = useState(null);

  const now = new Date();
  const startDate = new Date(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`);
  const renderedDates = [];

  for (let time = startDate.getTime(); (new Date(time)).getMonth() === now.getMonth(); time += 8.64e+7) {
    const date = new Date(time);
    const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const completedHabits = habits.filter((habit) =>
      habit.days.includes(weekDays[date.getDay()]) && habit.dates.includes(stringDate));
    const skippedHabits = habits.filter((habit) =>
      habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate) &&
      (new Date(habit.created)).getTime() <= time && time <= now.getTime());

    const calendarDayClass = classNames(
      'flex', 'justify-center', 'items-center', 'aspect-square', 'rounded-full', 'shadow-md', 'shadow-neutral-3',
      'cursor-pointer', 'duration-200', 'hover:opacity-80', 'active:scale-95', 'sm:text-xl',
      {
        'bg-neutral-2': completedHabits.length === 0 && skippedHabits.length === 0,
        'bg-success': completedHabits.length > 0 && skippedHabits.length === 0,
        'bg-failure text-[white]': skippedHabits.length > 0
      }
    );

    const renderedCompletedHabits = completedHabits.map((habit) =>
      <div key={habit.id} className="flex justify-between items-center space-x-2">
        <p className="whitespace-nowrap">{habit.name}</p>
        <Icon icon={<MdCheck className="w-6 h-6" />} color="#7bc93c" />
      </div>);

    const renderedSkippedHabits = skippedHabits.map((habit) =>
      <div key={habit.id} className="flex justify-between items-center space-x-2">
        <p className="whitespace-nowrap">{habit.name}</p>
        <Icon icon={<MdClose className="w-6 h-6" />} color="#c93c3c" />
      </div>);

    const completionMenuClass = classNames(
      'absolute', 'z-10', 'flex', 'flex-col', 'space-y-2', 'mt-2', 'px-4', 'py-2',
      'bg-neutral-2', 'rounded-xl', 'shadow-md', 'shadow-neutral-3',
      { 'animate-show-completion-menu': !!showCompletionMenu }
    );

    renderedDates.push(
      <div key={date.getDate()} className="relative">
        <div className={calendarDayClass} onClick={() =>
          ((completedHabits.length > 0 && skippedHabits.length === 0) || skippedHabits.length > 0) &&
          setShowCompletionMenu((showCompletionMenu === date.getDate()) ? 0 : date.getDate())
        }>
          {date.getDate()}
        </div>
        {showCompletionMenu === date.getDate() &&
          <div className={completionMenuClass}>
            {renderedCompletedHabits}
            {renderedSkippedHabits}
          </div>}
      </div>
    );
  }

  const calendarClass = classNames(
    'grid', 'grid-cols-[repeat(auto-fill,_minmax(2.25rem,_1fr))]', 'gap-2', 'px-4', 'pb-5',
    'border-b-[1.5px]', 'border-neutral-3', 'sm:grid-cols-[repeat(7,_2.7rem)]',
    'sm:place-content-center', 'sm:px-16', 'xl:border-b-0');

  return (
    <div className={calendarClass}>
      {renderedDates}
    </div>
  );
}

export default CompletionCalendar;
