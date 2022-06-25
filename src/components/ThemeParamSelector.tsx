import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
} from '@chakra-ui/react';
import { List } from 'phosphor-react';
import React from 'react';

import { THEME_PARAMS } from '../constants';
import { ThemeParam } from '../types';

interface ThemeParamSelectorProps extends Omit<MenuProps, 'children'> {
  onSelect(param: ThemeParam): void;
  active?: ThemeParam;
}

const ThemeParamSelector: React.FC<ThemeParamSelectorProps> = ({
  onSelect,
  active,
  ...menuProps
}) => (
  <Menu {...menuProps}>
    <MenuButton
      as={IconButton}
      aria-label="Theme Param Selector"
      icon={<List size={24} />}
      size="sm"
      variant="ghost"
      ml={-2}
      mt={1}
    />
    <MenuList>
      {Object.entries(THEME_PARAMS).map(([key, value]) => (
        <MenuItem
          key={`param-selector-${key}`}
          onClick={() => {
            if (onSelect) {
              onSelect(key as ThemeParam);
            }
          }}
        >
          {value.name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default ThemeParamSelector;
