import "../assets/CCS/Price.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../component/Footer";

function Price() {
  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };
   useEffect(() => {
    getServices();
  }, []);


  const grouped = services.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="pp">
      <div className="pp-hero">
        <div className="pp-deco">NPR</div>
        <span className="pp-eyebrow">Pricing Guide</span>
        <h1>
          Simple,
          <br />
          Transparent
          <br />
          Pricing.
        </h1>
        <p className="pp-subp">
          High-quality cleaning for every garment. Standard 48h or Express 24h —
          you choose.
        </p>
        <div className="pp-legend">
          <span className="pp-col">Item Type</span>
          <div className="pp-li">
            <div className="pp-ldot s" />
            Standard (48h)
          </div>
          <div className="pp-li">
            <div className="pp-ldot e" />
            Express (24h)
          </div>
        </div>
      </div>
      <div className="pp-body">
        <div className="pp-note">
          ℹ{" "}
          <span>
            <strong>Note:</strong> All prices in NPR, per item unless stated.
            Express ~50% surcharge.
          </span>
        </div>
        {Object.entries(grouped).map(([category, items]) => (
          <div className="pp-sec" key={category}>
            <div className="pp-shead">
              <span style={{ fontSize: "1rem" }}>{items[0].icon}</span>
              <h3>{category}</h3>
            </div>

            <div className="pp-cols">
              <span className="pp-col">Item Type</span>
              <span className="pp-col">Standard (48h)</span>
              <span className="pp-col e">Express (24h)</span>
            </div>

            {items.map((service) => (
              <div className="pp-row" key={service.id}>
                <span className="pp-item">{service.service_name}</span>
                <span className="pp-std">NPR {service.standard_price}</span>
                <span className="pp-exp">NPR {service.express_price}</span>
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
