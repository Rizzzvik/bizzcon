/* ===== SITE CONFIG: edit content here only ===== */
var CONFIG={
brand:{name:"Junction Experts",short:"Junction Experts",tagline:"BUSINESS PR AND PLANNING CONSULTANTS",footer:"\u00a9 Junction Experts. All rights reserved."},
contact:{whatsapp:"0000000000",message:"Hello, I would like to discuss a business challenge.",email:"hello@example.com",phone:"+00 000 000 0000",address:"Address to be provided"},
nav:{contact:"Contact Us"},
hero:{title:"Strategy that moves business forward.",text:"Business planning, management consulting and strategic advisory for companies ready to adapt, grow and operate better.",primary:"Explore Our Expertise",secondary:"Reach Out to Professionals"},
positioning:{title:"One strategic partner for complex business challenges.",text:"We help businesses understand challenges, define practical strategies and build the systems required for sustainable growth."},
expertise:{title:"Our Areas of Expertise",text:"From strategic direction to operational execution, our consulting capabilities cover the key functions that drive a business forward."},
why:{title:"Where Complexity Calls for Perspective",text:"The most consequential gaps are rarely obvious. They emerge where decisions, priorities and execution begin to pull in different directions — and where an outside perspective can bring them back into alignment."},
approach:{title:"How we work",steps:[
{name:"Understand",text:"We study the business, its market and the problem before proposing anything."},
{name:"Define",text:"We turn findings into a clear strategy with priorities and trade-offs."},
{name:"Build",text:"We design the plans, processes and structures that put the strategy to work."},
{name:"Support",text:"We stay alongside your team as the plan is executed and refined."}]},
cta:{title:"Have a business challenge to solve?",whatsapp:"Message us on WhatsApp",contact:"Contact details"},
contactPage:{back:"Back to home",title:"Let's talk about your business.",text:"Message us on WhatsApp for the fastest response. Tell us briefly what you are working on.",button:"Open WhatsApp",labels:{email:"Email",phone:"Phone",address:"Office"}},
whiteLabels:{brand:"White labels",tagline:"SOLUTION PROVIDERS FOR HEALTH AND PERSONAL CARE PRODUCTS",hero:{title:"Private-label products, built for your brand.",text:"We connect businesses with white-label health and personal care product solutions designed for brand-ready distribution.",primary:"Explore Product Solutions",secondary:"Reach Out to Professionals"},positioning:{title:"A product partner behind your brand.",text:"From product selection to a brand-ready supply pathway, we help businesses build a focused private-label offering."},expertise:{title:"White Label Product Solutions",text:"Explore product categories, formulation options and supply capabilities through our dedicated solution network."}},
categories:[
{short:"Strategy",title:"Strategy & Management Consulting",summary:"Direction, structure and leadership alignment for organisations at a turning point.",services:[
{name:"Corporate & Business Strategy",desc:"Long-term goals, new market entry, mergers and acquisitions, and business model change."},
{name:"Management Consulting",desc:"Review of operations and structures to improve efficiency, resolve systemic issues and guide restructuring."},
{name:"Change Management",desc:"Support through leadership shifts, digital transformation and cultural change."}]},
{short:"Operations",title:"Operations & Process Consulting",summary:"Making the business run more efficiently, consistently and at scale.",services:[
{name:"Supply Chain & Logistics",desc:"Procurement, warehousing, distribution networks and vendor management."},
{name:"Process Improvement",desc:"Lean and Six Sigma methods to remove bottlenecks, cut cost and raise productivity."},
{name:"Quality Assurance & Standards",desc:"Standard operating procedures and preparation for certifications such as ISO."}]},
{short:"Finance",title:"Financial & Risk Advisory",summary:"Financial clarity for better decisions, and frameworks for managing uncertainty.",services:[
{name:"Financial Planning & Budgeting",desc:"Cash flow, financial modelling, corporate restructuring and cost reduction."},
{name:"Tax & Regulatory Compliance",desc:"Corporate tax frameworks, statutory audits, industry licensing and zoning rules."},
{name:"Risk Management & Cybersecurity Audits",desc:"Operational, financial and digital risk review, with disaster recovery and fraud-prevention frameworks."}]},
{short:"People",title:"HR & Talent Consulting",summary:"People structures and practices that support the strategy.",services:[
{name:"Talent Acquisition & Executive Search",desc:"Recruitment pipelines and senior leadership hiring."},
{name:"Compensation & Benefits",desc:"Salary benchmarking and structures, employee stock options and incentive programmes."},
{name:"Training & Development",desc:"Skills programmes, leadership training and workplace culture workshops."}]},
{short:"Marketing",title:"Marketing, Branding & Sales Consulting",summary:"Positioning and commercial systems that win and keep customers.",services:[
{name:"Brand Strategy",desc:"Brand identity, positioning, messaging and perception guidelines."},
{name:"Digital & Performance Marketing",desc:"Acquisition funnels, social media strategy, SEO and SEM, and paid media management."},
{name:"Sales Operations",desc:"Sales pipelines, CRM adoption, pricing models and incentive structures."}]},
{short:"Technology",title:"IT & Digital Consulting",summary:"Choosing, integrating and securing the systems a business runs on.",services:[
{name:"Software Implementation & Architecture",desc:"ERP systems, cloud migration and custom software integration."},
{name:"Data Analytics & Business Intelligence",desc:"Data pipelines, dashboards and predictive metrics for data-backed decisions."},
{name:"IT Security & Infrastructure",desc:"Evaluation of hardware and software environments and cybersecurity protocols."}]},
{short:"Specialised",title:"Niche & Specialised Consultancies",summary:"Focused expertise for situations that need a specific answer.",services:[
{name:"Public Relations & Crisis Management",desc:"Public image, media relations and corporate communications during a crisis."},
{name:"Legal Consulting",desc:"Counsel on corporate law, intellectual property and contractual obligations."},
{name:"Sustainability & ESG Consulting",desc:"Environmental, social and governance standards, green energy transition and compliance."},
{name:"Real Estate & Facility Consulting",desc:"Commercial leasing, property acquisition and zoning."}]}]};

/* Admin data bridge: local browser overrides */
(async function(){
  try{
    const r=await fetch("data/site-data.json?business="+Date.now(),{cache:"no-store"});
    const baseData=r.ok?await r.json():{};
    let local={};
    try{local=JSON.parse(localStorage.getItem("JUNCTION_GROUP_SITE_DATA")||"{}")}catch(e){}
    const c=Object.assign({},baseData.businessConsultancy||{},local.businessConsultancy||{});
    if(c.email)CONFIG.contact.email=c.email;
    if(c.phone)CONFIG.contact.phone=c.phone;
    if(c.whatsapp)CONFIG.contact.whatsapp=String(c.whatsapp).replace(/\D/g,"");
    if(c.contactHeading)CONFIG.contactPage.title=c.contactHeading;
    if(c.contactText)CONFIG.contactPage.text=c.contactText;
    const h=document.querySelector("#contact h2"),p=document.querySelector("#contact .lead");
    if(h&&c.contactHeading)h.textContent=c.contactHeading;
    if(p&&c.contactText)p.textContent=c.contactText;
    const K=CONFIG.contact,L=CONFIG.contactPage.labels;
    const cd=document.querySelector("#cd");
    if(cd)cd.innerHTML='<a href="mailto:'+esc(K.email)+'"><span>'+L.email+"</span><span>"+esc(K.email)+'</span></a><div><span>'+L.phone+"</span><span>"+esc(K.phone)+"</span></div>";
    const wa=document.querySelector(".wa");
    if(wa&&K.whatsapp)wa.href="https://wa.me/"+String(K.whatsapp).replace(/\D/g,"");
  }catch(e){console.warn("Business admin bridge:",e)}
})();

/* ===== RENDERING: no content below ===== */
var C=CONFIG,$=function(s){return document.querySelector(s)};
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
document.title=C.brand.name;
document.querySelectorAll("[data-k]").forEach(function(el){var v=el.dataset.k.split(".").reduce(function(o,k){return o&&o[k]},C);if(v!=null)el.textContent=v});
var WA="https://wa.me/"+C.contact.whatsapp+"?text="+encodeURIComponent(C.contact.message);
document.querySelectorAll(".wal").forEach(function(a){a.href=WA});
var cb=$(".cb");cb.href="#contact";
var acc=$("#acc");
C.categories.forEach(function(d,i){var e=document.createElement("div");e.className="it";
e.innerHTML='<button aria-expanded="false" aria-controls="p'+i+'"><span class="no">0'+(i+1)+'</span><span class="t">'+esc(d.title)+'</span><span class="pl"></span></button><div class="pn" id="p'+i+'"><div><p>'+esc(d.summary)+'</p><div class="sv">'+d.services.map(function(s){return"<div><b>"+esc(s.name)+"</b><span>"+esc(s.desc)+"</span></div>"}).join("")+'</div></div></div>';
e.querySelector("button").onclick=function(){var o=e.classList.toggle("open");this.setAttribute("aria-expanded",o)};acc.appendChild(e)});
var f=acc.firstChild;f.classList.add("open");f.querySelector("button").setAttribute("aria-expanded","true");
$("#steps").innerHTML=C.approach.steps.map(function(s){return'<div class="st"><h3>'+esc(s.name)+"</h3><p>"+esc(s.text)+"</p></div>"}).join("");
var n=C.categories.length,h='<g class="spin">',P=function(i){var a=-Math.PI/2+i*2*Math.PI/n;return[200+Math.cos(a)*145,200+Math.sin(a)*145]};
C.categories.forEach(function(c,i){var p=P(i);h+='<line x1="200" y1="200" x2="'+p[0]+'" y2="'+p[1]+'"/>'});
C.categories.forEach(function(c,i){var p=P(i);h+='<g class="nd"><circle class="n" cx="'+p[0]+'" cy="'+p[1]+'" r="36"/><text x="'+p[0]+'" y="'+(p[1]+4)+'">'+esc(c.short)+"</text></g>"});
h+='</g><circle class="c" cx="200" cy="200" r="50"/><text class="ct" x="200" y="206">Business</text>';$(".hub").innerHTML=h;
var L=C.contactPage.labels,K=C.contact;
$("#cd").innerHTML='<a href="mailto:'+esc(K.email)+'"><span>'+L.email+"</span><span>"+esc(K.email)+'</span></a><div><span>'+L.phone+"</span><span>"+esc(K.phone)+"</span></div><div><span>"+L.address+"</span><span>"+esc(K.address)+"</span></div>";
var siteMode="consulting";
var modeData={consulting:{label:C.brand.tagline,title:C.hero.title,text:C.hero.text,primary:C.hero.primary,secondary:C.hero.secondary,posTitle:C.positioning.title,posText:C.positioning.text,expTitle:C.expertise.title,expText:C.expertise.text},white:{label:C.whiteLabels.tagline,title:C.whiteLabels.hero.title,text:C.whiteLabels.hero.text,primary:C.whiteLabels.hero.primary,secondary:C.whiteLabels.hero.secondary,posTitle:C.whiteLabels.positioning.title,posText:C.whiteLabels.positioning.text,expTitle:C.whiteLabels.expertise.title,expText:C.whiteLabels.expertise.text}};
function applyMode(mode,animate){var d=modeData[mode];if(animate)document.body.classList.add("mode-changing");setTimeout(function(){var sw=$("#siteSwitcher .switch-label");if(sw)sw.textContent=mode==="white"?C.whiteLabels.brand+" · "+C.whiteLabels.tagline:d.label;$("[data-k=\"hero.title\"]").textContent=d.title;$("[data-k=\"hero.text\"]").textContent=d.text;$("[data-k=\"hero.primary\"]").textContent=d.primary;$("[data-k=\"hero.secondary\"]").textContent=d.secondary;$("[data-k=\"positioning.title\"]").textContent=d.posTitle;$("[data-k=\"positioning.text\"]").textContent=d.posText;$("[data-k=\"expertise.title\"]").textContent=d.expTitle;$("[data-k=\"expertise.text\"]").textContent=d.expText;document.body.dataset.siteMode=mode;document.body.classList.remove("mode-changing");},animate?180:0)}
(function(){
var switcher=document.getElementById("siteSwitcher"),trigger=switcher&&switcher.querySelector(".site-switcher-trigger"),menu=switcher&&switcher.querySelector(".site-switcher-menu");
if(!switcher||!trigger||!menu)return;
trigger.addEventListener("click",function(e){e.preventDefault();var open=switcher.classList.toggle("open");trigger.setAttribute("aria-expanded",open?"true":"false")});
menu.querySelectorAll("[data-site-option]").forEach(function(option){
  option.addEventListener("click",function(e){
    e.preventDefault();
    var target=option.getAttribute("data-site-option");
    if(target==="consulting"){
      siteMode="consulting"; applyMode(siteMode,true);
      menu.querySelectorAll(".site-switcher-option").forEach(function(x){x.classList.remove("current")});
      option.classList.add("current");
      trigger.querySelector(".switch-name").textContent="BUSINESS PR AND PLANNING CONSULTANTS";
      switcher.classList.remove("open"); trigger.setAttribute("aria-expanded","false");
    }else{
      /* Add the White Labels URL here when ready. */
      var whiteLabelsUrl="";
      if(whiteLabelsUrl){window.location.href=whiteLabelsUrl;return;}
      siteMode="white"; applyMode(siteMode,true);
      menu.querySelectorAll(".site-switcher-option").forEach(function(x){x.classList.remove("current")});
      option.classList.add("current");
      trigger.querySelector(".switch-name").textContent="WHITE LABELS";
      switcher.classList.remove("open"); trigger.setAttribute("aria-expanded","false");
    }
  });
});
document.addEventListener("click",function(e){if(!switcher.contains(e.target)){switcher.classList.remove("open");trigger.setAttribute("aria-expanded","false")}});
})();
var intro=$("#intro");function end(){intro.classList.add("gone");document.body.classList.remove("lock");intro.setAttribute("aria-hidden","true")}
$("#skip").onclick=end;setTimeout(end,7200);
function route(){document.body.classList.toggle("cp",location.hash==="#contact");window.scrollTo(0,0)}
var hero=$(".hero");if(window.IntersectionObserver)new IntersectionObserver(function(e){hero.classList.toggle("off",!e[0].isIntersecting)}).observe(hero);
addEventListener("hashchange",route);route();
document.querySelectorAll("[data-home]").forEach(function(a){a.onclick=function(e){e.preventDefault();history.replaceState(null,"",location.pathname);route()}});
document.querySelectorAll("[data-go]").forEach(function(a){a.onclick=function(e){e.preventDefault();document.body.classList.remove("cp");$(a.getAttribute("href")).scrollIntoView({behavior:"smooth"})}});