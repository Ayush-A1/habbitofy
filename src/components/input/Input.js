import classNames from 'classnames';

function Input({ value, onChange, placeholder }) {
  const inputClass = classNames(
    'grow', 'flex', 'justify-between', 'space-x-2', 'mb-1', 'px-4', 'py-2', 'bg-neutral-2',
    'rounded-full', 'border-2', 'border-[transparent]', 'shadow-md', 'shadow-neutral-3', 'duration-200',
    'focus-within:bg-neutral-2-brighter', 'focus-within:border-accent', 'focus-within:shadow-accent');

  return (
    <div className={inputClass}>
      <input className="w-full bg-[transparent] outline-none placeholder:text-neutral-4"
        value={value} placeholder={placeholder} onInput={(event) => onChange(event.target.value)} />
    </div>
  );
}

export default Input;
