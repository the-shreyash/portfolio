import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderGit2,
  Palette,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  User,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  Loader2,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import {
  adminLogin,
  getAdminStats,
  getAdminProfile,
  updateAdminProfile,
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  getAdminDesigns,
  createAdminDesign,
  updateAdminDesign,
  deleteAdminDesign,
  getAdminCertifications,
  createAdminCertification,
  updateAdminCertification,
  deleteAdminCertification,
  getAdminExperience,
  createAdminExperience,
  updateAdminExperience,
  deleteAdminExperience,
  getAdminEducation,
  createAdminEducation,
  updateAdminEducation,
  deleteAdminEducation,
  getAdminSkills,
  createAdminSkill,
  updateAdminSkill,
  deleteAdminSkill,
  getAdminContacts,
  updateAdminContactStatus,
  deleteAdminContact,
} from "../services/api";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "designs", label: "Figma Designs", icon: Palette },
  { id: "certifications", label: "Certificates", icon: Award },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "profile", label: "Profile", icon: User },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("portfolio_admin_token") || "");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "info" });

  // Auth form state
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Data states
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Modal / Editing state
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showNotification = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "info" }), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await adminLogin(username, password);
      if (res.token) {
        setToken(res.token);
        sessionStorage.setItem("portfolio_admin_token", res.token);
        showNotification("Authenticated successfully!");
      }
    } catch (err) {
      setAuthError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("portfolio_admin_token");
    setToken("");
    setStats(null);
  };

  const fetchAllData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [
        statsData,
        profileData,
        projectsData,
        designsData,
        certsData,
        expData,
        eduData,
        skillsData,
        contactsData,
      ] = await Promise.all([
        getAdminStats(token).catch(() => null),
        getAdminProfile(token).catch(() => ({})),
        getAdminProjects(token).catch(() => []),
        getAdminDesigns(token).catch(() => []),
        getAdminCertifications(token).catch(() => []),
        getAdminExperience(token).catch(() => []),
        getAdminEducation(token).catch(() => []),
        getAdminSkills(token).catch(() => []),
        getAdminContacts(token).catch(() => []),
      ]);

      if (statsData) setStats(statsData);
      if (profileData) setProfile(profileData);
      if (projectsData) setProjects(projectsData);
      if (designsData) setDesigns(designsData);
      if (certsData) setCertifications(certsData);
      if (expData) setExperience(expData);
      if (eduData) setEducation(eduData);
      if (skillsData) setSkills(skillsData);
      if (contactsData) setContacts(contactsData);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        showNotification("Session expired. Please log in again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // If not logged in, render login view
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0e12] px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7c8bff]">Secure CMS</span>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-white">Portfolio Admin</h1>
            </div>
            <a href="/" className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back
            </a>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">Username / Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#7c8bff] focus:outline-none"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#7c8bff] focus:outline-none"
                placeholder="••••••••••••"
              />
            </div>

            {authError && (
              <p className="rounded-lg bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 text-xs text-red-400">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c8bff] py-3.5 text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-[#929eff] disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- CRUD Handlers ---
  const handleTogglePublish = async (type, item) => {
    const updated = !item.published;
    try {
      if (type === "project") {
        await updateAdminProject(item._id, { published: updated }, token);
        setProjects((prev) => prev.map((p) => (p._id === item._id ? { ...p, published: updated } : p)));
      } else if (type === "design") {
        await updateAdminDesign(item._id, { published: updated }, token);
        setDesigns((prev) => prev.map((d) => (d._id === item._id ? { ...d, published: updated } : d)));
      } else if (type === "certification") {
        await updateAdminCertification(item._id, { published: updated }, token);
        setCertifications((prev) => prev.map((c) => (c._id === item._id ? { ...c, published: updated } : c)));
      } else if (type === "experience") {
        await updateAdminExperience(item._id, { published: updated }, token);
        setExperience((prev) => prev.map((e) => (e._id === item._id ? { ...e, published: updated } : e)));
      } else if (type === "education") {
        await updateAdminEducation(item._id, { published: updated }, token);
        setEducation((prev) => prev.map((ed) => (ed._id === item._id ? { ...ed, published: updated } : ed)));
      } else if (type === "skill") {
        await updateAdminSkill(item._id, { published: updated }, token);
        setSkills((prev) => prev.map((s) => (s._id === item._id ? { ...s, published: updated } : s)));
      }
      showNotification(`Updated published status for ${item.title || item.name || item.role}`);
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleDeleteItem = async (type, id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name || "this item"}"?`)) return;
    try {
      if (type === "project") {
        await deleteAdminProject(id, token);
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } else if (type === "design") {
        await deleteAdminDesign(id, token);
        setDesigns((prev) => prev.filter((d) => d._id !== id));
      } else if (type === "certification") {
        await deleteAdminCertification(id, token);
        setCertifications((prev) => prev.filter((c) => c._id !== id));
      } else if (type === "experience") {
        await deleteAdminExperience(id, token);
        setExperience((prev) => prev.filter((e) => e._id !== id));
      } else if (type === "education") {
        await deleteAdminEducation(id, token);
        setEducation((prev) => prev.filter((ed) => ed._id !== id));
      } else if (type === "skill") {
        await deleteAdminSkill(id, token);
        setSkills((prev) => prev.filter((s) => s._id !== id));
      } else if (type === "contact") {
        await deleteAdminContact(id, token);
        setContacts((prev) => prev.filter((c) => c._id !== id));
      }
      showNotification("Item successfully deleted.");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateAdminProfile(profile, token);
      setProfile(updated);
      showNotification("Profile updated successfully!");
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#090a0f] text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0d0e14] p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7c8bff]">MERN Engine</span>
              <h2 className="font-display text-xl font-bold tracking-tight">Studio CMS</h2>
            </div>
            <a href="/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white" title="View live site">
              <ExternalLink size={16} />
            </a>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-[#7c8bff]/15 text-[#7c8bff] font-semibold"
                      : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs">
            <p className="font-medium text-white/90">Shreyash Yadav</p>
            <p className="text-[10px] text-white/40">Superadmin</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:border-red-500/50 hover:text-red-400 transition-colors"
            title="Log out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-white/10 px-8 py-4 bg-[#0d0e14]/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-lg font-semibold capitalize">{activeTab}</h1>
            {loading && <Loader2 size={16} className="animate-spin text-[#7c8bff]" />}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-[#7c8bff] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#929eff] transition-colors"
            >
              View Site <ExternalLink size={13} />
            </a>
          </div>
        </header>

        {/* Notification banner */}
        {msg.text && (
          <div
            className={`mx-8 mt-4 rounded-xl border p-3.5 text-xs font-medium flex items-center justify-between ${
              msg.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            }`}
          >
            <span>{msg.text}</span>
            <button onClick={() => setMsg({ text: "", type: "info" })} className="opacity-70 hover:opacity-100">
              ✕
            </button>
          </div>
        )}

        <div className="p-8">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between text-white/40 text-xs font-medium uppercase tracking-wider">
                    <span>Projects</span>
                    <FolderGit2 size={16} />
                  </div>
                  <p className="mt-3 font-display text-3xl font-bold">{projects.length}</p>
                  <p className="mt-1 text-xs text-white/50">{projects.filter((p) => p.featured).length} Featured on hero</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between text-white/40 text-xs font-medium uppercase tracking-wider">
                    <span>Figma Designs</span>
                    <Figma size={16} />
                  </div>
                  <p className="mt-3 font-display text-3xl font-bold">{designs.length}</p>
                  <p className="mt-1 text-xs text-white/50">{designs.filter((d) => d.published).length} Published</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between text-white/40 text-xs font-medium uppercase tracking-wider">
                    <span>Certificates</span>
                    <Award size={16} />
                  </div>
                  <p className="mt-3 font-display text-3xl font-bold">{certifications.length}</p>
                  <p className="mt-1 text-xs text-white/50">{certifications.filter((c) => c.published).length} Published</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between text-white/40 text-xs font-medium uppercase tracking-wider">
                    <span>Messages</span>
                    <MessageSquare size={16} />
                  </div>
                  <p className="mt-3 font-display text-3xl font-bold">{contacts.length}</p>
                  <p className="mt-1 text-xs text-amber-400">{contacts.filter((c) => c.status === "new").length} New submissions</p>
                </div>
              </div>

              {/* Recent Contact Submissions */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-base font-semibold">Recent Inquiries</h3>
                  <button onClick={() => setActiveTab("messages")} className="text-xs text-[#7c8bff] hover:underline">
                    View All ({contacts.length})
                  </button>
                </div>
                {contacts.length === 0 ? (
                  <p className="text-xs text-white/40">No contact inquiries received yet.</p>
                ) : (
                  <div className="divide-y divide-white/5">
                    {contacts.slice(0, 5).map((c) => (
                      <div key={c._id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-medium text-white">{c.name}</span>
                          <span className="text-white/40 ml-2">({c.email})</span>
                          <p className="text-white/60 text-[11px] mt-0.5 line-clamp-1">{c.message}</p>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider ${
                            c.status === "new"
                              ? "bg-amber-500/20 text-amber-300"
                              : c.status === "replied"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-white/10 text-white/60"
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/50">Manage projects shown in the Selected Work and Other Work sections.</p>
                <button
                  onClick={() => {
                    const title = prompt("Enter project title:");
                    if (!title) return;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    createAdminProject(
                      {
                        title,
                        slug,
                        category: "AI / FULL-STACK",
                        description: "Project description",
                        featured: false,
                        published: true,
                        order: projects.length + 1,
                      },
                      token
                    ).then((newProj) => {
                      setProjects((prev) => [...prev, newProj]);
                      showNotification("Created new project!");
                    });
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#7c8bff] px-3.5 py-2 text-xs font-semibold text-black hover:bg-[#929eff]"
                >
                  <Plus size={14} /> New Project
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {projects.map((p) => (
                  <div
                    key={p._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-all"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-medium text-base">{p.title}</span>
                        {p.featured && (
                          <span className="rounded-full bg-[#7c8bff]/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#7c8bff]">
                            Featured
                          </span>
                        )}
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                            p.published ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/40"
                          }`}
                        >
                          {p.published ? "Published" : "Draft"}
                        </span>
                        <span className="text-[10px] text-white/30">Order: {p.order}</span>
                      </div>
                      <p className="text-xs text-white/40 uppercase tracking-wider">{p.category}</p>
                      <p className="text-xs text-white/60 line-clamp-1">{p.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleTogglePublish("project", p)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs transition-colors ${
                          p.published
                            ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                            : "border-white/10 text-white/40 hover:bg-white/5"
                        }`}
                        title={p.published ? "Unpublish (Move to draft)" : "Publish"}
                      >
                        {p.published ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button
                        onClick={() => {
                          const newDesc = prompt("Update description for " + p.title, p.description);
                          if (newDesc !== null) {
                            updateAdminProject(p._id, { description: newDesc }, token).then((res) => {
                              setProjects((prev) => prev.map((item) => (item._id === p._id ? res : item)));
                              showNotification("Updated project description!");
                            });
                          }
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
                        title="Quick Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("project", p._id, p.title)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/30 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FIGMA DESIGNS */}
          {activeTab === "designs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/50">Manage your real Figma design concepts and interactive prototypes.</p>
                <button
                  onClick={() => {
                    const title = prompt("Enter design title:");
                    if (!title) return;
                    const figmaUrl = prompt("Enter Figma URL:");
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    createAdminDesign(
                      {
                        title,
                        slug,
                        category: "UI / UX DESIGN",
                        description: "Product UI design concept in Figma.",
                        figmaUrl: figmaUrl || "",
                        published: true,
                        order: designs.length + 1,
                      },
                      token
                    ).then((newDesign) => {
                      setDesigns((prev) => [...prev, newDesign]);
                      showNotification("Created new Figma design!");
                    });
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#7c8bff] px-3.5 py-2 text-xs font-semibold text-black hover:bg-[#929eff]"
                >
                  <Plus size={14} /> New Design
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {designs.map((d) => (
                  <div
                    key={d._id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-medium text-base">{d.title}</h4>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                              d.published ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/40"
                            }`}
                          >
                            {d.published ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{d.category}</p>
                      <p className="text-xs text-white/60 line-clamp-2">{d.description}</p>
                      {d.figmaUrl && (
                        <a
                          href={d.figmaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#7c8bff] hover:underline pt-1"
                        >
                          Figma Link <ExternalLink size={11} />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => handleTogglePublish("design", d)}
                        className="flex h-8 items-center gap-1 px-3 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white"
                      >
                        {d.published ? <EyeOff size={13} /> : <Eye size={13} />}
                        <span>{d.published ? "Unpublish" : "Publish"}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteItem("design", d._id, d.title)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/30"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATES */}
          {activeTab === "certifications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/50">Manage credentials, awards, and hackathon recognitions.</p>
                <button
                  onClick={() => {
                    const title = prompt("Enter certificate title:");
                    if (!title) return;
                    const issuer = prompt("Enter issuer (e.g. Apna College, HackWith):");
                    const url = prompt("Enter verification/drive URL:");
                    createAdminCertification(
                      {
                        title,
                        issuer: issuer || "Official",
                        type: "CREDENTIAL",
                        url: url || "",
                        published: true,
                        order: certifications.length + 1,
                      },
                      token
                    ).then((newCert) => {
                      setCertifications((prev) => [...prev, newCert]);
                      showNotification("Created new certificate!");
                    });
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#7c8bff] px-3.5 py-2 text-xs font-semibold text-black hover:bg-[#929eff]"
                >
                  <Plus size={14} /> New Certificate
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((c) => (
                  <div
                    key={c._id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7c8bff]">
                        {c.type}
                      </span>
                      <h4 className="font-display font-medium text-base mt-1">{c.title}</h4>
                      <p className="text-xs text-white/50">{c.issuer}</p>
                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#7c8bff] hover:underline mt-2"
                        >
                          View Credential <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish("certification", c)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white"
                        title={c.published ? "Unpublish" : "Publish"}
                      >
                        {c.published ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button
                        onClick={() => handleDeleteItem("certification", c._id, c.title)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/30"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/50">Manage work and builder experience.</p>
                <button
                  onClick={() => {
                    const role = prompt("Enter role:");
                    if (!role) return;
                    const company = prompt("Enter company/organization:");
                    createAdminExperience(
                      {
                        role,
                        company: company || "Independent",
                        startDate: "2024",
                        endDate: "Present",
                        description: "Engineering systems and products.",
                        published: true,
                        order: experience.length + 1,
                      },
                      token
                    ).then((newExp) => {
                      setExperience((prev) => [...prev, newExp]);
                      showNotification("Created new experience record!");
                    });
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#7c8bff] px-3.5 py-2 text-xs font-semibold text-black hover:bg-[#929eff]"
                >
                  <Plus size={14} /> New Experience
                </button>
              </div>

              <div className="space-y-4">
                {experience.map((e) => (
                  <div key={e._id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-display font-medium text-base">{e.role}</h4>
                      <p className="text-xs text-[#7c8bff] font-medium">{e.company} · {e.startDate} – {e.endDate}</p>
                      <p className="text-xs text-white/60">{e.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteItem("experience", e._id, e.role)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EDUCATION */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/50">Manage educational background.</p>
                <button
                  onClick={() => {
                    const inst = prompt("Enter institution name:");
                    if (!inst) return;
                    const degree = prompt("Enter degree:");
                    createAdminEducation(
                      {
                        institution: inst,
                        degree: degree || "Bachelor of Technology",
                        startYear: "2022",
                        endYear: "2026",
                        published: true,
                        order: education.length + 1,
                      },
                      token
                    ).then((newEdu) => {
                      setEducation((prev) => [...prev, newEdu]);
                      showNotification("Created new education record!");
                    });
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#7c8bff] px-3.5 py-2 text-xs font-semibold text-black hover:bg-[#929eff]"
                >
                  <Plus size={14} /> New Education
                </button>
              </div>

              <div className="space-y-4">
                {education.map((ed) => (
                  <div key={ed._id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-display font-medium text-base">{ed.institution}</h4>
                      <p className="text-xs text-[#7c8bff]">{ed.degree} ({ed.startYear} – {ed.endYear})</p>
                      <p className="text-xs text-white/60">{ed.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteItem("education", ed._id, ed.institution)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/50">Manage structured skills and tech stack tokens.</p>
                <button
                  onClick={() => {
                    const name = prompt("Enter skill name (e.g. Next.js, Redis):");
                    if (!name) return;
                    const category = prompt("Category (Frontend, Backend, Database, AI, Infrastructure, Tools, Design):") || "Backend";
                    createAdminSkill(
                      {
                        name,
                        category,
                        level: "Advanced",
                        published: true,
                        order: skills.length + 1,
                      },
                      token
                    ).then((newSkill) => {
                      setSkills((prev) => [...prev, newSkill]);
                      showNotification("Created skill!");
                    });
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#7c8bff] px-3.5 py-2 text-xs font-semibold text-black hover:bg-[#929eff]"
                >
                  <Plus size={14} /> New Skill
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skills.map((s) => (
                  <div
                    key={s._id}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-3 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-medium text-white">{s.name}</p>
                      <p className="text-[10px] text-white/40">{s.category}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteItem("skill", s._id, s.name)}
                      className="text-white/30 hover:text-red-400 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="max-w-2xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    value={profile.name || ""}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-xs text-white focus:border-[#7c8bff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 font-medium">Public Email</label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-xs text-white focus:border-[#7c8bff] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 font-medium">Role Headline</label>
                <input
                  type="text"
                  value={profile.role || ""}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-xs text-white focus:border-[#7c8bff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 font-medium">Bio Description</label>
                <textarea
                  rows={3}
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-xs text-white focus:border-[#7c8bff] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 font-medium">GitHub URL</label>
                  <input
                    type="url"
                    value={profile.githubUrl || ""}
                    onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-xs text-white focus:border-[#7c8bff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 font-medium">LinkedIn URL</label>
                  <input
                    type="url"
                    value={profile.linkedinUrl || ""}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-xs text-white focus:border-[#7c8bff] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    value={profile.location || ""}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-xs text-white focus:border-[#7c8bff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 font-medium">Photo URL / Media Path</label>
                  <input
                    type="text"
                    value={profile.photoUrl || ""}
                    onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-xs text-white focus:border-[#7c8bff] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-[#7c8bff] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#929eff] transition-colors"
              >
                <Check size={14} /> Save Profile Changes
              </button>
            </form>
          )}

          {/* TAB 9: MESSAGES */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              <p className="text-xs text-white/50">Contact inquiries submitted through the website contact form.</p>
              {contacts.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-xs text-white/40">
                  No contact messages yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((c) => (
                    <div
                      key={c._id}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3 hover:border-white/20 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="font-display font-medium text-base text-white">{c.name}</p>
                          <a href={`mailto:${c.email}`} className="text-xs text-[#7c8bff] hover:underline">
                            {c.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={c.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              updateAdminContactStatus(c._id, newStatus, token).then(() => {
                                setContacts((prev) =>
                                  prev.map((item) => (item._id === c._id ? { ...item, status: newStatus } : item))
                                );
                                showNotification(`Status updated to "${newStatus}"`);
                              });
                            }}
                            className="rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-xs text-white uppercase tracking-wider focus:outline-none"
                          >
                            <option value="new">NEW</option>
                            <option value="read">READ</option>
                            <option value="replied">REPLIED</option>
                          </select>
                          <button
                            onClick={() => handleDeleteItem("contact", c._id, `message from ${c.name}`)}
                            className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/30"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 text-[11px] text-white/40">
                        <span>Company: {c.company || "—"}</span>
                        <span>Type: {c.projectType || "—"}</span>
                        <span>Budget: {c.budget || "—"}</span>
                        <span>Date: {new Date(c.createdAt).toLocaleString()}</span>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-black/30 p-3.5 text-xs text-white/80 whitespace-pre-wrap">
                        {c.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
