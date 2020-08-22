import { WINDOW_WIDTH } from '~/constants';

export const getStarAmount = ({ value }) => {
  const numberValue = Number(value);

  let interpolatedValue = (numberValue * 100) / (WINDOW_WIDTH - 90);
  if (interpolatedValue > 100) {
    interpolatedValue = 100;
  } else if (interpolatedValue < 0) {
    interpolatedValue = 0;
  }

    return Math.round(interpolatedValue);
}
