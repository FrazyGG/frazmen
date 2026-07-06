javascript:(function(){
    if(window.__FRAZMEN_LOADED) return;
    window.__FRAZMEN_LOADED = true;

    // === FLOATING BUTTON ===
    var btn = document.createElement('div');
    btn.innerHTML = '⚡';
    btn.id = 'fz-btn';
    Object.assign(btn.style, {
        position: 'fixed', bottom: '20px', right: '20px',
        width: '55px', height: '55px', borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #00ff88, #0088cc)',
        boxShadow: '0 0 30px rgba(0,255,136,0.5)',
        border: '2px solid rgba(255,255,255,0.2)',
        zIndex: '999999', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '28px', color: '#0a0a0a', fontWeight: '900',
        userSelect: 'none', fontFamily: 'system-ui, sans-serif',
        transition: '0.15s ease'
    });
    document.body.appendChild(btn);

    // === DRAGGABLE ===
    var isDrag = false, sx, sy, ox, oy;
    btn.addEventListener('mousedown', function(e){
        if(e.button !== 0) return;
        isDrag = true;
        sx = e.clientX; sy = e.clientY;
        var rect = btn.getBoundingClientRect();
        ox = rect.left; oy = rect.top;
        btn.style.cursor = 'grabbing';
        e.preventDefault();
    });
    document.addEventListener('mousemove', function(e){
        if(!isDrag) return;
        var nx = ox + (e.clientX - sx);
        var ny = oy + (e.clientY - sy);
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
