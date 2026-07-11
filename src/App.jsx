import { useState } from "react";

const NAVY = "#16314f";
const ORANGE = "#e8862a";
const BG = "#f7f8fa";
const WHITE = "#ffffff";
const LIGHT = "#eef1f5";
const MUTED = "#8a96a8";

const defaultTeams = ["チームA", "チームB", "チームC", "チームD", "チームE"];

const defaultMatches = [
{ id: 1, date: "2025-10-04", time: "10:00", court: "コート1", home: "チームA", away: "チームB", homeScore: "", awayScore: "", status: "scheduled" },
{ id: 2, date: "2025-10-04", time: "11:30", court: "コート2", home: "チームC", away: "チームD", homeScore: "", awayScore: "", status: "scheduled" },
{ id: 3, date: "2025-10-04", time: "13:00", court: "コート1", home: "チームE", away: "チームA", homeScore: "", awayScore: "", status: "scheduled" },
];

function KakehashiLogo({ size = 32 }) {
const s = size / 110;
return (
<svg width={size} height={size} viewBox="-55 -55 110 110">
<g fill="none" strokeLinecap="round">
<path d="M -20,-70 C -60,-40 -20,-30 0,-15" stroke={ORANGE} strokeWidth={3/s*0.7}/>
<path d="M 55,-45 C 50,-80 20,-55 0,-15" stroke={ORANGE} strokeWidth={2.8/s*0.7}/>
<path d="M 70,10 C 80,-45 35,-15 0,-15" stroke={ORANGE} strokeWidth={2.6/s*0.7}/>
<path d="M 45,65 C 80,15 30,5 0,-15" stroke={NAVY} strokeWidth={2.6/s*0.7}/>
<path d="M -10,75 C 40,55 15,5 0,-15" stroke={NAVY} strokeWidth={2.4/s*0.7}/>
<path d="M -60,55 C -15,55 -12,5 0,-15" stroke={NAVY} strokeWidth={2.2/s*0.7}/>
<path d="M -75,5 C -65,45 -28,2 0,-15" stroke={NAVY} strokeWidth={2.6/s*0.7}/>
<path d="M -60,-45 C -75,-5 -30,-20 0,-15" stroke={ORANGE} strokeWidth={2.2/s*0.7}/>
<path d="M 15,-75 C 15,-50 8,-38 0,-15" stroke={ORANGE} strokeWidth={1.8/s*0.7}/>
</g>
<g fill={NAVY}>
<circle cx="-20" cy="-70" r={4/s*0.7}/>
<circle cx="55" cy="-45" r={4/s*0.7}/>
<circle cx="70" cy="10" r={4/s*0.7}/>
<circle cx="45" cy="65" r={4/s*0.7}/>
<circle cx="-10" cy="75" r={4/s*0.7}/>
<circle cx="-60" cy="55" r={4/s*0.7}/>
<circle cx="-75" cy="5" r={4/s*0.7}/>
<circle cx="-60" cy="-45" r={4/s*0.7}/>
<circle cx="15" cy="-75" r={4/s*0.7}/>
</g>
<circle cx="0" cy="-15" r={5/s*0.7} fill={NAVY}/>
</svg>
);
}

function StatusBadge({ status }) {
const map = {
scheduled: { label: "予定", bg: LIGHT, color: MUTED },
live: { label: "試合中", bg: "#fff3e0", color: ORANGE },
done: { label: "終了", bg: "#e8f5e9", color: "#388e3c" },
};
const s = map[status] || map.scheduled;
return (
<span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: s.bg, color: s.color, letterSpacing: 1 }}>
{s.label}
</span>
);
}

function MatchRow({ match, teams, onSave, onDelete }) {
const [editing, setEditing] = useState(false);
const [form, setForm] = useState(match);

const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

const save = () => { onSave(form); setEditing(false); };

if (editing) {
return (
<tr style={{ background: "#fffdf9", borderBottom: `1px solid ${LIGHT}` }}>
<td style={td}><input style={input} type="date" value={form.date} onChange={e => set("date", e.target.value)}/></td>
<td style={td}><input style={{...input, width: 70}} type="time" value={form.time} onChange={e => set("time", e.target.value)}/></td>
<td style={td}><input style={{...input, width: 90}} value={form.court} onChange={e => set("court", e.target.value)}/></td>
<td style={{...td, textAlign:"right"}}>
<select style={sel} value={form.home} onChange={e => set("home", e.target.value)}>
{teams.map(t => <option key={t}>{t}</option>)}
</select>
</td>
<td style={{...td, textAlign:"center"}}>
<span style={{ display:"flex", alignItems:"center", gap:4, justifyContent:"center" }}>
<input style={{...input, width:40, textAlign:"center"}} value={form.homeScore} onChange={e => set("homeScore", e.target.value)} placeholder="—"/>
<span style={{ color: MUTED, fontWeight:700 }}>:</span>
<input style={{...input, width:40, textAlign:"center"}} value={form.awayScore} onChange={e => set("awayScore", e.target.value)} placeholder="—"/>
</span>
</td>
<td style={td}>
<select style={sel} value={form.away} onChange={e => set("away", e.target.value)}>
{teams.map(t => <option key={t}>{t}</option>)}
</select>
</td>
<td style={td}>
<select style={sel} value={form.status} onChange={e => set("status", e.target.value)}>
<option value="scheduled">予定</option>
<option value="live">試合中</option>
<option value="done">終了</option>
</select>
</td>
<td style={td}>
<button style={btn(ORANGE)} onClick={save}>保存</button>
<button style={{...btn(LIGHT), color:MUTED, marginLeft:4}} onClick={() => setEditing(false)}>取消</button>
<button style={{...btn("#fdecea"), color:"#e53935", marginLeft:4}} onClick={() => { if(window.confirm("この試合を削除しますか？")) onDelete(match.id); }}>削除</button>
</td>
</tr>
);
}

const hasScore = form.homeScore !== "" && form.awayScore !== "";
const homeWin = hasScore && Number(form.homeScore) > Number(form.awayScore);
const awayWin = hasScore && Number(form.awayScore) > Number(form.homeScore);

return (
<tr style={{ borderBottom: `1px solid ${LIGHT}`, transition:"background .15s" }}
onMouseEnter={e => e.currentTarget.style.background = "#f0f4f8"}
onMouseLeave={e => e.currentTarget.style.background = ""}
>
<td style={td}>
<span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>
{form.date ? form.date.replace(/-/g, ".") : "—"}
</span>
</td>
<td style={td}><span style={{ fontSize: 13, color: MUTED }}>{form.time || "—"}</span></td>
<td style={td}>
<span style={{ fontSize: 12, background: LIGHT, color: NAVY, padding:"2px 8px", borderRadius:4, fontWeight:600 }}>
{form.court || "—"}
</span>
</td>
<td style={{...td, textAlign:"right"}}>
<span style={{ fontWeight: homeWin ? 800 : 500, color: homeWin ? NAVY : "#555", fontSize:14 }}>{form.home}</span>
</td>
<td style={{...td, textAlign:"center", minWidth:90}}>
{hasScore ? (
<span style={{ fontFamily:"monospace", fontSize:18, fontWeight:800, color: NAVY, letterSpacing:2 }}>
<span style={{ color: homeWin ? ORANGE : NAVY }}>{form.homeScore}</span>
<span style={{ color: MUTED, margin:"0 4px" }}>:</span>
<span style={{ color: awayWin ? ORANGE : NAVY }}>{form.awayScore}</span>
</span>
) : (
<span style={{ color: MUTED, fontSize:13, letterSpacing:2 }}>VS</span>
)}
</td>
<td style={td}>
<span style={{ fontWeight: awayWin ? 800 : 500, color: awayWin ? NAVY : "#555", fontSize:14 }}>{form.away}</span>
</td>
<td style={td}><StatusBadge status={form.status}/></td>
<td style={td}>
<button style={btn(LIGHT)} onClick={() => setEditing(true)}>
<span style={{ color: NAVY, fontSize:12, fontWeight:600 }}>編集</span>
</button>
</td>
</tr>
);
}

function Standings({ matches, teams }) {
const table = {};
teams.forEach(t => { table[t] = { w:0, l:0, d:0, pf:0, pa:0 }; });

matches.filter(m => m.status === "done" && m.homeScore !== "" && m.awayScore !== "").forEach(m => {
const hs = Number(m.homeScore), as = Number(m.awayScore);
if (!table[m.home]) table[m.home] = { w:0,l:0,d:0,pf:0,pa:0 };
if (!table[m.away]) table[m.away] = { w:0,l:0,d:0,pf:0,pa:0 };
table[m.home].pf += hs; table[m.home].pa += as;
table[m.away].pf += as; table[m.away].pa += hs;
if (hs > as) { table[m.home].w++; table[m.away].l++; }
else if (as > hs) { table[m.away].w++; table[m.home].l++; }
else { table[m.home].d++; table[m.away].d++; }
});

const rows = Object.entries(table)
.map(([name, s]) => ({ name, ...s, pts: s.w*2 + s.d, diff: s.pf - s.pa }))
.sort((a,b) => b.pts - a.pts || b.diff - a.diff);

return (
<div style={{ marginTop:32 }}>
<h3 style={{ fontSize:13, letterSpacing:3, color:MUTED, fontWeight:700, marginBottom:12, textTransform:"uppercase" }}>順位表</h3>
<table style={{ width:"100%", borderCollapse:"collapse" }}>
<thead>
<tr style={{ borderBottom:`2px solid ${NAVY}` }}>
{["順位","チーム","勝","負","分","得点","失点","得失","勝点"].map(h => (
<th key={h} style={{ ...th, color: NAVY }}>{h}</th>
))}
</tr>
</thead>
<tbody>
{rows.map((r, i) => (
<tr key={r.name} style={{ borderBottom:`1px solid ${LIGHT}`, background: i===0 ? "#fffbf5" : "" }}>
<td style={{...th, color: i===0 ? ORANGE : MUTED, fontWeight:800, fontSize:16}}>{i+1}</td>
<td style={{...th, textAlign:"left", fontWeight: i===0 ? 800:600, color:NAVY}}>{r.name}</td>
<td style={th}>{r.w}</td>
<td style={th}>{r.l}</td>
<td style={th}>{r.d}</td>
<td style={th}>{r.pf}</td>
<td style={th}>{r.pa}</td>
<td style={{...th, color: r.diff>0?ORANGE:r.diff<0?"#e53935":MUTED, fontWeight:700}}>
{r.diff > 0 ? `+${r.diff}` : r.diff}
</td>
<td style={{...th, fontWeight:800, fontSize:16, color: i===0?ORANGE:NAVY}}>{r.pts}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}

// ── スタイル定数 ──
const td = { padding:"12px 10px", fontSize:13, verticalAlign:"middle" };
const th = { padding:"10px 10px", fontSize:13, textAlign:"center", color:"#555" };
const input = { border:`1px solid ${LIGHT}`, borderRadius:4, padding:"4px 8px", fontSize:13, outline:"none", width:120, color:NAVY };
const sel = { border:`1px solid ${LIGHT}`, borderRadius:4, padding:"4px 6px", fontSize:13, color:NAVY, background:WHITE };
const btn = (bg) => ({ background:bg, border:"none", borderRadius:6, padding:"5px 12px", cursor:"pointer", fontWeight:600, fontSize:12 });

export default function App() {
const [matches, setMatches] = useState(defaultMatches);
const [teams, setTeams] = useState(defaultTeams);
const [newTeam, setNewTeam] = useState("");
const [tab, setTab] = useState("schedule");
const [filter, setFilter] = useState("all");

const updateMatch = (updated) => {
setMatches(ms => ms.map(m => m.id === updated.id ? updated : m));
};

const addMatch = () => {
const id = Math.max(0, ...matches.map(m => m.id)) + 1;
setMatches(ms => [...ms, { id, date:"", time:"", court:"コート1", home: teams[0]||"", away: teams[1]||"", homeScore:"", awayScore:"", status:"scheduled" }]);
};

const deleteMatch = (id) => setMatches(ms => ms.filter(m => m.id !== id));

const addTeam = () => {
if (newTeam && !teams.includes(newTeam)) { setTeams(t => [...t, newTeam]); setNewTeam(""); }
};

const filtered = filter === "all" ? matches : matches.filter(m => m.status === filter);

const grouped = filtered.reduce((acc, m) => {
const key = m.date || "日付未定";
if (!acc[key]) acc[key] = [];
acc[key].push(m);
return acc;
}, {});

return (
<div style={{ minHeight:"100vh", background:BG, fontFamily:"'Helvetica Neue',Arial,'Hiragino Sans',sans-serif" }}>
{/* ヘッダー */}
<div style={{ background:NAVY, padding:"20px 32px", display:"flex", alignItems:"center", gap:16 }}>
<KakehashiLogo size={44}/>
<div>
<div style={{ color:WHITE, fontSize:20, fontWeight:800, letterSpacing:3 }}>KAKEHASHI PROJECT</div>
<div style={{ color:ORANGE, fontSize:11, letterSpacing:4, marginTop:2 }}>BASKETBALL LEAGUE</div>
</div>
<div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
{["schedule","standings"].map(t => (
<button key={t} onClick={() => setTab(t)} style={{
background: tab===t ? ORANGE : "rgba(255,255,255,.1)",
color: WHITE, border:"none", borderRadius:6,
padding:"7px 18px", fontWeight:700, fontSize:12,
letterSpacing:1, cursor:"pointer"
}}>
{t === "schedule" ? "試合日程" : "順位表"}
</button>
))}
</div>
</div>

<div style={{ maxWidth:1000, margin:"0 auto", padding:"28px 24px" }}>
{tab === "schedule" ? (
<>
{/* フィルター + チーム管理 */}
<div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
<div style={{ display:"flex", gap:8 }}>
{[["all","すべて"],["scheduled","予定"],["live","試合中"],["done","終了"]].map(([v,l]) => (
<button key={v} onClick={() => setFilter(v)} style={{
background: filter===v ? NAVY : WHITE,
color: filter===v ? WHITE : MUTED,
border:`1px solid ${filter===v ? NAVY : LIGHT}`,
borderRadius:20, padding:"5px 14px", fontSize:12, fontWeight:600, cursor:"pointer"
}}>{l}</button>
))}
</div>
<div style={{ display:"flex", gap:8, alignItems:"center" }}>
<input style={{...input, width:110}} placeholder="チーム名を追加" value={newTeam} onChange={e => setNewTeam(e.target.value)}
onKeyDown={e => e.key==="Enter" && addTeam()}/>
<button style={{...btn(NAVY), color:WHITE, fontSize:12}} onClick={addTeam}>+ チーム追加</button>
</div>
</div>

{/* チームタグ */}
<div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
{teams.map(t => (
<span key={t} style={{ background:WHITE, border:`1px solid ${LIGHT}`, borderRadius:20, padding:"3px 12px", fontSize:12, color:NAVY, fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
{t}
<span onClick={() => setTeams(ts => ts.filter(x => x!==t))} style={{ cursor:"pointer", color:MUTED, fontSize:10 }}>✕</span>
</span>
))}
</div>

{/* 試合テーブル */}
{Object.entries(grouped).sort(([a],[b])=>a.localeCompare(b)).map(([date, ms]) => (
<div key={date} style={{ marginBottom:28 }}>
<div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
<div style={{ width:4, height:18, background:ORANGE, borderRadius:2 }}/>
<span style={{ fontSize:13, fontWeight:800, color:NAVY, letterSpacing:2 }}>
{date === "日付未定" ? date : date.replace(/-/g,".")}
</span>
</div>
<div style={{ background:WHITE, borderRadius:10, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,.06)" }}>
<table style={{ width:"100%", borderCollapse:"collapse" }}>
<thead>
<tr style={{ background:LIGHT, borderBottom:`1px solid #dde3ea` }}>
{["日付","時間","コート","ホーム","スコア","アウェイ","状態",""].map(h => (
<th key={h} style={{ ...td, fontSize:11, fontWeight:700, color:MUTED, letterSpacing:1, textAlign: h==="ホーム"?"right":h==="アウェイ"?"left":"center" }}>{h}</th>
))}
</tr>
</thead>
<tbody>
{ms.map(m => (
<MatchRow key={m.id} match={m} teams={teams} onSave={updateMatch} onDelete={deleteMatch}/>
))}
</tbody>
</table>
</div>
</div>
))}

<button onClick={addMatch} style={{ marginTop:8, background:WHITE, border:`2px dashed ${LIGHT}`, borderRadius:10, width:"100%", padding:"14px", color:MUTED, fontWeight:700, fontSize:13, cursor:"pointer", letterSpacing:1 }}>
+ 試合を追加
</button>
</>
) : (
<div style={{ background:WHITE, borderRadius:10, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,.06)" }}>
<Standings matches={matches} teams={teams}/>
</div>
)}
</div>
</div>
);
}
