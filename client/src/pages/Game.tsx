import { useState } from "react";
import {
  Shield,
  ShoppingBag,
  LockKeyhole,
  Coins,
  Users,
  MessageCircle,
  Crown,
  X,
} from "lucide-react";
import { PlayerList, Chat, GoodCard } from "../components/GameUI";
import type { Snapshot, Act } from "../types/game";
import {
  goods,
  legal,
  goodLabel,
  phaseLabels,
  HAND_SIZE,
  MAX_EXCHANGE,
} from "../types/goods";
export function Game({
  snap,
  act,
  leave,
}: {
  snap: Snapshot;
  act: Act;
  leave: () => void;
}) {
  const r = snap.room,
    me = r.players.find((p) => p.id === snap.playerId)!,
    m = r.players.find((p) => p.id === r.currentMerchantId),
    s = r.players.find((p) => p.id === r.currentSheriffId);
  const [selection, setSelection] = useState<string[]>([]),
    [discardSelection, setDiscardSelection] = useState<string[]>([]),
    [drawing, setDrawing] = useState(false),
    [sealing, setSealing] = useState(false),
    [declaration, setDeclaration] = useState("Apple"),
    [bribe, setBribe] = useState(0),
    [tab, setTab] = useState("game");
  const turn = me.id === m?.id;
  const drawPhase = r.phase === "DRAW";
  const drawCount = HAND_SIZE - me.handCount + discardSelection.length;
  async function sealBag() {
    setSealing(true);
    try {
      const result = await act("seal_bag", { ids: selection });
      if (result?.ok) setTab("game");
    } finally {
      setSealing(false);
    }
  }
  async function drawCards() {
    setDrawing(true);
    try {
      const result = await act("draw_cards", { ids: discardSelection });
      if (result?.ok) setDiscardSelection([]);
    } finally {
      setDrawing(false);
    }
  }
  return (
    <main className="max-w-[1380px] mx-auto px-3 sm:px-5 py-4 sm:py-8 pb-[calc(6rem+env(safe-area-inset-bottom))]">
      <div className="flex flex-wrap justify-between gap-4 items-center mb-7">
        <div>
          <p className="eyebrow">{r.demo ? "โต๊ะฝึกเล่น" : r.id}</p>
          <h1 className="font-display text-2xl sm:text-3xl mt-1 break-words">
            {r.name}
          </h1>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-muted">
          <span>
            กองจั่ว {r.deckCount} ใบ · กองทิ้ง {r.discardCount} ใบ
          </span>
          <span>
            รอบที่{" "}
            <b className="text-ink">
              {r.round} / {r.maxRounds}
            </b>
          </span>
          <span className="flex gap-1">
            <Shield size={15} className="text-gold" />
            {s?.name}
          </span>
          <button onClick={leave}>ออกจากโต๊ะ</button>
        </div>
      </div>
      <div className="grid md:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_290px] gap-4 sm:gap-5">
        <aside className={`${tab !== "players" ? "hidden md:block" : ""}`}>
          <h2 className="eyebrow mb-4">ผู้เล่นในโต๊ะ</h2>
          <PlayerList snap={snap} />
          <div className="panel mt-5">
            <h3 className="font-display text-xl mb-3">เหตุการณ์ในตลาด</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {[...r.eventLog].reverse().map((e, i) => (
                <p
                  key={i}
                  className="text-[10px] leading-5 text-muted border-b border-[#eeeadd] pb-2"
                >
                  {e}
                </p>
              ))}
            </div>
          </div>
        </aside>
        <section className={`${tab === "players" ? "hidden md:block" : ""}`}>
          <div className="panel min-h-[320px] sm:min-h-[420px] text-center bg-[#eff0e5]">
            <div className="flex flex-wrap gap-2 justify-between items-center">
              <p className="eyebrow">ด่านตรวจของนายอำเภอ</p>
              <span className="text-[9px] text-muted rounded-full border border-[#cdd1bc] px-3 py-1">
                {phaseLabels[r.phase] ?? r.phase}
              </span>
            </div>
            <div className="flex justify-center mt-8">
              <div className="rounded-full border border-[#ccd2b9] bg-[#e4e8d5] p-5 text-forest">
                <Shield size={45} strokeWidth={1} />
              </div>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl leading-relaxed mt-4 break-words">
              {r.phase === "INSPECTION_RESULT"
                ? "ผลการตัดสินมาแล้ว"
                : turn
                  ? "ถุงของคุณ เรื่องเล่าของคุณ"
                  : `${m?.name} อยู่หน้าด่าน`}
            </h2>
            <p className="text-xs text-muted mt-3">
              {drawPhase
                ? turn
                  ? "เลือกทิ้งได้สูงสุด 3 ใบ แล้วจั่วเติมให้ครบ 8 ใบก่อนจัดถุง"
                  : "กำลังรอพ่อค้าจั่วการ์ด"
                : r.phase === "SELECT_GOODS"
                  ? turn
                    ? "เลือกสินค้าในมือ 1–5 ใบ แล้วปิดถุง"
                    : "รอพ่อค้าจัดถุงสินค้า"
                  : r.phase === "DECLARE"
                    ? "ถุงปิดแล้ว ถึงเวลาสำแดงสินค้า"
                    : r.phase === "BRIBE"
                      ? "สินบนเล็กน้อย อาจช่วยให้ผ่านด่าน"
                      : r.phase === "INSPECTION_RESULT"
                        ? "พ่อค้าคนถัดไปกำลังจะเข้าด่าน"
                        : "จะเชื่อพ่อค้า หรือเชื่อสัญชาตญาณตัวเอง?"}
            </p>
            {m?.declaredGoods && (
              <div className="inline-flex gap-3 items-center mt-5 py-3 px-5 rounded-lg bg-[#fffdf5] border border-[#dedbc9]">
                <ShoppingBag size={24} className="text-gold" />
                <div className="text-left">
                  <p className="font-display text-xl">
                    {goodLabel(m.declaredGoods)} {m.bagCount} ใบ
                  </p>
                  <p className="text-[10px] text-muted">
                    คำสำแดงของ {m.name} · สินบน {m.bribe} เหรียญ
                  </p>
                </div>
              </div>
            )}
            {drawPhase && (
              <div className="mt-6 rounded-xl border border-[#d5d6bf] bg-[#fffaf0] p-5">
                <div className="flex justify-center gap-5 text-xs text-muted mb-4">
                  <span>กองจั่ว {r.deckCount} ใบ</span>
                  <span>กองทิ้ง {r.discardCount} ใบ</span>
                </div>
                {turn ? (
                  <>
                    <p className="text-sm mb-4">
                      เลือกทิ้ง {discardSelection.length} / {MAX_EXCHANGE} ใบ ·
                      จะจั่ว {drawCount} ใบ
                    </p>
                    <button
                      className="btn-primary"
                      disabled={drawing}
                      onClick={drawCards}
                    >
                      {drawing
                        ? "กำลังจั่ว…"
                        : drawCount
                          ? `จั่ว ${drawCount} ใบ`
                          : "เก็บไพ่เดิม · ไปจัดถุง"}
                    </button>
                    <button
                      className="md:hidden block mx-auto mt-4 text-sm underline"
                      onClick={() => setTab("inventory")}
                    >
                      เปิดไพ่ในมือเพื่อเลือกทิ้ง
                    </button>
                  </>
                ) : (
                  <p className="text-sm">รอ {m?.name} เลือกการ์ด</p>
                )}
              </div>
            )}
            {turn && r.phase === "SELECT_GOODS" && (
              <div className="mt-8">
                <button
                  className="btn-secondary w-full mb-3 md:hidden"
                  onClick={() => setTab("inventory")}
                >
                  เลือกสินค้าในมือ · {selection.length} / 5 ใบ
                </button>
                <button
                  onClick={sealBag}
                  disabled={!selection.length || sealing}
                  className="btn-primary"
                >
                  <LockKeyhole size={16} />
                  ปิดถุง · {selection.length} / 5
                </button>
              </div>
            )}
            {turn && r.phase === "DECLARE" && (
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <select
                  aria-label="สำแดงสินค้า"
                  className="w-auto"
                  value={declaration}
                  onChange={(e) => setDeclaration(e.target.value)}
                >
                  {legal.map((g) => (
                    <option key={g} value={g}>
                      {goodLabel(g)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    act("declare_goods", {
                      good: declaration,
                      quantity: me.bagCount,
                    })
                  }
                  className="btn-primary"
                >
                  สำแดง {me.bagCount} ใบ
                </button>
              </div>
            )}
            {turn && r.phase === "BRIBE" && (
              <div className="mt-6 flex gap-3 justify-center">
                <input
                  aria-label="จำนวนสินบน"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={me.coins}
                  value={bribe}
                  onChange={(e) => setBribe(Number(e.target.value))}
                  className="w-24"
                />
                <button
                  className="btn-primary"
                  onClick={() => act("offer_bribe", { amount: bribe })}
                >
                  {bribe ? "เสนอสินบน" : "ไม่เสนอสินบน"}
                  <Coins size={16} />
                </button>
              </div>
            )}
            {me.id === s?.id && r.phase === "SHERIFF_DECISION" && (
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <button
                  className="btn-primary"
                  onClick={() => act("accept_bag")}
                >
                  ปล่อยสินค้า
                </button>
                <button
                  className="btn-secondary border-[#b98773] text-[#8f4435]"
                  onClick={() => act("inspect_bag")}
                >
                  ตรวจถุง
                </button>
                {!!m?.bribe && (
                  <>
                    <button
                      className="btn-secondary"
                      onClick={() => act("accept_bribe")}
                    >
                      รับสินบน {m.bribe} เหรียญ
                    </button>
                    <button
                      className="text-xs"
                      onClick={() => act("reject_bribe")}
                    >
                      ปฏิเสธสินบน
                    </button>
                  </>
                )}
              </div>
            )}
            {r.phase === "INSPECTION_RESULT" && (
              <>
                <p className="text-sm mt-5">{r.eventLog.at(-1)}</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {r.revealed.map((c, index) => (
                    <div
                      key={c.id}
                      className="motion-safe:animate-reveal w-36 sm:w-40"
                      style={{ animationDelay: `${index * 180}ms` }}
                    >
                      <GoodCard good={c} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="mt-5 panel">
            <h3 className="font-display text-2xl mb-2">แผงสินค้าของคุณ</h3>
            <p className="text-xs text-muted mb-4">
              สินค้าที่ผ่านด่านแล้ว สะสมความมั่งคั่งทีละถุง
            </p>
            <div className="flex flex-wrap gap-3">
              {goods.map((g) => {
                const n = [...me.merchantStand, ...me.contraband].filter(
                  (c) => c.name === g.name,
                ).length;
                return n ? (
                  <span
                    className="rounded-lg bg-cream border border-[#e3decf] px-3 py-2 text-sm"
                    key={g.name}
                  >
                    {g.icon} {g.label} × {n}
                  </span>
                ) : null;
              })}
              {!me.merchantStand.length && !me.contraband.length && (
                <span className="text-xs text-muted italic">
                  แผงยังว่าง รอสินค้าชุดแรกของคุณ
                </span>
              )}
            </div>
          </div>
        </section>
        {(tab === "inventory" || tab === "chat") && (
          <button
            onClick={() => setTab("game")}
            aria-label="ปิดแผง"
            className="md:hidden fixed inset-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-10 bg-ink/40 backdrop-blur-sm"
          />
        )}
        <aside
          aria-label={tab === "chat" ? "แผงแชต" : "แผงไพ่ในมือ"}
          className={`min-w-0 md:col-start-2 xl:col-start-auto ${tab === "inventory" || tab === "chat" ? "max-md:fixed max-md:inset-x-0 max-md:bottom-[calc(4rem+env(safe-area-inset-bottom))] max-md:z-20 max-md:max-h-[calc(100dvh-5rem-env(safe-area-inset-bottom))] max-md:overflow-y-auto max-md:overscroll-contain max-md:rounded-t-2xl max-md:bg-cream max-md:p-3 max-md:shadow-2xl" : ""}`}
        >
          {(tab === "inventory" || tab === "chat") && (
            <button
              className="md:hidden flex ml-auto mb-2 items-center gap-2 text-sm min-h-11 px-3"
              onClick={() => setTab("game")}
            >
              กลับกระดาน <X size={16} />
            </button>
          )}
          <div
            className={`panel ${tab !== "inventory" ? "hidden md:block" : ""}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">ไพ่ในมือ</h3>
              <span className="text-[9px] text-muted flex gap-1">
                <LockKeyhole size={11} />
                เห็นเฉพาะคุณ
              </span>
            </div>
            <p className="text-[10px] text-muted mt-1 mb-4">
              {snap.privatePlayer.hand.length} / {HAND_SIZE} ใบ ·{" "}
              {drawPhase ? "เลือกการ์ดที่จะทิ้ง" : "เลือกการ์ดใส่ถุง"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {snap.privatePlayer.hand.map((c) => (
                <GoodCard
                  good={c}
                  key={c.id}
                  selected={(drawPhase ? discardSelection : selection).includes(
                    c.id,
                  )}
                  onClick={
                    turn && drawPhase
                      ? () =>
                          setDiscardSelection((x) =>
                            x.includes(c.id)
                              ? x.filter((id) => id !== c.id)
                              : x.length < MAX_EXCHANGE
                                ? [...x, c.id]
                                : x,
                          )
                      : turn && r.phase === "SELECT_GOODS"
                        ? () =>
                            setSelection((x) =>
                              x.includes(c.id)
                                ? x.filter((id) => id !== c.id)
                                : x.length < 5
                                  ? [...x, c.id]
                                  : x,
                            )
                        : undefined
                  }
                />
              ))}
            </div>
            {!!snap.privatePlayer.bag.length && (
              <div className="mt-4 border-t border-[#ddd9c7] pt-3">
                <p className="eyebrow mb-2">ถุงที่ปิดแล้ว</p>
                <div className="flex gap-2 text-xl">
                  {snap.privatePlayer.bag.map((c) => (
                    <span key={c.id} title={goodLabel(c.name)}>
                      {c.image}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {tab === "inventory" &&
            turn &&
            (drawPhase || r.phase === "SELECT_GOODS") && (
              <div className="md:hidden sticky bottom-0 z-10 bg-cream border-t border-[#d8d9ca] p-3 -mx-3 -mb-3 shadow-lg">
                <p className="text-sm text-center mb-2" aria-live="polite">
                  {drawPhase
                    ? `เลือกทิ้ง ${discardSelection.length} / ${MAX_EXCHANGE} ใบ`
                    : `สินค้าในถุง ${selection.length} / 5 ใบ`}
                </p>
                <button
                  className="btn-primary w-full"
                  disabled={
                    drawing || sealing || (!drawPhase && !selection.length)
                  }
                  onClick={drawPhase ? drawCards : sealBag}
                >
                  {drawPhase
                    ? drawing
                      ? "กำลังจั่ว…"
                      : drawCount
                        ? `จั่ว ${drawCount} ใบ แล้วจัดถุง`
                        : "เก็บไพ่เดิม · ไปจัดถุง"
                    : sealing
                      ? "กำลังปิดถุง…"
                      : `ปิดถุง ${selection.length} ใบ`}
                </button>
              </div>
            )}
          <div className={`mt-5 ${tab !== "chat" ? "hidden md:block" : ""}`}>
            <Chat snap={snap} act={act} />
          </div>
        </aside>
      </div>
      <nav
        aria-label="เมนูเกมบนมือถือ"
        className="fixed bottom-0 inset-x-0 flex h-[calc(4rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-cream border-t border-[#d8d9ca] md:hidden z-30"
      >
        {[
          { id: "game", Icon: Shield },
          { id: "players", Icon: Users },
          { id: "inventory", Icon: ShoppingBag },
          { id: "chat", Icon: MessageCircle },
        ].map(({ id, Icon }) => (
          <button
            onClick={() => setTab(id)}
            aria-current={tab === id ? "page" : undefined}
            className={`flex flex-1 min-w-0 min-h-11 flex-col justify-center items-center gap-1 text-xs ${tab === id ? "text-forest bg-forest/5 font-semibold" : "text-muted"}`}
            key={id}
          >
            <Icon size={20} />
            {
              {
                game: "กระดาน",
                players: "ผู้เล่น",
                inventory: "ไพ่ในมือ",
                chat: "แชต",
              }[id]
            }
          </button>
        ))}
      </nav>
      {r.status === "finished" && (
        <div className="fixed inset-0 bg-[#192317]/70 backdrop-blur-sm z-40 flex items-center justify-center p-5">
          <div className="panel max-w-xl w-full text-center max-h-[90vh] overflow-auto">
            <Crown size={45} className="text-gold mx-auto mb-4" />
            <p className="eyebrow">พ่อค้าที่ร่ำรวยที่สุด</p>
            <h2 className="font-display text-4xl my-4">
              {r.players
                .filter(
                  (p) => p.score === Math.max(...r.players.map((p) => p.score)),
                )
                .map((p) => p.name)
                .join(" & ")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[360px] text-xs text-left my-6">
                <thead className="text-muted">
                  <tr>
                    <th className="p-2">พ่อค้า</th>
                    <th>เหรียญ</th>
                    <th>สินค้า</th>
                    <th>โบนัส</th>
                    <th>รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {[...r.players]
                    .sort((a, b) => b.score - a.score)
                    .map((p, i) => (
                      <tr className="border-t border-[#e3ddce]" key={p.id}>
                        <td className="p-3">
                          {i + 1}. {p.avatar} {p.name}
                        </td>
                        <td>{p.coins}</td>
                        <td>{p.score - p.coins - p.bonus}</td>
                        <td>{p.bonus}</td>
                        <td className="font-bold">{p.score}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {me.isHost ? (
              <button
                className="btn-primary"
                onClick={() => act("back_to_lobby")}
              >
                เล่นอีกครั้ง · กลับห้องพัก
              </button>
            ) : (
              <p className="text-xs text-muted">รอเจ้าของห้องพากลับห้องพัก</p>
            )}
            <button
              className="block mx-auto mt-5 text-xs text-muted"
              onClick={leave}
            >
              กลับหน้าแรก
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
