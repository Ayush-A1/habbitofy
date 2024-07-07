import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center space-y-2 pt-[4.5rem] pb-8 px-4">
      <p className="text-4xl">404</p>
      <p className="text-neutral-4 cursor-pointer" onClick={() => navigate('/')}>Go to main</p>
    </div>
  );
}

export default NotFoundPage;
