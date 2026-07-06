// ============================================================
// FRAZMEN v6.0 ULTIMATE — FULL 10.000+ BARIS
// Developer: FRAZMEN | Telegram: @rizkycuyy
// ============================================================
(function() {
    if (window.__FRAZMEN_LOADED) return;
    window.__FRAZMEN_LOADED = true;

    // ============================================================
    // 1. KONFIGURASI DASAR
    // ============================================================
    var CONFIG = {
        version: '6.0.0',
        name: 'FRAZMEN',
        developer: 'FRAZMEN',
        telegram: '@rizkycuyy',
        theme: 'dark',
        debug: true,
        maxLogs: 1000,
        autoUpdate: true,
        language: 'id'
    };

    var STATE = {
        isOpen: false,
        isDragging: false,
        dragStartX: 0,
        dragStartY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        currentTab: 'all',
        selectedItem: null,
        logs: [],
        consoleHistory: [],
        historyIndex: -1,
        isRecording: false,
        networkRequests: [],
        cookies: {},
        localStorageData: {},
        sessionStorageData: {},
        elements: [],
        snippets: [],
        bookmarks: [],
        settings: {}
    };

    // ============================================================
    // 2. UTILITY FUNCTIONS (200+ baris)
    // ============================================================
    var Utils = {
        // DOM Helpers
        createElement: function(tag, className, html) {
            var el = document.createElement(tag);
            if (className) el.className = className;
            if (html) el.innerHTML = html;
            return el;
        },

        createElementNS: function(ns, tag, className, html) {
            var el = document.createElementNS(ns, tag);
            if (className) el.className = className;
            if (html) el.innerHTML = html;
            return el;
        },

        query: function(selector, context) {
            return (context || document).querySelector(selector);
        },

        queryAll: function(selector, context) {
            return Array.from((context || document).querySelectorAll(selector));
        },

        addClass: function(el, className) {
            if (!el) return;
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        },

        removeClass: function(el, className) {
            if (!el) return;
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '').trim();
            }
        },

        hasClass: function(el, className) {
            if (!el) return false;
            if (el.classList) {
                return el.classList.contains(className);
            }
            return new RegExp('\\b' + className + '\\b').test(el.className);
        },

        toggleClass: function(el, className) {
            if (!el) return;
            if (this.hasClass(el, className)) {
                this.removeClass(el, className);
            } else {
                this.addClass(el, className);
            }
        },

        setStyle: function(el, styles) {
            if (!el) return;
            for (var prop in styles) {
                if (styles.hasOwnProperty(prop)) {
                    el.style[prop] = styles[prop];
                }
            }
        },

        getStyle: function(el, prop) {
            if (!el) return null;
            return window.getComputedStyle(el)[prop];
        },

        // Event Helpers
        on: function(el, event, handler, options) {
            if (!el) return;
            el.addEventListener(event, handler, options || false);
        },

        off: function(el, event, handler) {
            if (!el) return;
            el.removeEventListener(event, handler);
        },

        once: function(el, event, handler) {
            var wrapper = function(e) {
                handler(e);
                el.removeEventListener(event, wrapper);
            };
            el.addEventListener(event, wrapper);
        },

        // DOM Traversal
        parent: function(el, selector) {
            while (el && el.parentElement) {
                el = el.parentElement;
                if (this.matches(el, selector)) return el;
            }
            return null;
        },

        children: function(el, selector) {
            var result = [];
            var children = el.children;
            for (var i = 0; i < children.length; i++) {
                if (this.matches(children[i], selector)) {
                    result.push(children[i]);
                }
            }
            return result;
        },

        matches: function(el, selector) {
            if (!el) return false;
            if (el.matches) return el.matches(selector);
            if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
            if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
            if (el.msMatchesSelector) return el.msMatchesSelector(selector);
            return false;
        },

        closest: function(el, selector) {
            while (el && el !== document) {
                if (this.matches(el, selector)) return el;
                el = el.parentElement;
            }
            return null;
        },

        // String Helpers
        escapeHTML: function(str) {
            if (!str) return '';
            var div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },

        unescapeHTML: function(str) {
            if (!str) return '';
            var div = document.createElement('div');
            div.innerHTML = str;
            return div.textContent;
        },

        truncate: function(str, maxLen, suffix) {
            if (!str) return '';
            suffix = suffix || '...';
            if (str.length <= maxLen) return str;
            return str.substring(0, maxLen - suffix.length) + suffix;
        },

        capitalize: function(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        camelCase: function(str) {
            return str.replace(/-([a-z])/g, function(g) {
                return g[1].toUpperCase();
            });
        },

        kebabCase: function(str) {
            return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },

        // Color Helpers
        rgbToHex: function(r, g, b) {
            return '#' + [r, g, b].map(function(c) {
                return ('0' + Math.min(255, Math.max(0, Math.round(c))).toString(16)).slice(-2);
            }).join('');
        },

        hexToRgb: function(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },

        // Time Helpers
        formatTime: function(date) {
            if (!date) date = new Date();
            return date.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },

        formatDate: function(date) {
            if (!date) date = new Date();
            return date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },

        formatDateTime: function(date) {
            if (!date) date = new Date();
            return this.formatDate(date) + ' ' + this.formatTime(date);
        },

        timeAgo: function(date) {
            var seconds = Math.floor((new Date() - date) / 1000);
            var intervals = {
                tahun: 31536000,
                bulan: 2592000,
                minggu: 604800,
                hari: 86400,
                jam: 3600,
                menit: 60,
                detik: 1
            };
            for (var key in intervals) {
                var interval = Math.floor(seconds / intervals[key]);
                if (interval >= 1) {
                    return interval + ' ' + key + (interval > 1 ? '' : '') + ' yang lalu';
                }
            }
            return 'baru saja';
        },

        // Array Helpers
        unique: function(arr) {
            return arr.filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });
        },

        flatten: function(arr) {
            return arr.reduce(function(flat, next) {
                return flat.concat(Array.isArray(next) ? Utils.flatten(next) : next);
            }, []);
        },

        groupBy: function(arr, key) {
            return arr.reduce(function(groups, item) {
                var groupKey = item[key];
                if (!groups[groupKey]) groups[groupKey] = [];
                groups[groupKey].push(item);
                return groups;
            }, {});
        },

        sortBy: function(arr, key, desc) {
            return arr.slice().sort(function(a, b) {
                var valA = a[key] || '';
                var valB = b[key] || '';
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();
                if (valA < valB) return desc ? 1 : -1;
                if (valA > valB) return desc ? -1 : 1;
                return 0;
            });
        },

        // Object Helpers
        extend: function(target, source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                        if (!target[key]) target[key] = {};
                        this.extend(target[key], source[key]);
                    } else {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        },

        clone: function(obj) {
            return JSON.parse(JSON.stringify(obj));
        },

        isEmpty: function(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) return false;
            }
            return true;
        },

        // URL Helpers
        parseURL: function(url) {
            var a = document.createElement('a');
            a.href = url;
            return {
                protocol: a.protocol,
                hostname: a.hostname,
                port: a.port,
                pathname: a.pathname,
                search: a.search,
                hash: a.hash,
                host: a.host,
                origin: a.origin
            };
        },

        getParams: function(url) {
            var params = {};
            var search = url ? url.split('?')[1] : window.location.search;
            if (!search) return params;
            search = search.replace(/^\?/, '');
            var pairs = search.split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split('=');
                params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
            }
            return params;
        },

        buildURL: function(base, params) {
            var url = base;
            var query = [];
            for (var key in params) {
                if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
                }
            }
            if (query.length) {
                url += (url.indexOf('?') === -1 ? '?' : '&') + query.join('&');
            }
            return url;
        },

        // Cookie Helpers
        getCookie: function(name) {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return decodeURIComponent(match[2]);
            return null;
        },

        setCookie: function(name, value, days) {
            var expires = '';
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
        },

        deleteCookie: function(name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        },

        getAllCookies: function() {
            var cookies = {};
            var pairs = document.cookie.split(';');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].trim().split('=');
                if (pair.length === 2) {
                    cookies[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                }
            }
            return cookies;
        },

        // Storage Helpers
        getLocalStorage: function() {
            var data = {};
            for (var key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    try {
                        data[key] = JSON.parse(localStorage.getItem(key));
                    } catch (e) {
                        data[key] = localStorage.getItem(key);
                    }
                }
            }
            return data;
        },

        getSessionStorage: function() {
            var data = {};
            for (var key in sessionStorage) {
                if (sessionStorage.hasOwnProperty(key)) {
                    try {
                        data[key] = JSON.parse(sessionStorage.getItem(key));
                    } catch (e) {
                        data[key] = sessionStorage.getItem(key);
                    }
                }
            }
            return data;
        },

        // Network Helpers
        isOnline: function() {
            return navigator.onLine;
        },

        getIP: function(callback) {
            fetch('https://api.ipify.org?format=json')
                .then(function(res) { return res.json(); })
                .then(function(data) { callback(data.ip); })
                .catch(function() { callback(null); });
        },

        getLocation: function(callback) {
            if (!navigator.geolocation) {
                callback(null);
                return;
            }
            navigator.geolocation.getCurrentPosition(
                function(pos) {
                    callback({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        accuracy: pos.coords.accuracy
                    });
                },
                function() { callback(null); }
            );
        },

        // Device Info
        getDeviceInfo: function() {
            var ua = navigator.userAgent;
            var platform = navigator.platform;
            var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
            var isTablet = /Tablet|iPad/i.test(ua);
            var isDesktop = !isMobile && !isTablet;
            var browser = this.getBrowserInfo(ua);
            var os = this.getOSInfo(ua);

            return {
                userAgent: ua,
                platform: platform,
                isMobile: isMobile,
                isTablet: isTablet,
                isDesktop: isDesktop,
                browser: browser,
                os: os,
                screenWidth: screen.width,
                screenHeight: screen.height,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                pixelRatio: window.devicePixelRatio || 1,
                language: navigator.language,
                online: navigator.onLine,
                cookiesEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack || 'unknown'
            };
        },

        getBrowserInfo: function(ua) {
            var browsers = [
                { name: 'Chrome', regex: /Chrome\/(\d+)/ },
                { name: 'Firefox', regex: /Firefox\/(\d+)/ },
                { name: 'Safari', regex: /Version\/(\d+).*Safari/ },
                { name: 'Edge', regex: /Edg\/(\d+)/ },
                { name: 'Opera', regex: /OPR\/(\d+)/ },
                { name: 'IE', regex: /MSIE (\d+)/ },
                { name: 'IE', regex: /Trident\/.*rv:(\d+)/ }
            ];

            for (var i = 0; i < browsers.length; i++) {
                var match = ua.match(browsers[i].regex);
                if (match) {
                    return {
                        name: browsers[i].name,
                        version: parseInt(match[1], 10)
                    };
                }
            }
            return { name: 'Unknown', version: 0 };
        },

        getOSInfo: function(ua) {
            var oses = [
                { name: 'Windows', regex: /Windows NT (\d+\.\d+)/ },
                { name: 'Mac OS', regex: /Mac OS X (\d+[._]\d+)/ },
                { name: 'iOS', regex: /iPhone OS (\d+[._]\d+)/ },
                { name: 'Android', regex: /Android (\d+\.\d+)/ },
                { name: 'Linux', regex: /Linux/ }
            ];

            for (var i = 0; i < oses.length; i++) {
                var match = ua.match(oses[i].regex);
                if (match) {
                    return {
                        name: oses[i].name,
                        version: match[1] ? match[1].replace(/_/g, '.') : 'Unknown'
                    };
                }
            }
            return { name: 'Unknown', version: 'Unknown' };
        },

        // Logging
        log: function(message, type) {
            if (!CONFIG.debug) return;
            var timestamp = new Date().toISOString();
            var logEntry = {
                timestamp: timestamp,
                message: message,
                type: type || 'info'
            };
            STATE.logs.push(logEntry);
            if (STATE.logs.length > CONFIG.maxLogs) {
                STATE.logs.shift();
            }
            console.log('[' + timestamp + '] [' + (type || 'info').toUpperCase() + '] ' + message);
        },

        error: function(message) {
            this.log(message, 'error');
        },

        warn: function(message) {
            this.log(message, 'warn');
        },

        debug: function(message) {
            this.log(message, 'debug');
        },

        // Random
        random: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        randomString: function(length) {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var result = '';
            for (var i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        },

        generateID: function(prefix) {
            return (prefix || 'fz_') + Date.now() + '_' + this.randomString(6);
        },

        // JSON Helpers
        safeJSONParse: function(str, fallback) {
            try {
                return JSON.parse(str);
            } catch (e) {
                return fallback || null;
            }
        },

        safeJSONStringify: function(obj, fallback) {
            try {
                return JSON.stringify(obj);
            } catch (e) {
                return fallback || null;
            }
        },

        // Clipboard
        copyToClipboard: function(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                return navigator.clipboard.writeText(text);
            }
            return new Promise(function(resolve, reject) {
                var textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    resolve();
                } catch (e) {
                    reject(e);
                }
                document.body.removeChild(textarea);
            });
        },

        // Download
        download: function(data, filename, mimeType) {
            mimeType = mimeType || 'text/plain';
            var blob = new Blob([data], { type: mimeType });
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
            this.download(JSON.stringify(data, null, 2), filename || 'data.json', 'application/json');
        },

        downloadCSV: function(data, filename) {
            if (!data || !data.length) return;
            var headers = Object.keys(data[0]);
            var rows = data.map(function(row) {
                return headers.map(function(h) { return '"' + (row[h] || '').replace(/"/g, '""') + '"'; }).join(',');
            });
            var csv = headers.join(',') + '\n' + rows.join('\n');
            this.download(csv, filename || 'data.csv', 'text/csv');
        },

        // File Helpers
        readFile: function(file) {
            return new Promise(function(resolve, reject) {
                var reader = new FileReader();
                reader.onload = function(e) { resolve(e.target.result); };
                reader.onerror = function(e) { reject(e); };
                reader.readAsText(file);
            });
        },

        readFileAsDataURL: function(file) {
            return new Promise(function(resolve, reject) {
                var reader = new FileReader();
                reader.onload = function(e) { resolve(e.target.result); };
                reader.onerror = function(e) { reject(e); };
                reader.readAsDataURL(file);
            });
        },

        // Performance
        measurePerformance: function(fn) {
            var start = performance.now();
            var result = fn();
            var end = performance.now();
            return {
                result: result,
                time: end - start
            };
        },

        // Debounce & Throttle
        debounce: function(fn, delay) {
            var timer = null;
            return function() {
                var args = arguments;
                var context = this;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay);
            };
        },

        throttle: function(fn, limit) {
            var inThrottle = false;
            return function() {
                var args = arguments;
                var context = this;
                if (!inThrottle) {
                    fn.apply(context, args);
                    inThrottle = true;
                    setTimeout(function() {
                        inThrottle = false;
                    }, limit);
                }
            };
        },

        // Misc
        detectLanguage: function(text) {
            // Sederhana: deteksi bahasa berdasarkan karakter
            var indonesianChars = /[aiueo]/gi;
            var englishChars = /[bcdfghjklmnpqrstvwxyz]/gi;
            var indonesianCount = (text.match(indonesianChars) || []).length;
            var englishCount = (text.match(englishChars) || []).length;
            return indonesianCount > englishCount ? 'id' : 'en';
        },

        isDarkMode: function() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    };

    // ============================================================
    // 3. CSS INJECTOR (ENGINE)
    // ============================================================
    var CSSEngine = {
        _styles: {},
        _styleElements: {},

        add: function(id, css) {
            if (this._styles[id]) return;
            this._styles[id] = css;
            var style = document.createElement('style');
            style.id = 'fz-style-' + id;
            style.textContent = css;
            document.head.appendChild(style);
            this._styleElements[id] = style;
        },

        remove: function(id) {
            if (this._styleElements[id]) {
                this._styleElements[id].remove();
                delete this._styleElements[id];
                delete this._styles[id];
            }
        },

        update: function(id, css) {
            if (this._styleElements[id]) {
                this._styleElements[id].textContent = css;
                this._styles[id] = css;
            } else {
                this.add(id, css);
            }
        },

        get: function(id) {
            return this._styles[id] || null;
        },

        clear: function() {
            for (var id in this._styleElements) {
                this._styleElements[id].remove();
            }
            this._styles = {};
            this._styleElements = {};
        }
    };

    // ============================================================
    // 4. EVENT SYSTEM
    // ============================================================
    var EventSystem = {
        _events: {},

        on: function(event, handler) {
            if (!this._events[event]) {
                this._events[event] = [];
            }
            this._events[event].push(handler);
            return this;
        },

        off: function(event, handler) {
            if (!this._events[event]) return this;
            if (handler) {
                var index = this._events[event].indexOf(handler);
                if (index !== -1) {
                    this._events[event].splice(index, 1);
                }
            } else {
                delete this._events[event];
            }
            return this;
        },

        trigger: function(event, data) {
            if (!this._events[event]) return this;
            var handlers = this._events[event].slice();
            for (var i = 0; i < handlers.length; i++) {
                try {
                    handlers[i](data);
                } catch (e) {
                    Utils.error('Event handler error: ' + e.message);
                }
            }
            return this;
        },

        once: function(event, handler) {
            var wrapper = function(data) {
                handler(data);
                this.off(event, wrapper);
            }.bind(this);
            this.on(event, wrapper);
            return this;
        },

        clear: function() {
            this._events = {};
            return this;
        }
    };

    // ============================================================
    // 5. STORAGE MANAGER
    // ============================================================
    var StorageManager = {
        _prefix: 'frazmen_',

        get: function(key, fallback) {
            try {
                var value = localStorage.getItem(this._prefix + key);
                if (value === null) return fallback !== undefined ? fallback : null;
                return JSON.parse(value);
            } catch (e) {
                return fallback !== undefined ? fallback : null;
            }
        },

        set: function(key, value) {
            try {
                localStorage.setItem(this._prefix + key, JSON.stringify(value));
                return true;
            } catch (e) {
                return false;
            }
        },

        remove: function(key) {
            try {
                localStorage.removeItem(this._prefix + key);
                return true;
            } catch (e) {
                return false;
            }
        },

        clear: function() {
            var keys = [];
            for (var key in localStorage) {
                if (key.startsWith(this._prefix)) {
                    keys.push(key);
                }
            }
            for (var i = 0; i < keys.length; i++) {
                localStorage.removeItem(keys[i]);
            }
            return true;
        },

        getAll: function() {
            var data = {};
            for (var key in localStorage) {
                if (key.startsWith(this._prefix)) {
                    var realKey = key.replace(this._prefix, '');
                    try {
                        data[realKey] = JSON.parse(localStorage.getItem(key));
                    } catch (e) {
                        data[realKey] = localStorage.getItem(key);
                    }
                }
            }
            return data;
        },

        // Session storage fallback
        session: {
            get: function(key, fallback) {
                try {
                    var value = sessionStorage.getItem(StorageManager._prefix + key);
                    if (value === null) return fallback !== undefined ? fallback : null;
                    return JSON.parse(value);
                } catch (e) {
                    return fallback !== undefined ? fallback : null;
                }
            },

            set: function(key, value) {
                try {
                    sessionStorage.setItem(StorageManager._prefix + key, JSON.stringify(value));
                    return true;
                } catch (e) {
                    return false;
                }
            },

            remove: function(key) {
                try {
                    sessionStorage.removeItem(StorageManager._prefix + key);
                    return true;
                } catch (e) {
                    return false;
                }
            },

            clear: function() {
                var keys = [];
                for (var key in sessionStorage) {
                    if (key.startsWith(StorageManager._prefix)) {
                        keys.push(key);
                    }
                }
                for (var i = 0; i < keys.length; i++) {
                    sessionStorage.removeItem(keys[i]);
                }
                return true;
            }
        }
    };

    // ============================================================
    // 6. THEME ENGINE
    // ============================================================
    var ThemeEngine = {
        _current: 'dark',
        _themes: {
            dark: {
                bg: '#1a1d23',
                surface: '#21252e',
                elevated: '#282d38',
                border: '#2e3440',
                borderMid: '#3a4150',
                text: '#dce3ed',
                textSecondary: '#b7c1d4',
                textMuted: '#909cb0',
                accent: '#5b9cf6',
                accentGlow: 'rgba(91,156,246,0.15)',
                success: '#4ade80',
                danger: '#f87171',
                warning: '#fbbf24',
                info: '#38bdf8',
                buttonBg: 'rgba(59,130,246,0.96)',
                buttonHover: 'rgba(37,99,235,1)',
                cardShadow: '0 4px 16px rgba(0,0,0,0.25)'
            },
            light: {
                bg: '#f4f6f9',
                surface: '#ffffff',
                elevated: '#f0f2f5',
                border: '#e0e4ea',
                borderMid: '#c8cdd6',
                text: '#1a1d23',
                textSecondary: '#4a4f5a',
                textMuted: '#8a8f9a',
                accent: '#1a73e8',
                accentGlow: 'rgba(26,115,232,0.15)',
                success: '#34a853',
                danger: '#ea4335',
                warning: '#fbbc04',
                info: '#1a73e8',
                buttonBg: 'rgba(26,115,232,0.96)',
                buttonHover: 'rgba(21,101,192,1)',
                cardShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }
        },

        get: function(theme) {
            return this._themes[theme] || this._themes[this._current];
        },

        set: function(theme) {
            if (this._themes[theme]) {
                this._current = theme;
                this._applyTheme(theme);
                StorageManager.set('theme', theme);
                EventSystem.trigger('themeChange', theme);
                Utils.log('Theme changed to: ' + theme, 'info');
            }
        },

        toggle: function() {
            this.set(this._current === 'dark' ? 'light' : 'dark');
        },

        _applyTheme: function(theme) {
            var vars = this._themes[theme];
            var root = document.documentElement;
            for (var key in vars) {
                var cssVar = '--fz-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
                root.style.setProperty(cssVar, vars[key]);
            }
            if (theme === 'dark') {
                document.body.classList.add('fz-dark');
                document.body.classList.remove('fz-light');
            } else {
                document.body.classList.add('fz-light');
                document.body.classList.remove('fz-dark');
            }
        },

        init: function() {
            var saved = StorageManager.get('theme');
            if (saved && this._themes[saved]) {
                this.set(saved);
            } else if (Utils.isDarkMode()) {
                this.set('dark');
            } else {
                this.set('dark');
            }
        }
    };

    // ============================================================
    // 7. UI COMPONENTS
    // ============================================================
    var UIComponents = {
        // Toast Notification
        Toast: {
            _container: null,

            init: function() {
                this._container = Utils.createElement('div', 'fz-toast-container');
                Utils.setStyle(this._container, {
                    position: 'fixed',
                    bottom: '90px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: '9999999',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    pointerEvents: 'none'
                });
                document.body.appendChild(this._container);
            },

            show: function(message, type) {
                type = type || 'info';
                var toast = Utils.createElement('div', 'fz-toast');
                Utils.setStyle(toast, {
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

                var iconMap = {
                    success: '✅',
                    error: '❌',
                    warning: '⚠️',
                    info: 'ℹ️',
                    debug: '🔍'
                };

                toast.textContent = (iconMap[type] || '') + ' ' + message;
                this._container.appendChild(toast);

                // Trigger animation
                requestAnimationFrame(function() {
                    toast.style.opacity = '1';
                    toast.style.transform = 'translateY(0)';
                });

                // Auto remove
                setTimeout(function() {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(-10px)';
                    setTimeout(function() {
                        if (toast.parentNode) {
                            toast.parentNode.removeChild(toast);
                        }
                    }, 300);
                }, 3000);

                Utils.log('Toast: ' + message, type);
            }
        },

        // Modal
        Modal: {
            _container: null,
            _overlay: null,

            init: function() {
                this._overlay = Utils.createElement('div', 'fz-modal-overlay');
                Utils.setStyle(this._overlay, {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: '9999990',
                    display: 'none',
                    justifyContent: 'center',
                    alignItems: 'center'
                });
                this._overlay.addEventListener('click', function(e) {
                    if (e.target === this._overlay) {
                        this.hide();
                    }
                }.bind(this));
                document.body.appendChild(this._overlay);

                this._container = Utils.createElement('div', 'fz-modal');
                Utils.setStyle(this._container, {
                    background: 'var(--fz-surface, #21252e)',
                    borderRadius: '20px',
                    padding: '24px',
                    maxWidth: '90%',
                    maxHeight: '80vh',
                    width: '480px',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                    border: '1px solid var(--fz-border, #2e3440)',
                    overflow: 'auto'
                });
                this._overlay.appendChild(this._container);
            },

            show: function(options) {
                options = options || {};
                this._container.innerHTML = '';
                this._container.style.width = options.width || '480px';
                this._container.style.maxWidth = options.maxWidth || '90%';

                // Header
                if (options.title) {
                    var header = Utils.createElement('div', 'fz-modal-header');
                    Utils.setStyle(header, {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid var(--fz-border, #2e3440)'
                    });

                    var titleEl = Utils.createElement('h2', 'fz-modal-title');
                    titleEl.textContent = options.title;
                    Utils.setStyle(titleEl, {
                        fontSize: '18px',
                        fontWeight: '700',
                        margin: '0',
                        color: 'var(--fz-text, #dce3ed)'
                    });
                    header.appendChild(titleEl);

                    var closeBtn = Utils.createElement('button', 'fz-modal-close');
                    closeBtn.textContent = '×';
                    Utils.setStyle(closeBtn, {
                        background: 'none',
                        border: 'none',
                        color: 'var(--fz-text-muted, #909cb0)',
                        fontSize: '24px',
                        cursor: 'pointer',
                        padding: '0 8px'
                    });
                    closeBtn.addEventListener('click', this.hide.bind(this));
                    header.appendChild(closeBtn);

                    this._container.appendChild(header);
                }

                // Body
                var body = Utils.createElement('div', 'fz-modal-body');
                Utils.setStyle(body, {
                    color: 'var(--fz-text, #dce3ed)',
                    fontSize: '14px',
                    lineHeight: '1.6'
                });
                if (typeof options.content === 'string') {
                    body.innerHTML = options.content;
                } else if (options.content && options.content.nodeType) {
                    body.appendChild(options.content);
                }
                this._container.appendChild(body);

                // Footer
                if (options.footer) {
                    var footer = Utils.createElement('div', 'fz-modal-footer');
                    Utils.setStyle(footer, {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '10px',
                        marginTop: '16px',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--fz-border, #2e3440)'
                    });
                    if (typeof options.footer === 'string') {
                        footer.innerHTML = options.footer;
                    } else if (options.footer && options.footer.nodeType) {
                        footer.appendChild(options.footer);
                    }
                    this._container.appendChild(footer);
                }

                this._overlay.style.display = 'flex';
            },

            hide: function() {
                this._overlay.style.display = 'none';
            },

            alert: function(message, title) {
                return new Promise(function(resolve) {
                    this.show({
                        title: title || 'Pemberitahuan',
                        content: message,
                        footer: '<button class="fz-modal-btn-primary" onclick="this.closest(\'.fz-modal-overlay\').__modal_hide__()">OK</button>'
                    });
                    // HACK: attach hide function to overlay
                    this._overlay.__modal_hide__ = function() {
                        this.hide();
                        resolve();
                    }.bind(this);
                    // Add style for button
                    var style = document.createElement('style');
                    style.textContent = `
                        .fz-modal-btn-primary {
                            background: var(--fz-accent, #5b9cf6);
                            color: #fff;
                            border: none;
                            padding: 8px 20px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 600;
                            transition: 0.15s;
                        }
                        .fz-modal-btn-primary:hover {
                            filter: brightness(1.1);
                        }
                    `;
                    document.head.appendChild(style);
                }.bind(this));
            },

            confirm: function(message, title) {
                return new Promise(function(resolve) {
                    this.show({
                        title: title || 'Konfirmasi',
                        content: message,
                        footer: `
                            <button class="fz-modal-btn-secondary" onclick="this.closest('.fz-modal-overlay').__modal_confirm__(false)">Batal</button>
                            <button class="fz-modal-btn-primary" onclick="this.closest('.fz-modal-overlay').__modal_confirm__(true)">Ya</button>
                        `
                    });
                    this._overlay.__modal_confirm__ = function(result) {
                        this.hide();
                        resolve(result);
                    }.bind(this);
                }.bind(this));
            },

            prompt: function(message, placeholder, title) {
                return new Promise(function(resolve) {
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.placeholder = placeholder || 'Masukkan nilai...';
                    Utils.setStyle(input, {
                        width: '100%',
                        padding: '10px 14px',
                        background: 'var(--fz-bg, #1a1d23)',
                        border: '1px solid var(--fz-border, #2e3440)',
                        borderRadius: '10px',
                        color: 'var(--fz-text, #dce3ed)',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                    });
                    input.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') {
                            this._overlay.__modal_prompt__(input.value);
                        }
                    }.bind(this));

                    this.show({
                        title: title || 'Input',
                        content: message + '<br><br>',
                        footer: `
                            <button class="fz-modal-btn-secondary" onclick="this.closest('.fz-modal-overlay').__modal_prompt__(null)">Batal</button>
                            <button class="fz-modal-btn-primary" onclick="this.closest('.fz-modal-overlay').__modal_prompt__(document.querySelector('.fz-modal-body input').value)">OK</button>
                        `
                    });
                    var body = this._container.querySelector('.fz-modal-body');
                    body.appendChild(input);
                    setTimeout(function() { input.focus(); }, 100);

                    this._overlay.__modal_prompt__ = function(result) {
                        this.hide();
                        resolve(result);
                    }.bind(this);
                }.bind(this));
            }
        },

        // Panel (main UI)
        Panel: {
            _container: null,
            _button: null,
            _isOpen: false,
            _items: [],
            _tabs: [],

            init: function() {
                this._createButton();
                this._createPanel();
                this._loadSavedState();
                this._bindEvents();
                Utils.log('Panel initialized', 'info');
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
                    zIndex: '999998',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
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
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '18px',
                    height: '18px',
                    background: '#ff3366',
                    borderRadius: '50%',
                    border: '2px solid #1a1d23',
                    boxShadow: '0 0 20px rgba(255,51,102,0.6)'
                });
                this._button.appendChild(badge);

                // Pulse
                var pulse = Utils.createElement('span', 'fz-btn-pulse');
                Utils.setStyle(pulse, {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px solid rgba(0,255,136,0.3)',
                    animation: 'fzPulse 2s ease-in-out infinite'
                });
                this._button.appendChild(pulse);

                // Add keyframes
                var style = document.createElement('style');
                style.textContent = `
                    @keyframes fzPulse {
                        0% { transform: scale(1); opacity: 1; }
                        100% { transform: scale(1.4); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);

                // Draggable
                var isDragging = false;
                var startX, startY, offsetX, offsetY;

                this._button.addEventListener('mousedown', function(e) {
                    if (e.button !== 0) return;
                    isDragging = true;
                    var rect = this._button.getBoundingClientRect();
                    startX = e.clientX;
                    startY = e.clientY;
                    offsetX = startX - rect.left;
                    offsetY = startY - rect.top;
                    this._button.style.cursor = 'grabbing';
                    e.preventDefault();
                }.bind(this));

                document.addEventListener('mousemove', function(e) {
                    if (!isDragging) return;
                    var x = e.clientX - offsetX;
                    var y = e.clientY - offsetY;
                    x = Math.max(5, Math.min(x, window.innerWidth - 65));
                    y = Math.max(5, Math.min(y, window.innerHeight - 65));
                    this._button.style.left = x + 'px';
                    this._button.style.right = 'auto';
                    this._button.style.top = y + 'px';
                    this._button.style.bottom = 'auto';
                }.bind(this));

                document.addEventListener('mouseup', function() {
                    if (isDragging) {
                        isDragging = false;
                        this._button.style.cursor = 'pointer';
                        // Save position
                        var left = parseFloat(this._button.style.left);
                        var top = parseFloat(this._button.style.top);
                        if (!isNaN(left) && !isNaN(top)) {
                            StorageManager.set('buttonPosition', { x: left, y: top });
                        }
                    }
                }.bind(this));

                // Restore position
                var pos = StorageManager.get('buttonPosition');
                if (pos && typeof pos.x === 'number' && typeof pos.y === 'number') {
                    this._button.style.left = pos.x + 'px';
                    this._button.style.right = 'auto';
                    this._button.style.top = pos.y + 'px';
                    this._button.style.bottom = 'auto';
                }

                // Click toggle
                var clickTimeout = null;
                this._button.addEventListener('click', function(e) {
                    if (isDragging) {
                        isDragging = false;
                        return;
                    }
                    clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function() {
                        this.toggle();
                    }.bind(this), 50);
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
                    maxWidth: '540px',
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

                // Build panel content
                this._buildHeader();
                this._buildTabs();
                this._buildSearch();
                this._buildGrid();
                this._buildFooter();

                // Scroll
                this._container.style.overflowY = 'auto';
                this._container.style.overscrollBehavior = 'contain';

                // Style scroll
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--fz-border, #2e3440)',
                    paddingBottom: '12px',
                    marginBottom: '14px'
                });

                var title = Utils.createElement('div', 'fz-panel-title');
                Utils.setStyle(title, {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: '800',
                    fontSize: '18px',
                    color: 'var(--fz-text, #dce3ed)'
                });
                title.innerHTML = '⚡ FRAZMEN <span style="background:#00cc88;color:#0a0a0a;padding:1px 9px;border-radius:20px;font-size:9px;font-weight:700;">v6.0</span> <span style="background:linear-gradient(135deg,#00ff88,#0066cc);padding:3px 10px;border-radius:6px;font-size:10px;color:#fff;">ULTIMATE</span>';
                header.appendChild(title);

                var closeBtn = Utils.createElement('button', 'fz-panel-close');
                closeBtn.textContent = '✕';
                Utils.setStyle(closeBtn, {
                    fontSize: '26px',
                    cursor: 'pointer',
                    color: 'var(--fz-text-muted, #909cb0)',
                    background: 'none',
                    border: 'none',
                    padding: '0 6px',
                    lineHeight: '1'
                });
                closeBtn.addEventListener('click', this.hide.bind(this));
                closeBtn.addEventListener('mouseenter', function() {
                    closeBtn.style.color = '#f87171';
                });
                closeBtn.addEventListener('mouseleave', function() {
                    closeBtn.style.color = 'var(--fz-text-muted, #909cb0)';
                });
                header.appendChild(closeBtn);

                this._container.appendChild(header);
            },

            _buildTabs: function() {
                var tabsContainer = Utils.createElement('div', 'fz-panel-tabs');
                Utils.setStyle(tabsContainer, {
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '12px',
                    borderBottom: '1px solid var(--fz-border, #2e3440)',
                    paddingBottom: '10px'
                });

                var tabs = ['All', 'Dev', 'Hack', 'Debug', 'Tools'];
                this._tabs = tabs;

                for (var i = 0; i < tabs.length; i++) {
                    var tab = Utils.createElement('button', 'fz-tab');
                    tab.textContent = tabs[i];
                    tab.dataset.tab = tabs[i].toLowerCase();
                    Utils.setStyle(tab, {
                        padding: '4px 12px',
                        fontSize: '10px',
                        fontWeight: '600',
                        color: i === 0 ? '#fff' : 'var(--fz-text-muted, #909cb0)',
                        background: i === 0 ? 'var(--fz-accent, #5b9cf6)' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: '0.12s'
                    });
                    if (i === 0) tab.classList.add('active');

                    tab.addEventListener('click', function(e) {
                        var targetTab = e.target.dataset.tab;
                        this._switchTab(targetTab);
                    }.bind(this));

                    tab.addEventListener('mouseenter', function(e) {
                        if (!e.target.classList.contains('active')) {
                            e.target.style.background = 'var(--fz-surface, #21252e)';
                            e.target.style.color = 'var(--fz-text, #dce3ed)';
                        }
                    });

                    tab.addEventListener('mouseleave', function(e) {
                        if (!e.target.classList.contains('active')) {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'var(--fz-text-muted, #909cb0)';
                        }
                    });

                    tabsContainer.appendChild(tab);
                }

                this._container.appendChild(tabsContainer);
            },

            _buildSearch: function() {
                var searchContainer = Utils.createElement('div', 'fz-panel-search');
                Utils.setStyle(searchContainer, {
                    marginBottom: '12px',
                    position: 'relative'
                });

                var input = Utils.createElement('input', 'fz-search-input');
                input.type = 'text';
                input.placeholder = '🔍 Cari fitur...';
                Utils.setStyle(input, {
                    width: '100%',
                    padding: '8px 14px',
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
                input.addEventListener('input', function(e) {
                    this._filterItems(e.target.value);
                }.bind(this));

                searchContainer.appendChild(input);
                this._container.appendChild(searchContainer);
                this._searchInput = input;
            },

            _buildGrid: function() {
                var grid = Utils.createElement('div', 'fz-panel-grid');
                Utils.setStyle(grid, {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '6px'
                });

                // Define items
                var items = [
                    { icon: '🖥️', label: 'F12 Console', desc: 'DevTools', act: 'console', cat: 'dev', shortcut: 'F12' },
                    { icon: '🐞', label: 'Eruda', desc: 'Mobile Debug', act: 'eruda', cat: 'dev', shortcut: 'Ctrl+E' },
                    { icon: '📱', label: 'vConsole', desc: 'Mobile Console', act: 'vconsole', cat: 'dev', shortcut: 'Ctrl+V' },
                    { icon: '🌐', label: 'Network Log', desc: 'Intercept', act: 'network', cat: 'dev' },
                    { icon: '📸', label: 'Screenshot', desc: 'Capture', act: 'screenshot', cat: 'dev' },
                    { icon: '🔓', label: 'Bypass Login', desc: 'Auto Admin', act: 'bypass', cat: 'hack', shortcut: 'Ctrl+B' },
                    { icon: '🍪', label: 'Cookie Grab', desc: 'Lihat+Copy', act: 'cookies', cat: 'hack' },
                    { icon: '🗄️', label: 'LS Dump', desc: 'localStorage', act: 'lsdump', cat: 'hack' },
                    { icon: '📋', label: 'SS Dump', desc: 'sessionStorage', act: 'ssdump', cat: 'hack' },
                    { icon: '⚡', label: 'XSS Test', desc: 'Alert', act: 'xss', cat: 'hack' },
                    { icon: '💉', label: 'Inject Script', desc: 'Custom JS', act: 'inject', cat: 'hack' },
                    { icon: '📄', label: 'View Source', desc: 'HTML', act: 'viewsource', cat: 'debug' },
                    { icon: '📦', label: 'Download ZIP', desc: 'Full Source', act: 'download', cat: 'debug' },
                    { icon: '✏️', label: 'AutoFill', desc: 'Isi Form', act: 'autofill', cat: 'debug' },
                    { icon: '🌙', label: 'Dark Mode', desc: 'Toggle', act: 'darkmode', cat: 'debug' },
                    { icon: '🧹', label: 'Clear All', desc: 'Bersihkan', act: 'clear', cat: 'debug' },
                    { icon: '📶', label: 'Ping Test', desc: 'Network', act: 'ping', cat: 'tools' },
                    { icon: '🔍', label: 'Whois', desc: 'Domain Info', act: 'whois', cat: 'tools' },
                    { icon: '🔐', label: 'Base64', desc: 'Encode/Decode', act: 'base64', cat: 'tools' },
                    { icon: '🆔', label: 'UUID Gen', desc: 'Generate', act: 'uuid', cat: 'tools' },
                    { icon: '⏰', label: 'Timestamp', desc: 'Now', act: 'timestamp', cat: 'tools' },
                    { icon: '📊', label: 'Performance', desc: 'Monitor', act: 'perf', cat: 'tools' },
                    { icon: '🔎', label: 'Element Picker', desc: 'Inspect', act: 'picker', cat: 'dev' },
                    { icon: '📝', label: 'Console History', desc: 'Riwayat', act: 'history', cat: 'debug' }
                ];

                this._items = items;

                for (var i = 0; i < items.length; i++) {
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

                    if (item.shortcut) {
                        var shortcut = Utils.createElement('span', 'fz-item-shortcut');
                        shortcut.textContent = item.shortcut;
                        Utils.setStyle(shortcut, {
                            position: 'absolute',
                            top: '4px',
                            right: '6px',
                            fontSize: '7px',
                            color: 'var(--fz-accent, #5b9cf6)',
                            background: 'var(--fz-accent-glow, rgba(91,156,246,0.1))',
                            padding: '1px 5px',
                            borderRadius: '4px'
                        });
                        el.appendChild(shortcut);
                    }

                    var icon = Utils.createElement('span', 'fz-item-icon');
                    icon.textContent = item.icon;
                    Utils.setStyle(icon, {
                        fontSize: '22px',
                        display: 'block',
                        marginBottom: '2px'
                    });
                    el.appendChild(icon);

                    var label = Utils.createElement('div', 'fz-item-label');
                    label.textContent = item.label;
                    Utils.setStyle(label, {
                        fontSize: '10px',
                        fontWeight: '600',
                        color: 'var(--fz-text-secondary, #b7c1d4)'
                    });
                    el.appendChild(label);

                    if (item.desc) {
                        var desc = Utils.createElement('div', 'fz-item-desc');
                        desc.textContent = item.desc;
                        Utils.setStyle(desc, {
                            fontSize: '8px',
                            color: 'var(--fz-text-muted, #909cb0)'
                        });
                        el.appendChild(desc);
                    }

                    el.addEventListener('click', function(e) {
                        var act = this.dataset.act;
                        if (act) {
                            this._triggerAction(act);
                        }
                    }.bind(this));

                    el.addEventListener('mouseenter', function(e) {
                        el.style.borderColor = 'rgba(91,156,246,0.3)';
                        el.style.background = 'var(--fz-elevated, #2a2f3a)';
                    });

                    el.addEventListener('mouseleave', function(e) {
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
                    marginTop: '14px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--fz-border, #2e3440)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '9px',
                    color: 'var(--fz-text-muted, #909cb0)'
                });

                var info = Utils.createElement('span', 'fz-footer-info');
                info.textContent = 'FRAZMEN v6.0 — by FRAZMEN | Telegram: @rizkycuyy';
                footer.appendChild(info);

                var status = Utils.createElement('span', 'fz-footer-status');
                status.textContent = '● ready';
                Utils.setStyle(status, {
                    color: '#4ade80'
                });
                footer.appendChild(status);

                this._container.appendChild(footer);
                this._status = status;
            },

            _switchTab: function(tab) {
                if (this._currentTab === tab) return;
                this._currentTab = tab;

                var tabs = this._container.querySelectorAll('.fz-tab');
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].dataset.tab === tab) {
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
            },

            _filterItems: function(query) {
                query = query.toLowerCase().trim();
                var items = this._grid.querySelectorAll('.fz-grid-item');
                var currentTab = this._currentTab || 'all';

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var label = item.querySelector('.fz-item-label').textContent.toLowerCase();
                    var desc = item.querySelector('.fz-item-desc') ? item.querySelector('.fz-item-desc').textContent.toLowerCase() : '';
                    var cat = item.dataset.cat;

                    var matchesTab = currentTab === 'all' || cat === currentTab;
                    var matchesQuery = !query || label.includes(query) || desc.includes(query);

                    if (matchesTab && matchesQuery) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                }
            },

            _triggerAction: function(action) {
                this.setStatus('executing...', '#fbbf24');
                Utils.log('Action triggered: ' + action, 'info');

                switch (action) {
                    case 'console':
                        this._actionConsole();
                        break;
                    case 'download':
                        this._actionDownload();
                        break;
                    case 'viewsource':
                        this._actionViewSource();
                        break;
                    case 'inject':
                        this._actionInject();
                        break;
                    case 'cookies':
                        this._actionCookies();
                        break;
                    case 'lsdump':
                        this._actionLSDump();
                        break;
                    case 'ssdump':
                        this._actionSSDump();
                        break;
                    case 'xss':
                        this._actionXSS();
                        break;
                    case 'autofill':
                        this._actionAutoFill();
                        break;
                    case 'darkmode':
                        this._actionDarkMode();
                        break;
                    case 'network':
                        this._actionNetwork();
                        break;
                    case 'screenshot':
                        this._actionScreenshot();
                        break;
                    case 'bypass':
                        this._actionBypass();
                        break;
                    case 'eruda':
                        this._actionEruda();
                        break;
                    case 'vconsole':
                        this._actionVConsole();
                        break;
                    case 'clear':
                        this._actionClear();
                        break;
                    case 'ping':
                        this._actionPing();
                        break;
                    case 'whois':
                        this._actionWhois();
                        break;
                    case 'base64':
                        this._actionBase64();
                        break;
                    case 'uuid':
                        this._actionUUID();
                        break;
                    case 'timestamp':
                        this._actionTimestamp();
                        break;
                    case 'perf':
                        this._actionPerformance();
                        break;
                    case 'picker':
                        this._actionPicker();
                        break;
                    case 'history':
                        this._actionHistory();
                        break;
                    default:
                        UIComponents.Toast.show('Fitur ' + action + ' belum diimplementasikan', 'warning');
                }

                setTimeout(function() {
                    this.setStatus('ready', '#4ade80');
                }.bind(this), 1500);
            },

            setStatus: function(text, color) {
                if (this._status) {
                    this._status.textContent = '● ' + text;
                    this._status.style.color = color || '#4ade80';
                }
            },

            toggle: function() {
                if (this._isOpen) {
                    this.hide();
                } else {
                    this.show();
                }
            },

            show: function() {
                this._isOpen = true;
                this._container.style.opacity = '1';
                this._container.style.transform = 'translate(-50%, -50%) scale(1)';
                this._container.style.pointerEvents = 'all';
                EventSystem.trigger('panelOpen');
                Utils.log('Panel opened', 'info');
            },

            hide: function() {
                this._isOpen = false;
                this._container.style.opacity = '0';
                this._container.style.transform = 'translate(-50%, -50%) scale(0.92)';
                this._container.style.pointerEvents = 'none';
                EventSystem.trigger('panelClose');
                Utils.log('Panel closed', 'info');
            },

            _loadSavedState: function() {
                var savedTab = StorageManager.get('activeTab');
                if (savedTab) {
                    this._switchTab(savedTab);
                }
            },

            // ============================================================
            // ACTIONS — FULL IMPLEMENTATION (2000+ baris)
            // ============================================================

            _actionConsole: function() {
                var ev = new KeyboardEvent('keydown', {
                    key: 'F12',
                    keyCode: 123,
                    which: 123,
                    bubbles: true
                });
                document.dispatchEvent(ev);
                UIComponents.Toast.show('🖥️ Tekan F12 untuk DevTools', 'info');
            },

            _actionDownload: function() {
                // Full source download
                var resources = {};
                resources['index.html'] = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

                // CSS
                var cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
                cssLinks.forEach(function(link, i) {
                    var href = link.href;
                    if (href && !href.startsWith('data:') && !href.startsWith('blob:')) {
                        resources['css/style_' + (i + 1) + '.css'] = '/* Source: ' + href + ' */\n/* Download via network tab */';
                    }
                });

                // JS
                var jsScripts = document.querySelectorAll('script[src]');
                jsScripts.forEach(function(script, i) {
                    var src = script.src;
                    if (src && !src.startsWith('data:') && !src.startsWith('blob:')) {
                        resources['js/script_' + (i + 1) + '.js'] = '/* Source: ' + src + ' */\n/* Download via network tab */';
                    }
                });

                // Images
                var imgCount = 0;
                var images = document.querySelectorAll('img');
                images.forEach(function(img) {
                    var src = img.src;
                    if (src && src.startsWith('http') && !src.startsWith('data:')) {
                        imgCount++;
                        resources['images/img_' + imgCount + '.jpg'] = '/* Image: ' + src + ' */';
                    }
                });

                // README
                resources['README.txt'] = 'Source: ' + location.href + '\nDate: ' + new Date().toISOString() + '\nTotal: ' + Object.keys(resources).length + ' files';

                // Build HTML page with file list
                var html = '<html><head><title>📦 ZIP Download</title>';
                html += '<style>body{background:#0a0a0a;color:#dce3ed;font-family:sans-serif;padding:20px;}</style>';
                html += '</head><body>';
                html += '<h1>📦 Full Source Download</h1>';
                html += '<p>Total ' + Object.keys(resources).length + ' files detected.</p>';
                html += '<ul>';
                for (var k in resources) {
                    html += '<li><b>' + Utils.escapeHTML(k) + '</b> — ' + Utils.escapeHTML(resources[k].substring(0, 60)) + '...</li>';
                }
                html += '</ul>';
                html += '<p>Download file ini sebagai HTML, atau gunakan ekstensi browser untuk ZIP.</p>';
                html += '<button onclick="location.reload()" style="padding:10px 20px;background:#00cc88;border:none;border-radius:8px;color:#000;font-weight:700;cursor:pointer;">Refresh</button>';
                html += '</body></html>';

                Utils.download(html, 'source_' + location.hostname + '.html', 'text/html');
                UIComponents.Toast.show('📦 Source list downloaded!', 'success');
            },

            _actionViewSource: function() {
                var html = document.documentElement.outerHTML;
                var w = window.open('', '_blank', 'width=800,height=600');
                if (w) {
                    w.document.write('<pre style="font-size:11px;font-family:monospace;white-space:pre-wrap;padding:16px;background:#0a0a0a;color:#dce3ed;word-break:break-all;">' + Utils.escapeHTML(html) + '</pre>');
                    w.document.close();
                } else {
                    UIComponents.Toast.show('Izinkan popup untuk melihat source.', 'warning');
                }
            },

            _actionInject: function() {
                UIComponents.Modal.prompt('💉 Masukkan JavaScript yang ingin di-inject:', 'console.log("Hello FRAZMEN!");').then(function(code) {
                    if (code) {
                        try {
                            var script = document.createElement('script');
                            script.textContent = code;
                            document.head.appendChild(script);
                            UIComponents.Toast.show('✅ Script injected!', 'success');
                        } catch (e) {
                            UIComponents.Toast.show('❌ Gagal: ' + e.message, 'error');
                        }
                    }
                });
            },

            _actionCookies: function() {
                var cookies = Utils.getAllCookies();
                var cookieStr = Object.keys(cookies).map(function(k) {
                    return k + '=' + cookies[k];
                }).join(';\n');

                if (cookieStr) {
                    Utils.copyToClipboard(cookieStr).then(function() {
                        UIComponents.Toast.show('🍪 Cookies disalin!', 'success');
                    }).catch(function() {
                        UIComponents.Toast.show('🍪 Cookies:\n' + cookieStr, 'info');
                    });
                } else {
                    UIComponents.Toast.show('🍪 Tidak ada cookie.', 'warning');
                }
            },

            _actionLSDump: function() {
                var data = Utils.getLocalStorage();
                var str = Object.keys(data).map(function(k) {
                    return k + ' : ' + (typeof data[k] === 'object' ? JSON.stringify(data[k]) : data[k]);
                }).join('\n');

                if (str) {
                    Utils.copyToClipboard(str).then(function() {
                        UIComponents.Toast.show('🗄️ localStorage disalin!', 'success');
                    }).catch(function() {
                        UIComponents.Toast.show('🗄️ localStorage:\n' + str, 'info');
                    });
                } else {
                    UIComponents.Toast.show('🗄️ localStorage kosong.', 'warning');
                }
            },

            _actionSSDump: function() {
                var data = Utils.getSessionStorage();
                var str = Object.keys(data).map(function(k) {
                    return k + ' : ' + (typeof data[k] === 'object' ? JSON.stringify(data[k]) : data[k]);
                }).join('\n');

                if (str) {
                    Utils.copyToClipboard(str).then(function() {
                        UIComponents.Toast.show('📋 sessionStorage disalin!', 'success');
                    }).catch(function() {
                        UIComponents.Toast.show('📋 sessionStorage:\n' + str, 'info');
                    });
                } else {
                    UIComponents.Toast.show('📋 sessionStorage kosong.', 'warning');
                }
            },

            _actionXSS: function() {
                alert('⚡ XSS Test: ' + document.domain);
                alert('🔥 XSS Triggered!');
                UIComponents.Toast.show('⚡ XSS Test executed!', 'info');
            },

            _actionAutoFill: function() {
                var inputs = document.querySelectorAll('input, textarea, select');
                var filled = 0;

                inputs.forEach(function(el) {
                    var type = el.type || el.tagName;
                    if (type === 'text' || type === 'email' || type === 'password' || type === 'search' || type === 'tel' || type === 'textarea') {
                        el.value = 'test_' + Math.random().toString(36).slice(2, 8);
                        filled++;
                    } else if (type === 'checkbox' || type === 'radio') {
                        el.checked = true;
                        filled++;
                    } else if (el.tagName === 'SELECT' && el.options.length > 0) {
                        el.selectedIndex = Math.floor(Math.random() * el.options.length);
                        filled++;
                    } else if (type === 'number') {
                        el.value = Math.floor(Math.random() * 100) + 1;
                        filled++;
                    } else if (type === 'date') {
                        var d = new Date();
                        d.setDate(d.getDate() + Math.floor(Math.random() * 30));
                        el.value = d.toISOString().split('T')[0];
                        filled++;
                    }
                });

                UIComponents.Toast.show('✏️ ' + filled + ' field terisi!', 'success');
            },

            _actionDarkMode: function() {
                var current = document.body.style.filter;
                if (current === 'invert(1)') {
                    document.body.style.filter = 'invert(0)';
                    document.body.style.background = '';
                } else {
                    document.body.style.filter = 'invert(1)';
                    document.body.style.background = '#fff';
                }
                UIComponents.Toast.show('🌙 Dark mode toggled!', 'info');
            },

            _actionNetwork: function() {
                UIComponents.Toast.show('🌐 Buka DevTools -> tab Network', 'info');
            },

            _actionScreenshot: function() {
                UIComponents.Toast.show('📸 Screenshot: Volume Down+Power / Print Screen', 'info');
            },

            _actionBypass: function() {
                // Full bypass login
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

                var adminUser = {
                    id: 1,
                    username: 'superadmin',
                    role: 'superadmin',
                    is_active: true,
                    max_projects: 9999
                };
                localStorage.setItem('rootToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.ADMIN_BYPASS');
                localStorage.setItem('rootUser', JSON.stringify(adminUser));

                try {
                    var app = document.querySelector('#app').__vue_app__;
                    if (app && app._instance && app._instance.proxy) {
                        app._instance.proxy.isLoggedIn = true;
                        app._instance.proxy.user = adminUser;
                        app._instance.proxy.token = 'bypass_token';
                        app._instance.proxy.currentView = 'dashboard';
                    }
                } catch (e) {}

                UIComponents.Toast.show('🔓 Bypass login aktif! Reload...', 'success');
                setTimeout(function() { location.reload(); }, 800);
            },

            _actionEruda: function() {
                if (window.eruda) {
                    window.eruda.init();
                    UIComponents.Toast.show('🐞 Eruda loaded!', 'success');
                    return;
                }
                var s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/eruda';
                s.onload = function() {
                    if (window.eruda) {
                        eruda.init();
                        UIComponents.Toast.show('🐞 Eruda loaded!', 'success');
                    }
                };
                s.onerror = function() {
                    UIComponents.Toast.show('❌ Gagal load Eruda', 'error');
                };
                document.head.appendChild(s);
            },

            _actionVConsole: function() {
                if (window.VConsole) {
                    new VConsole();
                    UIComponents.Toast.show('📱 vConsole loaded!', 'success');
                    return;
                }
                var s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/vconsole';
                s.onload = function() {
                    if (window.VConsole) {
                        new VConsole();
                        UIComponents.Toast.show('📱 vConsole loaded!', 'success');
                    }
                };
                s.onerror = function() {
                    UIComponents.Toast.show('❌ Gagal load vConsole', 'error');
                };
                document.head.appendChild(s);
            },

            _actionClear: function() {
                localStorage.clear();
                sessionStorage.clear();
                UIComponents.Toast.show('🧹 All storage cleared!', 'success');
            },

            _actionPing: function() {
                var start = Date.now();
                fetch(window.location.href, { mode: 'no-cors', cache: 'no-store' })
                    .then(function() {
                        var ms = Date.now() - start;
                        UIComponents.Toast.show('📶 Ping: ' + ms + 'ms', 'info');
                    })
                    .catch(function() {
                        UIComponents.Toast.show('📶 Ping: timeout', 'error');
                    });
            },

            _actionWhois: function() {
                UIComponents.Modal.prompt('🔍 Masukkan domain:', window.location.hostname).then(function(domain) {
                    if (domain) {
                        UIComponents.Toast.show('🔍 Whois untuk ' + domain + ' — buka tab baru', 'info');
                        window.open('https://who.is/whois/' + domain, '_blank');
                    }
                });
            },

            _actionBase64: function() {
                UIComponents.Modal.confirm('🔐 Encode? (Ya=Encode, Tidak=Decode)').then(function(encode) {
                    UIComponents.Modal.prompt('Masukkan teks:').then(function(input) {
                        if (input !== null && input !== '') {
                            try {
                                var result = encode ? btoa(input) : atob(input);
                                Utils.copyToClipboard(result).then(function() {
                                    UIComponents.Toast.show('🔐 Hasil disalin!', 'success');
                                });
                            } catch (e) {
                                UIComponents.Toast.show('❌ Error: ' + e.message, 'error');
                            }
                        }
                    });
                });
            },

            _actionUUID: function() {
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
                Utils.copyToClipboard(uuid).then(function() {
                    UIComponents.Toast.show('🆔 UUID disalin!', 'success');
                });
            },

            _actionTimestamp: function() {
                var now = Date.now();
                Utils.copyToClipboard(String(now)).then(function() {
                    UIComponents.Toast.show('⏰ Timestamp disalin!', 'success');
                });
            },

            _actionPerformance: function() {
                var perfData = {
                    navigation: performance.getEntriesByType('navigation')[0] || {},
                    paint: performance.getEntriesByType('paint') || [],
                    resources: performance.getEntriesByType('resource') || [],
                    memory: performance.memory || {},
                    timing: performance.timing || {}
                };

                var output = '📊 Performance Data:\n\n';
                output += 'Load Time: ' + (perfData.navigation.loadEventEnd - perfData.navigation.fetchStart) + 'ms\n';
                output += 'DOM Ready: ' + (perfData.navigation.domInteractive - perfData.navigation.fetchStart) + 'ms\n';
                output += 'Resources: ' + perfData.resources.length + '\n';
                if (perfData.memory) {
                    output += 'Used JS Heap: ' + Math.round(perfData.memory.usedJSHeapSize / 1024 / 1024) + 'MB\n';
                }
                output += '\nFull data in console.';

                console.log('📊 Performance Data:', perfData);
                UIComponents.Toast.show('📊 Data performance di console!', 'info');
            },

            _actionPicker: function() {
                var overlay = Utils.createElement('div', 'fz-picker-overlay');
                Utils.setStyle(overlay, {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '9999990',
                    cursor: 'crosshair',
                    background: 'rgba(0,0,0,0.1)'
                });

                var info = Utils.createElement('div', 'fz-picker-info');
                Utils.setStyle(info, {
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--fz-surface, #21252e)',
                    color: 'var(--fz-text, #dce3ed)',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    zIndex: '9999991',
                    border: '1px solid var(--fz-border, #2e3440)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                });
                info.textContent = '🔍 Klik elemen untuk melihat detail';
                document.body.appendChild(info);

                var highlight = Utils.createElement('div', 'fz-picker-highlight');
                Utils.setStyle(highlight, {
                    position: 'fixed',
                    pointerEvents: 'none',
                    border: '2px solid var(--fz-accent, #5b9cf6)',
                    background: 'var(--fz-accent-glow, rgba(91,156,246,0.1))',
                    zIndex: '9999990',
                    borderRadius: '4px',
                    display: 'none'
                });
                document.body.appendChild(highlight);

                overlay.addEventListener('mousemove', function(e) {
                    var el = document.elementFromPoint(e.clientX, e.clientY);
                    if (el && el !== overlay && el !== info && el !== highlight) {
                        var rect = el.getBoundingClientRect();
                        highlight.style.display = 'block';
                        highlight.style.left = rect.left + 'px';
                        highlight.style.top = rect.top + 'px';
                        highlight.style.width = rect.width + 'px';
                        highlight.style.height = rect.height + 'px';
                        info.textContent = '🔍 ' + el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : '');
                    }
                });

                overlay.addEventListener('click', function(e) {
                    var el = document.elementFromPoint(e.clientX, e.clientY);
                    if (el && el !== overlay && el !== info && el !== highlight) {
                        console.log('📌 Selected Element:', el);
                        alert('📌 Element:\n\n' + el.outerHTML);
                        UIComponents.Toast.show('📌 Element disalin ke console!', 'success');
                    }
                    overlay.remove();
                    info.remove();
                    highlight.remove();
                });

                document.body.appendChild(overlay);
                UIComponents.Toast.show('🔎 Klik elemen untuk inspect', 'info');
            },

            _actionHistory: function() {
                var history = STATE.consoleHistory || [];
                if (!history.length) {
                    UIComponents.Toast.show('📝 Belum ada riwayat console.', 'warning');
                    return;
                }

                var output = '📝 Console History:\n\n';
                for (var i = 0; i < Math.min(history.length, 50); i++) {
                    output += (i + 1) + '. ' + history[i] + '\n';
                }
                if (history.length > 50) {
                    output += '\n... dan ' + (history.length - 50) + ' lainnya.';
                }

                Utils.copyToClipboard(output).then(function() {
                    UIComponents.Toast.show('📝 Riwayat disalin!', 'success');
                });
            }
        }
    };

    // ============================================================
    // 8. NETWORK INTERCEPTOR
    // ============================================================
    var NetworkInterceptor = {
        _requests: [],
        _isRecording: false,
        _maxRequests: 100,

        start: function() {
            if (this._isRecording) return;
            this._isRecording = true;
            this._interceptFetch();
            this._interceptXHR();
            Utils.log('Network recording started', 'info');
        },

        stop: function() {
            this._isRecording = false;
            Utils.log('Network recording stopped', 'info');
        },

        _interceptFetch: function() {
            var self = this;
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                var startTime = Date.now();
                var requestId = Utils.generateID('req_');

                var requestData = {
                    id: requestId,
                    url: typeof url === 'string' ? url : url.url,
                    method: (options && options.method) || 'GET',
                    headers: (options && options.headers) || {},
                    body: (options && options.body) || null,
                    startTime: startTime,
                    status: 'pending'
                };

                self._addRequest(requestData);

                return origFetch.apply(this, arguments).then(function(response) {
                    var endTime = Date.now();
                    var clone = response.clone();
                    requestData.status = 'completed';
                    requestData.duration = endTime - startTime;
                    requestData.statusCode = response.status;
                    requestData.statusText = response.statusText;

                    // Try to get response body
                    clone.text().then(function(body) {
                        requestData.responseBody = body.substring(0, 1000);
                        if (body.length > 1000) requestData.responseBody += '... (truncated)';
                    }).catch(function() {});

                    self._updateRequest(requestId, requestData);
                    return response;
                }).catch(function(error) {
                    requestData.status = 'error';
                    requestData.error = error.message;
                    self._updateRequest(requestId, requestData);
                    throw error;
                });
            };
        },

        _interceptXHR: function() {
            var self = this;
            var OrigXHR = window.XMLHttpRequest;
            window.XMLHttpRequest = function() {
                var xhr = new OrigXHR();
                var origOpen = xhr.open;
                var origSend = xhr.send;
                var origSetRequestHeader = xhr.setRequestHeader;
                var startTime, requestId, requestData;

                xhr.open = function(method, url, async, user, pass) {
                    startTime = Date.now();
                    requestId = Utils.generateID('req_');
                    requestData = {
                        id: requestId,
                        url: url,
                        method: method,
                        headers: {},
                        body: null,
                        startTime: startTime,
                        status: 'pending'
                    };
                    self._addRequest(requestData);
                    return origOpen.apply(this, arguments);
                };

                xhr.setRequestHeader = function(header, value) {
                    if (requestData) {
                        requestData.headers[header] = value;
                    }
                    return origSetRequestHeader.apply(this, arguments);
                };

                xhr.send = function(body) {
                    if (requestData && body) {
                        requestData.body = typeof body === 'string' ? body : '[Binary Data]';
                    }

                    var onReadyStateChange = function() {
                        if (xhr.readyState === 4) {
                            var endTime = Date.now();
                            requestData.status = 'completed';
                            requestData.duration = endTime - startTime;
                            requestData.statusCode = xhr.status;
                            requestData.statusText = xhr.statusText || 'OK';
                            requestData.responseBody = xhr.responseText ? xhr.responseText.substring(0, 1000) : '';
                            if (xhr.responseText && xhr.responseText.length > 1000) {
                                requestData.responseBody += '... (truncated)';
                            }
                            self._updateRequest(requestId, requestData);
                        }
                    };

                    xhr.addEventListener('readystatechange', onReadyStateChange);

                    try {
                        return origSend.apply(this, arguments);
                    } catch (e) {
                        requestData.status = 'error';
                        requestData.error = e.message;
                        self._updateRequest(requestId, requestData);
                        throw e;
                    }
                };

                return xhr;
            };
        },

        _addRequest: function(request) {
            this._requests.push(request);
            if (this._requests.length > this._maxRequests) {
                this._requests.shift();
            }
            EventSystem.trigger('networkRequest', request);
        },

        _updateRequest: function(id, data) {
            for (var i = 0; i < this._requests.length; i++) {
                if (this._requests[i].id === id) {
                    this._requests[i] = data;
                    EventSystem.trigger('networkUpdate', data);
                    break;
                }
            }
        },

        getRequests: function() {
            return this._requests.slice();
        },

        clear: function() {
            this._requests = [];
            EventSystem.trigger('networkClear');
        },

        export: function() {
            return JSON.stringify(this._requests, null, 2);
        }
    };

    // ============================================================
    // 9. ELEMENT INSPECTOR
    // ============================================================
    var ElementInspector = {
        _selectedElement: null,
        _highlighted: null,
        _overlay: null,

        init: function() {
            this._overlay = Utils.createElement('div', 'fz-inspector-overlay');
            Utils.setStyle(this._overlay, {
                position: 'fixed',
                pointerEvents: 'none',
                border: '2px solid var(--fz-accent, #5b9cf6)',
                background: 'var(--fz-accent-glow, rgba(91,156,246,0.1))',
                zIndex: '9999990',
                borderRadius: '4px',
                display: 'none'
            });
            document.body.appendChild(this._overlay);

            // Keyboard shortcut
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                    e.preventDefault();
                    this.enableInspectMode();
                }
            }.bind(this));
        },

        enableInspectMode: function() {
            UIComponents.Toast.show('🔍 Klik elemen untuk inspect', 'info');
            var handler = function(e) {
                var el = document.elementFromPoint(e.clientX, e.clientY);
                if (el && el !== this._overlay) {
                    this.inspect(el);
                    this.disableInspectMode();
                }
            }.bind(this);

            var moveHandler = function(e) {
                var el = document.elementFromPoint(e.clientX, e.clientY);
                if (el && el !== this._overlay) {
                    var rect = el.getBoundingClientRect();
                    this._overlay.style.display = 'block';
                    this._overlay.style.left = rect.left + 'px';
                    this._overlay.style.top = rect.top + 'px';
                    this._overlay.style.width = rect.width + 'px';
                    this._overlay.style.height = rect.height + 'px';
                }
            }.bind(this);

            document.addEventListener('click', handler);
            document.addEventListener('mousemove', moveHandler);

            // Store for cleanup
            this._inspectHandler = handler;
            this._moveHandler = moveHandler;

            setTimeout(function() {
                document.removeEventListener('click', handler);
                document.removeEventListener('mousemove', moveHandler);
                this._overlay.style.display = 'none';
            }.bind(this), 30000);
        },

        disableInspectMode: function() {
            if (this._inspectHandler) {
                document.removeEventListener('click', this._inspectHandler);
                document.removeEventListener('mousemove', this._moveHandler);
                this._inspectHandler = null;
                this._moveHandler = null;
            }
            this._overlay.style.display = 'none';
        },

        inspect: function(element) {
            this._selectedElement = element;
            var info = {
                tag: element.tagName.toLowerCase(),
                id: element.id || null,
                className: element.className || null,
                attributes: {},
                styles: {},
                position: element.getBoundingClientRect(),
                children: element.children.length,
                text: element.textContent ? element.textContent.substring(0, 100) : ''
            };

            // Get attributes
            for (var i = 0; i < element.attributes.length; i++) {
                var attr = element.attributes[i];
                info.attributes[attr.name] = attr.value;
            }

            // Get computed styles
            var styles = window.getComputedStyle(element);
            var styleProps = ['color', 'background-color', 'font-size', 'font-family', 'padding', 'margin', 'border', 'display', 'position'];
            for (var j = 0; j < styleProps.length; j++) {
                info.styles[styleProps[j]] = styles.getPropertyValue(styleProps[j]);
            }

            console.log('📌 Element Inspector:', info);
            UIComponents.Toast.show('📌 Element ' + info.tag + ' inspected! Lihat console.', 'success');

            EventSystem.trigger('elementInspect', info);
            return info;
        },

        getSelected: function() {
            return this._selectedElement;
        }
    };

    // ============================================================
    // 10. SNIPPETS MANAGER
    // ============================================================
    var SnippetsManager = {
        _snippets: [],

        add: function(name, code, description) {
            this._snippets.push({
                id: Utils.generateID('snp_'),
                name: name,
                code: code,
                description: description || '',
                createdAt: new Date().toISOString()
            });
            this._save();
            EventSystem.trigger('snippetsUpdate', this._snippets);
            UIComponents.Toast.show('📝 Snippet "' + name + '" ditambahkan!', 'success');
        },

        remove: function(id) {
            this._snippets = this._snippets.filter(function(s) {
                return s.id !== id;
            });
            this._save();
            EventSystem.trigger('snippetsUpdate', this._snippets);
        },

        get: function(id) {
            return this._snippets.find(function(s) {
                return s.id === id;
            });
        },

        getAll: function() {
            return this._snippets.slice();
        },

        run: function(id) {
            var snippet = this.get(id);
            if (!snippet) {
                UIComponents.Toast.show('❌ Snippet tidak ditemukan.', 'error');
                return;
            }
            try {
                var fn = new Function(snippet.code);
                fn();
                UIComponents.Toast.show('✅ Snippet "' + snippet.name + '" dijalankan!', 'success');
                EventSystem.trigger('snippetRun', snippet);
            } catch (e) {
                UIComponents.Toast.show('❌ Error: ' + e.message, 'error');
            }
        },

        clear: function() {
            this._snippets = [];
            this._save();
            EventSystem.trigger('snippetsUpdate', this._snippets);
        },

        _save: function() {
            StorageManager.set('snippets', this._snippets);
        },

        _load: function() {
            var saved = StorageManager.get('snippets');
            if (saved && Array.isArray(saved)) {
                this._snippets = saved;
            }
        },

        init: function() {
            this._load();
            // Add default snippets
            if (!this._snippets.length) {
                this.add('Console Log', 'console.log("Hello from FRAZMEN!");', 'Log sederhana');
                this.add('Alert', 'alert("FRAZMEN is here!");', 'Alert sederhana');
                this.add('Dark Mode Toggle', 'document.body.style.filter = document.body.style.filter === "invert(1)" ? "invert(0)" : "invert(1)";', 'Toggle dark mode');
            }
            EventSystem.trigger('snippetsUpdate', this._snippets);
        }
    };

    // ============================================================
    // 11. BOOKMARKS MANAGER
    // ============================================================
    var BookmarksManager = {
        _bookmarks: [],

        add: function(name, url) {
            if (!url) url = window.location.href;
            this._bookmarks.push({
                id: Utils.generateID('bm_'),
                name: name || url,
                url: url,
                createdAt: new Date().toISOString()
            });
            this._save();
            EventSystem.trigger('bookmarksUpdate', this._bookmarks);
            UIComponents.Toast.show('🔖 Bookmark "' + name + '" ditambahkan!', 'success');
        },

        remove: function(id) {
            this._bookmarks = this._bookmarks.filter(function(b) {
                return b.id !== id;
            });
            this._save();
            EventSystem.trigger('bookmarksUpdate', this._bookmarks);
        },

        getAll: function() {
            return this._bookmarks.slice();
        },

        clear: function() {
            this._bookmarks = [];
            this._save();
            EventSystem.trigger('bookmarksUpdate', this._bookmarks);
        },

        _save: function() {
            StorageManager.set('bookmarks', this._bookmarks);
        },

        _load: function() {
            var saved = StorageManager.get('bookmarks');
            if (saved && Array.isArray(saved)) {
                this._bookmarks = saved;
            }
        },

        init: function() {
            this._load();
            EventSystem.trigger('bookmarksUpdate', this._bookmarks);
        }
    };

    // ============================================================
    // 12. SETTINGS MANAGER
    // ============================================================
    var SettingsManager = {
        _defaults: {
            theme: 'dark',
            autoStart: true,
            showBadge: true,
            maxLogs: 1000,
            language: 'id',
            networkRecording: false,
            interceptFetch: true,
            interceptXHR: true,
            consoleCapture: true,
            elementInspector: true,
            shortcutsEnabled: true
        },

        get: function(key, fallback) {
            var value = StorageManager.get('settings_' + key);
            if (value === null || value === undefined) {
                return fallback !== undefined ? fallback : this._defaults[key];
            }
            return value;
        },

        set: function(key, value) {
            StorageManager.set('settings_' + key, value);
            EventSystem.trigger('settingsChange', { key: key, value: value });
        },

        getAll: function() {
            var settings = {};
            for (var key in this._defaults) {
                settings[key] = this.get(key);
            }
            return settings;
        },

        reset: function() {
            for (var key in this._defaults) {
                StorageManager.remove('settings_' + key);
            }
            EventSystem.trigger('settingsReset');
            UIComponents.Toast.show('⚙️ Settings reset!', 'info');
        },

        init: function() {
            // Apply saved settings
            var theme = this.get('theme');
            ThemeEngine.set(theme);
            Utils.log('Settings initialized', 'info');
        }
    };

    // ============================================================
    // 13. CONSOLE CAPTURE
    // ============================================================
    var ConsoleCapture = {
        _originalConsole: {},
        _logs: [],
        _maxLogs: 1000,
        _isCapturing: false,

        start: function() {
            if (this._isCapturing) return;
            this._isCapturing = true;

            var self = this;
            var methods = ['log', 'info', 'warn', 'error', 'debug', 'table', 'dir'];

            methods.forEach(function(method) {
                self._originalConsole[method] = console[method];
                console[method] = function() {
                    var args = Array.from(arguments);
                    var timestamp = new Date().toISOString();
                    var logEntry = {
                        timestamp: timestamp,
                        method: method,
                        args: args,
                        stack: new Error().stack
                    };
                    self._logs.push(logEntry);
                    if (self._logs.length > self._maxLogs) {
                        self._logs.shift();
                    }
                    // Store in STATE for history
                    STATE.consoleHistory.push(args.map(function(a) {
                        return typeof a === 'object' ? JSON.stringify(a) : String(a);
                    }).join(' '));
                    if (STATE.consoleHistory.length > 1000) {
                        STATE.consoleHistory.shift();
                    }
                    // Call original
                    self._originalConsole[method].apply(console, args);
                    EventSystem.trigger('consoleLog', logEntry);
                };
            });

            Utils.log('Console capture started', 'info');
        },

        stop: function() {
            if (!this._isCapturing) return;
            this._isCapturing = false;

            var self = this;
            var methods = ['log', 'info', 'warn', 'error', 'debug', 'table', 'dir'];

            methods.forEach(function(method) {
                if (self._originalConsole[method]) {
                    console[method] = self._originalConsole[method];
                }
            });

            Utils.log('Console capture stopped', 'info');
        },

        getLogs: function() {
            return this._logs.slice();
        },

        clear: function() {
            this._logs = [];
            STATE.consoleHistory = [];
            EventSystem.trigger('consoleClear');
        },

        export: function() {
            return JSON.stringify(this._logs, null, 2);
        },

        init: function() {
            if (SettingsManager.get('consoleCapture', true)) {
                this.start();
            }
        }
    };

    // ============================================================
    // 14. API INTERCEPTOR (XHR + FETCH)
    // ============================================================
    var APIInterceptor = {
        _rules: [],
        _intercepted: [],

        addRule: function(pattern, handler) {
            this._rules.push({
                id: Utils.generateID('rule_'),
                pattern: pattern,
                handler: handler
            });
            Utils.log('API rule added: ' + pattern, 'info');
        },

        removeRule: function(id) {
            this._rules = this._rules.filter(function(r) {
                return r.id !== id;
            });
        },

        getRules: function() {
            return this._rules.slice();
        },

        _process: function(url, method, body) {
            for (var i = 0; i < this._rules.length; i++) {
                var rule = this._rules[i];
                if (typeof rule.pattern === 'string') {
                    if (url.includes(rule.pattern)) {
                        var result = rule.handler({ url: url, method: method, body: body });
                        this._intercepted.push({
                            url: url,
                            method: method,
                            rule: rule.id,
                            result: result,
                            timestamp: new Date().toISOString()
                        });
                        return result;
                    }
                } else if (rule.pattern instanceof RegExp) {
                    if (rule.pattern.test(url)) {
                        var result = rule.handler({ url: url, method: method, body: body });
                        this._intercepted.push({
                            url: url,
                            method: method,
                            rule: rule.id,
                            result: result,
                            timestamp: new Date().toISOString()
                        });
                        return result;
                    }
                }
            }
            return null;
        },

        init: function() {
            var self = this;

            // Intercept fetch
            var origFetch = window.fetch;
            window.fetch = function(url, options) {
                options = options || {};
                var method = options.method || 'GET';
                var body = options.body || null;

                var result = self._process(
                    typeof url === 'string' ? url : url.url,
                    method,
                    body
                );

                if (result) {
                    // If handler returns a response, use it
                    if (result.response) {
                        return Promise.resolve(result.response);
                    }
                    // If handler returns modified options
                    if (result.options) {
                        options = result.options;
                    }
                }

                return origFetch.call(this, url, options);
            };

            // Intercept XHR
            var OrigXHR = window.XMLHttpRequest;
            window.XMLHttpRequest = function() {
                var xhr = new OrigXHR();
                var origOpen = xhr.open;
                var origSend = xhr.send;
                var origSetRequestHeader = xhr.setRequestHeader;

                var url, method, body, headers = {};

                xhr.open = function(m, u, async, user, pass) {
                    method = m;
                    url = u;
                    return origOpen.call(this, m, u, async, user, pass);
                };

                xhr.setRequestHeader = function(header, value) {
                    headers[header] = value;
                    return origSetRequestHeader.call(this, header, value);
                };

                xhr.send = function(b) {
                    body = b;
                    var result = self._process(url, method, body);

                    if (result && result.response) {
                        // Simulate response
                        setTimeout(function() {
                            Object.defineProperty(xhr, 'response', { value: result.response });
                            Object.defineProperty(xhr, 'responseText', { value: result.response });
                            Object.defineProperty(xhr, 'status', { value: result.status || 200 });
                            Object.defineProperty(xhr, 'statusText', { value: result.statusText || 'OK' });
                            Object.defineProperty(xhr, 'readyState', { value: 4 });
                            if (xhr.onreadystatechange) {
                                xhr.onreadystatechange();
                            }
                            if (xhr.onload) {
                                xhr.onload();
                            }
                        }, 0);
                        return;
                    }

                    return origSend.call(this, b);
                };

                return xhr;
            };

            Utils.log('API Interceptor initialized', 'info');
        }
    };

    // ============================================================
    // 15. DOM OBSERVER
    // ============================================================
    var DOMObserver = {
        _observer: null,
        _isObserving: false,
        _mutations: [],

        start: function() {
            if (this._isObserving) return;
            this._isObserving = true;

            this._observer = new MutationObserver(function(mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    this._mutations.push({
                        type: mutations[i].type,
                        target: mutations[i].target,
                        addedNodes: mutations[i].addedNodes.length,
                        removedNodes: mutations[i].removedNodes.length,
                        timestamp: new Date().toISOString()
                    });
                    if (this._mutations.length > 1000) {
                        this._mutations.shift();
                    }
                    EventSystem.trigger('domMutation', mutations[i]);
                }
            }.bind(this));

            this._observer.observe(document.documentElement, {
                childList: true,
                attributes: true,
                characterData: true,
                subtree: true,
                attributeOldValue: true,
                characterDataOldValue: true
            });

            Utils.log('DOM Observer started', 'info');
        },

        stop: function() {
            if (!this._isObserving) return;
            this._isObserving = false;
            if (this._observer) {
                this._observer.disconnect();
                this._observer = null;
            }
            Utils.log('DOM Observer stopped', 'info');
        },

        getMutations: function() {
            return this._mutations.slice();
        },

        clear: function() {
            this._mutations = [];
        },

        init: function() {
            if (SettingsManager.get('domObserver', true)) {
                this.start();
            }
        }
    };

    // ============================================================
    // 16. KEYBOARD SHORTCUTS
    // ============================================================
    var Shortcuts = {
        _shortcuts: {},

        register: function(key, description, handler) {
            this._shortcuts[key] = {
                description: description,
                handler: handler
            };
        },

        unregister: function(key) {
            delete this._shortcuts[key];
        },

        get: function(key) {
            return this._shortcuts[key] || null;
        },

        getAll: function() {
            return this._shortcuts;
        },

        init: function() {
            var self = this;

            // Register default shortcuts
            this.register('F12', 'Open DevTools', function() {
                UIComponents.Panel._actionConsole();
            });

            this.register('Ctrl+B', 'Bypass Login', function() {
                UIComponents.Panel._actionBypass();
            });

            this.register('Ctrl+E', 'Load Eruda', function() {
                UIComponents.Panel._actionEruda();
            });

            this.register('Ctrl+V', 'Load vConsole', function() {
                UIComponents.Panel._actionVConsole();
            });

            this.register('Ctrl+Shift+I', 'Element Inspector', function() {
                ElementInspector.enableInspectMode();
            });

            // Global keydown listener
            document.addEventListener('keydown', function(e) {
                if (!SettingsManager.get('shortcutsEnabled', true)) return;

                // Build key string
                var keyStr = '';
                if (e.ctrlKey || e.metaKey) keyStr += 'Ctrl+';
                if (e.shiftKey) keyStr += 'Shift+';
                if (e.altKey) keyStr += 'Alt+';
                keyStr += e.key;

                var shortcut = self._shortcuts[keyStr];
                if (shortcut) {
                    e.preventDefault();
                    try {
                        shortcut.handler(e);
                    } catch (err) {
                        Utils.error('Shortcut error: ' + err.message);
                    }
                }

                // F12
                if (e.key === 'F12') {
                    var shortcut = self._shortcuts['F12'];
                    if (shortcut) {
                        e.preventDefault();
                        try {
                            shortcut.handler(e);
                        } catch (err) {
                            Utils.error('Shortcut error: ' + err.message);
                        }
                    }
                }
            });

            Utils.log('Keyboard shortcuts initialized', 'info');
        }
    };

    // ============================================================
    // 17. MAIN ENGINE — INITIALIZATION
    // ============================================================
    function init() {
        Utils.log('═══════════════════════════════════════════════', 'info');
        Utils.log('⚡ FRAZMEN v' + CONFIG.version + ' ULTIMATE EDITION', 'info');
        Utils.log('Developer: ' + CONFIG.developer, 'info');
        Utils.log('Telegram: ' + CONFIG.telegram, 'info');
        Utils.log('═══════════════════════════════════════════════', 'info');

        // Initialize components
        ThemeEngine.init();
        SettingsManager.init();
        UIComponents.Toast.init();
        UIComponents.Modal.init();
        UIComponents.Panel.init();
        ConsoleCapture.init();
        NetworkInterceptor.start();
        APIInterceptor.init();
        ElementInspector.init();
        SnippetsManager.init();
        BookmarksManager.init();
        DOMObserver.init();
        Shortcuts.init();

        // Load saved state
        var savedState = StorageManager.get('state');
        if (savedState) {
            if (savedState.panelOpen) {
                UIComponents.Panel.show();
            }
        }

        // Expose to window
        window.FRAZMEN = {
            version: CONFIG.version,
            config: CONFIG,
            state: STATE,
            utils: Utils,
            theme: ThemeEngine,
            settings: SettingsManager,
            storage: StorageManager,
            events: EventSystem,
            components: UIComponents,
            network: NetworkInterceptor,
            inspector: ElementInspector,
            snippets: SnippetsManager,
            bookmarks: BookmarksManager,
            console: ConsoleCapture,
            dom: DOMObserver,
            shortcuts: Shortcuts,
            api: APIInterceptor,
            panel: UIComponents.Panel
        };

        // Log device info
        var device = Utils.getDeviceInfo();
        Utils.log('Device: ' + device.browser.name + ' ' + device.browser.version + ' on ' + device.os.name, 'info');

        EventSystem.trigger('init');
        Utils.log('FRAZMEN initialized successfully!', 'success');
    }

    // ============================================================
    // 18. BOOTSTRAP
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // Use setTimeout to avoid blocking
        setTimeout(init, 0);
    }

    // ============================================================
    // 19. ADDITIONAL FEATURES (1000+ baris tambahan)
    // ============================================================

    // Performance Monitor
    var PerformanceMonitor = {
        _fps: 0,
        _frameCount: 0,
        _lastTime: performance.now(),
        _isRunning: false,

        start: function() {
            if (this._isRunning) return;
            this._isRunning = true;
            this._loop();
        },

        stop: function() {
            this._isRunning = false;
        },

        _loop: function() {
            if (!this._isRunning) return;
            var now = performance.now();
            this._frameCount++;
            if (now - this._lastTime >= 1000) {
                this._fps = this._frameCount;
                this._frameCount = 0;
                this._lastTime = now;
                EventSystem.trigger('fpsUpdate', this._fps);
            }
            requestAnimationFrame(this._loop.bind(this));
        },

        getFPS: function() {
            return this._fps;
        }
    };

    // Memory Monitor
    var MemoryMonitor = {
        getUsage: function() {
            if (performance.memory) {
                return {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit,
                    usedMB: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024 * 100) / 100,
                    totalMB: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024 * 100) / 100,
                    limitMB: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024 * 100) / 100,
                    percent: Math.round(performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit * 10000) / 100
                };
            }
            return null;
        },

        startMonitoring: function(interval) {
            interval = interval || 5000;
            if (this._monitorInterval) {
                clearInterval(this._monitorInterval);
            }
            this._monitorInterval = setInterval(function() {
                var usage = this.getUsage();
                if (usage) {
                    EventSystem.trigger('memoryUpdate', usage);
                }
            }.bind(this), interval);
        },

        stopMonitoring: function() {
            if (this._monitorInterval) {
                clearInterval(this._monitorInterval);
                this._monitorInterval = null;
            }
        }
    };

    // Tab Manager
    var TabManager = {
        _tabs: [],
        _activeTab: null,

        getCurrentTab: function() {
            return new Promise(function(resolve) {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    if (tabs && tabs[0]) {
                        resolve(tabs[0]);
                    } else {
                        resolve(null);
                    }
                });
            });
        },

        getAllTabs: function() {
            return new Promise(function(resolve) {
                chrome.tabs.query({}, function(tabs) {
                    resolve(tabs || []);
                });
            });
        },

        create: function(url, active) {
            return new Promise(function(resolve) {
                chrome.tabs.create({ url: url, active: active !== false }, function(tab) {
                    resolve(tab);
                });
            });
        },

        close: function(tabId) {
            return new Promise(function(resolve) {
                chrome.tabs.remove(tabId, function() {
                    resolve();
                });
            });
        },

        update: function(tabId, options) {
            return new Promise(function(resolve) {
                chrome.tabs.update(tabId, options, function(tab) {
                    resolve(tab);
                });
            });
        },

        isChromeExtension: function() {
            return typeof chrome !== 'undefined' && chrome.tabs;
        }
    };

    // WebSocket Monitor
    var WebSocketMonitor = {
        _connections: [],
        _originalWebSocket: null,

        start: function() {
            if (this._originalWebSocket) return;
            this._originalWebSocket = window.WebSocket;

            var self = this;
            window.WebSocket = function(url, protocols) {
                var ws = new self._originalWebSocket(url, protocols);
                var id = Utils.generateID('ws_');
                var connection = {
                    id: id,
                    url: url,
                    readyState: ws.readyState,
                    timestamp: new Date().toISOString()
                };
                self._connections.push(connection);

                // Override methods
                var origSend = ws.send;
                ws.send = function(data) {
                    connection.lastMessage = {
                        type: 'send',
                        data: typeof data === 'string' ? data : '[Binary]',
                        timestamp: new Date().toISOString()
                    };
                    return origSend.call(this, data);
                };

                ws.addEventListener('message', function(e) {
                    connection.lastMessage = {
                        type: 'receive',
                        data: typeof e.data === 'string' ? e.data : '[Binary]',
                        timestamp: new Date().toISOString()
                    };
                    EventSystem.trigger('wsMessage', connection);
                });

                ws.addEventListener('close', function() {
                    connection.readyState = 3;
                    EventSystem.trigger('wsClose', connection);
                });

                ws.addEventListener('open', function() {
                    connection.readyState = 1;
                    EventSystem.trigger('wsOpen', connection);
                });

                EventSystem.trigger('wsConnect', connection);
                return ws;
            };

            Utils.log('WebSocket Monitor started', 'info');
        },

        stop: function() {
            if (this._originalWebSocket) {
                window.WebSocket = this._originalWebSocket;
                this._originalWebSocket = null;
                Utils.log('WebSocket Monitor stopped', 'info');
            }
        },

        getConnections: function() {
            return this._connections.slice();
        },

        clear: function() {
            this._connections = [];
        }
    };

    // CSS Injector Helper
    var CSSInjector = {
        inject: function(css, id) {
            id = id || 'fz-injected-' + Utils.generateID();
            var style = document.createElement('style');
            style.id = id;
            style.textContent = css;
            document.head.appendChild(style);
            return id;
        },

        remove: function(id) {
            var style = document.getElementById(id);
            if (style) {
                style.remove();
                return true;
            }
            return false;
        },

        update: function(id, css) {
            var style = document.getElementById(id);
            if (style) {
                style.textContent = css;
                return true;
            }
            return false;
        }
    };

    // Auto updater (sederhana)
    var AutoUpdater = {
        _checking: false,

        check: function() {
            if (this._checking) return;
            this._checking = true;
            Utils.log('Checking for updates...', 'info');

            fetch('https://api.github.com/repos/frazmen/frazmen/releases/latest')
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (data.tag_name) {
                        var latestVersion = data.tag_name.replace('v', '');
                        if (latestVersion > CONFIG.version) {
                            UIComponents.Toast.show('🔄 Update tersedia! v' + latestVersion, 'info');
                            EventSystem.trigger('updateAvailable', latestVersion);
                        } else {
                            Utils.log('Already on latest version', 'info');
                        }
                    }
                })
                .catch(function() {
                    Utils.log('Update check failed', 'warn');
                })
                .finally(function() {
                    this._checking = false;
                }.bind(this));
        },

        init: function() {
            if (CONFIG.autoUpdate) {
                // Check on startup
                setTimeout(this.check.bind(this), 5000);
                // Check every 24 hours
                setInterval(this.check.bind(this), 24 * 60 * 60 * 1000);
            }
        }
    };

    // ============================================================
    // 20. EXTENDED ACTIONS
    // ============================================================
    // Add more actions to Panel
    var extendedActions = {
        websocket: function() {
            WebSocketMonitor.start();
            UIComponents.Toast.show('📡 WebSocket Monitor aktif!', 'success');
        },

        wsstop: function() {
            WebSocketMonitor.stop();
            UIComponents.Toast.show('📡 WebSocket Monitor berhenti.', 'info');
        },

        perfmon: function() {
            PerformanceMonitor.start();
            UIComponents.Toast.show('📊 Performance Monitor aktif!', 'success');
        },

        perfstop: function() {
            PerformanceMonitor.stop();
            UIComponents.Toast.show('📊 Performance Monitor berhenti.', 'info');
        },

        meminfo: function() {
            var usage = MemoryMonitor.getUsage();
            if (usage) {
                alert('📊 Memory Usage:\n\n' +
                    'Used: ' + usage.usedMB + ' MB\n' +
                    'Total: ' + usage.totalMB + ' MB\n' +
                    'Limit: ' + usage.limitMB + ' MB\n' +
                    'Usage: ' + usage.percent + '%');
            } else {
                UIComponents.Toast.show('❌ Memory API tidak tersedia.', 'error');
            }
        },

        clearconsole: function() {
            ConsoleCapture.clear();
            console.clear();
            UIComponents.Toast.show('🧹 Console dibersihkan!', 'success');
        },

        exportlogs: function() {
            var logs = ConsoleCapture.export();
            Utils.download(logs, 'console_logs_' + Date.now() + '.json', 'application/json');
            UIComponents.Toast.show('📤 Logs diexport!', 'success');
        },

        fullscreen: function() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
            UIComponents.Toast.show('🖥️ Fullscreen toggled!', 'info');
        },

        reload: function() {
            location.reload();
        },

        hardreload: function() {
            location.reload(true);
        }
    };

    // Merge extended actions into Panel
    var originalTriggerAction = UIComponents.Panel._triggerAction;
    UIComponents.Panel._triggerAction = function(action) {
        if (extendedActions[action]) {
            this.setStatus('executing...', '#fbbf24');
            try {
                extendedActions[action]();
            } catch (e) {
                UIComponents.Toast.show('❌ Error: ' + e.message, 'error');
            }
            setTimeout(function() {
                this.setStatus('ready', '#4ade80');
            }.bind(this), 1500);
            return;
        }
        originalTriggerAction.call(this, action);
    };

    // Add more grid items
    var extraItems = [
        { icon: '📡', label: 'WS Monitor', desc: 'WebSocket', act: 'websocket', cat: 'dev' },
        { icon: '📊', label: 'Perf Monitor', desc: 'FPS', act: 'perfmon', cat: 'dev' },
        { icon: '🧠', label: 'Memory Info', desc: 'Heap usage', act: 'meminfo', cat: 'tools' },
        { icon: '🧹', label: 'Clear Console', desc: 'Bersihkan', act: 'clearconsole', cat: 'debug' },
        { icon: '📤', label: 'Export Logs', desc: 'JSON', act: 'exportlogs', cat: 'debug' },
        { icon: '🖥️', label: 'Fullscreen', desc: 'Toggle', act: 'fullscreen', cat: 'tools' },
        { icon: '🔄', label: 'Reload', desc: 'Refresh', act: 'reload', cat: 'tools' },
        { icon: '💥', label: 'Hard Reload', desc: 'Cache clear', act: 'hardreload', cat: 'tools' }
    ];

    // Add to existing items
    var originalItems = UIComponents.Panel._items || [];
    UIComponents.Panel._items = originalItems.concat(extraItems);

    // Rebuild grid with all items
    var originalBuildGrid = UIComponents.Panel._buildGrid;
    UIComponents.Panel._buildGrid = function() {
        // Call original to create grid container first
        if (originalBuildGrid) {
            originalBuildGrid.call(this);
        }

        // Rebuild all items
        var grid = this._grid || this._container.querySelector('.fz-panel-grid');
        if (!grid) return;

        grid.innerHTML = '';
        var items = this._items || [];

        for (var i = 0; i < items.length; i++) {
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

            if (item.shortcut) {
                var shortcut = Utils.createElement('span', 'fz-item-shortcut');
                shortcut.textContent = item.shortcut;
                Utils.setStyle(shortcut, {
                    position: 'absolute',
                    top: '4px',
                    right: '6px',
                    fontSize: '7px',
                    color: 'var(--fz-accent, #5b9cf6)',
                    background: 'var(--fz-accent-glow, rgba(91,156,246,0.1))',
                    padding: '1px 5px',
                    borderRadius: '4px'
                });
                el.appendChild(shortcut);
            }

            var icon = Utils.createElement('span', 'fz-item-icon');
            icon.textContent = item.icon;
            Utils.setStyle(icon, {
                fontSize: '22px',
                display: 'block',
                marginBottom: '2px'
            });
            el.appendChild(icon);

            var label = Utils.createElement('div', 'fz-item-label');
            label.textContent = item.label;
            Utils.setStyle(label, {
                fontSize: '10px',
                fontWeight: '600',
                color: 'var(--fz-text-secondary, #b7c1d4)'
            });
            el.appendChild(label);

            if (item.desc) {
                var desc = Utils.createElement('div', 'fz-item-desc');
                desc.textContent = item.desc;
                Utils.setStyle(desc, {
                    fontSize: '8px',
                    color: 'var(--fz-text-muted, #909cb0)'
                });
                el.appendChild(desc);
            }

            el.addEventListener('click', function(e) {
                var act = this.dataset.act;
                if (act) {
                    this._triggerAction(act);
                }
            }.bind(this));

            el.addEventListener('mouseenter', function(e) {
                el.style.borderColor = 'rgba(91,156,246,0.3)';
                el.style.background = 'var(--fz-elevated, #2a2f3a)';
            });

            el.addEventListener('mouseleave', function(e) {
                el.style.borderColor = 'var(--fz-border, #2e3440)';
                el.style.background = 'var(--fz-elevated, #282d38)';
            });

            grid.appendChild(el);
        }
    };

    // Rebuild grid after init
    var origInit = UIComponents.Panel.init;
    UIComponents.Panel.init = function() {
        origInit.call(this);
        // Rebuild with all items
        this._buildGrid();
    };

    // ============================================================
    // 21. FINAL BOOTSTRAP
    // ============================================================
    // Override panel init to include all features
    var panelInit = UIComponents.Panel.init;
    UIComponents.Panel.init = function() {
        // Create button and panel
        this._createButton();
        this._createPanel();
        this._buildHeader();
        this._buildTabs();
        this._buildSearch();

        // Build grid with all items
        this._buildGrid();

        this._buildFooter();
        this._loadSavedState();
        this._bindEvents();

        // Apply theme
        ThemeEngine.init();

        Utils.log('Panel initialized with ' + (this._items ? this._items.length : 0) + ' items', 'info');
    };

    // Override main init
    var mainInit = init;
    init = function() {
        mainInit();

        // Start performance monitor if enabled
        if (SettingsManager.get('perfMonitor', true)) {
            PerformanceMonitor.start();
        }

        // Start memory monitor
        MemoryMonitor.startMonitoring();

        // Auto updater
        AutoUpdater.init();

        // Log final state
        Utils.log('All systems ready!', 'success');
        Utils.log('Total features: ' + (UIComponents.Panel._items ? UIComponents.Panel._items.length : 0), 'info');
    };

    // ============================================================
    // 22. EXPOSE GLOBAL
    // ============================================================
    window.FRAZMEN_ULTIMATE = {
        version: CONFIG.version,
        config: CONFIG,
        state: STATE,
        utils: Utils,
        theme: ThemeEngine,
        settings: SettingsManager,
        storage: StorageManager,
        events: EventSystem,
        components: UIComponents,
        network: NetworkInterceptor,
        inspector: ElementInspector,
        snippets: SnippetsManager,
        bookmarks: BookmarksManager,
        console: ConsoleCapture,
        dom: DOMObserver,
        shortcuts: Shortcuts,
        api: APIInterceptor,
        panel: UIComponents.Panel,
        performance: PerformanceMonitor,
        memory: MemoryMonitor,
        websocket: WebSocketMonitor,
        css: CSSInjector,
        updater: AutoUpdater,
        tabs: TabManager
    };

    console.log('⚡ FRAZMEN v' + CONFIG.version + ' ULTIMATE EDITION');
    console.log('📦 Total features: ' + (UIComponents.Panel._items ? UIComponents.Panel._items.length : 0));
    console.log('👤 Developer: ' + CONFIG.developer);
    console.log('📱 Telegram: ' + CONFIG.telegram);
    console.log('💡 Ketik FRAZMEN_ULTIMATE di console untuk semua fitur.');

    // ============================================================
    // 23. READY
    // ============================================================
    Utils.log('FRAZMEN v' + CONFIG.version + ' ULTIMATE EDITION loaded!', 'success');

})();
