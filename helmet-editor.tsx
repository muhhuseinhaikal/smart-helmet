"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Plus, Trash2, Zap, RotateCcw } from "lucide-react"
import { type HelmetData, useFirebaseHelmets } from "@/hooks/useFirebaseHelmets"
import { toast } from "@/hooks/use-toast"

interface HelmetEditorProps {
  helmet?: HelmetData
  isNew?: boolean
}

export function HelmetEditor({ helmet, isNew = false }: HelmetEditorProps) {
  const { updateHelmet, addHelmet, deleteHelmet, simulateImpact } = useFirebaseHelmets()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<Partial<HelmetData>>({
    workerName: helmet?.workerName || "",
    isActive: helmet?.isActive || false,
    batteryLevel: helmet?.batteryLevel || 100,
    location: helmet?.location || {
      lat: -6.2088,
      lng: 106.8456,
      address: "Construction Site A, Jakarta",
    },
    impactStatus: helmet?.impactStatus || "normal",
    ledStatus: helmet?.ledStatus || "off",
    impactCount: helmet?.impactCount || 0,
    workingHours: helmet?.workingHours || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isNew) {
        await addHelmet(formData as Omit<HelmetData, "id">)
        toast({
          title: "Success",
          description: "New helmet added successfully",
        })
      } else if (helmet) {
        await updateHelmet(helmet.id, formData)
        toast({
          title: "Success",
          description: "Helmet updated successfully",
        })
      }
      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save helmet data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!helmet) return

    setLoading(true)
    try {
      await deleteHelmet(helmet.id)
      toast({
        title: "Success",
        description: "Helmet deleted successfully",
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete helmet",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSimulateImpact = async () => {
    if (!helmet) return

    try {
      await simulateImpact(helmet.id)
      toast({
        title: "Impact Simulated",
        description: `Impact alert sent for ${helmet.workerName}'s helmet`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to simulate impact",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isNew ? (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Helmet
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add New Helmet" : `Edit ${helmet?.workerName}'s Helmet`}</DialogTitle>
          <DialogDescription>
            {isNew ? "Add a new smart helmet to the monitoring system" : "Update helmet configuration and status"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workerName">Worker Name</Label>
                <Input
                  id="workerName"
                  value={formData.workerName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, workerName: e.target.value }))}
                  placeholder="Enter worker name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="batteryLevel">Battery Level (%)</Label>
                <Input
                  id="batteryLevel"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.batteryLevel}
                  onChange={(e) => setFormData((prev) => ({ ...prev, batteryLevel: Number.parseInt(e.target.value) }))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: checked,
                    ledStatus: checked ? "green" : "off",
                  }))
                }
              />
              <Label htmlFor="isActive">Helmet Active</Label>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location</h3>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.location?.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location!, address: e.target.value },
                  }))
                }
                placeholder="Enter location address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.location?.lat}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: { ...prev.location!, lat: Number.parseFloat(e.target.value) },
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.location?.lng}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: { ...prev.location!, lng: Number.parseFloat(e.target.value) },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Status</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="impactStatus">Impact Status</Label>
                <Select
                  value={formData.impactStatus}
                  onValueChange={(value: "normal" | "warning" | "critical") =>
                    setFormData((prev) => ({ ...prev, impactStatus: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ledStatus">LED Status</Label>
                <Select
                  value={formData.ledStatus}
                  onValueChange={(value: "green" | "red" | "off") =>
                    setFormData((prev) => ({ ...prev, ledStatus: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="off">Off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="impactCount">Impact Count</Label>
                <Input
                  id="impactCount"
                  type="number"
                  min="0"
                  value={formData.impactCount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, impactCount: Number.parseInt(e.target.value) }))}
                />
              </div>

              <div>
                <Label htmlFor="workingHours">Working Hours</Label>
                <Input
                  id="workingHours"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.workingHours}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, workingHours: Number.parseFloat(e.target.value) }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <div className="space-x-2">
              {!isNew && (
                <>
                  <Button type="button" variant="outline" onClick={handleSimulateImpact} disabled={loading}>
                    <Zap className="h-4 w-4 mr-2" />
                    Simulate Impact
                  </Button>

                  <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>

            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? <RotateCcw className="h-4 w-4 mr-2 animate-spin" /> : null}
                {isNew ? "Add Helmet" : "Update Helmet"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
