"use client";

import React, { useState } from "react";

export interface MappedApplication {
  readonly id: string;
  readonly token: string;
  readonly createdAt: string;
  readonly requestedAmount: number;
  readonly status: string;
  readonly timeInBusiness?: string | null;
  readonly useOfFunds?: string | null;
  readonly creditScoreTier?: string | null;
  readonly company: {
    readonly id: string;
    readonly legalName: string;
    readonly revenueAnnual: number;
    readonly phone: string;
    readonly user: {
      readonly firstName: string;
      readonly lastName: string;
      readonly email: string;
    };
  };
}

interface DecryptedMetadata {
  readonly userAgent: string;
  readonly ip: string;
  readonly timestamp: string;
}

interface DecryptedAuditLog {
  readonly timestamp: string;
  readonly status: string;
  readonly event: string;
  readonly actor: string;
}

interface DecryptedDocument {
  readonly id: string;
  readonly originalName: string;
  readonly mimeType: string;
  readonly uploadedAt: string;
}

interface DecryptedData {
  readonly ein: string;
  readonly revenueAnnual: number;
  readonly metadata: DecryptedMetadata | null;
  readonly logs: readonly DecryptedAuditLog[] | null;
  readonly documents: readonly DecryptedDocument[] | null;
}

interface AdminTableProps {
  readonly initialApplications: readonly MappedApplication[];
}

export default function AdminTable({ initialApplications }: AdminTableProps): React.JSX.Element {
  const [applications, setApplications] = useState<readonly MappedApplication[]>(initialApplications);
  const [decryptedRecords, setDecryptedRecords] = useState<Record<string, DecryptedData>>({});
  const [loadingRecords, setLoadingRecords] = useState<Record<string, boolean>>({});
  const [errorRecords, setErrorRecords] = useState<Record<string, string>>({});
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [updatingStatus, setUpdatingStatus] = useState<Record<string, boolean>>({});

  const handleReview = async (appId: string) => {
    setLoadingRecords((prev) => ({ ...prev, [appId]: true }));
    setErrorRecords((prev) => ({ ...prev, [appId]: "" }));

    try {
      const response = await fetch("/api/admin/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applicationId: appId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorRecords((prev) => ({
          ...prev,
          [appId]: data.message || "Failed to decrypt record.",
        }));
        return;
      }

      setDecryptedRecords((prev) => ({
        ...prev,
        [appId]: {
          ein: data.ein,
          revenueAnnual: data.revenueAnnual,
          metadata: data.metadata,
          logs: data.logs,
          documents: data.documents,
        },
      }));
      setExpandedRows((prev) => ({ ...prev, [appId]: true }));
    } catch {
      setErrorRecords((prev) => ({
        ...prev,
        [appId]: "Network error occurred during decryption.",
      }));
    } finally {
      setLoadingRecords((prev) => ({ ...prev, [appId]: false }));
    }
  };

  const handleStatusChange = async (appId: string, newStatus: string) => {
    setUpdatingStatus((prev) => ({ ...prev, [appId]: true }));
    setErrorRecords((prev) => ({ ...prev, [appId]: "" }));

    try {
      const response = await fetch("/api/admin/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applicationId: appId, status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorRecords((prev) => ({
          ...prev,
          [appId]: data.message || "Failed to update status.",
        }));
        return;
      }

      // Update local applications state
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );

      // Refresh decryption/logs if already decrypted
      if (decryptedRecords[appId]) {
        await handleReview(appId);
      }
    } catch {
      setErrorRecords((prev) => ({
        ...prev,
        [appId]: "Network error occurred during status modification.",
      }));
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [appId]: false }));
    }
  };

  const toggleExpand = (appId: string) => {
    setExpandedRows((prev) => {
      const isExpanded = prev[appId];
      return {
        ...prev,
        [appId]: !isExpanded,
      };
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "DENIED":
        return "bg-red-500/10 border-red-500/30 text-red-400";
      case "IN_REVIEW":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      case "SUBMITTED":
        return "bg-[#0ba5f9]/10 border-[#0ba5f9]/30 text-[#0ba5f9]";
      case "FUNDED":
        return "bg-purple-500/10 border-purple-500/30 text-purple-400";
      default:
        return "bg-slate-500/10 border-slate-500/30 text-slate-400";
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-950/40 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              <th className="px-6 py-4">Date Filed</th>
              <th className="px-6 py-4">Client Contact</th>
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Requested Funding</th>
              <th className="px-6 py-4">Status Flow</th>
              <th className="px-6 py-4">Secure Tax ID (EIN)</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-500">
                  No funding applications found in database records.
                </td>
              </tr>
            ) : (
              applications.map((app) => {
                const decrypted = decryptedRecords[app.id];
                const isLoading = loadingRecords[app.id];
                const isStatusUpdating = !!updatingStatus[app.id];
                const error = errorRecords[app.id];
                const isExpanded = !!expandedRows[app.id];

                return (
                  <React.Fragment key={app.id}>
                    <tr className="hover:bg-slate-950/20 transition-smooth">
                      <td className="px-6 py-4 text-slate-450 whitespace-nowrap">
                        {formatDate(app.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">
                          {app.company.user.firstName} {app.company.user.lastName}
                        </div>
                        <div className="text-[10px] text-slate-550">{app.company.user.email}</div>
                        <div className="text-[10px] text-slate-550">{app.company.phone}</div>
                        <a
                          href={`/portal/track?token=${encodeURIComponent(app.token)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[#0ba5f9] hover:underline block mt-1"
                        >
                          [ Test Client Upload Portal ]
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{app.company.legalName}</div>
                        <div className="text-[10px] text-slate-550 flex items-center gap-1.5 mt-0.5">
                          <span>Ann. Rev:</span>
                          {decrypted ? (
                            <span className="text-[#e08b00] font-bold">
                              {formatCurrency(decrypted.revenueAnnual)}
                            </span>
                          ) : (
                            <span className="text-slate-500 font-semibold italic">Masked</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        {formatCurrency(app.requestedAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <select
                            value={app.status}
                            disabled={isStatusUpdating}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className={`px-2 py-1 text-[10px] font-bold rounded-lg border focus:outline-none cursor-pointer bg-slate-900 ${getStatusBadgeClass(
                              app.status
                            )}`}
                          >
                            <option value="DRAFT">DRAFT</option>
                            <option value="SUBMITTED">SUBMITTED</option>
                            <option value="IN_REVIEW">IN REVIEW</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="FUNDED">FUNDED</option>
                            <option value="DENIED">DENIED</option>
                          </select>
                          {isStatusUpdating && (
                            <span className="text-[9px] text-[#0ba5f9] animate-pulse">Syncing...</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {decrypted ? (
                          <code className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[#e08b00] font-mono font-bold tracking-wider">
                            {decrypted.ein}
                          </code>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-655 font-mono tracking-widest">•••••••••</span>
                            {isLoading && (
                              <span className="text-[9px] text-[#0ba5f9] animate-pulse">Decrypting...</span>
                            )}
                          </div>
                        )}
                        {error && <p className="text-red-400 text-[10px] mt-1">{error}</p>}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        {decrypted ? (
                          <button
                            type="button"
                            onClick={() => toggleExpand(app.id)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-[10px] uppercase tracking-wider transition-smooth"
                          >
                            {isExpanded ? "Hide Details" : "Show Details"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleReview(app.id)}
                            disabled={isLoading}
                            className="px-3.5 py-1.5 bg-[#0ba5f9]/15 hover:bg-[#0ba5f9]/30 border border-[#0ba5f9]/20 text-[#0ba5f9] hover:text-white rounded-lg font-bold text-[10px] tracking-wider uppercase transition-smooth disabled:opacity-50"
                          >
                            Review Record
                          </button>
                        )}
                      </td>
                    </tr>
                    
                    {/* Collapsible Decrypted Details Sub-Row */}
                    {decrypted && isExpanded && (
                      <tr className="bg-slate-950/40">
                        <td colSpan={7} className="px-8 py-5 border-t border-slate-800/40 border-b border-slate-800/40">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            {/* Session Metadata Panel */}
                            <div className="md:col-span-4 space-y-3">
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0ba5f9]">
                                Secure Session Metadata (AES Decrypted)
                              </h4>
                              {decrypted.metadata ? (
                                <div className="space-y-1 text-slate-350 text-[11px] font-mono leading-relaxed bg-slate-900/60 p-4 border border-slate-800/80 rounded-xl">
                                  <div>
                                    <span className="text-slate-500 font-bold">IP ADDRESS:</span> {decrypted.metadata.ip}
                                  </div>
                                  <div className="truncate" title={decrypted.metadata.userAgent}>
                                    <span className="text-slate-500 font-bold">USER AGENT:</span> {decrypted.metadata.userAgent}
                                  </div>
                                  <div>
                                    <span className="text-slate-500 font-bold">STAMP:</span> {formatDate(decrypted.metadata.timestamp)}
                                  </div>
                                </div>
                              ) : (
                                <p className="text-slate-550 italic text-[11px]">No session metadata logs found.</p>
                              )}

                              {/* Corporate Qualifications */}
                              {(app.timeInBusiness || app.useOfFunds || app.creditScoreTier) && (
                                <div className="pt-2">
                                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2">
                                    Corporate Qualifications
                                  </h4>
                                  <div className="space-y-1 bg-slate-900/60 p-4 border border-slate-800/80 rounded-xl text-slate-350 text-[11px] font-mono leading-relaxed">
                                    {app.timeInBusiness && (
                                      <div>
                                        <span className="text-slate-500 font-bold">TIME IN BUSINESS:</span> {app.timeInBusiness}
                                      </div>
                                    )}
                                    {app.useOfFunds && (
                                      <div>
                                        <span className="text-slate-500 font-bold">USE OF FUNDS:</span> {app.useOfFunds}
                                      </div>
                                    )}
                                    {app.creditScoreTier && (
                                      <div>
                                        <span className="text-slate-500 font-bold">CREDIT TIER:</span> {app.creditScoreTier}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Documents Section */}
                              <div className="pt-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-450 mb-2">
                                  Secured Financial Files ({decrypted.documents?.length ?? 0})
                                </h4>
                                {decrypted.documents && decrypted.documents.length > 0 ? (
                                  <div className="space-y-1.5">
                                    {decrypted.documents.map((doc) => (
                                      <div key={doc.id} className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl flex items-center justify-between text-[10px]">
                                        <div className="truncate pr-2">
                                          <div className="font-semibold text-slate-200 truncate">{doc.originalName}</div>
                                          <div className="text-[9px] text-slate-500 font-mono mt-0.5">{doc.mimeType}</div>
                                        </div>
                                        <span className="text-[8px] font-bold text-slate-500 whitespace-nowrap">
                                          {new Date(doc.uploadedAt).toLocaleDateString()}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-slate-550 italic text-[11px]">No financial documents uploaded.</p>
                                )}
                              </div>
                            </div>

                            {/* Audit Log Panel */}
                            <div className="md:col-span-8 space-y-3">
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#e08b00]">
                                Secured Status Tracking History (AES Decrypted)
                              </h4>
                              {decrypted.logs && decrypted.logs.length > 0 ? (
                                <div className="space-y-2.5 max-h-56 overflow-y-auto bg-slate-900/60 p-4 border border-slate-800/80 rounded-xl">
                                  {decrypted.logs.map((log, index) => (
                                    <div key={index} className="border-b border-slate-800/30 last:border-0 pb-2 last:pb-0 text-[11px]">
                                      <div className="flex justify-between items-center text-[9px] text-slate-500 mb-0.5">
                                        <span>{formatDate(log.timestamp)}</span>
                                        <span className={`px-1.5 py-0.5 rounded font-bold border ${getStatusBadgeClass(log.status)}`}>
                                          {log.status}
                                        </span>
                                      </div>
                                      <p className="text-slate-350 leading-normal">{log.event}</p>
                                      <span className="text-[9px] text-slate-550 font-bold">Actor: {log.actor}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-slate-550 italic text-[11px]">No status logs recorded.</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
