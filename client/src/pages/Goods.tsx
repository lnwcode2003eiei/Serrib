import { Shell } from "../components/Layout";
import { goods } from "../types/goods";
import { GoodsArtwork } from "../components/GoodsArtwork";
export function Goods() {
  return (
    <Shell eyebrow="รู้จักสินค้าของคุณ" title="การ์ดสินค้าในตลาด">
      <p className="text-muted mb-8">
        สินค้า 12 ชนิด รวม 216 ใบ เลือกค้าขายสุจริต
        หรือเสี่ยงกับสินค้าต้องห้ามที่มีมูลค่าสูงกว่า
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {goods.map((g) => (
          <div
            key={g.name}
            className="overflow-hidden rounded-xl border-2 border-[#dedbc9] bg-[#fbf8ed] text-center hover:-translate-y-1 transition-transform"
          >
            <GoodsArtwork good={g} />
          </div>
        ))}
      </div>
    </Shell>
  );
}
