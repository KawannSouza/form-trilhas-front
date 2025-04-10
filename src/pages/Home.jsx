import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import trilhas2 from '../assets/trilhas2.svg';
import boy from '../assets/boy.svg';
import girl from '../assets/girl.svg';
import { jsPDF } from 'jspdf';

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

  const logout = () => {
    
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate('/');
    }, 1000);

    toast.success("Logout realizado com sucesso");
  }

  useEffect(() => {
    userData();
  }, []);

  const [isGirl, setIsGirl] = useState(false);

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);

    doc.text("Comprovante de Inscrição", 20, 20);
    doc.text(`Nome: ${userName}`, 20, 40);
    doc.text(`Email: ${userEmail}`, 20, 50);
    doc.text(`Cep: ${userCep}`, 20, 60);
    doc.text(`Estado: ${userUf}`, 20, 70);
    doc.text(`Logradouro: ${userLogradouro}`, 20, 80);

    doc.save("comprovante.pdf");
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
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl mt-10 font-semibold">Olá, {userName}</h1>
        <div className="flex flex-col items-center justify-center m-10 md:flex-row">
            <div className="flex flex-col items-center justify-center">
              <img 
                  src={isGirl ? girl : boy}
                  alt="boy-image" 
                  className="w-70 object-contain mb-4"
                 
                />
              <button 
                onClick={() => setIsGirl(!isGirl)}
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-300"  
              >
                Alterar Avatar
              </button>
            </div>
            <div className="bg-white p-6 items-center justify-center rounded-2xl shadow-lg m-10 max-w-md w-full">
                <p className="font-bold">{userEmail}</p>
                <p className="font-bold">{userCpf}</p>
                <p className="font-bold">{userCep}</p>
                <p className="font-bold">{userUf}</p> 
                <p className="font-bold">{userLogradouro}</p>
            </div>
          </div>
          <button 
            onClick={generatePdf}
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded-md cursor-pointer m-10 hover:px-8 transform duration-300"
          >
            Gerar Comprovante de Inscrição
          </button>
      </div>
      <ToastContainer />
    </div>
  );
}