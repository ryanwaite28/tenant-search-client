import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../interfaces/user-model.interface';
import { getUserFullName } from '../_misc/chamber';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {
  transform(value: any, user: UserModel): any {
    return getUserFullName(user);
  }
}
