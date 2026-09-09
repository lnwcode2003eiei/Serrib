import { useGame } from "./hooks/useGame";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Navbar, Shell } from "./components/Layout";
import { Home } from "./pages/Home";
import { RoomForm } from "./pages/RoomForm";
import { Rules } from "./pages/HowToPlay";
import { Goods } from "./pages/Goods";
import { Lobby } from "./pages/Lobby";
import { Game } from "./pages/Game";
export default function App() {
  const { snap, connected, busy, toast, setToast, act, leave, roomRoute } =
    useGame();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {snap && !connected && (
        <div className="bg-[#eae1c7] text-center text-xs py-2">
          กำลังเชื่อมต่อใหม่… เราเก็บที่นั่งไว้ให้คุณ
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              busy={busy}
              demo={async () => {
                if (snap) {
                  navigate(roomRoute);
                  return;
                }
                const r = await act("create_room", {
                  playerName: "คุณ",
                  roomName: "โต๊ะฝึกเล่น",
                  maxPlayers: 4,
                  isPrivate: false,
                  demo: true,
                });
                if (r.ok) {
                  await act("player_ready");
                  await act("start_game");
                }
              }}
            />
          }
        />
        <Route
          path="/create"
          element={
            snap ? (
              <Lobby snap={snap} act={act} leave={leave} />
            ) : (
              <RoomForm act={act} busy={busy} />
            )
          }
        />
        <Route
          path="/join"
          element={
            snap ? (
              <Lobby snap={snap} act={act} leave={leave} />
            ) : (
              <RoomForm join act={act} busy={busy} />
            )
          }
        />
        <Route path="/how-to-play" element={<Rules />} />
        <Route path="/goods" element={<Goods />} />
        <Route
          path="/lobby/:id"
          element={
            snap ? (
              <Lobby snap={snap} act={act} leave={leave} />
            ) : (
              <Shell eyebrow="โต๊ะของคุณ" title="กำลังเชื่อมต่อกับตลาด…">
                <Link to="/join" className="btn-primary">
                  เข้าร่วมห้อง
                </Link>
              </Shell>
            )
          }
        />
        <Route
          path="/game/:id"
          element={
            snap ? (
              <Game
                key={snap.room.round + snap.room.currentMerchantId}
                snap={snap}
                act={act}
                leave={leave}
              />
            ) : (
              <Shell eyebrow="โต๊ะของคุณ" title="กำลังคืนที่นั่งของคุณ…">
                <Link to="/join" className="btn-primary">
                  เข้าร่วมห้อง
                </Link>
              </Shell>
            )
          }
        />
        <Route
          path="*"
          element={
            <Shell eyebrow="มาผิดทางแล้ว" title="ไม่พบหน้านี้">
              <Link to="/" className="btn-primary">
                กลับหน้าตลาด
              </Link>
            </Shell>
          }
        />
      </Routes>
      {toast && (
        <div
          role="status"
          className="fixed bottom-7 left-1/2 -translate-x-1/2 bg-forest text-white shadow-xl rounded-lg py-4 px-5 flex items-center gap-5 z-50 text-sm max-w-[90vw]"
        >
          {toast}
          <button onClick={() => setToast("")} aria-label="ปิดการแจ้งเตือน">
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
