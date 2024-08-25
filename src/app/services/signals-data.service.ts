import { Injectable, signal } from '@angular/core';

import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class SignalsDataService {
  private counter = signal(0);
  private users = signal<IUser[]>([
    {
      id: 1,
      fullName: "Manjeet Singh"
    },
    {
      id: 2,
      fullName: "Test Singh"
    },
    {
      id: 3,
      fullName: "Hardik Pandya"
    }
  ])

  constructor() {
    for (const _ of this.users()) {
      this.updateCounter();
    }
  }

  get getCounter(): number {
    return this.counter();
  }

  updateCounter(): void {
    this.counter.update(counter => counter + 1);
  }

  get getUsers(): IUser[] {
    return this.users();
  }

  addNewUser(fullName: string): void {
    this.updateCounter();
    this.users.update(users => [...users, { id: this.getCounter, fullName: fullName }])
  }

  updateUser(updatedUser: IUser): void {
    this.users.update(users => {
      const foundUserIndex = users.findIndex(user => +user.id === +updatedUser.id);
      if (foundUserIndex > -1) {
        users[foundUserIndex] = updatedUser
      }
      return [...users];
    })
  }

  deleteUser(userId: number): void {
    const filteredUsers = this.getUsers.filter(user => user.id !== userId)
    this.users.set(filteredUsers);
  }
}
