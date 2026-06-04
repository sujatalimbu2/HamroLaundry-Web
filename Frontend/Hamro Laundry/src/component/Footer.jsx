import "../assets/CCS/Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-logo">Hamro Laundry </div>
            <p className="footer-desc">Premium in-store laundry and dry<br/>
                 cleaning. Book your drop-off slot<br/>
                  online and collect your clothes<br/>
                   fresh and clean.</p>
          </div>
          {[
            {title:"Services",links:["Dry Cleaning","Wash & Fold","Ironing","Bedding","Alterations"]},
            {title:"Company",links:["About Us","Pricing","Book a Slot","Contact"]},
            {title:"Support",links:["FAQ","Opening Hours","Privacy Policy","Terms"]},
          ].map(col => (
            <div className="footer-col" key={col.title}>
              <h5>{col.title}</h5>
              <ul>{col.links.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          © 2026 Hamro Laundry. All rights reserved. In-store drop-off only.
        </div>
      </footer>
    </>
  );
}
 