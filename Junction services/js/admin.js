
const DATA_URL="../data/site-data.json";
let state=null;
const q=s=>document.querySelector(s);
async function load(){state=await (await siteDataFetch(DATA_URL+"?v="+Date.now())).json();fill("whiteLabels");fill("businessConsultancy");renderCats();}
function getPath(path){return path.split(".").reduce((o,k)=>o[k],state)}
function setPath(path,val){const a=path.split(".");let o=state;for(let i=0;i<a.length-1;i++)o=o[a[i]];o[a[a.length-1]]=val}
function fill(section){
 document.querySelectorAll(`[data-bind^="${section}."]`).forEach(el=>{el.value=getPath(el.dataset.bind)||""});
}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 document.querySelectorAll(".panel[id]").forEach(x=>x.classList.add("hidden"));q("#"+b.dataset.tab).classList.remove("hidden");
});
document.querySelectorAll("[data-save]").forEach(btn=>btn.onclick=()=>{
 const sec=btn.dataset.save;
 document.querySelectorAll(`[data-bind^="${sec}."]`).forEach(el=>setPath(el.dataset.bind,el.value));
 fetch("/api/site-data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(state)}).catch(()=>{});
 localStorage.setItem("JUNCTION_GROUP_SITE_DATA",JSON.stringify(state));
 alert("Saved. The API is updated when this site is running through server.js; local storage is kept as a browser fallback.");
});
function renderCats(){
 const root=q("#categoryEditor");root.innerHTML="";
 state.products.categories.forEach((c,ci)=>{
  const d=document.createElement("details");d.className="category-admin";d.open=!!c.expanded;
  d.innerHTML=`<summary>${String(c.id).padStart(2,"0")} · ${esc(c.name)} · ${c.products.length} products</summary>
  <div class="inner"><label>Category name<input value="${escAttr(c.name)}" data-ci="${ci}" data-field="name"></label>
  <label><input type="checkbox" data-ci="${ci}" data-field="expanded" ${c.expanded?"checked":""}> Keep expanded by default</label>
  <div class="products"></div>
  <button class="add" data-add-product="${ci}">+ Add product</button>
  <button class="danger" data-delete-category="${ci}">Delete category</button></div>`;
  const list=d.querySelector(".products");
  c.products.forEach((p,pi)=>{
   const row=document.createElement("div");row.className="product-admin";
   row.innerHTML=`<input placeholder="Product" value="${escAttr(p.name)}" data-ci="${ci}" data-pi="${pi}" data-pfield="name">
   <input placeholder="Pack size" value="${escAttr(p.pack)}" data-ci="${ci}" data-pi="${pi}" data-pfield="pack">
   <input placeholder="Details / target" value="${escAttr(p.target)}" data-ci="${ci}" data-pi="${pi}" data-pfield="target">
   <button class="danger" data-delete-product="${ci}:${pi}">×</button>`;
   list.appendChild(row);
  });
  root.appendChild(d);
 });
 root.querySelectorAll("[data-field]").forEach(el=>el.onchange=()=>{state.products.categories[+el.dataset.ci][el.dataset.field]=el.type==="checkbox"?el.checked:el.value;saveData();renderCats()});
 root.querySelectorAll("[data-pfield]").forEach(el=>el.oninput=()=>{state.products.categories[+el.dataset.ci].products[+el.dataset.pi][el.dataset.pfield]=el.value;saveData()});
 root.querySelectorAll("[data-delete-product]").forEach(el=>el.onclick=()=>{let [ci,pi]=el.dataset.deleteProduct.split(":").map(Number);state.products.categories[ci].products.splice(pi,1);saveData();renderCats()});
 root.querySelectorAll("[data-add-product]").forEach(el=>el.onclick=()=>{state.products.categories[+el.dataset.addProduct].products.push({name:"New Product",pack:"",target:""});saveData();renderCats()});
 root.querySelectorAll("[data-delete-category]").forEach(el=>el.onclick=()=>{state.products.categories.splice(+el.dataset.deleteCategory,1);state.products.categories.forEach((x,i)=>x.id=i+1);saveData();renderCats()});
}
q("#addCategory").onclick=()=>{state.products.categories.push({id:state.products.categories.length+1,name:"New Category",expanded:false,products:[]});saveData();renderCats()};
function saveData(){localStorage.setItem("JUNCTION_GROUP_SITE_DATA",JSON.stringify(state))}
function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function escAttr(v){return esc(v)}
load();

q("#resetData").onclick=async()=>{
 if(!confirm("Reset local admin changes and return to the supplied catalogue?"))return;
 localStorage.removeItem("JUNCTION_GROUP_SITE_DATA");
 location.reload();
};
