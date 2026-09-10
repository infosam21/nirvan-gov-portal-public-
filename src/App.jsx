import React, { useState, useEffect } from "react";
import { api } from "./services/api";

export default function App() {
  // Authentication State
  const [user, setUser] = useState(null);
  const [authRole, setAuthRole] = useState("learner"); // 'learner' | 'admin'
  const [loginMethod, setLoginMethod] = useState("credentials"); // 'credentials' | 'aadhaar'
  const [email, setEmail] = useState("staff@gov.in");
  const [password, setPassword] = useState("password123");
  const [aadhaar, setAadhaar] = useState("");
  const [authError, setAuthError] = useState("");

  // Portal Navigation State
  const [activeScreen, setActiveScreen] = useState("learner-dashboard");
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Ethics in Public Administration",
      provider: "iGOT Karmayogi",
      progress: 65,
      duration: "4 Hours",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Digital Governance & Public Infrastructure",
      provider: "MeitY / iGOT",
      progress: 30,
      duration: "6 Hours",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Public Finance Management & FRBM Act",
      provider: "Dept of Expenditure",
      progress: 100,
      duration: "3 Hours",
      status: "Completed"
    },
    {
      id: 4,
      title: "Citizen Services & Grievance Redressal (CPGRAMS)",
      provider: "DARPG",
      progress: 0,
      duration: "5 Hours",
      status: "Enrolled"
    }
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: "Public Policy Analysis", level: "Level 3 - Proficient" },
    { id: 2, name: "GeM Portal Operations", level: "Level 4 - Advanced" },
    { id: 3, name: "Right to Information (RTI) Handling", level: "Level 3 - Proficient" },
    { id: 4, name: "Cybersecurity Basics in Governance", level: "Level 2 - Foundational" }
  ]);


  // Active Interactive Course Player State
  const [selectedCourse, setSelectedCourse] = useState(null);

  // AI Assistant Drawer State
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiPlan, setAiPlan] = useState("");
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Namaste! I am NIRVAN AI. How can I assist your competency roadmap, iGOT modules, or divisional data today?" }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadPortalData();
    }
  }, [user]);

  async function loadPortalData() {
    try {
      const courseRes = await api.getCourses();
      if (courseRes?.courses?.length) {
        setCourses(courseRes.courses);
      }
      const skillRes = await api.getSkills();
      if (skillRes?.skills?.length) {
        setSkills(skillRes.skills);
      }
    } catch (err) {
      console.warn("Backend offline, populating iGOT demo data:", err);
      setCourses([
        {
          id: 1,
          title: "Ethics in Public Administration",
          provider: "iGOT Karmayogi",
          progress: 65,
          duration: "4 Hours",
          status: "In Progress"
        },
        {
          id: 2,
          title: "Digital Governance & Public Infrastructure",
          provider: "MeitY / iGOT",
          progress: 30,
          duration: "6 Hours",
          status: "In Progress"
        },
        {
          id: 3,
          title: "Public Finance Management & FRBM Act",
          provider: "Dept of Expenditure",
          progress: 100,
          duration: "3 Hours",
          status: "Completed"
        },
        {
          id: 4,
          title: "Citizen Services & Grievance Redressal (CPGRAMS)",
          provider: "DARPG",
          progress: 15,
          duration: "5 Hours",
          status: "Enrolled"
        }
      ]);

      setSkills([
        { id: 1, name: "Public Policy Analysis", level: "Level 3 - Proficient" },
        { id: 2, name: "GeM Portal Operations", level: "Level 4 - Advanced" },
        { id: 3, name: "Right to Information (RTI) Handling", level: "Level 3 - Proficient" },
        { id: 4, name: "Cybersecurity Basics in Governance", level: "Level 2 - Foundational" }
      ]);
    }
  }const handleGeneratePlan = async () => {
    setLoadingPlan(true);
    try {
      const plan = await api.getAiPlan();
      setAiPlan(plan);
    } catch (err) {
      console.warn("Using offline demo AI roadmap:", err);
      setAiPlan("🚀 Personalized AI Competency Roadmap (Mission Karmayogi):\n• Stage 1: Ethics in Public Administration (iGOT Module - 4 hrs)\n• Stage 2: Public Procurement & GeM Framework (Advanced)\n• Stage 3: Digital Public Infrastructure & CPGRAMS Redressal");
    } finally {
      setLoadingPlan(false);
    }
  };

  const handleSendChat = async (e) => {
    e?.preventDefault();
    if (!chatInput?.trim()) return;

    const userText = chatInput.trim();
    const updated = [...messages, { role: "user", content: userText }];
    setMessages(updated);
    setChatInput("");
    if (typeof setChatLoading === "function") setChatLoading(true);

    try {
      if (typeof api !== "undefined" && api.chat) {
        const res = await api.chat(userText);
        if (res && res.reply) {
          setMessages([...updated, { role: "assistant", content: res.reply }]);
          return;
        }
      }
    } catch (err) {
      console.warn("Backend offline, providing demo assistant reply:", err);
    }

    setTimeout(() => {
      let reply = "NIRVAN AI: Aligned with the National Competency Framework (FRAC), your profile is on track for Level 3 Public Policy certification.";
      const lower = userText.toLowerCase();
      if (lower.includes("help") || lower.includes("plan") || lower.includes("roadmap")) {
        reply = "Recommended learning pathway:\n1. Ethics in Governance (iGOT)\n2. GeM Portal Operations & Audit\n3. Citizen Service Redressal.";
      } else if (lower.includes("course") || lower.includes("igot")) {
        reply = "You have 4 active courses in iGOT Karmayogi. Current completion: 65% on Ethics in Public Administration.";
      }
      setMessages([...updated, { role: "assistant", content: reply }]);
      if (typeof setChatLoading === "function") setChatLoading(false);
    }, 400);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (loginMethod === "aadhaar" && aadhaar.length < 12) {
        setAuthError("Please enter a valid 12-digit Aadhaar Number.");
        return;
      }
      
      // Try backend if available; fall back gracefully if offline
      let loggedInUser = { email: email || "staff@gov.in", role: authRole || "learner" };
      try {
        const res = await api.login(email, password);
        if (res && res.user) loggedInUser = res.user;
      } catch (networkErr) {
        console.warn("Backend offline, entering demo mode:", networkErr);
      }

      setUser(loggedInUser);
      if (authRole === "admin") {
        setActiveScreen("admin-users");
      } else {
        setActiveScreen("learner-dashboard");
      }
    } catch (err) {
      // Demo fallback guarantees it always opens the screen
      setUser({ email: email || "staff@gov.in", role: authRole || "learner" });
      if (authRole === "admin") {
        setActiveScreen("admin-users");
      } else {
        setActiveScreen("learner-dashboard");
      }
    }
  };const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!chatInput?.trim()) return;

    const userText = chatInput.trim();
    const updatedMessages = [...messages, { role: "user", content: userText }];
    setMessages(updatedMessages);
    setChatInput("");
    if (typeof setChatLoading === "function") setChatLoading(true);

    setTimeout(() => {
      let reply = "NIRVAN AI: Under Mission Karmayogi (FRAC framework), your profile is mapped to Level 3 Administrative Competency.";
      const lower = userText.toLowerCase();

      if (lower.includes("help") || lower.includes("roadmap") || lower.includes("plan")) {
        reply = "Recommended pathway:\n1. Ethics in Governance (iGOT Karmayogi)\n2. Public Procurement via GeM Portal\n3. Citizen Service & CPGRAMS Resolution.";
      } else if (lower.includes("course") || lower.includes("igot")) {
        reply = "You have 4 active courses enrolled. Current milestone: 65% on Ethics in Public Administration.";
      } else if (lower.includes("rule") || lower.includes("leave")) {
        reply = "Under CCS Rules, earned leaves and training credits are synchronized with your annual capacity development report.";
      }

      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
      if (typeof setChatLoading === "function") setChatLoading(false);
    }, 400);
  };

  // =========================================================================
  // SCREENS 1, 2, 7: AUTHENTICATION
  // =========================================================================
  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc", fontFamily: "Segoe UI, sans-serif" }}>
        {/* Gov Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 40px", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>🏛️</span>
            <div>
              <div style={{ fontWeight: "800", fontSize: "18px", letterSpacing: "1px", color: "#0f172a" }}>NIRVAN</div>
              <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase" }}>National Initiative for Reskilling, Verification and Assessment for a New India</div>
            </div>
          </div>
          <div style={{ fontSize: "11px", color: "#475569", fontWeight: "600" }}>
            Build Skills • Enhance Competency • Strengthen Governance
          </div>
        </header>

        {/* Login Split Screen */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ display: "flex", width: "100%", maxWidth: "900px", background: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
            {/* Left Brand Panel */}
            <div style={{ flex: 1, background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", color: "#ffffff", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "700" }}>🌿 NIRVAN</div>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Capacity Building Commission Ecosystem</p>
              </div>
              <div>
                <h3 style={{ fontSize: "22px", lineHeight: "1.4", margin: "0 0 10px" }}>Empowering Government Employees Through Continuous Learning.</h3>
                <p style={{ fontSize: "12px", color: "#94a3b8" }}>National Digital Training Architecture</p>
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Secure • Accessible • AI Powered Assistant</div>
            </div>

            {/* Right Interactive Form */}
            <div style={{ flex: 1.2, padding: "40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                  {authRole === "admin" ? "7. Admin Portal Sign In" : "1. Welcome to NIRVAN"}
                </h2>
                <div style={{ display: "flex", background: "#f1f5f9", padding: "3px", borderRadius: "8px" }}>
                  <button type="button" onClick={() => { setAuthRole("learner"); setEmail("staff@gov.in"); }} style={{ padding: "4px 12px", fontSize: "11px", fontWeight: "600", borderRadius: "6px", border: "none", cursor: "pointer", background: authRole === "learner" ? "#ffffff" : "transparent", color: authRole === "learner" ? "#0f172a" : "#64748b" }}>Learner</button>
                  <button type="button" onClick={() => { setAuthRole("admin"); setEmail("admin@gov.in"); }} style={{ padding: "4px 12px", fontSize: "11px", fontWeight: "600", borderRadius: "6px", border: "none", cursor: "pointer", background: authRole === "admin" ? "#ffffff" : "transparent", color: authRole === "admin" ? "#0f172a" : "#64748b" }}>Admin</button>
                </div>
              </div>

              {authError && (
                <div style={{ padding: "8px 12px", background: "#fee2e2", color: "#b91c1c", borderRadius: "6px", fontSize: "12px", marginBottom: "14px" }}>
                  {authError}
                </div>
              )}

              {/* Login Method Tabs */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <button type="button" onClick={() => setLoginMethod("credentials")} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: loginMethod === "credentials" ? "2px solid #0f766e" : "1px solid #cbd5e1", background: loginMethod === "credentials" ? "#f0fdfa" : "#fff", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
                  Official Email
                </button>
                <button type="button" onClick={() => setLoginMethod("aadhaar")} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: loginMethod === "aadhaar" ? "2px solid #0f766e" : "1px solid #cbd5e1", background: loginMethod === "aadhaar" ? "#f0fdfa" : "#fff", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
                  2. 🆔 Aadhaar Login
                </button>
              </div>

              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {loginMethod === "aadhaar" ? (
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "600", color: "#475569" }}>Enter your 12-digit Aadhaar Number</label>
                    <input 
                      type="text" 
                      maxLength="12" 
                      placeholder="XXXX XXXX XXXX" 
                      value={aadhaar} 
                      onChange={(e) => setAadhaar(e.target.value)} 
                      style={{ width: "100%", padding: "10px", marginTop: "4px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} 
                      required 
                    />
                    <p style={{ fontSize: "10px", color: "#64748b", marginTop: "4px" }}>A 6-digit OTP will be simulated for direct login verification.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: "600", color: "#475569" }}>Email / Officer ID</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={{ width: "100%", padding: "10px", marginTop: "4px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} 
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: "600", color: "#475569" }}>Password</label>
                      <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{ width: "100%", padding: "10px", marginTop: "4px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }} 
                        required 
                      />
                    </div>
                  </>
                )}

                <button type="submit" style={{ marginTop: "6px", padding: "10px", background: "#0f766e", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
                  {loginMethod === "aadhaar" ? "Verify Aadhaar & Proceed" : "Login to NIRVAN"}
                </button>
              </form>

              <div style={{ marginTop: "20px", fontSize: "11px", color: "#94a3b8", textAlign: "center" }}>
                Pre-configured: <strong>staff@gov.in</strong> / <strong>password123</strong> (or admin@gov.in)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SCREENS 3 TO 11: FULL PORTAL NAVIGATION
  // =========================================================================
  const navItems = [
    { id: "learner-dashboard", label: "3. Learner Dashboard", icon: "📊" },
    { id: "learner-profile", label: "4. Learner Profile", icon: "👤" },
    { id: "knowledge-test", label: "5. Knowledge Assessment", icon: "📝" },
    { id: "executive-dashboard", label: "6. Executive Overview", icon: "🏛️" },
    { id: "admin-users", label: "8. User Management", icon: "👥" },
    { id: "skill-ladder", label: "9. Progress & Ladder", icon: "📈" },
    { id: "divisional-overview", label: "10. Divisional Competency", icon: "🏢" },
    { id: "progress-reports", label: "11. Progress & Reports", icon: "📄" },
    { id: "courses-catalog", label: "iGOT Karmayogi Courses", icon: "📚" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Segoe UI, sans-serif" }}>
      {/* 1. Deep Slate Sidebar */}
      <aside style={{ width: "260px", background: "#1e293b", color: "#ffffff", display: "flex", flexDirection: "column", padding: "20px 14px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", paddingLeft: "8px" }}>
          <span style={{ fontSize: "22px" }}>🌿</span>
          <div>
            <div style={{ fontWeight: "800", fontSize: "18px", letterSpacing: "1px" }}>NIRVAN</div>
            <div style={{ fontSize: "9px", color: "#94a3b8", textTransform: "uppercase" }}>Govt of India Portal</div>
          </div>
        </div>

        <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", paddingLeft: "10px", marginBottom: "8px" }}>
          Main Navigation
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCourse(null);
                setActiveScreen(item.id);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "none",
                textAlign: "left",
                fontSize: "12px",
                fontWeight: activeScreen === item.id ? "700" : "500",
                cursor: "pointer",
                background: activeScreen === item.id ? "#0f766e" : "transparent",
                color: activeScreen === item.id ? "#ffffff" : "#94a3b8",
                transition: "all 0.15s ease"
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* AI Assistant Launcher Button */}
        <button
          onClick={() => setAiDrawerOpen(true)}
          style={{ padding: "10px", background: "#334155", color: "#38bdf8", border: "1px solid #475569", borderRadius: "8px", fontSize: "11px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "12px" }}
        >
          ✨ Open AI Assistant
        </button>

        <button
          onClick={() => setUser(null)}
          style={{ marginTop: "10px", padding: "8px", background: "transparent", border: "1px solid #475569", color: "#f87171", borderRadius: "8px", fontSize: "11px", cursor: "pointer" }}
        >
          Sign Out
        </button>
      </aside>

      {/* 2. Main Content Viewport */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
        {/* Top Header */}
        <header style={{ background: "#ffffff", padding: "14px 32px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>
              Good Morning, {user.name}
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#64748b" }}>
              Department: {user.department} • Role: {user.role.toUpperCase()}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "11px", background: "#f0fdfa", color: "#0f766e", padding: "4px 10px", borderRadius: "12px", fontWeight: "600", border: "1px solid #ccfbf1" }}>
              🛡️ Verified Official
            </span>
          </div>
        </header>

        {/* Active Content Screens */}
        <main style={{ padding: "28px", maxWidth: "1200px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

          {/* SCREEN 3: LEARNER DASHBOARD */}
          {activeScreen === "learner-dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: 0 }}>3. Learner Dashboard</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                <div style={{ background: "#ffffff", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>Active Courses</div>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>3</div>
                </div>
                <div style={{ background: "#ffffff", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>Completed Modules</div>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>5</div>
                </div>
                <div style={{ background: "#ffffff", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>Overall Progress</div>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f766e", marginTop: "4px" }}>78%</div>
                </div>
              </div>

              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: "14px", color: "#0f172a" }}>Recent Training Activity</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { title: "Public Procurement & GeM Certification", duration: "Completed 2 days ago", pct: 100 },
                    { title: "Ethics & Public Accountability (iGOT)", duration: "4/5 Modules Completed", pct: 80 },
                    { title: "Digital Public Services & Cybersecurity", duration: "Just Started", pct: 25 }
                  ].map((act, i) => (
                    <div key={i} style={{ padding: "12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>
                        <span>{act.title}</span>
                        <span>{act.pct}%</span>
                      </div>
                      <div style={{ width: "100%", background: "#e2e8f0", height: "6px", borderRadius: "4px", overflow: "hidden" }}>
                        <div style={{ width: `${act.pct}%`, background: "#0f766e", height: "100%" }}></div>
                      </div>
                      <span style={{ fontSize: "10px", color: "#94a3b8", marginTop: "4px", display: "block" }}>{act.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: LEARNER PROFILE */}
          {activeScreen === "learner-profile" && (
            <div style={{ background: "#ffffff", padding: "28px", borderRadius: "10px", border: "1px solid #e2e8f0", maxWidth: "700px" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 20px" }}>4. Learner Profile</h2>
              <div style={{ display: "flex", gap: "24px", alignItems: "center", marginBottom: "24px" }}>
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#0f766e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
                  👤
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", color: "#0f172a" }}>{user.name}</h3>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Learner ID: NIRVAN-7892</div>
                  <div style={{ fontSize: "12px", color: "#0f766e", fontWeight: "600" }}>Department: {user.department}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "12px" }}>
                <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "6px" }}>
                  <strong>Official Email:</strong> <div>{user.email}</div>
                </div>
                <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "6px" }}>
                  <strong>Assigned Role:</strong> <div>{user.role}</div>
                </div>
                <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "6px" }}>
                  <strong>Designation:</strong> <div>Assistant Director (Cadre I)</div>
                </div>
                <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "6px" }}>
                  <strong>Cadre / Service:</strong> <div>Central Civil Services</div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 5: KNOWLEDGE ASSESSMENT */}
          {activeScreen === "knowledge-test" && (
            <div style={{ background: "#ffffff", padding: "28px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>5. Knowledge Assessment</h2>
              <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>Select a course or competency assessment to certify and update your NIRVAN skill ladder verification.</p>
              
              <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Digital Governance & e-Office Competency Assessment</div>
                <div style={{ display: "flex", gap: "20px", marginTop: "8px", fontSize: "12px", color: "#64748b" }}>
                  <span>📋 Total Questions: <strong>20</strong></span>
                  <span>⏱ Duration: <strong>30 Mins</strong></span>
                  <span>🎯 Passing Marks: <strong>70%</strong></span>
                </div>
              </div>

              <button onClick={() => alert("Initiating verified online assessment session. Instructions dispatched.")} style={{ padding: "10px 20px", background: "#0f766e", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
                Start Assessment
              </button>
            </div>
          )}

          {/* SCREEN 6: EXECUTIVE DASHBOARD */}
          {activeScreen === "executive-dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: 0 }}>6. Executive Dashboard Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                <div style={{ background: "#fff", padding: "18px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Active Modules</div>
                  <div style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>3</div>
                </div>
                <div style={{ background: "#fff", padding: "18px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Verified Badges</div>
                  <div style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>5</div>
                </div>
                <div style={{ background: "#fff", padding: "18px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Target Velocity</div>
                  <div style={{ fontSize: "24px", fontWeight: "800", color: "#0f766e" }}>78%</div>
                </div>
                <div style={{ background: "#fff", padding: "18px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Pending Audit Tasks</div>
                  <div style={{ fontSize: "24px", fontWeight: "800", color: "#e11d48" }}>12</div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 8: ADMIN - USER MANAGEMENT */}
          {activeScreen === "admin-users" && (
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 16px" }}>8. Administrator - User Management</h2>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", color: "#475569" }}>
                    <th style={{ padding: "10px" }}>Staff Name</th>
                    <th style={{ padding: "10px" }}>Department</th>
                    <th style={{ padding: "10px" }}>Ladder Level</th>
                    <th style={{ padding: "10px" }}>Verification Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Rohit Sharma", dept: "Finance & Accounts", lvl: "L4 - Section Officer", status: "Verified" },
                    { name: "Priya Verma", dept: "Public Health", lvl: "L3 - Senior Assistant", status: "Verified" },
                    { name: "Suresh Kumar", dept: "Education", lvl: "L2 - Junior Officer", status: "Pending Audit" },
                    { name: "Neha Singh", dept: "Agriculture", lvl: "L5 - Deputy Director", status: "Verified" }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px", fontWeight: "600" }}>{row.name}</td>
                      <td style={{ padding: "10px", color: "#64748b" }}>{row.dept}</td>
                      <td style={{ padding: "10px" }}>{row.lvl}</td>
                      <td style={{ padding: "10px" }}>
                        <span style={{ background: row.status === "Verified" ? "#ecfdf5" : "#fffbeb", color: row.status === "Verified" ? "#047857" : "#b45309", padding: "3px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: "700" }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SCREEN 9: LEARNER PROGRESS & LADDER */}
          {activeScreen === "skill-ladder" && (
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 16px" }}>9. Learner Progress & Competency Ladder</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#0f766e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "12px" }}>
                      L{i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                        <span>{s.skill}</span>
                        <span>{s.level}%</span>
                      </div>
                      <div style={{ width: "100%", background: "#e2e8f0", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                        <div style={{ width: `${s.level}%`, background: "#0f766e", height: "100%" }}></div>
                      </div>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: "#0f766e", background: "#f0fdfa", padding: "4px 10px", borderRadius: "4px" }}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 10: DIVISIONAL COMPETENCY OVERVIEW */}
          {activeScreen === "divisional-overview" && (
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 16px" }}>10. Divisional Competency Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px" }}>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Enrolled Staff Across Division</div>
                  <div style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>128</div>
                </div>
                <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px" }}>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Division Compliance Index</div>
                  <div style={{ fontSize: "24px", fontWeight: "800", color: "#0f766e" }}>92%</div>
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "#64748b" }}>All divisions adhere to standard Capacity Building Commission guidelines.</p>
            </div>
          )}

          {/* SCREEN 11: PROGRESS & REPORTS */}
          {activeScreen === "progress-reports" && (
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 16px" }}>11. Progress & Audit Reports</h2>
              <div style={{ display: "flex", gap: "16px" }}>
                <button onClick={() => alert("Downloading official Learner Dossier PDF...")} style={{ padding: "10px 18px", background: "#0f766e", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "12px", cursor: "pointer" }}>
                  ⬇ Download My Progress Dossier (.PDF)
                </button>
                <button onClick={() => alert("Exporting Division Audit CSV...")} style={{ padding: "10px 18px", background: "#1e293b", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "12px", cursor: "pointer" }}>
                  ⬇ Download Departmental Audit Report (.CSV)
                </button>
              </div>
            </div>
          )}

          {/* COURSES CATALOG: FULLY FUNCTIONAL START LEARNING MODULE */}
          {activeScreen === "courses-catalog" && (
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 16px" }}>
                iGOT Karmayogi Synced Modules
              </h2>

              {!selectedCourse ? (
                /* Course Grid View */
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {courses.map((c) => (
                    <div key={c.id} style={{ padding: "18px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: "10px", background: "#ecfdf5", color: "#047857", padding: "3px 8px", borderRadius: "4px", fontWeight: "700" }}>
                          {c.category}
                        </span>
                        <h4 style={{ fontSize: "15px", margin: "10px 0 6px", color: "#0f172a" }}>{c.name}</h4>
                        <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Duration: {c.duration} • Rating: ★ {c.rating || 4.8}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedCourse(c)}
                        style={{ marginTop: "16px", padding: "10px", background: "#0f766e", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                      >
                        ▶ Start Learning
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* Open Player & Completion Interface */
                <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    style={{ marginBottom: "16px", padding: "6px 12px", background: "#e2e8f0", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}
                  >
                    ← Back to Catalog
                  </button>
                  <div style={{ background: "#ffffff", padding: "20px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                    <span style={{ fontSize: "11px", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px", fontWeight: "700", color: "#475569" }}>
                      {selectedCourse.category}
                    </span>
                    <h2 style={{ fontSize: "18px", color: "#0f172a", margin: "8px 0" }}>{selectedCourse.name}</h2>
                    <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 16px" }}>Official Capacity Building Commission Module • Certified for Public Service Records</p>

                    <div style={{ background: "#0f172a", color: "#38bdf8", padding: "30px", borderRadius: "8px", textAlign: "center", marginBottom: "20px" }}>
                      <div style={{ fontSize: "36px", marginBottom: "8px" }}>📺</div>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: "#ffffff" }}>Interactive Training Session Active</div>
                      <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Streaming authenticated module from iGOT Karmayogi Repository...</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "#0f766e", fontWeight: "700" }}>Module Status: In Progress (Session 1 of 4)</span>
                      <button 
                        onClick={() => {
                          alert(`Successfully logged completion for "${selectedCourse.name}" to your official NIRVAN record.`);
                          setSelectedCourse(null);
                        }}
                        style={{ padding: "8px 16px", background: "#0f766e", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                      >
                        Complete & Certify Module
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* 3. Sliding AI Assistant Drawer */}
      {aiDrawerOpen && (
        <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "380px", background: "#ffffff", boxShadow: "-5px 0 25px rgba(0,0,0,0.15)", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", zIndex: 100 }}>
          <div style={{ padding: "16px", background: "#1e293b", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>✨ NIRVAN AI Assistant</span>
            <button onClick={() => setAiDrawerOpen(false)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: "16px", cursor: "pointer" }}>✕</button>
          </div>

          <div style={{ flex: 1, padding: "14px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", background: "#f8fafc" }}>
            <div style={{ background: "#ffffff", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <button onClick={handleGeneratePlan} disabled={loadingPlan} style={{ width: "100%", padding: "8px", background: "#0f766e", color: "#fff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
                {loadingPlan ? "Consulting Gemini..." : "⚡ Generate Adaptive Roadmap"}
              </button>
              {aiPlan && (
                <div style={{ marginTop: "8px", fontSize: "11px", color: "#334155", whiteSpace: "pre-wrap" }}>
                  {aiPlan}
                </div>
              )}
            </div>

            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", padding: "8px 12px", borderRadius: "8px", fontSize: "11px", background: m.role === "user" ? "#0f766e" : "#ffffff", color: m.role === "user" ? "#fff" : "#0f172a", border: m.role === "user" ? "none" : "1px solid #e2e8f0" }}>
                {m.content}
              </div>
            ))}
            {chatLoading && <div style={{ fontSize: "10px", color: "#94a3b8" }}>NIRVAN AI is thinking...</div>}
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: "12px", background: "#ffffff", borderTop: "1px solid #e2e8f0", display: "flex", gap: "6px" }}>
            <input 
              type="text" 
              placeholder="Ask about a course or rule..." 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              style={{ flex: 1, padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "11px" }}
            />
            <button type="submit" disabled={chatLoading} style={{ padding: "8px 14px", background: "#1e293b", color: "#fff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}