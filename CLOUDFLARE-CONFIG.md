# ============================================
# CLOUDFLARE OPTIMIZATION CONFIGURATION
# For: cintexa.com
# ============================================

## 1. DNS SETTINGS
# Type: CNAME
# Name: @
# Target: cintexa-website.web.app (Firebase Hosting)
# Proxy Status: Proxied (Orange Cloud)
# TTL: Auto

## 2. SSL/TLS SETTINGS
# Encryption Mode: Full (strict)
# Always Use HTTPS: ON
# Automatic HTTPS Rewrites: ON
# Minimum TLS Version: 1.2
# TLS 1.3: ON
# HSTS: 
#   - Max Age: 12 months
#   - Include subdomains: ON
#   - Preload: ON

## 3. SPEED SETTINGS
# Auto Minify: HTML, CSS, JS — ALL ON
# Brotli: ON
# Early Hints: ON
# Rocket Loader: OFF (interferes with custom JS)

## 4. CACHING RULES (Page Rules)
# Rule 1: Cache Everything for Static Assets
#   URL: *cintexa.com/*.css* OR *cintexa.com/*.js* OR *cintexa.com/*.png*
#   Settings: 
#     - Cache Level: Cache Everything
#     - Edge Cache TTL: 1 month
#     - Browser Cache TTL: 1 month
#
# Rule 2: HTML No-Cache
#   URL: *cintexa.com/*
#   Settings:
#     - Cache Level: Bypass
#     - (Only for HTML files - handled by firebase.json headers)

## 5. SECURITY SETTINGS
# Security Level: Medium
# Challenge Passage: 30 minutes
# Browser Integrity Check: ON
# Bot Fight Mode: ON (if on Pro plan)

## 4. PAGE RULES (Legacy but useful)
# Rule 1: Forward HTTP to HTTPS
#   URL: http://*cintexa.com/*
#   Setting: Always Use HTTPS
#
# Rule 2: Cache Static Assets
#   URL: *cintexa.com/*.@(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2)
#   Settings:
#     - Cache Level: Cache Everything
#     - Edge Cache TTL: 1 month

## 5. WORKERS (Optional Advanced)
# Deploy a Cloudflare Worker for:
# - A/B testing headers
# - Geo-based content personalization
# - Additional security headers

## 6. SECURITY HEADERS (via Transform Rules)
# Add via "Transform Rules" > "Modify Response Header":
#   X-Frame-Options: DENY
#   X-Content-Type-Options: nosniff
#   Referrer-Policy: strict-origin-when-cross-origin
#   Permissions-Policy: geolocation=(), microphone=(), camera=()

## 7. PERFORMANCE MONITORING
# Enable: Real User Monitoring (RUM)
# Enable: Speed Brain (if available)
# Analytics: Review Core Web Vitals dashboard weekly
