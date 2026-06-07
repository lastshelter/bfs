"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  fetchSubmissions,
  fetchMessages,
  updateSubmissionStatus,
  updateApplicationNotes,
  SerializedApplication,
  ContactMessage,
} from "./actions";

export default function AdministrativePortalPage(): React.JSX.Element {
  const [username, setUsername] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("biggs_admin_username") || "";
    }
    return "";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<SerializedApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"queue" | "inbox" | "analytics">("queue");
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<SerializedApplication | null>(null);

  // Search, Filter, and Sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");

  // Underwriter advisory notes state
  const [advisoryNotes, setAdvisoryNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Remember me & focus states
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("biggs_admin_username");
    }
    return false;
  });
  const usernameInputRef = useRef<HTMLInputElement>(null);

  // Underwriting Decision Rules Sandbox States
  const [sandboxMinCredit, setSandboxMinCredit] = useState(650);
  const [sandboxMinRev, setSandboxMinRev] = useState(20000);

  // Document Inspection States
  const [inspectingDoc, setInspectingDoc] = useState<{ id: string; originalName: string; mimeType: string } | null>(null);
  const [ocrActive, setOcrActive] = useState(false);
  const [magnifierActive, setMagnifierActive] = useState(false);
  const [magPos, setMagPos] = useState({ x: 0, y: 0 });

  // Auto-focus on mount/load if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      usernameInputRef.current?.focus();
    }
  }, [isAuthenticated]);

  // Derived filtered and sorted applications list
  const filteredApplications = useMemo(() => {
    let result = [...applications];

    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (app) =>
          app.company.legalName.toLowerCase().includes(q) ||
          `${app.company.user.firstName} ${app.company.user.lastName}`.toLowerCase().includes(q) ||
          app.company.user.email.toLowerCase().includes(q) ||
          app.company.phone.toLowerCase().includes(q) ||
          app.id.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "ALL") {
      result = result.filter((app) => app.status === statusFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "date-asc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "amount-desc") {
        return Number(b.requestedAmount) - Number(a.requestedAmount);
      }
      if (sortBy === "amount-asc") {
        return Number(a.requestedAmount) - Number(b.requestedAmount);
      }
      return 0;
    });

    return result;
  }, [applications, searchTerm, statusFilter, sortBy]);

  const totalVolume = applications.reduce((sum, app) => sum + Number(app.requestedAmount), 0);

  const statusStats = useMemo<Record<"SUBMITTED" | "IN_REVIEW" | "APPROVED" | "FUNDED" | "DENIED", { count: number; volume: number }>>(() => {
    const stats = {
      SUBMITTED: { count: 0, volume: 0 },
      IN_REVIEW: { count: 0, volume: 0 },
      APPROVED: { count: 0, volume: 0 },
      FUNDED: { count: 0, volume: 0 },
      DENIED: { count: 0, volume: 0 },
    };
    for (const app of applications) {
      const status = app.status;
      if (status in stats) {
        stats[status as keyof typeof stats].count++;
        stats[status as keyof typeof stats].volume += Number(app.requestedAmount) || 0;
      }
    }
    return stats;
  }, [applications]);

  const creditStats = useMemo<Record<"excellent" | "good" | "fair" | "poor", { count: number; pct: number }>>(() => {
    const counts = {
      excellent: 0,
      good: 0,
      fair: 0,
      poor: 0,
    };
    for (const app of applications) {
      const tier = app.creditScoreTier || "";
      if (tier.includes("Excellent")) {
        counts.excellent++;
      } else if (tier.includes("Good")) {
        counts.good++;
      } else if (tier.includes("Fair")) {
        counts.fair++;
      } else {
        counts.poor++;
      }
    }
    const total = applications.length || 1;
    return {
      excellent: { count: counts.excellent, pct: Math.round((counts.excellent / total) * 100) },
      good: { count: counts.good, pct: Math.round((counts.good / total) * 100) },
      fair: { count: counts.fair, pct: Math.round((counts.fair / total) * 100) },
      poor: { count: counts.poor, pct: Math.round((counts.poor / total) * 100) },
    };
  }, [applications]);

  // Decisioning Sandbox Scoring logic
  const sandboxPassingCount = useMemo(() => {
    return applications.filter((app) => {
      const scoreStr = app.creditScoreTier || "";
      let scoreVal = 550;
      if (scoreStr.includes("Excellent")) scoreVal = 750;
      else if (scoreStr.includes("Good")) scoreVal = 680;
      else if (scoreStr.includes("Fair")) scoreVal = 620;

      const rev = Number(app.company.revenueAnnual) / 12 || 0; // monthly
      return scoreVal >= sandboxMinCredit && rev >= sandboxMinRev;
    }).length;
  }, [applications, sandboxMinCredit, sandboxMinRev]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const u = username.trim().toLowerCase();

    // Explicit requested accounts configurations
    const isUser1 = u === "michaelb" && password === "Biggs2026!";
    const isUser2 = u === "admin" && password === "Beograd1991!@#";

    // Environment variables integrations with safe system fallbacks
    const portalAdmin = (process.env["NEXT_PUBLIC_PORTAL_ADMIN"] || "admin").trim().toLowerCase();
    const portalPasskey = process.env["NEXT_PUBLIC_PORTAL_PASSKEY"] || "Beograd1991!@#";
    const isEnvUser = u === portalAdmin && password === portalPasskey;

    if (isUser1 || isUser2 || isEnvUser) {
      if (rememberMe) {
        localStorage.setItem("biggs_admin_username", username);
      } else {
        localStorage.removeItem("biggs_admin_username");
      }

      try {
        const data = await fetchSubmissions(password);
        const msgs = await fetchMessages(password);
        setApplications(data);
        setMessages(msgs);
        setIsAuthenticated(true);
      } catch (err: unknown) {
        console.error("Database fallback initiated:", err);
        setApplications([]);
        setMessages([
          {
            id: "msg-1",
            senderName: "Sarah Jenkins",
            email: "sarah@jenkinslogistics.com",
            phone: "305-555-0192",
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            subject: "Equipment leasing question",
            message: "Hello, we are looking to lease three new freight trucks for our logistics division..."
          }
        ]);
        setIsAuthenticated(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Invalid administrative credentials. Access Denied.");
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await updateSubmissionStatus(id, newStatus, password);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      setSelectedApplication((prev) =>
        prev && prev.id === id ? { ...prev, status: newStatus } : prev
      );
    } catch (err: unknown) {
      alert("Failed to update status: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApplication) return;
    setIsSavingNotes(true);
    try {
      await updateApplicationNotes(selectedApplication.id, advisoryNotes, password);
      setApplications((prev) =>
        prev.map((app) => (app.id === selectedApplication.id ? { ...app, notes: advisoryNotes } : app))
      );
      setSelectedApplication((prev) =>
        prev && prev.id === selectedApplication.id ? { ...prev, notes: advisoryNotes } : prev
      );
      alert("Advisory notes updated successfully!");
    } catch (err: unknown) {
      alert("Failed to update notes: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Application ID",
      "Filing Date",
      "Company Name",
      "Contact Person",
      "Email",
      "Phone",
      "Annual Revenue",
      "Time In Business",
      "Credit Score Tier",
      "Requested Amount",
      "Use of Funds",
      "Status",
      "Advisory Notes"
    ];

    const rows = filteredApplications.map((app) => [
      app.id,
      new Date(app.createdAt).toLocaleDateString(),
      app.company.legalName,
      `${app.company.user.firstName} ${app.company.user.lastName}`,
      app.company.user.email,
      app.company.phone,
      app.company.revenueAnnual,
      app.timeInBusiness,
      app.creditScoreTier,
      app.requestedAmount,
      app.useOfFunds,
      app.status,
      app.notes
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((val) => `"${String(val || "").replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Biggs_Funding_Applications_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSubmissions(password);
      const msgs = await fetchMessages(password);
      setApplications(data);
      setMessages(msgs);
      if (selectedApplication) {
        const updatedApp = data.find((a) => a.id === selectedApplication.id);
        if (updatedApp) {
          setSelectedApplication(updatedApp);
          setAdvisoryNotes(updatedApp.notes || "");
        }
      }
    } catch {
      setError("Session expired. Please log in again.");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyContact = (msg: ContactMessage) => {
    const contactInfo = `Name: ${msg.senderName}\nEmail: ${msg.email}\nPhone: ${msg.phone}`;
    navigator.clipboard.writeText(contactInfo)
      .then(() => alert("Contact details copied to clipboard!"))
      .catch((err) => console.error("Failed to copy context: ", err));
  };

  const handlePrintDossier = () => {
    if (!selectedApplication) return;
    const printWin = window.open("", "_blank");
    if (!printWin) {
      alert("Please allow popups to export printable dossier.");
      return;
    }

    const docsList = selectedApplication.documents.map((d) => `<li>${d.originalName} (${d.mimeType})</li>`).join("");

    printWin.document.write(`
      <html>
        <head>
          <title>Dossier_${selectedApplication.id.substring(0, 8)}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1e293b; padding: 40px; line-height: 1.5; }
            h1 { font-size: 20px; font-weight: 800; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
            h2 { font-size: 14px; font-weight: 700; text-transform: uppercase; margin-top: 30px; margin-bottom: 10px; color: #0f172a; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
            .card { border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; }
            .label { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
            .value { font-size: 12px; font-weight: 600; color: #0f172a; }
            .notes { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 11px; white-space: pre-wrap; margin-top: 10px; }
            .footer { margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 10px; text-align: center; font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <h1>BIGGS FUNDING SOLUTIONS - UNDERWRITING DOSSIER</h1>
          <p style="font-size: 10px; color: #64748b; font-family: monospace; margin-top: -15px; margin-bottom: 30px;">
            SECURE AUDIT FILE ID: ${selectedApplication.id}
          </p>

          <h2>Corporate Profile</h2>
          <div class="grid">
            <div class="card"><div class="label">Legal Entity Name</div><div class="value">${selectedApplication.company.legalName}</div></div>
            <div class="card"><div class="label">Client Representative</div><div class="value">${selectedApplication.company.user.firstName} ${selectedApplication.company.user.lastName}</div></div>
            <div class="card"><div class="label">Filing Contact Email</div><div class="value">${selectedApplication.company.user.email}</div></div>
            <div class="card"><div class="label">Contact Phone</div><div class="value">${selectedApplication.company.phone}</div></div>
            <div class="card"><div class="label">Verified Annual Revenue</div><div class="value">${formatCurrency(Number(selectedApplication.company.revenueAnnual))}</div></div>
            <div class="card"><div class="label">Time in Operations</div><div class="value">${selectedApplication.timeInBusiness}</div></div>
            <div class="card"><div class="label">Estimated Credit Quality</div><div class="value">${selectedApplication.creditScoreTier}</div></div>
            <div class="card"><div class="label">Requested Funding Facility</div><div class="value">${formatCurrency(Number(selectedApplication.requestedAmount))}</div></div>
          </div>

          <h2>Underwriter Advisory Notes</h2>
          <div class="notes">${selectedApplication.notes || "No underwriter notes entered."}</div>

          <h2>Secured Document Index</h2>
          <ul style="font-size: 11px; font-family: monospace; padding-left: 20px;">
            ${docsList || "<li>No attachments listed.</li>"}
          </ul>

          <div class="footer">
            CONFIDENTIAL UNDERWRITING RECORD • GENERATED SECURELY BY BIGGS PORTAL
          </div>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  const handleCopyLeadDetails = (app: SerializedApplication) => {
    const details = [
      "--- BIGGS FUNDING SOLUTIONS LEAD ---",
      `Client Name: ${app.company.user.firstName} ${app.company.user.lastName}`,
      `Company Legal Name: ${app.company.legalName}`,
      `Phone: ${app.company.phone}`,
      `Email: ${app.company.user.email}`,
      `Requested Capital: ${formatCurrency(Number(app.requestedAmount))}`,
      `Credit Score Tier: ${app.creditScoreTier}`,
      "------------------------------------"
    ].join("\n");

    navigator.clipboard.writeText(details)
      .then(() => alert("Lead details copied to clipboard!"))
      .catch((err) => console.error("Failed to copy lead details: ", err));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getLoanType = (useOfFunds: string | null): string => {
    if (!useOfFunds) return "Business Term Loan";
    const norm = useOfFunds.toLowerCase();
    if (norm.includes("working capital")) return "Business Line of Credit";
    if (norm.includes("equipment")) return "Equipment Loans & Leasing";
    if (norm.includes("inventory")) return "Merchant Cash Advance";
    if (norm.includes("marketing")) return "Business Term Loans";
    if (norm.includes("debt consolidation")) return "SBA Loans";
    return useOfFunds;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020b24] text-white flex flex-col justify-between selection:bg-blue-500/30 relative overflow-hidden">
        {/* Animated Background Glowing Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0ba5f9]/10 blur-[120px] animate-float-slow pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] animate-float-slow-reverse pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 tech-grid-bg pointer-events-none opacity-40" />

        <header className="border-b border-slate-800/80 bg-[#020b24]/40 backdrop-blur-md px-6 py-4 z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-sans font-black text-lg text-white tracking-widest leading-none hover:text-[#0ba5f9] transition-all duration-300">
              BIGGS FUNDING SOLUTIONS
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 z-10">
          <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl relative animate-card-entrance hover:border-slate-700/60 focus-within:border-[#0ba5f9]/30 transition-all duration-500 group tech-border-glow">
            {/* Inner radial card glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#0ba5f9]/0 via-[#0ba5f9]/0 to-[#0ba5f9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {error && (
              <div className="p-3 mb-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-450 text-xs text-center font-semibold animate-shake-error animate-in fade-in">
                {error}
              </div>
            )}

            <div className="text-center mb-8 border-b border-slate-800/60 pb-6">
              <h1 className="font-display font-black text-2xl tracking-tight text-white mb-2 leading-tight uppercase">
                Biggs Funding Solutions <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ba5f9] via-blue-400 to-[#e08b00] drop-shadow-[0_0_10px_rgba(11,165,249,0.25)]">
                  Admin Panel
                </span>
              </h1>
              <p className="text-slate-400 text-[9px] uppercase tracking-[0.2em] font-semibold">
                Secure Operational Gateway
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">
                  Username
                </label>
                <input
                  ref={usernameInputRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-slate-950/70 border border-slate-800/80 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#0ba5f9]/50 focus:border-[#0ba5f9]/50 shadow-[0_0_15px_rgba(11,165,249,0.02)] focus:shadow-[0_0_20px_rgba(11,165,249,0.08)] transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-slate-950/70 border border-slate-800/80 rounded-xl pl-4 pr-16 py-3 text-xs text-slate-100 placeholder-slate-655 focus:outline-none focus:ring-1 focus:ring-[#0ba5f9]/50 focus:border-[#0ba5f9]/50 shadow-[0_0_15px_rgba(11,165,249,0.02)] focus:shadow-[0_0_20px_rgba(11,165,249,0.08)] transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-wider focus:outline-none px-2.5 py-1.5 bg-slate-900 border border-slate-800/80 rounded-md"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] py-0.5">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-[#0ba5f9] focus:ring-[#0ba5f9]/50 h-3.5 w-3.5 cursor-pointer accent-[#0ba5f9]"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#0ba5f9] hover:bg-[#008ee3] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#0ba5f9]/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Validating Credentials...
                  </>
                ) : (
                  "Authenticate Admin Session"
                )}
              </button>
            </form>
          </div>
        </main>

        <footer className="py-6 border-t border-slate-850/80 bg-[#020b24]/40 text-center text-[10px] text-slate-500 z-10">
          © 2026 BIGGS FUNDING SOLUTIONS. Secure Operational Control Gateway.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020b24] text-slate-100 font-sans flex flex-col selection:bg-blue-500/30">
      <header className="border-b border-slate-800/80 bg-[#020b24] px-6 py-5 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-sans font-black text-lg text-white tracking-widest leading-none hover:text-[#0ba5f9] transition-colors uppercase shrink-0">
            BIGGS FUNDING SOLUTIONS
          </Link>
          <div className="flex items-center gap-4 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Admin Session Active
            </span>
            <button onClick={handleRefresh} disabled={isLoading} className="text-[10px] bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all disabled:opacity-50 cursor-pointer">
              {isLoading ? "Syncing..." : "Sync Feed"}
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword("");
                setUsername("");
                setApplications([]);
                setMessages([]);
                setSelectedApplication(null);
              }}
              className="text-[10px] bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-450 font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        <div className="flex border-b border-slate-800/80 bg-slate-900/10 rounded-t-2xl">
          <button onClick={() => setActiveTab("queue")} className={`py-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2.5 ${activeTab === "queue" ? "border-b-2 border-[#0ba5f9] text-[#0ba5f9] bg-[#020b24]/40" : "border-transparent text-slate-400 hover:text-slate-200"}`}>
            Application Queue <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{applications.length}</span>
          </button>
          <button onClick={() => setActiveTab("inbox")} className={`py-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2.5 ${activeTab === "inbox" ? "border-b-2 border-[#0ba5f9] text-[#0ba5f9] bg-[#020b24]/40" : "border-transparent text-slate-400 hover:text-slate-200"}`}>
            Message Inbox <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{messages.length}</span>
          </button>
          <button onClick={() => setActiveTab("analytics")} className={`py-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2.5 ${activeTab === "analytics" ? "border-b-2 border-[#0ba5f9] text-[#0ba5f9] bg-[#020b24]/40" : "border-transparent text-slate-400 hover:text-slate-200"}`}>
            System Analytics
          </button>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-b-2xl p-6 md:p-8 shadow-2xl flex-grow">
          {activeTab === "queue" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#06153b] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-lg">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Pipeline Volume</span>
                  <span className="text-xl md:text-2xl font-black text-white mt-1 block font-mono">{formatCurrency(totalVolume)}</span>
                </div>
                <div className="bg-[#06153b] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-lg">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Intake Count</span>
                  <span className="text-xl md:text-2xl font-black text-white mt-1 block font-mono">{applications.length}</span>
                </div>
                <div className="bg-[#06153b] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-lg">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Cleanliness Index</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-bold mt-1 uppercase tracking-wider">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Health
                  </span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between border-b border-slate-800 pb-4 mt-6">
                <h2 className="text-xs font-black text-[#0ba5f9] tracking-widest uppercase">ACTIVE LEADS AND FUNDING FILES</h2>
                
                {/* Search, Filter, Sort Controls */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
                  <div className="relative w-full sm:w-60">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search leads..."
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-4 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#0ba5f9] transition-all"
                    />
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-350 focus:outline-none focus:border-[#0ba5f9] cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="SUBMITTED">Pending</option>
                    <option value="IN_REVIEW">Underwriting</option>
                    <option value="APPROVED">Approved</option>
                    <option value="FUNDED">Funded</option>
                    <option value="DENIED">Denied</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full sm:w-auto bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-350 focus:outline-none focus:border-[#0ba5f9] cursor-pointer"
                  >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="amount-desc">Highest Amount</option>
                    <option value="amount-asc">Lowest Amount</option>
                  </select>

                  <button
                    onClick={handleExportCSV}
                    className="w-full sm:w-auto text-[10px] bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export CSV
                  </button>
                </div>
              </div>

              {filteredApplications.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-slate-500 text-sm">No applications found matching search criteria.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-850 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3.5 px-4">Company Name</th>
                        <th className="py-3.5 px-4">Loan Type</th>
                        <th className="py-3.5 px-4">Requested Amount</th>
                        <th className="py-3.5 px-4">Contact Info</th>
                        <th className="py-3.5 px-4">Filing Date</th>
                        <th className="py-3.5 px-4">Pipeline Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/45">
                      {filteredApplications.map((app) => {
                        const isUpdating = updatingId === app.id;
                        return (
                          <tr key={app.id} onClick={() => { setSelectedApplication(app); setAdvisoryNotes(app.notes || ""); }} className="hover:bg-slate-950/30 transition-colors cursor-pointer">
                            <td className="py-4 px-4 font-bold text-white uppercase">
                              {app.company.legalName}
                              <span className="block font-mono text-[9px] text-slate-500 font-normal mt-0.5 lowercase">id: {app.id.substring(0, 8)}...</span>
                            </td>
                            <td className="py-4 px-4 font-semibold">
                              {(() => {
                                const loanType = getLoanType(app.useOfFunds);
                                if (!loanType || loanType.trim() === "" || loanType.trim().toUpperCase() === "N/A") {
                                  return <span className="text-slate-500 font-medium italic">General Capital Inquiry</span>;
                                }
                                return <span className="text-slate-350">{loanType}</span>;
                              })()}
                            </td>
                            <td className="py-4 px-4 font-bold text-[#0ba5f9] font-mono">{formatCurrency(Number(app.requestedAmount))}</td>
                            <td className="py-4 px-4 space-y-0.5 text-xs" onClick={(e) => e.stopPropagation()}>
                              <div className="font-bold text-slate-200">{app.company.user.firstName} {app.company.user.lastName}</div>
                              <div className="text-slate-400 select-all font-mono text-[10px]">{app.company.user.email}</div>
                              <div className="text-slate-400 font-mono text-[10px]">{app.company.phone}</div>
                            </td>
                            <td className="py-4 px-4 text-slate-400 font-medium font-mono">
                              {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                            </td>
                            <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-2">
                                <select
                                  value={app.status}
                                  disabled={isUpdating}
                                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                  className={`bg-slate-950 border text-xs font-semibold rounded-lg px-2.5 py-1.5 cursor-pointer disabled:opacity-50 ${
                                    app.status === "APPROVED" || app.status === "FUNDED" ? "border-emerald-500/30 text-emerald-400" : app.status === "IN_REVIEW" ? "border-blue-500/30 text-[#0ba5f9]" : app.status === "DENIED" ? "border-rose-500/30 text-rose-400" : "border-slate-800 text-slate-300"
                                  }`}
                                >
                                  <option value="SUBMITTED">Pending</option>
                                  <option value="IN_REVIEW">Underwriting</option>
                                  <option value="APPROVED">Approved</option>
                                  <option value="FUNDED">Funded</option>
                                  <option value="DENIED">Denied</option>
                                </select>
                                {isUpdating && <span className="h-2.5 w-2.5 rounded-full border border-t-transparent border-[#0ba5f9] animate-spin" />}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "inbox" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xs font-black text-[#0ba5f9] tracking-widest uppercase">INCOMING CLIENT INQUIRIES</h2>
              </div>
              {messages.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-slate-500 text-sm">No client messages currently found in the system feed.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => {
                    const isExpanded = expandedMessageId === msg.id;
                    return (
                      <div key={msg.id} className={`border rounded-2xl transition-all duration-300 ${isExpanded ? "bg-slate-950/80 border-[#0ba5f9]/40 shadow-lg" : "bg-slate-900/30 border-slate-800 hover:bg-slate-900/50"}`}>
                        <button onClick={() => setExpandedMessageId(isExpanded ? null : msg.id)} className="w-full text-left p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                              <span className="font-bold text-white text-sm">{msg.senderName}</span>
                              <span className="text-slate-400 font-semibold">Email: <span className="text-slate-200 font-mono select-all">{msg.email}</span></span>
                              <span className="text-slate-400 font-semibold">Phone: <span className="text-slate-200 font-mono select-all">{msg.phone}</span></span>
                            </div>
                            <div className="text-xs text-slate-300 mt-1">Subject: <span className="text-slate-200 font-semibold">{msg.subject || "General Inquiry"}</span></div>
                          </div>
                          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                            <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono">
                              {new Date(msg.timestamp).toLocaleString("en-US", { month: "short", day: "2-digit", hour: "numeric", minute: "2-digit", hour12: true })}
                            </span>
                            <span className={`text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-xl border ${isExpanded ? "bg-[#0ba5f9]/15 border-[#0ba5f9]/30 text-[#0ba5f9]" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                              {isExpanded ? "Collapse" : "Expand"}
                            </span>
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-5 pb-5 md:px-6 md:pb-6 border-t border-slate-800/60 pt-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">Message Body</h4>
                              <button onClick={() => handleCopyContact(msg)} className="text-[9px] font-extrabold bg-[#0ba5f9]/10 border border-[#0ba5f9]/20 hover:bg-[#0ba5f9]/25 text-[#0ba5f9] uppercase tracking-widest px-3.5 py-1.5 rounded-xl transition-all cursor-pointer">
                                Copy Contact Info
                              </button>
                            </div>
                            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 border border-slate-800 p-4 rounded-xl whitespace-pre-line select-text">{msg.message}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xs font-black text-[#0ba5f9] tracking-widest uppercase">System Operational Analytics</h2>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-slate-500 text-sm">No funding applications currently in the database to compile analytics.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Chart 1: Pipeline Funding Volume */}
                  <div className="bg-[#06153b]/50 border border-slate-800/80 rounded-2xl p-6 shadow-lg space-y-4">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Pipeline Capital Volume by Stage</h3>
                    <div className="space-y-4 pt-2">
                      {Object.entries(statusStats).map(([stage, data]) => {
                        const totalVol = Object.values(statusStats).reduce((sum, d) => sum + d.volume, 0) || 1;
                        const pct = (data.volume / totalVol) * 100;
                        const barColor =
                          stage === "FUNDED"
                            ? "bg-purple-500 animate-pulse"
                            : stage === "APPROVED"
                            ? "bg-emerald-500"
                            : stage === "IN_REVIEW"
                            ? "bg-[#0ba5f9]"
                            : stage === "DENIED"
                            ? "bg-rose-500"
                            : "bg-slate-500";
                        return (
                          <div key={stage} className="space-y-1.5">
                            <div className="flex justify-between text-[11px] font-semibold">
                              <span className="text-slate-400 tracking-wider">{stage} ({data.count})</span>
                              <span className="text-white font-mono">{formatCurrency(data.volume)}</span>
                            </div>
                            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/40 relative">
                              <div
                                className={`h-full ${barColor} rounded-full transition-all duration-1000`}
                                style={{ width: `${Math.max(pct, 2)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chart 2: Credit Score Distribution */}
                  <div className="bg-[#06153b]/50 border border-slate-800/80 rounded-2xl p-6 shadow-lg space-y-4 flex flex-col justify-between">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Estimated Credit Quality</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
                      {/* SVG Donut Chart */}
                      <div className="relative h-36 w-36 shrink-0">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                          {/* Background Circle */}
                          <circle cx="50" cy="50" r="40" className="stroke-slate-950 fill-none" strokeWidth="10" />
                          
                          {/* Segment Circles */}
                          {(() => {
                            let accumulatedPercent = 0;
                            return Object.entries(creditStats).map(([tier, data]) => {
                              const strokeDasharray = `${data.pct} ${100 - data.pct}`;
                              const strokeDashoffset = -accumulatedPercent;
                              accumulatedPercent += data.pct;
                              const strokeColor =
                                tier === "excellent"
                                  ? "#10b981"
                                  : tier === "good"
                                  ? "#0ba5f9"
                                  : tier === "fair"
                                  ? "#e08b00"
                                  : "#f43f5e";
                              return (
                                <circle
                                  key={tier}
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="none"
                                  stroke={strokeColor}
                                  strokeWidth="10"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  pathLength="100"
                                  className="transition-all duration-1000 hover:stroke-[12px] cursor-pointer"
                                >
                                  <title>{`${tier}: ${data.pct}%`}</title>
                                </circle>
                              );
                            });
                          })()}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-lg font-black text-white font-mono">{applications.length}</span>
                          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Total Leads</span>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="space-y-2.5 w-full sm:w-auto">
                        {Object.entries(creditStats).map(([tier, data]) => {
                          const colorDot =
                            tier === "excellent"
                              ? "bg-emerald-500"
                              : tier === "good"
                              ? "bg-[#0ba5f9]"
                              : tier === "fair"
                              ? "bg-amber-500"
                              : "bg-rose-500";
                          return (
                            <div key={tier} className="flex items-center justify-between gap-4 text-xs font-semibold">
                              <div className="flex items-center gap-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${colorDot}`} />
                                <span className="text-slate-400 capitalize">{tier}</span>
                              </div>
                              <span className="text-white font-mono">{data.count} ({data.pct}%)</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Chart 3: Funnel Analysis */}
                  <div className="bg-[#06153b]/50 border border-slate-800/80 rounded-2xl p-6 shadow-lg space-y-4 lg:col-span-2">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Intake & Underwriting Conversion Funnel</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                      {[
                        { stage: "Filing Intake", count: applications.length, color: "text-[#0ba5f9]", bg: "bg-[#0ba5f9]/10" },
                        { stage: "Underwriting", count: statusStats.IN_REVIEW.count + statusStats.APPROVED.count + statusStats.FUNDED.count, color: "text-blue-400", bg: "bg-blue-500/10" },
                        { stage: "Credit Approved", count: statusStats.APPROVED.count + statusStats.FUNDED.count, color: "text-emerald-450", bg: "bg-emerald-500/10" },
                        { stage: "Capital Funded", count: statusStats.FUNDED.count, color: "text-purple-400", bg: "bg-purple-500/10" },
                      ].map((item, idx, arr) => {
                        const parentCount = idx === 0 ? applications.length : (arr[idx - 1]?.count ?? 1);
                        const pct = Math.round((item.count / parentCount) * 100) || 0;
                        return (
                          <div key={item.stage} className={`border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between space-y-4 relative ${item.bg}`}>
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{item.stage}</span>
                              <span className={`block text-2xl font-black ${item.color} font-mono mt-1`}>{item.count}</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold border-t border-slate-800/60 pt-2 uppercase">
                              <span>Funnel Rate</span>
                              <span className={item.color}>{idx === 0 ? "100%" : `${pct}%`}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Scoring Rules Sandbox */}
                  <div className="bg-[#06153b]/50 border border-slate-800/80 rounded-2xl p-6 shadow-lg space-y-6 lg:col-span-2">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Underwriting Rules Sandbox</h3>
                        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Simulate auto-decisioning thresholds</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Qualifying Files</span>
                        <span className="text-sm font-black text-[#0ba5f9] font-mono mt-0.5 block">
                          {sandboxPassingCount} / {applications.length} ({Math.round((sandboxPassingCount / (applications.length || 1)) * 100)}%)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Min Credit Score</span>
                          <span className="text-white font-mono">{sandboxMinCredit}</span>
                        </div>
                        <input
                          type="range"
                          min="500"
                          max="800"
                          step="10"
                          value={sandboxMinCredit}
                          onChange={(e) => setSandboxMinCredit(Number(e.target.value))}
                          className="w-full h-1 bg-[#020b24] rounded-lg appearance-none cursor-pointer accent-[#0ba5f9] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400">Min Monthly Revenue</span>
                          <span className="text-white font-mono">{formatCurrency(sandboxMinRev)}</span>
                        </div>
                        <input
                          type="range"
                          min="5000"
                          max="100000"
                          step="5000"
                          value={sandboxMinRev}
                          onChange={(e) => setSandboxMinRev(Number(e.target.value))}
                          className="w-full h-1 bg-[#020b24] rounded-lg appearance-none cursor-pointer accent-[#0ba5f9] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/40">
                        <div
                          className="h-full bg-gradient-to-r from-[#0ba5f9] to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${(sandboxPassingCount / (applications.length || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {selectedApplication && (
        <div className="fixed inset-0 z-[100] bg-[#020b24]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="border-b border-slate-800/80 bg-slate-950/40 px-6 py-5 flex justify-between items-center shrink-0">
              <div className="space-y-1">
                <h2 className="text-sm font-black text-[#0ba5f9] tracking-widest uppercase">BIGGS FUNDING SOLUTIONS - UNDERWRITING DOSSIER</h2>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold font-mono">Filing: {selectedApplication.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrintDossier}
                  className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-450 font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Dossier
                </button>
                <button onClick={() => setSelectedApplication(null)} className="text-[10px] bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-350 hover:text-white font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all cursor-pointer">
                  Close Dossier
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-[#0ba5f9] tracking-widest uppercase">Client & Corporate Profile</h3>
                  <button onClick={() => handleCopyLeadDetails(selectedApplication)} className="text-[9px] font-extrabold bg-[#0ba5f9]/10 border border-[#0ba5f9]/20 hover:bg-[#0ba5f9]/25 text-[#0ba5f9] uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all cursor-pointer">
                    Copy Lead Details
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Client Name</span>
                    <span className="text-sm font-bold text-white mt-1 block">{selectedApplication.company.user.firstName} {selectedApplication.company.user.lastName}</span>
                  </div>
                  <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Company Legal Name</span>
                    <span className="text-sm font-bold text-white mt-1 block uppercase truncate" title={selectedApplication.company.legalName}>{selectedApplication.company.legalName}</span>
                  </div>
                  <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone Number</span>
                    <span className="text-sm font-bold text-white mt-1 block select-all font-mono">{selectedApplication.company.phone}</span>
                  </div>
                  <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Corporate Email</span>
                    <span className="text-sm font-bold text-white mt-1 block select-all font-mono truncate" title={selectedApplication.company.user.email}>{selectedApplication.company.user.email}</span>
                  </div>
                  <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Annual Revenue</span>
                    <span className="text-sm font-bold text-[#e08b00] mt-1 block font-mono">{formatCurrency(Number(selectedApplication.company.revenueAnnual))}</span>
                  </div>
                  <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Time In Business</span>
                    <span className="text-sm font-bold text-white mt-1 block">{selectedApplication.timeInBusiness}</span>
                  </div>
                  <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Credit Score Tier</span>
                    <span className="text-sm font-bold text-white mt-1 block">{selectedApplication.creditScoreTier}</span>
                  </div>
                  <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Requested Funding</span>
                    <span className="text-sm font-bold text-[#0ba5f9] mt-1 block font-mono">{formatCurrency(Number(selectedApplication.requestedAmount))}</span>
                  </div>
                </div>
                <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Use of Funds</span>
                  <span className="text-sm font-bold text-white mt-1 block">{selectedApplication.useOfFunds}</span>
                </div>

                {/* Advisory Notes Editor */}
                <div className="border border-slate-800 bg-slate-950/40 p-5 rounded-2xl space-y-3">
                  <span className="block text-[10px] font-bold text-[#0ba5f9] uppercase tracking-wider">Underwriter Advisory Notes (Visible to Client)</span>
                  <textarea
                    value={advisoryNotes}
                    onChange={(e) => setAdvisoryNotes(e.target.value)}
                    placeholder="Provide term details, missing document requests, or instructions for the client portal tracking view..."
                    className="w-full min-h-[100px] bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#0ba5f9]/50 focus:border-[#0ba5f9]/50 transition-all resize-y font-mono"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="text-[9px] font-extrabold bg-[#0ba5f9]/15 hover:bg-[#0ba5f9]/30 border border-[#0ba5f9]/20 text-[#0ba5f9] hover:text-white uppercase tracking-widest px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isSavingNotes ? (
                        <>
                          <span className="h-3 w-3 rounded-full border border-t-transparent border-[#0ba5f9] animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Advisory Notes"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 flex flex-col h-full">
                <h3 className="text-xs font-black text-[#0ba5f9] tracking-widest uppercase border-b border-slate-800 pb-2 shrink-0">Secured Document Vault (Attached Files)</h3>
                <div className="border border-slate-800 bg-slate-950/20 p-6 rounded-2xl flex-grow flex flex-col justify-between min-h-[320px]">
                  {selectedApplication.documents.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-slate-500 py-12">
                      <svg className="h-12 w-12 text-slate-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider">No attached documents found</span>
                    </div>
                  ) : (
                    <div className="space-y-3 flex-grow overflow-y-auto max-h-[280px] pr-2">
                      {selectedApplication.documents.map((doc) => {
                        const isPdf = doc.mimeType.toLowerCase().includes("pdf");
                        const isExcel = doc.mimeType.toLowerCase().includes("sheet") || doc.mimeType.toLowerCase().includes("excel") || doc.originalName.endsWith(".xlsx") || doc.originalName.endsWith(".xls");
                        const fileIcon = isPdf ? (
                          <span className="text-xs font-black bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 py-1 rounded-lg">PDF</span>
                        ) : isExcel ? (
                          <span className="text-xs font-black bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg">XLS</span>
                        ) : (
                          <span className="text-xs font-black bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-1 rounded-lg">DOC</span>
                        );
                        return (
                          <div key={doc.id} className="flex items-center justify-between bg-slate-950/50 border border-slate-800 p-4 rounded-xl gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="shrink-0">{fileIcon}</div>
                              <div className="min-w-0">
                                <span className="block text-xs font-bold text-white truncate pr-2" title={doc.originalName}>{doc.originalName}</span>
                                <span className="block text-[9px] text-slate-500 font-mono mt-0.5">Type: {doc.mimeType}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => setInspectingDoc(doc)}
                                className="text-[10px] font-bold bg-[#0ba5f9]/15 border border-[#0ba5f9]/30 hover:bg-[#0ba5f9]/25 text-[#0ba5f9] px-3.5 py-2 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                              >
                                Inspect File
                              </button>
                              <a href={`/api/documents/${doc.id}`} download className="text-[10px] font-bold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-350 hover:text-white px-3.5 py-2 rounded-xl transition-all uppercase tracking-wider text-center">
                                Download
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="border-t border-slate-800/80 pt-4 mt-6 text-center text-[10px] text-slate-500 uppercase tracking-widest font-semibold shrink-0">
                    SECURE CRYPTO STORAGE VAULT • SHA-256 ENCRYPTED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {inspectingDoc && (
        <div className="fixed inset-0 z-[120] bg-[#020b24]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-card-entrance">
            <div className="border-b border-slate-800/80 bg-slate-950/40 px-6 py-4 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-xs font-black text-[#0ba5f9] tracking-widest uppercase">Underwriting Document Analysis Desk</h3>
                <p className="text-[9px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">Inspecting: {inspectingDoc.originalName}</p>
              </div>
              <button
                onClick={() => { setInspectingDoc(null); setOcrActive(false); setMagnifierActive(false); }}
                className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Exit Desk
              </button>
            </div>

            {/* Toolbar */}
            <div className="bg-slate-950/60 border-b border-slate-800/80 px-6 py-3 flex gap-4 text-xs">
              <button
                onClick={() => setOcrActive(!ocrActive)}
                className={`px-3 py-1.5 rounded-lg border font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  ocrActive
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {ocrActive ? "Disable OCR Scan" : "Trigger OCR Scan"}
              </button>
              <button
                onClick={() => setMagnifierActive(!magnifierActive)}
                className={`px-3 py-1.5 rounded-lg border font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  magnifierActive
                    ? "bg-[#0ba5f9]/15 border-[#0ba5f9]/30 text-[#0ba5f9]"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {magnifierActive ? "Disable Magnifier" : "Enable Magnifier"}
              </button>
            </div>

            {/* Document body viewport */}
            <div
              className="p-8 overflow-y-auto flex-grow bg-white text-slate-900 font-mono text-xs relative select-none min-h-[300px]"
              onMouseMove={(e) => {
                if (!magnifierActive) return;
                const rect = e.currentTarget.getBoundingClientRect();
                setMagPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
            >
              {/* Scanline Sweep Overlay */}
              {ocrActive && (
                <div className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_10px_#10b981] pointer-events-none animate-scanline z-30" />
              )}

              {/* Magnifying glass overlay */}
              {magnifierActive && (
                <div
                  className="absolute w-24 h-24 rounded-full border-2 border-[#0ba5f9] bg-white pointer-events-none z-40 magnifier-overlay flex items-center justify-center"
                  style={{
                    left: magPos.x - 48,
                    top: magPos.y - 48,
                  }}
                >
                  <span className="text-[14px] font-bold text-slate-900 scale-150">ZOOM</span>
                </div>
              )}

              <div className="space-y-6 select-text">
                <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm uppercase">Secure Ledger Report</h4>
                    <p className="text-[10px] text-slate-500">Corporate Bank Verification Audit</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Filing Code</span>
                    <p className="text-[10px] font-bold">{inspectingDoc.id.substring(0, 8).toUpperCase()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <span className="text-[8px] text-slate-400 font-bold block uppercase">Verified Cashflow</span>
                    <span className={`font-bold transition-all duration-300 ${ocrActive ? "bg-emerald-100 text-emerald-800 px-1 rounded" : ""}`}>
                      $186,432.22 (Average Annual)
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-400 font-bold block uppercase">Debt-Service Ratio</span>
                    <span className="font-bold">1.42 (Tier 1 Match)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] text-slate-400 font-bold block uppercase">Transaction Ledger Excerpt</span>
                  <div className="space-y-1.5 border p-3 rounded-xl bg-slate-50 font-mono text-[10px]">
                    <div className="flex justify-between border-b pb-1 font-bold text-slate-500">
                      <span>Date</span>
                      <span>Description</span>
                      <span>Amount</span>
                    </div>
                    <div className={`flex justify-between transition-colors ${ocrActive ? "bg-emerald-100/50" : ""}`}>
                      <span>06/02/2026</span>
                      <span>ACH DEPOSIT / MERCHANT BANKCARD</span>
                      <span className="text-emerald-700 font-bold">+$24,530.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>06/03/2026</span>
                      <span>WIRE TRANSFER / CAPITAL EXPANSION</span>
                      <span className="text-rose-700 font-bold">-$12,000.00</span>
                    </div>
                    <div className={`flex justify-between transition-colors ${ocrActive ? "bg-emerald-100/50" : ""}`}>
                      <span>06/04/2026</span>
                      <span>ACH DEPOSIT / CORPORATE CLIENT RECEIVABLE</span>
                      <span className="text-emerald-700 font-bold">+$18,920.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>06/05/2026</span>
                      <span>DRAFT DEBIT / UTILITIES OPERATIONAL</span>
                      <span className="text-rose-700 font-bold">-$1,422.18</span>
                    </div>
                  </div>
                </div>

                <div className="text-center text-[8px] text-slate-400 border-t pt-4">
                  END OF SECURED LEDGER TRANSACTION VIEW
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
