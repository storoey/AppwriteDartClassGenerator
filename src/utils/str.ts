const Str = () => {
  const upperFirstLetter = (s: string): string => {
    return s.substring(0, 1).toLocaleUpperCase() + s.substring(1);
  };

  const lowerFirstLetter = (s: string): string => {
    return s.substring(0, 1).toLocaleLowerCase() + s.substring(1);
  };

  return {
    upperFirstLetter,
    lowerFirstLetter,
  };
};

export const str = Str();
