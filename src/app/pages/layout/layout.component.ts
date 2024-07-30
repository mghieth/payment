import { Component,inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  router = inject(Router);
  userServce = inject(UserService);



  ngOnInit(): void {
    this.userServce.getUser()
  }



logout(){
  localStorage.setItem("LoginToken","")
  this.router.navigateByUrl("login")
  }



}


