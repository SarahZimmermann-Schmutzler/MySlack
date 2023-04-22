import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-process',
  templateUrl: './login-process.component.html',
  styleUrls: ['./login-process.component.scss']
})

export class LoginProcessComponent implements OnInit{
 login = true;
 signUp = true;
 password = true;

  ngOnInit(): void {
    this.login = false;
  }

  constructor () {
  }




  
  

  


}
