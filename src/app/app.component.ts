import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckImagesComponent } from './components/check-images/check-images.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public dialog: MatDialog){

  }

  openModal() {
    this.dialog
      .open(CheckImagesComponent)
      .afterClosed()
      .subscribe((result) => {
      });
  }
}
