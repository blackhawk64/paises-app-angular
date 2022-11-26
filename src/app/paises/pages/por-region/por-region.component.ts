import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [],
})
export class PorRegionComponent {
  private static endpoint: string = 'region';
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  hayError: boolean = false;
  paises: Pais[] = [];

  constructor(private apiService: PaisService) {}

  desglosarPaises(region: string) {
    if (this.regionActiva === region) {
      return;
    }

    this.regionActiva = region.trim();
    this.paises = [];
    this.hayError = false;

    this.apiService
      .buscarPaises(this.regionActiva, PorRegionComponent.endpoint)
      .subscribe({
        next: (response) => {
          this.paises = response.sort((k1, k2) => k2.population - k1.population);
        },
        error: (error) => {
          this.hayError = true;
          this.paises = [];
        },
      });
  }
}
