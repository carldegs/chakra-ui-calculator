import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      'div#root': {
        height: '100vh',
        bg: 'gray.800',
      },
    },
  },
  sizes: {
    xs: '100px',
  },
});

export default theme;
