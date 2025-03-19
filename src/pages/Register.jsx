//IMPORTAÇÕES
import { useEffect, useState } from 'react';

//FUNÇÃO QUE GERA A PÁGINA DE REGISTRO
export default function Register() {
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
                            type="text" placeholder="Confirme sua senha"
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
                >
                    + Informações Adicionais</button>
                <button
                    className="bg-gray-700 text-white font-semibold py-2 px-2 w-60 rounded-xl cursor-pointer whitespace-nowrap lg:[py-2 px-6 w-70]"
                    onClick={() => console.log(name)}
                >
                    Fazer Upload do Currículo</button>
            </div>
            
            <button
                className="bg-blue-400 text-white font-semibold py-2 px-2 w-60 rounded-xl cursor-pointer lg:[py-2 px-6 w-70]"
            >
                REGISTRAR</button>
        </div>
    )
}