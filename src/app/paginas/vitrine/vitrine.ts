import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { ArtigosService } from '../../core/services/article';
import { HardwareModel } from '../../core/models/hardwareModel';
import { Artigo } from '../../shared/artigo/artigo';
import { SvgGpu } from '../../shared/svg-gpu/svg-gpu'; 

@Component({
  selector: 'app-vitrine',
  imports: [Artigo, SvgGpu],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})

export class Vitrine implements OnInit {
  
  private readonly artigoService = inject(ArtigosService)

  artigos = signal<HardwareModel[]>([]);

  ngOnInit(): void {
    this.artigoService.getAll().subscribe((res) => {
      this.artigos.set(res)
      console.log(res)
    })
  }

}