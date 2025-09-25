import Header from "../Header/Header";
import CookiePolicy from "../OurDocuments/CookiePolicy";
import Footer from "../Pages/Footer";

const CookiePolicies = () => {
  return (
    <>
      <Header />
      <div className="mt-[100px] px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Cookie Policy
        </h1>
        <CookiePolicy />
      </div>
      <Footer />
    </>
  );
};

export default CookiePolicies;
