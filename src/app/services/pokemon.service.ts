import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokedexResponse } from '../types/pokedex-response';
import { Pokemon } from '../types/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = 'https://pokeapi.co/api/v2';

  pokemons: Pokemon[] = [];

  constructor(private http: HttpClient) { }

  listAll(): void {
    this.http.get<PokedexResponse>(`${this.url}/pokedex/1`).subscribe(response => {
      const pokemons = response.pokemon_entries.map<Pokemon>(pokemon_entry => {
        const number = pokemon_entry.entry_number;
        const { name } = pokemon_entry.pokemon_species;
        const pokemon: Pokemon = { name, number }

        return pokemon;
      });

      const sortedPokemons = this.sortPokemons(pokemons);
      const filteredPokemons =  this.filterPokemons(sortedPokemons);

      this.pokemons = filteredPokemons;
    })
  }

  private sortPokemons(pokemons: Pokemon[]): Pokemon[] {
    const sortedPokemons: Pokemon[] = pokemons.sort((a, b) => a.number > b.number ? 1 : -1);
    return sortedPokemons;
  }

  private filterPokemons(pokemons: Pokemon[]): Pokemon[] {
    const filteredPokemons = pokemons.filter(pokemon => pokemon.number < 722);
    return filteredPokemons;
  }
}
