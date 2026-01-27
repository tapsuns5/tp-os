
import React, { useState, useEffect } from 'react';
import { getBlogPosts } from '../../constants/data';
import { BlogPost } from '../../types';

const WritingApp: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] overflow-hidden">
      {/* Browser Bar */}
      <div className="flex items-center gap-1 p-1 border-b border-white">
        <button className="retro-border-outset px-2 text-xs">← Back</button>
        <button className="retro-border-outset px-2 text-xs">Next →</button>
        <div className="flex-1 retro-border-inset bg-white px-2 py-0.5 text-xs truncate">
          http://tylers-web-corner.net/blog/{selectedPost?.id || 'index.html'}
        </div>
        <button className="retro-border-outset px-2 text-xs">Go</button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-48 bg-white retro-border-inset m-1 overflow-y-auto">
          <div className="p-2 border-b border-gray-200 bg-gray-100 text-[10px] font-bold uppercase tracking-tight">Recent Posts</div>
          <div className="p-1">
            {loading ? (
              <div className="p-2 text-xs text-gray-500">Loading posts...</div>
            ) : (
              blogPosts.map(post => (
                <div 
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`p-2 text-xs cursor-default hover:underline ${selectedPost?.id === post.id ? 'bg-[#000080] text-white' : 'text-blue-800'}`}
                >
                  • {post.title}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white retro-border-inset m-1 p-8 overflow-y-auto">
          {selectedPost ? (
            <div className="max-w-xl mx-auto space-y-6">
              <header className="border-b-4 border-double border-blue-900 pb-4">
                <h1 className="text-2xl font-bold text-blue-900">{selectedPost.title}</h1>
                <div className="text-[10px] text-gray-500 mt-2 font-mono uppercase">Published: {selectedPost.date}</div>
              </header>
              
              <div className="flex gap-2">
                {selectedPost.tags.map(t => (
                  <span key={t} className="text-[10px] bg-yellow-100 text-yellow-800 px-2 border border-yellow-300 font-bold uppercase">#{t}</span>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-gray-800 font-serif" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />

              <div className="mt-12 pt-8 border-t border-dotted border-gray-300 flex justify-center">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Y2em5vM2Z4N2M5eG9wZzJ6N3Z4N2M5eG9wZzJ6N3Z4N2M5eG9wZzJ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif" className="h-10 opacity-50 grayscale" alt="Under construction" />
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-black italic text-blue-900 tracking-widest mb-4">TYLER'S BLOG</h2>
              <p className="text-xs text-gray-500 mb-8 max-w-xs">Welcome to my little corner of the World Wide Web. Please select a post from the sidebar to begin reading.</p>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">📝</div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">💻</div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">☕</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-6 bg-[#c0c0c0] border-t border-white text-[10px] flex items-center px-2 gap-4">
        <span>Ready</span>
        <div className="flex-1 h-3 retro-border-inset bg-gray-100">
           <div className="h-full bg-blue-700 w-1/3"></div>
        </div>
        <span>Internet Zone</span>
      </div>
    </div>
  );
};

export default WritingApp;
