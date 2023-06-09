import { Component, OnInit } from '@angular/core';
import { Tema } from '../tema.model';
import { TemaService } from '../tema.service-promise';
// import { TemaService } from '../tema.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tema-create',
  templateUrl: './tema-create.component.html',
  styleUrls: ['./tema-create.component.css'],
})
export class TemaCreateComponent implements OnInit {
  tema: Tema = {
    nome: '',
    descricao: '',
  };

  constructor(private temaService: TemaService, private router: Router) {}

  ngOnInit(): void {}

  createTema(): void {
    this.temaService
      .create(this.tema)
      .then((t: Tema) => {
        // debugger;
        console.log('Passou aqui no create', t);
        this.tema = t;
        this.temaService.showMessage('Tema criado!');
        this.router.navigate(['/temas']);
      })
      .catch((error) => {
        console.log(error);
      });

    //   .subscribe(() => {
    //   this.temaService.showMessage('Tema criado!');
    //   this.router.navigate(['/temas']);
    // });
  }

  cancel(): void {
    this.router.navigate(['/temas']);
  }
}
