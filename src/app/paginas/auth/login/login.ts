import { Component, inject, input, signal } from '@angular/core';
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

  estaCarregando = signal(false);

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl ("")
  })

  onSubmit (){
    this.estaCarregando.set(true)
    const {email, password} = this.loginForm.getRawValue()

    this.authService.login(email!, password!).subscribe({
      next: () => alert("Login efutado com sucesso!"),
      error: () => {
        this.estaCarregando.set(false);
        alert("Usuário ou senha inválidos")
      }
    })
  }
}
