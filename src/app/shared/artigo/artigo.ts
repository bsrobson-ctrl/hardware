import { Component, input } from '@angular/core';
import { HardwareModel } from '../../core/models/hardwareModel';

@Component({
  selector: 'app-artigo',
  imports: [],
  templateUrl: './artigo.html',
  styleUrl: './artigo.css',
})
export class Artigo {
  data  = input.required<HardwareModel>()
}
