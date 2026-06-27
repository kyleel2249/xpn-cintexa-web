# CINTEXA — Enterprise Website Platform

Production-grade static website for CINTEXA (Connected Intelligent Technology Exchange Architecture).

## 📁 File Structure

```
cintexa-website/
├── index.html          # Main HTML (SEO-optimized, semantic structure)
├── style.css           # Complete stylesheet (CSS3, Flexbox, Grid)
├── script.js           # Vanilla JS (ES6+, no frameworks)
├── firebase.json       # Firebase Hosting configuration
├── .firebaserc         # Firebase project settings
├── robots.txt          # Search engine crawler directives
├── sitemap.xml         # XML sitemap for SEO
├── CLOUDFLARE-CONFIG.md # Cloudflare optimization guide
└── assets/             # Static assets (images, fonts)
```

## 🚀 Deployment

### Firebase Hosting

```bash
# 1. Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Initialize (if first time)
firebase init hosting
# Select existing project: cintexa-website
# Set public directory: . (current directory)
# Configure as single-page app: No

# 4. Deploy
firebase deploy
```

### Cloudflare Setup

1. Add your domain to Cloudflare
2. Update nameservers as instructed
3. Create a CNAME record pointing to your Firebase Hosting URL
4. Enable "Proxied" (orange cloud) for CDN + security
5. Apply settings from `CLOUDFLARE-CONFIG.md`

## 🎨 Design System

- **Background**: #070D1A
- **Surface**: #111A2E
- **Primary Blue**: #1E6BFF
- **Cyan**: #19D3FF
- **Purple**: #7C4DFF
- **Text Primary**: #EAF2FF
- **Text Secondary**: #9AAEC6

## 🔍 SEO Features

- Semantic HTML5 structure (H1–H6 hierarchy)
- Meta tags, OpenGraph, Twitter Cards
- JSON-LD structured data (Organization, FAQPage)
- robots.txt and sitemap.xml
- Canonical URLs
- Preconnect to Google Fonts
- Keyword-rich content

## ⚡ Performance

- Lighthouse target: 90–100
- Lazy-loaded assets via Intersection Observer
- Minified CSS + JS
- Preloaded critical fonts
- CDN-optimized static architecture
- Reduced layout shift (CLS)

## 📱 Responsive

- Mobile-first design
- Breakpoints: 480px, 768px, 1024px
- Touch-friendly interactions
- Accessible navigation

## 🤖 JAY Assistant

Built-in conversational support widget with:
- Human-style avatar (warm, friendly)
- Typing indicators
- Quick reply buttons
- Context-aware responses
- Mobile-friendly drawer UI

## 🧪 Business Diagnostics

- Interactive Business Health Checker (4-step quiz)
- Free Business Audit form
- Growth Toolkit downloads
- Score visualization with animated ring

## 📊 Case Studies

Three detailed case studies with:
- Client Challenge
- Solution Delivered
- Measurable Results

## 🛡️ Tech Stack (Strict)

- HTML5
- CSS3 (Flexbox + Grid)
- Vanilla JavaScript (ES6+)

**No frameworks. No backend logic.**

## 📄 License

© 2024 CINTEXA. All rights reserved.
"# xpn-cintexa-web" 
"# xpn-cintexa-web" 
