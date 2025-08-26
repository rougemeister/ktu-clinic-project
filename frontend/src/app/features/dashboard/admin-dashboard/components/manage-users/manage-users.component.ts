import { Component } from '@angular/core';
import { AddPatientComponent } from "../../../forms/add-patient/add-patient.component";

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [AddPatientComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {

}
