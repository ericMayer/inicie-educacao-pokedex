import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { HttpService } from '@shared/services/http.service';
import { environment } from '@environments/environment';
import { Pokemon } from '@shared/interfaces/pokemon.interface';
import { PokemonList } from '@shared/interfaces/pokemon-list.interface';
import { PokemonDetail } from '@shared/interfaces/pokemon-detail.interface';
import { PokemonStat } from '@shared/interfaces/pokemon-stat.interface';
import { KeyValue } from '@angular/common';

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

  private mapPokemonList(pokemon: any, url: string): Pokemon {
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

  public getPokemonByUrl(url: string): Observable<Pokemon> {
    return this.getPokemonDetail(url)
      .pipe(map((pokemon: any) => this.mapPokemonList(pokemon, url)));
  }


  private pushPokemonStat(pokemonStats: PokemonStat[], stats: any[], status: KeyValue<'hp' | 'attack' | 'defense' | 'speed', 'Ataque' | 'Defesa' | 'Vida' | 'Velocidade'>): void {
    stats?.forEach((stat: any) => {
      if (stat?.stat?.name?.toLowerCase() === status?.key?.toLowerCase()) {
        pokemonStats.push({
          statName: status?.value,
          statPercentage: (stat?.base_stat / 255) * 100
        });
      }
    });
  }

  private getPokemonStat(stats: any[]): PokemonStat[] {
    const statusToGet: KeyValue<'hp' | 'attack' | 'defense' | 'speed', 'Ataque' | 'Defesa' | 'Vida' | 'Velocidade'>[] = [
      {
        key: 'hp',
        value: 'Vida',
      },
      {
        key: 'attack',
        value: 'Ataque'
      },
      {
        key: 'defense',
        value: 'Defesa'
      },
      {
        key: 'speed',
        value: 'Velocidade'
      }
    ];

    const pokemonStats: PokemonStat[] = [];

    statusToGet.forEach((status: KeyValue<'hp' | 'attack' | 'defense' | 'speed', 'Ataque' | 'Defesa' | 'Vida' | 'Velocidade'>) =>
      this.pushPokemonStat(pokemonStats, stats, status)
    );

    return pokemonStats;
  }

  private getTypesPokemon(types: any[]): string[] {
    return types?.map((type: any) => type?.type?.name);
  }

  private mapPokemonDetail(pokemon: any): PokemonDetail {
    return {
      id: pokemon?.id,
      name: pokemon?.name,
      height: pokemon?.height,
      weight: pokemon?.weight,
      image: pokemon?.sprites?.front_default,
      stats: this.getPokemonStat(pokemon?.stats),
      url: pokemon?.species?.url,
      description: '',
      types: this.getTypesPokemon(pokemon?.types)
    };
  }

  public getPokemonByName(pokemonName: string): Observable<PokemonDetail> {
    return this.getPokemonDetail(`${environment.pokeApi}/pokemon/${pokemonName}`)
      .pipe(map((pokemon: any) => this.mapPokemonDetail(pokemon)));
  }

  private getEntrieDescription(language: 'pt' | 'en', textEntries: any[]): string {
    return textEntries?.find((entrie: any) => entrie?.language?.name?.toLowerCase() === language)?.flavor_text;
  }

  private getPokemonDescription(textEntries: any[]): string {
    let description: string = this.getEntrieDescription('pt', textEntries);

    if (!description)
      description = this.getEntrieDescription('en', textEntries);

    return description?.replace(/\f/g, '\n')
      .replace(/\u00ad\n/g, '')
      .replace(/\u00ad/g, '')
      .replace(/ -\n/g, ' - ')
      .replace(/-\n/g, '-')
      .replace(/\n/g, ' ')
      .replace(/POK[éÉ]MON/gi, 'Pokémon');
  }

  private mapPokemonSpecie(pokemon: PokemonDetail, specie: any): PokemonDetail {
    return {
      ...pokemon,
      description: this.getPokemonDescription(specie?.flavor_text_entries)
    };
  }

  public getPokemonSpecie(pokemon: PokemonDetail): Observable<any> {
    return this.getPokemonDetail(pokemon?.url)
      .pipe(map((specie: any) => this.mapPokemonSpecie(pokemon, specie)));
  }

}
