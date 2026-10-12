// Change BUILD whenever bundled assets change.
const BUILD='20261013-offline-1';
const PREFIX='hawaii-shell-'+self.registration.scope;
const CACHE=PREFIX+BUILD;
const root=new URL('./',self.registration.scope);
const assets=['./','./index.html','./manifest.webmanifest','./apple-touch-icon-hawaii.png?v=20261011','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(assets.map(path=>new Request(new URL(path,root),{cache:'reload'})));
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  // Never cache authentication or Firestore requests.
  if(request.method!=='GET'||url.origin!==root.origin||!url.pathname.startsWith(root.pathname))return;
  if(request.mode==='navigate') {
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      const controller=new AbortController();
      const timer=setTimeout(()=>controller.abort(),4000);
      try {
        const response=await fetch(request,{signal:controller.signal});
        if(!response.ok)throw new Error('Navigation failed');
        if(url.pathname===root.pathname||url.pathname===new URL('index.html',root).pathname)await cache.put(new URL('index.html',root),response.clone());
        return response;
      } catch {
        return await cache.match(new URL('index.html',root)) || Response.error();
      } finally {clearTimeout(timer);}
    })());
  } else if(assets.some(path=>new URL(path,root).pathname===url.pathname)) {
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      return await cache.match(request,{ignoreSearch:true}) || fetch(request);
    })());
  }
});
