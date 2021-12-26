interface IState {
  sprites: { [key: string]: any };
  sounds: { [key: string]: any };
}

export const resources: IState = {
  sprites: {},
  sounds: {},
};
