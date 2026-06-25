import { useState } from "react";
import "../assets/CCS/Book.css";
import Footer from "../component/Footer";

const genRef=()=>"BK"+Date.now().toString(36).toUpperCase();

function Book ({addToBasket=()=>{},navBasket=[],goPrice=()=>{}}){ 
  const bookCats = [
  {id:"laundry",label:"Laundry",icon:"👕",items:[
    {id:"clothes",label:"Clothes",icon:"🧥",sub:"Shirts, trousers, dresses",opts:["Wash & Fold","Wash & Iron"]},
    {id:"linens",label:"Linens",icon:"🛏️",sub:"Sheets, towels, pillowcases",opts:["Wash & Fold","Wash & Iron"]},
    {id:"delicates",label:"Delicates",icon:"👗",sub:"Silk, lace, fine fabrics",opts:["Gentle Wash","Dry Clean"]},
  ]},
  {id:"blankets",label:"Blankets",icon:"🛋️",items:[
    {id:"single_b",label:"Single Blanket",icon:"🛏️",sub:"Up to single bed size",opts:["Wash & Fold","Dry Clean"]},
    {id:"double_b",label:"Double Blanket",icon:"🛏️",sub:"Double/queen size",opts:["Wash & Fold","Dry Clean"]},
  ]},
  {id:"carpets",label:"Carpets",icon:"🪟",items:[
    {id:"small_c",label:"Small Carpet",icon:"🪟",sub:"Under 4×6 ft",opts:["Standard","Deep Clean"]},
    {id:"large_c",label:"Large Carpet",icon:"🪟",sub:"6×8 ft and above",opts:["Standard","Deep Clean"]},
  ]},
];
 
  const [cat,setCat]=useState("laundry");
  const [mode,setMode]=useState("regular");
  const [sels,setSels]=useState({});
  const [date,setDate]=useState("");
  const [time,setTime]=useState("");
  const [done,setDone]=useState(false);
  const [ref,setRef]=useState("");
  const catObj=bookCats.find(c=>c.id===cat);
  const total=navBasket.reduce((s,i)=>s+i.qty,0);
  const togOpt=(id,o)=>setSels(p=>({...p,[id]:{...p[id],option:p[id]?.option===o?undefined:o}}));
  const adjQty=(id,d)=>setSels(p=>({...p,[id]:{...p[id],qty:Math.max(1,(p[id]?.qty||1)+d)}}));
  const add=item=>{
    const s=sels[item.id]||{};
    if(!s.option){alert("Select a service option.");return}
    addToBasket({id:item.id+"|"+s.option+"|"+mode,icon:item.icon,name:item.label,option:s.option,mode,qty:s.qty||1});
    setSels(p=>({...p,[item.id]:{option:undefined,qty:1}}));
  };
  const confirm=()=>{
    if(navBasket.length===0){alert("Add at least one service to your basket.");return}
    if(!date||!time){alert("Please select a date and time slot.");return}
    setRef(genRef());setDone(true);
  };
  if(done) return(
    <div className="bp" style={{display:"flex",flexDirection:"column"}}>
      <div className="bp-hero"><div className="bp-hi"><div><span className="bp-heyebrow">All Done</span><div className="bp-htitle">You're all <em>set!</em></div></div></div></div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"48px 56px"}}>
        <div className="bp-ok">
          <div className="bp-ok-ico">✓</div>
          <h3>Booking Confirmed!</h3>
          <p>Drop off your items on <strong>{date}</strong> at <strong>{time}</strong>. We'll SMS you when ready.</p>
          <div className="bp-ref">{ref}</div><br/>
          <button className="bp-again" onClick={()=>{setDone(false);setDate("");setTime("")}}>+ New Booking</button>
        </div>
      </div>
    </div>
  ); 
  return(
    <div className="bp">
      <div className="bp-hero">
        <div className="bp-hi">
          <div><span className="bp-heyebrow">In-Store Drop-Off</span><div className="bp-htitle">Book your <em>services</em></div></div>
          <div className="bp-steps">
            {[["1","Services"],["2","Mode"],["3","Schedule"]].map(([n,l],i)=>(
              <span key={n} style={{display:"contents"}}>
                {i>0&&<div className="bp-sdiv"/>}
                <div className={`bp-sp${i===0?" on":""}`}><div className="bp-sc">{n}</div><span>{l}</span></div>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="bp-body">
        <div className="bp-left">
          <div>
            <span className="bp-lbl">Category</span>
            <div className="bp-cats">
              {bookCats.map(c=><button key={c.id} className={`bp-cpill${cat===c.id?" on":""}`} onClick={()=>setCat(c.id)}>{c.icon} {c.label}</button>)}
            </div>
          </div>
          <div>
            <span className="bp-lbl">Service Mode</span>
            <div className="bp-mode-bar">
              <span className="bp-mlbl">Mode:</span>
              {[["regular","Regular"],["express","Express"]].map(([id,l])=>(
                <button key={id} className={`bp-mpill${mode===id?" on":""}`} onClick={()=>setMode(id)}>{l}</button>
              ))}
              <span className="bp-mnote">{mode==="express"?"⚡ +50% surcharge":"🕐 Standard rate"}</span>
              <button className="bp-plink" onClick={goPrice}>See prices →</button>
            </div>
          </div>
          <div>
            <span className="bp-lbl">{catObj.label} — choose &amp; add</span>
            <div className="bp-cards">
              {catObj.items.map(item=>{
                const s=sels[item.id]||{};
                return(
                  <div className="bp-card" key={item.id}>
                    <div className="bp-ctop">
                      <div className="bp-cico">{item.icon}</div>
                      <div><div className="bp-cname">{item.label}</div><div className="bp-csub">{item.sub}</div></div>
                    </div>
                    <div className="bp-copts">
                      {item.opts.map(o=>(
                        <button key={o} className={`bp-copt${s.option===o?" on":""}`} onClick={()=>togOpt(item.id,o)}>{o}</button>
                      ))}
                    </div>
                    <div className="bp-cfoot">
                      <span className="bp-cql">Qty</span>
                      <div className="bp-stepper">
                        <button className="bp-sb" onClick={()=>adjQty(item.id,-1)}>−</button>
                        <span className="bp-sv">{s.qty||1}</span>
                        <button className="bp-sb" onClick={()=>adjQty(item.id,+1)}>+</button>
                      </div>
                    </div>
                    <button className="bp-cadd" onClick={()=>add(item)}>+ Add to Basket</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bp-right">
          <div className="bp-panel">
            <span className="bp-peyebrow">Service Mode</span>
            <div className="bp-mode-info">
              <div className="bp-mdot"/>
              <div>
                <div className="bp-mname">{mode==="express"?"⚡ Express":"🕐 Regular"}</div>
                <div className="bp-mdesc">{mode==="express"?"24h turnaround · ~50% surcharge":"48h turnaround · standard rate"}</div>
              </div>
            </div>
          </div>
          <div className="bp-panel">
            <span className="bp-peyebrow">Schedule Drop-Off</span>
            <div className="sched-field"><label>Date</label><input type="date" className="sched-input" value={date} onChange={e=>setDate(e.target.value)}/></div>
            <div className="sched-field"><label>Time Slot</label>
              <select className="sched-input" value={time} onChange={e=>setTime(e.target.value)}>
                <option value="">Select a time</option>
                {["9:00 AM – 10:00 AM","10:00 AM – 11:00 AM","11:00 AM – 12:00 PM","12:00 PM – 1:00 PM","2:00 PM – 3:00 PM","3:00 PM – 4:00 PM","4:00 PM – 5:00 PM"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            {total>0&&date&&time&&<div className="bp-hint">✓ {total} item{total!==1?"s":""} · {date}</div>}
            <button className="bp-cfm" onClick={confirm}><span>✓</span> Confirm Booking</button>
          </div>
          <div className="bp-panel">
            <div className="bp-nudge">
              <div className="bp-nudge-ico">🛒</div>
              <div className="bp-nudge-t">{total>0?`${total} item${total!==1?"s":""} in basket`:"Basket empty"}</div>
              <div className="bp-nudge-s">{total>0?"Tap 🛒 in the nav to review.":"Add services above to begin."}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
 export default Book;