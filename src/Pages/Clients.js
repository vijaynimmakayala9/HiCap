import AboutMagnitia from "./AboutMagnitia";
import Footer from "./Footer";
import Header from "./Header";
import IndustryExperts from "./IndustryExperts";

const Clients = ()=>{
    return (
        <>
        <Header/>
        <div className="mt-5">
        <AboutMagnitia/>
        <IndustryExperts/>
        </div>
        <Footer/>
        </>

    )
}

export default Clients;