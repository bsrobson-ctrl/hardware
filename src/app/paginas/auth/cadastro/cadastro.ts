import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro{
  private authService = inject(AuthService);
  private router = inject(Router);

estaCarregando = signal(false)

  cadastroForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl (""),
    name: new FormControl (""),
  })

  onSubmit (){
    this.estaCarregando.set(true)
    const {email, password, name} = this.cadastroForm.getRawValue()

    this.authService.cadastro(name!, email!, password!).subscribe({
      next: () =>{
        alert("Cadastro efutado com sucesso!")
        this.router.navigate(['/login'])
      },
      error: () => {
        this.estaCarregando.set(false)
        alert("Dados inválidos")}
    })
  }
}
