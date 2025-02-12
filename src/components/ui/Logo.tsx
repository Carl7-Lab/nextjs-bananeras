import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { useExporter } from '../../hooks/useUserProfile';

export const Logo = () => {
  const { user, isLoading } = useExporter();
  const logoSrc =
    user?.exporterDetails?.logoUrl && !isLoading
      ? user.exporterDetails.logoUrl
      : '/Banana.svg';
  return (
    <>
      <Box>
        <Image width={40} height={40} src={logoSrc} alt='logo' />
      </Box>
    </>
  );
};
