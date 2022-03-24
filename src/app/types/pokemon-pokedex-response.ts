import { PokemonSpeciePokemonPokedexResponse } from './pokemon-specie-pokemon-pokedex-response';

export interface PokemonPokedexResponse {
  entry_number: number;
  pokemon_species: PokemonSpeciePokemonPokedexResponse
}
