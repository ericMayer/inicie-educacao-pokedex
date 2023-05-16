import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPokemonSheap'
})
export class FormatPokemonSheapPipe implements PipeTransform {

  private sheapUnit: Map<'weight' | 'height', 'kilogram' | 'gram' | 'centimeter' | 'meter'> = new Map();

  private setSheapUnitHeight(value: number): void {
    if ((value / 10) >= 1)
      this.sheapUnit.set('height', 'meter');
    else
      this.sheapUnit.set('height', 'centimeter');
  }

  private setSheapUnitWeight(value: number): void {
    if ((value / 10) >= 1)
      this.sheapUnit.set('weight', 'kilogram');
    else
      this.sheapUnit.set('weight', 'gram');
  }

  private setSheapUnit(value: number, sheapType: 'weight' | 'height'): void {
    sheapType === 'height' ? this.setSheapUnitHeight(value) : this.setSheapUnitWeight(value);
  }

  public transform(value: number, sheapType: 'weight' | 'height'): string {
    this.setSheapUnit(value, sheapType);
    value = value / 10;

    return new Intl.NumberFormat('pt-BR', {
      style: 'unit',
      unit: this.sheapUnit.get(sheapType)
    })
      .format(value)?.replace(/\s/g, '');
  }
}
