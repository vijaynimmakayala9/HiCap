import React from "react";

const CookiePolicy = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col">
        
        {/* Page Title */}
        <header className="mb-6">
          
          <p className="text-gray-500 text-sm mt-1">
            Effective Date: 20th September 2025
          </p>
        </header>

        {/* Main content (no overflow scroll) */}
        <main className="space-y-8 flex-1">
          {/* Intro */}
          <section id="intro" className="space-y-2">
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              This Cookie Policy explains how <strong>Techsterker</strong> (“we,” “our,” “us”), a
              brand owned and operated by Hicap Edtech Private Limited, uses
              cookies and similar technologies on our Website{" "}
              <a
                href="www.techsterker.com"
                className="text-blue-600 hover:underline"
              >
                www.techsterker.com
              </a>.
            </p>
          </section>

          {/* What Are Cookies */}
          <section id="what-are-cookies" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              1. What Are Cookies?
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Cookies are small text files placed on your browser or device when
              you visit our Website. They help us remember your preferences,
              enable secure login, and improve user experience.
            </p>
          </section>

          {/* Types of Cookies */}
          <section id="types" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              2. Types of Cookies We Use
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                <strong>Strictly Necessary Cookies:</strong> Essential for
                Website functionality, such as enabling login sessions, account
                management, and security features.
              </li>
              <li>
                <strong>Performance Cookies:</strong> Collect anonymous data on
                how users interact with the Website (e.g., page visits, errors)
                to improve performance.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember user preferences
                such as language, course settings, and saved login options.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand Website
                usage trends (e.g., Google Analytics) to improve services.
              </li>
            </ul>
            <p className="text-gray-700 text-base leading-relaxed">
              We do not use cookies to store passwords or sensitive academic
              data.
            </p>
          </section>

          {/* Third-Party Cookies */}
          <section id="third-party" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              3. Third-Party Cookies
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Certain trusted third parties may set cookies on our Website,
              including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Analytics providers</strong> (e.g., Google Analytics).</li>
              <li>
                <strong>Payment gateways </strong>(for fraud prevention and secure processing).
              </li>
              <li>
                <strong>Learning platforms or communication tools</strong> (for interactive
                features).
              </li>
            </ul>
            <p className="text-gray-700 text-base leading-relaxed">
              These cookies are governed by their own privacy and cookie
              policies.
            </p>
          </section>

          {/* How We Use Cookies */}
          <section id="use" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              4. How We Use Cookies
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Enable secure login and account access.</li>
              <li>Track learning progress and improve service functionality.</li>
              <li>Measure Website performance and troubleshoot errors.</li>
              <li>Provide a personalized user experience.</li>
              <li>Support compliance and fraud prevention.</li>
            </ol>
          </section>

          {/* Managing Cookies */}
          <section id="managing" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              5. Managing Cookies
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              You may manage or disable cookies in your browser settings. Please
              note:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Disabling <strong>strictly necessary cookies</strong> may prevent you from
                logging in or accessing courses.
              </li>
              <li>
                Other cookies (analytics, performance, functional) can be
                refused without impacting essential Website access.
              </li>
            </ul>
            <p className="text-gray-700 text-base leading-relaxed">
              For step-by-step browser instructions, see your browser’s help
              section.
            </p>
          </section>

          {/* Updates */}
          <section id="updates" className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              6. Updates to This Policy
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              We may revise this Cookie Policy from time to time. Changes will
              be updated here with a new effective date.
            </p>
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="bg-blue-50 border border-blue-100 rounded-lg p-5 space-y-2"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              7. Contact Us
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              For questions about cookies or this Cookie Policy, contact us at:
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              <strong>Hicap Edtech Private Limited</strong>
              <br />
              Email:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@techsterker.com&su=Enquiry%20for%20Cookie%20and%20Policies"
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
        <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 mt-6 gap-2">
          <div>Last updated: 20th September 2025</div>
        </footer>
      </div>
    </div>
  );
};

export default CookiePolicy;