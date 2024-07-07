import classNames from 'classnames';

function Button({ className, children, equalPaddings, ...rest }) {
  const buttonClass = classNames(
    'relative', 'bottom-0', 'flex', 'justify-center', 'items-center', 'space-x-2',
    'bg-gradient-to-br', 'from-primary-main', 'to-primary-brighter', 'rounded-full',
    'shadow-md', 'shadow-neutral-3', 'duration-200',
    'hover:shadow-lg', 'hover:shadow-neutral-4', 'hover:opacity-80', 'active:bottom-1.5',
    { 'p-2': equalPaddings, 'px-4 py-2': !equalPaddings }, className
  );

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  )
}

export default Button;
