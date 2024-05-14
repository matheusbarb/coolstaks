import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    
    <div className="flex flex-col justify-center h-[calc(100vh-130px)] ">
      {session ? (
        <div className="">
          <Link href={"/dashboard"}>
            <div className="flex flex-col justify-center items-center ">
              <section className="bg-black rounded-md ">
                <span className="bg-[#C4A1FF] block p-2 -translate-x-1 -translate-y-1 border-black border-2 rounded-md text-xl hover:-translate-x-2 hover:-translate-y-2 transition-all active:translate-x-0 active:translate-y-0">
                  Meu Painel
                </span>
              </section>
            </div>
          </Link>
        </div>
      ) : null}
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
