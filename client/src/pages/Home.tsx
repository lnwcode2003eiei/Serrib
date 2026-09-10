import { Link } from "react-router-dom";
import {
  ArrowRight,
  Plus,
  DoorOpen,
  Users,
  Globe2,
  ShoppingBag,
  Swords,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Footer } from "../components/Layout";
export function Home({ demo, busy }: { demo: () => void; busy: boolean }) {
  return (
    <>
      <section className="relative min-h-[560px] overflow-hidden border-b border-[#ddd8c5]">
        <div
          className="absolute inset-0 left-[27%] bg-cover bg-center"
          style={{ backgroundImage: "url(/market.png)" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f8f5ed_0%,#f8f5ed_25%,#f8f5edee_35%,#f8f5ed80_48%,transparent_64%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#f8f5ed_0%,transparent_17%)]" />
        <div className="max-w-[1240px] mx-auto px-7 pt-16 pb-14 relative">
          <div className="flex items-center gap-3 eyebrow">
            <span className="w-7 h-px bg-gold" /> เกมเจรจาและบลัฟ
            เล่นพร้อมกันกับเพื่อน
          </div>
          <h1 className="font-display font-semibold text-[52px] sm:text-[64px] leading-[1.35] tracking-[-.025em] mt-6 mb-6">
            คุณจะ
            <br />
            เชื่อ<span className="text-forest italic">ใคร?</span>
          </h1>
          <p className="text-sm leading-7 text-[#73766b] max-w-[340px]">
            ขนสินค้า บลัฟนายอำเภอ
            <br />
            แล้วก้าวเป็นพ่อค้าที่ร่ำรวยที่สุดในเมือง
          </p>
          <div className="flex gap-3 mt-7 flex-wrap">
            <Link to="/create" className="btn-primary">
              <Plus size={17} />
              สร้างห้อง
            </Link>
            <Link to="/join" className="btn-secondary">
              <DoorOpen size={17} />
              เข้าร่วมห้อง
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-7 text-xs font-medium text-[#666f60]">
            <span className="flex items-center gap-1.5">
              <Users size={13} />
              ผู้เล่น 3–6 คน
            </span>
            <span className="w-1 h-1 rounded-full bg-[#b9b9a6]" />
            <span className="flex items-center gap-1.5">
              <Globe2 size={13} />
              เล่นผ่านเบราว์เซอร์
            </span>
            <span className="w-1 h-1 rounded-full bg-[#b9b9a6]" />
            <span>ไม่ต้องดาวน์โหลด</span>
          </div>
        </div>
        <div className="absolute hidden lg:flex right-[7%] bottom-11 items-center gap-3 bg-[#fff8e8]/95 p-3.5 pr-5 border border-white/70 rounded-lg shadow-xl -rotate-3">
          <div className="bg-[#e9e8ce] rounded-full p-2.5 text-forest">
            <ShoppingBag size={21} />
          </div>
          <div>
            <p className="font-display italic font-bold text-lg">
              “มีแต่แอปเปิลครับ นายอำเภอ”
            </p>
            <p className="text-[9px] text-muted tracking-wider">
              คำพูดคุ้นหู… แต่จริงหรือเปล่า?
            </p>
          </div>
        </div>
      </section>
      <div className="px-7 max-w-[1240px] mx-auto">
        <section className="py-9 flex flex-col sm:flex-row gap-5 justify-between items-center border-b border-[#ddded0]">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-[#eeeddf] p-3 text-gold">
              <Swords size={22} strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="font-display font-semibold text-2xl">
                เพื่อนสนิท… คิดอะไรอยู่กันแน่
              </h2>
              <p className="text-xs text-muted mt-1">
                ชวนเพื่อนมาล้อมวง ทุกถุงมีเรื่องเล่า
                แต่ไม่ใช่ทุกเรื่องจะเป็นความจริง
              </p>
            </div>
          </div>
          <Link
            to="/how-to-play"
            className="flex gap-2 items-center text-xs font-semibold"
          >
            เรียนรู้วิธีเล่น <ArrowRight size={16} />
          </Link>
        </section>
        <section className="grid lg:grid-cols-[1fr_340px] gap-11 py-10">
          <div>
            <div className="eyebrow mb-3">ยินดีต้อนรับสู่ตลาด</div>
            <h2 className="font-display text-[35px] font-semibold leading-none">
              ค้าขายสุจริต{" "}
              <span className="italic text-[#6d795d]">หรือโกหกให้แนบเนียน</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 mt-7">
              {[
                {
                  Icon: ShoppingBag,
                  title: "จัดถุงสินค้า",
                  desc: "จั่วการ์ด เลือกสินค้า แล้วปิดถุง จะขนของดีหรือแอบซ่อนของต้องห้าม?",
                  num: "01",
                },
                {
                  Icon: MessageCircle,
                  title: "เล่าเรื่องให้คนเชื่อ",
                  desc: "สำแดงสินค้า ต่อรองสินบน แล้วเก็บสีหน้าให้มิดชิด",
                  num: "02",
                },
                {
                  Icon: ShieldCheck,
                  title: "เผชิญหน้านายอำเภอ",
                  desc: "เขาจะเชื่อคำพูดหรือขอเปิดถุง? วางแผนให้คุ้มทุกเหรียญ",
                  num: "03",
                },
              ].map(({ Icon, title, desc, num }) => (
                <div key={num}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-11 h-11 flex items-center justify-center rounded-lg border border-[#d9dccb] bg-[#eeefe3] text-forest">
                      <Icon size={21} strokeWidth={1.5} />
                    </span>
                    <span className="font-display text-2xl text-[#c6c6b7]">
                      {num}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {title}
                  </h3>
                  <p className="text-[11px] leading-[1.9] text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-xl border border-[#dcdcc8] bg-[#eeeee1] p-6 relative overflow-hidden">
            <Sparkles
              className="absolute right-5 top-5 text-[#b3b796]"
              size={21}
            />
            <div className="eyebrow text-[#7f8967]">พ่อค้ามือใหม่?</div>
            <h3 className="font-display text-[28px] font-semibold mt-3 leading-tight">
              มาลองบลัฟกันก่อน
            </h3>
            <p className="text-xs leading-6 text-muted mt-2 mb-5">
              ลองเล่นกับพ่อค้าจำลอง 3 คน
              <br className="hidden xl:block" /> ฝึกได้ทันที ไม่ต้องรอเพื่อน
            </p>
            <button
              disabled={busy}
              onClick={demo}
              className="w-full btn-secondary border-[#c3c9ad] py-3 text-xs bg-[#f7f7ee]"
            >
              {busy ? "กำลังจัดโต๊ะ…" : "ลองเกมฝึกเล่น"}
              <ArrowRight size={15} />
            </button>
            <p className="text-[9px] text-center text-muted mt-3 flex items-center justify-center gap-1.5">
              <span className="w-1 h-1 bg-[#82916b] rounded-full" />{" "}
              ซ้อมสักหน่อย ก่อนลงสนามจริง
            </p>
          </aside>
        </section>
        <Footer />
      </div>
    </>
  );
}
