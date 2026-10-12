const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$('.menu')?.addEventListener('click',e=>{const o=$('nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
$$('.rv').forEach(el=>io.observe(el));
const lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Cake photo viewer');
lb.innerHTML='<button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous">&#8249;</button><img alt=""><button class="n" aria-label="Next">&#8250;</button>';
document.body.appendChild(lb);let list=[],idx=0,last=null;
const show=()=>{const i=$('img',lb);i.src=list[idx].src;i.alt=list[idx].alt};
const step=d=>{idx=(idx+d+list.length)%list.length;show()};
const open=(l,i)=>{list=l;idx=i;last=document.activeElement;show();lb.classList.add('open');$('.x',lb).focus()};
const close=()=>{lb.classList.remove('open');last?.focus()};
$('.x',lb).onclick=close;$('.p',lb).onclick=()=>step(-1);$('.n',lb).onclick=()=>step(1);
lb.addEventListener('click',e=>{if(e.target===lb)close()});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
let sx=0;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)step(d<0?1:-1)});
const bind=els=>{const l=els.map(a=>{const i=$('img',a);return{src:i.src,alt:i.alt}});els.forEach((a,i)=>{a.addEventListener('click',e=>{e.preventDefault();open(l,i)});a.addEventListener('keydown',e=>{if(e.key==='Enter')open(l,i)})})};
const tr=$('#track');
if(tr){const sl=$$('.slide',tr),dots=$('#dots');sl.forEach(()=>dots.append(document.createElement('i')));
 const upd=()=>{const c=tr.scrollLeft+tr.clientWidth/2;let b=0,bd=1e9;sl.forEach((s,i)=>{const d=Math.abs(s.offsetLeft-tr.offsetLeft+s.offsetWidth/2-c);if(d<bd){bd=d;b=i}});
  sl.forEach((s,i)=>s.classList.toggle('on',i===b));[...dots.children].forEach((d,i)=>d.classList.toggle('on',i===b))};
 const go=d=>tr.scrollBy({left:d*(sl[0].offsetWidth+18),behavior:'smooth'});
 $('#prev').onclick=()=>go(-1);$('#next').onclick=()=>go(1);
 tr.addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});
 tr.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});
 bind(sl);upd()}
const gl=$$('.gal a');if(gl.length){bind(gl);
 $$('.filters button').forEach(b=>b.onclick=()=>{$$('.filters button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});
  gl.forEach(a=>a.hidden=!(b.dataset.f==='all'||a.dataset.c===b.dataset.f))})}
