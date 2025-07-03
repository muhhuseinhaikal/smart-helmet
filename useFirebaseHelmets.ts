"use client"

import { useState, useEffect } from "react"
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
} from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface HelmetData {
  id: string
  workerName: string
  isActive: boolean
  batteryLevel: number
  location: {
    lat: number
    lng: number
    address: string
  }
  impactStatus: "normal" | "warning" | "critical"
  ledStatus: "green" | "red" | "off"
  lastUpdate: any
  impactCount: number
  workingHours: number
  createdAt?: any
}

export interface AlertData {
  id: string
  type: "impact" | "battery" | "offline"
  message: string
  timestamp: any
  helmetId: string
  isRead: boolean
}

export function useFirebaseHelmets() {
  const [helmets, setHelmets] = useState<HelmetData[]>([])
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Real-time helmet data listener
  useEffect(() => {
    const helmetsQuery = query(collection(db, "helmets"), orderBy("createdAt", "desc"))

    const unsubscribeHelmets = onSnapshot(
      helmetsQuery,
      (snapshot) => {
        const helmetData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as HelmetData[]

        setHelmets(helmetData)
        setLoading(false)
      },
      (err) => {
        console.error("Error fetching helmets:", err)
        setError("Failed to fetch helmet data")
        setLoading(false)
      },
    )

    return () => unsubscribeHelmets()
  }, [])

  // Real-time alerts listener
  useEffect(() => {
    const alertsQuery = query(collection(db, "alerts"), orderBy("timestamp", "desc"))

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

  // Update helmet data
  const updateHelmet = async (helmetId: string, data: Partial<HelmetData>) => {
    try {
      const helmetRef = doc(db, "helmets", helmetId)
      await updateDoc(helmetRef, {
        ...data,
        lastUpdate: serverTimestamp(),
      })
    } catch (err) {
      console.error("Error updating helmet:", err)
      throw new Error("Failed to update helmet data")
    }
  }

  // Add new helmet
  const addHelmet = async (helmetData: Omit<HelmetData, "id">) => {
    try {
      await addDoc(collection(db, "helmets"), {
        ...helmetData,
        createdAt: serverTimestamp(),
        lastUpdate: serverTimestamp(),
      })
    } catch (err) {
      console.error("Error adding helmet:", err)
      throw new Error("Failed to add helmet")
    }
  }

  // Delete helmet
  const deleteHelmet = async (helmetId: string) => {
    try {
      await deleteDoc(doc(db, "helmets", helmetId))
    } catch (err) {
      console.error("Error deleting helmet:", err)
      throw new Error("Failed to delete helmet")
    }
  }

  // Add alert
  const addAlert = async (alertData: Omit<AlertData, "id">) => {
    try {
      await addDoc(collection(db, "alerts"), {
        ...alertData,
        timestamp: serverTimestamp(),
        isRead: false,
      })
    } catch (err) {
      console.error("Error adding alert:", err)
    }
  }

  // Mark alert as read
  const markAlertAsRead = async (alertId: string) => {
    try {
      const alertRef = doc(db, "alerts", alertId)
      await updateDoc(alertRef, { isRead: true })
    } catch (err) {
      console.error("Error marking alert as read:", err)
    }
  }

  // Simulate impact detection
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
    })

    // Reset impact status after 10 seconds
    setTimeout(async () => {
      await updateHelmet(helmetId, {
        impactStatus: "normal",
        ledStatus: helmet.isActive ? "green" : "off",
      })
    }, 10000)
  }

  return {
    helmets,
    alerts,
    loading,
    error,
    updateHelmet,
    addHelmet,
    deleteHelmet,
    addAlert,
    markAlertAsRead,
    simulateImpact,
  }
}
