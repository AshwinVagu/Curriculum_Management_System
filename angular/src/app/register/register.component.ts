import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    checkMeOut: new FormControl(false)
  });

  constructor(private authService: AuthService, private router: Router) { 
  }
  signUp(event: Event) {
    event.preventDefault();
    console.log(this.signUpForm);
    if (this.signUpForm.valid) {
      let signUpJson = this.signUpForm.value;
      this.authService.SignUp(signUpJson.email, signUpJson.password).then(
        async (result) => {
          // Add a null check here
          if (result.user) {
            let user = result.user;
            if(user.emailVerified) {
              console.log("User verified");
            } else {
              // email not verified
              await user.sendEmailVerification();
              this.authService.SignOut();
            }
          } else {
            // Handle the case where user is null
            console.log("No user returned from the sign up process.");
          }
        }).catch((error) => {
          console.log(error);

        });
      }
  }
  
}
