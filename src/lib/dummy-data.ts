export interface Student {
  avatar: string
  id: number
  name: string
  class: string
  status: "pending" | "verified"
}

export const initialStudents: Student[] = [
  { id: 1, name: "Alice Johnson", class: "10A", status: "pending" },
  { id: 2, name: "Bob Smith", class: "10B", status: "verified" },
  { id: 3, name: "Charlie Brown", class: "9A", status: "pending" },
  { id: 4, name: "Diana Prince", class: "11A", status: "pending" },
  { id: 5, name: "Edward Wilson", class: "10A", status: "verified" },
  { id: 6, name: "Fiona Davis", class: "9B", status: "pending" },
  { id: 7, name: "George Miller", class: "11B", status: "pending" },
  { id: 8, name: "Hannah Lee", class: "10B", status: "verified" },
]
