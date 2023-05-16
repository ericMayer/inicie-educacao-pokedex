export interface PokemonStat {
  /**
   * Nome da estatística, por exemplo Ataque, Defesa, etc
   */
  statName: 'Ataque' | 'Defesa' | 'Vida' | 'Velocidade';

  /**
   * Percentual da estatística considerando que o limite é 255
   */
  statPercentage: number;
}
