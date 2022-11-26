import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  private static endpoint: string = 'name';
  termino: string = '';
  hayError: boolean = false;
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];

  mostrarSugerencias: boolean = false;

  constructor(private apiService: PaisService) {}

  buscar(termino: string) {
    this.termino = termino.trim();
    this.hayError = false;
    this.mostrarSugerencias = false;

    if (this.termino.length > 0) {
      this.apiService
        .buscarPaises(this.termino, PorPaisComponent.endpoint)
        .subscribe({
          next: (response) => {
            this.paises = response.sort((k1, k2) => k2.population - k1.population);
          },
          error: () => {
            this.hayError = true;
            this.paises = [];
          },
        });
    }
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.mostrarSugerencias = true;
    this.termino = termino;

    this.apiService
      .buscarPaises(this.termino, PorPaisComponent.endpoint)
      .subscribe({
        next: (response) => {
          this.paisesSugeridos = response.splice(0, 5);
        },
        error: () => {
          this.paisesSugeridos = [];
        },
      });
  }
}
