'use client';
import { Box } from '@chakra-ui/react';
import MenuIcon from './MenuIcon';

export const AppBar = () => {
  return (
    <Box
      as={'header'}
      px={'24px'}
      py={'12px'}
      w={'100%'}
      h={'65px'}
      bg={'white'}
      display='flex'
      justifyContent='flex-end'
    >
      <MenuIcon />
    </Box>
  );
};
