import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import trilhas2 from '../assets/trilhas2.svg';

export default function Home() {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCpf, setUserCpf] = useState("");
  const [userCep, setUserCep] = useState("");
  const [userUf, setUserUf] = useState("");
  const [userLogradouro, setUserLogradouro] = useState("");

  const getTokenUser = () => {
    const token = localStorage.getItem("token");
    if(!token) return null;

    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  const url = "https://form-trilhas-api.onrender.com";

  const userData = async () => {
    const user = getTokenUser();
    const externalId = user?.externalId;

    try {
      const response = await axios.get(`${url}/users/${externalId}/userdata`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      setUserName(response.data.name);  
      setUserEmail(response.data.email);
      setUserCpf(response.data.cpf);
      setUserCep(response.data.cep);
      setUserUf(response.data.uf);
      setUserLogradouro(response.data.logradouro);
    } catch (error) {
      toast.error("Erro ao buscar dados do usuário");
    }
  }

  const navigate = useNavigate();

  const logout = async () => {
    
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate('/');
    }, 1000);

    toast.success("Logout realizado com sucesso");
  }

  userData(); 

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