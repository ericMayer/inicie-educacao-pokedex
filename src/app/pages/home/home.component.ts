import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, ElementRef, NgZone, OnInit, ViewChild, inject } from '@angular/core';
import { KeyValue } from '@angular/common';

import { PokemonService } from '@shared/services/pokemon.service';
import { PokemonList } from '@shared/interfaces/pokemon-list.interface';
import { RequestState } from '@shared/enums/request-state.enum';
import { Pokemon } from '@shared/interfaces/pokemon.interface';

import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { FormControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('swiperContainerListOne') public swiperListOne: ElementRef;
  @ViewChild('swiperContainerListTwo') public swiperListTwo: ElementRef;

  public headerPokemons: KeyValue<string, string>[] = [
    {
      key: 'Imagem de um Pokémon Azul',
      value: 'assets/images/pokemon-blue.svg',
    },
    {
      key: 'Imagem de um Pokémon Verde',
      value: 'assets/images/pokemon-green.svg',
    },
    {
      key: 'Imagem de um Pokémon Amarelo',
      value: 'assets/images/pokemon-yellow.svg',
    },
  ];
  public pokemonsList: PokemonList = { next: null, pokemonsList: [], pokemonsListOne: [], pokemonsListTwo: [], pokemons: [], actualIndex: 0 };
  public filteredPokemonsList: Pokemon[] = [];
  public requestState: RequestState = RequestState.Loading;
  public search: FormControl<string> = new FormControl('');
  private phoneWidth: number = 576;
  public isMobile: boolean = window.innerWidth <= this.phoneWidth;
  private itemsPerPage: number = this.pokemonService.itemsPerPage;
  private destroyRef: DestroyRef = inject(DestroyRef);
  private pokemonsListNameProperty: string[] = ['pokemonsList', 'pokemonsListOne', 'pokemonsListTwo', 'pokemons'];

  constructor(
    private cd: ChangeDetectorRef,
    private pokemonService: PokemonService,
    private ngZone: NgZone
  ) { }

  public ngOnInit(): void {
    this.getPokemons();
    this.clearPokemonsLists();
    this.resizeEvent();
  }

  public ngAfterViewInit(): void {
    this.addEventsListenersSwiper();
  }

  private setRequestStateEmpty(): void {
    this.requestState = this.filteredPokemonsList?.length ? RequestState.Success : RequestState.Empty;
  }

  private pushPokemons(pokemonsList: Pokemon[], listPokemonsToPush: Pokemon[]): void {
    if (pokemonsList?.length)
      listPokemonsToPush.push(...pokemonsList);
  }

  private pushAllPokemonsList(pokemonsList: PokemonList): void {
    this.pokemonsListNameProperty.forEach((property: string) =>
      this.pushPokemons(pokemonsList?.[property], this.pokemonsList?.[property])
    );

    this.pushPokemons(pokemonsList?.pokemons, this.filteredPokemonsList);
  }

  private getPokemons(nextPage?: string): void {
    this.pokemonService.getPokemonsByPage(nextPage)
      .subscribe({
        next: (pokemonsList: PokemonList) => {
          this.pokemonsList.next = pokemonsList?.next;
          this.pushAllPokemonsList(pokemonsList);
          this.getPokemonsDetails([...this.pokemonsList.pokemonsListOne, ...this.pokemonsList.pokemonsListTwo]);
          this.setRequestStateEmpty();

          if (this.pokemonsList?.next)
            this.getPokemons(this.pokemonsList?.next);
        },
        error: () => this.requestState = RequestState.Error
      });
  }

  private changePokemonsList(pokemons: Pokemon[]): void {
    this.pokemonsList.pokemonsList = [];
    this.pokemonsList.pokemonsListOne = [];
    this.pokemonsList.pokemonsListTwo = [];

    this.pushPokemonsLists(pokemons);
    this.updateSwiper();
    this.setRequestStateEmpty();
  }

  public onKeyDown(keyboardEvent: KeyboardEvent): void {
    if (keyboardEvent?.key?.toLowerCase() === 'enter') this.searchPokemonByName();
  }

  public searchPokemonByName(): void {
    if (this.search?.value) {
      this.filteredPokemonsList = this.pokemonsList?.pokemons?.filter((pokemon: Pokemon) => pokemon?.name?.toLowerCase().includes(this.search.value.toLowerCase()));
      this.changePokemonsList(this.filteredPokemonsList);
      this.getPokemonsDetails(this.filteredPokemonsList);
    }
  }

  private clearPokemonsLists(): void {
    this.search.valueChanges
      .subscribe((pokemonName: string) => {
        if (!pokemonName) {
          this.filteredPokemonsList = [...this.pokemonsList?.pokemons];
          const firstTenPokemons: Pokemon[] = this.pokemonsList.pokemons.slice(0, this.itemsPerPage);
          this.changePokemonsList(firstTenPokemons);
        }
      });
  }

  private updatePokemonInfo(pokemonList: Pokemon[], newPokemon: Pokemon): void {
    const pokemonToUpdateIndex: number = pokemonList?.findIndex((pokemon: Pokemon) => pokemon?.name === newPokemon?.name);

    if (pokemonToUpdateIndex !== -1)
      pokemonList[pokemonToUpdateIndex] = newPokemon;
  }

  private updateAllListsPokemonInfo(pokemon: Pokemon): void {
    this.pokemonsListNameProperty.forEach((property: string) =>
      this.updatePokemonInfo(this.pokemonsList?.[property], pokemon)
    );

    this.setRequestStateEmpty();
  }

  private getPokemonsDetails(pokemons: Pokemon[]): void {
    pokemons?.forEach((pokemon: Pokemon) => {
      if (!pokemon?.id)
        this.pokemonService.getPokemonByUrl(pokemon?.url).subscribe({
          next: (pokemon: Pokemon) => this.updateAllListsPokemonInfo(pokemon),
          error: () => this.requestState = RequestState.Error
        })
    });
  }

  public pushPokemonsLists(pokemons: Pokemon[]): void {
    this.pushPokemons(pokemons.slice(0, this.itemsPerPage / 2), this.pokemonsList.pokemonsListOne);
    this.pushPokemons(pokemons.slice(this.itemsPerPage / 2, this.itemsPerPage), this.pokemonsList.pokemonsListTwo);
    this.pushPokemons(pokemons, this.pokemonsList.pokemonsList);
  }

  private updateSwiper(): void {
    this.ngZone.run(() => this.cd?.detectChanges());
    (this.swiperListOne?.nativeElement?.swiper as Swiper)?.update?.();
    (this.swiperListTwo?.nativeElement?.swiper as Swiper)?.update?.();
  }

  public loadMorePokemons(): void {
    if (!this.search?.value) {
      const actualIndex: number = this.pokemonsList?.actualIndex + this.itemsPerPage;
      const endIndex: number = actualIndex + this.itemsPerPage;
      const pokemons: Pokemon[] = this.pokemonsList?.pokemons?.slice(actualIndex, endIndex);

      this.pushPokemonsLists(pokemons);

      this.pokemonsList.actualIndex += this.itemsPerPage;
      this.getPokemonsDetails([...this.pokemonsList.pokemonsListOne, ...this.pokemonsList.pokemonsListTwo]);

      this.updateSwiper();
    }
  }

  private addEventSwiperContainer(swiperContainer: ElementRef): void {
    swiperContainer?.nativeElement?.swiper?.on?.('reachEnd', () =>
      this.loadMorePokemons()
    );

    swiperContainer?.nativeElement?.swiper?.on?.('touchEnd', () => {
      if ((swiperContainer?.nativeElement?.swiper as Swiper)?.isEnd && !this.isMobile)
        this.loadMorePokemons();
    });
  }

  private addEventsListenersSwiper(): void {
    this.addEventSwiperContainer(this.swiperListOne);
    this.addEventSwiperContainer(this.swiperListTwo);
  }

  public actionSlide(action: 'slidePrev' | 'slideNext'): void {
    this.executeActionSlide(this.swiperListOne, action);
    this.executeActionSlide(this.swiperListTwo, action);
  }

  public executeActionSlide(swiperContainer: ElementRef, action: 'slidePrev' | 'slideNext'): void {
    if ((swiperContainer?.nativeElement?.swiper as Swiper)?.isEnd)
      this.loadMorePokemons();
    else
      (swiperContainer?.nativeElement?.swiper as Swiper)?.[action]?.();
  }

  public showRequestState(): boolean {
    return this.requestState === RequestState.Error || this.requestState === RequestState.Empty;
  }

  private resizeEvent(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.isMobile = window.innerWidth <= this.phoneWidth);
  }

  public showSwiper = (): boolean =>
    this.filteredPokemonsList?.length && !this.isMobile;

  public showPokemonsMobile = (): boolean =>
    this.filteredPokemonsList?.length && this.isMobile;

  public onScroll(): void {
    if (this.isMobile)
      this.loadMorePokemons();
  }

  public hideSwiper = (): boolean =>
    this.isMobile || !this.filteredPokemonsList?.length;
}
