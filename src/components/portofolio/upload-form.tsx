"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, ImageIcon, Video } from "lucide-react"

interface UploadFormProps {
  onSubmit: (work: any) => void
  onClose: () => void
}

export default function UploadForm({ onSubmit, onClose }: UploadFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    files: [] as File[],
  })
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />
    if (file.type.startsWith("video/")) return <Video className="w-4 h-4" />
    return <ImageIcon className="w-4 h-4" />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newWork = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    }
    onSubmit(newWork)
    setFormData({ title: "", description: "", category: "", tags: "", files: [] })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Tambah Karya Baru
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Karya</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Masukkan judul karya..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-design">Web Design</SelectItem>
                  <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                  <SelectItem value="branding">Branding</SelectItem>
                  <SelectItem value="illustration">Illustration</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="motion-graphics">Motion Graphics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Ceritakan tentang karya ini..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                placeholder="web, design, modern (pisahkan dengan koma)"
              />
            </div>

            <div className="space-y-2">
              <Label>Upload File</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300 hover:border-emerald-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Drag & drop files here</p>
                <p className="text-gray-500 mb-4">atau</p>
                <Button type="button" variant="outline" onClick={() => document.getElementById("file-input")?.click()}>
                  Pilih File
                </Button>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Mendukung: JPG, PNG, GIF, MP4, PDF, DOC (Max 10MB per file)
                </p>
              </div>
            </div>

            {formData.files.length > 0 && (
              <div className="space-y-2">
                <Label>File yang dipilih:</Label>
                <div className="space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file)}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                Publikasikan Karya
              </Button>
              
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
