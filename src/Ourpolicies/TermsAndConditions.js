import Header from "../Header/Header";
import TermsOfUse from "../OurDocuments/TermsandConditions";
import Footer from "../Pages/Footer";

const Terms = () => {
  return (
    <>
      <Header />
      <div className="mt-[100px] px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Terms And Conditions
        </h1>
        <TermsOfUse />
      </div>
      <Footer />
    </>
  );
};

export default Terms;
