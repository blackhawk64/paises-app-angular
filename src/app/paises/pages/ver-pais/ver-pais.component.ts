import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Pais;

  constructor(
               private activatedRoute: ActivatedRoute
              ,private apiService: PaisService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(
          ({id}) => this.apiService.verInfoPaisCodigo(id)),
          tap(console.log)
      )
      .subscribe(response => this.pais = response.shift());
    // this.activatedRoute.params
    //   .subscribe(({id}) => {
    //     this.apiService.verInfoPaisCodigo(id)
    //       .subscribe(informacion => {
    //         console.log(informacion);
    //       });
    //   });
  }

}
