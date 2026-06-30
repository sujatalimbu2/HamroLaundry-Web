import "../assets/CCS/Feedback.css";
import { useState } from "react";
function Feedback({onClose}){
  const [rating,setRating]=useState(0);
  const [hover,setHover]=useState(0);
  const [chips,setChips]=useState([]);
  const [name,setName]=useState("");
  const [text,setText]=useState("");
  const [done,setDone]=useState(false);
  const svcs=["Dry Cleaning","Wash & Fold","Ironing","Bedding","Leather","Alterations"];
  const lbl=["","Poor","Fair","Good","Great","Excellent!"];
  const submit=()=>{
    if(!rating){alert("Please select a rating.");return}
    if(!text.trim()){alert("Please write a short review.");return}
    setDone(true);
  };
  return(
    <><div className="backdrop" onClick={onClose}/>
    <div className="pm-wrap">
      <div className="fb-modal">
        <div className="fb-head" style={{position:"relative"}}>
          <button className="pm-close" onClick={onClose}>✕</button>
          <h3>Leave a Review</h3>
          <p>Share your FreshFold experience</p>
        </div>
        <div className="fb-body">
          {done
            ?<div className="fb-done"><div className="fb-done-ico">🙏</div><h4>Thank you!</h4><p>Your feedback helps us serve Kathmandu better.</p></div>
            :<>
              <span className="fb-lbl">Rating {rating>0&&`— ${lbl[rating]}`}</span>
              <div className="fb-stars">
                {[1,2,3,4,5].map(n=>(
                  <button key={n} className={`fb-star${(hover||rating)>=n?" lit":""}`}
                    onMouseEnter={()=>setHover(n)} onMouseLeave={()=>setHover(0)}
                    onClick={()=>setRating(n)}>⭐</button>
                ))}
              </div>
              <span className="fb-lbl">Services Used</span>
              <div className="fb-chips">
                {svcs.map(s=>(
                  <div key={s} className={`fb-chip${chips.includes(s)?" on":""}`}
                    onClick={()=>setChips(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s])}>{s}</div>
                ))}
              </div>
              <span className="fb-lbl">Your Name (optional)</span>
              <input className="fb-inp" placeholder="e.g. Priya M." value={name} onChange={e=>setName(e.target.value)}/>
              <span className="fb-lbl">Your Review *</span>
              <textarea className="fb-ta" placeholder="Tell us about your experience…" value={text} onChange={e=>setText(e.target.value)}/>
              <button className="fb-sub" onClick={submit}>Submit Review →</button>
            </>
          }
        </div>
      </div>
    </div></>
  );
}

export default Feedback;