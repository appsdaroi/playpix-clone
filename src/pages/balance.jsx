import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { randomBetweenRange, randomDate } from "@/helpers/random";

import { Bet } from "@/modules/history/Bet";
import moment from "moment";

export default function Balance() {
  const router = useRouter();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const generatedHistory = [];
    for (let index = 0; index < randomBetweenRange(12, 20); index++) {
      generatedHistory.push({
        id: randomBetweenRange(1000000000, 9999999999),
        date: randomDate(new Date(moment().subtract(4,'d').valueOf()), new Date(moment().valueOf())),
        value: randomBetweenRange(500, 5000),
        quotes: `${randomBetweenRange(1, 2)}.${randomBetweenRange(0, 99)}`,
      });
    }

    setHistory(() => {
      return generatedHistory.sort((a,b) => b.date - a.date);
    });
  }, []);

  return (
    <div className="flex flex-col h-full gap-px">
      <i
        onClick={() => router.push("/")}
        className="bc-icon text-white before:content-['\e956'] -ml-2"
      />

      <div className="flex gap-2 mb-1 -mr-2 overflow-x-hiddend flex-nowrap h-[145px]">
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
