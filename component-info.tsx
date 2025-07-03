"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, MapPin, Gauge, Wifi, Battery, Shield, Zap, Radio } from "lucide-react"

export function ComponentInfo() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-red-600 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Komponen Sistem Helm Pintar</CardTitle>
          <CardDescription className="text-blue-100">
            Sistem Monitoring Keselamatan Pekerja Berbasis IoT Canggih
            <br />
            Politeknik Negeri Ujung Pandang - Inovasi Teknik
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white/90 backdrop-blur-sm">
          <TabsTrigger value="overview">Gambaran Umum</TabsTrigger>
          <TabsTrigger value="esp32">ESP32 DevKit V1</TabsTrigger>
          <TabsTrigger value="fsr">Sensor Tekanan FSR</TabsTrigger>
          <TabsTrigger value="gps">GPS NEO M8N</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-blue-600" />
                  <span>Mikrokontroler</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">ESP32 DEVKIT V1</Badge>
                  <p className="text-sm text-gray-600">
                    Unit pemrosesan utama dengan konektivitas WiFi dan Bluetooth untuk transmisi data real-time.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gauge className="h-5 w-5 text-red-600" />
                  <span>Sensor Tekanan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">FSR402</Badge>
                  <p className="text-sm text-gray-600">
                    Resistor Sensitif Gaya untuk mendeteksi benturan dan tekanan pada permukaan helm.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Modul GPS</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">NEO M8N</Badge>
                  <p className="text-sm text-gray-600">
                    Modul GPS presisi tinggi untuk pelacakan lokasi akurat dan kemampuan geofencing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Arsitektur Sistem</CardTitle>
              <CardDescription>Bagaimana komponen bekerja bersama</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Alur Data</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Sensor mengumpulkan data real-time</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">ESP32 memproses dan memvalidasi data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Data dikirim ke Firebase</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Dashboard menampilkan status real-time</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Fitur Keselamatan</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Deteksi benturan dan peringatan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Pelacakan lokasi real-time</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Monitoring baterai</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Notifikasi darurat</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="esp32" className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cpu className="h-6 w-6 text-blue-600" />
                <span>Mikrokontroler ESP32 DEVKIT V1</span>
              </CardTitle>
              <CardDescription>Otak dari sistem helm pintar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ESP32 Image */}
              <div className="flex justify-center mb-4">
                <img src="/images/esp32-component.png" alt="ESP32 DEVKIT V1" className="w-64 h-48 object-contain" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Spesifikasi Teknis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Prosesor:</span>
                      <span className="font-medium">Dual-core Xtensa LX6</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kecepatan Clock:</span>
                      <span className="font-medium">240 MHz</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memori Flash:</span>
                      <span className="font-medium">4 MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RAM:</span>
                      <span className="font-medium">520 KB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WiFi:</span>
                      <span className="font-medium">802.11 b/g/n</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bluetooth:</span>
                      <span className="font-medium">v4.2 BR/EDR dan BLE</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Fitur Utama</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">WiFi built-in untuk transmisi data real-time</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Bluetooth untuk komunikasi perangkat lokal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Mode konsumsi daya rendah</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Multiple pin GPIO untuk integrasi sensor</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Peran dalam Helm Pintar</h4>
                <p className="text-sm text-gray-700">
                  ESP32 berfungsi sebagai unit pemrosesan pusat, mengumpulkan data dari sensor tekanan FSR dan modul
                  GPS, memproses informasi, dan mengirimkannya ke database Firebase melalui WiFi. Juga mengelola
                  konsumsi daya, menangani peringatan darurat, dan mengontrol indikator LED pada helm.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fsr" className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="h-6 w-6 text-red-600" />
                <span>Resistor Sensitif Gaya FSR402</span>
              </CardTitle>
              <CardDescription>Sensor deteksi tekanan dan benturan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* FSR402 Image */}
              <div className="flex justify-center mb-4">
                <img src="/images/fsr402-component.png" alt="FSR402 Sensor" className="w-64 h-48 object-contain" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Spesifikasi Teknis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Rentang Sensing:</span>
                      <span className="font-medium">0.2N hingga 20N</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rentang Resistansi:</span>
                      <span className="font-medium">∞ hingga 300Ω</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tegangan Operasi:</span>
                      <span className="font-medium">3.3V - 5V</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Waktu Respons:</span>
                      <span className="font-medium">&lt; 1ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rentang Suhu:</span>
                      <span className="font-medium">-30°C hingga +70°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Masa Pakai:</span>
                      <span className="font-medium">&gt; 10M aktuasi</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Prinsip Kerja</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium text-sm mb-1">Tanpa Tekanan</h5>
                      <p className="text-xs text-gray-600">Resistansi tinggi (∞), tidak ada aliran arus</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <h5 className="font-medium text-sm mb-1">Tekanan Ringan</h5>
                      <p className="text-xs text-gray-600">Resistansi menurun, arus kecil terdeteksi</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <h5 className="font-medium text-sm mb-1">Benturan/Tekanan Tinggi</h5>
                      <p className="text-xs text-gray-600">Resistansi rendah, arus tinggi memicu peringatan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Implementasi Keselamatan</h4>
                <p className="text-sm text-gray-700">
                  FSR402 ditempatkan secara strategis pada cangkang luar helm untuk mendeteksi benturan dari benda
                  jatuh, tabrakan, atau tekanan berlebihan. Ketika sensor mendeteksi gaya di atas ambang batas
                  keselamatan (biasanya 500-800 pada skala 0-1023), sistem langsung memicu peringatan, mengaktifkan LED
                  peringatan dan mengirim notifikasi darurat ke supervisor.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gps" className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-green-600" />
                <span>Modul GPS NEO M8N</span>
              </CardTitle>
              <CardDescription>Sistem pelacakan lokasi presisi tinggi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* GPS NEO M8N Image */}
              <div className="flex justify-center mb-4">
                <img src="/images/gps-neo-component.png" alt="GPS NEO M8N" className="w-64 h-48 object-contain" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Spesifikasi Teknis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tipe Receiver:</span>
                      <span className="font-medium">72-channel u-blox M8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Akurasi Posisi:</span>
                      <span className="font-medium">2.5m CEP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Update Rate:</span>
                      <span className="font-medium">Hingga 10 Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cold Start:</span>
                      <span className="font-medium">&lt; 26s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hot Start:</span>
                      <span className="font-medium">&lt; 1s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tegangan Operasi:</span>
                      <span className="font-medium">3.3V - 5V</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Sistem yang Didukung</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">GPS (Global Positioning System)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">GLONASS (Rusia)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">BeiDou (Tiongkok)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Galileo (Eropa)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Pelacakan Lokasi</h4>
                  <p className="text-sm text-gray-700">
                    Menyediakan koordinat real-time (lintang/bujur) dengan akurasi tinggi untuk monitoring lokasi
                    pekerja dan respons darurat.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Geofencing</h4>
                  <p className="text-sm text-gray-700">
                    Memungkinkan batas virtual di sekitar area kerja, memicu peringatan ketika pekerja masuk atau keluar
                    zona keselamatan yang ditentukan.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Aplikasi Keselamatan</h4>
                <p className="text-sm text-gray-700">
                  Modul GPS memungkinkan pelacakan lokasi pekerja yang presisi untuk respons darurat, memastikan pekerja
                  tetap dalam zona aman, menyediakan data lokasi untuk laporan insiden, dan membantu prosedur evakuasi
                  selama keadaan darurat. Sistem juga dapat melacak pola pergerakan untuk mengidentifikasi potensi
                  bahaya keselamatan.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
