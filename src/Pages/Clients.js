import AboutTechsterker from "./AboutTerchsterker";
import Footer from "./Footer";
import Header from "./Header";
import ClientScroller from "../components/Client Scroller";

const Clients = ()=>{
    return (
        <>
        <Header/>
        <div className="mt-5">
        <AboutTechsterker/>
        <ClientScroller/>
        </div>
        <Footer/>
        </>

    )
}

export default Clients;