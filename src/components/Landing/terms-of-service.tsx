import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import logoIcon from "@assets/Icon-3_1766196510732.png";
import fullLogoImage from "@assets/Full_Brand_L_1766196510731.png";

export const TermsOfService = () => {
  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={logoIcon} alt="My Virtual Boss" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-neutral-900">
                  My Virtual Boss
                </h1>
                <p className="text-xs text-neutral-500">Real Estate Edition</p>
              </div>
            </div>
            <Button
              onClick={handleBack}
              variant="outline"
              className="font-medium"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-neutral-600">
              Effective Date: September 24, 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-700 mb-8">
              Welcome to My Virtual Boss ("we," "our," or "us"). These Terms of
              Service ("Terms") govern your access to and use of the My Virtual
              Boss mobile application and website (collectively, the "Service").
              By using the Service, you agree to these Terms. If you do not
              agree, do not use the Service.
            </p>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Eligibility
              </h2>
              <p className="text-neutral-700">
                You must be at least 18 years old, or the age of majority in
                your jurisdiction, to use My Virtual Boss. By using the Service,
                you represent that you meet this requirement.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                2. Use of the Service
              </h2>
              <p className="text-neutral-700 mb-4">
                You may use the Service solely for lawful purposes and in
                accordance with these Terms.
              </p>
              <p className="text-neutral-700 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>
                  Use the Service in any way that violates laws or regulations
                </li>
                <li>
                  Attempt to gain unauthorized access to the Service or our
                  systems
                </li>
                <li>
                  Copy, modify, or distribute the Service without permission
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Accounts
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>
                  You are responsible for maintaining the confidentiality of
                  your login credentials
                </li>
                <li>
                  You are responsible for all activities that occur under your
                  account
                </li>
                <li>
                  Notify us immediately if you suspect unauthorized access to
                  your account
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                4. Subscriptions & Payments
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>
                  Some features of the Service may require payment or
                  subscription
                </li>
                <li>
                  All fees are disclosed prior to purchase and are
                  non-refundable except as required by law
                </li>
                <li>
                  We may update pricing, features, or subscription terms, with
                  notice provided to you
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-neutral-700 mb-4">
                The Service, including all content, features, logos, and
                technology, is owned by My Virtual Boss and protected by
                copyright, trademark, and other laws.
              </p>
              <p className="text-neutral-700">
                You are granted a limited, non-exclusive, non-transferable
                license to use the Service for personal business purposes only.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Third-Party Services
              </h2>
              <p className="text-neutral-700">
                The Service may include links to or integrations with
                third-party tools (such as CRMs, analytics, or payment
                providers). We are not responsible for the content, services, or
                practices of third parties.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                7. Termination
              </h2>
              <p className="text-neutral-700">
                We may suspend or terminate your access to the Service at any
                time, without notice, if you violate these Terms. Upon
                termination, your right to use the Service immediately ends.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                8. Disclaimer of Warranties
              </h2>
              <p className="text-neutral-700">
                The Service is provided "as is" and "as available." We make no
                warranties, express or implied, regarding the Service, including
                fitness for a particular purpose, availability, or accuracy.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-neutral-700">
                To the maximum extent permitted by law, My Virtual Boss is not
                liable for any indirect, incidental, or consequential damages
                arising from your use of the Service.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                10. Indemnification
              </h2>
              <p className="text-neutral-700">
                You agree to indemnify and hold harmless My Virtual Boss, its
                affiliates, and employees from any claims, damages, or expenses
                arising out of your use of the Service or violation of these
                Terms.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                11. Changes to the Terms
              </h2>
              <p className="text-neutral-700">
                We may update these Terms at any time. Changes will be posted
                with an updated "Effective Date." Continued use of the Service
                after updates means you accept the revised Terms.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                12. Governing Law
              </h2>
              <p className="text-neutral-700">
                These Terms shall be governed by the laws of the State of
                Florida, without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Section 13 - Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                13. Contact Us
              </h2>
              <p className="text-neutral-700 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-neutral-50 rounded-lg p-6 border">
                <p className="font-semibold text-neutral-900 mb-2">
                  My Virtual Boss
                </p>
                <p className="text-neutral-700">
                  Email:{" "}
                  <a
                    href="mailto:robert@myvirtualboss.com"
                    className="text-primary hover:underline"
                  >
                    robert@myvirtualboss.com
                  </a>
                </p>
                <p className="text-neutral-700">
                  Phone:{" "}
                  <a
                    href="tel:954-732-1359"
                    className="text-primary hover:underline"
                  >
                    954-732-1359
                  </a>
                </p>
                <p className="text-neutral-700">
                  Address: 701 NW 5th Avenue, Suite 1140, Fort Lauderdale, FL
                  33311
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer with Legal Links */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center space-x-4">
              <img src={fullLogoImage} alt="My Virtual Boss" className="h-12" />
            </div>
            <p className="text-neutral-400 text-center">
              Built for real estate professionals who are serious about success
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a
                href="/privacy-policy"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-neutral-600">•</span>
              <a
                href="/terms-of-service"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>

            <div className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} My Virtual Boss. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
