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
    { id: 'leo', name: 'Leo' },
    { id: 'nano', name: 'Nano' },
    { id: 'pedro', name: 'Pedrinho' },
    { id: 'shulqs', name: 'Shulqs' },
    { id: 'vi', name: 'Vi' },
  ],
};
