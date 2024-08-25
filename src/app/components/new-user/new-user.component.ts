import { ActivatedRoute, Params, Router } from '@angular/router';
import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SignalsDataService } from '../../services/signals-data.service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private signalDataService = inject(SignalsDataService);
  protected userForm: FormGroup = new FormGroup({});
  protected userId = 0;
  protected isSubmitted = false;

  constructor() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['userId']) {
        this.userId = params['userId'];
      }
    });

    afterNextRender((): void => {
      if (this.userId) {
        const user = this.signalDataService.getUsers.find(user => user.id === +this.userId);
        if (user) {
          this.userForm.setValue({
            fullName: user.fullName
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      fullName: new FormControl('', [Validators.required])
    });
  }

  get userFormControls(): { [key: string]: AbstractControl<string, string>; } {
    return this.userForm.controls;
  }

  protected onSubmitUserForm(): void {
    this.isSubmitted = true;
    if (this.userForm.invalid) return;

    const fullName = this.userForm.value.fullName;
    if (this.userId) {
      const user = {
        id: +this.userId,
        fullName: fullName
      }
      this.signalDataService.updateUser(user);
    }
    else {
      this.signalDataService.addNewUser(fullName);
    }
    this.router.navigateByUrl('/users');
  }
}
