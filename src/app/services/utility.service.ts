import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    public datepipe: DatePipe,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  // showInfoModal(
  //   params: FinraInfoModalData,
  //   config: { [key: string]: any } = {}
  // ) {
  //   return this.dialog.open(FinraInfoModalComponent, {
  //     width: '300px',
  //     height: '200px',
  //     ...config, // over-write the above defaults
  //     data: params
  //   });
  // }

  showSnackbar(message: string, panelClass?: string[], duration?: number) {
    // Angular material snackbar to show a quick message for 1.2 seconds
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = duration || 3000;
    config.panelClass = panelClass || ['snackbar-success'];
    return this.snackBar.open(message, '', config);
  }

  showErrorSnackbar(message: string) {
    return this.showSnackbar(message, ['snackbar-error']);
  }

  showSuccessSnackbar(message: string) {
    return this.showSnackbar(message, ['snackbar-success']);
  }

  showInfoSnackbar(message: string) {
    return this.showSnackbar(message, ['snackbar-info']);
  }

  convertHomeListingLinksToList(links: string): string[] {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    if (!links) {
      return [];
    }

    const splitter = links.split(',,');
    const list = splitter.filter((item) => regex.test(item));
    return list;
  }
}
