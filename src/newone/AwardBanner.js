import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const banner = {
    titleSmall: "Recognised as",
    titleLarge: "MOST PROMISING UI/UX TRAINING INSTITUTES IN INDIA",
    buttonText: "Know More",
    image: "/abroad.jpg",
};

const AwardBanner = () => {
    return (
        <div className="px-5 py-5 bg-dark">
            <div
                className="container-fluid rounded-3 p-4"
                style={{ backgroundColor: "#1a1a1a", border: "1px solid #ffa500" }}
            >
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-md-6 order-1">
                        <section className="my-4 ps-md-4 rounded text-start">
                            <h5 className="text-white mb-2">{banner.titleSmall}</h5>
                            <h2 className="text-white fw-bold mb-3">{banner.titleLarge}</h2>
                            <div>
                                <Button variant="warning" className="fw-bold px-4 py-2">
                                    {banner.buttonText}
                                </Button>
                            </div>
                        </section>
                    </div>

                    {/* Right Image */}
                    <div className="col-md-6 d-flex justify-content-center align-items-center order-2">
                        <img
                            src={banner.image}
                            alt={banner.titleLarge}
                            className="img-fluid rounded"
                            style={{
                                maxHeight: "350px",
                                boxShadow: "0 4px 8px rgba(255, 165, 0, 0.3)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AwardBanner;
