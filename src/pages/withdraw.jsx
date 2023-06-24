import { signOut, getSession } from "next-auth/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import _ from "lodash";
import moment from "moment";

import { FetchWithToken } from "@/utils/fetch";
import { ReaisToCents } from "@/helpers/format";

export default function Balance({ session }) {
  const router = useRouter();

  const [sideview, setSideview] = useState(false);
  const [withdrawValue, setWithdrawValue] = useState("");

  const submitWithdraw = async () => {
    console.log(withdrawValue);

    // Add to itau extracts
    await FetchWithToken({
      path: `itau/${session.session.user.id}/extracts`,
      method: "POST",
      data: {
        value: ReaisToCents(withdrawValue),
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        type: "deposit",
        title: "PLAYPIX",
      },
    });

    // Get itau balance to update it
    const { data } = await FetchWithToken({
      path: `itau/${session.session.user.id}`,
      method: "GET",
    });

    const currentItauBalance = data.response.balance;

    // Update itau balance with new value
    await FetchWithToken({
      path: `itau/${session.session.user.id}`,
      method: "PUT",
      data: {
        balance: currentItauBalance + ReaisToCents(withdrawValue),
      },
    });

    console.log(session.session.user.balance);

    // Update socialmoney balance
    await FetchWithToken({
      path: `playpix/${session.session.user.id}`,
      method: "PUT",
      data: {
        balance: session.session.user.balance - ReaisToCents(withdrawValue),
      },
    });
  };

  return (
    <>
      <div className="flex flex-col h-full gap-px">
        <i
          onClick={() => router.push("/")}
          className="bc-icon text-white before:content-['\e956'] -ml-2"
        />

        <div className="flex gap-2 mb-1 -mr-2 overflow-x-hiddend flex-nowrap">
          <ul className="flex gap-2 overflow-x-scroll w-max flex-nowrap !whitespace-nowrap">
            <li className="px-4 py-[0.44rem] tracking-[0.15em] text-xs text-white text-[9.5px] bg-[#1F2B48] rounded-[6px]">
              DEPOSITAR
            </li>
            <li className="px-4 py-[0.44rem] tracking-[0.15em] text-xs bg-[linear-gradient(to_bottom,_#4A94FD,_#1074D0)] text-white text-[9.5px] bg-[#1F2B48] rounded-[6px]">
              RETIRAR
            </li>
            <li className="px-4 py-[0.44rem] tracking-[0.15em] text-xs text-white text-[9.5px] bg-[#1F2B48] rounded-[6px]">
              INFORMAÇÕES
            </li>
            <li className="px-4 py-[0.44rem] tracking-[0.15em] text-xs text-white text-[9.5px] bg-[#1F2B48] rounded-[6px]">
              ESTADO DA RETIRADA
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(108px,1fr))] flex-col gap-2.5 overflow-y-scroll">
          <div
            onClick={() => setSideview(true)}
            className="flex items-center justify-center flex-col px-3 pt-4 pb-2 bg-[rgba(255,255,255,0.1)] mt-3 rounded w-full"
          >
            <img className="px-2 mb-1 max-h-[25px]" src="./itau.svg" />

            <hr className="w-full border-t border-t-[rgb(8,13,28)] my-2" />

            <span className="text-[rgba(255,255,255,0.6)] text-[12px] my-1">
              Itaú
            </span>
          </div>
        </div>
      </div>

      {sideview && (
        <div className="absolute left-0 top-0 flex px-2 flex-col h-full gap-px bg-[#080d1c] w-full">
          <i
            onClick={() => setSideview(false)}
            className="bc-icon text-white before:content-['\e956'] -ml-2"
          />

          <div className="flex flex-col overflow-y-scroll">
            <div className="flex items-top justify-center p-3 bg-[rgba(255,255,255,0.1)] mt-1.5 rounded w-full">
              <img
                className="pr-3 mb-1 max-h-[70px] border-r border-r-[rgb(8,13,28)]"
                src="./itau.svg"
              />

              <div className="flex flex-col flex-1 pl-2">
                <div className="flex justify-between border-b border-b-[rgb(8,13,28)] text-[12px] pb-2 text-[rgba(255,255,255,0.6)] mb-auto">
                  <span>Taxa: Grátis</span>
                  <span className="opacity-50">0-12 Horas</span>
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between text-[12px] text-[rgba(255,255,255,0.6)]">
                    <span>Min</span>
                    <span>Max</span>
                  </div>

                  <div className="flex justify-between text-[14px] text-[rgba(255,255,255)]">
                    <span>50 R$</span>
                    <span>10000 R$</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-top flex-col justify-center px-3 py-2.5 bg-[rgba(255,255,255,0.1)] mt-3 rounded w-full">
              <div className="flex justify-between border-b border-b-[rgb(8,13,28)] text-[14px] pb-2 text-[rgba(255,255,255,0.6)] mb-auto">
                <span>Montante de retirada</span>
                <span className="text-[rgb(170,127,0)]">
                  {(session.session.user.balance / 10000).toFixed(2)} R$
                </span>
              </div>

              <div className="flex justify-between border-b border-b-[rgb(8,13,28)] text-[14px] py-2 text-[rgba(255,255,255,0.6)] mb-auto">
                <span>Saldo</span>
                <span className="text-[rgb(16,145,33)]">
                  {(session.session.user.balance / 10000).toFixed(2)} R$
                </span>
              </div>

              <div className="flex justify-between text-[14px] text-[rgba(255,255,255,0.6)] pt-2 mb-auto">
                <span>Montante não jogado</span>
                <span className="text-[rgb(170,127,0)]">0.00 R$</span>
              </div>
            </div>

            <div class="relative mt-3">
              <input
                type="text"
                id="floating_filled"
                class="block rounded p-3 pt-5 w-full text-sm text-gray-900 bg-[rgba(255,255,255,0.15)] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_filled"
                class="absolute text-xs text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-3 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3"
              >
                Transfer Pix
              </label>
            </div>

            <div class="relative mt-3">
              <input
                onInput={(evt) => setWithdrawValue(evt.target.value)}
                type="text"
                id="floating_filled"
                class="block rounded p-3 pt-5 w-full text-sm text-gray-900 bg-[rgba(255,255,255,0.15)] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_filled"
                class="absolute text-xs text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-3 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3"
              >
                Valor
              </label>
            </div>

            <div className="flex flex-col mt-8">
              <button
                className="px-5 py-2.5 text-xs text-white text-[10px] font-medium bg-[linear-gradient(to_bottom,_#4A94FD,_#1074D0)] rounded disabled:text-[rgba(255,255,255,0.5)]"
                onClick={() => submitWithdraw()}
                disabled={withdrawValue == ""}
              >
                RETIRAR
              </button>

              <span className="text-[rgba(255,255,255,0.6)] text-[14px]">
                Para fazer uma retirada, por favor preencha todos os campos
                obrigatórios abaixo.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
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
