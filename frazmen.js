// ============================================================
// FRAZMEN v3.0 — FULL TOOLKIT UNTUK ANDROID + PC
// ============================================================
// Simpan sebagai frazmen.js — upload ke GitHub
// ============================================================

(function(){
    if(window.__FRAZMEN_LOADED) return;
    window.__FRAZMEN_LOADED = true;

    // ========== STYLE ==========
    var style = document.createElement('style');
    style.textContent = `
        #fz-panel {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 90% !important;
            max-width: 480px !important;
            max-height: 85vh !important;
            background: #1a1d23 !important;
            border-radius: 20px !important;
            box-shadow: 0 20px 80px rgba(0,0,0,0.9) !important;
            z-index: 999999 !important;
            padding: 20px 18px !important;
            font-family: 'Segoe UI', system-ui, sans-serif !important;
            color: #dce3ed !important;
            display: none !important;
            overflow-y: auto !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            box-sizing: border-box !important;
        }
        #fz-panel.open { display: block !important; }
        #fz-panel::-webkit-scrollbar { width: 4px; }
        #fz-panel::-webkit-scrollbar-track { background: #2a2f3a; border-radius: 10px; }
        #fz-panel::-webkit-scrollbar-thumb { background: #5b9cf6; border-radius: 10px; }

        #fz-panel .fz-header {
            display: flex; justify-content: space-between; align-items: center;
            border-bottom: 1px solid #2e3440; padding-bottom: 12px; margin-bottom: 14px;
        }
        #fz-panel .fz-header .fz-title {
            display: flex; align-items: center; gap: 10px;
            font-weight: 800; font-size: 18px; color: #dce3ed;
        }
        #fz-panel .fz-header .fz-title span { background: #00cc88; color: #0a0a0a; padding: 2px 10px; border-radius: 20px; font-size: 10px; }
        #fz-panel .fz-close {
            font-size: 28px; cursor: pointer; color: #909cb0; line-height: 1; padding: 0 4px;
            transition: 0.15s;
        }
        #fz-panel .fz-close:hover { color: #f87171; }

        #fz-panel .fz-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
        }
        #fz-panel .fz-item {
            background: #21252e; border-radius: 12px; padding: 12px 10px;
            cursor: pointer; border: 1px solid #2e3440;
            transition: 0.15s; text-align: center;
        }
        #fz-panel .fz-item:active { transform: scale(0.95); background: #282d38; }
        #fz-panel .fz-item .fz-icon { font-size: 22px; display: block; margin-bottom: 4px; }
        #fz-panel .fz-item .fz-label { font-size: 11px; font-weight: 600; color: #b7c1d4; }
        #fz-panel .fz-item .fz-desc { font-size: 9px; color: #909cb0; }

        #fz-panel .fz-footer {
            margin-top: 14px; padding-top: 12px;
            border-top: 1px solid #2e3440;
            display: flex; justify-content: space-between; font-size: 10px; color: #909cb0;
        }
        #fz-panel .fz-status { color: #4ade80; }

        #fz-btn {
            position: fixed !important;
            bottom: 24px !important;
            right: 24px !important;
            width: 56px !important;
            height: 56px !important;
            border-radius: 50% !important;
            background: radial-gradient(circle at 30% 30%, #00ff88, #0088cc) !important;
            box-shadow: 0 0 30px rgba(0,255,136,0.4) !important;
            border: 2px solid rgba(255,255,255,0.15) !important;
            z-index: 999998 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 26px !important;
            color: #0a0a0a !important;
            font-weight: 900 !important;
            user-select: none !important;
            font-family: system-ui, sans-serif !important;
            transition: 0.15s ease !important;
        }
        #fz-btn:active { transform: scale(0.9); }

        @media (max-width: 480px) {
            #fz-panel { width: 95% !important; max-width: 95% !important; padding: 14px !important; }
            #fz-panel .fz-grid { grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
            #fz-panel .fz-item { padding: 10px 6px; }
            #fz-panel .fz-item .fz-icon { font-size: 18px; }
            #fz-panel .fz-item .fz-label { font-size: 10px; }
            #fz-panel .fz-item .fz-desc { display: none; }
            #fz-btn { width: 48px; height: 48px; font-size: 22px; bottom: 16px; right: 16px; }
        }
    `;
    document.head.appendChild(style);

    // ========== BUTTON ==========
    var btn = document.createElement('div');
    btn.id = 'fz-btn';
    btn.innerHTML = '⚡';
    document.body.appendChild(btn);

    // ========== PANEL ==========
    var panel = document.createElement('div');
    panel.id = 'fz-panel';
    panel.innerHTML = `
        <div class="fz-header">
            <div class="fz-title">⚡ FRAZMEN <span>v3</span></div>
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
        </div>
        <div class="fz-footer">
            <span>FRAZMEN — by FRAZY_ATTACK</span>
            <span class="fz-status" id="fz-status">● ready</span>
        </div>
    `;
    document.body.appendChild(panel);

    // ========== TOGGLE ==========
    var isOpen = false;
    btn.onclick = function(){
        isOpen = !isOpen;
        panel.classList.toggle('open', isOpen);
    };

    document.getElementById('fz-close').onclick = function(){
        isOpen = false;
        panel.classList.remove('open');
    };

    // ========== DOWNLOAD ZIP FUNCTION ==========
    function downloadFullSiteZip() {
        var status = document.getElementById('fz-status');
        status.textContent = '● zipping...';
        status.style.color = '#fbbf24';

        // Kumpulin semua resource
        var resources = {
            'index.html': '<!DOCTYPE html>\n' + document.documentElement.outerHTML
        };

        // Ambil semua link CSS eksternal
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(function(link, i){
            var href = link.href;
            if(href && !href.startsWith('data:')) {
                resources['css/' + (i+1) + '.css'] = '/* Source: ' + href + ' */\n/* Bisa diambil manual via network tab */';
            }
        });

        // Ambil semua script eksternal
        var scripts = document.querySelectorAll('script[src]');
        scripts.forEach(function(script, i){
            var src = script.src;
            if(src && !src.startsWith('data:') && !src.startsWith('blob:')) {
                resources['js/' + (i+1) + '.js'] = '/* Source: ' + src + ' */\n/* Bisa diambil manual via network tab */';
            }
        });

        // Ambil semua gambar
        var images = document.querySelectorAll('img');
        var imgCount = 0;
        images.forEach(function(img){
            var src = img.src;
            if(src && src.startsWith('http') && !src.startsWith('data:')) {
                imgCount++;
                resources['images/img_' + imgCount + '.jpg'] = '/* Image: ' + src + ' */\n/* Download manual via open in new tab */';
            }
        });

        // Buat file README
        resources['README.txt'] = 'Source downloaded from: ' + location.href + '\nDate: ' + new Date().toISOString() + '\nTotal files: ' + Object.keys(resources).length;

        // Buat HTML untuk JSZip (fallback)
        var zipHtml = '<html><head><title>Download ZIP</title></head><body>';
        zipHtml += '<h1>Download Full Source</h1>';
        zipHtml += '<p>Karena keterbatasan browser, file ZIP dibuat dengan daftar resource.</p>';
        zipHtml += '<ul>';
        for(var key in resources) {
            zipHtml += '<li><b>' + key + '</b>: ' + resources[key].substring(0, 100) + '...</li>';
        }
        zipHtml += '</ul>';
        zipHtml += '<p>Total file: ' + Object.keys(resources).length + '</p>';
        zipHtml += '<button onclick="location.reload()">Reload</button>';
        zipHtml += '</body></html>';

        // Download sebagai HTML (karena JSZip butuh library)
        var blob = new Blob([zipHtml], {type: 'text/html'});
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'source_' + location.hostname + '.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        status.textContent = '● zip downloaded';
        status.style.color = '#4ade80';
        setTimeout(function(){ status.textContent = '● ready'; }, 2000);

        alert('📦 File ZIP berupa HTML dengan daftar semua resource.\nUntuk full ZIP dengan library, gunakan ekstensi browser atau tool offline.');
    }

    // ========== ACTIONS ==========
    function runAction(act){
        var status = document.getElementById('fz-status');
        status.textContent = '● executing...';
        status.style.color = '#fbbf24';

        setTimeout(function(){
            status.textContent = '● done';
            status.style.color = '#4ade80';
            setTimeout(function(){ status.textContent = '● ready'; }, 1500);
        }, 800);

        switch(act){
            case 'console':
                if(document.documentElement.requestFullscreen) {
                    alert('📱 Tekan F12 atau gunakan keyboard external.\n\nAndroid: Bisa pakai app "Remote Debug" atau "WebDev"');
                }
                // Coba buka devtools via shortcut
                var ev = new KeyboardEvent('keydown', {key: 'F12', keyCode: 123, which: 123, bubbles: true});
                document.dispatchEvent(ev);
                alert('🖥️ Tekan F12 untuk DevTools.\nDi Android: Gunakan app "Eruda" atau "vConsole"');
                break;

            case 'download':
                downloadFullSiteZip();
                break;

            case 'viewsource': {
                var html = document.documentElement.outerHTML;
                var w = window.open('', '_blank', 'width=800,height=600');
                if(w){
                    w.document.write('<pre style="font-size:12px;font-family:monospace;white-space:pre-wrap;padding:20px;background:#0a0a0a;color:#dce3ed;word-break:break-all;">' + html.replace(/</g,'&lt;') + '</pre>');
                    w.document.close();
                } else alert('Izinkan popup untuk melihat source.');
                break;
            }

            case 'inject': {
                var code = prompt('💉 Masukkan JavaScript yang ingin di-inject:');
                if(code){
                    try{
                        var s = document.createElement('script');
                        s.textContent = code;
                        document.head.appendChild(s);
                        alert('✅ Script berhasil di-inject!');
                    } catch(e){ alert('❌ Gagal: ' + e.message); }
                }
                break;
            }

            case 'cookies': {
                var c = document.cookie;
                if(c){
                    alert('🍪 Cookies:\n\n' + c);
                    navigator.clipboard?.writeText(c).catch(function(){});
                } else alert('🍪 Tidak ada cookie.');
                break;
            }

            case 'lsdump': {
                var out = '';
                for(var k in localStorage){
                    if(localStorage.hasOwnProperty(k)) out += k + ' : ' + localStorage[k] + '\n';
                }
                if(out){
                    alert('🗄️ localStorage:\n\n' + out);
                    navigator.clipboard?.writeText(out).catch(function(){});
                } else alert('🗄️ localStorage kosong.');
                break;
            }

            case 'ssdump': {
                var out = '';
                for(var k in sessionStorage){
                    if(sessionStorage.hasOwnProperty(k)) out += k + ' : ' + sessionStorage[k] + '\n';
                }
                if(out){
                    alert('📋 sessionStorage:\n\n' + out);
                    navigator.clipboard?.writeText(out).catch(function(){});
                } else alert('📋 sessionStorage kosong.');
                break;
            }

            case 'xss': {
                alert('⚡ XSS Test: ' + document.domain);
                alert('🔥 XSS Triggered!');
                break;
            }

            case 'autofill': {
                var inputs = document.querySelectorAll('input, textarea, select');
                inputs.forEach(function(el){
                    if(el.type === 'text' || el.type === 'email' || el.type === 'password' || el.type === 'search' || el.type === 'tel'){
                        el.value = 'test_' + Math.random().toString(36).slice(2,8);
                    } else if(el.type === 'checkbox' || el.type === 'radio'){
                        el.checked = true;
                    } else if(el.tagName === 'SELECT' && el.options.length > 0){
                        el.selectedIndex = Math.floor(Math.random() * el.options.length);
                    } else if(el.type === 'number'){
                        el.value = Math.floor(Math.random() * 100) + 1;
                    } else if(el.type === 'date'){
                        var d = new Date();
                        d.setDate(d.getDate() + Math.floor(Math.random() * 30));
                        el.value = d.toISOString().split('T')[0];
                    }
                });
                alert('✏️ ' + inputs.length + ' field terisi otomatis.');
                break;
            }

            case 'darkmode': {
                var current = document.body.style.filter;
                if(current === 'invert(1)') {
                    document.body.style.filter = 'invert(0)';
                    document.body.style.background = '';
                } else {
                    document.body.style.filter = 'invert(1)';
                    document.body.style.background = '#fff';
                }
                alert('🌙 Dark mode toggled!');
                break;
            }

            case 'network': {
                alert('🌐 Buka DevTools -> tab Network.\nDi Android: Gunakan app "HTTP Toolkit" atau "Packet Capture"');
                break;
            }

            case 'screenshot': {
                alert('📸 Screenshot:\n\n- Android: Volume Down + Power\n- PC: Print Screen / Windows+Shift+S\n- Atau gunakan ekstensi browser');
                break;
            }

            default: alert('Fitur belum diimplementasikan.');
        }
    }

    // ========== ATTACH EVENTS ==========
    document.querySelectorAll('#fz-panel .fz-item').forEach(function(el){
        el.onclick = function(){
            var act = this.dataset.act;
            if(act) runAction(act);
        };
    });

    console.log('⚡ FRAZMEN v3 loaded! Klik tombol ⚡ di kanan bawah.');
})();        var ny = oy + (e.clientY - sy);
        nx = Math.max(5, Math.min(nx, window.innerWidth - 65));
        ny = Math.max(5, Math.min(ny, window.innerHeight - 65));
        btn.style.left = nx + 'px';
        btn.style.right = 'auto';
        btn.style.top = ny + 'px';
        btn.style.bottom = 'auto';
    });
    document.addEventListener('mouseup', function(){
        if(isDrag) { isDrag = false; btn.style.cursor = 'pointer'; }
    });

    // === PANEL ===
    var panel = document.createElement('div');
    panel.id = 'fz-panel';
    Object.assign(panel.style, {
        position: 'fixed', top: '0', right: '-100%',
        width: '50%', maxWidth: '600px', height: '100vh',
        background: '#ffffff', zIndex: '999999',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.7)',
        transition: 'right 0.25s ease',
        overflowY: 'auto', padding: '28px 20px',
        fontFamily: 'Segoe UI, system-ui, sans-serif',
        color: '#111', boxSizing: 'border-box'
    });
    panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #e0e4ea;padding-bottom:14px;margin-bottom:18px;">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:24px;">⚡</span>
                <span style="font-weight:800;font-size:20px;">FRAZMEN</span>
                <span style="background:#00cc88;color:#fff;font-size:10px;padding:2px 10px;border-radius:20px;">v3</span>
            </div>
            <div id="fz-close" style="font-size:32px;cursor:pointer;color:#888;line-height:1;padding:0 6px;">×</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="fz-item" data-act="console" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">🖥️</span>
                    <div><div style="font-weight:700;font-size:13px;">F12 Console</div><div style="font-size:11px;color:#666;">Buka DevTools</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="download" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">📦</span>
                    <div><div style="font-weight:700;font-size:13px;">Download Source</div><div style="font-size:11px;color:#666;">HTML+CSS+JS</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="viewsource" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">📄</span>
                    <div><div style="font-weight:700;font-size:13px;">View Source</div><div style="font-size:11px;color:#666;">Lihat HTML</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="inject" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">💉</span>
                    <div><div style="font-weight:700;font-size:13px;">Inject Script</div><div style="font-size:11px;color:#666;">Custom JS</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="cookies" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">🍪</span>
                    <div><div style="font-weight:700;font-size:13px;">Cookie Grab</div><div style="font-size:11px;color:#666;">Lihat+copy</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="lsdump" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">🗄️</span>
                    <div><div style="font-weight:700;font-size:13px;">LS Dump</div><div style="font-size:11px;color:#666;">localStorage</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="ssdump" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">📋</span>
                    <div><div style="font-weight:700;font-size:13px;">SS Dump</div><div style="font-size:11px;color:#666;">sessionStorage</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="xss" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">⚡</span>
                    <div><div style="font-weight:700;font-size:13px;">XSS Test</div><div style="font-size:11px;color:#666;">Alert</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="autofill" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">✏️</span>
                    <div><div style="font-weight:700;font-size:13px;">AutoFill</div><div style="font-size:11px;color:#666;">Isi Form</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="darkmode" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">🌙</span>
                    <div><div style="font-weight:700;font-size:13px;">Dark Mode</div><div style="font-size:11px;color:#666;">Toggle</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="network" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">🌐</span>
                    <div><div style="font-weight:700;font-size:13px;">Network Log</div><div style="font-size:11px;color:#666;">Intercept</div></div>
                </div>
            </div>
            <div class="fz-item" data-act="screenshot" style="background:#f4f6f9;border-radius:12px;padding:14px;cursor:pointer;border:1px solid #e0e4ea;transition:0.15s;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">📸</span>
                    <div><div style="font-weight:700;font-size:13px;">Screenshot</div><div style="font-size:11px;color:#666;">Capture</div></div>
                </div>
            </div>
        </div>
        <div style="margin-top:18px;border-top:1px solid #e0e4ea;padding-top:14px;display:flex;justify-content:space-between;font-size:11px;color:#999;">
            <span>FRAZMEN — by FRAZY_ATTACK</span>
            <span id="fz-status">🔴 idle</span>
        </div>
    `;
    document.body.appendChild(panel);

    // === CLOSE ===
    document.getElementById('fz-close').onclick = function(){
        panel.style.right = '-100%';
    };

    // === TOGGLE ===
    var open = false;
    btn.onclick = function(){
        if(isDrag) return;
        open = !open;
        panel.style.right = open ? '0' : '-100%';
    };

    // === ACTIONS ===
    function runAction(act){
        var st = document.getElementById('fz-status');
        st.textContent = '⚡ executing...';
        st.style.color = '#00cc88';
        setTimeout(function(){ st.textContent = '✅ done'; }, 500);

        switch(act){
            case 'console': alert('Tekan F12 atau Ctrl+Shift+I untuk DevTools.'); break;

            case 'download': {
                var html = document.documentElement.outerHTML;
                var blob = new Blob([html], {type:'text/html'});
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'source_' + location.hostname + '.html';
                a.click();
                URL.revokeObjectURL(url);
                break;
            }

            case 'viewsource': {
                var html = document.documentElement.outerHTML;
                var w = window.open('', '_blank', 'width=800,height=600');
                if(w){
                    w.document.write('<pre style="font-size:13px;font-family:monospace;white-space:pre-wrap;padding:20px;">' + html.replace(/</g,'&lt;') + '</pre>');
                    w.document.close();
                } else alert('Izinkan popup untuk melihat source.');
                break;
            }

            case 'inject': {
                var code = prompt('Masukkan JavaScript yang ingin di-inject:');
                if(code){
                    try{
                        var s = document.createElement('script');
                        s.textContent = code;
                        document.head.appendChild(s);
                        alert('✅ Script berhasil di-inject!');
                    } catch(e){ alert('❌ Gagal: ' + e.message); }
                }
                break;
            }

            case 'cookies': {
                var c = document.cookie;
                if(c){
                    alert('🍪 Cookies:\n\n' + c);
                    navigator.clipboard?.writeText(c).catch(function(){});
                } else alert('🍪 Tidak ada cookie.');
                break;
            }

            case 'lsdump': {
                var out = '';
                for(var k in localStorage){
                    if(localStorage.hasOwnProperty(k)) out += k + ' : ' + localStorage[k] + '\n';
                }
                if(out){
                    alert('🗄️ localStorage:\n\n' + out);
                    navigator.clipboard?.writeText(out).catch(function(){});
                } else alert('🗄️ localStorage kosong.');
                break;
            }

            case 'ssdump': {
                var out = '';
                for(var k in sessionStorage){
                    if(sessionStorage.hasOwnProperty(k)) out += k + ' : ' + sessionStorage[k] + '\n';
                }
                if(out){
                    alert('📋 sessionStorage:\n\n' + out);
                    navigator.clipboard?.writeText(out).catch(function(){});
                } else alert('📋 sessionStorage kosong.');
                break;
            }

            case 'xss': {
                alert('⚡ XSS Test: ' + document.domain);
                alert('🔥 XSS Triggered!');
                break;
            }

            case 'autofill': {
                var inputs = document.querySelectorAll('input, textarea, select');
                inputs.forEach(function(el){
                    if(el.type === 'text' || el.type === 'email' || el.type === 'password'){
                        el.value = 'test_' + Math.random().toString(36).slice(2,6);
                    } else if(el.type === 'checkbox' || el.type === 'radio'){
                        el.checked = true;
                    } else if(el.tagName === 'SELECT' && el.options.length > 0){
                        el.selectedIndex = 1;
                    }
                });
                alert('✏️ ' + inputs.length + ' field terisi otomatis.');
                break;
            }

            case 'darkmode': {
                var current = document.body.style.filter;
                document.body.style.filter = current === 'invert(1)' ? 'invert(0)' : 'invert(1)';
                document.body.style.background = document.body.style.filter === 'invert(1)' ? '#fff' : '#0a0a0a';
                break;
            }

            case 'network': {
                alert('🌐 Buka DevTools -> tab Network untuk melihat semua request.');
                break;
            }

            case 'screenshot': {
                alert('📸 Gunakan Print Screen atau ekstensi browser untuk screenshot.');
                break;
            }

            default: alert('Fitur belum diimplementasikan.');
        }
    }

    // === ATTACH EVENTS ===
    document.querySelectorAll('.fz-item').forEach(function(el){
        el.onclick = function(){
            var act = this.dataset.act;
            if(act) runAction(act);
        };
        el.onmouseenter = function(){
            this.style.background = '#e8ecf2';
            this.style.borderColor = '#00cc88';
        };
        el.onmouseleave = function(){
            this.style.background = '#f4f6f9';
            this.style.borderColor = '#e0e4ea';
        };
    });

    // === STYLE ===
    var style = document.createElement('style');
    style.textContent = `
        #fz-panel::-webkit-scrollbar { width: 6px; }
        #fz-panel::-webkit-scrollbar-track { background: #f0f0f0; border-radius: 10px; }
        #fz-panel::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
        .fz-item:active { transform: scale(0.96); }
    `;
    document.head.appendChild(style);

    console.log('⚡ FRAZMEN v3 — Klik tombol ⚡ di kanan bawah.');
})();
