import { PokemonStat } from "./pokemon-stat.interface";
import { Pokemon } from "./pokemon.interface";

export interface PokemonDetail extends Pokemon {
  /** Tipos que o pokémon, por exemplo o Charizard é dos tipos fogo e vôo */
  types: string[]

  /** Descrição do Pokémon */
  description: string;

  /**
   * Estatísticas do pokemon
   */
  stats: PokemonStat[];
}
