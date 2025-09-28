// A single Pokémon entry in the list
interface PokemonListResult {
  name: string;
  url: string;
}

// The full paginated response
export class PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];

  constructor(data: any) {
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }
}
