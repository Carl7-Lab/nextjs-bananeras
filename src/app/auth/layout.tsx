import { Box, Flex, Text, theme } from '@chakra-ui/react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex minH='100vh'>
      {/* Parte izquierda */}
      <Box
        w={{ xl: '50%', '2xl': '50%' }}
        position='relative'
        display={{
          base: 'none',
          sm: 'none',
          md: 'none',
          lg: 'none',
          xl: 'block',
          '2xl': 'block',
        }}
      >
        <Image src='/banano-pic.jpg' alt='Imagen' fill />
        <Box
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          bg={'rgba(0, 128, 0, 0.92)'}
          opacity='1'
          w={{ '2xl': '560px', xl: '490px' }}
          h={{ '2xl': '570px', xl: '440px' }}
          py={{ xl: '56px', '2xl': '84px' }}
          pl={{ xl: '64px', '2xl': '50px' }}
          pr={{ xl: '64px', '2xl': '136px' }}
        >
          <Text
            fontSize={{
              xl: theme.fontSizes['4xl'],
              '2xl': theme.fontSizes['5xl'],
            }}
            fontWeight={{
              xl: theme.fontWeights.extrabold,
              '2xl': theme.fontWeights.extrabold,
            }}
          >
            Mejora continuamente tu producción de banano
          </Text>
        </Box>
      </Box>

      {/* Parte derecha */}
      <Box w={{ base: '100%', xl: '50%', '2xl': '50%' }}>{children}</Box>
    </Flex>
  );
}
