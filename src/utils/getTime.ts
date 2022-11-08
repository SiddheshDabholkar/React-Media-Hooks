const giveZero = (n: number) => n.toString().padStart(2, "0");

export const getTime = (mseconds: number): string => {
  let seconds = Math.floor(mseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${giveZero(hours)}:${giveZero(minutes)}:${giveZero(seconds)}`;
};
