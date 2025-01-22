'use client';
import { Box, Center, Icon, IconButton, Text } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import MenuIcon from './MenuIcon';
import { Logo } from '../Logo';
import { useSidenav } from '../sidenav/sidenav-context';

export const AppBar = () => {
  const { onOpen } = useSidenav();

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
      <Icon as={Logo} boxSize={8} />
      <Center ml='5px'>
        <Text fontSize='2xl' fontWeight='bold' color='green'>
          Bananeras
        </Text>
      </Center>
      <IconButton
        aria-label='menu'
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        icon={<FiMenu />}
      />
      <MenuIcon />
    </Box>
  );
};
