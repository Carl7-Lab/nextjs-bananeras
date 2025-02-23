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
  Link,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import Link_Next from 'next/link';
import React from 'react';
import { useSidenav } from './sidenav-context';
import SidenavItems, { SidenavItem } from './sidenav-items';
import { useExporter } from '../../../hooks/useUserProfile';
import { Logo } from '../Logo';

export interface SidenavProps {
  navItems: SidenavItem[];
}

export function Sidenav({ navItems }: SidenavProps): React.JSX.Element {
  const { isOpen, onClose } = useSidenav();
  const { user, isLoading } = useExporter();
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
          <SkeletonCircle
            isLoaded={!isLoading}
            startColor='teal.500'
            endColor='teal.800'
            size='10'
            mr='8px'
          >
            <Icon as={Logo} boxSize={8} />
          </SkeletonCircle>{' '}
          <Center ml='5px'>
            <Link
              as={Link_Next}
              href={'/dashboard'}
              _hover={{
                color: 'white',
              }}
            >
              <Skeleton
                isLoaded={!isLoading}
                startColor='teal.500'
                endColor='teal.800'
              >
                <Text
                  fontSize={{ base: 'lg', md: '2xl' }}
                  fontWeight='bold'
                  color='green'
                >
                  {user?.exporterDetails.businessName || 'Bananeras'}
                </Text>
              </Skeleton>
            </Link>
          </Center>
        </Flex>
        <SidenavItems navItems={navItems} />
      </VStack>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex>
              <SkeletonCircle
                isLoaded={!isLoading}
                startColor='teal.500'
                endColor='teal.800'
                size='10'
                mr='8px'
              >
                <Icon as={Logo} boxSize={8} />
              </SkeletonCircle>
              <Center ml='5px'>
                <Skeleton
                  isLoaded={!isLoading}
                  startColor='teal.500'
                  endColor='teal.800'
                >
                  <Text
                    fontSize={{ base: 'xl' }}
                    fontWeight='bold'
                    color='green'
                  >
                    {user?.exporterDetails.businessName || 'Bananeras'}
                  </Text>
                </Skeleton>
              </Center>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <SidenavItems navItems={navItems} mode='over' />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidenav;
