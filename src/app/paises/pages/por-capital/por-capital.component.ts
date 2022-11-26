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
  private static endpoint: string = 'capital';
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
        .buscarPaises(this.termino, PorCapitalComponent.endpoint)
        .subscribe({
          next: (response) => {
            this.paises = response;
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

    this.apiService.buscarPaises(termino, PorCapitalComponent.endpoint).subscribe({
      next: (response) => {
        this.paisesSugeridos = response.splice(0, 5);
      },
      error: () => {
        this.paisesSugeridos = [];
      },
    });
  }
}
