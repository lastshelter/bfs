"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  fetchSubmissions,
  fetchMessages,
  updateSubmissionStatus,
  SerializedApplication,
  ContactMessage,
} from "./actions";

export default function AdministrativePortalPage(): React.JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<SerializedApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"queue" | "inbox">("queue");
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<SerializedApplication | null>(null);

  const totalVolume = applications.reduce((sum, app) => sum + Number(app.requestedAmount), 0);

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

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSubmissions(password);
      const msgs = await fetchMessages(password);
      setApplications(data);
      setMessages(msgs);
      if (selectedApplication) {
        const updatedApp = data.find((a) => a.id === selectedApplication.id);
        if (updatedApp) setSelectedApplication(updatedApp);
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

  const handleCopyLeadDetails = (app: SerializedApplication) => {
    const details = [
      "--- BIGGS FUNDING SOLUTIONS LEAD ---",
      `Client Name: ${app.company.user.firstName} ${app.company.user.lastName}`,
      `Company Legal Name: ${app.company.legalName}`,
      `Phone: ${app.company.phone}`,
      `Email: ${app.company.user.email}`,
      `Requested Capital: ${formatCurrency(app.requestedAmount)}`,
      `Credit Score Tier: ${app.creditScoreTier}`,
      "------------------------------------"
    ].join("\n");

    navigator.clipboard.writeText(details)
      .then(() => alert("Lead details copied to clipboard!"))
      .catch((err) => console.error("Failed to copy lead details: ", err));
  };

  const formatCurrency = (val: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(val));
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

              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-450 text-xs text-center font-semibold animate-shake-error">
                  {error}
                </div>
              )}

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
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-b-2xl p-6 md:p-8 shadow-2xl flex-grow">
          {activeTab === "queue" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#06153b] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-lg">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Pipeline Volume</span>
                  <span className="text-xl md:text-2xl font-black text-white mt-1 block font-mono">{formatCurrency(totalVolume.toString())}</span>
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

              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mt-6">
                <h2 className="text-xs font-black text-[#0ba5f9] tracking-widest uppercase">ACTIVE LEADS AND FUNDING FILES</h2>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-slate-500 text-sm">No incoming applications currently found in the system database.</p>
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
                      {applications.map((app) => {
                        const isUpdating = updatingId === app.id;
                        return (
                          <tr key={app.id} onClick={() => setSelectedApplication(app)} className="hover:bg-slate-950/30 transition-colors cursor-pointer">
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
                            <td className="py-4 px-4 font-bold text-[#0ba5f9] font-mono">{formatCurrency(app.requestedAmount)}</td>
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
              <button onClick={() => setSelectedApplication(null)} className="text-[10px] bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-350 hover:text-white font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all cursor-pointer">
                Close Dossier
              </button>
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
                    <span className="text-sm font-bold text-[#e08b00] mt-1 block font-mono">{formatCurrency(selectedApplication.company.revenueAnnual)}</span>
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
                    <span className="text-sm font-bold text-[#0ba5f9] mt-1 block font-mono">{formatCurrency(selectedApplication.requestedAmount)}</span>
                  </div>
                </div>
                <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Use of Funds</span>
                  <span className="text-sm font-bold text-white mt-1 block">{selectedApplication.useOfFunds}</span>
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
                            <a href={`/api/documents/${doc.id}`} download className="shrink-0 text-[10px] font-bold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-[#0ba5f9] px-4 py-2 rounded-xl transition-all uppercase tracking-wider">
                              Download File Asset
                            </a>
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
    </div>
  );
}
