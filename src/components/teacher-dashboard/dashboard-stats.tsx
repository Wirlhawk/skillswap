import { Card, CardContent } from "@/components/ui/card"
import { Student } from "@/lib/dummy-data"
import { Users, UserCheck, AlertCircle, TrendingUp } from "lucide-react"


interface DashboardStatsProps {
  students: Student[]
}

export function DashboardStats({ students }: DashboardStatsProps) {
  const totalStudents = students.length
  const verifiedStudents = students.filter((s) => s.status === "verified").length
  const pendingStudents = students.filter((s) => s.status === "pending").length
  const verificationRate = Math.round((verifiedStudents / totalStudents) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Students</p>
              <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-secondary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Verified</p>
              <p className="text-3xl font-bold text-foreground">{verifiedStudents}</p>
            </div>
            <UserCheck className="h-8 w-8 text-secondary" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-3xl font-bold text-foreground">{pendingStudents}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-amber-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-emerald-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
              <p className="text-3xl font-bold text-foreground">{verificationRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
