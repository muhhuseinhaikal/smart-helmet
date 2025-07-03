"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HardHat,
  Zap,
  Shield,
  Wifi,
  MapPin,
  Battery,
  Users,
  Award,
  Github,
  Mail,
  Linkedin,
  GraduationCap,
} from "lucide-react"

export function AboutProject() {
  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-purple-500/20" />
        <CardHeader className="text-center relative z-10">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <HardHat className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Smart Helmet Monitoring System</CardTitle>
          <CardDescription className="text-cyan-100 text-lg">
            Sistem Monitoring Keselamatan Pekerja Berbasis IoT
            <br />
            <span className="text-sm">Politeknik Negeri Ujung Pandang - Inovasi Teknologi 2025</span>
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm">
          <TabsTrigger value="overview">Tentang Proyek</TabsTrigger>
          <TabsTrigger value="features">Fitur Utama</TabsTrigger>
          <TabsTrigger value="creators">Tim Pengembang</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span>Latar Belakang Proyek</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Smart Helmet Monitoring System adalah inovasi teknologi IoT yang dikembangkan untuk meningkatkan
                keselamatan pekerja di lingkungan konstruksi dan industri. Sistem ini mengintegrasikan sensor-sensor
                canggih dengan teknologi cloud computing untuk memberikan monitoring real-time terhadap kondisi
                keselamatan pekerja.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg text-blue-600">Tujuan Proyek</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Mengurangi angka kecelakaan kerja di industri konstruksi</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Memberikan sistem peringatan dini untuk bahaya potensial</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Meningkatkan efisiensi monitoring keselamatan kerja</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Menyediakan data analytics untuk perbaikan berkelanjutan</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg text-green-600">Teknologi yang Digunakan</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline" className="justify-center">
                      ESP32 DevKit V1
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      FSR402 Sensor
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      GPS NEO M8N
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      Firebase Database
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      Next.js 15
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      React 18
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      Tailwind CSS
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-purple-600" />
                <span>Inovasi dan Keunggulan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Wifi className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h5 className="font-semibold">Real-time Monitoring</h5>
                  <p className="text-sm text-gray-600">Data sensor dikirim secara real-time ke cloud</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h5 className="font-semibold">GPS Tracking</h5>
                  <p className="text-sm text-gray-600">Pelacakan lokasi presisi tinggi</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h5 className="font-semibold">Smart Alerts</h5>
                  <p className="text-sm text-gray-600">Sistem peringatan cerdas dan otomatis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Deteksi Benturan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Sensor FSR402 mendeteksi benturan dan tekanan berlebihan pada helm secara real-time.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sensitivitas:</span>
                    <Badge variant="secondary">0.2N - 20N</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Response Time:</span>
                    <Badge variant="secondary">&lt; 1ms</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Pelacakan Lokasi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  GPS NEO M8N memberikan koordinat lokasi dengan akurasi tinggi untuk respons darurat.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Akurasi:</span>
                    <Badge variant="secondary">2.5m CEP</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Update Rate:</span>
                    <Badge variant="secondary">10 Hz</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Battery className="h-5 w-5 text-yellow-600" />
                  <span>Monitoring Baterai</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Sistem monitoring baterai dengan peringatan otomatis untuk level daya rendah.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Low Battery Alert:</span>
                    <Badge variant="secondary">20%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Critical Alert:</span>
                    <Badge variant="destructive">10%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wifi className="h-5 w-5 text-purple-600" />
                  <span>Konektivitas IoT</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  ESP32 dengan WiFi built-in untuk transmisi data real-time ke cloud Firebase.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>WiFi Standard:</span>
                    <Badge variant="secondary">802.11 b/g/n</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Bluetooth:</span>
                    <Badge variant="secondary">v4.2 BLE</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Creator 1 */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-xl">Muh. Husein Haikal N</CardTitle>
                <CardDescription>Lead Developer & IoT Specialist</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <Badge variant="outline">ESP32 Programming</Badge>
                  <Badge variant="outline">Firebase Integration</Badge>
                  <Badge variant="outline">Sensor Calibration</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Teknik Elektro - PNUP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span className="text-sm">husein.haikal@email.com</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                    <Github className="h-4 w-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                    <Linkedin className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creator 2 */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-xl">Leo Agung Hariwanman</CardTitle>
                <CardDescription>Frontend Developer & UI/UX Designer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <Badge variant="outline">React Development</Badge>
                  <Badge variant="outline">UI/UX Design</Badge>
                  <Badge variant="outline">Dashboard Analytics</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Teknik Informatika - PNUP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span className="text-sm">leo.agung@email.com</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                    <Github className="h-4 w-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                    <Linkedin className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Timeline */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Timeline Pengembangan</CardTitle>
              <CardDescription>Tahapan pengembangan Smart Helmet Monitoring System</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <div>
                    <h5 className="font-medium">Fase 1: Research & Planning</h5>
                    <p className="text-sm text-gray-600">Analisis kebutuhan dan desain sistem</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div>
                    <h5 className="font-medium">Fase 2: Hardware Development</h5>
                    <p className="text-sm text-gray-600">Integrasi sensor dan mikrokontroler ESP32</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <div>
                    <h5 className="font-medium">Fase 3: Software Development</h5>
                    <p className="text-sm text-gray-600">Pengembangan dashboard dan sistem monitoring</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div>
                    <h5 className="font-medium">Fase 4: Testing & Deployment</h5>
                    <p className="text-sm text-gray-600">Pengujian sistem dan implementasi</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
