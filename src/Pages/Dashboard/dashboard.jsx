import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


// Mock dependencies for preview (replace with real imports in your project)
// const useNavigate = () => (path) => console.log("Navigate to:", path);
// const Swal = {
//   fire: (opts) => {
//     if (opts.title && opts.showCancelButton) {
//       return Promise.resolve({ isConfirmed: confirm(opts.text) });
//     }
//     return Promise.resolve({});
//   },
// };

const NAV_ITEMS = [
  { icon: "⬡", label: "Dashboard", active: true },
  { icon: "◈", label: "Profile", active: false },
  { icon: "◎", label: "Analytics", active: false },
  { icon: "⬘", label: "Projects", active: false },
  { icon: "⚙", label: "Settings", active: false },
];

const STATS = [
  { label: "Revenue", value: "$48,295", delta: "+12.5%", up: true, icon: "◈" },
  { label: "Active Users", value: "8,142", delta: "+3.2%", up: true, icon: "◉" },
  { label: "Conversion", value: "3.64%", delta: "-0.4%", up: false, icon: "◬" },
  { label: "Tasks Done", value: "214", delta: "+28", up: true, icon: "◌" },
];

const ACTIVITIES = [
  { user: "Elena M.", action: "pushed to production", time: "2m ago", avatar: "E" },
  { user: "Jonas K.", action: "reviewed pull request #88", time: "14m ago", avatar: "J" },
  { user: "Priya S.", action: "updated design tokens", time: "1h ago", avatar: "P" },
  { user: "Luca B.", action: "closed 3 critical bugs", time: "3h ago", avatar: "L" },
  { user: "You", action: "deployed v2.4.1", time: "5h ago", avatar: "Y" },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("Alex");
  const [activeNav, setActiveNav] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.firstName) setUserName(user.firstName);
    } catch { }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/login");
        Swal.fire({
          icon: "success",
          title: "Logged out!",
          text: "You have been successfully logged out.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080c14;
          --surface: #0e1421;
          --surface2: #131929;
          --border: rgba(255,255,255,0.07);
          --accent: #5affd4;
          --accent2: #ff6b6b;
          --accent3: #ffd166;
          --text: #e2e8f8;
          --muted: #5a6a8a;
          --sidebar-w: 240px;
        }

        body { background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; }

        .dash-root {
          min-height: 100vh;
          display: flex;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow orbs */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }
        .orb1 { width: 600px; height: 600px; background: #1a3a6e; top: -200px; left: -100px; }
        .orb2 { width: 400px; height: 400px; background: #0d3d2e; bottom: -100px; right: -100px; }

        /* Sidebar */
        .sidebar {
          position: fixed;
          z-index: 40;
          top: 0; left: 0; bottom: 0;
          width: var(--sidebar-w);
          background: linear-gradient(180deg, #0b111c 0%, #0e1421 100%);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
        }
        .sidebar.open, .sidebar.desktop { transform: translateX(0); }

        @media (min-width: 768px) {
          .sidebar { position: sticky; top: 0; height: 100vh; transform: translateX(0); }
          .sidebar-overlay { display: none !important; }
        }

        .sidebar-logo {
          padding: 28px 24px 24px;
          border-bottom: 1px solid var(--border);
        }
        .logo-mark {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-hex {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, var(--accent), #2dd4bf);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          color: #000;
          font-weight: 800;
        }
        .logo-text {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text);
        }
        .logo-text span { color: var(--accent); }

        .sidebar-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
          position: relative;
          border: 1px solid transparent;
          letter-spacing: 0.02em;
        }
        .nav-item:hover { color: var(--text); background: rgba(255,255,255,0.04); }
        .nav-item.active {
          color: var(--accent);
          background: rgba(90, 255, 212, 0.08);
          border-color: rgba(90, 255, 212, 0.15);
        }
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: -12px; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 18px;
          background: var(--accent);
          border-radius: 0 3px 3px 0;
        }
        .nav-icon { font-size: 16px; width: 20px; text-align: center; }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--border);
        }
        .user-card {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
        }
        .user-avatar-sm {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, var(--accent), #2dd4bf);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #000;
        }
        .user-info-sm { flex: 1; min-width: 0; }
        .user-name-sm { font-size: 13px; font-weight: 600; color: var(--text); }
        .user-role-sm { font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; }

        /* Overlay */
        .sidebar-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 30;
        }

        /* Main content */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          border-bottom: 1px solid var(--border);
          background: rgba(8,12,20,0.8);
          backdrop-filter: blur(20px);
          position: sticky; top: 0; z-index: 20;
          gap: 16px;
        }

        .header-left { display: flex; align-items: center; gap: 16px; }

        .menu-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          color: var(--text);
          width: 36px; height: 36px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .menu-btn:hover { background: rgba(255,255,255,0.09); }
        @media (min-width: 768px) { .menu-btn { display: none; } }

        .header-title { font-size: 16px; font-weight: 700; color: var(--text); }
        .header-sub { font-size: 12px; color: var(--muted); font-family: 'DM Mono', monospace; }

        .header-right { display: flex; align-items: center; gap: 12px; }

        .greeting {
          font-size: 13px;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          display: none;
        }
        @media (min-width: 640px) { .greeting { display: block; } }
        .greeting span { color: var(--accent); }

        .notif-btn {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 15px;
          position: relative;
          transition: all 0.2s;
        }
        .notif-btn:hover { background: rgba(255,255,255,0.08); }
        .notif-dot {
          position: absolute; top: 6px; right: 7px;
          width: 7px; height: 7px;
          background: var(--accent2);
          border-radius: 50%;
          border: 2px solid var(--bg);
        }

        .logout-btn {
          display: flex; align-items: center; gap: 7px;
          background: rgba(255, 107, 107, 0.1);
          border: 1px solid rgba(255, 107, 107, 0.25);
          color: var(--accent2);
          padding: 7px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          transition: all 0.2s;
          letter-spacing: 0.02em;
        }
        .logout-btn:hover {
          background: rgba(255, 107, 107, 0.18);
          border-color: rgba(255, 107, 107, 0.4);
        }

        /* Page content */
        .content { padding: 28px; display: flex; flex-direction: column; gap: 24px; }

        /* Page heading */
        .page-heading { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .page-heading h2 { font-size: 26px; font-weight: 800; letter-spacing: -0.03em; }
        .page-heading h2 span { color: var(--accent); }
        .page-date {
          font-size: 12px; color: var(--muted);
          font-family: 'DM Mono', monospace;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          padding: 5px 12px; border-radius: 20px;
        }

        /* Stats grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.25s;
          cursor: default;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.5s forwards;
        }
        .stat-card:nth-child(1) { animation-delay: 0.05s; }
        .stat-card:nth-child(2) { animation-delay: 0.1s; }
        .stat-card:nth-child(3) { animation-delay: 0.15s; }
        .stat-card:nth-child(4) { animation-delay: 0.2s; }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(90,255,212,0.04), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .stat-card:hover { border-color: rgba(90,255,212,0.2); transform: translateY(-2px); }
        .stat-card:hover::before { opacity: 1; }

        .stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .stat-icon {
          font-size: 20px;
          color: var(--accent);
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(90,255,212,0.08);
          border: 1px solid rgba(90,255,212,0.15);
          border-radius: 10px;
        }
        .stat-delta {
          font-size: 11px; font-weight: 600;
          font-family: 'DM Mono', monospace;
          padding: 3px 8px; border-radius: 20px;
        }
        .stat-delta.up { color: #4ade80; background: rgba(74,222,128,0.1); }
        .stat-delta.down { color: var(--accent2); background: rgba(255,107,107,0.1); }

        .stat-value { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 4px; }
        .stat-label { font-size: 12px; color: var(--muted); font-family: 'DM Mono', monospace; }

        /* Bottom grid */
        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 768px) { .bottom-grid { grid-template-columns: 1fr; } }

        /* Card base */
        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.5s forwards;
        }
        .card:nth-child(1) { animation-delay: 0.25s; }
        .card:nth-child(2) { animation-delay: 0.3s; }

        .card-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px 14px;
          border-bottom: 1px solid var(--border);
        }
        .card-title { font-size: 14px; font-weight: 700; letter-spacing: 0.02em; }
        .card-badge {
          font-size: 11px;
          font-family: 'DM Mono', monospace;
          padding: 3px 8px; border-radius: 20px;
          background: rgba(90,255,212,0.08);
          border: 1px solid rgba(90,255,212,0.15);
          color: var(--accent);
        }

        /* Activity feed */
        .activity-list { padding: 8px 0; }
        .activity-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 20px;
          transition: background 0.15s;
        }
        .activity-item:hover { background: rgba(255,255,255,0.03); }
        .act-avatar {
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #000;
          background: linear-gradient(135deg, var(--accent), #2dd4bf);
        }
        .act-info { flex: 1; min-width: 0; }
        .act-user { font-size: 13px; font-weight: 600; }
        .act-action { font-size: 12px; color: var(--muted); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .act-time { font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; flex-shrink: 0; }

        /* Progress bars */
        .progress-section { padding: 16px 20px; display: flex; flex-direction: column; gap: 18px; }
        .progress-item {}
        .progress-top { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .progress-label { font-size: 13px; font-weight: 600; }
        .progress-val { font-size: 12px; font-family: 'DM Mono', monospace; color: var(--muted); }
        .progress-bar-track {
          height: 6px; border-radius: 99px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%; border-radius: 99px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      <div className="dash-root">
        {/* Ambient orbs */}
        <div className="orb orb1" />
        <div className="orb orb2" />

        {/* Sidebar */}
        <aside className={`sidebar ${open ? "open" : ""}`}>
          <div className="sidebar-logo">
            <div className="logo-mark">
              <div className="logo-hex">N</div>
              <div className="logo-text">NEX<span>US</span></div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`nav-item ${activeNav === i ? "active" : ""}`}
                onClick={() => { setActiveNav(i); setOpen(false); }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar-sm">{userName?.[0] || "U"}</div>
              <div className="user-info-sm">
                <div className="user-name-sm">{userName || "User"}</div>
                <div className="user-role-sm">admin</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

        {/* Main */}
        <main className="main">
          {/* Header */}
          <header className="header">
            <div className="header-left">
              <button className="menu-btn" onClick={() => setOpen(true)}>☰</button>
              <div>
                <div className="header-title">Overview</div>
                <div className="header-sub">workspace · v2.4.1</div>
              </div>
            </div>

            <div className="header-right">
              <div className="greeting">
                Hey, <span>{userName || "User"}</span> 👋
              </div>
              <div className="notif-btn">
                🔔<span className="notif-dot" />
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                ⎋ Logout
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="content">
            <div className="page-heading">
              <h2>Your <span>Dashboard</span></h2>
              <div className="page-date">
                {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
              {STATS.map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-top">
                    <div className="stat-icon">{s.icon}</div>
                    <div className={`stat-delta ${s.up ? "up" : "down"}`}>{s.delta}</div>
                  </div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Bottom */}
            <div className="bottom-grid">
              {/* Activity */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Recent Activity</div>
                  <div className="card-badge">Live</div>
                </div>
                <div className="activity-list">
                  {ACTIVITIES.map((a, i) => (
                    <div className="activity-item" key={i}>
                      <div className="act-avatar" style={{ background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))` }}>
                        {a.avatar}
                      </div>
                      <div className="act-info">
                        <div className="act-user">{a.user}</div>
                        <div className="act-action">{a.action}</div>
                      </div>
                      <div className="act-time">{a.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Sprint Progress</div>
                  <div className="card-badge">Q1 2025</div>
                </div>
                <div className="progress-section">
                  {[
                    { label: "Backend API", val: 87, color: "linear-gradient(90deg, #5affd4, #2dd4bf)" },
                    { label: "Frontend UI", val: 74, color: "linear-gradient(90deg, #818cf8, #6366f1)" },
                    { label: "Testing", val: 52, color: "linear-gradient(90deg, #fbbf24, #f59e0b)" },
                    { label: "Documentation", val: 38, color: "linear-gradient(90deg, #f87171, #ef4444)" },
                    { label: "Deployment", val: 21, color: "linear-gradient(90deg, #a78bfa, #8b5cf6)" },
                  ].map((p, i) => (
                    <div className="progress-item" key={i}>
                      <div className="progress-top">
                        <div className="progress-label">{p.label}</div>
                        <div className="progress-val">{p.val}%</div>
                      </div>
                      <div className="progress-bar-track">
                        <div
                          className="progress-bar-fill"
                          style={{ width: mounted ? `${p.val}%` : "0%", background: p.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}