import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { HttpService } from '@shared/services/http.service';
import { environment } from '@environments/environment';
import { Pokemon } from '@shared/interfaces/pokemon.interface';
import { PokemonList } from '@shared/interfaces/pokemon-list.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public itemsPerPage: number = 20;

  constructor(private http: HttpService) { }

  public getListPokemons(pokemons: any[], divisionRest: number): Pokemon[] {
    return pokemons?.filter((pokemon: any, index: number) => index % 2 === divisionRest);
  }

  public mapPokemons(pokemonsList: any): PokemonList {
    const pokemons: any[] = pokemonsList?.results?.slice(0, this.itemsPerPage);

    return {
      next: pokemonsList?.next,
      pokemonsList: [...pokemons],
      pokemonsListOne: [...pokemons.slice(0, this.itemsPerPage / 2)],
      pokemonsListTwo: [...pokemons.slice(this.itemsPerPage / 2, this.itemsPerPage)],
      pokemons: [...pokemonsList?.results],
      actualIndex: 10
    };
  }

  public getPokemonsByPage(next?: string): Observable<PokemonList> {
    const endpoint: string = next ? next : `${environment.pokeApi}/pokemon?limit=2000&offset=0`;

    return this.http.get(endpoint)
      .pipe(
        map((pokemonsList: any) => this.mapPokemons(pokemonsList))
      );
  }

  private mapPokemonDetail(pokemon: any, url: string): Pokemon {
    return {
      id: pokemon?.id,
      url,
      name: pokemon?.name,
      height: pokemon?.height,
      weight: pokemon?.weight,
      image: pokemon?.sprites?.front_default
    };
  }

  private getPokemonDetail(url: string): Observable<any> {
    return this.http.get(url);
  }

  public getPokemonByUrl(url: string): Observable<any> {
    return this.getPokemonDetail(url)
      .pipe(
        map((pokemon: any) => this.mapPokemonDetail(pokemon, url))
      );
  }
}
