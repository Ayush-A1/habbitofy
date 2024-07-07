import habitTemplates from '../../habitTemplates';

function ProgressCardsItem({ label, value, habit }) {
  const icon = !!habit && habitTemplates.find((templateHabit) => templateHabit.name === habit.icon)?.icon;

  return (
    <div className="flex flex-col p-2 bg-neutral-2 rounded-xl shadow-md shadow-neutral-3">
      <p className="text-sm text-neutral-4 whitespace-nowrap">{label}</p>
      <div className="grow flex justify-center items-center py-2">
        <p className="self-center text-4xl">{value}</p>
      </div>
      {!!habit &&
        <div className="flex items-center space-x-2 ml-2">
          {icon}
          <p>{habit.name}</p>
        </div>}
    </div>
  );
}

export default ProgressCardsItem;
