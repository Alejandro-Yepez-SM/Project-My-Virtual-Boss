import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import logoIcon from "@assets/Icon-3_1766196510732.png";
import fullLogoImage from "@assets/Full_Brand_L_1766196510731.png";

export const PrivacyPolicy = () => {
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
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-neutral-600">
              Effective Date: September 24, 2025
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              Company: Flagler Village Group | Country: USA
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-700 mb-8">
              This Privacy Policy explains how My Virtual Boss ("we", "our",
              "us", or "the App") collects, uses, and protects your information.
              By using My Virtual Boss, you agree to the terms described in this
              Privacy Policy.
            </p>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-neutral-700 mb-4">
                We collect personal information that you provide when creating
                an account or using features inside the App, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address</li>
                <li>Email and password</li>
                <li>
                  Data you enter into CRM tools, calculators, goals, income
                  tracking, and training modules
                </li>
                <li>
                  Subscription and purchase information from the Apple App Store
                  or Google Play Store
                </li>
              </ul>
              <p className="text-neutral-700 mt-4">
                We do not knowingly collect personal information from children
                under 13 years of age.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-neutral-700 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>Create and maintain your account</li>
                <li>Provide customer support</li>
                <li>Ensure security and prevent unauthorized access</li>
                <li>Comply with legal requirements</li>
                <li>
                  Analyze usage trends to improve app performance and features
                </li>
                <li>Send updates, notifications, or support communications</li>
                <li>
                  Personalize your experience and deliver tailored content
                </li>
                <li>
                  Provide, maintain, and improve the functionality of My Virtual
                  Boss
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Payments and Subscriptions
              </h2>
              <p className="text-neutral-700 mb-4">
                All payments are processed through:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>Apple App Store</li>
                <li>Google Play Store</li>
              </ul>
              <p className="text-neutral-700 mt-4">
                We do not store full payment card details.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                4. Contact Information Usage
              </h2>
              <p className="text-neutral-700">
                We access your device's contact list only after you grant
                permission. When you choose to import a contact into your CRM
                account, the selected information (such as name, phone number,
                and email) may be uploaded to our servers with your consent. You
                can choose to save CRM records to your phone's contacts as well.
                No contact data is uploaded or shared without your explicit
                action and approval.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                5. How We Share Information
              </h2>
              <p className="text-neutral-700 mb-4">
                We do not sell or rent your personal information. We may share
                limited information only in these cases:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    With Service Providers:
                  </h3>
                  <p className="text-neutral-700">
                    Third-party tools (such as hosting, analytics, or payment
                    providers) that help us operate the app.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    For Legal Reasons:
                  </h3>
                  <p className="text-neutral-700">
                    If required by law, regulation, or valid legal process.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Business Transfers:
                  </h3>
                  <p className="text-neutral-700">
                    In the event of a merger, acquisition, or sale of assets.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Data Security
              </h2>
              <p className="text-neutral-700">
                We implement reasonable technical and organizational safeguards
                to protect your data from unauthorized access, disclosure, or
                misuse. However, no system is 100% secure, and we cannot
                guarantee complete security.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                7. Your Choices
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li>
                  You may update or correct your information in the app at any
                  time
                </li>
                <li>
                  You can opt out of marketing emails by clicking "unsubscribe"
                </li>
                <li>
                  You may request deletion of your account and associated data
                  by contacting us
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                8. Third-Party Links & Services
              </h2>
              <p className="text-neutral-700">
                My Virtual Boss may contain links to third-party websites or
                services. We are not responsible for the privacy practices of
                those third parties.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                9. International Users
              </h2>
              <p className="text-neutral-700">
                If you access My Virtual Boss outside the United States, your
                information may be transferred and stored on servers located in
                the U.S. By using the app, you consent to this transfer.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-neutral-700">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated "Effective Date."
              </p>
            </section>

            {/* Section 11 - Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                11. Contact Us
              </h2>
              <p className="text-neutral-700 mb-4">
                If you have any questions about this Privacy Policy, please
                contact us:
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
