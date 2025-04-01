//IMPORTAÇÕES
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';

//FUNÇÃO QUE GERA A PÁGINA DE REGISTRO
export default function Register() {
    const [openInfosModal, setOpenInfosModal] = useState(false);
    const [openFileModal, setOpenFileModal] = useState(false);
    const handleFileSelect = (file) => {
        console.log('Arquivo selecionado:', file);
    };

    //ESTADOS PARA ARMAZENAR OS VALORES DO FORMULÁRIO
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //ESTADOS PARA INFORMAÇÕES ADICIONAIS
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [uf, setUf] = useState("");
    const [logradouro, setLogradouro] = useState("");

    const handleCepChange = async (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCep(value);

        if (value.length === 8) {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
                if (!data.erro) {
                    setUf(data.uf);
                    setLogradouro(`${data.logradouro}, ${data.bairro}, ${data.localidade}`);

                } else {
                    toast.error("CEP não encontrado.");
                    setUf("");
                    setLogradouro("");

                }   
            } catch (error) {
                toast.error("CEP inválido. Erro ao buscar.");
                
            }
            
        }
    }

    const url = "https://form-trilhas-api.onrender.com";

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            toast.error("Todos os campos precisam ser preenchidos!");
            return;
        }

        try {
            await axios.post(`${url}/users/register`, {
                name,
                email,
                password,
                confirmPassword,
                cpf,
                cep,
                uf,
                logradouro
            });
            toast.success("Registro feito com sucesso. Faça Login!");
        } catch (error) {
            toast.error("Erro ao tentar se registrar, tente novamente!");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
                <div>
                    <div className="relative">
                        <input 
                            type="text" placeholder="Seu nome completo"
                            className="py-2 px-4 border-2 border-blue-400 outline-0 rounded-2xl lg:p-4"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                         />
                        <i className="fa-solid fa-user absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
                    </div>
                </div>
                <div>
                    <div className="relative">
                        <input 
                            type="text" placeholder="Seu email"
                            className="py-2 px-4 border-2 border-blue-400 outline-0 rounded-2xl lg:p-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="fa-solid fa-envelope absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
                <div>
                    <div className="relative">
                        <input 
                            type="password" placeholder="Crie sua senha"
                            className="py-2 px-4 border-2 border-blue-400 outline-0 rounded-2xl lg:p-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="fa-solid fa-lock absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
                    </div>
                </div>
                <div>
                    <div className="relative">
                        <input 
                            type="password" placeholder="Confirme sua senha"
                            className="py-2 px-4 border-2 border-blue-400 outline-0 rounded-2xl lg:p-4"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <i className="fa-solid fa-lock absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
                <button
                    className="bg-gray-700 text-white font-semibold py-2 px-2 w-60 rounded-xl cursor-pointer whitespace-nowrap lg:[py-2 px-6 w-70]"
                    onClick={() => setOpenInfosModal(true)}
                >
                    + Informações Adicionais</button>
                <button
                    className="bg-gray-700 text-white font-semibold py-2 px-2 w-60 rounded-xl cursor-pointer whitespace-nowrap lg:[py-2 px-6 w-70]"
                    onClick={() => setOpenFileModal(true)}
                >
                    Fazer Upload do Currículo</button>
            </div>

            <Modal isOpen={openInfosModal}>
                <div className="">
                    <h2 className="text-gray-700 text-3xl font-bold mb-10">Informações Adicionais</h2>
                    <div className="flex flex-col justify-center items-center gap-6">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Digite seu CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                className="p-4 rounded-2xl border-2 border-blue-400 outline-0"
                            />
                            <i className="fa-solid fa-key absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Digite seu CEP" 
                                value={cep}
                                onChange={handleCepChange}
                                className="p-4 rounded-2xl border-2 border-blue-400 outline-0"
                            />
                            <i className="fa-solid fa-inbox absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
                        </div>
                        <div className="relative">
                            <input 
                                type="text"
                                placeholder="Estado" 
                                value={uf}
                                onChange={(e) => setUf(e.target.value)}
                                className="p-4 rounded-2xl border-2 border-blue-400 outline-0"
                            />
                            <i className="fa-solid fa-thumbtack absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Logradouro"
                                value={logradouro}
                                onChange={(e) => setLogradouro(e.target.value)}
                                className="p-4 rounded-2xl border-2 border-blue-400 outline-0"
                            />
                            <i className="fa-solid fa-location-dot absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
                        </div>
                    </div>
                    <div className="flex justify-end mt-10">
                        <button className="bg-red-600 text-white py-1 px-4 rounded-md cursor-pointer" onClick={() => setOpenInfosModal(false)}>FECHAR</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={openFileModal}>
                <div className="flex flex-col justify-center items-center gap-4">
                    <FileUpload onFileSelect={handleFileSelect}/>
                    <button className="bg-red-600 text-white font-semibold cursor-pointer py-2 px-4 rounded-xl" onClick={() => setOpenFileModal(false)}>FECHAR</button>
                </div>
            </Modal>
            
            <button
                className="bg-blue-400 text-white font-semibold py-2 px-2 w-60 rounded-xl cursor-pointer lg:[py-2 px-6 w-70]"
                onClick={handleRegister}
            >
                REGISTRAR</button>

            <ToastContainer />
        </div>
    )
}