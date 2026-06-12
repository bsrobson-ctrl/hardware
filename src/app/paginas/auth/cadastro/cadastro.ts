import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro{
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl (""),
    name: new FormControl (""),
  })

  onSubmit (){
    const {email, password, name} = this.loginForm.getRawValue()

    this.authService.cadastro(name!, email!, password!).subscribe({
      next: () => alert("Cadastro efutado com sucesso!"),
      error: () => alert("Dados inválidos")
    })
  }
}
