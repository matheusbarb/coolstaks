
import Link from "next/link";


export default function Home() {
  

  return (
    
    <div className="flex flex-col justify-center h-[calc(100vh-130px)] ">
      
        <div className="">
          <Link href={"/dashboard"}>
            <div className="flex flex-col justify-center items-center ">
              <section className="bg-black rounded-md ">
                <span className="bg-[#C4A1FF] block p-2 -translate-x-1 -translate-y-1 border-black border-2 rounded-md text-xl hover:-translate-x-2 hover:-translate-y-2 transition-all">
                  Meu Painel
                </span>
              </section>
            </div>
          </Link>
        </div>
    
      <div className="flex flex-col items-center">
        <h1>COOL STACKS (BETA)</h1>
        <h1 className="flex-grow font-bold text-2xl text-center ">
          Sistema feito para você organizar
          <span className="text-[#C4A1FF]"> suas tarefas :) </span>
        </h1>
      </div>
    </div>
    
  );
}
