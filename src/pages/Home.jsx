import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import trilhas2 from '../assets/trilhas2.svg';
import boy from '../assets/boy.svg';
import girl from '../assets/girl.svg';
import { jsPDF } from 'jspdf';
import Modal from '../components/Modal';

export default function Home() {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCpf, setUserCpf] = useState("");
  const [userCep, setUserCep] = useState("");
  const [userUf, setUserUf] = useState("");
  const [userLogradouro, setUserLogradouro] = useState("");

  const [openUpdateInfosModal, setOpenUpdateInfosModal] = useState(false);

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

  const handleCepChange = async (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setUserCep(value);

    if (value.length === 8) {
        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
            if (!data.erro) {
                setUserUf(data.uf);
                setUserLogradouro(`${data.logradouro}, ${data.bairro}, ${data.localidade}`);
            } else {
                toast.error("CEP não encontrado.");
                setUserUf("");
                setUserLogradouro("");
            }   
        } catch (error) {
            toast.error("CEP inválido. Erro ao buscar.");
            
        }
        
    }
}

  const updateUserData = async () => {
    const user = getTokenUser();
    const externalId = user?.externalId;

    try {
      
      const response = await axios.put(`${url}/users/${externalId}/update`, { 
          name: userName,
          email: userEmail,
          cpf: userCpf,
          cep: userCep,
          uf: userUf,
          logradouro: userLogradouro
        },{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      });

      if(response.status === 200) {
        toast.success("Dados atualizados com sucesso");
      }else {
        toast.error("Erro ao atualizar dados");
      }

    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar dados");
    }
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
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 font-bold text-white rounded cursor-pointer hover:bg-blue-900 transition duration-300"
                  onClick={() => setOpenUpdateInfosModal(true)}
                >
                  Editar Informações
                </button>
            </div>
          </div>
          <button 
            onClick={generatePdf}
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded-md cursor-pointer m-10 hover:px-8 transform duration-300"
          >
            Gerar Comprovante de Inscrição
          </button>
      </div>
      <Modal isOpen={openUpdateInfosModal}>
        <div>
          <h2 className="text-gray-700 text-3xl font-bold mb-6">Informações Adicionais</h2>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Digite seu CPF"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="py-2 px-4 rounded-2xl border-2 border-blue-400 outline-0"
              />
              <i className="fa-solid fa-key absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Digite seu CEP" 
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="py-2 px-4 rounded-2xl border-2 border-blue-400 outline-0"
              />
              <i className="fa-solid fa-inbox absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
            </div>
            <div className="relative">
              <input 
                type="text"
                placeholder="Estado" 
                value={userCpf}
                onChange={(e) => setUserCpf(e.target.value)}
                className="py-2 px-4 rounded-2xl border-2 border-blue-400 outline-0"
              />
              <i className="fa-solid fa-thumbtack absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Logradouro"
                value={userCep}
                onChange={handleCepChange}
                className="py-2 px-4 rounded-2xl border-2 border-blue-400 outline-0"
              />
              <i className="fa-solid fa-location-dot absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Logradouro"
                value={userUf}
                onChange={(e) => setUserUf(e.target.value)}
                className="py-2 px-4 rounded-2xl border-2 border-blue-400 outline-0"
              />
              <i className="fa-solid fa-location-dot absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Logradouro"
                value={userLogradouro}
                onChange={(e) => setUserLogradouro(e.target.value)}
                className="py-2 px-4 rounded-2xl border-2 border-blue-400 outline-0"
              />
              <i className="fa-solid fa-location-dot absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
            </div>
          </div>
          <div className="flex flex-row-reverse justify-between mt-10">
            <button
              className="bg-gray-800 font-bold text-white p-2 rounded-md cursor-pointer hover:bg-gray-950 transform duration-300"
            >
              ATUALIZAR
            </button>
            <button 
              className="bg-red-600 font-bold text-white p-2 rounded-md cursor-pointer hover:bg-red-800 transform duration-300" 
              onClick={() => setOpenUpdateInfosModal(false)}
            >
              FECHAR
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}