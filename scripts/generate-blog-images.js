#!/usr/bin/env node
/**
 * AI Blog Image Generator for Brooklyn Services Limited
 * Generates custom branded images for all blog posts using Qwen Image API.
 *
 * Usage:
 *   node scripts/generate-blog-images.js [--analyze-only] [--force]
 *
 * Options:
 *   --analyze-only, -a   Analyze blog posts without generating images
 *   --force, -f          Regenerate images even if they already exist
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const BLOG_DIR = path.join(rootDir, 'content', 'blog');
const OUTPUT_DIR = path.join(rootDir, 'public', 'images', 'blog');
const MAPPING_FILE = path.join(rootDir, 'src', 'data', 'blog-images.js');

const BRAND_COLOR = '#CD5C5C';
const BUSINESS_NAME = 'Brooklyn Services Limited';
const LOCATION = 'Christchurch, New Zealand';
const INDUSTRY = 'plumbing';

const API_URL = 'https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';
const MODEL = 'qwen-image-2.0-pro';
const SIZE = '1792*1024';

const TAG_SCENES = {
  'leak-detection': 'professional plumber using thermal imaging camera to detect hidden water leak behind wall in a modern home',
  'drainage': 'professional drain cleaning with high-pressure water jetting equipment on residential property',
  'hot-water': 'modern hot water cylinder installation in clean utility cupboard with organized pipework',
  'maintenance': 'licensed plumber performing annual plumbing maintenance inspection with professional tools',
  'plumbing-tips': 'organized professional plumbing tools and equipment on clean workbench',
  'prevention': 'preventive plumbing maintenance with professional inspection equipment and checklist',
  'blocked-drains': 'professional drain unblocking with CCTV camera inspection equipment',
  'water-leaks': 'water leak detection with moisture meter in residential bathroom',
  'home-maintenance': 'comprehensive home plumbing system inspection by licensed professional',
  'energy-efficiency': 'energy-efficient hot water system with clear efficiency rating display',
  'home-improvement': 'modern home plumbing upgrade with new high-quality fixtures and fittings',
  'home-care': 'homeowner checking plumbing system with professional plumber guidance',
  'product-comparison': 'side-by-side comparison display of premium hot water systems in showroom setting',
  'rinnai': 'Rinnai continuous flow hot water system wall-mounted installation in modern home',
  'rheem': 'Rheem hot water cylinder professional installation in residential utility area',
};

function loadEnvFile() {
  const envPath = path.join(os.homedir(), '.agents', '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        if (key && !process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}

function getApiKey() {
  loadEnvFile();
  const key = process.env.DASHSCOPE_API_KEY;
  if (!key) {
    console.error('Error: DASHSCOPE_API_KEY environment variable not set.');
    console.error('Set it via: $env:DASHSCOPE_API_KEY="your-key" (PowerShell)');
    console.error('Or add it to ~/.agents/.env');
    process.exit(1);
  }
  return key;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const frontmatter = {};
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      value = value.replace(/^["']|["']$/g, '');
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch {
          value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        }
      }
      frontmatter[key] = value;
    }
  });
  return frontmatter;
}

function readBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`Error: Blog directory not found: ${BLOG_DIR}`);
    process.exit(1);
  }
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);
    const slug = file.replace('.md', '');
    return { slug, ...frontmatter, content };
  });
}

function generatePrompt(post) {
  const { tags = [] } = post;

  let sceneDescription = 'professional plumber performing inspection and maintenance work in modern residential home';
  for (const tag of tags) {
    if (TAG_SCENES[tag]) {
      sceneDescription = TAG_SCENES[tag];
      break;
    }
  }

  const prompt = `Professional photograph, ${sceneDescription}, ${LOCATION}. Clean modern aesthetic with subtle warm red accent tones. Natural lighting, high-quality commercial photography style. Technical equipment visible, safety-conscious professional environment. Photorealistic, sharp focus, architectural photography quality. No text or logos in the image.`;

  return prompt;
}

async function generateImage(prompt, outputPath) {
  const apiKey = getApiKey();

  const payload = {
    model: MODEL,
    input: {
      messages: [{
        role: 'user',
        content: [{ text: prompt }]
      }]
    },
    parameters: {
      negative_prompt: 'low resolution, low quality, deformed, oversaturated, waxy, AI-like, chaotic composition, blurry, distorted text, watermark, logo, text overlay, brand name, letters, words',
      prompt_extend: true,
      watermark: false,
      size: SIZE,
    },
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const result = await response.json();

  if (result.code && result.code !== '') {
    throw new Error(`API error: ${result.code} - ${result.message}`);
  }

  const choices = result.output?.choices || [];
  if (choices.length === 0) {
    throw new Error('No choices in API response');
  }

  const content = choices[0].message?.content || [];
  const imageUrl = content[0]?.image;

  if (!imageUrl) {
    throw new Error('No image URL in API response');
  }

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`Failed to download image: ${imageResponse.status}`);
  }

  const buffer = Buffer.from(await imageResponse.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);

  return outputPath;
}

function generateMapping(posts) {
  const lines = [
    '// Auto-generated blog image mapping',
    '// Generated by scripts/generate-blog-images.js',
    '',
    'export const blogImages = {',
  ];

  posts.forEach(post => {
    lines.push(`  '${post.slug}': '/images/blog/${post.slug}.jpg',`);
  });

  lines.push('};');
  lines.push('');

  return lines.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  const analyzeOnly = args.includes('--analyze-only') || args.includes('-a');
  const force = args.includes('--force') || args.includes('-f');

  console.log('Reading blog posts...');
  const posts = readBlogPosts();
  console.log(`Found ${posts.length} blog posts\n`);

  if (analyzeOnly) {
    console.log('Blog Post Analysis:');
    console.log('='.repeat(60));
    posts.forEach((post, i) => {
      console.log(`\n[${i + 1}/${posts.length}] ${post.slug}`);
      console.log(`   Title: ${post.title}`);
      console.log(`   Tags: ${(post.tags || []).join(', ') || 'none'}`);
      console.log(`   Prompt: ${generatePrompt(post).slice(0, 100)}...`);
    });
    console.log('\nAnalysis complete. Run without --analyze-only to generate images.');
    return;
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('Starting image generation...');
  console.log(`Business: ${BUSINESS_NAME}`);
  console.log(`Industry: ${INDUSTRY}`);
  console.log(`Brand Color: ${BRAND_COLOR}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Size: ${SIZE.replace('*', 'x')}px`);
  console.log('='.repeat(60));

  let success = 0;
  let failed = 0;
  let skipped = 0;
  const generatedPosts = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const outputPath = path.join(OUTPUT_DIR, `${post.slug}.jpg`);

    console.log(`\n[${i + 1}/${posts.length}] ${post.slug}`);
    console.log(`   Title: ${post.title}`);

    if (fs.existsSync(outputPath) && !force) {
      console.log(`   Already exists, skipping`);
      skipped++;
      generatedPosts.push(post);
      continue;
    }

    const prompt = generatePrompt(post);
    console.log(`   Prompt: ${prompt.slice(0, 80)}...`);

    try {
      await generateImage(prompt, outputPath);
      console.log(`   Generated successfully`);
      success++;
      generatedPosts.push(post);
    } catch (error) {
      console.error(`   Failed: ${error.message}`);
      failed++;
    }

    if (i < posts.length - 1) {
      console.log(`   Waiting 15s for rate limit...`);
      await new Promise(resolve => setTimeout(resolve, 15000));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Generation Complete!');
  console.log(`   Success: ${success}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Output: ${path.relative(rootDir, OUTPUT_DIR)}`);

  if (generatedPosts.length > 0) {
    const mapping = generateMapping(generatedPosts);
    fs.mkdirSync(path.dirname(MAPPING_FILE), { recursive: true });
    fs.writeFileSync(MAPPING_FILE, mapping);
    console.log(`   Mapping: ${path.relative(rootDir, MAPPING_FILE)}`);
  }
}

main().catch(error => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
