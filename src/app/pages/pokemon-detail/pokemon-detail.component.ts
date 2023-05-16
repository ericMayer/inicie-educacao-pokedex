import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { interval, take } from 'rxjs';

import { PokemonService } from '@shared/services/pokemon.service';
import { PokemonDetail } from '@shared/interfaces/pokemon-detail.interface';
import { RequestState } from '@shared/enums/request-state.enum';
import { RequestStateModule } from '@shared/components/request-state/request-state.module';
import { CoreModule } from '@core/core.module';
import { PokemonTypesColors } from '@shared/enums/pokemon-types-colors.enum';
import { PokemonChartStatColors } from '@shared/enums/pokemon-chart-stat-colors.enum';
import { SkeletonLoadingModule } from '@shared/components/skeleton-loading/skeleton-loading.module';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    RequestStateModule,
    SkeletonLoadingModule
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  @Input({ required: true }) private pokemonName: string;
  @ViewChild('animationLottie') public animationLottie: ElementRef<HTMLDivElement>;

  public pokemon: PokemonDetail;
  public requestState: RequestState = RequestState.Loading;
  public pokemonChartStatColors: typeof PokemonChartStatColors = PokemonChartStatColors;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  public ngOnInit(): void {
    this.getPokemonById();
  }

  private setRequestState(requestState: RequestState): void {
    this.requestState = requestState;
  }

  private getPokemonById(): void {
    if (this.pokemonName) {
      this.pokemonName = this.pokemonName?.toLowerCase();
      this.pokemonService.getPokemonByName(this.pokemonName)
        .subscribe({
          next: ((pokemon: PokemonDetail) => {
            this.pokemon = pokemon;
            this.getPokemonSpecie();
          }),
          error: () => this.setRequestState(RequestState.Error)
        });
    }
    else
      this.router.navigateByUrl('');

  }

  private showLoadingByMinimumTime(): void {
    interval(1000)
      .pipe(take(1))
      .subscribe(() => this.setRequestState(RequestState.Success));
  }

  private getPokemonSpecie(): void {
    if (this.pokemon?.url)
      this.pokemonService.getPokemonSpecie(this.pokemon)
        .subscribe({
          next: (pokemonDetail: PokemonDetail) => {
            this.pokemon = pokemonDetail;
            this.showLoadingByMinimumTime();
          },
          error: () => this.setRequestState(RequestState.Error)
        });
  }

  public showRequestState(): boolean {
    return this.requestState === RequestState.Error;
  }

  public getBackgroundColorType(type: string): string {
    return PokemonTypesColors?.[type] || 'var(--primary-color';
  }

  public showPokemon(): boolean {
    return !this.showRequestState() && this.requestState === RequestState.Success;
  }
}
