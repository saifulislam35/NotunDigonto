// সংস্করণ বদলালে এই নামও বদলে দিন (index.html-এর VER-এর সাথে মিলিয়ে)
const V='nd-1.0',SHELL=['./','index.html','manifest.json','logo.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const swr=r=>caches.match(r).then(m=>{const f=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))caches.open(V).then(c=>c.put(r,res.clone()));return res}).catch(()=>m);return m||f});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){
  if(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html')){
   e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html').then(m=>m||caches.match('./'))));return}
  e.respondWith(swr(r));return}
 if(u.hostname==='www.gstatic.com'&&u.pathname.includes('/firebasejs/'))e.respondWith(swr(r))});
