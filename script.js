const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');setTimeout(()=>x.target.classList.add('ready'),900);io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
document.querySelectorAll('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}));
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.querySelectorAll('.card:not(.badge)').forEach(c=>{if(c.closest('.car'))return;
c.addEventListener('pointermove',e=>{if(rm||e.pointerType==='touch')return;const r=c.getBoundingClientRect();c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');c.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*10+'deg')});
c.addEventListener('pointerleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
const hero=document.querySelector('.hero');
hero.addEventListener('pointermove',e=>{if(rm)return;const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*2);hero.style.setProperty('--my',((e.clientY-r.top)/r.height-.5)*2)});
hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--mx',0);hero.style.setProperty('--my',0)});
const car=document.getElementById('car'),cs=[...car.querySelectorAll('.card')],step=360/cs.length;
let rot=0,tgt=0,drag=false,sx=0,sr=0;
function draw(){const w=cs[0].offsetWidth,n=cs.length,pos=-rot/step;
cs.forEach((c,i)=>{let d=((i-pos)%n+n)%n;if(d>n/2)d-=n;const ad=Math.abs(d);c.style.transform='translateX('+d*w*.62+'px) translateZ('+(-ad*140)+'px) rotateY('+(-d*38)+'deg)';c.style.opacity=Math.max(.25,1-ad*.45);c.style.zIndex=Math.round(10-ad*5)})}
function loop(){if(!drag){rot=rm?tgt:rot+(tgt-rot)*.12}draw();requestAnimationFrame(loop)}
loop();
car.addEventListener('pointerdown',e=>{if(e.target.closest('a'))return;drag=true;sx=e.clientX;sr=tgt;car.setPointerCapture(e.pointerId)});
car.addEventListener('pointermove',e=>{if(!drag)return;tgt=sr+(e.clientX-sx)*.4;rot=tgt});
const up=()=>{if(!drag)return;drag=false;tgt=Math.round(tgt/step)*step};
car.addEventListener('pointerup',up);car.addEventListener('pointercancel',up);
document.getElementById('prev').onclick=()=>{tgt+=step};
document.getElementById('next').onclick=()=>{tgt-=step};
const toon=(c1,c2)=>`<svg viewBox="0 0 100 100"><path d="M18 100Q50 60 82 100Z" fill="${c1}"/><rect x="44" y="58" width="12" height="10" fill="#f0b890"/><circle cx="50" cy="44" r="20" fill="#f8c9a0"/><path d="M29 44Q28 20 50 21Q72 20 71 44Q62 31 50 33Q38 31 29 44Z" fill="${c2}"/><circle class="eye" cx="43" cy="46" r="2.6" fill="#12142b"/><circle class="eye" cx="57" cy="46" r="2.6" fill="#12142b"/><path d="M43 54Q50 61 57 54" stroke="#12142b" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="27" y="80" width="46" height="16" rx="3" fill="#12162e" stroke="${c1}" stroke-width="2"/><circle cx="50" cy="88" r="3" fill="${c1}"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" repeatCount="indefinite"/></circle></svg>`;
const cols=[['#38bdf8','#1e3a8a'],['#34d399','#064e3b'],['#f472b6','#831843']];
const scene=i=>{const c=['#38bdf8','#34d399','#f472b6'][i],
w='<rect x="22" y="10" width="156" height="92" rx="10" fill="#0b0e1f" stroke="'+c+'" stroke-width="2"/><circle cx="34" cy="21" r="3" fill="#f87171"/><circle cx="44" cy="21" r="3" fill="#fbbf24"/><circle cx="54" cy="21" r="3" fill="#34d399"/>',
f=(x,y,r,d)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+c+'" opacity=".35"><animate attributeName="cy" values="'+y+';'+(y-8)+';'+y+'" dur="'+d+'s" repeatCount="indefinite"/></circle>';
if(i==0)return '<svg viewBox="0 0 200 110">'+w+'<rect x="34" y="34" width="60" height="10" rx="4" fill="'+c+'"><animate attributeName="width" values="40;78;40" dur="4s" repeatCount="indefinite"/></rect><rect x="34" y="52" width="92" height="5" rx="2.5" fill="#2a3166"/><rect x="34" y="62" width="70" height="5" rx="2.5" fill="#2a3166"/><rect x="34" y="76" width="30" height="12" rx="6" fill="#7c5cff"><animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/></rect>'+f(150,52,16,3)+f(160,84,8,2.2)+'</svg>';
if(i==1)return '<svg viewBox="0 0 200 110">'+w+'<g><path d="M82 46h36l4 40a4 4 0 01-4 4H82a4 4 0 01-4-4z" fill="'+c+'" opacity=".9"/><path d="M90 46v-6a10 10 0 0120 0v6" stroke="#0b0e1f" stroke-width="3" fill="none"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2.4s" repeatCount="indefinite"/></g>'+f(52,44,6,2)+f(150,40,9,3)+f(146,82,5,2.6)+'</svg>';
return '<svg viewBox="0 0 200 110"><rect x="72" y="6" width="56" height="98" rx="12" fill="#0b0e1f" stroke="'+c+'" stroke-width="2"/><rect x="78" y="18" width="44" height="8" rx="3" fill="'+c+'"><animate attributeName="width" values="20;44;20" dur="3s" repeatCount="indefinite"/></rect><rect x="78" y="32" width="44" height="26" rx="5" fill="#2a3166"/><rect x="78" y="64" width="30" height="5" rx="2.5" fill="#2a3166"/><rect x="78" y="74" width="40" height="5" rx="2.5" fill="#2a3166"/><circle cx="122" cy="16" r="4" fill="#f87171"><animate attributeName="r" values="3;5.5;3" dur="1.6s" repeatCount="indefinite"/></circle>'+f(40,40,10,3)+f(160,64,12,2.6)+'</svg>'};
document.querySelectorAll('.thumb').forEach((t,i)=>{t.innerHTML=scene(i%3)});
const rings=[...document.querySelectorAll('.ao .ring')],spd=[36,-24,14],ang=[0,0,0];
let last=performance.now(),paused=false,run=true;
document.querySelectorAll('.ao').forEach(ao=>{ao.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')paused=true});ao.addEventListener('pointerleave',()=>paused=false)});
function orb(t){const dt=Math.min((t-last)/1000,.1);last=t;
rings.forEach((r,k)=>{if(run&&!paused)ang[k]+=spd[k]*dt;r.style.transform='rotate('+ang[k]+'deg)';
r.querySelectorAll('b').forEach(b=>{const a=parseFloat(b.style.getPropertyValue('--a'));b.firstChild.style.transform='translateX(-50%) rotate('+(-(ang[k]+a))+'deg)'})});
requestAnimationFrame(orb)}
requestAnimationFrame(orb);
(function(){const el=document.getElementById('sph'),sk=['HTML','CSS','JavaScript','Python','PHP','SQL','Git','GitHub','React','Responsive'];
const n=sk.length,pts=sk.map((t,i)=>{const y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),p=i*2.39996;return{x:Math.cos(p)*r,y:y,z:Math.sin(p)*r}});
const els=sk.map(t=>{const s=document.createElement('span');s.textContent=t;el.appendChild(s);return s});
let ax=.004,ay=.006,tx=.004,ty=.006;
el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();ty=((e.clientX-r.left)/r.width-.5)*.06;tx=-((e.clientY-r.top)/r.height-.5)*.06});
el.addEventListener('pointerleave',()=>{tx=.004;ty=.006});
function f(){ax+=(tx-ax)*.05;ay+=(ty-ay)*.05;const cx=Math.cos(ax),sx=Math.sin(ax),cy=Math.cos(ay),sy=Math.sin(ay),R=el.clientWidth*.36;
pts.forEach((p,i)=>{let y=p.y*cx-p.z*sx,z=p.y*sx+p.z*cx,x=p.x*cy+z*sy;z=-p.x*sy+z*cy;const m=Math.hypot(x,y,z);p.x=x/m;p.y=y/m;p.z=z/m;const d=(p.z+1)/2;els[i].style.transform='translate(-50%,-50%) translate3d('+p.x*R+'px,'+p.y*R*.9+'px,0) scale('+(.65+.45*d)+')';els[i].style.opacity=.35+.65*d;els[i].style.zIndex=Math.round(d*10)});requestAnimationFrame(f)}f()})();
