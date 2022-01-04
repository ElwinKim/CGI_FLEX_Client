import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss'],
})
export class StatusListComponent implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {}

  openFirst(){
    this.menu.open();
  }

}
