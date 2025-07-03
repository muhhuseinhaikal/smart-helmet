export interface HelmetData {
  id: string
  workerName: string

  // FSR402 Sensor Data
  fsrSensor: {
    currentValue: number // Current pressure reading (0-1023)
    forceNewtons: number // Force in Newtons (calculated from FSR value)
    status: "normal" | "pressed" | "impact" | "error"
    lastReading: any // Timestamp of last reading
    calibrated: boolean // Is sensor calibrated
    collisionDetected: boolean // Whether collision is currently detected
  }

  // Active Period Data
  activePeriod: {
    isActive: boolean // Currently active/working
    isBeingUsed: boolean // Whether helmet is currently being worn
    startTime: any // When work started today
    endTime: any // When work ended (if finished)
    totalHours: number // Total hours worked today
    breakTime: number // Total break time taken
    status: "working" | "break" | "offline" | "overtime"
    accumulatedUsage: number // Total usage hours across all time
  }

  // Battery Data
  battery: {
    percentage: number // Battery percentage (0-100)
    voltage: number // Current voltage
    isCharging: boolean // Is currently charging
    status: "normal" | "low" | "critical" | "charging"
    lastCharged: any // Last charge timestamp
  }

  // Location Data
  location: {
    lat: number // Latitude
    lng: number // Longitude
    accuracy: number // GPS accuracy in meters
    address: string // Human readable address
    inWorkArea: boolean // Is within work geofence
    lastUpdate: any // Last location update
  }

  // Collision Data
  collisionData: {
    totalCollisions: number // Total number of collisions detected
    lastCollisionForce: number // Force of last collision in Newtons
    lastCollisionTime: any // Timestamp of last collision
    collisionHistory: Array<{
      timestamp: any
      forceNewtons: number
      severity: "light" | "moderate" | "severe" | "critical"
    }>
  }

  // Metadata
  createdAt?: any
  updatedAt?: any
}

export interface AlertData {
  id: string
  helmetId: string
  type: "fsr" | "battery" | "location" | "period" | "collision"
  message: string
  priority: "low" | "medium" | "high" | "critical"
  timestamp: any
  isRead: boolean
  forceNewtons?: number // For collision alerts
}
