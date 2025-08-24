import { Button } from "react-bootstrap";

const AwardBanner = () => {
    return (
        <>
            <div className="px-5 p-5 bg-dark">
                <div
                    className="container-fluid rounded-3"
                    style={{
                        backgroundImage: `url('/logo/awardbanner.png')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "1px solid #ffa500"
                    }}>
                    <div className="row"> 
                        <div className="col-sm-6">
                            <section
                                className="my-5 ps-5 rounded text-start"

                            >
                                <h5 className="text-white mb-2">Recognised as</h5>
                                <h2 className="text-white fw-bold mb-3">
                                    MOST PROMISING UI/UX TRAINING INSTITUTES IN INDIA
                                </h2>
                                <img
                                    src="/logo/bgcounter.jpg"
                                    alt="Silicon India Award"
                                    className="img-fluid mb-3"
                                    style={{ maxHeight: "120px" }}
                                />
                                <div>
                                    <Button variant="warning" className="fw-bold px-4 py-2">
                                        Know More
                                    </Button>
                                </div>
                            </section>
                        </div>
                        <div className="col-sm-6"></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AwardBanner;