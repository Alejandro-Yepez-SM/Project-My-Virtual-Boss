import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  Users,
  DollarSign,
  Target,
  CheckCircle,
  TrendingUp,
  Calendar,
  Phone,
  Calculator,
  Brain,
  MessageCircle,
  Home,
  FileText,
  Search,
  Globe,
  Zap,
  Award,
  Star,
  Shield,
  Clock,
  Sparkles,
  BarChart2,
  PieChart,
  GraduationCap,
  Handshake,
  UserCheck,
  Building2,
  Fingerprint,
  ScanFace,
  Smartphone,
  BadgeCheck,
  Timer,
  CreditCard,
} from "lucide-react";

import appMockupImage from "@assets/The_real_estate_failure_crisis_(5)_1766196325495.png";
import toolsImage from "@assets/Add_a_subheading_(4)_1766263684859.png";
import fullLogoImage from "@assets/Full_Brand_L_1766196510731.png";
import logoIcon from "@assets/Icon-3_1766196510732.png";
import openHousePartnerImage from "@assets/Add_a_subheading_(2)_1766240594977.png";
import rentalApp1 from "@assets/8_1766244353786.png";
import googlePlayBadge from "@assets/Untitled_design_(33)_1766268832902.png";
import appStoreBadge from "@assets/Untitled_design_(32)_1766268832903.png";
import promoVideo from "@assets/Attention_Real_Estate_Agents_(Video)_(1)_1766345918386.mp4";
import rentalApp2 from "@assets/11_1766244353788.png";
import rentalApp3 from "@assets/11_1766244353788.png";
import rentalApp4 from "@assets/10_1766244353788.png";

export const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const rentalAppImages = [
    {
      src: rentalApp1,
      alt: "Dashboard with Rent Application feature",
      label: "Start from Dashboard",
    },
    {
      src: rentalApp2,
      alt: "Personal Information form",
      label: "Simple Application",
    },
    {
      src: rentalApp3,
      alt: "Identity Verification with facial recognition",
      label: "ID Verification",
    },
    {
      src: rentalApp4,
      alt: "TransUnion Credit Report",
      label: "Credit Report",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % rentalAppImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    window.location.href = "/signin";
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
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#tools"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                Tools
              </a>
              <a
                href="#success-plan"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                Success Plan
              </a>
              <a
                href="#training"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                Training
              </a>
            </nav>
            <Button
              onClick={handleLogin}
              className="gradient-primary text-white font-medium"
              data-testid="button-get-started-header"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <Badge
              className="mb-6 gradient-primary text-white border-0 px-4 py-2"
              variant="secondary"
            >
              The #1 Productivity System for Real Estate Agents
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Build a
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Real Business.
              </span>
              <br />
              Become a
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {" "}
                Top Producer.
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Stop struggling and start succeeding. My Virtual Boss gives you
              the proven daily activities, professional tools, and
              accountability system that top-producing agents use to close
              <span className="font-semibold text-primary">
                {" "}
                50+ transactions per year
              </span>
              .
            </p>
            <div className="mb-6 max-w-md mx-auto">
              <video
                src={promoVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
            <p className="text-2xl font-bold text-neutral-900 mb-4 animate-pulse">
              Download it <span className="text-primary">NOW</span> for{" "}
              <span className="text-secondary">FREE</span>
            </p>
            <div className="flex flex-row gap-4 justify-center items-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.myvirtualboss.realestate"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
                data-testid="link-google-play"
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  className="h-14 rounded-lg"
                />
              </a>
              <a
                href="https://apps.apple.com/us/app/my-virtual-boss/id6752781766"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
                data-testid="link-app-store"
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-14 rounded-lg"
                />
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          {/* App Mockup Image */}
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-transparent to-transparent z-10 pointer-events-none"></div>
            <img
              src={appMockupImage}
              alt="My Virtual Boss App - Dashboard, Tasks, Tools, CRM views on mobile devices"
              className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/90 to-secondary text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why 87% of Real Estate Agents Fail in Their First 2 Years
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              It's not about working harder. It's about working smarter with a
              proven system.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Daily Structure</h3>
              <p className="text-white/80">
                Without a proven daily schedule, agents waste time on low-value
                activities instead of income-producing tasks.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Clear Goals</h3>
              <p className="text-white/80">
                Most agents don't know exactly what activities they need to do
                each week to hit their income targets.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No Follow-Up System
              </h3>
              <p className="text-white/80">
                Leads slip through the cracks without a proper CRM and automated
                follow-up reminders.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 text-white font-semibold bg-white/20 px-6 py-3 rounded-full mb-6">
              <Sparkles className="h-5 w-5" />
              <span>My Virtual Boss solves all of this</span>
            </div>
            <div className="flex flex-row gap-4 justify-center items-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.myvirtualboss.realestate"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
                data-testid="link-google-play-problem"
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  className="h-14 rounded-lg"
                />
              </a>
              <a
                href="https://apps.apple.com/us/app/my-virtual-boss/id6752781766"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
                data-testid="link-app-store-problem"
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-14 rounded-lg"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Action Plan Section */}
      <section
        id="success-plan"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-white to-secondary/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Data-Driven Success
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Your Personal Success Action Plan
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Know exactly what to do each week. Our Success Action Plan
              calculates your required weekly activities based on proven
              industry conversion metrics.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                We Do The Math For You
              </h3>
              <p className="text-lg text-neutral-600 mb-6">
                Tell us your income goal and average commission, and we'll
                calculate exactly how many conversations, contacts, business
                cards, and networking events you need each week.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">
                      Conversations Required
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      Based on 1,000 calls = 100 conversations = 5 appointments
                      = 1 transaction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">
                      Contacts to Add
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      100 new contacts in your CRM = 1 transaction within 12
                      months
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">
                      Business Cards
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      250 business cards distributed = 1 transaction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">
                      Networking Events
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      10 networking events = 1 transaction
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-neutral-900">
                  Your Weekly Action Plan
                </h4>
                <Badge className="bg-secondary/10 text-secondary">
                  $200K Goal
                </Badge>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">Conversations</span>
                    <span className="font-bold text-primary">42/week</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-3">
                    <div
                      className="bg-primary rounded-full h-3"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">New Contacts</span>
                    <span className="font-bold text-secondary">17/week</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-3">
                    <div
                      className="bg-secondary rounded-full h-3"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">Business Cards</span>
                    <span className="font-bold text-accent">42/week</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-3">
                    <div
                      className="bg-accent rounded-full h-3"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">Networking Events</span>
                    <span className="font-bold text-purple-600">2/week</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-3">
                    <div
                      className="bg-purple-500 rounded-full h-3"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">
                    Projected Result: 17 Transactions/Year
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Complete Business System
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Everything You Need to Build a Real Business
            </h2>
            <p className="text-xl text-neutral-600">
              Stop piecing together separate apps. Get one integrated system
              built for real estate success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover border-0 shadow-lg group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Daily Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Structured daily activities that top producers follow:
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Morning prospecting blocks
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    FSBO & expired listing calls
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Follow-up reminders
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Progress tracking & analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Users className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="text-xl">Advanced CRM System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Never lose a lead with smart contact management:
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Lead scoring & categorization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Automated follow-up reminders
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Contact history & notes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Pipeline management
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <DollarSign className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="text-xl">Income Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Complete financial visibility for your business:
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Commission tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Pending income management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Quarterly goal monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Income vs. activity correlation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Target className="h-7 w-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Goal Setting & SWOT</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Strategic planning for long-term success:
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    5-year & 1-year vision
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    SWOT analysis framework
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Mission & values definition
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Progress visualization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-200 transition-colors">
                  <BarChart2 className="h-7 w-7 text-cyan-600" />
                </div>
                <CardTitle className="text-xl">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Data-driven insights to optimize your business:
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Activity vs. income charts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Conversion rate tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Weekly performance reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Goal achievement alerts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
                  <Globe className="h-7 w-7 text-rose-600" />
                </div>
                <CardTitle className="text-xl">
                  Multi-Language Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-4">
                  Serve clients in their preferred language:
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    12 languages supported
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    RTL support for Arabic
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Locale-aware formatting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                    Easy language switching
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Tools Section with Image */}
      <section
        id="tools"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Professional Tools Suite
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              13+ Professional Calculators & Tools
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Impress clients and close more deals with professional-grade tools
              built right into your dashboard.
            </p>
          </div>

          {/* Tools Image */}
          <div className="mb-16">
            <img
              src={toolsImage}
              alt="My Virtual Boss Real Estate Tools - Professional calculators and analysis tools"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Income Analysis",
                icon: TrendingUp,
                color: "bg-blue-50 text-blue-600 border-blue-200",
              },
              {
                name: "Mortgage Calculator",
                icon: Calculator,
                color: "bg-cyan-50 text-cyan-600 border-cyan-200",
              },
              {
                name: "Prequalification Calculator",
                icon: Calculator,
                color: "bg-green-50 text-green-600 border-green-200",
              },
              {
                name: "Seller's Net Sheet",
                icon: DollarSign,
                color: "bg-emerald-50 text-emerald-600 border-emerald-200",
              },
              {
                name: "Closing Costs",
                icon: Home,
                color: "bg-amber-50 text-amber-600 border-amber-200",
              },
              {
                name: "Quick CMA",
                icon: BarChart2,
                color: "bg-purple-50 text-purple-600 border-purple-200",
              },
              {
                name: "Multi Family Investment Analysis Calculator",
                icon: PieChart,
                color: "bg-indigo-50 text-indigo-600 border-indigo-200",
              },
              {
                name: "DSCR Calculator",
                icon: Calculator,
                color: "bg-rose-50 text-rose-600 border-rose-200",
              },
              {
                name: "Expired Listing With Owner Contact Data",
                icon: Search,
                color: "bg-orange-50 text-orange-600 border-orange-200",
              },
              {
                name: "Foreclosures",
                icon: Home,
                color: "bg-red-50 text-red-600 border-red-200",
              },
              {
                name: "Property Owner Contact Data",
                icon: Users,
                color: "bg-teal-50 text-teal-600 border-teal-200",
              },
              {
                name: "Open House Listing Service",
                icon: Calendar,
                color: "bg-violet-50 text-violet-600 border-violet-200",
              },
            ].map((tool, index) => (
              <div
                key={index}
                className={`${tool.color} border rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow`}
              >
                <tool.icon className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">{tool.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-8 w-8" />
              <h3 className="text-2xl font-bold">AI Role Play Training</h3>
              <Badge className="bg-white/20 text-white border-white/30">
                Powered by AI
              </Badge>
            </div>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
              Practice handling pricing objections, timing concerns, FSBO
              conversations, and more with realistic AI-powered client
              scenarios. Build confidence before every client interaction.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Pricing Objections",
                "Timing Concerns",
                "FSBO Objections",
                "Loyalty Issues",
                "Market Knowledge",
              ].map((scenario, i) => (
                <Badge
                  key={i}
                  className="bg-white/10 text-white border-white/20"
                >
                  {scenario}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Open House Partner System Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet-100 text-violet-700 border-violet-200">
              First-of-its-Kind
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              The Revolutionary Open House Partner System
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Turn Every Listing Into an Opportunity — For You and Other Agents
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-neutral-700 mb-6">
                My Virtual Boss introduces a first-of-its-kind{" "}
                <span className="font-semibold text-violet-700">
                  Open House Listing Service
                </span>{" "}
                that connects busy listing agents with motivated agents who want
                to host open houses.
              </p>
              <p className="text-neutral-600 mb-8">
                Listing agents can now post their listings, instantly alerting
                agents in their market who are ready to work. No more spending
                your entire weekend sitting in a property just to keep a seller
                happy — let another professional handle the hosting while you
                stay productive.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-lg border mb-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-violet-600" />
                  For the Hosting Agent, It's a Complete Win:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">
                      A chance to sell the listing and earn commission
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">
                      A high-traffic environment to meet active buyers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">
                      Instant access to quality buyer leads
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">
                      A simple request → approval workflow inside the app
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Handshake className="h-5 w-5" />
                  My Virtual Boss Makes It Effortless
                </h3>
                <p className="text-white/90 mb-4">
                  Post your listing. Approve a host. Get the open house covered.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-white/30">
                    One System
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    Zero Friction
                  </Badge>
                </div>
              </div>
            </div>

            <div className="relative lg:scale-110 lg:translate-x-8">
              <img
                src={openHousePartnerImage}
                alt="Open House Partner System - Create listings, request time slots, and manage approvals"
                className="w-full max-w-2xl mx-auto rounded-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">
                      More Closings
                    </div>
                    <div className="text-xs text-neutral-500">
                      Agents winning together
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Rental Application Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
              Powered by TransUnion & Incode
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Enhanced Rental Application & Tenant Screening
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Industry-leading ID verification and facial recognition technology
              to protect you from identity theft and fraud
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Animated Carousel */}
            <div className="relative order-2 lg:order-1">
              <div className="relative h-[900px] flex items-center justify-center">
                {rentalAppImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 scale-100 z-10"
                        : index === (currentSlide + 1) % rentalAppImages.length
                        ? "opacity-40 scale-90 translate-x-40 z-0"
                        : index ===
                          (currentSlide - 1 + rentalAppImages.length) %
                            rentalAppImages.length
                        ? "opacity-40 scale-90 -translate-x-40 z-0"
                        : "opacity-0 scale-75 z-0"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-[850px] w-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-3 mt-4">
                {rentalAppImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 h-2 bg-emerald-600 rounded-full"
                        : "w-2 h-2 bg-emerald-300 rounded-full hover:bg-emerald-400"
                    }`}
                    data-testid={`carousel-indicator-${index}`}
                  />
                ))}
              </div>
              <div className="text-center mt-2">
                <span className="text-sm font-medium text-emerald-700">
                  {rentalAppImages[currentSlide].label}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      100% App-Based Experience
                    </h3>
                    <p className="text-neutral-600">
                      Unlike competitors that require a computer and a lengthy
                      process, everything works seamlessly right from your phone
                      with just a couple of clicks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ScanFace className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      Facial Recognition Technology
                    </h3>
                    <p className="text-neutral-600">
                      Advanced biometric verification powered by Incode matches
                      the applicant's selfie with their government-issued ID to
                      prevent identity fraud.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Fingerprint className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      ID Verification & Fraud Detection
                    </h3>
                    <p className="text-neutral-600">
                      Multi-layer security checks verify document authenticity
                      and detect tampering, dramatically reducing the
                      possibilities of identity theft.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Timer className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      Complete in Under a Minute
                    </h3>
                    <p className="text-neutral-600">
                      The entire screening process is handled right from the
                      palm of your hand within a minute. Fast, secure, and
                      hassle-free.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-5 w-5" />
                      <span className="font-bold text-lg">
                        Zero Cost to You
                      </span>
                    </div>
                    <p className="text-white/90 text-sm">
                      Tenant pays only{" "}
                      <span className="font-bold text-xl">$39.99</span> — you
                      don't spend a penny
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-8 w-8" />
                    <div className="text-right">
                      <div className="text-sm text-white/80">Powered by</div>
                      <div className="font-bold">TransUnion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Continuous Learning
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                Training Center for Top Producers
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                Access proven scripts, strategies, and training content from
                successful real estate professionals. Track your progress and
                build skills that close deals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">
                      Scripts & Dialogues
                    </h4>
                    <p className="text-sm text-neutral-600">
                      Proven scripts for every situation
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                  <MessageCircle className="h-8 w-8 text-secondary" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">
                      Objection Handling
                    </h4>
                    <p className="text-sm text-neutral-600">
                      Master every objection with confidence
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                  <Award className="h-8 w-8 text-accent" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">
                      Progress Tracking
                    </h4>
                    <p className="text-sm text-neutral-600">
                      Track completion and earn achievements
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <div className="space-y-4">
                  {[
                    {
                      title: "Cold Calling Mastery",
                      progress: 75,
                      color: "bg-primary",
                    },
                    {
                      title: "Listing Presentations",
                      progress: 60,
                      color: "bg-secondary",
                    },
                    {
                      title: "Negotiation Skills",
                      progress: 45,
                      color: "bg-accent",
                    },
                    {
                      title: "Client Follow-Up",
                      progress: 90,
                      color: "bg-purple-500",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-neutral-900">
                          {item.title}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {item.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-2">
                        <div
                          className={`${item.color} rounded-full h-2 transition-all`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Proven Industry Conversion Metrics
            </h2>
            <p className="text-lg text-neutral-600">
              These are the numbers that top producers live by
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">1:10</div>
                <p className="text-sm font-semibold text-neutral-900 mb-1">
                  Past Clients
                </p>
                <p className="text-xs text-neutral-500">
                  1 in 10 past clients will refer you
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-secondary mb-2">
                  1:100
                </div>
                <p className="text-sm font-semibold text-neutral-900 mb-1">
                  CRM Contacts
                </p>
                <p className="text-xs text-neutral-500">
                  100 contacts = 1 transaction
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">1:250</div>
                <p className="text-sm font-semibold text-neutral-900 mb-1">
                  Business Cards
                </p>
                <p className="text-xs text-neutral-500">
                  250 cards = 1 transaction
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  1:10
                </div>
                <p className="text-sm font-semibold text-neutral-900 mb-1">
                  Network Events
                </p>
                <p className="text-xs text-neutral-500">
                  10 events = 1 transaction
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Onboarding Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Personalized Setup
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Start With a Personalized Success Plan
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our guided onboarding helps you define your vision, analyze your
              strengths, and create a customized action plan.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: 1, title: "Preferences", desc: "Location & language" },
              {
                step: 2,
                title: "Vision Setting",
                desc: "5-year & 1-year goals",
              },
              {
                step: 3,
                title: "Mission & Values",
                desc: "Your core principles",
              },
              { step: 4, title: "Motivation", desc: "What drives you" },
              {
                step: 5,
                title: "SWOT Analysis",
                desc: "Strengths & opportunities",
              },
              { step: 6, title: "Financial Goals", desc: "Income targets" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold text-neutral-900 text-sm mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 text-secondary">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">
              Join Thousands of Successful Agents
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
            Ready to Build Your
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Real Estate Empire?
            </span>
          </h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Stop winging it and start winning. Get the proven system that
            transforms struggling agents into top producers.
          </p>
          <Button
            onClick={handleLogin}
            size="lg"
            className="gradient-primary text-white px-10 py-5 text-xl font-semibold shadow-lg hover:shadow-xl transition-all animate-pulse hover:animate-none hover:scale-105"
            data-testid="button-start-free"
          >
            Start Free and Download it Today
          </Button>
          <div className="flex justify-center items-center gap-6 mt-6">
            <a
              href="https://apps.apple.com/us/app/my-virtual-boss/id6752781766"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
              data-testid="link-app-store-footer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-16"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.myvirtualboss.realestate"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
              data-testid="link-google-play-footer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-16"
              />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>No Credit Card Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <img src={fullLogoImage} alt="My Virtual Boss" className="h-12" />
            </div>
            <p className="text-neutral-400 text-center">
              Built for real estate professionals who are serious about success
            </p>
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
