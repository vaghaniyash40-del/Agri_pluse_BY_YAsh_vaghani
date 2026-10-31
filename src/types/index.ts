export type UserRole = 'grower' | 'admin' | 'guest';

export interface FarmUnit {
  id: string;
  name: string;
  type: 'Vertical Tower' | 'Container Pod' | 'Mobile Solar Grid';
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'nominal' | 'warning' | 'offline';
  batteryPct: number;
  solarWatts: number;
  tempC: number;
  humidityPct: number;
  co2Ppm: number;
  vpdKpa: number;
  lightOn: boolean;
  intensityPct: number;
  spectrum: string;
  pulseHz: number;
  activeCrop: string;
  projectedHarvestDate: string;
  racksCount: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  pin: string; // 10-digit PIN
  unitId: string;
  role: 'Grower' | 'Shift Lead' | 'Agronomist' | 'Admin';
  status: 'active' | 'suspended';
  createdAt: string;
  password?: string;
}

export interface MaintenanceTask {
  id: string;
  routine: 'Nutrient Flush' | 'UV Glass Cleaning' | 'Harvesting' | 'Pruning & Defoliation' | 'LED Diode Inspection';
  unitId: string;
  assignee: string;
  date: string;
  laborHours: number;
  hourlyRate: number;
  materialsCost: number;
  totalCost: number;
  status: 'scheduled' | 'in_progress' | 'completed';
  notes?: string;
}

export interface CropBatch {
  id: string;
  cropName: string;
  variety: string;
  unitId: string;
  rackLevel: string;
  plantedDate: string;
  projectedHarvestDate: string;
  expectedYieldKg: number;
  currentStage: 'Seedling' | 'Vegetative' | 'Canopy Expansion' | 'Ready for Harvest';
  healthPct: number;
}

export interface HardwareAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  unitId: string;
  resolved: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  unitId: string;
  event: string;
  operator: string;
  category: 'Override' | 'Schedule' | 'Power' | 'Security';
}
