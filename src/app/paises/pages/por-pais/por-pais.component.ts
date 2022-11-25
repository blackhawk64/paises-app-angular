import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Pais[] = [];

  constructor(private apiService: PaisService) { }

  buscar(termino: string){
    this.termino = termino.trim();
    this.hayError = false;

    if(this.termino.length > 0){
      this.apiService.buscarPais(this.termino).subscribe({
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

  sugerencias(termino: string){
    this.hayError = false;
  }

}
