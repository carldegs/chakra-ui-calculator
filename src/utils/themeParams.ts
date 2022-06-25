import { parseValueString } from './convert';

export const flattenThemeParam = (
  themeParam: Record<string, string | number | Record<string, string | number>>
) =>
  // TODO: Make recursive
  Object.entries(themeParam).reduce((obj, [key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return {
        ...obj,
        [key]: value,
      };
    }

    return {
      ...obj,
      ...Object.fromEntries(
        Object.entries(value).map(([innerKey, innerValue]) => [
          `${key}.${innerKey}`,
          innerValue,
        ])
      ),
    };
  }, {} as Record<string, string | number>);

export const filterNonNumericValues = (themeParam: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(themeParam).filter(([, value]) => !!parseValueString(value))
  );
