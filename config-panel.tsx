"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, Database, Wifi, Code, Download, Upload } from "lucide-react"
import { firebaseConfig, collections, realtimeConfig, dataModels } from "@/config/firebase_config"

export function ConfigPanel() {
  const [config, setConfig] = useState({
    firebase: firebaseConfig,
    collections: collections,
    realtime: realtimeConfig,
    models: dataModels,
  })

  const exportConfig = () => {
    const configData = JSON.stringify(config, null, 2)
    const blob = new Blob([configData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "firebase_config.json"
    a.click()
  }

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedConfig = JSON.parse(e.target?.result as string)
        setConfig(importedConfig)
      } catch (error) {
        console.error("Error importing config:", error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configuration
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Firebase Configuration Panel</DialogTitle>
          <DialogDescription>
            Modify your Firebase settings, database models, and real-time configuration
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="firebase" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="firebase">Firebase</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="models">Data Models</TabsTrigger>
            <TabsTrigger value="export">Import/Export</TabsTrigger>
          </TabsList>

          <TabsContent value="firebase" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wifi className="h-5 w-5" />
                  <span>Firebase Connection</span>
                </CardTitle>
                <CardDescription>Configure your Firebase project settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      value={config.firebase.apiKey}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          firebase: { ...prev.firebase, apiKey: e.target.value },
                        }))
                      }
                      placeholder="Your Firebase API Key"
                    />
                  </div>
                  <div>
                    <Label htmlFor="authDomain">Auth Domain</Label>
                    <Input
                      id="authDomain"
                      value={config.firebase.authDomain}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          firebase: { ...prev.firebase, authDomain: e.target.value },
                        }))
                      }
                      placeholder="your-project.firebaseapp.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectId">Project ID</Label>
                    <Input
                      id="projectId"
                      value={config.firebase.projectId}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          firebase: { ...prev.firebase, projectId: e.target.value },
                        }))
                      }
                      placeholder="your-project-id"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storageBucket">Storage Bucket</Label>
                    <Input
                      id="storageBucket"
                      value={config.firebase.storageBucket}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          firebase: { ...prev.firebase, storageBucket: e.target.value },
                        }))
                      }
                      placeholder="your-project.appspot.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableRealtime"
                      checked={config.realtime.enableRealtime}
                      onCheckedChange={(checked) =>
                        setConfig((prev) => ({
                          ...prev,
                          realtime: { ...prev.realtime, enableRealtime: checked },
                        }))
                      }
                    />
                    <Label htmlFor="enableRealtime">Enable Real-time Updates</Label>
                  </div>

                  <div>
                    <Label htmlFor="updateInterval">Update Interval (ms)</Label>
                    <Input
                      id="updateInterval"
                      type="number"
                      value={config.realtime.updateInterval}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          realtime: { ...prev.realtime, updateInterval: Number.parseInt(e.target.value) },
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Database Collections</span>
                </CardTitle>
                <CardDescription>Configure your Firestore collection names</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(config.collections).map(([key, value]) => (
                  <div key={key}>
                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)} Collection</Label>
                    <Input
                      id={key}
                      value={value}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          collections: { ...prev.collections, [key]: e.target.value },
                        }))
                      }
                      placeholder={`Collection name for ${key}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Data Models</span>
                </CardTitle>
                <CardDescription>View and modify your data structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(config.models).map(([modelName, model]: [string, any]) => (
                  <div key={modelName} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 capitalize">{modelName} Model</h4>

                    <div className="space-y-2">
                      <div>
                        <Label className="text-sm font-medium">Required Fields:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {model.required?.map((field: string) => (
                            <Badge key={field} variant="destructive">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Default Fields:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.keys(model.defaults || {}).map((field: string) => (
                            <Badge key={field} variant="secondary">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Validation Rules:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.keys(model.validation || {}).map((field: string) => (
                            <Badge key={field} variant="outline">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Management</CardTitle>
                <CardDescription>Export or import your configuration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <Button onClick={exportConfig} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export Configuration
                  </Button>

                  <div className="flex-1">
                    <Label htmlFor="import-config" className="cursor-pointer">
                      <Button asChild className="w-full">
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Import Configuration
                        </span>
                      </Button>
                    </Label>
                    <Input id="import-config" type="file" accept=".json" onChange={importConfig} className="hidden" />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Current Configuration Preview:</h4>
                  <pre className="text-xs overflow-auto max-h-40 bg-white p-2 rounded border">
                    {JSON.stringify(config, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
