import { comparison } from "@/content/home";

/** SkillDen against the client's usual alternatives. The SkillDen column is highlighted. */
export default function Comparison() {
  const last = comparison.columns.length - 1;
  return (
    <section id="compare" className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Compare your options</p>
          <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl">
            The help you need, <span className="text-slate">minus the risk you don&apos;t.</span>
          </h2>
        </div>

        <div className="reveal mt-12 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">How SkillDen compares with hiring in the UK and using freelancers</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[28%] pb-4" />
                {comparison.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`px-5 pb-4 pt-5 text-sm font-bold ${i === last ? "rounded-t-2xl bg-navy text-white" : "text-slate"}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, r) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="py-4 pr-4 text-sm font-semibold text-navy">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`px-5 py-4 text-sm ${
                        i === last
                          ? `bg-navy font-bold text-white ${r === comparison.rows.length - 1 ? "rounded-b-2xl" : ""}`
                          : "text-slate"
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
