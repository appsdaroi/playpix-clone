import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-[#080d1c] h-[60px] border-b border-b-[rgba(255,255,255,0.05)] pt-8 pb-[2.1rem]">
        <div className="flex flex-row items-center justify-between h-full px-2">
          <div className="grid grid-cols-2 gap-3">
            <img
              height={30}
              width={30}
              src="https://cmsbetconstruct.com/storage/medias/playpix-18750115/media_18750115_35ac8fad1b1ffd83aea3a4fe1ef100eb.png?v=03/16/2023-10:42"
            />
            <img
              height={22}
              width={22}
              src="https://cmsbetconstruct.com/storage/medias/playpix-18750115/media_18750115_6d2ac0301b0e48918f318b1f62f45923.gif"
            />
          </div>

          <i className="bc-icon text-white/60 before:content-['\e5cd'] before:text-[14px] -mt-2 -mr-1"/>
        </div>
      </nav>

      <main className={`${montserrat.className} flex-1 bg-[#080d1c] px-2 h-full`}>{children}</main>
    </div>
  );
};

export { Layout };
