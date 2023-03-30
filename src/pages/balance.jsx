import { signOut, getSession } from "next-auth/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import _ from "lodash";
import axios from "axios";
import moment from "moment";

import { Bet } from "@/modules/history/Bet";

export default function Balance({ session }) {
  const router = useRouter();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getExtracts = async () => {
      const config = {
        headers: {
          "X-Master-Key":
            "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
        },
      };

      const res = await axios.get(
        "https://api.jsonbin.io/v3/b/64253696ebd26539d0a03f1f",
        config
      );

      const thisUserHistory = _.find(
        res.data.record.extracts,
        (user) => user.id === session.user.id
      );

      setHistory(thisUserHistory.list);
    };

    getExtracts();
  }, []);

  return (
    <div className="flex flex-col h-full gap-px">
      <i
        onClick={() => router.push("/")}
        className="bc-icon text-white before:content-['\e956'] -ml-2"
      />

      <div className="flex gap-2 mb-1 -mr-2 overflow-x-hiddend flex-nowrap">
        <div className="tracking-widest px-5 py-[0.44rem] text-xs text-white text-[10px] bg-[linear-gradient(to_bottom,_#4A94FD,_#1074D0)] rounded-[6px]">
          TODOS
        </div>

        <ul className="flex gap-2 overflow-x-scroll w-max flex-nowrap !whitespace-nowrap">
          <li className="px-4 py-[0.44rem] tracking-widest text-xs text-white text-[10px] bg-[#1F2B48] rounded-[6px]">
            APOSTAS ABERTAS
          </li>
          <li className="px-4 py-[0.44rem] tracking-widest text-xs text-white text-[10px] bg-[#1F2B48] rounded-[6px]">
            RETIRADO
          </li>
          <li className="px-4 py-[0.44rem] tracking-widest text-xs text-white text-[10px] bg-[#1F2B48] rounded-[6px]">
            GANHOU
          </li>
          <li className="px-4 py-[0.44rem] tracking-widest text-xs text-white text-[10px] bg-[#1F2B48] rounded-[6px]">
            PERDIDO
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2.5 overflow-y-scroll flex-auto">
        <div className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)] mt-3 rounded">
          <i className="bc-icon text-[rgb(104,125,150)] before:content-['\e9d9'] !w-min !text-[15px]" />

          <div className="grid">
            <span className="text-[rgb(104,125,150)] text-xs">Filtro</span>
            <span className="text-xs text-white/50">Todos, 24 horas</span>
          </div>

          <i className="bc-icon text-[rgb(104,125,150)] before:content-['\e5cf'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-[11px] ml-auto" />
        </div>

        <div className="flex flex-col gap-2.5">
          {history.map((bet, index) => (
            <Bet key={index} props={bet} />
          ))}

          <div className="block h-[5rem]" />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: { destination: "/auth/signin" },
    };

  return {
    props: {
      session: session,
    },
  };
}
