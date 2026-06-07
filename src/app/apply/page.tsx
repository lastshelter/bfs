"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ApplicationFormProvider,
  useApplicationForm,
  useFormStepTransition,
  wizardSchema,
  WizardData,
} from "@/core/providers/ApplicationFormProvider";

function ApplyPageContent(): React.JSX.Element {
  const router = useRouter();
  const { state, dispatch } = useApplicationForm();
  const { handleNext, handlePrev, validateField } = useFormStepTransition();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleInputChange = (field: keyof WizardData, value: string | number) => {
    dispatch({ type: "UPDATE_FIELD", payload: { field, value } });
    validateField(field, value);
  };

  const handleWizardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_ERROR_MESSAGE", payload: null });

    const validationResult = wizardSchema.safeParse(state.formData);
    if (!validationResult.success) {
      const flatErrors = validationResult.error.flatten().fieldErrors;
      const formattedErrors: Partial<Record<keyof WizardData, string>> = {};
      Object.keys(flatErrors).forEach((key) => {
        const errorsList = flatErrors[key as keyof WizardData];
        if (errorsList && errorsList[0]) {
          formattedErrors[key as keyof WizardData] = errorsList[0];
        }
      });
      dispatch({ type: "SET_ERRORS", payload: formattedErrors });
      return;
    }

    dispatch({ type: "SET_SUBMITTING", payload: true });

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.formData),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: data.message || "Something went wrong during submission.",
        });
        return;
      }

      dispatch({ type: "SET_APPLICATION_ID", payload: data.applicationId });
      dispatch({ type: "SET_STEP", payload: 4 });
    } catch {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "A network error occurred. Please check your connection and try again.",
      });
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) {
      return;
    }
    const file = fileList[0];
    if (!file) return;

    if (!state.applicationId) {
      setUploadError("Application identifier is missing. Please submit company details first.");
      return;
    }

    setUploading(true);
    setUploadError(null);

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("applicationId", state.applicationId);

    try {
      const response = await fetch("/api/apply/document", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (!response.ok) {
        setUploadError(data.message || "File upload failed.");
        return;
      }

      dispatch({ type: "ADD_UPLOADED_FILE", payload: file.name });
    } catch {
      setUploadError("Network connection failed during document upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleFinish = () => {
    dispatch({ type: "RESET_FORM" });
    router.push("/apply/success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020b24] to-[#06153b] text-white flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-brand-navy-light/40 bg-brand-dark/50 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display font-bold text-lg text-white tracking-widest flex flex-col leading-none">
            <span className="text-sm tracking-wider">BIGGS</span>
            <span className="text-xs text-[#0ba5f9] tracking-widest font-extrabold mt-0.5">FUNDING SOLUTIONS</span>
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-smooth">
            Cancel
          </Link>
        </div>
      </header>

      {/* Main Wizard */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ba5f9]/10 rounded-full blur-3xl -z-10" />

          {/* Stepper Header */}
          <div className="flex justify-between items-center mb-8 border-b border-slate-800/60 pb-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
                    state.step === num
                      ? "bg-[#0ba5f9] text-white ring-4 ring-[#0ba5f9]/20"
                      : state.step > num
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-900 border border-slate-800 text-slate-500"
                  }`}
                >
                  {state.step > num ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    num
                  )}
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider hidden sm:inline ${
                    state.step === num ? "text-[#0ba5f9]" : "text-slate-500"
                  }`}
                >
                  {num === 1 ? "Contact" : num === 2 ? "Company" : num === 3 ? "Funding" : "Uploads"}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={state.step === 3 ? handleWizardSubmit : (e) => e.preventDefault()} className="space-y-6">
            {state.errorMessage && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 text-xs rounded-lg p-4">
                {state.errorMessage}
              </div>
            )}

            {/* STEP 1: Contact Profiling */}
            {state.step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-white">Contact Profiling</h2>
                <p className="text-slate-400 text-xs">Please provide the primary contact details for this business application.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={state.formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Jane"
                      required
                      className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#0ba5f9] transition-smooth"
                    />
                    {state.errors.firstName && <p className="text-red-400 text-[10px] mt-1">{state.errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={state.formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Doe"
                      required
                      className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#0ba5f9] transition-smooth"
                    />
                    {state.errors.lastName && <p className="text-red-400 text-[10px] mt-1">{state.errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Corporate Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={state.formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="jane.doe@company.com"
                    required
                    className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#0ba5f9] transition-smooth"
                  />
                  {state.errors.email && <p className="text-red-400 text-[10px] mt-1">{state.errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Corporate Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={state.formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="555-555-5555"
                    required
                    className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#0ba5f9] transition-smooth"
                  />
                  {state.errors.phone && <p className="text-red-400 text-[10px] mt-1">{state.errors.phone}</p>}
                </div>
              </div>
            )}

            {/* STEP 2: Company Verification */}
            {state.step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-white">Company Verification</h2>
                <p className="text-slate-400 text-xs">Verify your corporate details as listed on IRS or legal registration files.</p>

                <div>
                  <label htmlFor="legalName" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Legal Business Name
                  </label>
                  <input
                    type="text"
                    id="legalName"
                    value={state.formData.legalName}
                    onChange={(e) => handleInputChange("legalName", e.target.value)}
                    placeholder="Acme Corporation LLC"
                    required
                    className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#0ba5f9] transition-smooth"
                  />
                  {state.errors.legalName && <p className="text-red-400 text-[10px] mt-1">{state.errors.legalName}</p>}
                </div>

                <div>
                  <label htmlFor="ein" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Corporate EIN (Tax ID)
                  </label>
                  <input
                    type="text"
                    id="ein"
                    value={state.formData.ein}
                    onChange={(e) => handleInputChange("ein", e.target.value)}
                    placeholder="12-3456789"
                    required
                    className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#0ba5f9] transition-smooth"
                  />
                  {state.errors.ein && <p className="text-red-400 text-[10px] mt-1">{state.errors.ein}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="timeInBusiness" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Time In Business
                    </label>
                    <select
                      id="timeInBusiness"
                      value={state.formData.timeInBusiness || ""}
                      onChange={(e) => handleInputChange("timeInBusiness", e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#0ba5f9] transition-smooth cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#020b24]">Select Time</option>
                      <option value="< 6 Months" className="bg-[#020b24]">&lt; 6 Months</option>
                      <option value="6-12 Months" className="bg-[#020b24]">6-12 Months</option>
                      <option value="1-3 Years" className="bg-[#020b24]">1-3 Years</option>
                      <option value="3+ Years" className="bg-[#020b24]">3+ Years</option>
                    </select>
                    {state.errors.timeInBusiness && <p className="text-red-400 text-[10px] mt-1">{state.errors.timeInBusiness}</p>}
                  </div>

                  <div>
                    <label htmlFor="useOfFunds" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Use of Funds
                    </label>
                    <select
                      id="useOfFunds"
                      value={state.formData.useOfFunds || ""}
                      onChange={(e) => handleInputChange("useOfFunds", e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#0ba5f9] transition-smooth cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#020b24]">Select Use</option>
                      <option value="Working Capital" className="bg-[#020b24]">Working Capital</option>
                      <option value="Equipment Purchase" className="bg-[#020b24]">Equipment Purchase</option>
                      <option value="Inventory Expansion" className="bg-[#020b24]">Inventory Expansion</option>
                      <option value="Marketing Campaign" className="bg-[#020b24]">Marketing Campaign</option>
                      <option value="Debt Consolidation" className="bg-[#020b24]">Debt Consolidation</option>
                    </select>
                    {state.errors.useOfFunds && <p className="text-red-400 text-[10px] mt-1">{state.errors.useOfFunds}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Funding Configuration */}
            {state.step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-white">Funding Configuration</h2>
                <p className="text-slate-400 text-xs">Select your estimated annual revenue and the funding capital amount you need.</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">Annual Revenue</span>
                    <span className="font-display font-extrabold text-[#e08b00]">${state.formData.revenueAnnual.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="5000000"
                    step="25000"
                    value={state.formData.revenueAnnual}
                    onChange={(e) => handleInputChange("revenueAnnual", Number(e.target.value))}
                    className="w-full accent-[#0ba5f9] bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                  {state.errors.revenueAnnual && <p className="text-red-400 text-[10px]">{state.errors.revenueAnnual}</p>}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">Requested Funding</span>
                    <span className="font-display font-extrabold text-[#0ba5f9]">${state.formData.requestedAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="5000"
                    value={state.formData.requestedAmount}
                    onChange={(e) => handleInputChange("requestedAmount", Number(e.target.value))}
                    className="w-full accent-[#0ba5f9] bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                  {state.errors.requestedAmount && <p className="text-red-400 text-[10px]">{state.errors.requestedAmount}</p>}
                </div>

                <div>
                  <label htmlFor="creditScoreTier" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Estimated Credit Score
                  </label>
                  <select
                    id="creditScoreTier"
                    value={state.formData.creditScoreTier || ""}
                    onChange={(e) => handleInputChange("creditScoreTier", e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#0ba5f9] transition-smooth cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#020b24]">Select Credit Tier</option>
                    <option value="Excellent (720+)" className="bg-[#020b24]">Excellent (720+)</option>
                    <option value="Good (650-719)" className="bg-[#020b24]">Good (650-719)</option>
                    <option value="Fair (600-649)" className="bg-[#020b24]">Fair (600-649)</option>
                    <option value="Poor (< 600)" className="bg-[#020b24]">Poor (&lt; 600)</option>
                  </select>
                  {state.errors.creditScoreTier && <p className="text-red-400 text-[10px] mt-1">{state.errors.creditScoreTier}</p>}
                </div>
              </div>
            )}

            {/* STEP 4: Document Upload */}
            {state.step === 4 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-white">Upload Financial Documents</h2>
                <p className="text-slate-400 text-xs">Please upload bank statements or tax returns to speed up underwriting review.</p>

                {uploadError && (
                  <div className="bg-red-500/20 border border-red-500 text-red-200 text-xs rounded-lg p-3">
                    {uploadError}
                  </div>
                )}

                {/* Upload drag drop panel */}
                <div className="border-2 border-dashed border-slate-800 hover:border-[#0ba5f9]/50 rounded-2xl p-8 text-center bg-slate-950/20 transition-smooth relative cursor-pointer group">
                  <input
                    type="file"
                    id="docFile"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <svg className="mx-auto h-8 w-8 text-slate-500 group-hover:text-[#0ba5f9] transition-smooth" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-xs font-semibold text-slate-350">
                      {uploading ? "Uploading secured file..." : "Click or drag file here to upload"}
                    </div>
                    <p className="text-[10px] text-slate-550">Supports PDF, PNG, JPG (Max 10MB)</p>
                  </div>
                </div>

                {/* List of uploaded files */}
                {state.uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Securely Uploaded Files</h4>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {state.uploadedFiles.map((fileName, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-950/45 p-3 rounded-xl border border-slate-900 text-[11px] font-mono text-slate-300">
                          <span className="truncate pr-4">{fileName}</span>
                          <span className="text-[9px] font-bold text-emerald-450 uppercase flex items-center gap-1">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Encrypted
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-slate-800/60 mt-8">
              {state.step > 1 && state.step < 4 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-2.5 text-xs font-bold text-slate-450 border border-slate-800 hover:bg-slate-900 rounded-xl transition-smooth"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {state.step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0ba5f9] hover:bg-[#008ee3] rounded-xl transition-smooth"
                >
                  Continue
                </button>
              ) : state.step === 3 ? (
                <button
                  type="submit"
                  disabled={state.isSubmitting}
                  className={`px-8 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#e08b00] hover:bg-[#d67d00] rounded-xl transition-smooth ${
                    state.isSubmitting ? "opacity-55 cursor-not-allowed" : ""
                  }`}
                >
                  {state.isSubmitting ? "Securing Financial Records..." : "Continue to Uploads"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  disabled={uploading}
                  className="px-8 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-smooth"
                >
                  Finish Application
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-brand-navy-light/40 bg-brand-dark/20 text-center text-[10px] text-slate-500">
        © 2026 Biggs Funding Solutions. Secure SSL Encrypted.
      </footer>
    </div>
  );
}

export default function ApplyPage(): React.JSX.Element {
  return (
    <ApplicationFormProvider>
      <ApplyPageContent />
    </ApplicationFormProvider>
  );
}
