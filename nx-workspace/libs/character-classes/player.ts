import { Character } from './character';
export class Player {
    id: number;
    name: string;
    email: string;
    password: string;
    characters: Character[];
    constructor(player: IPlayer) {
        this.id = player.id;
        this.name = player.name;
        this.email = player.email;
        this.password = player.password;
        this.characters = player.characters;
    }
}

export interface IPlayer {
    id: number;
    name: string;
    email: string;
    password: string;
    characters: Character[];
}