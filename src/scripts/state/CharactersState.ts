interface IState {
  availableCharacters: ICharacter[];
}

export interface ICharacter {
  id: string;
  name: string;
}

export const characters: IState = {
  availableCharacters: [
    { id: 'biel', name: 'Biel' },
    { id: 'caua', name: 'Caua' },
    { id: 'farofa', name: 'Farofa' },
    { id: 'gu', name: 'Gu' },
    { id: 'nano', name: 'Nano' },
    { id: 'pepe', name: 'Pepe' },
    { id: 'shulqs', name: 'Shulqs' },
    { id: 'vi', name: 'Vi' },
  ],
};
