"use client"

import { useState, useEffect } from "react"
import { collection, onSnapshot, doc, updateDoc, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { collections, helmetVariables } from "@/config/firebase_config"
import type { HelmetData, AlertData } from "@/types/helmet"

export function useHelmetRealtime() {
  const [helmets, setHelmets] = useState<HelmetData[]>([])
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)

  // Real-time helmet data listener
  useEffect(() => {
    const helmetsQuery = query(collection(db, collections.helmets), orderBy("updatedAt", "desc"))

    const unsubscribe = onSnapshot(
      helmetsQuery,
      (snapshot) => {
        const helmetData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as HelmetData[]

        setHelmets(helmetData)
        setConnected(true)
        setLoading(false)

        // Check for alerts
        helmetData.forEach((helmet) => checkHelmetAlerts(helmet))
      },
      (error) => {
        console.error("Firebase connection error:", error)
        setConnected(false)
      },
    )

    return () => unsubscribe()
  }, [])

  // Real-time alerts listener
  useEffect(() => {
    const alertsQuery = query(collection(db, collections.alerts), orderBy("timestamp", "desc"))

    const unsubscribe = onSnapshot(alertsQuery, (snapshot) => {
      const alertData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AlertData[]

      setAlerts(alertData)
    })

    return () => unsubscribe()
  }, [])

  // Check helmet conditions and create alerts
  const checkHelmetAlerts = async (helmet: HelmetData) => {
    // FSR Sensor Alert
    if (helmet.fsrSensor.currentValue > helmetVariables.fsrSensor.threshold) {
      await addAlert({
        helmetId: helmet.id,
        type: "fsr",
        message: `High pressure detected on ${helmet.workerName}'s helmet (${helmet.fsrSensor.currentValue})`,
        priority: "high",
      })
    }

    // Battery Alert
    if (helmet.battery.percentage <= helmetVariables.battery.criticalThreshold) {
      await addAlert({
        helmetId: helmet.id,
        type: "battery",
        message: `Critical battery level for ${helmet.workerName} (${helmet.battery.percentage}%)`,
        priority: "critical",
      })
    } else if (helmet.battery.percentage <= helmetVariables.battery.lowThreshold) {
      await addAlert({
        helmetId: helmet.id,
        type: "battery",
        message: `Low battery for ${helmet.workerName} (${helmet.battery.percentage}%)`,
        priority: "medium",
      })
    }

    // Location Alert
    if (!helmet.location.inWorkArea) {
      await addAlert({
        helmetId: helmet.id,
        type: "location",
        message: `${helmet.workerName} is outside work area`,
        priority: "medium",
      })
    }

    // Active Period Alert
    if (helmet.activePeriod.totalHours > helmetVariables.activePeriod.maxWorkHours) {
      await addAlert({
        helmetId: helmet.id,
        type: "period",
        message: `${helmet.workerName} exceeded maximum work hours (${helmet.activePeriod.totalHours}h)`,
        priority: "high",
      })
    }
  }

  // Update helmet variables
  const updateHelmetVariable = async (helmetId: string, variable: string, value: any) => {
    try {
      const helmetRef = doc(db, collections.helmets, helmetId)
      await updateDoc(helmetRef, {
        [variable]: value,
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      console.error("Error updating helmet:", error)
      throw error
    }
  }

  // Update FSR sensor
  const updateFSRSensor = async (helmetId: string, fsrData: Partial<HelmetData["fsrSensor"]>) => {
    await updateHelmetVariable(helmetId, "fsrSensor", fsrData)
  }

  // Update battery
  const updateBattery = async (helmetId: string, batteryData: Partial<HelmetData["battery"]>) => {
    await updateHelmetVariable(helmetId, "battery", batteryData)
  }

  // Update location
  const updateLocation = async (helmetId: string, locationData: Partial<HelmetData["location"]>) => {
    await updateHelmetVariable(helmetId, "location", locationData)
  }

  // Update active period
  const updateActivePeriod = async (helmetId: string, periodData: Partial<HelmetData["activePeriod"]>) => {
    await updateHelmetVariable(helmetId, "activePeriod", periodData)
  }

  // Add alert
  const addAlert = async (alertData: Omit<AlertData, "id">) => {
    try {
      await addDoc(collection(db, collections.alerts), {
        ...alertData,
        timestamp: serverTimestamp(),
        isRead: false,
      })
    } catch (error) {
      console.error("Error adding alert:", error)
    }
  }

  // Mark alert as read
  const markAlertRead = async (alertId: string) => {
    try {
      const alertRef = doc(db, collections.alerts, alertId)
      await updateDoc(alertRef, { isRead: true })
    } catch (error) {
      console.error("Error marking alert as read:", error)
    }
  }

  return {
    helmets,
    alerts,
    loading,
    connected,
    updateFSRSensor,
    updateBattery,
    updateLocation,
    updateActivePeriod,
    markAlertRead,
  }
}
