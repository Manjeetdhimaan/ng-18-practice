import { Router } from '@angular/router';
import { Component, effect, inject } from '@angular/core';

import { IUser } from '../../models/user.model';
import { SignalsDataService } from '../../services/signals-data.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  private signalDataService = inject(SignalsDataService);
  private router = inject(Router);
  protected counter: number = 0;
  protected users: IUser[] = [];

  constructor() {
    effect(() => {
      this.counter = this.signalDataService.getCounter;
    });
    effect(() => {
      this.users = this.signalDataService.getUsers;
    });
  }

  onDeleteUser(userId: number): void {
    this.signalDataService.deleteUser(userId);
  }

  onEditUser(userId: number): void {
    this.router.navigateByUrl(`/new-user/${userId}`);
  }

  handleEventDelegation(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const linkElement = target.closest('[data-id]');
    if(linkElement) {
      const action = target.getAttribute('data-action');
      const userId = linkElement.getAttribute('data-id');
      if (action === 'delete' && userId) {
        // Handle delete logic
        this.onDeleteUser(Number(userId));
      } else if (action === 'edit' && userId) {
        // Handle edit logic
        this.onEditUser(Number(userId));
      }
    }
  }

}
