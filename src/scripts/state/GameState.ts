interface IState {
  selectedCharacter: string;
  showScore: boolean;
  speed: number;
}

export const game: IState = {
  selectedCharacter: 'pepe',
  showScore: true,
  speed: 5,
};
