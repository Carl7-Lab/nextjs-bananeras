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
  Badge,
} from '@chakra-ui/react';
import Link_Next from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { AccordionMenu } from './AccordionMenu';
import { useSidenav } from './sidenav-context';

export interface SidenavItem {
  icon: IconType;
  label: string;
  to: string;
  isMenu?: boolean;
  menu?: SidenavMenuItem[];
  count?: number;
}

export interface SidenavMenuItem {
  label: string;
  to: string;
  count?: number;
}

export interface SidenavItemsProps {
  navItems: SidenavItem[];
  mode?: 'semi' | 'over';
}

export function SidenavItems({
  navItems,
  mode = 'semi',
}: SidenavItemsProps): React.JSX.Element {
  const pathname = usePathname();
  const { isOpen } = useSidenav();
  const isAble: boolean = pathname !== '/dashboard/onboarding';
  const renderBadge = (count?: number): React.JSX.Element | null => {
    if (count && count > 0) {
      return (
        <Badge colorScheme='red' ml='auto' mr={2.5} my={'auto'}>
          {count}
        </Badge>
      );
    }
    return null;
  };
  const sidebarItemInOverMode = (
    item: SidenavItem,
    index: number
  ): React.JSX.Element => (
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
                  {renderBadge(item.count)}
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
                    {renderBadge(item.count)}
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

  const sidebarItemInSemiMode = (
    item: SidenavItem,
    index: number
  ): React.JSX.Element => (
    <ListItem key={index}>
      {item.isMenu ? (
        <AccordionMenu item={item} />
      ) : (
        <Link
          display='block'
          as={Link_Next}
          href={isAble ? item.to : ''}
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
    <List
      spacing={3}
      w='full'
      px='16px'
      mt={isOpen ? '10px' : '70px'}
      pt={'10px'}
    >
      {mode === 'semi'
        ? navItems.map((item, index) => sidebarItemInSemiMode(item, index))
        : navItems.map((item, index) => sidebarItemInOverMode(item, index))}
    </List>
  );
}

export default SidenavItems;
