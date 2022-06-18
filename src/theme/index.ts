import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'div#root': {
        height: '100vh',
      },
    },
  },
});

export default theme;
