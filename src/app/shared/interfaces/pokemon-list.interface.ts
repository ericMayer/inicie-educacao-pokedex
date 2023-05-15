import { Pokemon } from './pokemon.interface';

export interface PokemonList {
  /**
   * Próxima listagem de pokémons da paginação
   */
  next: string;

  /**
   * Lista de pokémons para ser usada no mobile
   */
  pokemonsList: Pokemon[];

  /**
   * Lista de pokémons primeira parte, usado para exibir layout no slide
   */
  pokemonsListOne: Pokemon[];

  /**
   * Lista de pokémons primeira parte, usado para exibir layout no slide
   */
  pokemonsListTwo: Pokemon[];

  /**
   * Lista com todos os pokémons
   */
  pokemons: Pokemon[];

  /**
   * Indica quando index está sendo exibido para controlar paginação no front
   */
  actualIndex: number;
}
