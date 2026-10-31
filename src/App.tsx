/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { GrowerDashboard } from './components/GrowerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';
import {
  INITIAL_FARM_UNITS,
  INITIAL_USERS,
  INITIAL_TASKS,
  INITIAL_BATCHES,
  INITIAL_ALERTS,
  INITIAL_AUDIT_LOGS,
} from './data/mockData';
import { UserRole, FarmUnit, UserAccount, MaintenanceTask, CropBatch, HardwareAlert, AuditLog } from './types';
import { Sprout } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  // Dynamic credentials state
  const [adminCredentials, setAdminCredentials] = useState({
    username: 'Yash.vaghani@agripulse.farm',
    password: 'AdminSecure99!',
    pin: '8492019384',
  });

  const [growerCredentials, setGrowerCredentials] = useState({
    username: 'marcus.vance@agripulse.farm',
    password: 'Grower2026!',
  });

  // Core application data state
  const [units, setUnits] = useState<FarmUnit[]>(INITIAL_FARM_UNITS);
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [tasks, setTasks] = useState<MaintenanceTask[]>(INITIAL_TASKS);
  const [batches, setBatches] = useState<CropBatch[]>(INITIAL_BATCHES);
  const [alerts, setAlerts] = useState<HardwareAlert[]>(INITIAL_ALERTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Active unit for Grower controls
  const activeUnit = units[0];

  // Smooth scroll to sections when tab changes
  useEffect(() => {
    if (activeTab === 'photosynthesis') {
      const el = document.getElementById('photosynthesis-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (activeTab === 'sdgs') {
      const el = document.getElementById('sdgs-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (activeTab === 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleUpdateUnit = (updatedFields: Partial<FarmUnit>) => {
    setUnits((prev) =>
      prev.map((u) => (u.id === activeUnit.id ? { ...u, ...updatedFields } : u))
    );

    // If light was toggled, record audit log
    if (updatedFields.lightOn !== undefined) {
      const newLog: AuditLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        unitId: activeUnit.id,
        event: updatedFields.lightOn ? 'Manual Light Array Activated' : 'Manual Light Array Deactivated',
        operator: userRole === 'admin' ? 'Elena Rostova (Admin)' : 'Marcus Vance (Grower)',
        category: 'Override',
      };
      setAuditLogs((prev) => [newLog, ...prev]);
    }
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, resolved: true } : a))
    );
  };

  const handleAddUser = (userData: Omit<UserAccount, 'id' | 'createdAt'>) => {
    const newUser: UserAccount = {
      ...userData,
      id: `usr-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [newUser, ...prev]);

    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      unitId: userData.unitId,
      event: `New user onboarded: ${userData.name} (PIN: ${userData.pin})`,
      operator: 'Admin Console',
      category: 'Security',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
      )
    );
  };

  const handleResetUserPin = (id: string) => {
    const newPin = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, pin: newPin } : u))
    );
  };

  const handleAddTask = (taskData: Omit<MaintenanceTask, 'id'>) => {
    const newTask: MaintenanceTask = {
      ...taskData,
      id: `tsk-${Date.now().toString().slice(-4)}`,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleAddBatch = (batchData: Omit<CropBatch, 'id'>) => {
    const newBatch: CropBatch = {
      ...batchData,
      id: `btc-${Date.now().toString().slice(-4)}`,
    };
    setBatches((prev) => [newBatch, ...prev]);
  };

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    if (role === 'admin') {
      setIsAdminUnlocked(true);
      setActiveTab('admin');
    } else {
      setActiveTab('grower');
    }
  };

  const handleLogout = () => {
    setUserRole('guest');
    setIsAdminUnlocked(false);
    setActiveTab('landing');
  };

  const handleUnlockAdmin = (pin: string) => {
    if (pin === adminCredentials.pin) {
      setIsAdminUnlocked(true);
      return true;
    }
    return false;
  };

  // Credential Handlers
  const handleChangeGrowerPassword = (currentPass: string, newPass: string) => {
    if (currentPass !== growerCredentials.password) {
      return { success: false, message: 'Current password is incorrect.' };
    }
    setGrowerCredentials((prev) => ({ ...prev, password: newPass }));
    setUsers((prev) =>
      prev.map((u) => (u.email === growerCredentials.username ? { ...u, password: newPass } : u))
    );
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      unitId: activeUnit.id,
      event: `Grower changed account password (${growerCredentials.username})`,
      operator: 'Marcus Vance (Grower)',
      category: 'Security',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    return { success: true, message: 'Grower password changed successfully!' };
  };

  const handleChangeAdminUsername = (currentPass: string, newUsername: string) => {
    if (currentPass !== adminCredentials.password) {
      return { success: false, message: 'Current master password does not match.' };
    }
    setAdminCredentials((prev) => ({ ...prev, username: newUsername }));
    setUsers((prev) =>
      prev.map((u) => (u.role === 'Admin' ? { ...u, email: newUsername } : u))
    );
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      unitId: 'ALL-FLEET',
      event: `Admin master username updated to ${newUsername}`,
      operator: 'Elena Rostova (Admin)',
      category: 'Security',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    return { success: true, message: `Admin username updated to ${newUsername}` };
  };

  const handleChangeAdminPassword = (currentPass: string, newPassword: string) => {
    if (currentPass !== adminCredentials.password) {
      return { success: false, message: 'Current master password does not match.' };
    }
    setAdminCredentials((prev) => ({ ...prev, password: newPassword }));
    setUsers((prev) =>
      prev.map((u) => (u.role === 'Admin' ? { ...u, password: newPassword } : u))
    );
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      unitId: 'ALL-FLEET',
      event: 'Admin master password updated successfully',
      operator: 'Elena Rostova (Admin)',
      category: 'Security',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    return { success: true, message: 'Admin master password changed successfully.' };
  };

  const handleChangeUserUsername = (userId: string, newUsername: string) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return { success: false, message: 'Target user not found.' };

    const oldEmail = targetUser.email;
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, email: newUsername } : u))
    );
    if (oldEmail === growerCredentials.username) {
      setGrowerCredentials((prev) => ({ ...prev, username: newUsername }));
    }
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      unitId: targetUser.unitId,
      event: `Admin changed username for ${targetUser.name} from ${oldEmail} to ${newUsername}`,
      operator: 'Admin Console',
      category: 'Security',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    return { success: true, message: `Username for ${targetUser.name} updated to ${newUsername}` };
  };

  const handleChangeUserPassword = (userId: string, newPassword: string) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return { success: false, message: 'Target user not found.' };

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, password: newPassword } : u))
    );
    if (targetUser.email === growerCredentials.username) {
      setGrowerCredentials((prev) => ({ ...prev, password: newPassword }));
    }
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      unitId: targetUser.unitId,
      event: `Admin reset/changed password for operator ${targetUser.name} (${targetUser.email})`,
      operator: 'Admin Console',
      category: 'Security',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    return { success: true, message: `Password for ${targetUser.name} updated successfully.` };
  };

  const handleExploreDashboard = () => {
    if (userRole === 'guest') {
      setIsAuthModalOpen(true);
    } else if (userRole === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('grower');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {isMobileFrame ? (
          <MobileFrameWrapper
            unit={activeUnit}
            onUpdateUnit={handleUpdateUnit}
            alerts={alerts}
            onDismissAlert={handleDismissAlert}
            onOpenAdmin={() => {
              if (userRole === 'admin') {
                setIsMobileFrame(false);
                setActiveTab('admin');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
          />
        ) : (
          <>
            {(activeTab === 'landing' || activeTab === 'photosynthesis' || activeTab === 'sdgs') && (
              <LandingPage
                onExploreDashboard={handleExploreDashboard}
                onOpenMobileView={() => setIsMobileFrame(true)}
              />
            )}

            {activeTab === 'grower' && (
              <GrowerDashboard
                unit={activeUnit}
                onUpdateUnit={handleUpdateUnit}
                alerts={alerts}
                onDismissAlert={handleDismissAlert}
                currentGrowerUser={growerCredentials.username}
                currentGrowerPassword={growerCredentials.password}
                onChangeGrowerPassword={handleChangeGrowerPassword}
              />
            )}

            {activeTab === 'admin' && (
              <AdminDashboard
                units={units}
                users={users}
                tasks={tasks}
                batches={batches}
                auditLogs={auditLogs}
                onAddUser={handleAddUser}
                onToggleUserStatus={handleToggleUserStatus}
                onResetUserPin={handleResetUserPin}
                onAddTask={handleAddTask}
                onAddBatch={handleAddBatch}
                isAdminUnlocked={isAdminUnlocked}
                onUnlockAdmin={handleUnlockAdmin}
                adminUsername={adminCredentials.username}
                adminPassword={adminCredentials.password}
                onChangeAdminUsername={handleChangeAdminUsername}
                onChangeAdminPassword={handleChangeAdminPassword}
                onChangeUserUsername={handleChangeUserUsername}
                onChangeUserPassword={handleChangeUserPassword}
              />
            )}
          </>
        )}
      </main>

      {/* Enterprise Commercial Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-600 text-white">
              <Sprout className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-slate-800">AgriPulse Technologies</span>
            <span>·</span>
            <span>Alaska 20-Hour Photoperiod Urban Agriculture</span>
          </div>

          <div className="text-xs text-slate-600 font-medium">
            Design by <span className="font-bold text-slate-900">Yash Vaghani</span> & <span className="font-bold text-slate-900">Harsh Parmar</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
            <span>100% Solar-Powered Microgrids</span>
            <span>·</span>
            <span>Lowest Electricity Bills (₹0 Grid Draw)</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">UN SDGs 2, 7, 9, 11, 12, 13 Compliant</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal (Grower / Admin with 10-Digit PIN) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        adminCredentials={adminCredentials}
        growerCredentials={growerCredentials}
      />
    </div>
  );
}
