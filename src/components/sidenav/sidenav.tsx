import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  DrawerBody,
  Icon,
  Text,
  Flex,
  Center,
  theme,
} from '@chakra-ui/react';
import React from 'react';
import { useSidenav } from './sidenav-context';
import SidenavItems, { SidenavItem } from './sidenav-items';
import { Logo } from '../ui/Logo';

export interface SidenavProps {
  navItems: SidenavItem[];
}

export function Sidenav({ navItems }: SidenavProps) {
  const { isOpen, onClose } = useSidenav();
  return (
    <React.Fragment>
      <VStack
        spacing='0'
        as='nav'
        display={{ base: 'none', md: 'flex' }}
        alignItems='flex-start'
      >
        <Flex
          p='16px'
          w='full'
          pos='fixed'
          top='0'
          left='0'
          right='0'
          zIndex='999'
          bg={'white'}
          shadow='xs'
        >
          <Icon as={Logo} boxSize={8} />
          <Center ml='5px'>
            <Text fontSize='2xl' fontWeight='bold' color='green'>
              Bananeras
            </Text>
          </Center>
        </Flex>
        <SidenavItems navItems={navItems} />
      </VStack>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sidenav Header</DrawerHeader>
          <DrawerBody>
            <SidenavItems navItems={navItems} mode='over' />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidenav;
