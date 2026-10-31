import React, { useState } from 'react';
import {
  Sun,
  Activity,
  Sliders,
  Bell,
  User,
  Shield,
  Wifi,
  BatteryCharging,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { FarmUnit, HardwareAlert } from '../types';

interface MobileFrameWrapperProps {
  unit: FarmUnit;
  onUpdateUnit: (updated: Partial<FarmUnit>) => void;
  alerts: HardwareAlert[];
  onDismissAlert: (id: string) => void;
  onOpenAdmin: () => void;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({
  unit,
  onUpdateUnit,
  alerts,
  onDismissAlert,
  onOpenAdmin,
}) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'home' | 'controls' | 'alerts' | 'menu'>('home');
  const [lightOn, setLightOn] = useState(unit.lightOn);
  const [intensity, setIntensity] = useState(unit.intensityPct);
  const [pulseHz, setPulseHz] = useState(unit.pulseHz);

  const handleToggleLight = () => {
    const next = !lightOn;
    setLightOn(next);
    onUpdateUnit({ lightOn: next });
  };

  const handleIntensityChange = (val: number) => {
    setIntensity(val);
    onUpdateUnit({ intensityPct: val });
  };

  return (
    <div className="py-8 flex justify-center items-center bg-slate-100 min-h-[calc(100vh-4rem)]">
      {/* Smartphone Device Frame */}
      <div className="relative w-[380px] h-[780px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 border-slate-700 flex flex-col overflow-hidden">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-full z-30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-4" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
        </div>

        {/* Inner Screen */}
        <div className="w-full h-full bg-white rounded-[40px] flex flex-col overflow-hidden relative text-slate-900">
          
          {/* Mobile Status Bar */}
          <div className="pt-4 px-6 pb-2 flex items-center justify-between text-[11px] font-mono font-bold text-slate-800 shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span>5G</span>
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
              <span>{unit.batteryPct}%</span>
            </div>
          </div>

          {/* Top Mobile Bar */}
          <div className="px-5 py-2.5 flex items-center justify-between border-b border-slate-100 shrink-0">
            <div>
              <div className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                {unit.id} · Active
              </div>
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                {unit.name}
              </h2>
            </div>

            <button
              onClick={() => setActiveMobileTab('alerts')}
              className="relative p-2 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200"
            >
              <Bell className="w-4 h-4 text-slate-700" />
              {alerts.filter((a) => !a.resolved).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </button>
          </div>

          {/* Mobile Tab Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* TAB: HOME */}
            {activeMobileTab === 'home' && (
              <div className="space-y-4">
                
                {/* 20h Alaska Protocol Quick Hero Card */}
                <div className="p-4 bg-emerald-600 rounded-2xl text-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-200 font-bold">
                      Alaska Protocol (20h / 4h)
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 font-bold">
                      Hour 14 / 20
                    </span>
                  </div>
                  <div className="text-xl font-extrabold leading-tight">
                    {lightOn ? 'Photonic Acceleration Active' : 'Nocturnal Starch Translocation'}
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Solar generation: <strong className="text-white font-mono">{unit.solarWatts}W</strong>. Grid bill: <strong className="text-white font-mono">Lowest (₹0)</strong>.
                  </p>
                </div>

                {/* Master Switch on Mobile */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Master Light Matrix</div>
                    <div className="text-[10px] text-slate-500">20-Hour UV / LED Array</div>
                  </div>
                  <button
                    onClick={handleToggleLight}
                    className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                      lightOn ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ${
                        lightOn ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Telemetry 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 text-[10px] block">Ambient Temp</span>
                    <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                      {unit.tempC}°C
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5 font-medium">Nominal</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 text-[10px] block">Humidity</span>
                    <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                      {unit.humidityPct}%
                    </span>
                    <span className="text-[10px] text-blue-700 block mt-0.5 font-medium">Optimal</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 text-[10px] block">Battery Reserve</span>
                    <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                      {unit.batteryPct}%
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5 font-medium">Solar Charging</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 text-[10px] block">CO₂ Level</span>
                    <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                      {unit.co2Ppm} ppm
                    </span>
                    <span className="text-[10px] text-purple-700 block mt-0.5 font-medium">C3 Enriched</span>
                  </div>
                </div>

                {/* Active Crop Card */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Current Crop</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                      Canopy Phase
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-emerald-800">{unit.activeCrop}</div>
                  <div className="text-[11px] text-slate-500">
                    Harvest Forecast: <strong className="text-slate-800">{unit.projectedHarvestDate}</strong>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: HARDWARE CONTROLS */}
            {activeMobileTab === 'controls' && (
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900">Light Intensity Dimmer</span>
                    <span className="text-base font-mono font-bold text-emerald-700">{intensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    disabled={!lightOn}
                    onChange={(e) => handleIntensityChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] font-semibold">
                    <button
                      onClick={() => handleIntensityChange(30)}
                      disabled={!lightOn}
                      className="p-1.5 bg-slate-100 rounded-md text-slate-700"
                    >
                      Seedling 30%
                    </button>
                    <button
                      onClick={() => handleIntensityChange(70)}
                      disabled={!lightOn}
                      className="p-1.5 bg-slate-100 rounded-md text-slate-700"
                    >
                      Veg 70%
                    </button>
                    <button
                      onClick={() => handleIntensityChange(100)}
                      disabled={!lightOn}
                      className="p-1.5 bg-emerald-100 rounded-md text-emerald-800"
                    >
                      Alaska 100%
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900">Pulse Resonator (Hz)</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{pulseHz} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={pulseHz}
                    disabled={!lightOn}
                    onChange={(e) => {
                      const hz = Number(e.target.value);
                      setPulseHz(hz);
                      onUpdateUnit({ pulseHz: hz });
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">Photonic Spectrum Recipe</span>
                  <div className="space-y-1.5">
                    {[
                      'Alaska Full PAR + Far-Red (730nm)',
                      'Vegetative Blue/Red (450nm + 660nm)',
                      'UV-A Flavonoid Boost (385nm)',
                    ].map((spec) => (
                      <button
                        key={spec}
                        onClick={() => onUpdateUnit({ spectrum: spec })}
                        className={`w-full p-2.5 rounded-xl border text-left text-[11px] font-medium transition-all ${
                          unit.spectrum === spec
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ALERTS */}
            {activeMobileTab === 'alerts' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-900 mb-2">Hardware Notifications</div>
                {alerts.map((a) => (
                  <div key={a.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{a.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{a.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{a.description}</p>
                    {!a.resolved && (
                      <button
                        onClick={() => onDismissAlert(a.id)}
                        className="mt-1 px-2 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-semibold"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB: MENU & ADMIN REDIRECT */}
            {activeMobileTab === 'menu' && (
              <div className="space-y-3 text-xs">
                <button
                  onClick={onOpenAdmin}
                  className="w-full p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between font-bold"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Open Admin Fleet Console</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1 text-[11px] text-emerald-900">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Alaska Protocol Autonomous Mode</span>
                  </div>
                  <div>Operating 20h illumination / 4h nocturnal rest on 100% solar storage.</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[11px] text-slate-600">
                  <div className="font-bold text-slate-900">AgriPulse Mobile v2.4</div>
                  <div>Alaska 20-Hour Photoperiod Architecture</div>
                  <div className="text-slate-400">Connected to Broker: iot.agripulse.farm</div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Tab Navigation Bar */}
          <div className="h-16 bg-white border-t border-slate-200 grid grid-cols-4 px-2 shrink-0">
            <button
              onClick={() => setActiveMobileTab('home')}
              className={`flex flex-col items-center justify-center gap-1 ${
                activeMobileTab === 'home' ? 'text-emerald-600 font-bold' : 'text-slate-400'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="text-[10px]">Home</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('controls')}
              className={`flex flex-col items-center justify-center gap-1 ${
                activeMobileTab === 'controls' ? 'text-emerald-600 font-bold' : 'text-slate-400'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span className="text-[10px]">Controls</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('alerts')}
              className={`flex flex-col items-center justify-center gap-1 ${
                activeMobileTab === 'alerts' ? 'text-emerald-600 font-bold' : 'text-slate-400'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="text-[10px]">Alerts</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('menu')}
              className={`flex flex-col items-center justify-center gap-1 ${
                activeMobileTab === 'menu' ? 'text-emerald-600 font-bold' : 'text-slate-400'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-[10px]">Admin</span>
            </button>
          </div>

          {/* iOS Home Bar Indicator */}
          <div className="w-32 h-1 bg-slate-900 rounded-full mx-auto my-1.5 shrink-0" />

        </div>
      </div>
    </div>
  );
};
