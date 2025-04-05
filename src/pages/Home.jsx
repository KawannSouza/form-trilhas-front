import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import trilhas2 from '../assets/trilhas2.svg';


export default function Home() {

  const navigate = useNavigate();

  const logout = async () => {
    
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate('/');
    }, 1000);

    toast.success("Logout realizado com sucesso");
  }
  

  return (
    <div> 
      <div className="flex flex-row justify-between px-14 py-4 bg-gradient-to-r from-blue-800 to-blue-400">
        <img 
          src={trilhas2}
          alt="logo-trilhas-2" 
          className="w-35"
        />
        <button
          className="font-extrabold text-white cursor-pointer hover:text-gray-600 transform duration-300"
          onClick={logout}
        >
          SAIR
        </button>
      </div>
      <ToastContainer />  
    </div>
  );
}