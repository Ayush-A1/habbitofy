import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';

function SelectSorting({ criteria, order, onChange, options }) {
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

  const sortingOrderIcon = (order === -1) ?
    <AiOutlineSortAscending className="w-6 h-6" /> : <AiOutlineSortDescending className="w-6 h-6" />;

  const renderedOptions = options.map((option) => {
    const optionClass = classNames(
      'relative', '-z-10', 'flex', 'space-x-2', 'px-4', 'py-2', 'border-neutral-3', 'border-b-[1.5px]',
      'cursor-pointer', 'duration-200', 'hover:bg-neutral-2-brighter', 'first:rounded-t-xl', 'last:rounded-b-xl', 'last:border-b-0',
      { 'bg-neutral-2-brighter': criteria === option && !!order, 'bg-neutral-2': !(criteria === option && !!order) }
    );

    return (
      <div key={option} className={optionClass} onClick={() => onChange(option, (order !== 1 || option !== criteria) ? 1 : -1)}>
        <div></div>
        <p className="grow text-center">{option}</p>
        <div className="w-6 h-6">
          {(criteria === option && order === -1) && <AiOutlineSortAscending className="w-6 h-6" />}
          {(criteria === option && order === 1) && <AiOutlineSortDescending className="w-6 h-6" />}
        </div>
      </div>
    );
  }
  );

  const selectClass = classNames(
    'flex', 'justify-between', 'space-x-2', 'mb-2', 'px-4', 'py-2', 'rounded-full',
    'shadow-md', 'shadow-neutral-3', 'cursor-pointer', 'duration-200', 'hover:opacity-80',
    { 'bg-neutral-2-brighter': isOpen, 'bg-neutral-2': !isOpen });

  const arrowClass = classNames('w-6', 'h-6',
    { 'animate-flip-select-arrow': isOpen, 'animate-flip-select-arrow-back': isOpen === false });

  const optionsClass = classNames('absolute', 'z-10', 'w-full', 'rounded-xl', 'origin-top', 'shadow-md', 'shadow-neutral-3',
    { 'animate-open-select': isOpen, 'animate-close-select': isOpen === false, 'hidden': isOpen === null });

  return (
    <div className="relative min-w-[14rem] self-end" ref={selectEl}>
      <div className={selectClass} onClick={() => setIsOpen(!isOpen)}>
        {(order === null) ?
          <p className="font-bold">Select sorting</p> :
          <div className="flex space-x-2">
            <b>{criteria}</b> {sortingOrderIcon}
          </div>}

        <MdKeyboardArrowDown className={arrowClass} />
      </div>

      <div className={optionsClass}>
        {renderedOptions}
      </div>
    </div>
  );
}

export default SelectSorting;
