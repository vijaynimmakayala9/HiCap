import Header from "../Header/Header";
import PrivacyPolicy from "../OurDocuments/PrivacyandPolicy";
import Footer from "../Pages/Footer";

const PrivacyAndPolicies = () => {
  return (
    <>
      <Header />
      <div className="mt-[100px] px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Privacy & Policy
        </h1>
        <PrivacyPolicy />
      </div>
      <Footer />
    </>
  );
};

export default PrivacyAndPolicies;
