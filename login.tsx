"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User, HardHat, Shield } from "lucide-react"

interface LoginProps {
  onLogin: (success: boolean) => void
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate login delay with futuristic effect
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (username === "monitoring" && password === "123") {
      onLogin(true)
    } else {
      setError("Nama pengguna atau kata sandi tidak valid")
      onLogin(false)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Futuristic Background with PNUP Building */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/pnup-building.jpg')`,
            filter: "blur(2px) brightness(0.4) contrast(1.2)",
            transform: "scale(1.05)",
          }}
        />
        {/* Futuristic overlay with animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/90 via-blue-900/80 to-purple-900/90" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
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

        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Futuristic Login Card */}
      <Card className="w-full max-w-md mx-4 z-10 bg-black/40 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center relative">
            <HardHat className="h-10 w-10 text-white" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              SMART HELMET
            </CardTitle>
            <CardTitle className="text-xl font-bold text-white mt-2">Monitoring System</CardTitle>
            <CardDescription className="text-cyan-200 mt-3">
              Politeknik Negeri Ujung Pandang
              <br />
              <span className="text-sm text-cyan-300">Advanced IoT Safety Monitoring</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert className="border-red-500/50 bg-red-900/20 backdrop-blur-sm">
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-cyan-200">
                Nama Pengguna
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan nama pengguna"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-black/30 border-cyan-500/30 text-white placeholder-cyan-300/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-cyan-200">
                Kata Sandi
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-black/30 border-cyan-500/30 text-white placeholder-cyan-300/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memproses...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Akses Sistem</span>
                </div>
              )}
            </Button>
          </form>

          {/* Copyright Footer */}
          <div className="text-center text-xs text-cyan-400/70 mt-6 pt-4 border-t border-cyan-500/20">
            <p>© 2025 Muh. Husein Haikal N | Leo Agung Hariwanman</p>
            <p className="mt-1">Politeknik Negeri Ujung Pandang</p>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}
