export interface Pokemon {
    name: string,
    url: string
    
}

export interface PokemonDetails extends Pokemon {
    base_experience: number,
    height: number,
    id: number,
    weight: 69,
    order: number,
    is_default: boolean,
    sprites: Sprite,
    species: Spicie
    abilities: Ability[]
}

export interface Sprite {
    back_default: string,
    back_shiny: string,
    front_default: string,
    front_shiny: string
}

interface Spicie {
    name: string,
    url: string
}

interface Ability {
    ability: AbilityDetails,
    is_hidden: false,
    slot: number
}

interface AbilityDetails {
    name:string,
    url: string
}

export interface Pagination {
    limit: number,
    offset: number
}