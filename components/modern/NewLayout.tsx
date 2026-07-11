import React, { useState, useEffect, useCallback } from "react";
import { EXPERIENCES, PROJECTS, BIO, getBlogPosts } from "../../constants/data";
import { BlogPost } from "../../types";
import BlogPostPage from "../BlogPostPage";

type Tab = "home" | "about" | "projects" | "writing" | "work";
type Theme = "light" | "dark" | "auto";

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const AboutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const ProjectsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const WritingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
const WorkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const VibecheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);
const ContactIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const NAV_ITEMS: { id: Tab; label: string; shortcut: string; icon: React.FC }[] = [
  { id: "home", label: "Home", shortcut: "1", icon: HomeIcon },
  { id: "about", label: "About", shortcut: "2", icon: AboutIcon },
  { id: "projects", label: "Projects", shortcut: "3", icon: ProjectsIcon },
  { id: "writing", label: "Writing", shortcut: "4", icon: WritingIcon },
  { id: "work", label: "Work", shortcut: "5", icon: WorkIcon },
];

const RESOURCE_ITEMS: { label: string; shortcut: string; url: string; icon: React.FC }[] = [
  { label: "VibeCheck", shortcut: "6", url: "https://vibecheck.tylerpalmer5.com", icon: VibecheckIcon },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function renderBio(bio: string): React.ReactNode[] {
  const tokens = bio.split(/(\[[^\]]+\])/);
  return tokens.map((token, i) => {
    switch (token) {
      case "[PROFILE_PIC]":
        return <img key={i} src="/profile-pic-um.png" alt="Profile" className="inline-block w-10 h-10 rounded-full mx-1 align-middle" style={{ border: "1px solid var(--border)", padding: "3px" }} />;
      case "[SCHEEME_ICON]":
        return <img key={i} src="/scheemeIcon.png" alt="Scheeme" className="inline-block w-8 h-8 mx-1 align-middle cursor-pointer rounded-md" style={{ border: "1px solid var(--border)", padding: "4px" }} onClick={() => window.open("https://tryscheeme.com", "_blank")} />;
      case "[X_ICON]":
        return <img key={i} src="/x-icon.png" alt="X" className="inline-block w-7 h-7 mx-1 align-middle cursor-pointer rounded-md" style={{ border: "1px solid var(--border)", padding: "4px", background: "#000" }} onClick={() => window.open("https://x.com/Tyler_Palmer9", "_blank")} />;
      case "[TEAMSNAP_ICON]":
        return <img key={i} src="/teamsnapone.png" alt="TeamSnap" className="inline-block w-8 h-8 mx-1 align-middle rounded-lg" style={{ border: "1px solid var(--border)", padding: "4px" }} />;
      case "[MIAMI_LOGO]":
        return <img key={i} src="/Miami_Hurricanes_logo.svg" alt="Miami" className="inline-block w-8 h-8 mx-1 align-middle rounded-md" style={{ border: "1px solid var(--border)", padding: "4px" }} />;
      case "[MIAMI_HEAT_LOGO]":
        return <img key={i} src="/miami-heat-logo-vice-symbol.png" alt="Heat" className="inline-block w-8 h-8 mx-1 align-middle rounded-md" style={{ border: "1px solid var(--border)", padding: "4px" }} />;
      case "[MIAMI_DOLPHINS_LOGO]":
        return <img key={i} src="/miami_dolphins_1997-2002.png" alt="Dolphins" className="inline-block w-8 h-8 mx-1 align-middle rounded-md" style={{ border: "1px solid var(--border)", padding: "4px" }} />;
      case "[FLORIDA_PANTHERS_LOGO]":
        return <img key={i} src="/Florida_Panthers_2016_logo.svg" alt="Panthers" className="inline-block w-8 h-8 mx-1 align-middle rounded-md" style={{ border: "1px solid var(--border)", padding: "4px" }} />;
      case "[FLORIDA_MARLINS_LOGO]":
        return <img key={i} src="/florida-marlins.png" alt="Marlins" className="inline-block w-8 h-8 mx-1 align-middle rounded-md" style={{ border: "1px solid var(--border)", padding: "4px" }} />;
      default:
        return token.split("\n").map((line, li) => {
          // Wrap emoji characters in bordered spans
          const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}]/u;
          const parts = line.split(/([\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}])/u);
          return (
            <React.Fragment key={i + "-" + li}>
              {li > 0 && <br />}
              {parts.map((part, pi) =>
                emojiRegex.test(part) ? (
                  <span key={pi} className="inline-flex items-center justify-center mx-1 rounded-md" style={{ border: "1px solid var(--border)", padding: "3px", fontSize: "20px", lineHeight: "1" }}>{part}</span>
                ) : (
                  <React.Fragment key={pi}>{part}</React.Fragment>
                )
              )}
            </React.Fragment>
          );
        });
    }
  });
}

const NewLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [theme, setTheme] = useState<Theme>("auto");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const applyTheme = () => {
      const effective = theme === "auto"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme;
      document.documentElement.setAttribute("data-theme", effective);
    };
    applyTheme();
    if (theme === "auto") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme();
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (e) {
        console.error("Failed to load blog posts:", e);
      } finally {
        setLoadingBlogs(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") as Tab;
    if (tab && ["home", "about", "projects", "writing", "work"].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  const updateTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setSelectedPost(null);
    setSidebarOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key;
      const navItem = NAV_ITEMS.find((n) => n.shortcut === key);
      if (navItem) {
        e.preventDefault();
        updateTab(navItem.id);
        return;
      }
      const resItem = RESOURCE_ITEMS.find((r) => r.shortcut === key);
      if (resItem) {
        e.preventDefault();
        window.open(resItem.url, "_blank");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [updateTab]);

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={
          "layout-sidebar flex flex-col h-full transition-all duration-300 z-50 " +
          (isMobile ? "fixed w-[240px]" : "relative w-[240px] flex-shrink-0") +
          (isMobile && !sidebarOpen ? " -translate-x-full" : " translate-x-0")
        }
      >
        <div className="flex flex-col h-full p-4 min-w-[240px]">
          <div className="mb-6 px-2 pt-2">
            <img src="/profile-pic.png" alt="Tyler Palmer" className="w-10 h-10 rounded-lg object-cover" />
          </div>

          <nav className="flex-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={"nav-item " + (activeTab === item.id ? "nav-item-active" : "")}
                  onClick={() => updateTab(item.id)}
                >
                  <Icon />
                  <span>{item.label}</span>
                  <span className="nav-shortcut">{item.shortcut}</span>
                </div>
              );
            })}

            <div className="nav-divider">Resources</div>
            {RESOURCE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="nav-item" onClick={() => window.open(item.url, "_blank")}>
                  <Icon />
                  <span>{item.label}</span>
                  <span className="nav-shortcut">{item.shortcut}</span>
                </div>
              );
            })}

            <div className="nav-divider">Stay in touch</div>
            <div className="nav-item" onClick={() => { window.location.href = "mailto:tylerpalmer5@gmail.com"; }}>
              <ContactIcon />
              <span>Contact</span>
              <span className="nav-shortcut">/</span>
            </div>
            <div className="nav-item" onClick={() => window.open("https://x.com/Tyler_Palmer9", "_blank")}>
              <img src="/x-icon.png" alt="X" className="w-[18px] h-[18px]" />
              <span>Twitter</span>
              <span className="ml-auto text-[14px] opacity-50">↗</span>
            </div>
          </nav>

          <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <div className="theme-toggle">
              {(["light", "dark", "auto"] as Theme[]).map((t) => (
                <div
                  key={t}
                  className={"theme-tab " + (theme === t ? "theme-tab-active" : "")}
                  onClick={() => setTheme(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {isMobile && (
          <header className="h-14 flex items-center px-4 border-b" style={{ borderColor: "var(--border)" }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1" style={{ color: "var(--text-secondary)" }}>
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </header>
        )}

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-20 pb-24">
            {selectedPost ? (
              <BlogPostPage slug={selectedPost} onBack={() => setSelectedPost(null)} />
            ) : (
              <div className="animate-fade-in" key={activeTab}>
                {activeTab === "home" && (
                  <HomeView
                    blogPosts={blogPosts}
                    loadingBlogs={loadingBlogs}
                    onPostSelect={setSelectedPost}
                    onViewAll={(tab: Tab) => updateTab(tab)}
                  />
                )}
                {activeTab === "about" && <AboutView />}
                {activeTab === "projects" && <ProjectsView />}
                {activeTab === "writing" && (
                  <WritingView
                    blogPosts={blogPosts}
                    loadingBlogs={loadingBlogs}
                    onPostSelect={setSelectedPost}
                  />
                )}
                {activeTab === "work" && <WorkView />}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

/* ---------- Views ---------- */

const HomeView: React.FC<{
  blogPosts: BlogPost[];
  loadingBlogs: boolean;
  onPostSelect: (id: string) => void;
  onViewAll: (tab: Tab) => void;
}> = ({ blogPosts, loadingBlogs, onPostSelect, onViewAll }) => (
  <div className="space-y-16">
    <div>
      <p className="text-lg leading-relaxed max-w-xl font-medium" style={{ color: "var(--text)" }}>
        {renderBio(BIO)}
      </p>
    </div>

    {/* Updates */}
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Work Experience</h2>
        <span className="view-all-link" onClick={() => onViewAll("work")}>View All</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EXPERIENCES.slice(0, 4).map((exp) => (
          <div key={exp.company} className="tile-card">
            <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{exp.company}</h3>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>{exp.role}</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{exp.description}</p>
            <p className="text-[11px] mt-3 font-medium" style={{ color: "var(--text-muted)" }}>{exp.period}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Projects */}
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Projects</h2>
        <span className="view-all-link" onClick={() => onViewAll("projects")}>View All</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECTS.map((proj) => (
          <div
            key={proj.title}
            className="tile-card"
            onClick={() => proj.url ? window.open(proj.url, "_blank") : undefined}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--bg-hover)" }}>
                {proj.iconType === "image" ? (
                  <img src={proj.icon} alt={proj.title} className="w-7 h-7 object-contain" />
                ) : (
                  <span className="text-lg">{proj.icon}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  {proj.title}{proj.url && <span className="ml-1 opacity-40 text-xs">↗</span>}
                </h3>
              </div>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{proj.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {proj.tech.map((t) => (
                <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Recent Writing */}
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Recent Writing</h2>
        <span className="view-all-link" onClick={() => onViewAll("writing")}>View All</span>
      </div>
      <div className="space-y-3">
        {loadingBlogs ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading posts...</p>
        ) : (
          blogPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="tile-card flex items-center justify-between"
              onClick={() => onPostSelect(post.id)}
            >
              <div>
                <div className="flex gap-2 mb-2">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{t}</span>
                  ))}
                </div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>{post.title}</h3>
              </div>
              <span className="text-[11px] font-mono ml-4 flex-shrink-0" style={{ color: "var(--text-muted)" }}>{post.date}</span>
            </div>
          ))
        )}
      </div>
    </section>
  </div>
);

const AboutView: React.FC = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>About</h1>
    <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>{renderBio(BIO)}</p>
    <div className="pt-8 border-t" style={{ borderColor: "var(--border)" }}>
      <h2 className="section-title mb-4">Connect</h2>
      <div className="flex gap-4">
        <img src="/x-icon.png" alt="X" className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => window.open("https://x.com/Tyler_Palmer9", "_blank")} />
        <img src="/github-icon-light.svg" alt="GitHub" className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => window.open("https://github.com/tapsuns5", "_blank")} />
        <img src="/linkedin-icon.png" alt="LinkedIn" className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => window.open("https://www.linkedin.com/in/tylerpalmer9/", "_blank")} />
      </div>
    </div>
  </div>
);

const ProjectsView: React.FC = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>Projects</h1>
    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>My projects and creations.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {PROJECTS.map((proj) => (
        <div
          key={proj.title}
          className="tile-card"
          onClick={() => proj.url ? window.open(proj.url, "_blank") : undefined}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "var(--bg-hover)" }}>
              {proj.iconType === "image" ? (
                <img src={proj.icon} alt={proj.title} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-xl">{proj.icon}</span>
              )}
            </div>
            {proj.url && <span className="text-sm opacity-40">↗</span>}
          </div>
          <h3 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>{proj.title}</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{proj.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {proj.tech.map((t) => (
              <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-wider" style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}>{t}</span>
            ))}
          </div>
          {proj.githubUrl && (
            <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--text-secondary)" }} onClick={(e) => e.stopPropagation()}>
              <img src="/github-icon-light.svg" alt="GitHub" className="w-4 h-4" />
              View Code
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
);

const WritingView: React.FC<{
  blogPosts: BlogPost[];
  loadingBlogs: boolean;
  onPostSelect: (id: string) => void;
}> = ({ blogPosts, loadingBlogs, onPostSelect }) => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>Writing</h1>
    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>My thoughts on design, engineering, and everything in between.</p>
    <div className="space-y-8">
      {loadingBlogs ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading posts...</p>
      ) : (
        blogPosts.map((post) => (
          <article key={post.id} className="cursor-pointer group" onClick={() => onPostSelect(post.id)}>
            <p className="text-[11px] font-mono mb-2 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{post.date}</p>
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>{post.title}</h3>
            <div className="flex gap-3 mb-3">
              {post.tags.map((t) => (
                <span key={t} className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{t}</span>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
            <div className="mt-3 text-xs font-medium" style={{ color: "#3b82f6" }}>
              Read article <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
            </div>
          </article>
        ))
      )}
    </div>
  </div>
);

const WorkView: React.FC = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>Work Experience</h1>
    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Companies I have worked for and things I have done.</p>
    <div className="space-y-0">
      {EXPERIENCES.map((exp, idx) => (
        <div key={exp.company} className="relative pl-8 pb-10 last:pb-0">
          <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 z-10" style={{ background: "var(--bg)", borderColor: "var(--text-muted)" }} />
          {idx < EXPERIENCES.length - 1 && (
            <div className="absolute left-[4px] top-5 bottom-0 w-[1px]" style={{ background: "var(--border)" }} />
          )}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
            <h3 className="text-base font-bold" style={{ color: "var(--text)" }}>{exp.company}</h3>
            <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{exp.period}</span>
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>{exp.role}</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{exp.description}</p>
          {exp.achievements.length > 0 && (
            <ul className="mt-3 space-y-1">
              {exp.achievements.map((a, i) => (
                <li key={i} className="text-xs leading-relaxed flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-muted)" }}>•</span>
                  {a}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default NewLayout;
