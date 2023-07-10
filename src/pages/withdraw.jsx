import { useSession, getSession } from "next-auth/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import _ from "lodash";
import moment from "moment";

import { AnimatePresence, motion } from "framer-motion";
import { FetchWithToken } from "@/utils/fetch";
import { ReaisToCents } from "@/helpers/format";

import { Notify } from "@/modules/notifications";

export default function Balance({ session }) {
  const router = useRouter();
  const { update } = useSession();

  const [sideview, setSideview] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [withdrawValue, setWithdrawValue] = useState("");
  const [bankNotification, setBankNotification] = useState(false);

  const [balance, setBalance] = useState(session.session.user.balance);

  const getThisUserData = async () => {
    const thisUserData = await FetchWithToken({
      path: `playpix/${session.session.user.id}`,
      method: "GET",
    });

    setBalance(() => thisUserData.data.response.user.balance);

    if (thisUserData.data.response.user.balance != session.session.user.balance)
      update({ balance: thisUserData.data.response.user.balance });
  };

  const submitWithdraw = async () => {
    setSuccessAlert(true);

    setTimeout(() => {
      setBankNotification(true);
    }, 1000);

    // Add to bank extracts
    await FetchWithToken({
      path: `${session.session.user.bank}/${session.session.user.id}/extracts`,
      method: "POST",
      data: {
        value: ReaisToCents(withdrawValue),
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        type: "deposit",
        title: "PLAYPIX",
      },
    });

    const { data } = await FetchWithToken({
      path: `${session.session.user.bank}/${session.session.user.id}`,
      method: "GET",
    });

    const currentBankBalance = data.response.balance;

    await FetchWithToken({
      path: `${session.session.user.bank}/${session.session.user.id}`,
      method: "PUT",
      data: {
        balance: currentBankBalance + ReaisToCents(withdrawValue),
      },
    });

    FetchWithToken({
      path: `playpix/${session.session.user.id}`,
      method: "PUT",
      data: {
        balance: session.session.user.balance - ReaisToCents(withdrawValue),
      },
    }).then(() => setBalance((old) => old - ReaisToCents(withdrawValue)));
  };

  useEffect(() => {
    getThisUserData();
  }, []);

  return (
    <>
      <AnimatePresence>
        {bankNotification && (
          <Notify
            value={withdrawValue}
            bank={session?.session.user.bank}
            setNotificationVisible={setBankNotification}
          />
        )}
      </AnimatePresence>

      {successAlert && (
        <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen px-6 bg-black/20">
          <div className="bg-[#0a1125] leading-none w-full text-[rgba(255,255,255,0.6)] p-4 flex flex-col justify-center items-center rounded-lg relative">
            <img src="./success.svg" width={60} className="mt-4 mb-6" />

            <span>SUCESSO</span>
            <span>The inquiry is successfully sent</span>
            <button
              className="px-5 py-2.5 text-xs text-[rgba(255,255,255,0.6)] w-full text-[10px] font-medium bg-[rgba(255,255,255,0.2)] rounded mt-7"
              onClick={() => setSuccessAlert(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

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
            <img
              className="px-2 mb-1 max-h-[25px]"
              src="https://cmsbetconstruct.com/content/images/payments/custom/18750115/9812.png"
            />

            <hr className="w-full border-t border-t-[rgb(8,13,28)] my-2" />

            <span className="text-[rgba(255,255,255,0.6)] text-[12px] my-1">
              Zlinpay
            </span>
          </div>
        </div>
      </div>

      {sideview && (
        <>
          <div className="absolute left-0 top-0 flex px-2 flex-col h-full gap-px bg-[rgba(8,13,28,0.5)] w-full"></div>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ type: "Inertia" }}
            className="absolute left-0 top-0 flex px-2 flex-col h-full gap-px bg-[#080d1c] w-full"
          >
            <i
              onClick={() => setSideview(false)}
              className="bc-icon text-white before:content-['\e956'] -ml-2"
            />

            <div className="flex flex-col overflow-y-scroll">
              <div className="flex items-top justify-center p-3 bg-[rgba(255,255,255,0.1)] mt-1.5 rounded w-full">
                <div className="pr-3 mb-1 max-w-[90px] h-full flex justify-center items-center border-r border-r-[rgb(8,13,28)]">
                  <img
                    className="w-full h-max"
                    src="https://cmsbetconstruct.com/content/images/payments/custom/18750115/9812.png"
                  />
                </div>

                <div className="flex flex-col flex-1 pl-2">
                  <div className="flex justify-between border-b border-b-[rgb(8,13,28)] text-[12px] pb-2 text-[rgba(255,255,255,0.6)] mb-auto">
                    <span>Taxa: Grátis</span>
                    <span className="opacity-50">0-12 Horas</span>
                  </div>

                  <div className="flex flex-col pt-2">
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
                    {(balance / 10000).toFixed(2)} R$
                  </span>
                </div>

                <div className="flex justify-between border-b border-b-[rgb(8,13,28)] text-[14px] py-2 text-[rgba(255,255,255,0.6)] mb-auto">
                  <span>Saldo</span>
                  <span className="text-[rgb(16,145,33)]">
                    {(balance / 10000).toFixed(2)} R$
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
          </motion.div>
        </>
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
