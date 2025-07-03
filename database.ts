// Base interface that can be extended
export interface BaseDocument {
  id: string
  createdAt?: any
  updatedAt?: any
}

// Dynamic helmet interface based on configuration
export interface HelmetData extends BaseDocument {
  workerName: string
  isActive: boolean
  batteryLevel: number
  location: LocationData
  impactStatus: "normal" | "warning" | "critical"
  ledStatus: "green" | "red" | "off" | "blue" | "yellow"
  impactCount: number
  workingHours: number
  safetyScore?: number
  lastMaintenance?: any
  firmwareVersion?: string
  customFields?: Record<string, any> // For additional custom fields
}

export interface LocationData {
  lat: number
  lng: number
  address: string
  accuracy?: number
  altitude?: number
  speed?: number
}

export interface AlertData extends BaseDocument {
  type: "impact" | "battery" | "offline" | "maintenance" | "geofence"
  message: string
  helmetId: string
  isRead: boolean
  priority: "low" | "medium" | "high" | "critical"
  resolved: boolean
  resolvedBy?: string
  resolvedAt?: any
}

export interface WorkerData extends BaseDocument {
  name: string
  employeeId: string
  department: string
  shift: string
  helmetId?: string
  contactInfo?: {
    phone?: string
    email?: string
    emergencyContact?: string
  }
}

// Configuration types
export interface DatabaseConfig {
  collections: Record<string, string>
  dataModels: Record<string, any>
  fieldMappings: Record<string, Record<string, string>>
}
