import { Box, Grid, GridItem } from '@chakra-ui/react';
import { ReactNode, ReactElement } from 'react';

export interface SidenavContainerProps {
  children: ReactNode;
  sidenav: ReactElement;
}

export function SidenavContainer({ children, sidenav }: SidenavContainerProps) {
  return (
    <Grid
      templateAreas={`'sidebar main'`}
      templateColumns='auto 1fr'
      width='100%'
      p={'0px'}
    >
      <GridItem area='sidebar' as='aside' w='full' p={0}>
        <Box
          pos='sticky'
          top={0}
          w={{ base: 0, md: '250px' }}
          borderRight='1px solid'
          borderColor='gray.100'
          p='0'
          height='100vh'
          overflow='auto'
          pb='50px'
          css={{
            '&::-webkit-scrollbar': {
              height: 'var(--chakra-sizes-1)',
              width: 'var(--chakra-sizes-1)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var(--chakra-colors-gray-400)',
            },
          }}
          bgColor={'white'}
        >
          {sidenav}
        </Box>
      </GridItem>
      <GridItem as='main' area='main' p='0px' w={'100%'}>
        {children}
      </GridItem>
    </Grid>
  );
}

export default SidenavContainer;
