// CONFIG (owner to confirm): WhatsApp number, international format without "+". From visiting card: 9075664040.
const WA_NUMBER='919075664040';
const f=document.getElementById('f'),$=id=>document.getElementById(id);
const d=$('date'),t=new Date();d.min=new Date(t.getTime()-t.getTimezoneOffset()*6e4).toISOString().slice(0,10);
const m=()=>f.method.value;
const tg=()=>$('addrWrap').style.display=m()==='Delivery'?'block':'none';
f.addEventListener('change',tg);tg();
function validate(){let ok=true;const phone=f.phone.value.replace(/[\s-]/g,'').replace(/^(\+91|91|0)/,'');
 const chk=(k,c,msg)=>{$('e-'+k).textContent=c?'':msg;if(!c)ok=false};
 chk('name',f.cname.value.trim().length>1,'Please enter your full name.');
 chk('phone',/^[6-9]\d{9}$/.test(phone),'Enter a valid 10-digit Indian mobile number.');
 chk('addr',m()!=='Delivery'||f.address.value.trim().length>5,'Delivery address is required for delivery.');
 chk('flavor',!!f.flavor.value,'Please choose a flavor.');
 chk('size',!!f.size.value,'Please choose a size.');
 chk('date',!!d.value&&d.value>=d.min,'Choose today or a future date.');
 return ok?phone:null}
function msg(p){const L=['Hello Deluxe Bakery & Cafe, I would like to order a cake:','','Name: '+f.cname.value.trim(),'Phone: +91 '+p,'Method: '+m()];
 if(m()==='Delivery')L.push('Address: '+f.address.value.trim());
 L.push('Flavor: '+f.flavor.value,'Size: '+f.size.value,'Design/theme: '+(f.design.value.trim()||'-'),'Occasion: '+(f.occasion.value||'-'),'Date: '+d.value+(f.time.value?' at '+f.time.value:''),'Instructions: '+(f.notes.value.trim()||'-'));return L.join('\n')}
f.addEventListener('submit',e=>{e.preventDefault();const p=validate();if(!p){$('form-err').textContent='Please fix the highlighted fields.';return}
 $('form-err').textContent='';const x=msg(p);$('sum').textContent=x;$('wa').href='https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(x);
 $('review').hidden=false;f.hidden=true;$('review').scrollIntoView({behavior:'smooth'})});
$('edit').onclick=()=>{$('review').hidden=true;f.hidden=false};
