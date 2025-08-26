import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Patient, CreatePatientRequest } from '../../auth/model/model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/api/patients';

  constructor(private http: HttpClient) {}

  createPatient(patientData: CreatePatientRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, patientData)
      .pipe(catchError(this.handleError));
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updatePatient(id: string, patientData: Partial<CreatePatientRequest>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, patientData)
      .pipe(catchError(this.handleError));
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
