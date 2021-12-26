interface IState {
  selectedCharacter: string;
  showScore: boolean;
  speed: number;
}

export const game: IState = {
  selectedCharacter: 'batima',
  showScore: true,
  speed: 5,
};
