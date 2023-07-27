export type OptionItem<T extends string> = {
  value: T;
  label: string;
  classes: {
    container: string;
    text: string;
  };
};
