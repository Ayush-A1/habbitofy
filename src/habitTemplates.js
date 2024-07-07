import { FaDumbbell, FaBook, FaMoneyBillWave } from 'react-icons/fa';
import { FaPersonRunning, FaWineBottle } from 'react-icons/fa6';
import { GiMeditation } from 'react-icons/gi';
import { MdScreenLockPortrait } from 'react-icons/md'

const habitTemplates = [
  {
    icon: <FaDumbbell className="w-7 h-7" />,
    name: 'Exercise'
  },
  {
    icon: <FaPersonRunning className="w-7 h-7" />,
    name: 'Run'
  },
  {
    icon: <FaWineBottle className="w-7 h-7" />,
    name: 'Don\'t drink'
  },
  {
    icon: <FaBook className="w-7 h-7" />,
    name: 'Read books'
  },
  {
    icon: <GiMeditation className="w-7 h-7" />,
    name: 'Meditate'
  },
  {
    icon: <FaMoneyBillWave className="w-7 h-7" />,
    name: 'Save money'
  },
  {
    icon: <MdScreenLockPortrait className="w-7 h-7" />,
    name: 'Reduce screen time'
  },
];

export default habitTemplates;
