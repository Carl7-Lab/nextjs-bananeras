'use client';
import {
  Box,
  Center,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import MenuIcon from './MenuIcon';
import MenuNotification from './MenuNotifications';
import { UseExporterReturn } from '../../../hooks/useUserProfile';
import { Logo } from '../Logo';
import { useSidenav } from '../sidenav/sidenav-context';

interface AppBarProps {
  exporter: UseExporterReturn;
}

export const AppBar = ({ exporter }: AppBarProps): React.JSX.Element => {
  const { user, isLoading } = exporter;
  const { onOpen } = useSidenav();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const shouldShowSkeleton = !user && isLoading;

  return (
    <Box
      as='header'
      px='24px'
      py='12px'
      w='100%'
      h='65px'
      bg='white'
      display='flex'
      justifyContent='flex-end'
    >
      {isMobile ? (
        <>
          <SkeletonCircle
            isLoaded={!shouldShowSkeleton}
            startColor='teal.500'
            endColor='teal.800'
            size='10'
            mr='8px'
          >
            <Icon as={Logo} boxSize={8} />
          </SkeletonCircle>
          <Center ml='5px' mr='auto'>
            <Skeleton
              isLoaded={!shouldShowSkeleton}
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
          </Center>
        </>
      ) : (
        <>
          <Icon as={Logo} boxSize={8} />
          <Center ml='5px' mr='auto'>
            <Text
              fontSize={{ base: 'lg', md: '2xl' }}
              fontWeight='bold'
              color='green'
            >
              {user?.exporterDetails.businessName || 'Bananeras'}
            </Text>
          </Center>
        </>
      )}
      <IconButton
        aria-label='menu'
        display={{ base: 'flex', md: 'none' }}
        mr='8px'
        onClick={onOpen}
        icon={<FiMenu />}
      />
      <MenuNotification />
      <MenuIcon />
    </Box>
  );
};
