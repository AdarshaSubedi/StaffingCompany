import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilityService } from 'src/core/services/utility.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  loginForm: FormGroup;
  errorMessage: any;
  errorMessageType : any = {
    invalidForm: 'Invalid form value',
    invalidEmail: 'Please enter a valid email address',
    invalidLogin: 'Invalid Username or Password'
  }

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackbar:  MatSnackBar,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onLogin() {
    const loginData = this.loginForm.value;
    if (this.loginForm.valid){
      this.loginService.getLogin(loginData).subscribe((response:any) => {
        if (response){
          localStorage.setItem('userId', response.userId);
          this.utilityService.openSnackBar('Logged in successfully', 'success');
          // this.openSnackBar('Logged in successfuly', 'X');
          this.router.navigate(['/user-detail']);
        } else {
          this.errorMessage = this.errorMessageType.invalidForm;
        }
      });
    }
  }

  // openSnackBar(message, action) {
  //   this.snackbar.open(message, action, {
  //     duration: 3000,
  //     verticalPosition: 'top',
  //     horizontalPosition: 'right',
  //     panelClass: ['success']
  //   });
  // }

  ngAfterViewInit(): void {
    this.loginForm.updateValueAndValidity();
  }
  ngOnDestroy(): void {}

}
