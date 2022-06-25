import { ThemeParam, ValueUnits } from './types';

export const DEFAULT_PX_TO_REM = 16;

const DEFAULT_UNITS = [ValueUnits.px, ValueUnits.em, ValueUnits.rem];
export const THEME_PARAMS: Record<
  ThemeParam,
  { name: string; units: ValueUnits[] }
> = {
  [ThemeParam.space]: {
    name: 'Spaces',
    units: DEFAULT_UNITS,
  },
  [ThemeParam.sizes]: {
    name: 'Sizes',
    units: DEFAULT_UNITS,
  },
  [ThemeParam.fontSizes]: {
    name: 'Font Sizes',
    units: DEFAULT_UNITS,
  },
  [ThemeParam.fontWeights]: {
    name: 'Font Weights',
    units: [ValueUnits.none],
  },
  [ThemeParam.letterSpacings]: {
    name: 'Letter Spacings',
    units: DEFAULT_UNITS,
  },
  [ThemeParam.lineHeights]: {
    name: 'Line Heights',
    units: [...DEFAULT_UNITS, ValueUnits.none],
  },
  [ThemeParam.radii]: {
    name: 'Border Radius',
    units: DEFAULT_UNITS,
  },
  [ThemeParam.zIndices]: {
    name: 'Z-Indices',
    units: [ValueUnits.none],
  },
  [ThemeParam.breakpoints]: {
    name: 'Breakpoints',
    units: DEFAULT_UNITS,
  },
};
