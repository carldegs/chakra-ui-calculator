// TODO: Dynamic import?
import { useMemo } from 'react';

import breakpoints from '../data/breakpoints.json';
import fontSizes from '../data/fontSizes.json';
import fontWeights from '../data/fontWeights.json';
import letterSpacings from '../data/letterSpacings.json';
import lineHeights from '../data/lineHeights.json';
import radii from '../data/radii.json';
import sizes from '../data/sizes.json';
import space from '../data/space.json';
import zindices from '../data/zIndices.json';
import { ThemeParam, ValueUnits } from '../types';
import { getClosestValues, toRem, parseValueString } from '../utils/convert';
import {
  filterNonNumericValues,
  flattenThemeParam,
} from '../utils/themeParams';

const data: Record<ThemeParam, any> = {
  breakpoints,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  sizes,
  space,
  zIndices: zindices,
};

const useConvert = (
  themeParam: ThemeParam,
  value: string | number,
  unit: ValueUnits
) => {
  const defaultValues = useMemo(() => data[themeParam], [themeParam]);
  const themeValue = useMemo(() => {
    if (!value) {
      return [];
    }

    const val = unit ? toRem(parseValueString(`${value}${unit}`)) : +value;

    const filteredData = filterNonNumericValues(
      flattenThemeParam(defaultValues)
    );

    const closestValues = getClosestValues(val, filteredData);
    return closestValues;
  }, [defaultValues, unit, value]);

  return {
    themeValue,
    defaultValues,
  };
};

export default useConvert;
