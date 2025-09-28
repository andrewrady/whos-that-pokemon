// Reusable base interface
interface NamedAPIResource {
  name: string;
  url: string;
}

// Abilities
interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

// Cries
interface PokemonCries {
  latest: string;
  legacy: string;
}

// Forms
type PokemonForm = NamedAPIResource;

// Game indices
interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

// Held Items
interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: VersionDetail[];
}

// Moves
interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  order: number | null;
  version_group: NamedAPIResource;
}

interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

// Past Abilities
interface PastAbility {
  abilities: {
    ability: NamedAPIResource | null;
    is_hidden: boolean;
    slot: number;
  }[];
  generation: NamedAPIResource;
}

// Sprites (trimmed for readability – can be expanded fully if needed)
interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  [key: string]: any; // allow nested objects like "other" and "versions"
}

// Main Pokemon Class
export class PokemonResult {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: PokemonCries;
  forms: PokemonForm[];
  game_indices: VersionGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_types: any[]; // expand if needed
  species: NamedAPIResource;
  sprites: PokemonSprites;

  constructor(data: any) {
    this.abilities = data.abilities;
    this.base_experience = data.base_experience;
    this.cries = data.cries;
    this.forms = data.forms;
    this.game_indices = data.game_indices;
    this.height = data.height;
    this.held_items = data.held_items;
    this.id = data.id;
    this.is_default = data.is_default;
    this.location_area_encounters = data.location_area_encounters;
    this.moves = data.moves;
    this.name = data.name;
    this.order = data.order;
    this.past_abilities = data.past_abilities;
    this.past_types = data.past_types;
    this.species = data.species;
    this.sprites = data.sprites;
  }
}
