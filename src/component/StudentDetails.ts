export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  address: Address;
  department: Department;
}

export interface Address {
  id?: number;
  street: string;
  city: string;
}

export interface Department {
  id: number;
  departmentName: string;
}

export enum PageEnum {
  StudentList,
  StudentCreate,
  StudentEdit,
}
