import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '@shared/interfaces/pokemon.interface';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss']
})
export class CardPokemonComponent {
  @Input({ required: true }) public pokemon: Pokemon;

  constructor(private router: Router) { }

  public openPokemonDetail(): void {
    this.router.navigateByUrl(`pokemon/${this.pokemon?.name}`);
  }
}
