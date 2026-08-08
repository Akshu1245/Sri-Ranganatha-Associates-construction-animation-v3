"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Image, FileText, Inbox, LogOut, Plus, Trash2, GripVertical,
  Edit2, X, Save, Upload, Check, AlertCircle, ExternalLink, Eye, Download,
} from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  useAdminData,
  addPortfolioItem, updatePortfolioItem, deletePortfolioItem, reorderPortfolio,
  addFile, deleteFile, markLeadRead, deleteLead, resetPortfolio, exportLeadsToCSV, compressImage,
  type PortfolioItem, type UploadedFile, type Lead,
} from "@/lib/admin-store";
import { DEFAULT_PORTFOLIO } from "@/lib/constants";

type Tab = "overview" | "portfolio" | "files" | "leads";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const { portfolio, files, leads, loaded, refresh } = useAdminData();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-paper-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy-700">
              Admin Dashboard
            </h1>
            <p className="text-ink-500 text-sm mt-1">
              Manage portfolio, files and leads for Sri Ranganatha Associates
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-paper-300 hover:border-navy-600 text-ink-700 hover:text-navy-600 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View site
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-red-200 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-paper-200 p-1 rounded-xl mb-6 overflow-x-auto">
          {[
            { v: "overview", l: "Overview", icon: LayoutDashboard },
            { v: "portfolio", l: "Portfolio", icon: Image, count: portfolio.length },
            { v: "files", l: "Files", icon: FileText, count: files.length },
            { v: "leads", l: "Leads", icon: Inbox, count: leads.length, badge: leads.filter((l) => !l.read).length },
          ].map((t: any) => {
            const Icon = t.icon;
            return (
              <button
                key={t.v}
                onClick={() => setTab(t.v as Tab)}
                className={`flex-1 min-w-fit inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  tab === t.v
                    ? "bg-white text-navy-700 shadow-sm"
                    : "text-ink-700 hover:text-navy-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.l}
                {typeof t.count === "number" && (
                  <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                    tab === t.v ? "bg-navy-100 text-navy-700" : "bg-paper-300 text-ink-500"
                  }`}>
                    {t.count}
                  </span>
                )}
                {t.badge > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-red-500 text-white">
                    {t.badge} new
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {tab === "overview" && <OverviewTab portfolio={portfolio} files={files} leads={leads} setTab={setTab} />}
        {tab === "portfolio" && <PortfolioTab portfolio={portfolio} refresh={refresh} />}
        {tab === "files" && <FilesTab files={files} refresh={refresh} />}
        {tab === "leads" && <LeadsTab leads={leads} refresh={refresh} />}
      </div>
    </div>
  );
}

// ─── OVERVIEW ────────────────────────────────────────────────────
function OverviewTab({
  portfolio, files, leads, setTab,
}: {
  portfolio: PortfolioItem[]; files: UploadedFile[]; leads: Lead[]; setTab: (t: Tab) => void;
}) {
  const newLeads = leads.filter((l) => !l.read).length;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setTab("portfolio")}
          className="bg-white border border-paper-300 rounded-2xl p-6 text-left hover:border-navy-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center">
              <Image className="w-6 h-6" />
            </div>
            <div className="text-3xl font-display font-bold text-navy-700">{portfolio.length}</div>
          </div>
          <div className="mt-3 text-sm text-ink-700">Portfolio items</div>
          <div className="text-xs text-ink-500">Click to manage →</div>
        </button>

        <button
          onClick={() => setTab("files")}
          className="bg-white border border-paper-300 rounded-2xl p-6 text-left hover:border-amber-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div className="text-3xl font-display font-bold text-navy-700">{files.length}</div>
          </div>
          <div className="mt-3 text-sm text-ink-700">Files uploaded</div>
          <div className="text-xs text-ink-500">PDFs, drawings, photos →</div>
        </button>

        <button
          onClick={() => setTab("leads")}
          className="bg-white border border-paper-300 rounded-2xl p-6 text-left hover:border-success-500 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-display font-bold text-navy-700">{leads.length}</div>
              {newLeads > 0 && (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-red-500 text-white">
                  {newLeads} new
                </span>
              )}
            </div>
          </div>
          <div className="mt-3 text-sm text-ink-700">Total enquiries</div>
          <div className="text-xs text-ink-500">Click to view →</div>
        </button>
      </div>

      <div className="bg-white border border-paper-300 rounded-2xl p-6">
        <h3 className="font-display text-xl font-semibold text-navy-700 mb-3">Welcome back!</h3>
        <p className="text-ink-700 mb-4">
          This is your admin panel. You can:
        </p>
        <ul className="space-y-2 text-sm text-ink-700">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
            Add new portfolio items (with image upload)
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
            Drag and drop to reorder portfolio items
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
            Upload working plans, sanction plans, structure details as PDFs
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
            View and manage enquiries from the contact form
          </li>
        </ul>
        <div className="mt-5 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Heads up:</strong> This MVP uses browser localStorage. Data stays on this device.
            To go live with multi-device sync, connect a backend (Supabase, Firebase, or your own API).
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PORTFOLIO ───────────────────────────────────────────────────
function PortfolioTab({ portfolio, refresh }: { portfolio: PortfolioItem[]; refresh: () => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    setItems([...portfolio].sort((a, b) => a.order - b.order));
  }, [portfolio]);

  const handleReorder = (newOrder: PortfolioItem[]) => {
    setItems(newOrder);
    reorderPortfolio(newOrder);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this portfolio item?")) return;
    deletePortfolioItem(id);
    refresh();
  };

  const handleReset = () => {
    if (!confirm("Reset portfolio to defaults? This cannot be undone.")) return;
    resetPortfolio();
    refresh();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-700">Portfolio</h2>
          <p className="text-ink-500 text-sm">Drag to reorder. Click to edit.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-2 text-sm border border-paper-300 text-ink-700 hover:text-red-600 hover:border-red-200 rounded-lg"
          >
            Reset to defaults
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add new
          </button>
        </div>
      </div>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="space-y-3"
      >
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="bg-white border border-paper-300 rounded-xl p-3 sm:p-4 flex items-center gap-4 cursor-grab active:cursor-grabbing hover:border-navy-300 hover:shadow-sm transition-all"
          >
            <GripVertical className="w-5 h-5 text-ink-500 flex-shrink-0" />
            <div className="w-20 h-20 sm:w-24 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-paper-200">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-navy-700 truncate">{item.title}</div>
              <div className="text-xs text-ink-500 mt-0.5">
                {item.category} · {item.location} · {item.year}
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {item.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 bg-paper-200 text-ink-700 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => setEditing(item)}
                className="p-2 text-ink-500 hover:text-navy-600 hover:bg-navy-50 rounded-lg"
                aria-label="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <a
                href={item.image}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ink-500 hover:text-navy-600 hover:bg-navy-50 rounded-lg"
                aria-label="View"
              >
                <Eye className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-ink-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {items.length === 0 && (
        <div className="text-center py-20 text-ink-500">
          No portfolio items. Click "Add new" to get started.
        </div>
      )}

      <AnimatePresence>
        {(showAdd || editing) && (
          <PortfolioEditModal
            item={editing}
            onClose={() => { setShowAdd(false); setEditing(null); }}
            onSaved={() => { setShowAdd(false); setEditing(null); refresh(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PortfolioEditModal({
  item, onClose, onSaved,
}: { item: PortfolioItem | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: item?.title || "",
    category: item?.category || "Residential",
    type: item?.type || "3D Elevation",
    location: item?.location || "Bengaluru",
    year: item?.year || new Date().getFullYear(),
    image: item?.image || "",
    description: item?.description || "",
    tags: (item?.tags || []).join(", "),
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const rawUrl = reader.result as string;
      try {
        const compressed = await compressImage(rawUrl, 1200, 0.8);
        setForm((f) => ({ ...f, image: compressed }));
      } catch {
        setForm((f) => ({ ...f, image: rawUrl }));
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.title || !form.image) {
      alert("Title and image are required.");
      return;
    }
    const data = {
      title: form.title,
      category: form.category,
      type: form.type,
      location: form.location,
      year: form.year,
      image: form.image,
      description: form.description,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (item) {
        updatePortfolioItem(item.id, data);
      } else {
        addPortfolioItem(data);
      }
      onSaved();
    } catch (err: any) {
      alert(err.message || "Failed to save portfolio item. Storage limit reached.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-navy-900/70 backdrop-blur-sm flex items-center justify-center p-4 pt-24"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-paper-300 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-display text-xl font-bold text-navy-700">
            {item ? "Edit portfolio item" : "Add portfolio item"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-paper-200 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Image *</label>
            {form.image ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-paper-300">
                <img src={form.image} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => setForm((f) => ({ ...f, image: "" }))}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-paper-300 rounded-lg cursor-pointer hover:border-navy-600 transition-colors">
                <Upload className="w-8 h-8 text-ink-500 mb-2" />
                <span className="text-sm text-ink-700 font-medium">Click to upload</span>
                <span className="text-xs text-ink-500 mt-1">JPG, PNG, WebP</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
            {uploading && <p className="text-xs text-ink-500 mt-1">Uploading…</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full px-3 py-2 border border-paper-300 rounded-lg focus:border-navy-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-paper-300 rounded-lg focus:border-navy-600 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 border border-paper-300 rounded-lg focus:border-navy-600 outline-none bg-white"
              >
                {["Residential", "Commercial", "Working Plan", "Brand"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Type</label>
              <input
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className="w-full px-3 py-2 border border-paper-300 rounded-lg focus:border-navy-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Year</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-paper-300 rounded-lg focus:border-navy-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Location</label>
            <input
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="w-full px-3 py-2 border border-paper-300 rounded-lg focus:border-navy-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Tags (comma separated)
            </label>
            <input
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              placeholder="3D Elevation, Vastu, G+3"
              className="w-full px-3 py-2 border border-paper-300 rounded-lg focus:border-navy-600 outline-none"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-paper-300 px-6 py-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-paper-300 text-ink-700 hover:bg-paper-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── FILES ───────────────────────────────────────────────────────
function FilesTab({ files, refresh }: { files: UploadedFile[]; refresh: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("Working Plan");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    setUploading(true);
    let pending = list.length;
    Array.from(list).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        addFile({
          name: file.name,
          type: file.type,
          size: file.size,
          url: reader.result as string,
          category,
        });
        pending -= 1;
        if (pending === 0) {
          setUploading(false);
          refresh();
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this file?")) return;
    deleteFile(id);
    refresh();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-700">Files</h2>
          <p className="text-ink-500 text-sm">Upload working plans, sanction plans, structure details.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-paper-300 rounded-lg text-sm bg-white"
          >
            {["Working Plan", "Sanction Plan", "Structure Details", "3D Elevation", "Other"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <label className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload files
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.webp,.dwg"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {uploading && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg">
          Uploading files... please wait.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((f) => (
          <div
            key={f.id}
            className="bg-white border border-paper-300 rounded-xl overflow-hidden hover:border-navy-300 hover:shadow-sm transition-all"
          >
            <div className="aspect-video bg-paper-200 flex items-center justify-center">
              {f.type.startsWith("image/") ? (
                <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
              ) : f.type === "application/pdf" ? (
                <FileText className="w-12 h-12 text-navy-600" />
              ) : (
                <FileText className="w-12 h-12 text-ink-500" />
              )}
            </div>
            <div className="p-3">
              <div className="font-medium text-navy-700 text-sm truncate" title={f.name}>
                {f.name}
              </div>
              <div className="text-xs text-ink-500 mt-1 flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-paper-200 rounded">{f.category}</span>
                <span>{formatSize(f.size)}</span>
              </div>
              <div className="mt-3 flex gap-1">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-2 py-1.5 text-xs border border-paper-300 hover:border-navy-600 hover:text-navy-600 rounded"
                >
                  View
                </a>
                <a
                  href={f.url}
                  download={f.name}
                  className="flex-1 text-center px-2 py-1.5 text-xs border border-paper-300 hover:border-navy-600 hover:text-navy-600 rounded"
                >
                  Download
                </a>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="px-2 py-1.5 text-xs border border-paper-300 hover:border-red-300 hover:text-red-600 rounded"
                  aria-label="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center py-20 text-ink-500">
          No files uploaded yet. Click "Upload files" to add some.
        </div>
      )}
    </div>
  );
}

// ─── LEADS ───────────────────────────────────────────────────────
function LeadsTab({ leads, refresh }: { leads: Lead[]; refresh: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleRead = (id: string) => {
    markLeadRead(id, true);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this lead?")) return;
    deleteLead(id);
    refresh();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-700">Enquiries</h2>
          <p className="text-ink-500 text-sm">From the contact form on your site.</p>
        </div>
        {leads.length > 0 && (
          <button
            onClick={() => exportLeadsToCSV(leads)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV ({leads.length})
          </button>
        )}
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className={`bg-white border rounded-xl p-4 ${
              lead.read ? "border-paper-300" : "border-amber-300 ring-1 ring-amber-200"
            }`}
          >
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-600 to-amber-400 text-white flex items-center justify-center font-semibold flex-shrink-0">
                {lead.name?.charAt(0) || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-navy-700 truncate flex items-center gap-2">
                  {lead.name}
                  {!lead.read && <span className="w-2 h-2 rounded-full bg-red-500" />}
                </div>
                <div className="text-xs text-ink-500 truncate">
                  {lead.phone} · {lead.authority} · {new Date(lead.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {!lead.read && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRead(lead.id); }}
                    className="p-1.5 text-ink-500 hover:text-success-500"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <a
                  href={`tel:${lead.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 text-ink-500 hover:text-navy-600"
                  title="Call"
                  aria-label="Call lead"
                >
                  📞
                </a>
                <a
                  href={`https://wa.me/91${lead.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 text-ink-500 hover:text-success-500"
                  title="WhatsApp"
                  aria-label="Message lead on WhatsApp"
                >
                  💬
                </a>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                  className="p-1.5 text-ink-500 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expanded === lead.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-paper-200 text-sm space-y-2"
              >
                <div><strong>Email:</strong> {lead.email || "—"}</div>
                <div><strong>Plot size:</strong> {lead.plotSize || "—"}</div>
                <div><strong>Timeline:</strong> {lead.timeline}</div>
                <div><strong>Source:</strong> {lead.source || "—"}</div>
                <div>
                  <strong>Services requested:</strong>{" "}
                  {lead.services?.join(", ") || "—"}
                </div>
                {lead.message && (
                  <div>
                    <strong>Message:</strong>
                    <p className="mt-1 p-2 bg-paper-100 rounded text-ink-700">{lead.message}</p>
                  </div>
                )}
                {(lead.files?.length ?? 0) > 0 && (
                  <div>
                    <strong>Files:</strong> {lead.files?.length} file(s)
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {leads.length === 0 && (
        <div className="text-center py-20 text-ink-500">
          No enquiries yet. Once visitors submit the contact form, they&apos;ll appear here.
        </div>
      )}
    </div>
  );
}
