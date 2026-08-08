"use client";

// LocalStorage-based admin data store.
// In production, swap this for a real backend (Supabase, Firebase, etc.) —
// the interface stays the same.

import { useEffect, useState, useCallback } from "react";
import { DEFAULT_PORTFOLIO } from "./constants";

const KEYS = {
  auth: "sra-admin-auth",
  portfolio: "sra-portfolio",
  files: "sra-files",
  leads: "sra-leads",
};

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  type: string;
  location: string;
  year: number;
  image: string;
  tags: string[];
  description: string;
  order: number;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string; // mime or label
  size: number;
  url: string; // data URL or path
  category: string; // Sanction Plan, Working Plan, Structure Details, Other
  uploadedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  authority: string;
  services: string[];
  plotSize?: string;
  timeline: string;
  source?: string;
  message?: string;
  files?: { name: string; size: number; type: string }[];
  createdAt: string;
  read: boolean;
}

// ── Auth ───────────────────────────────────────────────────────
export const isAuthenticated = () =>
  typeof window !== "undefined" && localStorage.getItem(KEYS.auth) === "1";

export const logout = () => {
  localStorage.removeItem(KEYS.auth);
  localStorage.removeItem("sra-admin-username");
};

// ── Portfolio ──────────────────────────────────────────────────
export const getPortfolio = (): PortfolioItem[] => {
  if (typeof window === "undefined") {
    return DEFAULT_PORTFOLIO.map((p, i) => ({ ...p, order: i }));
  }
  try {
    const raw = localStorage.getItem(KEYS.portfolio);
    if (!raw) return DEFAULT_PORTFOLIO.map((p, i) => ({ ...p, order: i }));
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PORTFOLIO.map((p, i) => ({ ...p, order: i }));
  }
};

export const savePortfolio = (items: PortfolioItem[]) => {
  try {
    localStorage.setItem(KEYS.portfolio, JSON.stringify(items));
  } catch (err) {
    console.error("LocalStorage save error:", err);
    throw new Error("Storage quota exceeded. Try using compressed or smaller images.");
  }
};

export const resetPortfolio = () => {
  localStorage.removeItem(KEYS.portfolio);
};

export const addPortfolioItem = (item: Omit<PortfolioItem, "id" | "order">) => {
  const list = getPortfolio();
  const newItem: PortfolioItem = {
    ...item,
    id: `p-${Date.now()}`,
    order: list.length,
  };
  list.push(newItem);
  savePortfolio(list);
  return newItem;
};

export const updatePortfolioItem = (id: string, patch: Partial<PortfolioItem>) => {
  const list = getPortfolio();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return;
  list[idx] = { ...list[idx], ...patch };
  savePortfolio(list);
};

export const deletePortfolioItem = (id: string) => {
  const list = getPortfolio().filter((p) => p.id !== id);
  savePortfolio(list);
};

export const reorderPortfolio = (newOrder: PortfolioItem[]) => {
  newOrder.forEach((p, i) => (p.order = i));
  savePortfolio(newOrder);
};

// ── Files ──────────────────────────────────────────────────────
export const getFiles = (): UploadedFile[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.files);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const addFile = (file: Omit<UploadedFile, "id" | "uploadedAt">) => {
  const list = getFiles();
  const newFile: UploadedFile = {
    ...file,
    id: `f-${Date.now()}`,
    uploadedAt: new Date().toISOString(),
  };
  list.unshift(newFile);
  try {
    localStorage.setItem(KEYS.files, JSON.stringify(list));
  } catch (err) {
    console.error("LocalStorage save error:", err);
    throw new Error("Storage quota exceeded. Please remove some files.");
  }
  return newFile;
};

export const deleteFile = (id: string) => {
  const list = getFiles().filter((f) => f.id !== id);
  localStorage.setItem(KEYS.files, JSON.stringify(list));
};

// ── Leads ──────────────────────────────────────────────────────
export const getLeads = (): Lead[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.leads);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const markLeadRead = (id: string, read = true) => {
  const list = getLeads();
  const idx = list.findIndex((l) => l.id === id);
  if (idx !== -1) {
    list[idx].read = read;
    localStorage.setItem(KEYS.leads, JSON.stringify(list));
  }
};

export const deleteLead = (id: string) => {
  const list = getLeads().filter((l) => l.id !== id);
  localStorage.setItem(KEYS.leads, JSON.stringify(list));
};

export const exportLeadsToCSV = (leads: Lead[]) => {
  if (!leads.length) return;
  const headers = ["ID", "Name", "Phone", "Email", "Authority", "Services", "Plot Size", "Timeline", "Source", "Message", "Created At", "Read Status"];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${(l.name || "").replace(/"/g, '""')}"`,
    `"${(l.phone || "").replace(/"/g, '""')}"`,
    `"${(l.email || "").replace(/"/g, '""')}"`,
    `"${(l.authority || "").replace(/"/g, '""')}"`,
    `"${(l.services || []).join("; ").replace(/"/g, '""')}"`,
    `"${(l.plotSize || "").replace(/"/g, '""')}"`,
    `"${(l.timeline || "").replace(/"/g, '""')}"`,
    `"${(l.source || "").replace(/"/g, '""')}"`,
    `"${(l.message || "").replace(/"/g, '""')}"`,
    `"${new Date(l.createdAt).toLocaleString()}"`,
    `"${l.read ? "Read" : "Unread"}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `SRA_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Image compressor helper (max 1200px dimension, 80% quality)
export const compressImage = (dataUrl: string, maxWidth = 1200, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(dataUrl);
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/webp", quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
};

// ── React hook ─────────────────────────────────────────────────
export function useAdminData() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => getPortfolio());
  const [files, setFiles] = useState<UploadedFile[]>(() => getFiles());
  const [leads, setLeads] = useState<Lead[]>(() => getLeads());
  const [loaded, setLoaded] = useState(true);

  const refresh = useCallback(() => {
    setPortfolio(getPortfolio());
    setFiles(getFiles());
    setLeads(getLeads());
    setLoaded(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { portfolio, files, leads, loaded, refresh };
}

