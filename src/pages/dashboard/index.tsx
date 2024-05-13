"use client";
import classNames from "classnames";
import { Textarea } from "@/components/textarea";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface HomeProps {
  user: {
    email: string;
  };
}

interface TaskProps {
  id: string;
  created?: Date;
  task?: string;
  userEmail?: string;
}

export default function Dashboard({ user }: HomeProps) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState<boolean[]>([]);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const tasksRef = collection(db, "tasks");
      const q = query(
        tasksRef,
        orderBy("created", "desc"),
        where("userEmail", "==", user?.email)
      );

      onSnapshot(q, (snapshot) => {
        let list = [] as TaskProps[];
        let openList = [] as boolean[];
        let completedList = [] as boolean[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            task: doc.data().task,
            created: doc.data().created,
            userEmail: doc.data().userEmail,
          });

          completedList.push(false);
          openList.push(false);
        });

        setTasks(list);
        setCompleted(completedList);
        setOpen(openList);
      });
    }

    loadTasks();
  }, [user?.email]);

  const handleToggleOpen = (index: number) => {
    setOpen((prevOpen) =>
      prevOpen.map((value, i) => (i === index ? !value : value))
    );
  };

  const handleToggleCompleted = (index: number) => {
    setCompleted((prevCompleted) =>
      prevCompleted.map((value, i) => (i === index ? !value : value))
    );
  };

  const handleRegisterTask = async (event: FormEvent) => {
    event.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        created: new Date(),
        userEmail: user?.email,
      });

      setInput("");
    } catch (err) {}
  };

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "tasks", id);

    await deleteDoc(docRef);
  }
  return (
    <div className="flex flex-col mt-10 justify-center items-center">
      <section className="flex flex-col bg-green-100 border-black border-r-8 border-b-8 border-4 rounded-t-2xl transition-all p-6 gap-4">
        <h1 className="text-2xl">Qual a sua tarefa?</h1>
        <form
          onSubmit={handleRegisterTask}
          className="flex flex-col items-center"
        >
          <Textarea
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
            placeholder="Digite aqui :)"
          />
          <div className="mt-4">
            <button type="submit" className="bg-black rounded-md">
              <span className="bg-[#C4A1FF] block pl-8 pr-8 p-3 -translate-x-2 -translate-y-2 border-black border-2 rounded-md text-xl hover:-translate-y-3 active:translate-x-0 active:translate-y-0 transition-all">
                Registrar
              </span>
            </button>
          </div>
        </form>
      </section>

      <section className="flex flex-col mt-2 w-full max-w-md mx-auto items-center gap-4">
        <h1 className="text-2xl underline">Minhas Tarefas</h1>
        {tasks.length === 0 ? (
          <p>Você não adicionou nenhuma tarefa.</p>
        ) : (
          tasks.map((item, index) => (
            <article
              key={item.id}
              className="w-[75%] px-4 py-4 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative"
            >
              <div className="flex flex-col">
                <p
                  className={`text-xl mb-4 ${
                    completed[index] ? "line-through" : ""
                  }`}
                >
                  {item.task}
                </p>
              </div>
              <button
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => handleToggleOpen(index)} // Passa o índice para a função handleToggleOpen
                className="absolute top-0 right-0 mt-2 mr-2 border-black border-2 bg-green-100 hover:bg-[#C4A1FF] active:bg-[#C4A1FF] w-6 h-6 flex justify-center items-center"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.06 3.59L20.41 4.94C21.2 5.72 21.2 6.99 20.41 7.77L7.18 21H3V16.82L13.4 6.41L16.23 3.59C17.01 2.81 18.28 2.81 19.06 3.59ZM5 19L6.41 19.06L16.23 9.23L14.82 7.82L5 17.64V19Z"
                    fill="black"
                  />
                </svg>

                <div
                  className={classNames(
                    "absolute xl:ml-[70px] lg:ml-[70px] md:lg:ml-[70px] ml-10 xl:mt-[102px] lg:mt-[102px] md:mt-[102px] mt-28  z-10  w-18 origin-top-right bg-white focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black border-2 divide-y divide-black",
                    { hidden: !open[index] } // Usa o estado de abertura correspondente ao índice
                  )}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium"
                      role="menuitem"
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleCompleted(index);
                      }}
                    >
                      {completed[index] ? "Reabrir" : "Realizado"}
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium"
                      role="menuitem"
                      onClick={() => handleDeleteTask(item.id)}
                    >
                      Excluir
                    </a>
                  </div>
                </div>
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session?.user?.email,
      },
    },
  };
};
