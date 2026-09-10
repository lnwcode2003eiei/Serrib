# Sheriff — multiplayer board game

## เล่นบนมือถือ

รัน `npm run dev` บนคอมพิวเตอร์ แล้วเชื่อมมือถือกับ Wi-Fi เดียวกัน เปิด URL ที่ขึ้นว่า `Network` ในหน้าต่างเซิร์ฟเวอร์ (ไม่ใช้ `localhost` บนมือถือ) ให้คอมพิวเตอร์และเซิร์ฟเวอร์เปิดอยู่ระหว่างเล่น ที่อยู่ Network อาจเปลี่ยนเมื่อย้ายเครือข่าย ลิงก์นี้ใช้ภายในเครือข่ายเดียวกัน ยังไม่ใช่เว็บไซต์สาธารณะ

เมนูล่างสลับกระดาน ผู้เล่น ไพ่ในมือ และแชตได้ ในแผงไพ่สามารถเลือกทิ้งและกดจั่ว จากนั้นเลือกสินค้าและกดปิดถุงได้ทันที ปุ่มยืนยันติดด้านล่างของแผง พร้อมพื้นที่สำหรับขอบล่างหน้าจอ ช่องกรอกบนมือถือใช้ตัวอักษร 16px และรองรับการคัดลอกรหัสด้วยการเลือกข้อความเมื่อ Clipboard API ใช้ไม่ได้บน HTTP

## อัปเดตภาษาไทยและระบบจั่วการ์ด

หน้าจอ กติกา ชื่อสินค้า เหตุการณ์ และข้อความแจ้งเตือนเป็นภาษาไทย มีสินค้า 12 ชนิด รวม 216 ใบ (ถูกกฎหมาย 6 ชนิด / ต้องห้าม 6 ชนิด) เพิ่มปลา น้ำผึ้ง ชาลักลอบ และอัญมณี

เริ่มเกมด้วยไพ่ 8 ใบ ก่อนจัดถุงในแต่ละเทิร์นสามารถเลือกทิ้ง 0–3 ใบ แล้วกดจั่วเติมให้ครบ 8 ใบได้ครั้งเดียว ถ้าไม่ทิ้งและมีครบแล้ว กดเก็บไพ่เดิมเพื่อไปต่อ เซิร์ฟเวอร์ตรวจสิทธิ์และจำนวนการ์ด กองทิ้งจะถูกสับกลับเมื่อกองจั่วหมด โดยยังไม่รวมการ์ดที่เพิ่งทิ้งในคำสั่งเดียวกัน ผู้เล่นอื่นเห็นเฉพาะจำนวนในกอง ไม่เห็นหน้าไพ่หรือลำดับการ์ด

ข้อมูลสินค้าและกติกาการจั่วใช้ร่วมกันจาก `shared/goods.ts` เพื่อให้หน้าจอและเซิร์ฟเวอร์ตรงกัน

React + TypeScript + Vite + Tailwind, with an authoritative Express / Socket.IO server. All room state is in memory; restarting the server clears rooms. No database is required.

## Run

From this folder: `npm install`, then `npm run dev`. Open http://localhost:5173. The game server runs at http://localhost:3000.

Alternatively, use two terminals as requested:

```sh
cd client
npm install
npm run dev
```

```sh
cd server
npm install
npm run dev
```

Create a room, then join its code from other browser windows with different names. All players must mark Ready. The host starts with 3–6 players. Practice mode creates three server-controlled merchants and is disabled when NODE_ENV=production.

`npm run build` checks TypeScript and builds the frontend. `npm test` verifies game rules and privacy. With the server running, `node server/src/multiplayer.test.mjs` checks three real socket connections.

## Rules and sessions

Each player is Sheriff once, with every other player taking a merchant turn. Declare one legal good and the exact bag count. Inspection confiscates every undeclared good, including undeclared legal goods. Honest merchants receive compensation. Payments are capped at available coins. Each legal-goods majority earns 10 points, divided between ties and rounded down; final-score ties share victory.

Session credentials use a random secret in addition to the player ID. Per-tab session storage isolates players across tabs; local storage provides refresh/reopen recovery. Hands, bag contents, credentials, deck and private room passwords are excluded from other players’ snapshots. Server timers advance turns; clients cannot advance rounds themselves. If an active player disconnects, the table waits for their return. Empty inactive rooms expire after one hour.

## Deployment and extension

ขั้นตอนนำขึ้น Vercel + Render แบบละเอียดอยู่ใน [DEPLOYMENT.md](./DEPLOYMENT.md) พร้อมไฟล์ตั้งค่าโฮสต์และคำสั่ง `npm run build:server` / `npm start` สำหรับเซิร์ฟเวอร์ production

Set CLIENT_ORIGIN to comma-separated permitted browser origins. Set PORT for the server and VITE_SERVER_URL when the frontend connects directly instead of using the Vite proxy. Production hosting needs a long-running Node process with WebSocket support and a reverse proxy for `/socket.io`; a static frontend alone cannot host this multiplayer backend. Use HTTPS in production.

The GameManager owns the rules and in-memory room collection. A database-backed repository can replace the room collection for PostgreSQL/MySQL persistence. This version is designed for a single server process; horizontal scaling also needs shared room storage and a Socket.IO adapter.

The market illustration was generated for this project. Google Fonts are optional; local serif/sans-serif fallbacks are provided.

---
