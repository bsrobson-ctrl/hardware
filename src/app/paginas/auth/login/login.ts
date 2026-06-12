import { Component, inject, input } from '@angular/core';
import { HardwareModel } from '../../../core/models/hardwareModel';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login{
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl ("")
  })

  onSubmit (){
    const {email, password} = this.loginForm.getRawValue()

    this.authService.login(email!, password!).subscribe({
      next: () => alert("Login efutado com sucesso!"),
      error: () => alert("Usuário ou senha inválidos")
    })
  }
}
