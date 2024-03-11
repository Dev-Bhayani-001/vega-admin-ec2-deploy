import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableService } from 'src/app/service/table.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private tableService: TableService , private router : Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const formData = {
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.tableService.login(formData).subscribe(
      (res:any) => {
        localStorage.setItem( 'token',res.token)
        this.router.navigate(['/dashboard/home'])
      },
      err => {
        console.error(err);
      }
    );
   
  }


}
