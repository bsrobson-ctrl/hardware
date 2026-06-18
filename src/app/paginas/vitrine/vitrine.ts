import { Component, inject, computed, signal } from '@angular/core';
import { Artigo } from "../../shared/artigo/artigo";

@Component({
  selector: 'app-vitrine',
  imports: [Artigo],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {
  artigos = signal([])
}
