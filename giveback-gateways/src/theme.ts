import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// const config: ThemeConfig = {
//     initialColorMode: 'dark',
// }

const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "gray.200",
        },
      },
    },
  });
  
export default theme;