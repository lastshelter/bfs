import React from 'react';

// 1. Explicitly define what an Application object looks like so the compiler passes safely
interface MappedApplication {
  id: string;
  clientName?: string;
  status?: string;
  createdAt?: string | Date;
}

interface AdminDashboardProps {
  applications?: MappedApplication[];
}

export default function AdminDashboard({ applications = [] }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-[#020b24] p-4 md:p-8 text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* HEADER CONTROL BLOCK */}
        <div className="mb-8 border-b border-slate-800 pb-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Underwriter Control Desk
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time commercial intake files and verification pipeline.
          </p>
        </div>

        {/* DATA CONTAINER MATRIX */}
        <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <h2 className="text-xs font-bold text-[#0ba5f9] tracking-wider uppercase mb-4">
            Active Incoming Inquiries
          </h2>

          {applications.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg">
              <p className="text-sm text-slate-500">No active client files currently pending assignment.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="py-3 px-4">File ID</th>
                    <th className="py-3 px-4">Entity/Client</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Added explicit type argument (app: MappedApplication) to clear the error instantly */}
                  {applications.map((app: MappedApplication) => {
                    return (
                      <tr key={app.id} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                        <td className="py-3 px-4 font-mono text-xs text-[#0ba5f9]">{app.id}</td>
                        <td className="py-3 px-4 font-medium text-slate-200">{app.clientName || 'Commercial Inquiry'}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {app.status || 'Pending Review'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
