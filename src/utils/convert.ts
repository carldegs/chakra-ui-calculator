import { DEFAULT_PX_TO_REM } from '../constants';
import { ValueUnits } from '../types';

interface ValueObject {
  value: string | number;
  unit: ValueUnits;
}

export const parseValueString = (str = ''): ValueObject | undefined => {
  if (!str) {
    return {
      value: '',
    } as ValueObject;
  }

  str = `${str}`;

  let unit: ValueUnits | undefined;
  let value: string | undefined;

  if (str.includes(ValueUnits.px)) {
    value = str.replace(ValueUnits.px, '');
    unit = ValueUnits.px;
  } else if (str.includes(ValueUnits.rem)) {
    value = str.replace(ValueUnits.rem, '');
    unit = ValueUnits.rem;
  } else if (str.includes(ValueUnits.em)) {
    value = str.replace(ValueUnits.em, '');
    unit = ValueUnits.em;
  } else if (str.includes('%')) {
    return undefined;
  } else {
    value = str.replace(/[^0-9.]+/g, '');
    unit = undefined;
  }

  if (!value || isNaN(+value)) {
    return;
  }

  return {
    value,
    unit,
  } as ValueObject;
};

export const toRem = ({ value, unit }: ValueObject = {} as ValueObject) => {
  if (unit === ValueUnits.px) {
    return +value / DEFAULT_PX_TO_REM;
  }

  return +value;
};

export const remToPx = (value: number) => value * DEFAULT_PX_TO_REM;

export const getClosestValues = (
  inputVal: number,
  themeParamVals: Record<string | number, string | number>
) => {
  const convertedThemeParamVals = toRemObject(themeParamVals);

  const sorted = Object.entries(convertedThemeParamVals)
    .map(([value, actualValue]) => ({
      value,
      actualValue: themeParamVals[value],
      difference: remToPx(actualValue - inputVal),
      comp: Math.abs(remToPx(actualValue - inputVal)),
    }))
    .sort((a, b) => a.comp - b.comp);

  return (
    sorted[0]?.difference === 0 ? [sorted[0]] : [sorted[0], sorted[1]]
  ).map((val) => ({
    ...val,
  }));
};

export const toRemObject = (obj: Record<string | number, string | number>) =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(
        ([, value]) => typeof value === 'string' || typeof value === 'number'
      )
      .map(([key, value]) => {
        const parsed = parseValueString(value as string);
        return [key, parsed?.unit ? toRem(parsed) : +value];
      })
  );
