import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../interfaces/user-model.interface';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {
  transform(value: any, user: UserModel): any {
    if (user) {
      const { first_name, middle_initial, last_name } = user;
      const middle = middle_initial
        ? ` ${middle_initial}. `
        : ` `;

      const displayName = `${first_name}${middle}${last_name}`;
      return displayName;
    } else {
      return '';
    }
  }
}
