import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Heading */}
        <header className="mb-8">
          
          <p className="text-sm text-gray-500">
            Effective Date: 20th September 2025
          </p>
        </header>

        {/* Content */}
        <main className="space-y-8">
          {/* Intro */}
          <section id="intro" className="space-y-3">
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              This Refund Policy (“Policy”) governs all payments made to
              <strong>Techsterker</strong>, a brand owned and operated by <strong>Hicap Edtech Private
              Limited</strong> (“Company,” “we,” “our,” or “us”). This Policy applies to
              all users, students, and customers (“you,” “your,” or “student”)
              who purchase or subscribe to our courses, training programs, or
              related services (“Services”) through our Website, mobile
              application, or any other platform operated by the Company.
            </p>
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              By enrolling in any of our Services, you acknowledge and agree to
              this Refund Policy in its entirety.
            </p>
          </section>

          {/* General Rule */}
          <section id="general-rule" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              1. General Rule – No Refunds
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                All fees, charges, or payments made to Techsterker are <strong>final,
                non-refundable</strong>, and non-transferable, except as explicitly
                stated in this Policy.
              </li>
              <li>
                By purchasing our Services, you acknowledge that you are gaining
                access to digital content and/or live sessions which are
                delivered immediately upon confirmation of payment. You waive
                your right to cancellation and refund once access is provided.
              </li>
              <li>
                Refunds will not be provided for dissatisfaction with course
                content, lack of usage, inability to attend live sessions, or
                change of personal circumstances.
              </li>
            </ul>
          </section>

          {/* Limited Exceptions */}
          <section id="exceptions" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              2. Limited Exceptions
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Notwithstanding the above Refunds may be considered by the Company <strong>at its sole discretion</strong> under the following exceptional circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                <strong>Duplicate Payment:</strong> If you are accidentally
                charged more than once for the same course or transaction, the
                duplicate amount will be refunded after verification.
              </li>
              <li>
                <strong>Technical Failure on Our Part:</strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>
                    If you are unable to access purchased course content due to
                    a <strong>verified technical error directly attributable to the
                    Company</strong>, and
                  </li>
                  <li>
                    Our support team is unable to provide access within <strong>seven (7) business</strong> from notification, then you may request a
                    refund for the affected transaction.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Unauthorized Transaction:</strong> If payment is
                processed without your authorization (e.g., fraudulent use of
                your card), refunds will be issued subject to verification and
                compliance with applicable law.
              </li>
            </ul>
          </section>

          {/* Refund Request Procedure */}
          <section id="procedure" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              3. Refund Request Procedure
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              3.1. To request a refund under the limited exceptions above, you must:
              <li>
              Submit a written request by emailing <strong>info@techsterker.com</strong> within <strong>three (3) calendar days</strong> of the payment date.
              </li>
              <li>
                Provide transaction details (order ID, date of payment, mode of payment, amount, and screenshot of payment confirmation).
              </li>
              <li>Provide relevant supporting documents, if applicable.</li>
              3.2. Refund requests received after three (3) calendar days will not
                be entertained.
  
             3.3. All refund approvals are at the <strong>sole discretion of the Company</strong>,
                and our decision shall be final and binding.
            
            </ul>
          </section>

          {/* Processing of Refunds */}
          <section id="processing" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              4. Processing of Refunds
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                If approved, refunds will be initiated within <strong>fifteen (15) to
                twenty (20) business days</strong> from the date of approval.
              </li>
              <li>
                Refunds will only be made to the <strong>original payment method</strong> used
                during purchase. We are not responsible for delays caused by
                banks, payment gateways, or third-party service providers.
              </li>
              <li>
                Any transaction charges, currency conversion charges, or bank
                fees incurred during the refund process will be borne by the
                student and deducted from the refundable amount.
              </li>
            </ul>
          </section>

          {/* Non-Refundable Situations */}
          <section id="non-refundable" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              5. Non-Refundable Situations
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Change of mind or lack of interest after enrollment.</li>
              <li>
                Failure to meet system requirements (hardware, internet,
                software updates).
              </li>
              <li>
                Inability to complete the course within the stipulated duration.
              </li>
              <li>
                Absence from or non-participation in live classes or sessions.
              </li>
              <li>
                Termination of account due to violation of Terms of Use, Code of
                Conduct, or Intellectual Property Rights.
              </li>
              <li>
                Any case where course access was successfully granted and
                utilized, either fully or partially.
              </li>
            </ul>
          </section>

          {/* Modification of Policy */}
          <section id="modification" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              6. Modification of Policy
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                The Company reserves the right to amend, update, or modify this
                Refund Policy at any time without prior notice.
              </li>
              <li>
                The revised Policy will be published on our Website and shall be
                effective immediately upon posting.
              </li>
              <li>
                Continued use of our Services after such modifications
                constitutes acceptance of the updated Policy.
              </li>
            </ul>
          </section>

          {/* Governing Law */}
          <section id="law" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              7. Governing Law
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              This Refund Policy shall be governed by and construed in
              accordance with the laws of India. Any disputes arising out of or
              in relation to this Policy shall be resolved in accordance with
              the <strong>Governing Law & Dispute Resolution clause</strong> of our Terms of Use.
            </p>
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="bg-blue-50 border border-blue-100 rounded-lg p-5 space-y-2"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              8. Contact Us
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              If you have any questions or concerns regarding this Policy,
              please contact us:
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              <strong>Techsterker (Hicap Edtech Private Limited)</strong>
              <br />
              Email:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@techsterker.com&su=Enquiry%20for%20Refund%20Policies"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                info@techsterker.com
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:+919000207286"
                className="text-blue-600 hover:underline"
              >
                9000207286
              </a>
              <br />
              Address: D. No. 17-1742502, F. No. 502, Park Vista Apt, Ameenpur,
              Miyapur, Tirumalagiri, Hyderabad – 500049, Telangana
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 mt-10 gap-2">
          <div>Last updated: 20th September 2025</div>
        </footer>
      </div>
    </div>
  );
};

export default RefundPolicy;