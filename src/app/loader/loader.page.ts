import { Component, OnInit } from '@angular/core';
import { UserService } from './../../environments/api/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.page.html',
    styleUrls: ['./loader.page.scss'],
    standalone: false
})
export class LoaderPage implements OnInit {
  token = null;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    setTimeout(x => {
     
    }, 1000);

  }

}
