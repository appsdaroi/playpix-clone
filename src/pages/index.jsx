import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("id");
    Cookies.remove("user");
    Cookies.remove("money");
    router.push("/login");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({
    current: {
      id: "",
      user: "",
      money: "",
    },
  });

  useEffect(() => {
    setUser(() => {
      return {
        current: {
          id: Cookies.get("id"),
          user: Cookies.get("user"),
          money: Cookies.get("money"),
        },
      };
    });
  }, []);

  return (
    <div className="grid gap-2.5 mt-2">
      <div className="relative flex overflow-x-hidden">
        <div className="bg-[#109121] relative before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:bg-[radial-gradient(circle_at_-14%_113%,hsla(0,0%,100%,.3),hsla(0,0%,100%,0)_135%)] after:font-['BetConstruct-Icons'] after:content-[''] after:opacity-[0.1] after:top-[-5px] after:right-[-10px] after:absolute after:leading-none after:text-[68px] flex flex-col gap-2 rounded text-white p-4 overflow-hidden w-full max-w-[80%] mx-auto h-[120px]">
          <div className="flex justify-between -mt-1">
            <div className="grid">
              <span className="text-sm font-medium leading-none">
                Saldo principal
              </span>
              <span className="text-xl font-bold leading-1">
                {user.current.money} R$
              </span>
            </div>

            <div className="px-2 bg-[hsla(0,0%,100%,.1)] rounded h-fit">
              <i className="bc-icon text-white/60 before:content-['\e90c']" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-white text-sm font-medium text-center px-4 py-1.5 bg-[hsla(0,0%,100%,.25)] rounded">
              DEPOSITAR
            </div>
            <div className="text-white text-sm font-medium text-center px-4 bg-[hsla(0,0%,100%,.25)] rounded flex gap-px items-center justify-center">
              <i className="-ml-1 bc-icon !text-[18px] text-white before:content-['\e9ce']" />{" "}
              RETIRAR
            </div>
          </div>
        </div>

        <div className="bg-[#aa7f00] absolute before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:bg-[radial-gradient(circle_at_-14%_113%,hsla(0,0%,100%,.3),hsla(0,0%,100%,0)_135%)] after:font-['BetConstruct-Icons'] after:content-[''] after:opacity-[0.1] after:top-[-5px] after:right-[-10px] after:absolute after:leading-none after:text-[68px] flex flex-col gap-2 rounded text-white p-4 overflow-hidden w-full max-w-[80%] right-[-74%] scale-90 origin-left h-[120px]">
          <div className="flex justify-between -mt-1">
            <div className="grid">
              <span className="text-sm font-medium leading-none">
                Dinheiro de bônus total
              </span>
              <span className="text-xl font-bold leading-1">0.00 R$</span>
            </div>

            <div className="px-2 bg-[hsla(0,0%,100%,.1)] rounded h-fit">
              <i className="bc-icon text-white/60 before:content-['\e90c']" />
            </div>
          </div>

          <div className="border border-white/20"></div>
          <span className="text-xs">Saldo de bônus</span>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="bg-white/40 w-[32px] h-[32px] rounded-full flex items-center justify-center text-sm ml-2">
          {user.current.user[0]}
          {user.current.user.split(" ").length > 1 &&
            user.current.user.split(" ")[1][0]}
        </div>

        <div className="grid gap-px">
          <span className="text-xs text-white">{user.current.user}</span>
          <div className="flex">
            <span className="text-xs text-white/40">{user.current.id}</span>
            <i className="bc-icon text-white/60 before:content-['\e9fd'] !text-xs -ml-1" />
          </div>
        </div>

        <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
      </div>

      <div className="flex items-center gap-3 -mt-1">
        <i className="bc-icon text-[#4A94FD] before:content-['\e9fa'] !w-[21px] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-sm" />

        <span className="text-[14px] text-white ">Verificação</span>

        <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
      </div>

      <hr className="h-px mt-3 mb-1 border-white/50" />

      <AnimatePresence>
        {!menuOpen ? (
          <ul className="grid gap-px">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)] rounded-t"
            >
              <i className="bc-icon text-white before:content-['\e90b'] !w-6 !text-[18px] -mt-px" />

              <span className="text-white text-[15px]">
                Histórico de apostas
              </span>

              <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
            </button>

            <li className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)]">
              <i className="bc-icon text-white before:content-['\eaaf'] !w-6 !text-[18px] -mt-px" />

              <span className="text-white text-[15px]">
                Histórico do Construtor de Aposta
              </span>

              <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
            </li>

            <li className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)]">
              <i className="bc-icon text-white before:content-['\e92d'] !w-6 !text-[18px] -mt-px" />

              <span className="text-white text-[15px]">Gestão do saldo</span>

              <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
            </li>

            <li className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)]">
              <i className="bc-icon text-white before:content-['\e94f'] !w-6 !text-[18px] -mt-px" />

              <span className="text-white text-[15px]">Bônus</span>

              <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
            </li>

            <li className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)] rounded-b">
              <i className="bc-icon text-white before:content-['\e919'] !w-6 !text-[18px] -mt-px" />

              <span className="text-white text-[15px]">Meu Perfil</span>

              <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
            </li>
          </ul>
        ) : (
          <ul className="grid gap-px">
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-1 pl-3 rounded-t bg-white/5"
            >
              <i className="bc-icon text-white before:content-['\e314'] opacity-50 !w-6 !text-xs -mt-px !h-fit" />

              <span className="text-white text-[15px]">
                Histórico de apostas
              </span>
              <i className="bc-icon text-white/60 before:content-['\e315'] opacity-0 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
            </button>

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0" }}
              transition={{
                duration: .177,
                ease: "linear",
              }}
              className="grid gap-px"
            >
              <Link
                href="/balance"
                preserveState
                className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)]"
              >
                <i className="bc-icon text-white before:content-['\e9c3'] !w-6 !text-[18px] -mt-px" />

                <span className="text-white text-[15px]">Todos</span>

                <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
              </Link>

              <li className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)]">
                <i className="bc-icon text-white before:content-['\e9c2'] !w-6 !text-[18px] -mt-px" />

                <span className="text-white text-[15px]">Apostas abertas</span>

                <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
              </li>

              <li className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)]">
                <i className="bc-icon text-white before:content-['\e95f'] !w-6 !text-[18px] -mt-px" />

                <span className="text-white text-[15px]">Retirado</span>

                <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
              </li>

              <li className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)] rounded-b">
                <i className="bc-icon text-white before:content-['\e95e'] !w-6 !text-[18px] -mt-px" />

                <span className="text-white text-[15px]">Ganhou</span>

                <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
              </li>

              <li className="flex items-center gap-3 py-1 pl-3 bg-[rgba(255,255,255,0.15)] rounded-b">
                <i className="bc-icon text-white before:content-['\e95d'] !w-6 !text-[18px] -mt-px" />

                <span className="text-white text-[15px]">Perdido</span>

                <i className="bc-icon text-white/60 before:content-['\e315'] relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-xs ml-auto" />
              </li>
            </motion.div>
          </ul>
        )}
      </AnimatePresence>

      <button
        onClick={() => logout()}
        className="py-2.5 mt-1 text-xs text-white rounded bg-white/5"
      >
        SAIR
      </button>
    </div>
  );
}
