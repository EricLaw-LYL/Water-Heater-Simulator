const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function setup(){
 const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8'),els={};
 function node(){const calls=[],stack=[],ctx={calls,globalAlpha:1,clearRect(){calls.length=0},save(){stack.push({globalAlpha:this.globalAlpha,lineWidth:this.lineWidth})},restore(){Object.assign(this,stack.pop())},stroke(){calls.push({color:this.strokeStyle,alpha:this.globalAlpha,width:this.lineWidth})}};
 const proxy=new Proxy(ctx,{get:(t,k)=>k in t?t[k]:()=>{}});
 return {children:[],style:{},attrs:{},textContent:'',clientWidth:700,offsetWidth:230,offsetHeight:240,getBoundingClientRect:()=>({left:0,top:0,width:700}),getContext:()=>proxy,matches:()=>true,classList:{toggle(){}},setAttribute(k,v){this.attrs[k]=String(v);if(k==='id')els[v]=this},removeAttribute(k){delete this.attrs[k]},append(...items){this.children.push(...items)}}}
 for(const m of html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)){const e=node();e.value=m[0].match(/\bvalue="([^"]+)"/)?.[1]??'';e.checked=/\bchecked\b/.test(m[0]);e.id=m[1];els[m[1]]=e}
 els.source.value='gas';els.speed.value='100';let cb,now=0;
 vm.runInNewContext(html.match(/<script>([\s\S]*)<\/script>/)[1],{window:{devicePixelRatio:1},document:{getElementById:id=>{assert(els[id],id);return els[id]},createElement:()=>node(),createElementNS:()=>node()},requestAnimationFrame:f=>cb=f});cb(0);
 return {els,run(){now+=100;cb(now)},stroke(id,c){return els[id].getContext().calls.find(x=>x.color===c)}};
}
test('legend hover, multiple pinned highlights and reset work while paused',()=>{
 const m=setup(),e=m.els;assert(e.resetHighlights.disabled);
 e['legend-0-sensor'].onpointerenter();assert.equal(m.stroke('historyChart','#51b8ff').width,3.5);assert.equal(m.stroke('historyChart','#ff855c').alpha,.16);
 e['legend-0-sensor'].onclick();e['legend-0-sensor'].onpointerleave();assert.equal(e['legend-0-sensor'].attrs['aria-pressed'],'true');assert(!e.resetHighlights.disabled);
 e['legend-0-flow'].onclick();assert.equal(m.stroke('historyChart','#5ed5a8').alpha,1);assert.equal(m.stroke('historyChart','#51b8ff').alpha,1);
 e['legend-0-flow'].onclick();assert.equal(m.stroke('historyChart','#5ed5a8').alpha,.16);
 e['legend-1-0'].onclick();e['legend-1-7'].onclick();assert.equal(e['legend-1-0'].attrs['aria-pressed'],'true');assert.equal(e['legend-1-7'].attrs['aria-pressed'],'true');assert.equal(m.stroke('sectionsChart','#ffc857').alpha,.16);
 const clock=e.clock.textContent;e.resetHighlights.onclick();assert.equal(e.clock.textContent,clock);assert(e.resetHighlights.disabled);assert.equal(m.stroke('historyChart','#ff855c').alpha,1);assert.equal(m.stroke('sectionsChart','#ffc857').alpha,1);
 e['legend-1-2'].onfocus();assert.equal(m.stroke('sectionsChart','#b7df67').width,3.5);e['legend-1-2'].onblur();assert.equal(m.stroke('sectionsChart','#b7df67').width,2);
 e.tap.onclick();e.pause.onclick();m.run();e.pause.onclick();assert.notEqual(e.clock.textContent,clock);
});
