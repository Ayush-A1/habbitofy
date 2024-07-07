import classNames from 'classnames';

function DateInput({ value, onChange, label }) {
  const handleInput = (event, input) => {
    if ((input === 'year' && String(event.target.value).length <= 4) ||
      ((input === 'month' || input === 'day') && String(event.target.value).length <= 2)) {
      onChange({ input, text: event.target.value });
    }
  }

  const inputWrapperClass = classNames(
    'flex', 'flex-col', 'justify-between', 'space-y-0', 'px-4', 'pt-1', 'pb-2', 'bg-neutral-2', 'rounded-xl',
    'border-2', 'border-[transparent]', 'shadow-md', 'shadow-neutral-3', 'duration-200',
    'focus-within:bg-neutral-2-brighter', 'focus-within:border-accent', 'focus-within:shadow-accent', 'xl:grow');

  const getInputClass = (year) => classNames(
    'text-center', 'bg-[transparent]', 'outline-none', 'border-b-2', 'border-neutral-3',
    'duration-200', 'focus:border-accent', 'placeholder:text-neutral-4',
    { 'w-10': year, 'w-5': !year });

  return (
    <div className={inputWrapperClass}>
      <p className="text-sm whitespace-nowrap text-neutral-4">{label}</p>
      <div className="flex space-x-2">
        <input className={getInputClass(true)} value={value.year} placeholder="0000" onInput={(event) => handleInput(event, 'year')} />
        <input className={getInputClass(false)} value={value.month} placeholder="00" onInput={(event) => handleInput(event, 'month')} />
        <input className={getInputClass(false)} value={value.day} placeholder="00" onInput={(event) => handleInput(event, 'day')} />
      </div>
    </div>
  );
}

export default DateInput;
