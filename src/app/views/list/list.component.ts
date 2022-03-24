import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/types/pokemon';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  filter: string = '';
  selectedPokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.listAll();
  }

  get pokemons(): Pokemon[] {
    const filteredPokemons: Pokemon[] = this.filterPokemons(this.pokemonService.pokemons);
    return filteredPokemons;
  }

  get pokemonSrc(): string | void {
    if (this.selectedPokemon) {
      const number = ('000' + this.selectedPokemon.number).slice(-3);
      return `https://serebii.net/sunmoon/pokemon/${number}.png`
    }
  }

  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }

  private filterPokemons(pokemons: Pokemon[]): Pokemon[] {
    const filteredPokemons: Pokemon[] = pokemons.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(this.filter.toLowerCase())
    });

    return filteredPokemons;
  }

}
