"use client"

import { useState, useEffect, useCallback } from "react"
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  limit,
  getDocs,
  writeBatch,
} from "firebase/firestore"
import { db } from "@/services/firebase"
import { collections, dataModels, realtimeConfig } from "@/config/firebase_config"
import type { HelmetData, AlertData, WorkerData } from "@/types/database"

export function useConfigurableFirebase() {
  const [helmets, setHelmets] = useState<HelmetData[]>([])
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [workers, setWorkers] = useState<WorkerData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("connecting")

  // Real-time helmet data listener
  useEffect(() => {
    if (!realtimeConfig.enableRealtime) return

    setConnectionStatus("connecting")

    const helmetsQuery = query(collection(db, collections.helmets), orderBy("createdAt", "desc"))

    const unsubscribeHelmets = onSnapshot(
      helmetsQuery,
      (snapshot) => {
        try {
          const helmetData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as HelmetData[]

          setHelmets(helmetData)
          setConnectionStatus("connected")
          setLoading(false)
          setError(null)
        } catch (err) {
          console.error("Error processing helmet data:", err)
          setError("Failed to process helmet data")
        }
      },
      (err) => {
        console.error("Error fetching helmets:", err)
        setError("Failed to connect to database")
        setConnectionStatus("disconnected")
        setLoading(false)
      },
    )

    return () => unsubscribeHelmets()
  }, [])

  // Real-time alerts listener
  useEffect(() => {
    if (!realtimeConfig.enableRealtime) return

    const alertsQuery = query(collection(db, collections.alerts), orderBy("createdAt", "desc"), limit(50))

    const unsubscribeAlerts = onSnapshot(
      alertsQuery,
      (snapshot) => {
        const alertData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as AlertData[]

        setAlerts(alertData)
      },
      (err) => {
        console.error("Error fetching alerts:", err)
      },
    )

    return () => unsubscribeAlerts()
  }, [])

  // Validate data against model
  const validateData = useCallback((data: any, modelType: keyof typeof dataModels) => {
    const model = dataModels[modelType]
    if (!model) return { isValid: true, errors: [] }

    const errors: string[] = []

    // Check required fields
    model.required.forEach((field: string) => {
      if (!data[field] && data[field] !== 0) {
        errors.push(`${field} is required`)
      }
    })

    // Validate field values
    Object.entries(model.validation || {}).forEach(([field, rules]: [string, any]) => {
      const value = data[field]
      if (value === undefined || value === null) return

      if (Array.isArray(rules)) {
        // Enum validation
        if (!rules.includes(value)) {
          errors.push(`${field} must be one of: ${rules.join(", ")}`)
        }
      } else if (typeof rules === "object") {
        // Range validation
        if (rules.min !== undefined && value < rules.min) {
          errors.push(`${field} must be at least ${rules.min}`)
        }
        if (rules.max !== undefined && value > rules.max) {
          errors.push(`${field} must be at most ${rules.max}`)
        }
      }
    })

    return { isValid: errors.length === 0, errors }
  }, [])

  // Add default values to data
  const addDefaults = useCallback((data: any, modelType: keyof typeof dataModels) => {
    const model = dataModels[modelType]
    if (!model?.defaults) return data

    return {
      ...model.defaults,
      ...data,
    }
  }, [])

  // CRUD Operations
  const addHelmet = async (helmetData: Omit<HelmetData, "id">) => {
    try {
      const dataWithDefaults = addDefaults(helmetData, "helmet")
      const validation = validateData(dataWithDefaults, "helmet")

      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(", ")}`)
      }

      await addDoc(collection(db, collections.helmets), {
        ...dataWithDefaults,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    } catch (err) {
      console.error("Error adding helmet:", err)
      throw err
    }
  }

  const updateHelmet = async (helmetId: string, data: Partial<HelmetData>) => {
    try {
      const validation = validateData(data, "helmet")
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(", ")}`)
      }

      const helmetRef = doc(db, collections.helmets, helmetId)
      await updateDoc(helmetRef, {
        ...data,
        updatedAt: serverTimestamp(),
      })
    } catch (err) {
      console.error("Error updating helmet:", err)
      throw err
    }
  }

  const deleteHelmet = async (helmetId: string) => {
    try {
      await deleteDoc(doc(db, collections.helmets, helmetId))
    } catch (err) {
      console.error("Error deleting helmet:", err)
      throw err
    }
  }

  const addAlert = async (alertData: Omit<AlertData, "id">) => {
    try {
      const dataWithDefaults = addDefaults(alertData, "alert")
      const validation = validateData(dataWithDefaults, "alert")

      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(", ")}`)
      }

      await addDoc(collection(db, collections.alerts), {
        ...dataWithDefaults,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    } catch (err) {
      console.error("Error adding alert:", err)
      throw err
    }
  }

  const markAlertAsRead = async (alertId: string) => {
    try {
      const alertRef = doc(db, collections.alerts, alertId)
      await updateDoc(alertRef, {
        isRead: true,
        updatedAt: serverTimestamp(),
      })
    } catch (err) {
      console.error("Error marking alert as read:", err)
      throw err
    }
  }

  // Bulk operations
  const bulkUpdateHelmets = async (updates: Array<{ id: string; data: Partial<HelmetData> }>) => {
    try {
      const batch = writeBatch(db)

      updates.forEach(({ id, data }) => {
        const helmetRef = doc(db, collections.helmets, id)
        batch.update(helmetRef, {
          ...data,
          updatedAt: serverTimestamp(),
        })
      })

      await batch.commit()
    } catch (err) {
      console.error("Error bulk updating helmets:", err)
      throw err
    }
  }

  // Analytics queries
  const getHelmetsByStatus = async (status: string) => {
    try {
      const q = query(collection(db, collections.helmets), where("impactStatus", "==", status))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as HelmetData[]
    } catch (err) {
      console.error("Error getting helmets by status:", err)
      throw err
    }
  }

  const getAlertsByType = async (type: string, limitCount = 10) => {
    try {
      const q = query(
        collection(db, collections.alerts),
        where("type", "==", type),
        orderBy("createdAt", "desc"),
        limit(limitCount),
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as AlertData[]
    } catch (err) {
      console.error("Error getting alerts by type:", err)
      throw err
    }
  }

  // Simulate real-time updates (for testing)
  const simulateImpact = async (helmetId: string) => {
    const helmet = helmets.find((h) => h.id === helmetId)
    if (!helmet) return

    await updateHelmet(helmetId, {
      impactStatus: "warning",
      ledStatus: "red",
      impactCount: helmet.impactCount + 1,
    })

    await addAlert({
      type: "impact",
      message: `Impact detected on ${helmet.workerName}'s helmet! Location: ${helmet.location.address}`,
      helmetId: helmetId,
      priority: "high",
    })

    // Reset after delay
    setTimeout(async () => {
      await updateHelmet(helmetId, {
        impactStatus: "normal",
        ledStatus: helmet.isActive ? "green" : "off",
      })
    }, 10000)
  }

  return {
    // Data
    helmets,
    alerts,
    workers,
    loading,
    error,
    connectionStatus,

    // CRUD Operations
    addHelmet,
    updateHelmet,
    deleteHelmet,
    addAlert,
    markAlertAsRead,
    bulkUpdateHelmets,

    // Analytics
    getHelmetsByStatus,
    getAlertsByType,

    // Utilities
    simulateImpact,
    validateData,
    addDefaults,
  }
}
