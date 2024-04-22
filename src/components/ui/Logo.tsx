import { Box } from '@chakra-ui/react';
import Image from 'next/image';

export const Logo = () => {
  return (
    <>
      <Box>
        <Image width={40} height={40} src='/Banana.svg' alt='logo' />
      </Box>
    </>
  );
};
