import { useSelector } from 'react-redux';

function Username() {
  const name = useSelector((state) => state.user.userName);
  console.log(name, 'name');
  return <div className="hidden text-sm font-semibold md:block">{name}</div>;
}

export default Username;
