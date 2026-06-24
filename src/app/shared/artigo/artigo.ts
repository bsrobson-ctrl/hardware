import { Component, input } from '@angular/core';
import { HardwareModel } from '../../core/models/hardwareModel';

@Component({
  selector: 'app-artigo',
  imports: [],
  templateUrl: './artigo.html',
  styleUrl: './artigo.css',
})
export class Artigo {
  data = input.required<HardwareModel>();

  formatarPreco(valor: number | string | null | undefined): string {
    const num = parseFloat(String(valor ?? '').replace(',', '.'));
    if (isNaN(num)) return 'R$ —';
    return num.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
