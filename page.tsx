"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Login } from "@/components/login"
import { VariableEditor } from "@/components/variable-editor"
import { ComponentInfo } from "@/components/component-info"
import { AboutProject } from "@/components/about-project"
import { useHelmetRealtime } from "@/hooks/useHelmetRealtime"
import { Toaster } from "@/components/ui/toaster"
import {
  HardHat,
  Wifi,
  WifiOff,
  Gauge,
  Battery,
  MapPin,
  Clock,
  AlertTriangle,
  User,
  LogOut,
  Shield,
  Zap,
  Activity,
  Satellite,
  TrendingUp,
  BarChart3,
} from "lucide-react"

export default function SmartHelmetMonitoring() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const {
    helmets,
    alerts,
    loading,
    connected,
    updateFSRSensor,
    updateBattery,
    updateLocation,
    updateActivePeriod,
    markAlertRead,
  } = useHelmetRealtime()

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "Tidak diketahui"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Baru saja"
    if (diffMins < 60) return `${diffMins} menit lalu`
    return date.toLocaleTimeString()
  }

  // Calculate force in Newtons from FSR value (0-1023 to 0-20N)
  const calculateForceNewtons = (fsrValue: number) => {
    return ((fsrValue / 1023) * 20).toFixed(2)
  }

  // Determine collision severity
  const getCollisionSeverity = (forceNewtons: number) => {
    if (forceNewtons < 2) return "normal"
    if (forceNewtons < 5) return "light"
    if (forceNewtons < 10) return "moderate"
    if (forceNewtons < 15) return "severe"
    return "critical"
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Futuristic Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/pnup-logo.png')`,
              filter: "blur(8px) brightness(0.2)",
              transform: "scale(1.1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-blue-900/80 to-purple-900/80" />
        </div>

        <div className="relative z-10 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Skeleton className="h-20 w-full mb-6 bg-white/10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-96 bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Futuristic Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/pnup-logo.png')`,
            filter: "blur(8px) brightness(0.2)",
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-blue-900/80 to-purple-900/80" />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Futuristic Header */}
        <header className="bg-black/40 backdrop-blur-xl shadow-lg border-b border-cyan-500/30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-xl shadow-lg shadow-cyan-500/25">
                  <HardHat className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    SMART HELMET MONITORING
                  </h1>
                  <p className="text-sm text-cyan-300">Politeknik Negeri Ujung Pandang - Advanced IoT Safety System</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-black/30 rounded-full border border-cyan-500/30">
                  {connected ? (
                    <Wifi className="h-4 w-4 text-green-400" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-sm font-medium text-white">{connected ? "ONLINE" : "OFFLINE"}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="bg-black/30 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-black/40 backdrop-blur-xl border border-cyan-500/30">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                Dashboard & Peta
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                Analitik & Statistik
              </TabsTrigger>
              <TabsTrigger
                value="components"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                Komponen
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                Tentang Proyek
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* System Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-cyan-300">Helm Aktif</CardTitle>
                    <Shield className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">
                      {helmets.filter((h) => h.activePeriod.isBeingUsed).length}/{helmets.length}
                    </div>
                    <p className="text-xs text-cyan-400/70">Sedang digunakan</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-cyan-300">Total Benturan</CardTitle>
                    <Zap className="h-4 w-4 text-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-400">
                      {helmets.reduce((sum, h) => sum + (h.collisionData?.totalCollisions || 0), 0)}
                    </div>
                    <p className="text-xs text-cyan-400/70">Terdeteksi total</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-cyan-300">Rata-rata Baterai</CardTitle>
                    <Battery className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-400">
                      {helmets.length > 0
                        ? Math.round(helmets.reduce((sum, h) => sum + h.battery.percentage, 0) / helmets.length)
                        : 0}
                      %
                    </div>
                    <p className="text-xs text-cyan-400/70">Level daya sistem</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-cyan-300">Jam Kerja</CardTitle>
                    <Clock className="h-4 w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-400">
                      {helmets.reduce((sum, h) => sum + h.activePeriod.totalHours, 0).toFixed(1)}j
                    </div>
                    <p className="text-xs text-cyan-400/70">Total hari ini</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-cyan-300">Benturan Aktif</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-400">
                      {helmets.filter((h) => h.fsrSensor?.collisionDetected).length}
                    </div>
                    <p className="text-xs text-cyan-400/70">Sedang terjadi</p>
                  </CardContent>
                </Card>
              </div>

              {/* Integrated Map Section */}
              <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-cyan-300">
                    <Satellite className="h-6 w-6 text-green-400" />
                    <span>Peta Lokasi Real-time (GPS NEO M8N)</span>
                  </CardTitle>
                  <CardDescription className="text-cyan-400/70">
                    Pelacakan langsung semua helm pintar yang terhubung
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-lg h-96 flex items-center justify-center relative overflow-hidden border border-cyan-500/20">
                    {/* Futuristic grid background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                        {Array.from({ length: 48 }).map((_, i) => (
                          <div key={i} className="border border-cyan-400/30"></div>
                        ))}
                      </div>
                    </div>

                    {/* Helmet locations with futuristic styling */}
                    {helmets.map((helmet, index) => (
                      <div
                        key={helmet.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                          index % 4 === 0
                            ? "top-1/4 left-1/4"
                            : index % 4 === 1
                              ? "top-1/4 right-1/4"
                              : index % 4 === 2
                                ? "bottom-1/4 left-1/4"
                                : "bottom-1/4 right-1/4"
                        }`}
                      >
                        <div className="relative">
                          <div
                            className={`w-8 h-8 rounded-full ${
                              helmet.activePeriod.isBeingUsed
                                ? helmet.fsrSensor?.collisionDetected
                                  ? "bg-gradient-to-br from-red-400 to-red-600"
                                  : "bg-gradient-to-br from-green-400 to-green-600"
                                : "bg-gradient-to-br from-gray-400 to-gray-600"
                            } border-2 border-white shadow-lg ${
                              helmet.activePeriod.isBeingUsed ? "animate-pulse shadow-green-400/50" : ""
                            } ${
                              helmet.fsrSensor?.collisionDetected ? "animate-ping shadow-red-400/50" : ""
                            } flex items-center justify-center`}
                          >
                            <div className="w-3 h-3 bg-white rounded-full" />
                          </div>
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-xs whitespace-nowrap text-cyan-300 border border-cyan-500/30">
                            {helmet.workerName}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="text-center z-10">
                      <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-4 rounded-full mb-4 shadow-lg shadow-cyan-500/25">
                        <MapPin className="h-12 w-12 text-white" />
                      </div>
                      <p className="text-cyan-300 font-medium text-lg">Lokasi Konstruksi PNUP</p>
                      <p className="text-sm text-cyan-400/70">Pelacakan Real-time GPS NEO M8N</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts Section */}
              {alerts.length > 0 && (
                <div className="space-y-2">
                  {alerts.slice(0, 3).map((alert) => (
                    <Alert
                      key={alert.id}
                      className={`cursor-pointer bg-black/40 backdrop-blur-xl border ${
                        alert.priority === "critical"
                          ? "border-red-500/50 bg-red-900/20"
                          : alert.priority === "high"
                            ? "border-orange-500/50 bg-orange-900/20"
                            : "border-yellow-500/50 bg-yellow-900/20"
                      } ${alert.isRead ? "opacity-60" : ""} shadow-lg`}
                      onClick={() => markAlertRead(alert.id)}
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="flex items-center justify-between text-white">
                        Peringatan {alert.type.toUpperCase()}
                        <div className="flex items-center space-x-2">
                          {alert.forceNewtons && (
                            <Badge variant="outline" className="text-xs">
                              {alert.forceNewtons}N
                            </Badge>
                          )}
                          <Badge variant={alert.priority === "critical" ? "destructive" : "secondary"}>
                            {alert.priority === "critical"
                              ? "KRITIS"
                              : alert.priority === "high"
                                ? "TINGGI"
                                : alert.priority === "medium"
                                  ? "SEDANG"
                                  : "RENDAH"}
                          </Badge>
                        </div>
                      </AlertTitle>
                      <AlertDescription className="text-cyan-200">{alert.message}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              {/* Individual Helmet Cards with Enhanced Data */}
              <div className="space-y-6">
                {helmets.length === 0 ? (
                  <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-6 rounded-full mb-6 shadow-lg shadow-cyan-500/25">
                        <HardHat className="h-16 w-16 text-white" />
                      </div>
                      <h3 className="text-xl font-medium text-cyan-300 mb-2">Tidak Ada Helm Terhubung</h3>
                      <p className="text-cyan-400/70 text-center mb-6">
                        Tambahkan helm pintar ke database Firebase untuk mulai monitoring.
                      </p>
                      <div className="text-center text-sm text-cyan-400/70">
                        <p className="mb-3">
                          <strong className="text-cyan-300">Komponen yang Digunakan:</strong>
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                            ESP32 DEVKIT V1
                          </Badge>
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                            Sensor Tekanan FSR402
                          </Badge>
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                            GPS NEO M8N
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  helmets.map((helmet) => {
                    const forceNewtons = Number.parseFloat(calculateForceNewtons(helmet.fsrSensor?.currentValue || 0))
                    const collisionSeverity = getCollisionSeverity(forceNewtons)
                    const isCollisionDetected = forceNewtons > 2 // Collision threshold at 2N

                    return (
                      <Card
                        key={helmet.id}
                        className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                                  <User className="h-8 w-8 text-white" />
                                </div>
                                {helmet.activePeriod.isBeingUsed && (
                                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full animate-pulse border-2 border-white" />
                                )}
                                {isCollisionDetected && (
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-400 rounded-full animate-ping border-2 border-white" />
                                )}
                              </div>
                              <div>
                                <CardTitle className="text-xl text-cyan-300">{helmet.workerName}</CardTitle>
                                <CardDescription className="text-sm text-cyan-400/70 font-mono">
                                  {helmet.id}
                                </CardDescription>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge
                                    variant={helmet.activePeriod.isBeingUsed ? "default" : "secondary"}
                                    className={
                                      helmet.activePeriod.isBeingUsed
                                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                                        : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                                    }
                                  >
                                    {helmet.activePeriod.isBeingUsed ? "Sedang Digunakan" : "Tidak Digunakan"}
                                  </Badge>
                                  <Badge variant="outline" className="text-cyan-300 border-cyan-500/30">
                                    Baterai: {helmet.battery.percentage}%
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <VariableEditor
                              helmet={helmet}
                              onUpdateFSR={updateFSRSensor}
                              onUpdateBattery={updateBattery}
                              onUpdateLocation={updateLocation}
                              onUpdatePeriod={updateActivePeriod}
                            />
                          </div>
                        </CardHeader>

                        <CardContent>
                          {/* Collision Detection Alert */}
                          {isCollisionDetected && (
                            <Alert className="mb-4 border-red-500/50 bg-red-900/20 backdrop-blur-sm">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertTitle className="text-red-300">BENTURAN TERDETEKSI!</AlertTitle>
                              <AlertDescription className="text-red-200">
                                Gaya benturan: <strong>{forceNewtons} Newton</strong> - Tingkat:{" "}
                                <strong className="capitalize">{collisionSeverity}</strong>
                              </AlertDescription>
                            </Alert>
                          )}

                          {/* Enhanced Stats with Collision and Battery Data */}
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                              <div className="flex items-center space-x-2 mb-2">
                                <Activity className="h-4 w-4 text-blue-400" />
                                <span className="text-sm font-medium text-blue-300">Tekanan FSR</span>
                              </div>
                              <div className="text-2xl font-bold text-blue-400">
                                {helmet.fsrSensor?.currentValue || 0}
                                <span className="text-sm text-blue-300/70">/1023</span>
                              </div>
                              <p className="text-xs text-blue-300/70">
                                {forceNewtons}N -{" "}
                                {isCollisionDetected ? (
                                  <span className="text-red-400 font-bold">BENTURAN!</span>
                                ) : (
                                  <span className="text-green-400">Normal</span>
                                )}
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30 backdrop-blur-sm">
                              <div className="flex items-center space-x-2 mb-2">
                                <Battery className="h-4 w-4 text-green-400" />
                                <span className="text-sm font-medium text-green-300">Baterai</span>
                              </div>
                              <div className="text-2xl font-bold text-green-400">{helmet.battery.percentage}%</div>
                              <p className="text-xs text-green-300/70">
                                {helmet.battery.isCharging ? "🔌 Mengisi" : "🔋 Baterai"}
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 p-4 rounded-lg border border-purple-500/30 backdrop-blur-sm">
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="h-4 w-4 text-purple-400" />
                                <span className="text-sm font-medium text-purple-300">Jam Kerja</span>
                              </div>
                              <div className="text-2xl font-bold text-purple-400">
                                {helmet.activePeriod.totalHours.toFixed(1)}j
                              </div>
                              <p className="text-xs text-purple-300/70">
                                Akumulasi: {helmet.activePeriod.accumulatedUsage?.toFixed(1) || 0}j
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 p-4 rounded-lg border border-red-500/30 backdrop-blur-sm">
                              <div className="flex items-center space-x-2 mb-2">
                                <Satellite className="h-4 w-4 text-red-400" />
                                <span className="text-sm font-medium text-red-300">Lokasi GPS</span>
                              </div>
                              <div className="text-lg font-bold text-red-400">
                                {helmet.location.inWorkArea ? "Zona Aman" : "Di Luar Zona"}
                              </div>
                              <p className="text-xs text-red-300/70">Akurasi: {helmet.location.accuracy}m</p>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
                              <div className="flex items-center space-x-2 mb-2">
                                <Zap className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm font-medium text-yellow-300">Total Benturan</span>
                              </div>
                              <div className="text-2xl font-bold text-yellow-400">
                                {helmet.collisionData?.totalCollisions || 0}
                              </div>
                              <p className="text-xs text-yellow-300/70">
                                Terakhir: {helmet.collisionData?.lastCollisionForce?.toFixed(2) || 0}N
                              </p>
                            </div>
                          </div>

                          {/* Detailed Component Information with Futuristic Styling */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* FSR402 Sensor */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                                  <Gauge className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-blue-300">Sensor Tekanan FSR402</span>
                                  <div className="text-xs text-blue-400/70">Force Sensitive Resistor</div>
                                </div>
                              </div>
                              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 backdrop-blur-sm">
                                <div className="space-y-3">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-blue-300">Nilai Tekanan:</span>
                                    <span className="font-mono font-bold text-blue-400">
                                      {helmet.fsrSensor?.currentValue || 0}
                                      {isCollisionDetected && <span className="text-red-400 ml-2">⚠️ BENTURAN</span>}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-blue-300">Gaya (Newton):</span>
                                    <span className="font-mono font-bold text-blue-400">{forceNewtons}N</span>
                                  </div>
                                  <Progress
                                    value={(helmet.fsrSensor?.currentValue || 0 / 1023) * 100}
                                    className="h-2 bg-blue-900/30"
                                  />
                                  <div className="text-xs text-blue-400/70">
                                    Status: {isCollisionDetected ? "🔴 Benturan Terdeteksi" : "🟢 Normal"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Battery Status */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                                  <Battery className="h-5 w-5 text-green-400" />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-green-300">Sistem Baterai</span>
                                  <div className="text-xs text-green-400/70">Li-ion 3.7V</div>
                                </div>
                              </div>
                              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 backdrop-blur-sm">
                                <div className="space-y-3">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-green-300">Level Daya:</span>
                                    <span className="font-medium text-green-400">{helmet.battery.percentage}%</span>
                                  </div>
                                  <Progress value={helmet.battery.percentage} className="h-2 bg-green-900/30" />
                                  <div className="flex justify-between text-xs text-green-400/70">
                                    <span>Tegangan: {helmet.battery.voltage}V</span>
                                    <span>{helmet.battery.isCharging ? "🔌 Mengisi" : "🔋 Baterai"}</span>
                                  </div>
                                  <div className="text-xs text-green-400/70">
                                    Status:{" "}
                                    {helmet.battery.percentage > 50
                                      ? "🟢 Baik"
                                      : helmet.battery.percentage > 20
                                        ? "🟡 Rendah"
                                        : "🔴 Kritis"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* GPS NEO M8N Location */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
                                  <Satellite className="h-5 w-5 text-red-400" />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-red-300">GPS NEO M8N</span>
                                  <div className="text-xs text-red-400/70">Global Positioning System</div>
                                </div>
                              </div>
                              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20 backdrop-blur-sm">
                                <div className="space-y-2">
                                  <div className="text-sm font-medium text-red-300">{helmet.location.address}</div>
                                  <div className="text-xs text-red-400/70 font-mono">
                                    {helmet.location.lat.toFixed(6)}, {helmet.location.lng.toFixed(6)}
                                  </div>
                                  <div className="flex justify-between text-xs text-red-400/70">
                                    <span>Akurasi: {helmet.location.accuracy}m</span>
                                    <span>Update: {formatTimestamp(helmet.location.lastUpdate)}</span>
                                  </div>
                                  <div className="text-xs text-red-400/70">
                                    Area: {helmet.location.inWorkArea ? "🟢 Zona Kerja" : "🔴 Di Luar Zona"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Analytics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Usage Statistics */}
                <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-cyan-300">
                      <TrendingUp className="h-6 w-6 text-green-400" />
                      <span>Statistik Penggunaan Helm</span>
                    </CardTitle>
                    <CardDescription className="text-cyan-400/70">
                      Akumulasi penggunaan dan efisiensi kerja
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {helmets.map((helmet) => (
                        <div key={helmet.id} className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-cyan-300">{helmet.workerName}</span>
                            <Badge
                              variant={helmet.activePeriod.isBeingUsed ? "default" : "secondary"}
                              className={
                                helmet.activePeriod.isBeingUsed
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-gray-500/20 text-gray-300"
                              }
                            >
                              {helmet.activePeriod.isBeingUsed ? "Aktif" : "Tidak Aktif"}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-cyan-400/70">Hari ini:</span>
                              <div className="font-bold text-cyan-300">
                                {helmet.activePeriod.totalHours.toFixed(1)}j
                              </div>
                            </div>
                            <div>
                              <span className="text-cyan-400/70">Total akumulasi:</span>
                              <div className="font-bold text-cyan-300">
                                {helmet.activePeriod.accumulatedUsage?.toFixed(1) || 0}j
                              </div>
                            </div>
                            <div>
                              <span className="text-cyan-400/70">Baterai:</span>
                              <div className="font-bold text-cyan-300">{helmet.battery.percentage}%</div>
                            </div>
                            <div>
                              <span className="text-cyan-400/70">Status:</span>
                              <div className="font-bold text-cyan-300">
                                {helmet.activePeriod.isBeingUsed ? "Digunakan" : "Standby"}
                              </div>
                            </div>
                          </div>
                          <Progress
                            value={(helmet.activePeriod.totalHours / 8) * 100}
                            className="mt-3 h-2 bg-cyan-900/30"
                          />
                          <div className="text-xs text-cyan-400/70 mt-1">
                            Efisiensi: {((helmet.activePeriod.totalHours / 8) * 100).toFixed(1)}% dari 8 jam kerja
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Collision Statistics */}
                <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-cyan-300">
                      <BarChart3 className="h-6 w-6 text-red-400" />
                      <span>Statistik Benturan</span>
                    </CardTitle>
                    <CardDescription className="text-cyan-400/70">
                      Data benturan dan tingkat keselamatan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {helmets.map((helmet) => {
                        const forceNewtons = Number.parseFloat(
                          calculateForceNewtons(helmet.fsrSensor?.currentValue || 0),
                        )
                        const isCollisionDetected = forceNewtons > 2
                        const collisionSeverity = getCollisionSeverity(forceNewtons)

                        return (
                          <div key={helmet.id} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-red-300">{helmet.workerName}</span>
                              <Badge
                                variant={isCollisionDetected ? "destructive" : "secondary"}
                                className={
                                  isCollisionDetected
                                    ? "bg-red-500/20 text-red-300 animate-pulse"
                                    : "bg-green-500/20 text-green-300"
                                }
                              >
                                {isCollisionDetected ? "BENTURAN!" : "Aman"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-red-400/70">Total benturan:</span>
                                <div className="font-bold text-red-300">
                                  {helmet.collisionData?.totalCollisions || 0}
                                </div>
                              </div>
                              <div>
                                <span className="text-red-400/70">Gaya saat ini:</span>
                                <div className="font-bold text-red-300">{forceNewtons}N</div>
                              </div>
                              <div>
                                <span className="text-red-400/70">Benturan terakhir:</span>
                                <div className="font-bold text-red-300">
                                  {helmet.collisionData?.lastCollisionForce?.toFixed(2) || 0}N
                                </div>
                              </div>
                              <div>
                                <span className="text-red-400/70">Tingkat bahaya:</span>
                                <div className="font-bold text-red-300 capitalize">{collisionSeverity}</div>
                              </div>
                            </div>
                            {isCollisionDetected && (
                              <Alert className="mt-3 border-red-500/50 bg-red-900/20">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription className="text-red-200 text-xs">
                                  Benturan aktif terdeteksi! Gaya: {forceNewtons}N - Segera periksa kondisi pekerja.
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Overall System Analytics */}
              <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-cyan-300">
                    <BarChart3 className="h-6 w-6 text-purple-400" />
                    <span>Analitik Sistem Keseluruhan</span>
                  </CardTitle>
                  <CardDescription className="text-cyan-400/70">
                    Ringkasan performa dan keselamatan sistem monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {helmets.filter((h) => h.activePeriod.isBeingUsed).length}
                      </div>
                      <div className="text-sm text-blue-300">Helm Aktif</div>
                      <div className="text-xs text-blue-400/70">dari {helmets.length} total helm</div>
                    </div>

                    <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {helmets.length > 0
                          ? Math.round(helmets.reduce((sum, h) => sum + h.battery.percentage, 0) / helmets.length)
                          : 0}
                        %
                      </div>
                      <div className="text-sm text-green-300">Rata-rata Baterai</div>
                      <div className="text-xs text-green-400/70">
                        {helmets.filter((h) => h.battery.percentage < 20).length} helm baterai rendah
                      </div>
                    </div>

                    <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      <div className="text-3xl font-bold text-red-400 mb-2">
                        {helmets.reduce((sum, h) => sum + (h.collisionData?.totalCollisions || 0), 0)}
                      </div>
                      <div className="text-sm text-red-300">Total Benturan</div>
                      <div className="text-xs text-red-400/70">
                        {
                          helmets.filter(
                            (h) => Number.parseFloat(calculateForceNewtons(h.fsrSensor?.currentValue || 0)) > 2,
                          ).length
                        }{" "}
                        aktif
                      </div>
                    </div>

                    <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="text-3xl font-bold text-purple-400 mb-2">
                        {helmets.reduce((sum, h) => sum + (h.activePeriod.accumulatedUsage || 0), 0).toFixed(0)}j
                      </div>
                      <div className="text-sm text-purple-300">Total Jam Kerja</div>
                      <div className="text-xs text-purple-400/70">akumulasi semua helm</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="components">
              <ComponentInfo />
            </TabsContent>

            <TabsContent value="about">
              <AboutProject />
            </TabsContent>
          </Tabs>
        </div>

        {/* Futuristic Footer */}
        <footer className="bg-black/40 backdrop-blur-xl border-t border-cyan-500/30 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center text-sm text-cyan-400/70">
              <p>© 2025 Muh. Husein Haikal N | Leo Agung Hariwanman</p>
              <p className="mt-1">Politeknik Negeri Ujung Pandang - Smart Helmet Monitoring System</p>
            </div>
          </div>
        </footer>
      </div>

      <Toaster />

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}
