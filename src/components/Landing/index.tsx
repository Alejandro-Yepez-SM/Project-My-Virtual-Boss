import { Button } from "@/components/ui/button";

import heroSecondaryImage from "@assets/01_Main-2 1.png";
import fullLogoImage from "@assets/Full_Brand_L_1766196510731.png";
import agentProfessionalImage from "@assets/agent-professional.png";
import handsKeysImage from "@assets/hands-keys.png";
import applePlayImage from "@assets/Apple-Play1.png";
import addTaskIcon from "@assets/add_task.png";
import groupSearchIcon from "@assets/group_search.png";
import handshakeIcon from "@assets/handshake.png";
import tableChartIcon from "@assets/table_chart_view.png";

// One Membership Section Cards
import cardContactsImage from "@assets/new-contacts.png";
import cardRentApplicationsImage from "@assets/rent-applications.png";
import cardFSBOImage from "@assets/50 fsbo.png";
import cardProgressImage from "@assets/q1-progress.png";
import cardLoanImage from "@assets/loan prequalification.png";
import cardMortgageImage from "@assets/mortgage-calculator.png";
import vector1Image from "@assets/Vector 1.png";
import vector2Image from "@assets/Vector 2.png";
import vector3Image from "@assets/Vector 3.png";
import mercedesImage from "@assets/mercedes.png";
import group23Image from "@assets/Group 23.png";

export const Landing = () => {
  const handleGetAccess = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="bg-gradient-to-br from-blue-50/50 via-white to-blue-50/80 py-8">
        <div className="w-full px-4 sm:px-15">
          <div className="flex justify-between items-center gap-8">
            <img src={fullLogoImage} alt="My Virtual Boss" className="h-24 transition-transform duration-300 hover:scale-105" />
            <Button
              onClick={handleGetAccess}
              className="bg-[#0f62e3] hover:bg-[#0c4fb5] text-white font-bold rounded-full px-8 py-6 text-lg shadow-[0_10px_30px_rgba(15,98,227,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_40px_rgba(15,98,227,0.45)] active:scale-95"
              data-testid="button-get-annual-access-header"
            >
              Get Annual Access
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-6 lg:px-8  from-blue-50/50 via-white to-blue-50/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="font-[Montserrat]">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem]  mb-6 leading-[1.1] text-[#0F3260]">
                Start Your Real Estate
                
                Business With
                <br></br>
                <span className="text-[#0F3260] font-bold">Confidence</span>
              </h1>
              <p className="text-xl text-[#0F3260] mb-10 font-ligth leading-relaxed">
                Daily guidance, built-in tools, and simple systems to help
                <br className="hidden sm:block" />
                you stay organized, take action, and grow faster.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#8fc0ff]/40 blur-3xl -z-10 pointer-events-none" />
                  <div className="relative rounded-full p-[2px] bg-[linear-gradient(135deg,#9ed4ff,#3d8dff,#0a56d6)] shadow-[0_18px_45px_rgba(16,86,214,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_25px_60px_rgba(16,86,214,0.5)]">
                    <Button
                      onClick={handleGetAccess}
                      className="rounded-full bg-white px-9 py-6 text-[22px] text-xl font-bold tracking-tight text-[#0f67d5] hover:bg-white focus-visible:ring-transparent transition-all duration-300 active:scale-95"
                      data-testid="button-get-annual-access-hero font-bold"
                    >
                      Get Annual Access
                    </Button>
                  </div>
                </div>
                <p className="text-base text-[#1f2d4a] italic font-medium">
                  Built for new and motivated
                  <br />
                  real estate agents
                </p>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Hands with keys image - behind and larger */}
                <img
                  src={handsKeysImage}
                  alt="Hands exchanging keys"
                  className="absolute -top-20 -right-78 w-96 sm:w-[450px] lg:w-[500px] rounded-[32px] z-0 transition-transform duration-500 hover:scale-105"
                />
                {/* Agent professional image - front */}
                <img
                  src={agentProfessionalImage}
                  alt="Real Estate Professional"
                  className="relative w-full rounded-[32px] z-10 transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className=" px-6 lg:px-8 relative">
        {/* Image protruding above */}
        <div className="flex justify-center mb-[-320px] relative z-20">
          <img
            src={applePlayImage}
            alt="App Dashboard Features"
            className="w-[550px] h-auto transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className="bg-gradient-to-b from-[#30258B] to-[#6062EB] text-white rounded-[40px] relative overflow-hidden pt-[305px] pb-16 px-8">
          {/* Decorative curved lines - white arcs on edges */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] border-[14px] !border-white rounded-full -translate-y-1/2 translate-x-[55%]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] border-[14px] !border-white rounded-full translate-y-[-47%] -translate-x-[84%]"></div>

          <div className="max-w-6xl mx-auto relative z-10">

          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-regular mb-2">
              Everything You Need.
            </h2>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="text-white/90">Nothing You Don't.</span>
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#7B79E8]/40 backdrop-blur-sm rounded-[53px] p-10 hover:bg-[#7B79E8]/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                  <img src={addTaskIcon} alt="Daily Tasks" className="h-10 w-10 transition-transform duration-300 hover:scale-110 hover:rotate-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-3 leading-tight pb-0.5">
                    Daily Tasks That Tell You Exactly What to Do
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    Stay focused with step-by-step actions designed by experienced brokers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#7B79E8]/40 backdrop-blur-sm rounded-[53px] p-10 hover:bg-[#7B79E8]/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center ">
                <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                  <img src={groupSearchIcon} alt="All Your Leads" className="h-10 w-10 transition-transform duration-300 hover:scale-110 hover:rotate-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-3 leading-tight">
                    All Your Leads in One Place
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    Organize clients, track follow-ups, and never lose momentum.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#7B79E8]/40 backdrop-blur-sm rounded-[53px] p-10 hover:bg-[#7B79E8]/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center ">
                <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                  <img src={handshakeIcon} alt="Built-In Tools" className="h-10 w-10 transition-transform duration-300 hover:scale-110 hover:rotate-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-3 leading-tight">
                    Built-In Tools to Close Deals Faster
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    Calculators, applications, and resources—ready when you need them.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#7B79E8]/40 backdrop-blur-sm rounded-[53px] p-10 hover:bg-[#7B79E8]/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center ">
                <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                  <img src={tableChartIcon} alt="Progress Tracking" className="h-10 w-10 transition-transform duration-300 hover:scale-110 hover:rotate-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-3 leading-tight">
                    Progress Tracking & Accountability
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    Build consistency, stay motivated, and turn daily action into revenue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Built for Agents Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50/40 via-blue-50/20 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-normal text-[#0F3260] leading-tight">
              Built for Agents Who Are <br />Serious <span className="font-bold text-[#0F3260]">About Growth</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side - Purple container with phone mockup */}
          <div className="relative w-full lg:w-1/2 flex items-center justify-center">
            {/* Purple background container - smaller than phone */}
            <div className="bg-gradient-to-b from-[#30258B] to-[#6062EB] rounded-r-[40px] absolute inset-y-33 left-0 right-8 overflow-hidden">
              {/* Diagonal curved line from bottom-left to top-right */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 0 105 Q 15 70, 50 50 Q 85 30, 100 -5"
                  stroke="rgba(255,255,255,1)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Phone mockup - overlaps the purple container, centered */}
            <div className="relative z-20 py-8 flex justify-center">
              <img
                src={heroSecondaryImage}
                alt="App Tools Screen"
                className="w-[320px] h-auto mx-auto transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-1/2 px-6 lg:px-0">
            <h3 className="text-3xl lg:text-2xl text-[#0F3260] mb-10">
              Perfect for:
            </h3>
            <ul className="space-y-5 mb-5">
              <li className="flex items-start gap-5">
                <span className="text-[#0F3260] mt-1 text-3xl">•</span>
                <p className="text-lg lg:text-2xl text-[#0F3260] leading-relaxed">
                  New and early-stage real estate agents
                </p>
              </li>
              <li className="flex items-start gap-5">
                <span className="text-[#0F3260] mt-1 text-3xl">•</span>
                <p className="text-lg lg:text-2xl text-[#0F3260] leading-relaxed">
                  Agents who want structure and accountability
                </p>
              </li>
              <li className="flex items-start gap-5">
                <span className="text-[#0F3260] mt-1 text-3xl">•</span>
                <p className="text-lg lg:text-2xl text-[#0F3260] leading-relaxed">
                  Professionals focused on real revenue growth
                </p>
              </li>
            </ul>
            <p className="text-lg lg:text-2xl text-[#6B7280] mb-15 leading-relaxed">
              Not for anyone looking for shortcuts <span className="font-bold text-[#0F3260]">without effort</span>.
            </p>
            <Button
              onClick={handleGetAccess}
              className="bg-white border border-[#0478EF] text-[#0478EF] hover:bg-[#0ea5e9] hover:text-white hover:border-[#0478EF] font-bold rounded-full px-12 py-6 text-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95"
              data-testid="button-get-annual-access-growth"
            >
              Get Annual Access
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Structured Effective Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-normal text-[#0F3260] mb-1">
              Simple. Structured.
            </h2>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0F3260]">
              Effective.
            </h2>
          </div>

          {/* Cards with connecting line */}
          <div className="relative mb-12 pt-6">
            {/* Connecting line - edge to edge behind cards */}
            <div className="absolute top-1/2 -left-[100vw] -right-[100vw] h-[1px] bg-[#30258B] hidden lg:block"></div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="relative flex justify-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-1 !border-[#30258B] rounded-full flex items-center justify-center z-20">
                  <span className="text-[#30258B]  text-xl">1</span>
                </div>
                <div className="bg-gradient-to-b from-[#30258B] to-[#6062EB] rounded-[24px] text-center w-full lg:w-[298px] h-[96px] relative z-10 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <p className="text-white  text-xl text-base whitespace-nowrap">Sign up for <br />annual access</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative flex justify-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-1 !border-[#6062EB] rounded-full flex items-center justify-center z-20">
                  <span className="text-[#30258B] text-xl">2</span>
                </div>
                <div className="bg-gradient-to-b from-[#30258B] to-[#6062EB] rounded-[24px] text-center w-full lg:w-[298px] h-[96px] relative z-10 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <p className="text-white  text-base text-xl whitespace-nowrap">Follow your <br />daily tasks</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative flex justify-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-1 !border-[#6062EB] rounded-full flex items-center justify-center z-20">
                  <span className="text-[#30258B] text-xl">3</span>
                </div>
                <div className="bg-gradient-to-b from-[#30258B] to-[#6062EB] rounded-[24px] text-center w-full lg:w-[298px] h-[96px] relative z-10 flex items-center justify-center px-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <p className="text-white text-xl text-base">Manage leads and <br />clients in one app</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative flex justify-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-1 !border-[#6062EB] rounded-full flex items-center justify-center z-20">
                  <span className="text-[#30258B] text-xl">4</span>
                </div>
                <div className="bg-gradient-to-b from-[#30258B] to-[#6062EB] rounded-[24px] text-center w-full lg:w-[298px] h-[96px] relative z-10 flex items-center justify-center px-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <p className="text-white text-xl text-base">Track progress and <br /> grow your income</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[#0F3260] text-lg mb-6">
            No guesswork. Just action.
          </p>
          <div className="text-center">
            <Button
              onClick={handleGetAccess}
              className="bg-white border border-[#0478EF] text-[#0478EF] hover:bg-[#0ea5e9] hover:text-white hover:border-[#0478EF] font-bold rounded-full px-12 py-6 text-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95"
              data-testid="button-get-annual-access-simple"
            >
              Get Annual Access
            </Button>
          </div>
        </div>
      </section>

      {/* One Membership Section */}
      <section className="py-30 mt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#30258B] to-[#6062EB] text-white relative overflow-visible min-h-[750px]">
        {/* Decorative curved lines - white arcs on edges */}
        {/* Vector curve top left */}
        <img src={vector2Image} alt="" className="absolute top-0 left-0 h-[650px] w-auto pointer-events-none" />
        {/* Vector curve bottom right */}
        <img src={vector3Image} alt="" className="absolute bottom-0 right-0 h-[800px] w-auto pointer-events-none" />

        {/* Floating app cards - sobresalen del contenedor */}
        {/* Top left - Rent Applications card */}
        <div className="absolute -top-15 left-[11%] w-[220px] z-30 hidden lg:block transform hover:scale-105 transition-transform duration-300 float-animation">
          <img src={cardRentApplicationsImage} alt="Rent Applications" className="w-full h-auto rounded-3xl" />
        </div>

        {/* Top right - Task card */}
        <div className="absolute top-10 right-[8%] w-[300px] z-30 hidden lg:block transform hover:scale-105 transition-transform duration-300 float-animation-slow float-delay-1">
          <img src={cardFSBOImage} alt="50 FSBO Cold Calls" className="w-full h-auto rounded-3xl" />
        </div>

        {/* Right side - Progress card */}
        <div className="absolute top-[27%] right-[3%] w-[170px] z-30 hidden lg:block transform hover:scale-105 transition-transform duration-300 float-animation-medium float-delay-2">
          <img src={cardProgressImage} alt="Q1 Progress" className="w-full h-auto rounded-3xl" />
        </div>

        {/* Left side - Contacts card */}
        <div className="absolute top-[43%] left-[-0.5%] w-[150px] z-30 hidden lg:block transform hover:scale-105 transition-transform duration-300 float-animation float-delay-3">
          <img src={cardContactsImage} alt="New Contacts" className="w-full h-auto rounded-1xl" />
        </div>

        {/* Bottom left - Loan card */}
        <div className="absolute bottom-7 left-[8%] w-[210px] z-30 hidden lg:block transform hover:scale-105 transition-transform duration-300 float-animation-slow float-delay-4">
          <img src={cardLoanImage} alt="Loan Prequalification" className="w-full h-auto rounded-3xl" />
        </div>

        {/* Bottom right - Mortgage card */}
        <div className="absolute -bottom-6 right-[6%] w-[230px] z-30 hidden lg:block transform hover:scale-105 transition-transform duration-300 float-animation-medium float-delay-5">
          <img src={cardMortgageImage} alt="Mortgage Calculator" className="w-full h-auto rounded-3xl" />
        </div>

        {/* Main content */}
        <div className="max-w-5xl mx-auto relative z-20 text-center py-20">
          <h2 className="text-4xl sm:text-6xl font-normal mb-1 leading-tight">
            One Membership. One System.
          </h2>
          <h2 className="text-4xl sm:text-6xl font-bold mb-8 leading-tight">
            One Year to Win.
          </h2>
          
          <ul className="text-base text-white space-y-2 mb-8 max-w-2xl mx-auto">
            <li className="flex items-center justify-center gap-2">
              <span className="text-white/70 text-2xl">•</span>
              <span className="text-xl">Full access to the daily task system</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="text-white/70 text-2xl">•</span>
              <span className="text-xl">Built-in CRM and follow-up tracking</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="text-white/70 text-2xl">•</span>
              <span className="text-xl">Professional real estate tools</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="text-white/70 text-2xl">•</span>
              <span className="text-xl">Progress tracking and accountability</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="text-white/70 text-2xl">•</span>
              <span className="text-xl">Entry into the Top Producer Mercedes Challenge</span>
            </li>
          </ul>

          <div className="relative inline-block">
            {/* Blur azul detrás del botón */}
            <div className="absolute -inset-3 bg-[#0478EF]/30 blur-2xl -z-10 pointer-events-none rounded-full"></div>
            <Button
              onClick={handleGetAccess}
              className="bg-white border border-[#0478EF] text-[#0478EF] hover:bg-[#0ea5e9] hover:text-white hover:border-[#0478EF] font-bold rounded-full px-5 py-5 text-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95"
              data-testid="button-get-annual-access-membership"
            >
              Get Annual Access
            </Button>
          </div>
        </div>
      </section>

      {/* High Level Rewards Section */}
      <section className="py-40 bg-white relative">
        <div className="flex flex-col lg:flex-row gap-0 items-center">
          {/* Left side - Content */}
          <div className="w-full lg:w-1/2 px-6 lg:pl-[2%] flex flex-col justify-center">
            <h2 className="text-4xl sm:text-[55px] font-normal text-[#0F3260] mb-12 leading-tight">
              Perform at a High Level.
              <br />
              <span className="font-bold text-[#0F3260]">Be Rewarded.</span>
            </h2>
            <p className="text-xl text-[#0F3260] mb-8">
              Every annual member is automatically entered into
              <br />
              the Top Producer Challenge.
            </p>
            <p className="text-[#0F3260] text-xl mb-8 leading-relaxed">
              The agent with the highest recorded revenue for the
              <br />
              year wins a <span className="font-semibold">FREE Mercedes</span>.
            </p>
            <p className="text-[#0F3260] text-xl mb-8 leading-relaxed">
              Because real results deserve real rewards.
            </p>
            <Button
              onClick={handleGetAccess}
              className="bg-white border border-[#0478EF] text-[#0478EF] hover:bg-[#0ea5e9] hover:text-white hover:border-[#0478EF] font-bold rounded-full px-10 py-5 text-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 max-w-[300px] hover:scale-105 hover:-translate-y-1 active:scale-95"
              data-testid="button-get-annual-access-rewards"
            >
              Get Annual Access
            </Button>
          </div>

          {/* Right side - Mercedes image stuck to right edge of screen */}
          <div className="w-full lg:w-1/2 hidden lg:block">
            <img
              src={mercedesImage}
              alt="Mercedes-Benz E-Class Reward"
              className="w-full max-h-[650px] transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Not Ready Yet Section */}
      <section className=" pb-0 bg-white relative">
        <div className="flex flex-col lg:flex-row gap-0 items-center">
          {/* Left side - App image stuck to left edge and bottom */}
          <div className="w-full lg:w-1/2 hidden lg:flex items-end">
            <img
              src={group23Image}
              alt="App in hand"
              className="w-full max-h-[927px] h-auto transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-1/2 px-6 lg:pl-[2%] flex flex-col justify-center">
            <h2 className="text-4xl sm:text-[55px] font-normal text-[#0F3260] mb-12 leading-tight">
              Not Ready Yet?
              <br />
              <span className="font-bold text-[#0F3260]">Start for Free.</span>
            </h2>
            <p className="text-xl text-[#0F3260] mb-8">
              Get a preview of how My Virtual Boss helps
              <br />
              agents stay focused and productive.
            </p>
            <p className="text-[#0F3260] text-xl mb-8 leading-relaxed">
              Download our FREE app and see how daily
              <br />
              structure can change the way you work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a
                href="https://apps.apple.com/us/app/my-virtual-boss/id6752781766"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="bg-white border border-[#0478EF] text-[#0478EF] hover:bg-[#0ea5e9] hover:text-white hover:border-[#0478EF] font-bold rounded-full px-10 py-5 text-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 max-w-[300px] hover:scale-105 hover:-translate-y-1 active:scale-95"
                >
                  Download now
                </Button>
              </a>
              <p className="text-sm text-[#0F3260] italic flex items-center mt-3">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>  

      {/* Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#30258B] to-[#6062EB] text-white relative overflow-hidden">
        {/* Decorative vector curve */}
        <img src={vector1Image} alt="" className="absolute -top-0 right-[0%] h-auto w-auto pointer-events-none  " />
        
        <div className="max-w-8xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-normal mb-8 leading-tight">
            Your Goals Deserve a System  <span className="font-bold">— and a Reward.</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take control of your real estate journey, stay
            <br />
            accountable, and compete for something bigger.
          </p>
          <Button
            onClick={handleGetAccess}
            className="bg-white text-[#0478EF] hover:bg-[#0ea5e9] hover:text-white font-bold rounded-full px-10 py-6 text-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95"
            data-testid="button-get-annual-access-today"
          >
            Get Annual Access Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full px-4 sm:px-15">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo - 327x153 */}
            <div>
              <img src={fullLogoImage} alt="My Virtual Boss" className="w-[327px] h-[153px] transition-transform duration-300 hover:scale-105" />
            </div>
            
            {/* Copyright and Tagline - text-left, 23px */}
            <div className="text-left">
              <p className="text-[#0F3260] font-bold text-[23px] leading-tight mb-1">
                ©2025 My Virtual Boss
              </p>
              <p className="text-[#0F3260] text-[23px] leading-tight">
                The Operating System for Real Estate Success.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
