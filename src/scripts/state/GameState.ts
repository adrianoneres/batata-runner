interface IState {
  selectedCharacter: string;
  showScore: boolean;
  speed: number;
}

export const game: IState = {
  selectedCharacter: 'pedro',
  showScore: true,
  speed: 5,
};
