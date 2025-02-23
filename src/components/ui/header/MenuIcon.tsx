'use client';
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  Text,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Icon,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { IconType } from 'react-icons';
import { AiOutlineUser } from 'react-icons/ai';
import { getTopBarItems } from './MenuIconItem';

export interface MenuItemProps {
  icon: IconType;
  label: string;
  to: string;
}

export default function MenuIcon(): React.JSX.Element {
  const { data: session } = useSession();
  const menuItems = getTopBarItems();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        bg='green.500'
        h={'auto'}
        w={'auto'}
        aria-label='user-pic'
        rounded={'full'}
        icon={
          <Avatar
            bg='green.500'
            h={'36px'}
            w={'36px'}
            aria-label='user-pic'
            rounded={'full'}
            icon={<AiOutlineUser size={'30px'} />}
          />
        }
      />

      <MenuList minWidth='220px'>
        <Flex p={'12px'} gap='10px'>
          <Avatar
            bg='green.500'
            h={'36px'}
            w={'36px'}
            aria-label='user-pic'
            rounded={'full'}
            icon={<AiOutlineUser size={'30px'} />}
          />
          <Box>
            <Heading fontSize={'md'}>{session?.user.name}</Heading>
            <Text fontSize={'xs'}>{session?.user.email}</Text>
          </Box>
        </Flex>

        <MenuDivider />

        <MenuOptionGroup>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              as='a'
              href={item.to}
              px={'12px'}
              py={'6px'}
              gap={'10px'}
            >
              <Icon as={item.icon} size={'16px'} />
              {item.label}
            </MenuItem>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
