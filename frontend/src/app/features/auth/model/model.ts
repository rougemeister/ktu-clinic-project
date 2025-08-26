export interface User {
  name: string;
  email: string;
  password?: string; // not always needed
  role?: string;
}

export interface AuthUser {
  name?: string;
  email: string;
  password: string;
  role?: string;
}

// patient.model.ts
export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  phone: string;
  email: string;
  address: Address;
}

export interface MedicalInfo {
  allergies: string[];
  chronicDiseases: string[];
  currentMedications: string[];
  pastSurgeries: string[];
  immunizations: string[];
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}


export interface Patient {
  _id?: string;
  personalInfo: PersonalInfo;
  medicalInfo?: MedicalInfo;
  emergencyContact: EmergencyContact;
  user?: User;
  appointments?: string[];
  medicalRecords?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  phone: string;
  email: string;
  address: Address;
  password: string;
  emergencyContact: EmergencyContact;
}
