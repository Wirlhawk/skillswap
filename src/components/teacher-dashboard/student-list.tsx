"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"
import type { Student } from "@/lib/dummy-data"

interface StudentListProps {
  students: Student[]
  onVerify: (studentId: number) => void
}

export function StudentList({ students, onVerify }: StudentListProps) {
  const pendingStudents = students.filter((s) => s.status === "pending").length

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-foreground">Student Management</CardTitle>
            <p className="text-muted-foreground mt-1">Review and verify student information</p>
          </div>
          <Badge variant="outline" className="text-sm">
            {pendingStudents} pending verification
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {students.map((student, index) => (
            <div
              key={student.id}
              className={`flex items-center justify-between p-6 hover:bg-muted/30 transition-all duration-200 ${
                index === 0 ? "rounded-t-none" : ""
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-lg">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-card-foreground">{student.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary/60"></span>
                      Class {student.class}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  variant={student.status === "verified" ? "default" : "secondary"}
                  className={`flex items-center gap-2 px-3 py-1 text-sm font-medium ${
                    student.status === "verified"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }`}
                >
                  {student.status === "verified" ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Verified
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4" />
                      Pending Verification
                    </>
                  )}
                </Badge>

                {student.status === "pending" && (
                  <Button
                    onClick={() => onVerify(student.id)}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 font-medium shadow-sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify Student
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
