import { Button, Flex, Icon, Link, Text } from '@chakra-ui/react';
import Link_Next from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { SidenavItem } from './sidenav-items';
import { isOnboarding } from '../../lib/constants';

interface AccordionMenuProps {
  item: SidenavItem;
}

export const AccordionMenu = ({ item }: AccordionMenuProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(pathname === item.to);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        onClick={toggleAccordion}
        px='10px'
        py='12px'
        // _focus={{ bg: 'green.300', color: 'white' }}
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
          <Text ml={2} fontSize={'md'}>
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
            href={isOnboarding ? item.to : ''}
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
  );
};
