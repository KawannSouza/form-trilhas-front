import maintenance from '../assets/maintenance.svg';

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full lg:flex-row p-10">
      <h1 className="text-3xl font-extrabold text-blue-500 whitespace-nowrap lg:text-5xl">EM MANUTENÇÃO</h1>
      <img 
      src={maintenance}
      className="sm:w-150"  
      alt="fixing-image" />
    </div>
  );
}