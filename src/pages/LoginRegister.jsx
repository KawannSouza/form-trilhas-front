import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './Login';
import Register from './Register';
import person from '../assets/person.svg';
import trilhas from '../assets/trilhas.svg'; 

export default function LoginRegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleScreen = () => {
    setIsLogin((prev) => !prev);
  };

  return (
        <main className='bg-blue-400 flex flex-row justify-center h-screen lg:bg-transparent'>
          <section className='hidden flex-col justify-center items-center w-1/2 h-screen bg-gradient-to-r from-blue-800 to-blue-300 lg:flex'>
            <h2 className='text-white text-4xl font-extrabold'>
              {isLogin ? "Bem Vindo de Volta!" : "Bem Vindo ao Trilhas!"}
            </h2>
            <img 
              src={person} 
              alt="person-image" 
              className="w-100"
            />
            <img 
              src={trilhas} 
              alt="trilhas-logo" 
              className="w-50"
            />
          </section>

          <section className='bg-white mt-6 min-w-70 flex flex-col items-center w-1/2 p-8 rounded-2xl h-130 lg:mt-9'>
            <h2 className="text-gray-700 text-3xl font-bold whitespace-nowrap">{isLogin ? "Faça Login" : "Crie uma Conta"}</h2>
            <button 
              className="mb-4 italic font-semibold cursor-pointer text-blue-400 whitespace-nowrap hover:text-gray-700 transform duration-300 lg:mb-8" 
              onClick={toggleScreen}
            >
              {isLogin ? 'Não possui uma conta?' : 'Já possui uma conta?'}
            </button>
            <AnimatePresence mode='wait'>
              {isLogin ? (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}     
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <Login />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <Register />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </main>
  );  
}
