import { Shell } from "../components/Layout";
import { goods } from "../types/goods";
export function Goods() {
  return (
    <Shell eyebrow="รู้จักสินค้าของคุณ" title="การ์ดสินค้า of the market.">
      <p className="text-muted mb-8">
        สินค้า 12 ชนิด รวม 216 ใบ เลือกค้าขายสุจริต
        หรือเสี่ยงกับสินค้าต้องห้ามที่มีมูลค่าสูงกว่า
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {goods.map((g) => (
          <div
            key={g.name}
            className="panel text-center hover:-translate-y-1 transition-transform"
          >
            <p
              className={`eyebrow ${g.type === "contraband" ? "text-[#9f493a]" : ""}`}
            >
              {g.type === "legal" ? "สินค้าถูกกฎหมาย" : "สินค้าต้องห้าม"}
            </p>
            <div className="text-6xl py-7">{g.icon}</div>
            <h2 className="font-display text-3xl">{g.label}</h2>
            <div className="flex justify-center gap-4 mt-5 text-xs text-muted">
              <span>
                มูลค่า <b className="text-gold">{g.value}</b>
              </span>
              <span>
                ค่าปรับ <b>{g.penalty}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
