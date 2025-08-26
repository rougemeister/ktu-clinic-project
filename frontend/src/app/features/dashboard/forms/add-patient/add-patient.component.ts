import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { CreatePatientRequest } from '../../../auth/model/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
@Output() patientAdded = new EventEmitter<void>();
  
  patientForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitError = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.createForm();
  }

  ngOnInit(): void {}

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        country: ['', Validators.required]
      }),
      emergencyContact: this.fb.group({
        name: ['', Validators.required],
        relation: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]]
      })
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.isSubmitting = true;
      this.submitError = '';
      
      const formData: CreatePatientRequest = this.patientForm.value;
      
      this.patientService.createPatient(formData).subscribe({
        next: (response) => {
          this.submitMessage = 'Patient created successfully!';
          this.patientForm.reset();
          this.patientAdded.emit();
          setTimeout(() => this.submitMessage = '', 3000);
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submitError = error;
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.patientForm.controls).forEach(key => {
      const control = this.patientForm.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          control.get(nestedKey)?.markAsTouched();
        });
      }
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.patientForm.get(fieldName);
    if (control && control.errors && control.touched) {
      if (control.errors['required']) return `${fieldName} is required`;
      if (control.errors['email']) return 'Enter a valid email';
      if (control.errors['minlength']) return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['pattern']) return `${fieldName} format is invalid`;
    }
    return '';
  }

  getNestedFieldError(groupName: string, fieldName: string): string {
    const control = this.patientForm.get(`${groupName}.${fieldName}`);
    if (control && control.errors && control.touched) {
      if (control.errors['required']) return `${fieldName} is required`;
      if (control.errors['pattern']) return `${fieldName} format is invalid`;
    }
    return '';
  }}
