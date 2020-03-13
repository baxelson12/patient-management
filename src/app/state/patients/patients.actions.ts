import { Patient } from 'src/app/models/patient';

// All
export class AllPatients {
  static readonly type = '[Patients API] Get all patients';
  constructor() {}
}
export class AllPatientsSuccess {
  static readonly type = '[Patients API] Get all patients success';
  constructor(public payload: Patient[]) {}
}

// Create
export class CreatePatient {
  static readonly type = '[Patients API] Create patient';
  constructor(public payload: Patient) {}
}
export class CreatePatientSuccess {
  static readonly type = '[Patients API] Create patient success';
  constructor(public payload: Patient) {}
}

// Read
export class ReadPatient {
  static readonly type = '[Patients API] Read patient';
  constructor(public payload: string) {}
}
export class ReadPatientSuccess {
  static readonly type = '[Patients API] Read patient success';
  constructor(public payload: Patient) {}
}

// Update
export class UpdatePatient {
  static readonly type = '[Patients API] Update patient';
  constructor(public payload: Patient) {}
}
export class UpdatePatientSuccess {
  static readonly type = '[Patients API] Update patient success';
  constructor(public payload: Patient) {}
}

// Destroy
export class DestroyPatient {
  static readonly type = '[Patients API] Destroy patient';
  constructor(public payload: Patient) {}
}
export class DestroyPatientSuccess {
  static readonly type = '[Patients API] Destroy patient success';
  constructor(public payload: Patient) {}
}

// Query result
export class QueryPatients {
  static readonly type = '[Patients API] Query patients';
  constructor(public payload: string) {}
}
export class QueryPatientsSuccess {
  static readonly type = '[Patients API] Query patients success';
  constructor(public payload: Patient[]) {}
}

// Select
export class SelectPatient {
  static readonly type = '[Patients API] Select patient';
  constructor(public payload: Patient) {}
}

// Analytics
export class GetAnalytics {
  static readonly type = '[Patients API] Load analytics';
  constructor() {}
}
export class GetAnalyticsSuccess {
  static readonly type = '[Patients API] Load analytics success';
  constructor(
    public payload: { id: string; count: number; uninsured: number }
  ) {}
}
