import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name || "";
  const firstName = userName.split(" ")[0];

  return (
    <div className="border-b-2 border-black pb-2 text-center">
      <div className="flex justify-around items-center mt-6 ">
        <h1 className="lg:ml-20 md:ml-20 ml-2">
          <Link
            className=" font-bold text-2xl hover:text-[#C4A1FF] transition-all "
            href={"/"}
          >
            <span className="">CoolTasks</span>
          </Link>
          <span className="text-[#C4A1FF] font-bold">+</span>
          <Link href={"https://github.com/matheusbarb"}>
            <h2 className="text-xs hover:text-[#C4A1FF] hover:font-semibold transition-all  ">
              by Matheus Barbosa
            </h2>
          </Link>
        </h1>
        {status === "loading" ? (
          <></>
        ) : session ? (
          <button className="lg:mr-20 md:mr-20 mr-2 bg-black rounded-md">
            <span className="bg-[#C4A1FF] block p-2 -translate-x-2 -translate-y-2 border-black border-2 rounded-md text-xl hover:-translate-y-3  transition-all">
              Olá! {firstName}
            </span>
            <span
              onClick={() => signOut()}
              className="bg-[#C4A1FF] block  -translate-x-2 -translate-y-2 border-black border-2 rounded-md text-xl hover:-translate-y-3 active:translate-x-0 active:translate-y-0 transition-all"
            >
              Sair
            </span>
          </button>
        ) : (
          <button
            className="lg:mr-20 md:mr-20 mr-2 bg-black rounded-md"
            onClick={() => signIn("google")}
          >
            <span className="bg-[#C4A1FF] block p-2 -translate-x-2 -translate-y-2 border-black border-2 rounded-md text-xl hover:-translate-y-3 active:translate-x-0 active:translate-y-0 transition-all">
              Minha conta
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
