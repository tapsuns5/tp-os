import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { getBlogPost } from '../services/blogService';

interface BlogPostPageProps {
  slug: string;
  onBack?: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onBack }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const blogPost = await getBlogPost(slug);
        if (blogPost) {
          setPost(blogPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-400 mb-4">{error || 'Blog post not found'}</div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to writing
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-8 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
        >
          ← Back to writing
        </button>
      )}
      
      <article className="max-w-4xl">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <time className="text-xs font-bold text-zinc-600 uppercase tracking-widest font-mono">
              {post.date}
            </time>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-widest text-zinc-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-6 tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div 
          className="blog-content text-zinc-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default BlogPostPage;
