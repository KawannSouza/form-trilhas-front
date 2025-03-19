import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex flex-col justify-center items-center w-full p-4 gap-6">
            <div className="relative">
                <input
                    type="email"
                    placeholder="Seu email"
                    className="p-4 rounded-2xl border-2 border-blue-400 outline-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fa-solid fa-envelope absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
            </div>
            <div className="relative">
                <input
                    type="password"
                    placeholder="Sua senha"
                    className="p-4 rounded-2xl border-2 border-blue-400 outline-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <i className="fa-solid fa-lock absolute top-1/2 -translate-y-1/2 right-3 text-gray-700"></i>
            </div>

            <button 
                className="p-4 w-65 cursor-pointer rounded-2xl bg-blue-400 font-semibold text-white"
            >
                ENTRAR
            </button>
        </div>
    )
}