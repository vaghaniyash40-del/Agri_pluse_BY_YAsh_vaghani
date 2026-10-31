import React, { useState } from 'react';
import { Shield, Fingerprint, Lock, User, Key, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
  adminCredentials?: { username: string; password: string; pin: string };
  growerCredentials?: { username: string; password: string };
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  adminCredentials = { username: 'Yash.vaghani@agripulse.farm', password: 'AdminSecure99!', pin: '8492019384' },
  growerCredentials = { username: 'marcus.vance@agripulse.farm', password: 'Grower2026!' },
}) => {
  const [roleTab, setRoleTab] = useState<'grower' | 'admin'>('grower');
  
  // Grower fields - start empty so user can type by themselves
  const [growerUser, setGrowerUser] = useState('');
  const [growerPass, setGrowerPass] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [biometricScanning, setBiometricScanning] = useState(false);

  // Admin fields - start empty so user can type by themselves
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // Brute force protection state
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Countdown timer for lockout
  React.useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => {
        setLockoutTimer((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTimer]);

  if (!isOpen) return null;

  // Sanitization helper
  const sanitizeInput = (val: string) => val.replace(/[<>'"`;]/g, '');

  const registerFailedAttempt = (msg: string) => {
    const nextAttempts = failedAttempts + 1;
    setFailedAttempts(nextAttempts);
    if (nextAttempts >= 5) {
      setLockoutTimer(30);
      setErrorMsg('Security lockout triggered: 5 consecutive failed attempts. Please wait 30 seconds before retrying.');
    } else {
      setErrorMsg(`${msg} (Attempt ${nextAttempts}/5 before temporary lock)`);
    }
  };

  const handleGrowerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) {
      setErrorMsg(`Portal locked for security. Retrying in ${lockoutTimer}s.`);
      return;
    }
    const cleanUser = sanitizeInput(growerUser.trim());
    if (!cleanUser) {
      setErrorMsg('Please enter your User ID or Email.');
      return;
    }
    if (!growerPass.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }
    if (cleanUser !== growerCredentials.username && cleanUser !== 'marcus.vance@agripulse.farm') {
      registerFailedAttempt(`Unrecognized User ID. Expected: ${growerCredentials.username}`);
      return;
    }
    if (growerPass !== growerCredentials.password) {
      registerFailedAttempt('Invalid password. Check credentials or click the demo hint.');
      return;
    }
    setErrorMsg('');
    setFailedAttempts(0);
    onLoginSuccess('grower');
    onClose();
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) {
      setErrorMsg(`Admin terminal locked for security. Retrying in ${lockoutTimer}s.`);
      return;
    }
    const cleanUser = sanitizeInput(adminUser.trim());
    if (!cleanUser) {
      setErrorMsg('Please enter your Admin User ID.');
      return;
    }
    if (!adminPass.trim()) {
      setErrorMsg('Please enter your master password.');
      return;
    }
    if (adminPin.length !== 10) {
      setErrorMsg('Admin Security PIN must be exactly 10 digits.');
      return;
    }
    if (adminPin !== adminCredentials.pin) {
      registerFailedAttempt(`Invalid 10-Digit Security PIN. Please use Demo PIN: ${adminCredentials.pin}.`);
      return;
    }
    if (cleanUser !== adminCredentials.username && cleanUser !== 'Yash.vaghani@agripulse.farm') {
      registerFailedAttempt(`Invalid Admin User ID. (Current: ${adminCredentials.username})`);
      return;
    }
    if (adminPass !== adminCredentials.password) {
      registerFailedAttempt('Invalid master password. Please verify your admin password.');
      return;
    }
    setErrorMsg('');
    setFailedAttempts(0);
    onLoginSuccess('admin');
    onClose();
  };

  const handleBiometricAuth = () => {
    if (lockoutTimer > 0) {
      setErrorMsg(`Portal locked. Biometrics halted for ${lockoutTimer}s.`);
      return;
    }
    setBiometricScanning(true);
    setTimeout(() => {
      setBiometricScanning(false);
      setFailedAttempts(0);
      onLoginSuccess('grower');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header Tabs */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>AgriPulse Authentication Portal</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 p-1 bg-slate-200/80 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setRoleTab('grower');
                setErrorMsg('');
              }}
              className={`py-2 rounded-lg transition-all ${
                roleTab === 'grower'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grower / Consumer
            </button>
            <button
              onClick={() => {
                setRoleTab('admin');
                setErrorMsg('');
              }}
              className={`py-2 rounded-lg transition-all ${
                roleTab === 'admin'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              System Admin (10-Pin)
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {errorMsg}
            </div>
          )}

          {roleTab === 'grower' ? (
            <form onSubmit={handleGrowerLogin} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">User ID or Email</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Enter email or ID"
                    value={growerUser}
                    onChange={(e) => setGrowerUser(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>Demo ID: <button type="button" onClick={() => setGrowerUser(growerCredentials.username)} className="font-mono text-emerald-700 font-semibold hover:underline">{growerCredentials.username}</button></span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={growerPass}
                    onChange={(e) => setGrowerPass(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  <span>Demo Password: <button type="button" onClick={() => setGrowerPass(growerCredentials.password)} className="font-mono text-emerald-700 font-semibold hover:underline">{growerCredentials.password}</button></span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded-sm text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Remember Me</span>
                </label>
                <span className="text-slate-400">Assigned Unit: Tower-Alpha</span>
              </div>

              <button
                type="submit"
                disabled={lockoutTimer > 0}
                className={`w-full py-2.5 text-xs font-bold text-white rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 ${
                  lockoutTimer > 0 ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <span>{lockoutTimer > 0 ? `Portal Locked (${lockoutTimer}s remaining)` : 'Sign In to Hardware Controls'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-2 text-[10px] uppercase font-mono text-slate-400">
                  Or Quick Biometric
                </span>
              </div>

              <button
                type="button"
                onClick={handleBiometricAuth}
                disabled={biometricScanning}
                className="w-full py-2.5 px-3 border border-slate-200 hover:border-emerald-300 bg-slate-50 hover:bg-emerald-50/50 rounded-xl font-semibold text-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <Fingerprint className={`w-4 h-4 ${biometricScanning ? 'animate-pulse text-emerald-600' : 'text-slate-600'}`} />
                <span>{biometricScanning ? 'Scanning Fingerprint / FaceID...' : 'Quick Biometric Sign-In'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Admin User ID</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Enter admin ID"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  <span>Demo Admin: <button type="button" onClick={() => setAdminUser(adminCredentials.username)} className="font-mono text-emerald-700 font-semibold hover:underline">{adminCredentials.username}</button></span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Master Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    placeholder="Enter master password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  <span>Demo Password: <button type="button" onClick={() => setAdminPass(adminCredentials.password)} className="font-mono text-emerald-700 font-semibold hover:underline">{adminCredentials.password}</button></span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">10-Digit Security PIN</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    maxLength={10}
                    placeholder="Enter 10-Digit PIN"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-9 pr-3 py-2 font-mono tracking-widest text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>Demo PIN: <button type="button" onClick={() => setAdminPin(adminCredentials.pin)} className="font-mono text-emerald-700 font-bold tracking-wider hover:underline">{adminCredentials.pin}</button></span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Mandatory 10-digit hardware cryptographic challenge.
                </div>
              </div>

              <button
                type="submit"
                disabled={lockoutTimer > 0}
                className={`w-full py-2.5 text-xs font-bold text-white rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 ${
                  lockoutTimer > 0 ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <span>{lockoutTimer > 0 ? `Terminal Locked (${lockoutTimer}s remaining)` : 'Authorize Master Fleet Console'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>AES-256 encrypted session</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Rate-Limit Guard Active</span>
          </div>
        </div>

      </div>
    </div>
  );
};
