import { extendTheme, Img, ImgProps, Stack } from '@chakra-ui/react';


const theme = extendTheme({
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
         bg: props.colorMode === 'dark' ? 'gray.800' : 'purple.600'
      },
    }),
  },
});

export default theme;