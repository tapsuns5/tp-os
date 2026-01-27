
import React, { useState, useEffect } from 'react';
import { EXPERIENCES, PROJECTS, BIO, getBlogPosts } from '../../constants/data';
import { BlogPost } from '../../types';
import BlogPostPage from '../BlogPostPage';

type ModernTab = 'home' | 'writing' | 'work' | 'projects';

const ModernLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ModernTab>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    loadBlogPosts();
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="flex h-full text-zinc-400 font-sans animate-in fade-in duration-700 bg-[#09090b] relative">
      {isMobile && isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:relative z-50 h-full border-r border-zinc-800 flex flex-col bg-[#111111] transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-72 translate-x-0" : "w-0 lg:w-20 -translate-x-full lg:translate-x-0"} 
          overflow-hidden`}
      >
        <div className="p-8 flex flex-col h-full min-w-[288px]">
          <div className="mb-12 flex flex-col items-center lg:items-start">
            <div className="w-16 h-16 rounded-2xl mb-6 overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
              <img
                src="/profile-pic.png"
                alt="Tyler Palmer"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`${isSidebarOpen ? "opacity-100" : "lg:opacity-0"} transition-opacity duration-300`}
            >
              <h1 className="text-white font-bold text-xl tracking-tight">
                Tyler Palmer
              </h1>
              <p className="text-zinc-500 text-sm font-medium">
                Product Builder
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem
              icon={<HomeIcon />}
              label="Home"
              isActive={activeTab === "home"}
              onClick={() => {
                setActiveTab("home");
                if (isMobile) setIsSidebarOpen(false);
              }}
              expanded={isSidebarOpen}
            />
            <NavItem
              icon={<WritingIcon />}
              label="Writing"
              isActive={activeTab === "writing"}
              onClick={() => {
                setActiveTab("writing");
                if (isMobile) setIsSidebarOpen(false);
              }}
              expanded={isSidebarOpen}
            />
            <NavItem
              icon={<WorkIcon />}
              label="Work"
              isActive={activeTab === "work"}
              onClick={() => {
                setActiveTab("work");
                if (isMobile) setIsSidebarOpen(false);
              }}
              expanded={isSidebarOpen}
            />
            <NavItem
              icon={<ProjectIcon />}
              label="Projects"
              isActive={activeTab === "projects"}
              onClick={() => {
                setActiveTab("projects");
                if (isMobile) setIsSidebarOpen(false);
              }}
              expanded={isSidebarOpen}
            />
          </nav>

          <div className="mt-auto pt-8 border-t border-zinc-800 space-y-6">
            <div className="flex gap-5 text-xl justify-center lg:justify-start">
              <img
                src="/x-icon.png"
                alt="GitHub"
                className="w-5 h-5 hover:opacity-100 cursor-pointer transition-opacity opacity-80"
                onClick={() =>
                  window.open("https://x.com/Tyler_Palmer9", "_blank")
                }
              />
              <img
                src="/github-icon-light.svg"
                alt="GitHub"
                className="w-5 h-5 hover:opacity-100 cursor-pointer transition-opacity opacity-80"
                onClick={() =>
                  window.open("https://github.com/tapsuns5", "_blank")
                }
              />
              <img
                src="/linkedin-icon.png"
                alt="LinkedIn"
                className="w-5 h-5 hover:opacity-100 cursor-pointer transition-opacity opacity-80"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/tylerpalmer9/",
                    "_blank",
                  )
                }
              />
            </div>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
              © 2026 Tyler Palmer
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center px-6 border-b border-zinc-800/50 justify-between lg:justify-start">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              {isSidebarOpen ? <CloseMenuIcon /> : <MenuIcon />}
            </button>
          )}

          <div className="lg:hidden text-white font-bold text-sm tracking-tight">
            TYLER PALMER
          </div>
          <div className="w-10 h-10 lg:hidden"></div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-24 scroll-smooth">
          <div className="max-w-5xl mx-auto">
            {selectedPost ? (
              <BlogPostPage 
                slug={selectedPost} 
                onBack={() => setSelectedPost(null)} 
              />
            ) : (
              <>
                {activeTab === "home" && (
                  <HomeView 
                    onAboutClick={() => setActiveTab("writing")} 
                    blogPosts={blogPosts} 
                    loadingBlogs={loadingBlogs} 
                    onPostSelect={setSelectedPost}
                    onViewAll={() => setActiveTab("writing")}
                  />
                )}
                {activeTab === "writing" && <WritingView blogPosts={blogPosts} loadingBlogs={loadingBlogs} onPostSelect={setSelectedPost} />}
                {activeTab === "work" && <WorkView />}
                {activeTab === "projects" && <ProjectsView />}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const HomeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const WritingIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const WorkIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const ProjectIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const CloseMenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;

const NavItem = ({ icon, label, isActive, onClick, expanded }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all duration-300 group
      ${isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-zinc-500 hover:text-zinc-200'}`}
  >
    <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</div>
    <span className={`font-semibold tracking-tight transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>{label}</span>
  </button>
);

const HomeView = ({ onAboutClick, blogPosts, loadingBlogs, onPostSelect, onViewAll }: any) => (
  <div className="space-y-24 animate-in slide-in-from-bottom-8 duration-700">
    <section>
      <p className="text-xl leading-relaxed text-white/80 mb-10 max-w-xl font-medium">
        {BIO.split('[PROFILE_PIC]').map((part, index) => 
          index === 0 ? part.split('\n').map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {lineIndex > 0 && <br />}
              {line}
            </React.Fragment>
          )) : (
            <React.Fragment key={index}>
              <img src="/profile-pic-um.png" alt="Profile" className="inline-block w-8 h-8 rounded-full ml-2 align-middle" />
              {part.split('[SCHEEME_ICON]').map((scheemePart, scheemeIndex) => 
                scheemeIndex === 0 ? scheemePart.split('[X_ICON]').map((xPart, xIndex) => 
                  xIndex === 0 ? xPart.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {lineIndex > 0 && <br />}
                      {line}
                    </React.Fragment>
                  )) : (
                    <React.Fragment key={xIndex}>
                      <img 
                        src="/x-icon.png" 
                        alt="X" 
                        className="inline-block w-5 h-5 mx-1 align-middle cursor-pointer" 
                        onClick={() => window.open('https://x.com/Tyler_Palmer9', '_blank')}
                      />
                      {xPart.split('[MIAMI_LOGO]').map((miamiPart, miamiIndex) => 
                      miamiIndex === 0 ? miamiPart.split('\n').map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {lineIndex > 0 && <br />}
                          {line}
                        </React.Fragment>
                      )) : (
                        <React.Fragment key={miamiIndex}>
                          <img src="/Miami_Hurricanes_logo.svg" alt="Miami Hurricanes" className="inline-block w-5 h-5 mx-1 align-middle" />
                          {miamiPart.split('[MIAMI_HEAT_LOGO]').map((heatPart, heatIndex) => 
                            heatIndex === 0 ? heatPart.split('\n').map((line, lineIndex) => (
                              <React.Fragment key={lineIndex}>
                                {lineIndex > 0 && <br />}
                                {line}
                              </React.Fragment>
                            )) : (
                              <React.Fragment key={heatIndex}>
                                <img src="/miami-heat-logo-vice-symbol.png" alt="Miami Heat" className="inline-block w-5 h-5 mx-1 align-middle" />
                                {heatPart.split('[MIAMI_DOLPHINS_LOGO]').map((dolphinsPart, dolphinsIndex) => 
                                  dolphinsIndex === 0 ? dolphinsPart.split('\n').map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                      {lineIndex > 0 && <br />}
                                      {line}
                                    </React.Fragment>
                                  )) : (
                                    <React.Fragment key={dolphinsIndex}>
                                      <img src="/miami_dolphins_1997-2002.png" alt="Miami Dolphins" className="inline-block w-5 h-5 mx-1 align-middle" />
                                      {dolphinsPart.split('[FLORIDA_PANTHERS_LOGO]').map((panthersPart, panthersIndex) => 
                                        panthersIndex === 0 ? panthersPart.split('\n').map((line, lineIndex) => (
                                          <React.Fragment key={lineIndex}>
                                            {lineIndex > 0 && <br />}
                                            {line}
                                          </React.Fragment>
                                        )) : (
                                          <React.Fragment key={panthersIndex}>
                                            <img src="/Florida_Panthers_2016_logo.svg" alt="Florida Panthers" className="inline-block w-5 h-5 mx-1 align-middle" />
                                            {panthersPart.split('[FLORIDA_MARLINS_LOGO]').map((marlinsPart, marlinsIndex) => 
                                              marlinsIndex === 0 ? marlinsPart.split('\n').map((line, lineIndex) => (
                                                <React.Fragment key={lineIndex}>
                                                  {lineIndex > 0 && <br />}
                                                  {line}
                                                </React.Fragment>
                                              )) : (
                                                <React.Fragment key={marlinsIndex}>
                                                  <img src="/florida-marlins.png" alt="Florida Marlins" className="inline-block w-5 h-5 mx-1 align-middle" />
                                                  {marlinsPart.split('\n').map((line, lineIndex) => (
                                                    <React.Fragment key={lineIndex}>
                                                      {lineIndex > 0 && <br />}
                                                      {line}
                                                    </React.Fragment>
                                                  ))}
                                                </React.Fragment>
                                              )
                                            )}
                                          </React.Fragment>
                                        )
                                      )}
                                    </React.Fragment>
                                  )
                                )}
                              </React.Fragment>
                            )
                          )}
                        </React.Fragment>
                      )
                    )}
                    </React.Fragment>
                  )
                ) : (
                  <React.Fragment key={scheemeIndex}>
                    <img 
                      src="/scheemeIcon.png" 
                      alt="Scheeme" 
                      className="inline-block w-6 h-6 mr-2 align-middle cursor-pointer" 
                      onClick={() => window.open('https://tryscheeme.com', '_blank')}
                    />
                    {scheemePart.split('[X_ICON]').map((xPart, xIndex) => 
                      xIndex === 0 ? xPart.split('\n').map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {lineIndex > 0 && <br />}
                          {line}
                        </React.Fragment>
                      )) : (
                        <React.Fragment key={xIndex}>
                          <img 
                            src="/x-icon.png" 
                            alt="X" 
                            className="inline-block w-5 h-5 mx-1 align-middle cursor-pointer" 
                            onClick={() => window.open('https://x.com/Tyler_Palmer9', '_blank')}
                          />
                          {xPart.split('[MIAMI_LOGO]').map((miamiPart, miamiIndex) => 
                            miamiIndex === 0 ? (
                              miamiPart.split('[MIAMI_HEAT_LOGO]').map((heatPart, heatIndex) => 
                                heatIndex === 0 ? heatPart.split('\n').map((line, lineIndex) => (
                                  <React.Fragment key={lineIndex}>
                                    {lineIndex > 0 && <br />}
                                    {line}
                                  </React.Fragment>
                                )) : (
                                  <React.Fragment key={heatIndex}>
                                    <img src="/miami-heat-logo-vice-symbol.png" alt="Miami Heat" className="inline-block w-5 h-5 mx-1 align-middle" />
                                    {heatPart.split('[MIAMI_DOLPHINS_LOGO]').map((dolphinsPart, dolphinsIndex) => 
                                      dolphinsIndex === 0 ? dolphinsPart.split('\n').map((line, lineIndex) => (
                                        <React.Fragment key={lineIndex}>
                                          {lineIndex > 0 && <br />}
                                          {line}
                                        </React.Fragment>
                                      )) : (
                                        <React.Fragment key={dolphinsIndex}>
                                          <img src="/miami_dolphins_1997-2002.png" alt="Miami Dolphins" className="inline-block w-5 h-5 mx-1 align-middle" />
                                          {dolphinsPart.split('[FLORIDA_PANTHERS_LOGO]').map((panthersPart, panthersIndex) => 
                                            panthersIndex === 0 ? panthersPart.split('\n').map((line, lineIndex) => (
                                              <React.Fragment key={lineIndex}>
                                                {lineIndex > 0 && <br />}
                                                {line}
                                              </React.Fragment>
                                            )) : (
                                              <React.Fragment key={panthersIndex}>
                                                <img src="/Florida_Panthers_2016_logo.svg" alt="Florida Panthers" className="inline-block w-5 h-5 mx-1 align-middle" />
                                                {panthersPart.split('[FLORIDA_MARLINS_LOGO]').map((marlinsPart, marlinsIndex) => 
                                              marlinsIndex === 0 ? marlinsPart.split('\n').map((line, lineIndex) => (
                                                  <React.Fragment key={lineIndex}>
                                                    {lineIndex > 0 && <br />}
                                                    {line}
                                                  </React.Fragment>
                                                )) : (
                                                  <React.Fragment key={marlinsIndex}>
                                                    <img src="/florida-marlins.png" alt="Florida Marlins" className="inline-block w-5 h-5 mx-1 align-middle" />
                                                    {marlinsPart.split('\n').map((line, lineIndex) => (
                                                      <React.Fragment key={lineIndex}>
                                                        {lineIndex > 0 && <br />}
                                                        {line}
                                                      </React.Fragment>
                                                    ))}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </React.Fragment>
                                      )
                                    )}
                                  </React.Fragment>
                                )
                              )
                            ) : (
                              <React.Fragment key={miamiIndex}>
                                <img src="/Miami_Hurricanes_logo.svg" alt="Miami Hurricanes" className="inline-block w-5 h-5 mx-1 align-middle" />
                                {miamiPart.split('[MIAMI_HEAT_LOGO]').map((heatPart, heatIndex) => 
                                  heatIndex === 0 ? heatPart.split('\n').map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                      {lineIndex > 0 && <br />}
                                      {line}
                                    </React.Fragment>
                                  )) : (
                                    <React.Fragment key={heatIndex}>
                                      <img src="/miami-heat-logo-vice-symbol.png" alt="Miami Heat" className="inline-block w-5 h-5 mx-1 align-middle" />
                                      {heatPart.split('[MIAMI_DOLPHINS_LOGO]').map((dolphinsPart, dolphinsIndex) => 
                                        dolphinsIndex === 0 ? dolphinsPart.split('\n').map((line, lineIndex) => (
                                          <React.Fragment key={lineIndex}>
                                            {lineIndex > 0 && <br />}
                                            {line}
                                          </React.Fragment>
                                        )) : (
                                          <React.Fragment key={dolphinsIndex}>
                                            <img src="/miami_dolphins_1997-2002.png" alt="Miami Dolphins" className="inline-block w-5 h-5 mx-1 align-middle" />
                                            {dolphinsPart.split('[FLORIDA_PANTHERS_LOGO]').map((panthersPart, panthersIndex) => 
                                              panthersIndex === 0 ? panthersPart.split('\n').map((line, lineIndex) => (
                                                <React.Fragment key={lineIndex}>
                                                  {lineIndex > 0 && <br />}
                                                  {line}
                                                </React.Fragment>
                                              )) : (
                                                <React.Fragment key={panthersIndex}>
                                                  <img src="/Florida_Panthers_2016_logo.svg" alt="Florida Panthers" className="inline-block w-5 h-5 mx-1 align-middle" />
                                                    {panthersPart.split('[FLORIDA_MARLINS_LOGO]').map((marlinsPart, marlinsIndex) =>
                                                      marlinsIndex === 0 ? marlinsPart.split('\n').map((line, lineIndex) => (
                                                        <React.Fragment key={lineIndex}>
                                                          {lineIndex > 0 && <br />}
                                                          {line}
                                                        </React.Fragment>
                                                      )) : (
                                                        <React.Fragment key={marlinsIndex}>
                                                          <img src="/florida-marlins.png" alt="Florida Marlins" className="inline-block w-5 h-5 mx-1 align-middle" />
                                                          {marlinsPart.split('\n').map((line, lineIndex) => (
                                                            <React.Fragment key={lineIndex}>
                                                              {lineIndex > 0 && <br />}
                                                              {line}
                                                            </React.Fragment>
                                                          ))}
                                                        </React.Fragment>
                                                      ))}
                                                </React.Fragment>
                                              )
                                            )}
                                          </React.Fragment>
                                        )
                                      )}
                                    </React.Fragment>
                                  )
                                )}
                              </React.Fragment>
                            )
                          )}
                        </React.Fragment>
                      )
                    )}
                  </React.Fragment>
                )
              )}
            </React.Fragment>
          )
        )}
      </p>
    </section>

    <section>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h3 className="text-2xl text-white font-bold tracking-tight">Recent Writing</h3>
          <p className="text-zinc-500 text-sm mt-1">I mostly write about my experiences in product design and engineering.</p>
        </div>
        <button onClick={onViewAll} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">View all</button>
      </div>
      <div className="grid gap-4">
        {loadingBlogs ? (
          <div className="text-zinc-500">Loading posts...</div>
        ) : (
          blogPosts.slice(0, 3).map(post => (
            <PostCard 
              key={post.id} 
              title={post.title} 
              date={post.date} 
              tags={post.tags} 
              onClick={() => onPostSelect(post.id)}
            />
          ))
        )}
      </div>
    </section>
  </div>
);

const PostCard = ({ title, date, tags, onClick }: any) => {
  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      'Web Development': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Trends': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'SSG': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Retrospective': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Growth': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Reading': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Product': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Career': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Management': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[tag] || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
  };

  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-md border border-zinc-800/50 hover:border-zinc-700 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all cursor-pointer" onClick={onClick}>
      <div className="mb-4 md:mb-0">
        <div className="flex gap-2 mb-3">
          {tags.map((t: string) => (
            <span 
              key={t} 
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${getTagColor(t)}`}
            >
              {t}
            </span>
          ))}
        </div>
        <h4 className="text-lg text-white font-bold group-hover:text-blue-400 transition-colors leading-snug">{title}</h4>
      </div>
      <span className="text-zinc-600 text-xs font-mono">{date}</span>
    </div>
  );
};

const WritingView = ({ blogPosts, loadingBlogs, onPostSelect }: any) => {
  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      'Web Development': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Trends': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'SSG': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Retrospective': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Growth': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Reading': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Product': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Career': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Management': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[tag] || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
  };

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700">
      <header className="mb-16">
        <h2 className="text-4xl text-white font-bold mb-4 tracking-tight">Writing</h2>
        <p className="text-zinc-500 text-lg">My thoughts on design, engineering, and everything in between.</p>
      </header>
      <div className="space-y-16">
        {loadingBlogs ? (
          <div className="text-zinc-500">Loading posts...</div>
        ) : (
          blogPosts.map(post => (
            <article key={post.id} className="group cursor-pointer" onClick={() => onPostSelect(post.id)}>
              <p className="text-xs font-bold text-zinc-600 mb-3 uppercase tracking-widest font-mono">{post.date}</p>
              <h3 className="text-2xl text-white font-bold group-hover:text-blue-400 transition-colors mb-4">{post.title}</h3>
              <div className="flex gap-2 mb-4">
                {post.tags.map((t: string) => (
                  <span 
                    key={t} 
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${getTagColor(t)}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-zinc-400 leading-relaxed text-lg">{post.excerpt}</p>
              <div className="mt-6 flex items-center gap-2 text-sm text-blue-400 font-bold">
                 Read article <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

const WorkView = () => (
  <div className="animate-in slide-in-from-bottom-8 duration-700">
    <header className="mb-16">
      <h2 className="text-4xl text-white font-bold mb-4 tracking-tight">Work Experience</h2>
      <p className="text-zinc-500 text-lg">Companies I have worked for and things I have done</p>
    </header>
    <div className="space-y-12">
      {EXPERIENCES.map(exp => (
        <WorkItem 
          key={exp.company}
          company={exp.company} 
          role={exp.role} 
          period={exp.period} 
          description={exp.description}
        />
      ))}
    </div>
  </div>
);

const WorkItem = ({ company, role, period, description }: any) => (
  <div className="group relative pl-12 pb-12 last:pb-0">
    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-zinc-800 border-2 border-[#09090b] z-10 group-hover:bg-blue-500 transition-colors" />
    <div className="absolute left-[5px] top-6 bottom-0 w-[2px] bg-zinc-900 group-last:hidden" />
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-4">
      <h3 className="text-xl text-white font-bold">{company}</h3>
      <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest font-mono">{period}</span>
    </div>
    <p className="text-zinc-300 font-semibold mb-2">{role}</p>
    <p className="text-zinc-500 leading-relaxed">{description}</p>
  </div>
);

const ProjectsView = () => (
  <div className="animate-in slide-in-from-bottom-8 duration-700">
    <header className="mb-16">
      <h2 className="text-4xl text-white font-bold mb-4 tracking-tight">Projects</h2>
      <p className="text-zinc-500 text-lg">My Projects and Creations</p>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {PROJECTS.map(proj => (
        <ProjectCard 
          key={proj.title}
          title={proj.title} 
          desc={proj.description} 
          stack={proj.tech}
          icon={proj.icon}
          iconType={proj.iconType}
          githubUrl={proj.githubUrl}
          url={proj.url}
        />
      ))}
    </div>
  </div>
);

const ProjectCard = ({ title, desc, stack, icon, iconType = 'emoji', githubUrl, url }: any) => {
  const handleCardClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className={`p-8 rounded-md border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all group flex flex-col h-full ${url ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <div className="mb-6 flex justify-between items-start">
        <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
          {iconType === 'image' ? (
            <img src={icon} alt={title} className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-xl">{icon}</span>
          )}
        </div>
        {url && (
          <svg 
            className="text-zinc-700 group-hover:text-white transition-colors cursor-pointer" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            onClick={handleExternalLinkClick}
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
          </svg>
        )}
      </div>
      <h3 className="text-2xl text-white font-bold mb-3 group-hover:text-blue-400 transition-colors tracking-tight">{title}</h3>
      <p className="text-zinc-500 leading-relaxed mb-8 flex-1">{desc}</p>
      <div className="flex justify-between items-center mt-auto">
        <div className="flex flex-wrap gap-2">
          {stack.map((s: string) => (
            <span key={s} className="text-[10px] bg-zinc-800 px-3 py-1 rounded-md text-zinc-300 font-bold uppercase tracking-widest">{s}</span>
          ))}
        </div>
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-700 hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <img src="/github-icon-light.svg" alt="GitHub" className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ModernLayout;
