const { IconContext } = require('react-icons');

function Icon({ icon, color }) {
  return (
    <IconContext.Provider value={{ color }}>
      {icon}
    </IconContext.Provider>
  );
}

export default Icon;
