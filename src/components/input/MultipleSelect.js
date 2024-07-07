import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';

function MultipleSelect({ className, value, onChange, options, icon, label, singleOption }) {
  const [isOpen, setIsOpen] = useState(null);
  const selectEl = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (selectEl.current === null || !isOpen) return;
      if (!selectEl.current.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const renderedOptions = options.map((option) => {
    const checked = (singleOption) ? value === option : value.includes(option);

    const optionClass = classNames(
      'relative', '-z-10', 'flex', 'space-x-2', 'px-4', 'py-2', 'border-neutral-3', 'border-b-[1.5px]',
      'cursor-pointer', 'duration-200', 'first:rounded-t-xl', 'last:rounded-b-xl', 'last:border-b-0',
      { 'bg-neutral-2-brighter': checked, 'bg-neutral-2': !checked }
    );

    return (
      <div key={option} className={optionClass} onClick={() => onChange(option)}>
        <p className="grow">{option}</p>
        {checked && <MdCheck className="w-6 h-6" />}
      </div>
    );
  }
  );

  const selectClass = classNames('relative', className);
  const currentValueClass = classNames(
    'flex', 'justify-between', 'items-center', 'space-x-2', 'h-full', 'mb-2', 'px-4', 'py-2', 'bg-neutral-2',
    'rounded-xl', 'shadow-md', 'shadow-neutral-3', 'cursor-pointer', 'hover:opacity-80', 'duration-200',
    { 'bg-neutral-2-brighter': isOpen });

  const arrowClass = classNames('w-6', 'h-6',
    { 'animate-flip-select-arrow': isOpen, 'animate-flip-select-arrow-back': isOpen === false });

  const optionsClass = classNames('absolute', 'z-10', 'w-full', 'rounded-xl', 'origin-top', 'shadow-md', 'shadow-neutral-3',
    { 'animate-open-select': isOpen, 'animate-close-select': isOpen === false, 'hidden': isOpen === null });

  return (
    <div className={selectClass} ref={selectEl}>
      <div className={currentValueClass} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center space-x-2">
          {icon}
          <p className="font-bold">{label}</p>
        </div>
        <MdKeyboardArrowDown className={arrowClass} />
      </div>

      <div className={optionsClass}>
        {renderedOptions}
      </div>
    </div>
  );
}

export default MultipleSelect;
