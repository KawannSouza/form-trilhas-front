import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const url = "https://form-trilhas-api.onrender.com";

    const handleLogin = async (event) => {
        event.preventDefault();
    
        setLoading(true);
        setErrorMessage('');
    
        if (!email || !password) {
          setErrorMessage('Todos os campos precisam ser preenchidos!');
          toast.error('Todos os campos precisam ser preenchidos!');
          setLoading(false);
          return;
        }
    
        try {
          const response = await axios.post(`${url}/users/login`, { email, password });
    
          if (response.status === 200) {
            login(response.data.token);
            toast.success('Login realizado com sucesso');
            setTimeout(() => {
              navigate('/home');
            }, 500);
          }
        } catch (error) {
          const message = error.response?.data?.message || 'Erro ao tentar fazer login.';
          setErrorMessage(message);
          toast.error(message);
        } finally {
          setLoading(false);
        }
      };

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
                className={`p-4 w-65 cursor-pointer rounded-2xl font-semibold text-white ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400'
                }`}
                onClick={handleLogin}
                disabled={loading}
            >
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>

            <ToastContainer />
        </div>
    );
}