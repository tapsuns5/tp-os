import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const blogsDir = path.join(rootDir, 'blogs');
const outputDir = path.join(rootDir, 'dist', 'blog');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate blog metadata with file timestamps
function generateBlogMetadata() {
  const blogFiles = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md'));
  const metadata = [];
  
  for (const file of blogFiles) {
    const filePath = path.join(blogsDir, file);
    const stats = fs.statSync(filePath);
    const slug = file.replace('.md', '');
    
    metadata.push({
      slug,
      file,
      createdAt: stats.birthtime.getTime(),
      modifiedAt: stats.mtime.getTime()
    });
  }
  
  // Sort by creation date (newest first)
  return metadata.sort((a, b) => b.createdAt - a.createdAt);
}

// Write metadata file for the client-side blog service
function writeBlogMetadata(metadata) {
  const metadataPath = path.join(rootDir, 'public', 'blog-metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`Generated blog metadata: ${metadataPath}`);
}

// Parse frontmatter from markdown
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    throw new Error('Invalid markdown format');
  }
  
  const frontMatter = match[1];
  const markdownContent = match[2];
  
  const metadata = {};
  const lines = frontMatter.split('\n');
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      
      if (key === 'tags') {
        const tagsMatch = value.match(/^\[(.*)\]$/);
        if (tagsMatch) {
          metadata[key] = tagsMatch[1].split(',').map(tag => tag.trim().replace(/"/g, ''));
        }
      } else {
        metadata[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }
  
  return { metadata, content: markdownContent };
}

// Generate HTML for a blog post
function generateBlogPostHTML(slug, postData) {
  const { metadata, content } = postData;
  const htmlContent = marked(content);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metadata.title} - Tyler Palmer</title>
    <meta name="description" content="${metadata.excerpt}">
    <meta name="keywords" content="${metadata.tags.join(', ')}">
    <meta name="author" content="Tyler Palmer">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${metadata.title}">
    <meta property="og:description" content="${metadata.excerpt}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://your-domain.com/blog/${slug}.html">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${metadata.title}">
    <meta name="twitter:description" content="${metadata.excerpt}">
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
            background: #fff;
        }
        .post-header {
            border-bottom: 2px solid #e1e5e9;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .post-title {
            font-size: 2.5em;
            font-weight: 700;
            margin: 0 0 10px 0;
            color: #1a1a1a;
        }
        .post-meta {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 20px;
        }
        .post-tags {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }
        .tag {
            background: #f0f2f5;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            color: #555;
            text-transform: uppercase;
            font-weight: 600;
        }
        .post-content {
            font-size: 1.1em;
            line-height: 1.8;
        }
        .post-content h1, .post-content h2, .post-content h3 {
            margin-top: 30px;
            margin-bottom: 15px;
            color: #1a1a1a;
        }
        .post-content p {
            margin-bottom: 20px;
        }
        .post-content code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', monospace;
        }
        .post-content pre {
            background: #f4f4f4;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 20px 0;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 30px;
            color: #0066cc;
            text-decoration: none;
            font-weight: 600;
        }
        .back-link:hover {
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            body {
                padding: 15px;
            }
            .post-title {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <a href="../" class="back-link">← Back to Home</a>
    
    <article>
        <header class="post-header">
            <h1 class="post-title">${metadata.title}</h1>
            <div class="post-meta">
                <time datetime="${metadata.date}">${metadata.date}</time>
            </div>
            <div class="post-tags">
                ${metadata.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </header>
        
        <div class="post-content">
            ${htmlContent}
        </div>
    </article>
    
    <script>
        // Add analytics or other scripts here
    </script>
</body>
</html>`;
}

// Generate blog index page
function generateBlogIndexHTML(posts) {
  const postsHTML = posts.map(post => `
    <article class="post-preview">
        <h2><a href="${post.slug}.html">${post.metadata.title}</a></h2>
        <p class="post-meta">${post.metadata.date}</p>
        <p class="post-excerpt">${post.metadata.excerpt}</p>
        <div class="post-tags">
            ${post.metadata.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    </article>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Writing - Tyler Palmer</title>
    <meta name="description" content="My thoughts on design, engineering, and everything in between.">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
            background: #fff;
        }
        .page-header {
            text-align: center;
            margin-bottom: 50px;
            border-bottom: 2px solid #e1e5e9;
            padding-bottom: 30px;
        }
        .page-title {
            font-size: 3em;
            font-weight: 700;
            margin: 0 0 10px 0;
            color: #1a1a1a;
        }
        .page-description {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 20px;
        }
        .post-preview {
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 1px solid #e1e5e9;
        }
        .post-preview:last-child {
            border-bottom: none;
        }
        .post-preview h2 {
            margin: 0 0 10px 0;
        }
        .post-preview h2 a {
            color: #1a1a1a;
            text-decoration: none;
            font-size: 1.5em;
            font-weight: 600;
        }
        .post-preview h2 a:hover {
            color: #0066cc;
        }
        .post-meta {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 10px;
        }
        .post-excerpt {
            color: #555;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        .post-tags {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .tag {
            background: #f0f2f5;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            color: #555;
            text-transform: uppercase;
            font-weight: 600;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 30px;
            color: #0066cc;
            text-decoration: none;
            font-weight: 600;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <a href="../" class="back-link">← Back to Home</a>
    
    <header class="page-header">
        <h1 class="page-title">Writing</h1>
        <p class="page-description">My thoughts on design, engineering, and everything in between.</p>
    </header>
    
    <main>
        ${postsHTML}
    </main>
</body>
</html>`;
}

// Main generation function
async function generateBlogPages() {
  try {
    const blogFiles = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md'));
    const posts = [];
    const metadata = generateBlogMetadata();

    console.log('Generating blog pages...');

    for (const file of blogFiles) {
      const slug = file.replace('.md', '');
      const filePath = path.join(blogsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const postData = parseFrontMatter(content);
      posts.push({ slug, ...postData });
      
      // Generate individual post page
      const html = generateBlogPostHTML(slug, postData);
      const outputPath = path.join(outputDir, `${slug}.html`);
      fs.writeFileSync(outputPath, html);
      
      console.log(`Generated: ${slug}.html`);
    }

    // Generate blog index page
    const indexHTML = generateBlogIndexHTML(posts.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date)));
    const indexPath = path.join(outputDir, 'index.html');
    fs.writeFileSync(indexPath, indexHTML);
    
    // Write metadata for client-side sorting
    writeBlogMetadata(metadata);
    
    console.log(`Generated: index.html`);
    console.log(`\n✅ Generated ${posts.length} blog pages + index page`);
    console.log(`📁 Output directory: ${outputDir}`);

  } catch (error) {
    console.error('Error generating blog pages:', error);
    process.exit(1);
  }
}

// Run the generator
generateBlogPages();
