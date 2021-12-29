interface IState {
  availableCharacters: ICharacter[];
}

export interface ICharacter {
  id: string;
  name: string;
}

export const characters: IState = {
  availableCharacters: [
    { id: 'batima', name: 'Bátima' },
    { id: 'biel', name: 'Biel' },
    { id: 'caua', name: 'Caua' },
    { id: 'flexa', name: 'Flexa' },
    { id: 'farofa', name: 'Farofa' },
    { id: 'gab', name: 'Gab' },
    { id: 'gu', name: 'Gu' },
    { id: 'kevin', name: 'Kevin' },
    { id: 'leo', name: 'Leo' },
    { id: 'lo', name: 'Lo' },
    { id: 'marco', name: 'Marco' },
    { id: 'miranha', name: 'Miranha' },
    { id: 'nano', name: 'Nano' },
    { id: 'shulqs', name: 'Shulqs' },
    { id: 'vi', name: 'Vi' },
    { id: 'yu', name: 'Yu' },
  ],
};
