import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { randomBetweenRange } from "@/helpers/random";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState("");

  const loginUser = () => {
    Cookies.set("id", randomBetweenRange(1000000000, 9999999999));
    Cookies.set("user", user);
    Cookies.set("money", balance);
    router.push("/");
  };

  return (
    <div className="grid gap-3 mt-10 text-white">
      Usuário
      <input
        value={user || ""}
        onChange={(evt) => setUser(evt.target.value)}
        placeholder="ex. José Silva"
        className="p-3 bg-transparent border rounded border-white/20"
        type="text"
        name=""
        id=""
      />
      Saldo
      <input
        value={balance || ""}
        onChange={(evt) => {
          const re = /^[0-9\b]+$/;
          if (evt.target.value === "" || re.test(evt.target.value)) {
            setBalance(evt.target.value);
          }
        }}
        placeholder="ex. 110000"
        className="p-3 bg-transparent border rounded border-white/20"
        type="text"
        name=""
        id=""
      />
      <button
        className="w-full p-3 bg-green-600 rounded"
        onClick={() => loginUser()}
      >
        Entrar
      </button>
    </div>
  );
}
