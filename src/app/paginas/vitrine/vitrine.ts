import { Component, inject, OnInit, signal } from '@angular/core';
import { HardwareModel } from '../../core/models/hardwareModel';
import { Hardware } from '../../core/services/hardware';
import { Artigo } from "../../shared/artigo/artigo";

@Component({
  selector: 'app-vitrine',
  imports: [Artigo],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit {
  private readonly artigoService = inject(Hardware)

  artigos = signal<HardwareModel[]>([]);

  ngOnInit(): void {
    this.artigoService.getAll().subscribe((res)=> {
      this.artigos.set(res)
    })
  }
}
