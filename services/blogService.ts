import { marked } from 'marked';
import { BlogPost } from '../types';

export interface BlogPostMetadata {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const blogModules = import.meta.glob('../blogs/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;
  
  const posts: BlogPost[] = [];
  
  // Try to load file metadata for proper sorting
  let fileMetadata: any[] = [];
  try {
    const metadataResponse = await fetch('/blog-metadata.json');
    if (metadataResponse.ok) {
      fileMetadata = await metadataResponse.json();
    }
  } catch (error) {
    console.warn('Could not load blog metadata, using fallback sorting');
  }
  
  for (const path in blogModules) {
    try {
      const content = await blogModules[path]();
      const post = await parseMarkdownPost(content, path);
      
      // Add file creation time from metadata if available
      const metadata = fileMetadata.find(m => m.slug === post.id);
      if (metadata) {
        (post as any).fileCreatedAt = metadata.createdAt;
      }
      
      posts.push(post);
    } catch (error) {
      console.error(`Error parsing blog post ${path}:`, error);
    }
  }
  
  // Sort by file creation time if available, otherwise by ID
  return posts.sort((a, b) => {
    const aTime = (a as any).fileCreatedAt;
    const bTime = (b as any).fileCreatedAt;
    
    if (aTime && bTime) {
      return bTime - aTime; // Newest first
    }
    
    // Fallback to alphabetical sorting
    return b.id.localeCompare(a.id);
  });
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const contentModule = await import(`../blogs/${slug}.md?raw`);
    const content = contentModule.default as string;
    const post = await parseMarkdownPost(content, slug);
    return post;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
};

const parseMarkdownPost = async (content: string, path: string): Promise<BlogPost> => {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    throw new Error(`Invalid markdown format in ${path}`);
  }
  
  const frontMatter = match[1];
  const markdownContent = match[2];
  
  const metadata: BlogPostMetadata = parseFrontMatter(frontMatter);
  const htmlContent = await marked(markdownContent);
  
  const slug = path.replace(/^.*\/(.*)\.md$/, '$1');
  
  return {
    id: slug,
    title: metadata.title,
    date: metadata.date,
    excerpt: metadata.excerpt,
    content: htmlContent,
    tags: metadata.tags
  };
};

const parseFrontMatter = (frontMatter: string): BlogPostMetadata => {
  const metadata: Partial<BlogPostMetadata> = {};
  
  const lines = frontMatter.split('\n');
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      
      if (key === 'tags') {
        const tagsMatch = value.match(/^\[(.*)\]$/);
        if (tagsMatch) {
          metadata.tags = tagsMatch[1].split(',').map(tag => tag.trim().replace(/"/g, ''));
        }
      } else {
        (metadata as any)[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }
  
  return {
    title: metadata.title || '',
    date: metadata.date || '',
    excerpt: metadata.excerpt || '',
    tags: metadata.tags || []
  };
};
