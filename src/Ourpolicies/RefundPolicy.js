import Header from "../Header/Header";
import RefundPolicy from "../OurDocuments/RefundPolicy";
import Footer from "../Pages/Footer";

const RefundPolicies = () => {
  return (
    <>
      <Header />
      <div className="mt-[100px] px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Refund Policy
        </h1>
        <RefundPolicy />
      </div>
      <Footer />
    </>
  );
};

export default RefundPolicies;
