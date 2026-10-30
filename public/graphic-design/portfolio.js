const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{rootMargin:'80px',threshold:.05});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
const filters=[...document.querySelectorAll('[data-filter]')];
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});document.querySelectorAll('[data-category]').forEach(section=>{section.hidden=button.dataset.filter!=='all'&&button.dataset.filter!==section.dataset.category});const target=document.querySelector(button.dataset.filter==='all'?'#social':'#'+button.dataset.filter);if(target){target.classList.add('is-visible');requestAnimationFrame(()=>requestAnimationFrame(()=>target.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'})))}}));
const dialog=document.querySelector('.lightbox');const viewer=dialog.querySelector('img');const caption=dialog.querySelector('h2');
document.querySelectorAll('[data-image]').forEach(card=>card.addEventListener('click',()=>{viewer.src=card.dataset.image;viewer.alt=card.dataset.caption;caption.textContent=card.dataset.caption;dialog.showModal()}));
dialog.querySelector('.close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
let scheduled=false;function progress(){const total=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.width=(total>0?scrollY/total*100:0)+'%';scheduled=false}window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress)}},{passive:true});progress();

const talk=document.querySelector('.contact-dialog');
document.querySelectorAll('[data-contact]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();talk.showModal()}));
talk.querySelector('.close-contact').addEventListener('click',()=>talk.close());
talk.addEventListener('click',event=>{if(event.target===talk){const r=talk.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)talk.close()}});
