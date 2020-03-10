import { Patient } from 'src/app/models/patient';

// All
export class AllPatients {
  static readonly type = '[Patients API] Get all patients';
  constructor() {}
}
export class AllPatientsSuccess {
  static readonly type = '[Patients API] Get all patients success';
  constructor(payload: Patient[]) {}
}

// Create
export class CreatePatient {
  static readonly type = '[Patients API] Create patient';
  constructor(payload: Patient) {}
}
export class CreatePatientSuccess {
  static readonly type = '[Patients API] Create patient success';
  constructor(payload: Patient) {}
}

// Read
export class ReadPatient {
  static readonly type = '[Patients API] Read patient';
  constructor(payload: Patient) {}
}
export class ReadPatientSuccess {
  static readonly type = '[Patients API] Read patient success';
  constructor(payload: Patient) {}
}

// Update
export class UpdatePatient {
  static readonly type = '[Patients API] Update patient';
  constructor(payload: Patient) {}
}
export class UpdatePatientSuccess {
  static readonly type = '[Patients API] Update patient success';
  constructor(payload: Patient) {}
}

// Destroy
export class DestroyPatient {
  static readonly type = '[Patients API] Destroy patient';
  constructor(payload: Patient) {}
}
export class DestroyPatientSuccess {
  static readonly type = '[Patients API] Destroy patient success';
  constructor(payload: Patient) {}
}
