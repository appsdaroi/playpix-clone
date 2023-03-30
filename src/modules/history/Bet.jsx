import moment from "moment";
import "moment/locale/pt-br";


const Bet = ({ props }) => {
  const { id, date, value, quotes } = props;
  moment.locale("pt-br");

  return (
    <div className="grid gap-3 px-3 py-2 rounded bg-white/10">
      <div className="flex items-center gap-2">
        <i className="bc-icon text-white/75 before:content-['\e967'] !w-min !text-[24px]" />

        <div className="grid">
          <span className="text-xs font-light text-white">Simples</span>
          <span className="text-white/75 text-[11px]">
            <span className="text-white/50">ID: </span>
            {id}
          </span>
        </div>

        <div className="grid ml-auto text-right">
          <span className="text-xs font-light text-green-500">RESOLVIDO</span>
          <span className="text-white/75 text-[11px]">
            {moment(date*1000).format("DD.MM.YYYY")}, {moment(date*1000).format("HH:MM")}
          </span>
        </div>
      </div>

      <hr className="h-px border-white/10" />

      <div className="flex items-center gap-2">
        <div className="grid gap-1">
          <span className="text-xs font-light text-white">Aposta...</span>
          <span className="text-xs font-light text-white">
            Cotações (Decimal)
          </span>
        </div>

        <div className="grid ml-auto text-right">
          <span className="text-white text-[11px]">{value} R$</span>
          <span className="text-green-500 text-[11px]">{quotes}</span>
        </div>
      </div>

      <hr className="h-px border-white/10" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-white">Ganho</span>
        <span className="font-medium text-white">
          {(value * parseFloat(quotes)).toFixed(2)} R$
        </span>
      </div>

      <hr className="h-px border-white/10" />

      <div className="flex items-center gap-3 pl-2 bg-[rgba(255,255,255,0.15)] rounded justify-between">
        <span className="text-[rgb(104,125,150)] text-xs font-medium">
          DETALHES DA APOSTA
        </span>

        <div className="flex items-center">
          <span className="text-xs font-light text-white">1</span>
          <i className="bc-icon text-white/70 before:content-['\e5cf'] !w-6 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-[11px]" />
        </div>
      </div>

      <hr className="h-px border-white/10" />

      <div className="flex pt-1.5 pb-3">
        <i className="bc-icon -ml-1 text-white/70 before:content-['\ea62'] !w-7 !h-min relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-[17px]" />
        <i className="bc-icon text-white/70 before:content-['\e928'] !w-7 !h-min relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-2 !text-[17px]" />
      </div>
    </div>
  );
};

export { Bet };
