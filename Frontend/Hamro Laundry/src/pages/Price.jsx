import "../assets/CCS/Price.css";
import Footer from "../component/Footer";
function Price(){
  const priceCats = [
  {icon:"👕",name:"Casual & Daily Wear",rows:[
    ["T-Shirt / Polo","NPR 120","NPR 180"],["Shirt / Blouse","NPR 150","NPR 225"],
    ["Trousers / Jeans","NPR 180","NPR 270"],["Sweater / Cardigan","NPR 250","NPR 375"],
    ["Shorts / Skirt","NPR 130","NPR 195"],["Light Jacket","NPR 300","NPR 450"],
  ]},
  {icon:"👔",name:"Formal & Business Wear",rows:[
    ["2-Piece Suit","NPR 850","NPR 1,275"],["Blazer / Jacket","NPR 500","NPR 750"],
    ["Evening Gown","NPR 1,200","NPR 1,800"],["Silk Sari","NPR 650","NPR 975"],
    ["Dress Shirt (Pressed)","NPR 200","NPR 300"],["Tie / Pocket Square","NPR 100","NPR 150"],
  ]},
  {icon:"🛏️",name:"Bedding & Linens",rows:[
    ["Bed Sheet (Single)","NPR 200","NPR 300"],["Bed Sheet (Double)","NPR 300","NPR 450"],
    ["Duvet / Blanket","NPR 700","NPR 1,050"],["Pillow Cover","NPR 80","NPR 120"],
    ["Curtains (per sq.ft.)","NPR 45","NPR 70"],["Large Towel","NPR 120","NPR 180"],
  ]},
  {icon:"🧥",name:"Specialist & Delicate",rows:[
    ["Leather Jacket","NPR 1,500","NPR 2,000"],["Suede Item","NPR 1,200","NPR 1,600"],
    ["Wedding Dress","NPR 2,500","NPR 3,500"],["Woollen Coat","NPR 900","NPR 1,350"],
    ["Down Jacket","NPR 700","NPR 1,050"],["Embroidered Saree","NPR 800","NPR 1,200"],
  ]},
  {icon:"✂️",name:"Alterations & Repairs",rows:[
    ["Hem (Trousers/Skirt)","NPR 150","NPR 220"],["Zip Replacement","NPR 200","NPR 300"],
    ["Button Replacement","NPR 50","NPR 80"],["Waist Adjustment","NPR 350","NPR 500"],
    ["Sleeve Shortening","NPR 250","NPR 380"],["Patch / Repair","NPR 200","NPR 300"],
  ]},
];
  return(
    <div className="pp">
      <div className="pp-hero">
        <div className="pp-deco">NPR</div>
        <span className="pp-eyebrow">Pricing Guide</span>
        <h1>Simple,<br/>Transparent<br/>Pricing.</h1>
        <p className="pp-subp">High-quality cleaning for every garment. Standard 48h or Express 24h — you choose.</p>
        <div className="pp-legend">
          <div className="pp-li"><div className="pp-ldot s"/>Standard (48h)</div>
          <div className="pp-li"><div className="pp-ldot e"/>Express (24h)</div>
        </div>
      </div>
      <div className="pp-body">
        <div className="pp-note">ℹ <span><strong>Note:</strong> All prices in NPR, per item unless stated. Express ~50% surcharge.</span></div>
        {priceCats.map(cat=>(
          <div className="pp-sec" key={cat.name}>
            <div className="pp-shead"><span style={{fontSize:"1rem"}}>{cat.icon}</span><h3>{cat.name}</h3></div>
            <div className="pp-cols">
              <span className="pp-col">Item Type</span>
              <span className="pp-col">Standard (48h)</span>
              <span className="pp-col e">Express (24h)</span>
            </div>
            {cat.rows.map(([item,std,exp])=>(
              <div className="pp-row" key={item}>
                <span className="pp-item">{item}</span>
                <span className="pp-std">{std}</span>
                <span className="pp-exp">{exp}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
export default Price;