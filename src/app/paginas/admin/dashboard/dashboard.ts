import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArtigosService } from '../../../core/services/article';
import { AuthService } from '../../../core/services/auth';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, CurrencyPipe, SlicePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly articleService = inject(ArtigosService);
  readonly authService = inject(AuthService);

  articles = signal([])
  
}
