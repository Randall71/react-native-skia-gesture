import { SharedValue } from 'react-native-reanimated';

const unwrapAnimatedValue = <T>(
  value: SharedValue<T> | T | undefined
): T | undefined => {
  'worklet';

  if (value === undefined) {
    return undefined;
  }

  if ((value as SharedValue<T>).value !== undefined) {
    return (value as SharedValue<T>).value as T;
  }

  return value as T;
};

const unwrapAnimatedValueObject = <T>(
  value: Record<any, SharedValue<T> | T>
): Record<any, T> => {
  'worklet';
  return Object.keys(value).reduce((acc, key) => {
    return { ...acc, [key]: unwrapAnimatedValue(value[key]) };
  }, {});
};

export { unwrapAnimatedValue, unwrapAnimatedValueObject };
