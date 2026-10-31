import React, { useState, useEffect } from 'react';
import {
  Sun,
  Zap,
  BatteryCharging,
  Thermometer,
  Droplets,
  Wind,
  Bell,
  Clock,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Wifi,
  Radio,
  Lock,
  Key,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { FarmUnit, HardwareAlert } from '../types';

interface GrowerDashboardProps {
  unit: FarmUnit;
  onUpdateUnit: (updated: Partial<FarmUnit>) => void;
  alerts: HardwareAlert[];
  onDismissAlert: (id: string) => void;
  currentGrowerUser?: string;
  currentGrowerPassword?: string;
  onChangeGrowerPassword?: (currentPass: string, newPass: string) => { success: boolean; message: string };
}

export const GrowerDashboard: React.FC<GrowerDashboardProps> = ({
  unit,
  onUpdateUnit,
  alerts,
  onDismissAlert,
  currentGrowerUser = 'marcus.vance@agripulse.farm',
  currentGrowerPassword = 'Grower2026!',
  onChangeGrowerPassword,
}) => {
  // Local active states
  const [lightOn, setLightOn] = useState(unit.lightOn);
  const [intensity, setIntensity] = useState(unit.intensityPct);
  const [pulseHz, setPulseHz] = useState(unit.pulseHz);
  const [spectrum, setSpectrum] = useState(unit.spectrum);
  const [alaskaProtocolActive, setAlaskaProtocolActive] = useState(true);
  const [cycleHour, setCycleHour] = useState(14); // Hour 14 of 20h
  const [relayLatency, setRelayLatency] = useState(16);
  const [isSyncing, setIsSyncing] = useState(false);

  // Change Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Synchronize when unit prop updates
  useEffect(() => {
    setLightOn(unit.lightOn);
    setIntensity(unit.intensityPct);
    setPulseHz(unit.pulseHz);
    setSpectrum(unit.spectrum);
  }, [unit]);

  // Simulate subtle real-time environmental telemetry drift
  const [temp, setTemp] = useState(unit.tempC);
  const [humidity, setHumidity] = useState(unit.humidityPct);
  const [battery, setBattery] = useState(unit.batteryPct);
  const [solarWatts, setSolarWatts] = useState(unit.solarWatts);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp((prev) => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setHumidity((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setSolarWatts((prev) => Math.round(prev + (Math.random() * 40 - 20)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleLight = () => {
    setIsSyncing(true);
    const nextState = !lightOn;
    setLightOn(nextState);
    setTimeout(() => {
      setRelayLatency(Math.floor(12 + Math.random() * 8));
      setIsSyncing(false);
      onUpdateUnit({ lightOn: nextState });
    }, 200);
  };

  const handleIntensityChange = (val: number) => {
    setIntensity(val);
    onUpdateUnit({ intensityPct: val });
  };

  const handlePreset = (stage: 'Seedling' | 'Vegetative' | 'Giant Growth') => {
    let target = 70;
    if (stage === 'Seedling') target = 30;
    if (stage === 'Giant Growth') target = 100;
    setIntensity(target);
    onUpdateUnit({ intensityPct: target });
  };

  const handleSpectrumChange = (spec: string) => {
    setSpectrum(spec);
    onUpdateUnit({ spectrum: spec });
  };

  const handlePulseChange = (hz: number) => {
    setPulseHz(hz);
    onUpdateUnit({ pulseHz: hz });
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassInput) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (currentPassInput !== currentGrowerPassword) {
      setPasswordError('Current password is incorrect. Please check and retry.');
      return;
    }
    if (!newPassInput) {
      setPasswordError('Please enter a new password.');
      return;
    }
    if (newPassInput.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassInput === currentPassInput) {
      setPasswordError('New password cannot be the same as your current password.');
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setPasswordError('New passwords do not match. Please re-enter.');
      return;
    }

    if (onChangeGrowerPassword) {
      const res = onChangeGrowerPassword(currentPassInput, newPassInput);
      if (res.success) {
        setPasswordSuccess(res.message || 'Password changed successfully!');
        setTimeout(() => {
          setShowPasswordModal(false);
          setPasswordSuccess('');
          setCurrentPassInput('');
          setNewPassInput('');
          setConfirmPassInput('');
        }, 1600);
      } else {
        setPasswordError(res.message);
      }
    } else {
      setPasswordSuccess('Password changed successfully!');
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess('');
        setCurrentPassInput('');
        setNewPassInput('');
        setConfirmPassInput('');
      }, 1600);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Info & Hardware Ping */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Grower Hardware Control Center
            </h1>
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              {unit.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span>{unit.type}</span>
            <span aria-hidden="true">·</span>
            <span>{unit.location}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-medium">Active: {unit.activeCrop}</span>
          </div>
        </div>

        {/* Actions & Telemetry Badge */}
        <div className="flex flex-wrap items-center gap-3">
          {/* User Portal: Change Password Option */}
          <button
            onClick={() => {
              setShowPasswordModal(true);
              setPasswordError('');
              setPasswordSuccess('');
              setCurrentPassInput('');
              setNewPassInput('');
              setConfirmPassInput('');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-emerald-600" />
            <span>Change Password</span>
          </button>

          {/* IoT Relay Telemetry Badge */}
          <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-mono">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span>MQTT Relay:</span>
              <span className="text-emerald-700 font-bold tabular-nums">{relayLatency}ms</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-slate-600 font-mono">
              <Radio className="w-3.5 h-3.5 text-blue-600" />
              <span>Cycle: Hour {cycleHour} / 20</span>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 REAL-TIME ENVIRONMENT DASHBOARD */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">
            Real-Time Microclimate Telemetry
          </h2>
          <span className="text-xs text-slate-500 font-mono">Stream: Live 1Hz</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Ambient Temp */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Ambient Temp</span>
              <Thermometer className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {temp}°C
            </div>
            <div className="text-[11px] text-emerald-700 mt-1 font-medium">
              Nominal (21–24°C)
            </div>
          </div>

          {/* Relative Humidity */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Relative Humidity</span>
              <Droplets className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {humidity}%
            </div>
            <div className="text-[11px] text-blue-700 mt-1 font-medium">
              Target: 60–65%
            </div>
          </div>

          {/* Light Status */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Light Relay</span>
              <Sun className="w-4 h-4 text-amber-500" />
            </div>
            <div className={`text-xl font-bold font-mono tabular-nums ${lightOn ? 'text-emerald-700' : 'text-slate-400'}`}>
              {lightOn ? 'ACTIVE (ON)' : 'STANDBY (OFF)'}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {lightOn ? `${intensity}% Intensity` : 'Dark Rest Phase'}
            </div>
          </div>

          {/* Battery Reserve */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Battery Reserve</span>
              <BatteryCharging className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {battery}%
            </div>
            <div className="text-[11px] text-emerald-700 mt-1 font-medium">
              LiFePO4 · Nominal
            </div>
          </div>

          {/* Solar Charging */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Solar Charging</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {solarWatts} <span className="text-xs font-normal text-slate-500">W</span>
            </div>
            <div className="text-[11px] text-amber-700 mt-1 font-medium">
              Lowest Bills (₹0 Grid Draw)
            </div>
          </div>

          {/* CO2 Concentration */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">CO₂ Level</span>
              <Wind className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {unit.co2Ppm} <span className="text-xs font-normal text-slate-500">ppm</span>
            </div>
            <div className="text-[11px] text-purple-700 mt-1 font-medium">
              Enriched for C3 Rubisco
            </div>
          </div>

        </div>
      </div>

      {/* MAIN CONTROL MATRIX: LIGHTING + ALASKA PROTOCOL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Hardware IoT Light Control */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Master ON/OFF Relay Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-emerald-600" />
                  <span>Master IoT Light Grid Relay</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instant hardware toggle for the 20-hour UV/LED high-intensity luminaire grid.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-slate-700">
                  {lightOn ? 'STATUS: ILLUMINATING' : 'STATUS: RELAY OPEN'}
                </span>
                <button
                  onClick={handleToggleLight}
                  disabled={isSyncing}
                  className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    lightOn ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      lightOn ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Intensity Dimmer Continuous Slider */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    <span>Intensity Dimmer (0–100%)</span>
                  </label>
                  <div className="text-xs text-slate-500">
                    Calibrate photon saturation to current canopy development stage.
                  </div>
                </div>
                <div className="text-2xl font-mono font-extrabold text-emerald-700 tabular-nums">
                  {intensity}%
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                disabled={!lightOn}
                onChange={(e) => handleIntensityChange(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer disabled:opacity-40"
              />

              {/* Presets */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  Growth Stage Quick Presets
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handlePreset('Seedling')}
                    disabled={!lightOn}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-left ${
                      intensity === 30
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold">Seedling (30%)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Gentle root establishment</div>
                  </button>

                  <button
                    onClick={() => handlePreset('Vegetative')}
                    disabled={!lightOn}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-left ${
                      intensity === 70
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold">Vegetative (70%)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Rapid leaf formation</div>
                  </button>

                  <button
                    onClick={() => handlePreset('Giant Growth')}
                    disabled={!lightOn}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-left ${
                      intensity === 100
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold">Giant Growth (100%)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Alaska Protocol max boost</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Spectrum & Frequency Adjustment */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>Spectrum & Light Pulse Frequency Calibration</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust light pulse frequency and UV wavelength for optimal plant absorption.
              </p>
            </div>

            {/* Pulse Frequency Slider */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800">Light Pulse Frequency (Hz)</span>
                  <p className="text-[11px] text-slate-500">
                    High-speed modulation matches chloroplast photon electron transfer kinetics.
                  </p>
                </div>
                <span className="text-lg font-mono font-bold text-slate-900 tabular-nums">
                  {pulseHz} Hz
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={pulseHz}
                disabled={!lightOn}
                onChange={(e) => handlePulseChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>10 Hz (Strobe)</span>
                <span className="text-emerald-700 font-semibold">120 Hz (Resonant Sweet Spot)</span>
                <span>500 Hz (Ultra High)</span>
              </div>
            </div>

            {/* Photonic Spectrum Recipe Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                Select Photonic Spectrum Recipe
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    name: 'Alaska Full PAR + Far-Red (730nm)',
                    desc: 'Optimal 20h photoperiod formulation with Emerson enhancement effect.',
                    tag: 'Recommended',
                  },
                  {
                    name: 'Vegetative Blue/Red (450nm + 660nm)',
                    desc: 'Concentrates Chlorophyll a & b absorption for thick leaf expansion.',
                    tag: 'Dense Foliage',
                  },
                  {
                    name: 'UV-A Flavonoid Boost (385nm)',
                    desc: 'Triggers defensive terpene, flavonoid, and aroma accumulation.',
                    tag: 'Flavor & Aroma',
                  },
                  {
                    name: 'UV-B Biomass Hardening (310nm)',
                    desc: 'Stimulates robust cellular cuticle and compact stem caliper.',
                    tag: 'Structural Vigor',
                  },
                  {
                    name: 'Pure Daylight Sun Simulator (5000K)',
                    desc: 'Balanced continuous spectrum mimicking crisp natural noon sunlight.',
                    tag: 'Full Spectrum',
                  },
                ].map((spec) => (
                  <button
                    key={spec.name}
                    onClick={() => handleSpectrumChange(spec.name)}
                    disabled={!lightOn}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      spectrum === spec.name
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">{spec.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                        {spec.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight">{spec.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (4 cols): Alaska Protocol Ring & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Automated Light Cycle: Alaska Protocol */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>20h Alaska Protocol Mode</span>
                </h3>
                <span className="text-xs text-slate-500">Autonomous 20h ON / 4h OFF cycle</span>
              </div>
              <button
                onClick={() => setAlaskaProtocolActive(!alaskaProtocolActive)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                  alaskaProtocolActive
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {alaskaProtocolActive ? 'Automated' : 'Manual Override'}
              </button>
            </div>

            {/* Circular Visual Circadian Clock */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG Ring */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background 24h circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#E2E8F0"
                    strokeWidth="8"
                  />
                  {/* Active 20h segment (20/24 = 83.3% of 251.2 circumference) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#059669"
                    strokeWidth="8"
                    strokeDasharray="209.4 41.8"
                    strokeDashoffset="0"
                  />
                  {/* 4h rest segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#94A3B8"
                    strokeWidth="8"
                    strokeDasharray="41.8 209.4"
                    strokeDashoffset="-209.4"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute text-center">
                  <span className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
                    {cycleHour}h
                  </span>
                  <div className="text-[10px] text-slate-500 font-medium">of 20h Active</div>
                </div>
              </div>

              <div className="mt-4 text-center space-y-1">
                <div className="text-xs font-semibold text-slate-800">
                  Current: Light Phase (Hour {cycleHour} of 20)
                </div>
                <div className="text-[11px] text-slate-500">
                  Next dark rest phase starts in <span className="font-mono font-bold text-emerald-700">{20 - cycleHour} hours</span>.
                </div>
              </div>

              {/* Quick cycle simulator test */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => setCycleHour((h) => (h >= 24 ? 1 : h + 1))}
                  className="px-2.5 py-1 text-xs font-mono bg-white hover:bg-slate-100 rounded-md border border-slate-200 text-slate-700 shadow-2xs flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500" />
                  <span>Advance 1h</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed bg-emerald-50/70 p-3 rounded-lg border border-emerald-100">
              <strong className="text-emerald-900">Why the 4-hour rest?</strong> Allows plants to translocate newly synthesized starches from chloroplasts to root systems, eliminating sugar buildup and maintaining continuous cell division.
            </div>
          </div>

          {/* Real-time Alerts & Notifications */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-emerald-600" />
                <span>IoT System Alerts</span>
              </h3>
              <span className="text-xs font-mono font-medium text-slate-500">
                {alerts.filter((a) => !a.resolved).length} Unresolved
              </span>
            </div>

            <div className="space-y-3">
              {alerts.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">
                  All hardware nodes operating nominally.
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      alert.severity === 'critical'
                        ? 'bg-red-50/70 border-red-200 text-red-900'
                        : alert.severity === 'warning'
                        ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold">
                        {alert.severity === 'critical' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        ) : alert.severity === 'warning' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        <span>{alert.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
                    </div>

                    <p className="text-[11px] leading-relaxed opacity-90">{alert.description}</p>

                    {!alert.resolved && (
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => onDismissAlert(alert.id)}
                          className="px-2 py-0.5 text-[10px] font-semibold bg-white hover:bg-slate-100 rounded-md border border-slate-300 text-slate-700 shadow-2xs"
                        >
                          Acknowledge
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Change Password Modal (User Portal) */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5 font-bold text-slate-900">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Change Account Password</h3>
                  <p className="text-[11px] text-slate-500 font-normal">Grower Operator Security Settings</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4 p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs text-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Current Account</span>
                  <span className="font-semibold text-emerald-900">{currentGrowerUser}</span>
                </div>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-800 font-bold">
                  GROWER
                </span>
              </div>

              {passwordError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      placeholder="Enter your current password"
                      value={currentPassInput}
                      onChange={(e) => setCurrentPassInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Minimum 6 characters"
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      className="w-full pl-9 pr-10 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Re-type new password"
                      value={confirmPassInput}
                      onChange={(e) => setConfirmPassInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
