"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Gauge, Battery, MapPin, Clock } from "lucide-react"
import type { HelmetData } from "@/types/helmet"

interface VariableEditorProps {
  helmet: HelmetData
  onUpdateFSR: (helmetId: string, data: any) => Promise<void>
  onUpdateBattery: (helmetId: string, data: any) => Promise<void>
  onUpdateLocation: (helmetId: string, data: any) => Promise<void>
  onUpdatePeriod: (helmetId: string, data: any) => Promise<void>
}

export function VariableEditor({
  helmet,
  onUpdateFSR,
  onUpdateBattery,
  onUpdateLocation,
  onUpdatePeriod,
}: VariableEditorProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // FSR Sensor Update
  const handleFSRUpdate = async (field: string, value: any) => {
    setLoading(true)
    try {
      await onUpdateFSR(helmet.id, {
        ...helmet.fsrSensor,
        [field]: value,
        lastReading: new Date(),
      })
    } catch (error) {
      console.error("FSR update error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Battery Update
  const handleBatteryUpdate = async (field: string, value: any) => {
    setLoading(true)
    try {
      const status = value <= 10 ? "critical" : value <= 20 ? "low" : "normal"
      await onUpdateBattery(helmet.id, {
        ...helmet.battery,
        [field]: value,
        status: field === "percentage" ? status : helmet.battery.status,
      })
    } catch (error) {
      console.error("Battery update error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Location Update
  const handleLocationUpdate = async (field: string, value: any) => {
    setLoading(true)
    try {
      await onUpdateLocation(helmet.id, {
        ...helmet.location,
        [field]: value,
        lastUpdate: new Date(),
      })
    } catch (error) {
      console.error("Location update error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Active Period Update
  const handlePeriodUpdate = async (field: string, value: any) => {
    setLoading(true)
    try {
      await onUpdatePeriod(helmet.id, {
        ...helmet.activePeriod,
        [field]: value,
      })
    } catch (error) {
      console.error("Period update error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit Variabel
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Variabel Helm {helmet.workerName}</DialogTitle>
          <DialogDescription>
            Modifikasi variabel real-time untuk sensor FSR, baterai, lokasi, dan periode aktif
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* FSR402 Sensor Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Gauge className="h-5 w-5" />
                <span>Sensor FSR402</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nilai Saat Ini (0-1023)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="1023"
                    value={helmet.fsrSensor.currentValue}
                    onChange={(e) => handleFSRUpdate("currentValue", Number.parseInt(e.target.value))}
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge
                    variant={
                      helmet.fsrSensor.status === "impact"
                        ? "destructive"
                        : helmet.fsrSensor.status === "pressed"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {helmet.fsrSensor.status === "normal"
                      ? "Normal"
                      : helmet.fsrSensor.status === "pressed"
                        ? "Tertekan"
                        : helmet.fsrSensor.status === "impact"
                          ? "Benturan"
                          : "Error"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={helmet.fsrSensor.calibrated}
                  onCheckedChange={(checked) => handleFSRUpdate("calibrated", checked)}
                  disabled={loading}
                />
                <Label>Sensor Terkalibrasi</Label>
              </div>
            </CardContent>
          </Card>

          {/* Battery Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Battery className="h-5 w-5" />
                <span>Status Baterai</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Persentase Baterai</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={helmet.battery.percentage}
                    onChange={(e) => handleBatteryUpdate("percentage", Number.parseInt(e.target.value))}
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label>Tegangan</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={helmet.battery.voltage}
                    onChange={(e) => handleBatteryUpdate("voltage", Number.parseFloat(e.target.value))}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={helmet.battery.isCharging}
                  onCheckedChange={(checked) => handleBatteryUpdate("isCharging", checked)}
                  disabled={loading}
                />
                <Label>Sedang Mengisi</Label>
              </div>
            </CardContent>
          </Card>

          {/* Location Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <MapPin className="h-5 w-5" />
                <span>Data Lokasi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Lintang</Label>
                  <Input
                    type="number"
                    step="any"
                    value={helmet.location.lat}
                    onChange={(e) => handleLocationUpdate("lat", Number.parseFloat(e.target.value))}
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label>Bujur</Label>
                  <Input
                    type="number"
                    step="any"
                    value={helmet.location.lng}
                    onChange={(e) => handleLocationUpdate("lng", Number.parseFloat(e.target.value))}
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <Label>Alamat</Label>
                <Input
                  value={helmet.location.address}
                  onChange={(e) => handleLocationUpdate("address", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={helmet.location.inWorkArea}
                  onCheckedChange={(checked) => handleLocationUpdate("inWorkArea", checked)}
                  disabled={loading}
                />
                <Label>Di Area Kerja</Label>
              </div>
            </CardContent>
          </Card>

          {/* Active Period Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Clock className="h-5 w-5" />
                <span>Periode Aktif</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Total Jam Hari Ini</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={helmet.activePeriod.totalHours}
                    onChange={(e) => handlePeriodUpdate("totalHours", Number.parseFloat(e.target.value))}
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label>Waktu Istirahat (menit)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={helmet.activePeriod.breakTime}
                    onChange={(e) => handlePeriodUpdate("breakTime", Number.parseInt(e.target.value))}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={helmet.activePeriod.isActive}
                  onCheckedChange={(checked) => handlePeriodUpdate("isActive", checked)}
                  disabled={loading}
                />
                <Label>Sedang Aktif</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
