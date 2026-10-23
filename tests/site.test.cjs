const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.join(__dirname,'../dist');
test('offline pages have valid scripts and local assets',()=>{
 for(const name of ['index.html','readme.html']){
  const html=fs.readFileSync(path.join(root,name),'utf8');
  for(const m of html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g))new Function(m[1]);
  for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
   if(/^(?:https?:|data:)/.test(m[1]))continue;
   assert(fs.existsSync(path.join(root,m[1].split('#')[0])),name+': '+m[1]);
  }
 }
});
test('model documentation matches the simulator fingerprint and navigation',()=>{
 const html=fs.readFileSync(path.join(root,'readme.html'),'utf8');
 const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'index.html'))).digest('hex');
 assert(html.includes(hash),'Refresh the documented simulator SHA-256');
 for(const m of html.matchAll(/href="#([^"]+)"/g))assert(html.includes('id="'+m[1]+'"'));
});

test('Pages project paths and offline formula fonts resolve',()=>{
 for(const name of ['index.html','readme.html']){
  const html=fs.readFileSync(path.join(root,name),'utf8');
  for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g))assert(!m[1].startsWith('/'),'Root-relative URL breaks project Pages paths: '+m[1]);
 }
 const cssPath=path.join(root,'vendor/katex/katex.min.css');
 for(const m of fs.readFileSync(cssPath,'utf8').matchAll(/url\(([^)]+)\)/g)){
  const target=m[1].replace(/^['"]|['"]$/g,'');
  if(!target.startsWith('data:'))assert(fs.existsSync(path.resolve(path.dirname(cssPath),target)),target);
 }
 assert(fs.existsSync(path.join(root,'.nojekyll')));
});
