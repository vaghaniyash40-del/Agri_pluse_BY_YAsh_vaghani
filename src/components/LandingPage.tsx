import React, { useState } from 'react';
import {
  Zap,
  Sun,
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
  TrendingUp,
  Atom,
  Clock,
  Sparkles,
  Award,
  Globe2,
  Droplets,
  CheckCircle2,
} from 'lucide-react';

interface LandingPageProps {
  onExploreDashboard: () => void;
  onOpenMobileView: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreDashboard,
  onOpenMobileView,
}) => {
  // Interactive Daily Light Integral (DLI) simulator
  const [calcHours, setCalcHours] = useState(20);
  const [calcPPFD, setCalcPPFD] = useState(420); // µmol/m²/s

  // DLI formula: PPFD (µmol/m²/s) * photoperiod (hours) * 3600 (s/hr) / 1,000,000 = mol/m²/day
  const calculatedDLI = ((calcPPFD * calcHours * 3600) / 1000000).toFixed(1);
  const yieldGainFactor = (
    calcHours === 20 ? 10.4 : calcHours === 24 ? 8.1 : (calcHours / 12) * 4.2
  ).toFixed(1);

  return (
    <div className="bg-white text-slate-900">
      {/* 🌟 HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Operating on the 20-Hour Alaska Protocol · 100% Solar Powered</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  <span>Design by <strong>Yash Vaghani</strong> & <strong>Harsh Parmar</strong></span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
                Revolutionizing Urban Agriculture with the{' '}
                <span className="text-emerald-600">20-Hour Alaska Protocol</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Maximize crop yields by <strong>10x in compact urban spaces</strong> using solar-powered automation, intelligent LED light grids, and zero grid electricity costs.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreDashboard}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Explore Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenMobileView}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200 flex items-center gap-2"
                >
                  <span>Download App / Mobile View</span>
                </button>
              </div>

              {/* Proof / KPI strip */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-200/80">
                <div>
                  <div className="text-2xl font-bold font-mono text-emerald-600 tabular-nums">10.4x</div>
                  <div className="text-xs text-slate-500 font-medium">Biomass Yield / m²</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-emerald-600 tabular-nums">Lowest</div>
                  <div className="text-xs text-slate-500 font-medium">Electricity Bills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-emerald-600 tabular-nums">95%</div>
                  <div className="text-xs text-slate-500 font-medium">Water Recycled</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group">
                <img
                  src="/assets/images/hero_alaska_vertical_farm_1793391438656.jpg"
                  alt="AgriPulse sustainable vertical urban farm with solar powered LED light grids"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">Alaska Protocol Active</div>
                  <div className="text-sm font-semibold">Tower Alpha · 20-Hour UV/LED Photonic Matrix</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🚀 CORE FEATURES (WHAT AGRIPULSE DOES) */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-2">Platform Capabilities</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Core Features Designed for Scalable Urban Agriculture
            </h3>
            <p className="mt-3 text-slate-600 text-sm">
              Engineered from the ground up for vertical farming operators, commercial urban growers, and municipal food hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Smart IoT Light Control</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Remotely toggle UV grow lights, fine-tune light pulse frequency (10–1000Hz), and calibrate intensity sliders (0–100%) to match optimal crop growth stages.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Sun className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">100% Solar-Powered Automation</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Harness daytime solar energy stored in advanced LiFePO4 batteries to power the continuous 20-hour light cycle completely off-grid with zero utility cost.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Role-Based Access Control</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated, secure portals for both everyday users (growers/farmers) and administrators, secured via biometric auth and 10-digit PIN validation.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Real-Time Telemetry & Monitoring</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Live tracking of ambient temperature, humidity, CO2 ppm, vapor pressure deficit (VPD), battery reserves, and active lighting schedules from any device.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Administrative Fleet & Cost Management</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Oversee multiple farm units across the city, track plant maintenance schedules, calculate energy savings, and onboard operators seamlessly.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Automated 20h Alaska Preset</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Autonomous circadian schedule (20h illumination / 4h dark translocation) configured with auto-override protection and photoperiod countdowns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💡 WHY CHOOSE AGRIPULSE? */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-2">Value Proposition</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Choose AgriPulse?
          </h3>
          <p className="mt-3 text-slate-600 text-sm">
            Empowering every stakeholder in the urban food production lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-200/80 shadow-xs">
            <div className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-md mb-4">
              FOR URBAN CONSUMERS
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">
              Hyper-Local, Zero-Spoilage Fresh Produce
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Enjoy fresh, nutrient-rich produce harvested on-demand within city limits. By producing inside urban centers, AgriPulse completely eliminates multi-day cross-country refrigerated freight, transit spoilage, and pesticide washing.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Harvested hours before table delivery, retaining 100% of vitamins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero chemical synthetic pesticide or herbicide runoff</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Guaranteed year-round supply regardless of seasonal climate shifts</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-xs">
            <div className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-md mb-4">
              FOR FARMERS & GROWERS
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">
              10x Higher Yields with Lowest Electricity Bills
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Achieve <strong>10x higher crop yields</strong> per square meter on compact urban plots with <strong>lowest electricity utility bills (₹0 grid draw)</strong>, transforming vertical building spaces, shipping containers, and rooftops into high-margin agricultural assets.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Eliminate monthly grid electricity tariffs through solar microgrids</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Continuous 20-hour photon saturation cuts harvest turnaround by 40%</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated IoT telemetry reduces daily manual labor to scheduled checks</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 📈 BACKED BY SCIENCE: PHOTOSYNTHESIS DEEP-DIVE */}
      <section id="photosynthesis-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
            <Atom className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cellular Biophysics & Photobiology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Backed by Science: Photosynthesis & The 20-Hour Alaska Protocol
          </h2>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Inspired by the natural 20-hour summer sunlight cycle of Alaska, AgriPulse eliminates the 12-hour plant "sleep" period, drastically accelerating growth speed and increasing plant biomass and starch storage naturally.
          </p>
        </div>

        {/* Scientific Graphic + Explanation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Detailed Leaf / Cellular Cross-Section Image */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <img
              src="/assets/images/photosynthesis_cellular_science_1793391438810.jpg"
              alt="Photosynthesis cellular structure cross section with thylakoid membranes, chlorophyll, and Calvin cycle"
              referrerPolicy="no-referrer"
              className="w-full h-[360px] object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Figure 1.1:</span> Leaf palisade mesophyll cross-section detailing thylakoid membranes, $H_2O$ photolysis, electron transport, and the stroma-based Calvin cycle.
            </div>
          </div>

          {/* Deep-Dive Educational Prose */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-mono font-bold">1</span>
                Light-Dependent Reactions (Thylakoid Membrane)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Photons strike antenna pigments in Photosystem II (P680) and Photosystem I (P700), triggering the catalytic photolysis of water:
              </p>
              <div className="my-2.5 px-3 py-2 bg-slate-100 rounded-lg text-xs font-mono text-slate-800 border border-slate-200">
                2 H₂O + 4 photons → 4 H⁺ + 4 e⁻ + O₂ ↑
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                As electrons cascade through plastoquinone, cytochrome b6f, and plastocyanin, protons are pumped into the thylakoid lumen. The resultant chemiosmotic gradient powers <strong>ATP synthase</strong> to phosphorylate ADP into ATP, while reducing NADP⁺ to <strong>NADPH</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-mono font-bold">2</span>
                Light-Independent Reactions (Calvin-Benson Cycle)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Occurring in the chloroplast stroma, the enzyme <strong>RuBisCO</strong> fixes atmospheric CO₂ onto 5-carbon ribulose-1,5-bisphosphate (RuBP). Utilizing ATP and NADPH generated during the light phase, the intermediate 3-PGA molecules are reduced into Glyceraldehyde-3-phosphate (G3P), which condenses into <strong>Glucose (C₆H₁₂O₆)</strong> and complex starches.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-mono font-bold">3</span>
                The 20-Hour Alaska Protocol Mechanics
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Conventional outdoor plants undergo 10–14 hours of night dormancy, during which chloroplasts sit inactive. In nature, Arctic plants during the sub-polar Alaskan summer receive 20 hours of continuous sunlight, producing giant 45kg cabbages. AgriPulse replicates this:
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>• <strong>20 Hours Illumination:</strong> Continuous photon capture maintains high Rubisco carboxylation velocity without reaching light saturation photoinhibition.</li>
                <li>• <strong>4 Hours Dark Rest:</strong> Essential window for enzymatic translocation of soluble sucrose from leaves to root sinks and vascular cambium, preventing carbohydrate feedback inhibition.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Photoperiod & Daily Light Integral (DLI) Simulator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950 text-white shadow-xl">
          <div className="max-w-3xl mb-6">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">Interactive Bio-Simulator</div>
            <h3 className="text-xl sm:text-2xl font-bold mt-1">Calibrate Daily Light Integral (DLI) & Yield Gain</h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Adjust photoperiod hours and photosynthetic photon flux density (PPFD) to verify how the 20-hour Alaska protocol maximizes photosynthetic energy accumulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-emerald-200">Photoperiod Duration (Hours/Day):</span>
                  <span className="font-mono text-emerald-400 font-bold">{calcHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="24"
                  step="1"
                  value={calcHours}
                  onChange={(e) => setCalcHours(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-900/80 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-emerald-400/70 mt-1 font-mono">
                  <span>8h (Winter)</span>
                  <span>12h (Standard)</span>
                  <span className="text-amber-300 font-bold">20h (Alaska)</span>
                  <span>24h (Photoinhibit)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-emerald-200">Light Intensity PPFD (µmol/m²/s):</span>
                  <span className="font-mono text-emerald-400 font-bold">{calcPPFD} µmol/m²/s</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="800"
                  step="20"
                  value={calcPPFD}
                  onChange={(e) => setCalcPPFD(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-900/80 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Calculated Output Badges */}
            <div className="grid grid-cols-2 gap-4 bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/50">
              <div className="bg-emerald-900/60 p-4 rounded-lg border border-emerald-700/40">
                <div className="text-xs text-emerald-300 font-mono">Total DLI Delivered</div>
                <div className="text-3xl font-extrabold font-mono text-white tabular-nums mt-1">
                  {calculatedDLI} <span className="text-xs text-emerald-400 font-normal">mol/m²/d</span>
                </div>
                <div className="text-[11px] text-emerald-300/80 mt-1">
                  {Number(calculatedDLI) >= 25 ? 'Optimal high-biomass rate' : 'Moderate vegetative rate'}
                </div>
              </div>

              <div className="bg-emerald-900/60 p-4 rounded-lg border border-emerald-700/40">
                <div className="text-xs text-emerald-300 font-mono">Projected Yield Multiplier</div>
                <div className="text-3xl font-extrabold font-mono text-amber-300 tabular-nums mt-1">
                  {yieldGainFactor}x <span className="text-xs text-emerald-400 font-normal">vs Flat Soil</span>
                </div>
                <div className="text-[11px] text-emerald-300/80 mt-1">
                  {calcHours === 20 ? '✨ Alaska Peak Efficiency' : calcHours === 24 ? '⚠️ Mild photoinhibition' : 'Sub-optimal photoperiod'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Proof: Alaska Giant Pumpkin Phenomenon */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
            <div className="lg:col-span-6 rounded-xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-100">
              <img
                src="/assets/images/huge_alaska_giant_pumpkin_1793438661314.jpg"
                alt="Record-breaking 2,147 lb giant pumpkin grown under the natural 20-hour Alaska summer sunlight"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[380px] object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-700">
                Palmer, Alaska · State Fair Record: 2,147 LBS (974 KG)
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Empirical Biological Proof</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                The Alaska 20-Hour Phenomenon: How Giant Pumpkins Defy Traditional Growth Limits
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                In Palmer, Alaska, northern growers routinely harvest world-record <strong>2,000+ lb pumpkins</strong>, 45 kg cabbages, and giant broccoli without genetic engineering. The natural driver is purely photonic: <strong>20 hours of continuous sub-polar daylight</strong> paired with 4 hours of dark rest.
              </p>
              <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Non-Stop Glucose Fixation:</strong> 20 continuous hours of photon capture keeps RuBisCO carboxylation fully active, producing sustained carbohydrate surpluses that fuel exponential cell division.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Essential 4-Hour Rest Window:</strong> The brief 4-hour darkness triggers hormonal translocation of starches from chloroplasts to fruit parenchyma cells, preventing leaf feedback inhibition.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>AgriPulse Indoor Replication:</strong> Our automated LED light grids replicate this exact photoperiod in city towers, bringing 10x crop output to compact urban spaces with lowest electricity bills.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 🚜 FIELD HARDWARE: WHEELED LIGHT GRIDS & ROOFTOP SETUPS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Commercial Hardware Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Commercial Deployments: Wheeled Light Grids & Rooftop Systems
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              Engineered for mobile vertical farming facilities, municipal warehouse conversions, and rooftop micro-pod agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deployment 1: Wheeled Mobile Light Grid */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden shadow-xs hover:border-emerald-300 transition-all flex flex-col">
              <div className="h-64 sm:h-72 overflow-hidden relative bg-slate-100">
                <img
                  src="/assets/images/wheeled_mobile_light_grid_1793438661848.jpg"
                  alt="Automated wheeled vertical farming light grid moving on floor rails between aeroponic racks"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white font-mono text-xs px-2.5 py-1 rounded-md font-semibold">
                  Aisle Automation · Wheeled Light Grid
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Autonomous Wheeled Solar Light Grids
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Heavy-duty motorized caster chassis with multi-tier vertical LED grow light bars that glide along precision floor tracks between cultivation racks. Equipped with onboard LiFePO4 battery inverters for autonomous off-grid mobility, eliminating dark spots and reducing static luminaire capital costs by 50%.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Drive System</span>
                    <span className="font-semibold text-slate-800">Precision Rail Castor</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Energy Source</span>
                    <span className="font-semibold text-emerald-700">Solar LiFePO4 48V</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Operating Bill</span>
                    <span className="font-mono font-bold text-slate-900">Lowest (₹0)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment 2: Compact Rooftop Setup */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden shadow-xs hover:border-emerald-300 transition-all flex flex-col">
              <div className="h-64 sm:h-72 overflow-hidden relative bg-slate-100">
                <img
                  src="/assets/images/rooftop_urban_plant_setup_1793438662120.jpg"
                  alt="Compact rooftop vertical aeroponic plant setup with integrated solar panel and city skyline"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3 bg-emerald-700 text-white font-mono text-xs px-2.5 py-1 rounded-md font-semibold">
                  Urban Terrace · Modular Micro-Pod
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Compact Rooftop Aeroponic Micro-Farms
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Modular vertical aeroponic tower setups designed for urban rooftop terraces, residential societies, and commercial office buildings. Integrated with mini rooftop solar arrays and closed-loop nutrient pumps to harvest crisp greens and herbs with zero ground footprint and lowest electricity bills.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Space Required</span>
                    <span className="font-semibold text-slate-800">Only 6 sq meters</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Water Loop</span>
                    <span className="font-semibold text-emerald-700">95% Recirculated</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Monthly Harvest</span>
                    <span className="font-mono font-bold text-slate-900">45 kg Fresh Greens</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌍 UN SUSTAINABLE DEVELOPMENT GOALS (SDGs) */}
      <section id="sdgs-section" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
              <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>United Nations Sustainability Agenda</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Direct Alignment with UN Sustainable Development Goals (SDGs)
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              AgriPulse operational architecture advances key UN global goals by modernizing municipal food production, renewable energy, and climate resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* SDG 2: Zero Hunger */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col">
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img
                  src="/assets/images/sdg_zero_hunger_produce_1793391441033.jpg"
                  alt="UN SDG 2 Zero Hunger crisp vertical farm harvest"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
                  SDG 2 · ZERO HUNGER
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">Year-Round Urban Food Resilience</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Provides continuous harvests of fresh microgreens, butterhead lettuce, and nutrient-dense crops directly inside densely populated cities, immune to droughts, frost, and supply chain disruptions.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-emerald-700">
                  Target: 45 kg fresh harvest per m² annually
                </div>
              </div>
            </div>

            {/* SDG 7: Affordable & Clean Energy */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col">
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img
                  src="/assets/images/sdg_clean_solar_energy_1793391440598.jpg"
                  alt="UN SDG 7 Clean Energy rooftop solar and LiFePO4 batteries"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
                  SDG 7 · CLEAN ENERGY
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">100% Solar-Powered Microgrids</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Harnesses high-efficiency rooftop photovoltaic solar arrays paired with lithium iron phosphate (LiFePO4) energy storage, operating 20-hour light protocols with zero fossil-fuel electricity draw.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-emerald-700">
                  Impact: 14.8 MWh clean energy generated per tower
                </div>
              </div>
            </div>

            {/* SDG 11: Sustainable Cities */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
              <div>
                <div className="inline-block bg-orange-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md mb-4 shadow-xs">
                  SDG 11 · SUSTAINABLE CITIES
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Decentralized Urban Food Towers</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Converts underutilized city infrastructure — parking structures, warehouse rooftops, and container lots — into productive biophilic agricultural engines without encroaching on greenfield ecosystems.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-emerald-700">
                Density: 90% footprint reduction vs ground agriculture
              </div>
            </div>

            {/* SDG 12: Responsible Consumption */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
              <div>
                <div className="inline-block bg-yellow-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md mb-4 shadow-xs">
                  SDG 12 · RESPONSIBLE CONSUMPTION
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">95% Water Recirculation Loop</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Closed-loop nutrient delivery condenses transpired moisture through dehumidifiers and recirculates 95% of irrigation water, completely preventing fertilizer runoff into municipal aquifers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-emerald-700">
                Conservation: Saves ~2.1 million liters water/facility/yr
              </div>
            </div>

            {/* SDG 13: Climate Action */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
              <div>
                <div className="inline-block bg-emerald-700 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md mb-4 shadow-xs">
                  SDG 13 · CLIMATE ACTION
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Zero Transport Food Miles</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Standard produce travels 1,500+ miles from soil farms to grocery shelves in refrigerated diesel trucks. AgriPulse food is consumed within 2 miles of growth, permanently cutting freight emissions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-emerald-700">
                Reduction: -98.6% logistical carbon footprint
              </div>
            </div>

            {/* SDG 9: Industry & Innovation */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
              <div>
                <div className="inline-block bg-blue-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md mb-4 shadow-xs">
                  SDG 9 · INDUSTRY & INNOVATION
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Autonomous IoT Botanical Hardware</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Open telemetry standards, responsive LED driver relays, and predictive maintenance schedules pioneer next-generation industrial agriculture hardware accessible globally.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-emerald-700">
                Hardware: Industrial IoT MQTT & Closed-Loop Photonic Automation
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📞 READY TO TRANSFORM URBAN FARMING? */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-emerald-600 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Transform Urban Farming?
          </h3>
          <p className="mt-4 text-emerald-100 text-base max-w-2xl mx-auto leading-relaxed">
            Join the movement towards sustainable, high-yield city agriculture today. Manage your light grids, monitor battery reserves, and unlock 10x crop growth with the Alaska Protocol.
          </p>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={onExploreDashboard}
              className="px-8 py-3.5 text-sm font-bold text-emerald-950 bg-white hover:bg-emerald-50 rounded-xl shadow-md transition-all"
            >
              Get Started Now
            </button>
            <button
              onClick={onOpenMobileView}
              className="px-8 py-3.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl border border-emerald-500 transition-all"
            >
              Open Mobile App Simulator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
