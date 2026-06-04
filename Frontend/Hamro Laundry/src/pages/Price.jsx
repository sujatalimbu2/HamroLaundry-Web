import Navbar from "../component/Navbar";
const Pricelist = () => {
    const categories = [
    {
      icon:"👕", name:"Casual & Daily Wear",
      rows:[
        ["T-Shirt / Polo",        "NPR 120", "NPR 180"],
        ["Shirt / Blouse",        "NPR 150", "NPR 225"],
        ["Trousers / Jeans",      "NPR 180", "NPR 270"],
        ["Sweater / Cardigan",    "NPR 250", "NPR 375"],
        ["Shorts / Skirt",        "NPR 130", "NPR 195"],
        ["Jacket (Light)",        "NPR 300", "NPR 450"],
      ]
    },
    {
      icon:"👔", name:"Formal & Business Wear",
      rows:[
        ["2-Piece Suit",          "NPR 850", "NPR 1,275"],
        ["Suit Jacket / Blazer",  "NPR 500", "NPR 750"],
        ["Evening Gown",          "NPR 1,200","NPR 1,800"],
        ["Silk Sari (Dry Clean)", "NPR 650", "NPR 975"],
        ["Dress Shirt (Pressed)", "NPR 200", "NPR 300"],
        ["Tie / Pocket Square",   "NPR 100", "NPR 150"],
      ]
    },
    {
      icon:"🛏️", name:"Bedding & Linens",
      rows:[
        ["Bed Sheet (Single)",    "NPR 200", "NPR 300"],
        ["Bed Sheet (Double)",    "NPR 300", "NPR 450"],
        ["Duvet / Blanket (Dbl)","NPR 700", "NPR 1,050"],
        ["Pillow Cover",          "NPR 80",  "NPR 120"],
        ["Curtains (per sq. ft.)","NPR 45",  "NPR 70"],
        ["Towel (Large)",         "NPR 120", "NPR 180"],
      ]
    },
    {
      icon:"🧥", name:"Specialist & Delicate",
      rows:[
        ["Leather Jacket",        "NPR 1,500","NPR 2,000"],
        ["Suede Item",            "NPR 1,200","NPR 1,600"],
        ["Wedding Dress",         "NPR 2,500","NPR 3,500"],
        ["Woollen Coat",          "NPR 900", "NPR 1,350"],
        ["Down Jacket",           "NPR 700", "NPR 1,050"],
        ["Saree (Embroidered)",   "NPR 800", "NPR 1,200"],
      ]
    },
    {
      icon:"✂️", name:"Alterations & Repairs",
      rows:[
        ["Hem (Trousers / Skirt)","NPR 150", "NPR 220"],
        ["Zip Replacement",       "NPR 200", "NPR 300"],
        ["Button Replacement",    "NPR 50",  "NPR 80"],
        ["Waist Adjustment",      "NPR 350", "NPR 500"],
        ["Sleeve Shortening",     "NPR 250", "NPR 380"],
        ["Patch / Repair",        "NPR 200", "NPR 300"],
      ]
    },
  ];
 
  return (
    <div className="price-page">
      <Navbar/>
      <div className="price-banner">
        <div className="price-banner-inner fade-up">
          <span className="price-banner-tag">Pricing Guide</span>
          <h1>Simple, Transparent<br />Pricing.</h1>
          <p>High-quality cleaning for every garment. Choose between our standard and express services to fit your schedule.</p>
          <div className="price-legend">
            <div className="legend-item"><div className="legend-dot std"></div>Standard (48h) — regular rate</div>
            <div className="legend-item"><div className="legend-dot exp"></div>Express (24h) — faster turnaround</div>
          </div>
        </div>
      </div>
 
      <div className="price-body">
        <div className="price-note-bar">
          ℹ️ &nbsp;<span><strong>Note:</strong> All prices are in Nepalese Rupees (NPR) and are per item unless stated. Express service attracts a ~50% surcharge.</span>
        </div>
 
        {categories.map(cat => (
          <div className="pt-section" key={cat.name}>
            <div className="pt-head">
              <span className="pt-head-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
            </div>
            <div className="pt-col-row">
              <span className="pt-col-label">Item Type</span>
              <span className="pt-col-label">Standard (48h)</span>
              <span className="pt-col-label express">Express (24h)</span>
            </div>
            {cat.rows.map(([item, std, exp]) => (
              <div className="pt-row" key={item}>
                <span className="pt-item-name">{item}</span>
                <span className="pt-std">{std}</span>
                <span className="pt-exp">{exp}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      </div>
  )
};

export default Pricelist;