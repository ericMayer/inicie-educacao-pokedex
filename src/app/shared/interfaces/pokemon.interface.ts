export interface Pokemon {
  /**
   * Id do Pokémon
   */
  id: number;

  /**
   * Nome do Pokémon
   */
  name: string;

  /**
   * Endpoint para pegar mais informações do Pokémon
   */
  url: string;

  /**
   * Altura do Pokémon
   */
  height: number;

  /**
   * Peso do Pokémon
   */
  weight: number;

  /**
   * Imagem do Pokémon
   */
  image: string;
}
