'use client';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  AvatarBadge,
  Avatar,
  SkeletonCircle,
  MenuDivider,
} from '@chakra-ui/react';
import React from 'react';
import { MdOutlineNotifications } from 'react-icons/md';
import { useNotifications } from '../../../hooks/useNotifications';

const MenuNotification = () => {
  const { notifications, isLoading } = useNotifications();

  if (isLoading)
    return (
      <SkeletonCircle
        startColor='teal.500'
        endColor='teal.800'
        size='10'
        mr='8px'
      />
    );

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        bg='green.500'
        icon={
          <Avatar
            bg='green.500'
            h={'36px'}
            w={'36px'}
            aria-label='user-pic'
            rounded={'full'}
            icon={<MdOutlineNotifications size={'30px'} />}
          >
            {notifications.length > 0 && (
              <AvatarBadge bg={'red.500'} boxSize='1.5em' fontSize='sm'>
                {notifications.length}
              </AvatarBadge>
            )}
          </Avatar>
        }
        rounded='full'
        mr='8px'
      ></MenuButton>

      <MenuList minWidth='auto'>
        <Flex alignItems='center' justifyContent='space-between' p='12px'>
          <Heading fontSize='md'>Notificaciones</Heading>
          <Badge colorScheme={notifications.length > 0 ? 'red' : 'green'}>
            {notifications.length} Pendiente
            {notifications.length === 1 ? '' : 's'}
          </Badge>{' '}
        </Flex>
        <MenuDivider />
        {notifications.length > 0 ? (
          notifications.map((notification: any, index: any) => (
            <MenuItem key={index} as='a' href={notification.href}>
              {notification.message}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No hay notificaciones pendientes</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuNotification;
