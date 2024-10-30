export interface Registration {
  registrationNumber: string
  createBy: CreateBy
  branch: Branch
  registrationDate: string
  studentName: string
  student: Student
  course: any
  courseDetails: CourseDetails
}

export interface CreateBy {
  id: string
  name: string
  email: string
  role: any
  branchId: string
}

export interface Branch {
  id: string
  name: string
  description: string
  price: number
  createdOn: string
}

export interface Student {
  id: string
  name: string
  surname: string
  idNumber: string
  idDocument: any
  passportNumber: string
  emailAddress: any
  cellPhone: string
  address: any
  createdOn: string
}

export interface CourseDetails {
  id: string
  branchId: string
  name: string
  description: string
  courseDuration: string
  createdOn: string
  price: number
}
