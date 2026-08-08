"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2, Send, MapPin, Phone, Mail, Clock, MessageCircle, Loader2, Upload, X, AlertCircle,
} from "lucide-react";
import { BRAND, SERVICES } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d\s+\-()]{10,20}$/, "Enter a valid 10-digit phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  authority: z.string().min(1, "Choose your authority area"),
  services: z.array(z.string()).min(1, "Pick at least one service"),
  otherService: z.string().optional(),
  plotSize: z.string().optional(),
  timeline: z.string().min(1, "Pick a timeline"),
  source: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const AUTHORITIES = ["BBMP", "BDA", "GBA", "BMRDA", "Other Bengaluru", "Outside Bengaluru"];
const TIMELINES = [
  { v: "urgent", l: "Urgent — under 1 month" },
  { v: "1-3m", l: "1–3 months" },
  { v: "planning", l: "Planning stage" },
  { v: "research", l: "Just researching" },
];
const SOURCES = ["Google", "JustDial", "Referral from friend/family", "Walk-in", "Social media", "Other"];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service");

  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  const {
    register, handleSubmit, formState: { errors }, reset, watch, setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      services: initialService ? [initialService] : [],
      authority: "",
      timeline: "",
    },
  });

  useEffect(() => {
    if (initialService) setValue("services", [initialService]);
  }, [initialService, setValue]);

  const onSubmit = async (data: FormData) => {
    setSubmitState("loading");
    setSubmitError("");

    const fileMeta = files.map((f) => ({ name: f.name, size: f.size, type: f.type }));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, files: fileMeta }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      // Best-effort local cache so the admin dashboard can also show recent leads
      // on this device. The email above is the authoritative delivery.
      try {
        const existing = JSON.parse(localStorage.getItem("sra-leads") || "[]");
        const lead = {
          id: `lead-${Date.now()}`,
          ...data,
          files: fileMeta,
          createdAt: new Date().toISOString(),
          read: false,
        };
        existing.unshift(lead);
        localStorage.setItem("sra-leads", JSON.stringify(existing));
      } catch (e) {
        console.error(e);
      }

      setSubmitState("success");
      reset();
      setFiles([]);
      setFileError("");
    } catch (err) {
      setSubmitState("error");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const list = e.target.files;
    if (!list) return;
    const selected = Array.from(list);
    const oversized = selected.filter((f) => f.size > 10 * 1024 * 1024);
    if (oversized.length > 0) {
      setFileError(`File "${oversized[0].name}" exceeds 10MB limit.`);
      return;
    }
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const selectedServices = watch("services") || [];

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
      {/* Form card */}
      <div className="bg-white border border-paper-300 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-blueprint">
        <AnimatePresence mode="wait">
          {submitState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 rounded-full bg-success-500/10 text-success-500 mx-auto mb-5 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display text-3xl font-bold text-navy-700 mb-2">
                Thank you!
              </h3>
              <p className="text-ink-700 mb-6 max-w-md mx-auto">
                Your enquiry has been received. We&apos;ll get back to you within 2 working hours.
                For faster response, click below to start a WhatsApp chat.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={BRAND.whatsappPrefilled}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-success-500 hover:bg-success-500/90 text-white font-semibold rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp
                </a>
                <button
                  onClick={() => setSubmitState("idle")}
                  className="px-6 py-3 border border-paper-300 hover:border-navy-600 text-ink-700 hover:text-navy-600 font-semibold rounded-lg"
                >
                  Submit another enquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-700 mb-2">
                  Get a quote.
                </h2>
                <p className="text-ink-700">
                  Fill this in. We&apos;ll respond within 2 working hours with a clear scope and fee.
                </p>
              </div>

              {/* Name + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">
                    Your name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-4 py-3 border border-paper-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 outline-none transition-all"
                    placeholder="Full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">
                    WhatsApp number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-3 border border-paper-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 outline-none transition-all"
                    placeholder="+91 9876543210"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Email + Authority */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">
                    Email <span className="text-ink-500 text-xs">(optional)</span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 border border-paper-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">
                    Your plot is in <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("authority")}
                    className="w-full px-4 py-3 border border-paper-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 outline-none transition-all bg-white"
                  >
                    <option value="">Select area</option>
                    {AUTHORITIES.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                  {errors.authority && (
                    <p className="text-red-500 text-xs mt-1">{errors.authority.message}</p>
                  )}
                </div>
              </div>

              {/* Services multi-select */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  What do you need? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.map((s) => {
                    const checked = selectedServices.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex items-center gap-3 px-3 py-2.5 border rounded-lg cursor-pointer transition-colors ${
                          checked
                            ? "border-navy-600 bg-navy-50"
                            : "border-paper-300 hover:border-paper-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={s.id}
                          {...register("services")}
                          className="w-4 h-4 text-navy-600 border-paper-300 rounded focus:ring-navy-600"
                        />
                        <span className="text-sm text-ink-700">{s.title}</span>
                      </label>
                    );
                  })}
                  <label
                    className={`flex items-center gap-3 px-3 py-2.5 border rounded-lg cursor-pointer transition-colors ${
                      selectedServices.includes("other")
                        ? "border-navy-600 bg-navy-50"
                        : "border-paper-300 hover:border-paper-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value="other"
                      {...register("services")}
                      className="w-4 h-4 text-navy-600 border-paper-300 rounded focus:ring-navy-600"
                    />
                    <span className="text-sm text-ink-700">Others</span>
                  </label>
                </div>
                {errors.services && (
                  <p className="text-red-500 text-xs mt-1">{errors.services.message}</p>
                )}
                {selectedServices.includes("other") && (
                  <input
                    type="text"
                    {...register("otherService")}
                    className="mt-2 w-full px-4 py-3 border border-paper-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 outline-none transition-all"
                    placeholder="Please specify what you need"
                  />
                )}
              </div>

              {/* Plot size + Timeline */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">
                    Plot size <span className="text-ink-500 text-xs">(e.g. 30×40, 1200 sqft)</span>
                  </label>
                  <input
                    type="text"
                    {...register("plotSize")}
                    className="w-full px-4 py-3 border border-paper-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 outline-none transition-all"
                    placeholder="30×40 ft"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">
                    Timeline <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("timeline")}
                    className="w-full px-4 py-3 border border-paper-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 outline-none transition-all bg-white"
                  >
                    <option value="">Select timeline</option>
                    {TIMELINES.map((t) => (
                      <option key={t.v} value={t.v}>{t.l}</option>
                    ))}
                  </select>
                  {errors.timeline && (
                    <p className="text-red-500 text-xs mt-1">{errors.timeline.message}</p>
                  )}
                </div>
              </div>

              {/* Source */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  How did you hear about us? <span className="text-ink-500 text-xs">(optional)</span>
                </label>
                <select
                  {...register("source")}
                  className="w-full px-4 py-3 border border-paper-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 outline-none transition-all bg-white"
                >
                  <option value="">Choose</option>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  Anything else? <span className="text-ink-500 text-xs">(optional)</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={3}
                  className="w-full px-4 py-3 border border-paper-300 rounded-lg focus:border-navy-600 focus:ring-2 focus:ring-navy-600/10 outline-none transition-all resize-none"
                  placeholder="Tell us more about your project..."
                />
              </div>

              {/* File upload */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  Attach site photos / documents <span className="text-ink-500 text-xs">(optional)</span>
                </label>
                <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-paper-300 rounded-lg cursor-pointer hover:border-navy-600 hover:bg-paper-100 transition-colors">
                  <Upload className="w-6 h-6 text-ink-500 mb-2" />
                  <span className="text-sm text-ink-700 font-medium">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-ink-500 mt-1">PDF, JPG, PNG (max 10MB each)</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    onChange={onFileChange}
                    className="hidden"
                  />
                </label>
                {fileError && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{fileError}</p>
                )}
                {files.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {files.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between text-sm bg-paper-100 px-3 py-2 rounded-lg"
                      >
                        <span className="truncate">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-ink-500 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {submitState === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-navy-600 hover:bg-navy-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
              >
                {submitState === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Enquiry
                  </>
                )}
              </button>

              <p className="text-xs text-ink-500 text-center">
                By submitting, you agree to be contacted by Sri Ranganatha Associates. We never spam.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {/* Direct contact card */}
        <div className="bg-navy-600 text-white rounded-3xl p-6 lg:p-8">
          <h3 className="font-display text-2xl font-bold mb-2">Prefer to talk directly?</h3>
          <p className="text-paper-200 text-sm mb-6">
            Skip the form. Call or WhatsApp us — we usually answer in under 5 minutes during business
            hours.
          </p>

          <div className="space-y-3">
            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-400 text-navy-900 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-paper-200">Call us</div>
                <div className="font-semibold">{BRAND.phone}</div>
              </div>
            </a>

            <a
              href={BRAND.whatsappPrefilled}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-success-500 text-white flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-paper-200">WhatsApp</div>
                <div className="font-semibold">Chat now</div>
              </div>
            </a>

            <a
              href={`mailto:${BRAND.email}`}
              className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-paper-100 text-navy-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-paper-200">Email</div>
                <div className="font-semibold break-all text-sm">{BRAND.email}</div>
              </div>
            </a>
          </div>
        </div>

        {/* Visit card */}
        <div className="bg-white border border-paper-300 rounded-3xl p-6 lg:p-8">
          <h3 className="font-display text-xl font-bold text-navy-700 mb-4">Visit our office</h3>

          <div className="space-y-3 text-sm text-ink-700">
            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                {BRAND.address.line1}
                <br />
                {BRAND.address.line2}
                <br />
                {BRAND.address.city} – {BRAND.address.pincode}
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>{BRAND.hours}</div>
            </div>
          </div>

          <div className="mt-5 aspect-video rounded-xl overflow-hidden border border-paper-300">
            <iframe
              src="https://www.google.com/maps?q=Cauvery+Complex%2C+129%2C+Old+Madras+Rd%2C+near+Ulsoor%2C+Halasuru%2C+Lingayana+Palya%2C+Bengaluru%2C+Karnataka+560008&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
