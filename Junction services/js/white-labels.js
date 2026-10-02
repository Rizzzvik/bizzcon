(function(){
  var switcher=document.getElementById("siteSwitcher");
  if(!switcher) return;
  var trigger=switcher.querySelector(".site-switcher-trigger");
  trigger.addEventListener("click",function(e){
    e.preventDefault();
    var open=switcher.classList.toggle("open");
    trigger.setAttribute("aria-expanded",open?"true":"false");
  });
  document.addEventListener("click",function(e){
    if(!switcher.contains(e.target)){switcher.classList.remove("open");trigger.setAttribute("aria-expanded","false");}
  });
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){switcher.classList.remove("open");trigger.setAttribute("aria-expanded","false");}
  });
})();


/* White Labels shared data bridge */
(async function(){
  try{
    const r=await fetch("data/site-data.json",{cache:"no-store"});
    if(!r.ok)return;
    const d=await r.json();
    const cfg=d.whiteLabels||{};
    document.querySelectorAll("[data-contact-email]").forEach(e=>{if(cfg.email)e.textContent=cfg.email,e.href="mailto:"+cfg.email});
    document.querySelectorAll("[data-contact-phone]").forEach(e=>{if(cfg.phone)e.textContent=cfg.phone,e.href="tel:"+cfg.phone});
    document.querySelectorAll("[data-contact-whatsapp]").forEach(e=>{if(cfg.whatsapp)e.href="https://wa.me/"+cfg.whatsapp});
  }catch(e){}
})();

/* Local admin override bridge */
(async function(){
  try{
    const r=await fetch("data/site-data.json?base="+Date.now(),{cache:"no-store"});
    const baseData=r.ok?await r.json():{};
    let local={};
    try{local=JSON.parse(localStorage.getItem("JUNCTION_GROUP_SITE_DATA")||"{}")}catch(e){}
    const cfg=Object.assign({},baseData.whiteLabels||{},local.whiteLabels||{});
    document.querySelectorAll("[data-contact-email]").forEach(e=>{
      if(cfg.email){e.textContent=e.textContent||"Email White Labels";e.href="mailto:"+cfg.email}
    });
    document.querySelectorAll("[data-contact-phone]").forEach(e=>{
      if(cfg.phone){e.textContent=cfg.phone;e.href="tel:"+cfg.phone}
    });
    document.querySelectorAll("[data-contact-whatsapp]").forEach(e=>{
      if(cfg.whatsapp)e.href="https://wa.me/"+String(cfg.whatsapp).replace(/\D/g,"")
    });
    const h=document.querySelector("#contact h2");
    const p=document.querySelector("#contact .section-copy");
    if(h&&cfg.contactHeading)h.textContent=cfg.contactHeading;
    if(p&&cfg.contactText)p.textContent=cfg.contactText;
  }catch(e){console.warn("Site data bridge:",e)}
})();

/* Product catalogue admin bridge */
(async function(){
  if(!document.querySelector(".category-grid")) return;
  try{
    const r=await fetch("data/site-data.json?catalog="+Date.now(),{cache:"no-store"});
    const baseData=r.ok?await r.json():{};
    let local={};
    try{local=JSON.parse(localStorage.getItem("JUNCTION_GROUP_SITE_DATA")||"{}")}catch(e){}
    const cats=(local.products&&local.products.categories)||baseData.products&&baseData.products.categories||[];
    if(!cats.length)return;
    const grid=document.querySelector(".category-grid");
    grid.innerHTML=cats.map((c,i)=>`
      <details class="category" id="cat-${String(i+1).padStart(2,"0")}" ${c.expanded?"open":""}>
        <summary>
          <span class="num">${String(i+1).padStart(2,"0")}</span>
          <span class="cat-name">${escWL(c.name)}</span>
          <span class="count">${c.products.length}</span>
          <span class="chevron">+</span>
        </summary>
        <div class="atoms">
          ${c.products.map(p=>`<div class="atom"><span class="atom-mark">—</span><div><strong>${escWL(p.name)}</strong>${p.target?`<small>${escWL(p.target)}</small>`:""}</div><em>${escWL(p.pack)}</em></div>`).join("")}
        </div>
      </details>`).join("");
    grid.querySelectorAll(".category").forEach(cat=>{
      cat.addEventListener("toggle",()=>{
        if(!cat.open)return;
        grid.querySelectorAll(".category").forEach(other=>{if(other!==cat)other.open=false});
      });
    });
  }catch(e){console.warn("Catalogue bridge:",e)}
  function escWL(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
})();
