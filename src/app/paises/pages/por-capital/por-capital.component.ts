import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorCapitalComponent {
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
      this.apiService.buscarPorCapital(this.termino).subscribe({
        next: (response) => {
          this.paises = response;
        },
        error: (error) => {
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

    this.apiService.buscarPorCapital(termino).subscribe({
      next: (response) => {
        this.paisesSugeridos = response.splice(0, 5);
      },
      error: () => {
        this.paisesSugeridos = [];
      },
    });
  }
}
