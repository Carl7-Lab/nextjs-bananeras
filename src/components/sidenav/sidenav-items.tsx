// 'use client';
import {
  List,
  ListItem,
  Icon,
  Flex,
  Text,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  theme,
} from '@chakra-ui/react';
import Link_Next from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

export interface SidenavItem {
  icon: IconType;
  label: string;
  to?: string;
  isMenu?: boolean;
  menu?: SidenavMenuItem[];
}

export interface SidenavMenuItem {
  label: string;
  to: string;
}

export interface SidenavItemsProps {
  navItems: SidenavItem[];
  mode?: 'semi' | 'over';
}

export function SidenavItems({ navItems, mode = 'semi' }: SidenavItemsProps) {
  const pathname = usePathname();
  const subMenus: SidenavItem[] = navItems.filter(
    (navItem) => navItem.isMenu === true
  );

  const isSubMenu = subMenus.find((subMenu) =>
    subMenu.menu?.find((item) => item.to === pathname)
  );

  const [isOpen, setIsOpen] = useState(!!isSubMenu);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const sidebarItemInOverMode = (item: SidenavItem, index: number) => (
    <ListItem key={index}>
      {item.isMenu ? (
        <Accordion allowToggle w='full' borderY='0px'>
          <AccordionItem borderY='0px'>
            <AccordionButton
              px='10px'
              py='12px'
              bgColor={'green.200'}
              borderRadius='md'
            >
              <Box flex='1' textAlign='left'>
                <Flex>
                  <Icon boxSize='5' as={item.icon} />
                  <Text ml={2}>{item.label}</Text>
                </Flex>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              {item.menu?.map((item, index) => (
                <Link
                  key={index}
                  display='block'
                  as={Link_Next}
                  href={item.to}
                  _focus={{ bg: 'gray.100' }}
                  _hover={{
                    bg: 'gray.200',
                  }}
                  _activeLink={{ bg: 'orange.500', color: 'white' }}
                  w='full'
                  borderRadius='md'
                  // color={'green.800'}
                >
                  <Flex alignItems='center' p={2}>
                    <Text ml={2}>{item.label}</Text>
                  </Flex>
                </Link>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link
          display='block'
          as={Link_Next}
          href={item.to}
          _focus={{ bg: 'gray.100' }}
          _hover={{
            bg: 'gray.200',
          }}
          _activeLink={{ bg: 'orange.500', color: 'white' }}
          w='full'
          borderRadius='md'
        >
          <Flex alignItems='center' p={2}>
            <Icon boxSize='5' as={item.icon} />
            <Text ml={2}>{item.label}</Text>
          </Flex>
        </Link>
      )}
    </ListItem>
  );

  const sidebarItemInSemiMode = (item: SidenavItem, index: number) => (
    <ListItem key={index}>
      {item.isMenu ? (
        <>
          <Button
            onClick={toggleAccordion}
            px='10px'
            py='12px'
            _focus={{ bg: 'green.300', color: 'white' }}
            _hover={{
              bg: 'green.300',
              color: 'white',
            }}
            bgColor={isOpen ? 'green.300' : 'transparent'}
            color={isOpen ? 'white' : 'black'}
            borderRadius='md'
            w={'full'}
            display={'flex'}
            justifyContent={'space-between'}
            h={'48px'}
          >
            <Flex>
              <Icon as={item.icon} boxSize={'16px'} />
              <Text ml={2} fontSize={theme.fontSizes.md}>
                {item.label}
              </Text>
            </Flex>
            <Icon as={isOpen ? IoIosArrowDown : IoIosArrowForward} />
          </Button>
          {isOpen &&
            item.menu?.map((item, index) => (
              <Link
                key={index}
                display={'block'}
                as={Link_Next}
                href={item.to}
                w='full'
                borderRadius='md'
                color={pathname === item.to ? 'green.800' : 'black'}
              >
                <Flex alignItems='center' justifyContent='start' p={2}>
                  <Text ml={2}>{item.label}</Text>
                </Flex>
              </Link>
            ))}
        </>
      ) : (
        <Link
          display='block'
          as={Link_Next}
          href={item.to}
          _focus={{ bg: 'green.300', color: 'white' }}
          _hover={{
            bg: 'green.300',
            color: 'white',
          }}
          _activeLink={{ bg: 'green.800', color: 'white' }}
          w='full'
          borderRadius='md'
          bgColor={pathname === item.to ? 'green.300' : 'transparent'}
          px='10px'
          py='12px'
          color={pathname === item.to ? 'white' : 'black'}
          onClick={toggleAccordion}
        >
          <Flex alignItems='center' justifyContent='start'>
            <Icon size={'20'} as={item.icon} />
            <Text ml={2}>{item.label}</Text>
          </Flex>
        </Link>
      )}
    </ListItem>
  );

  return (
    <List spacing={3} w='full' px='16px'>
      {mode === 'semi'
        ? navItems.map((item, index) => sidebarItemInSemiMode(item, index))
        : navItems.map((item, index) => sidebarItemInOverMode(item, index))}
    </List>
  );
}

export default SidenavItems;
