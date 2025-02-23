/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

interface MyToastProps {
  title: string;
  description: string;
  status: 'error' | 'info' | 'loading' | 'success' | 'warning';
  position:
    | 'top'
    | 'top-right'
    | 'top-left'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left';
  variant: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
}

const useToastCustom = () => {
  const toast = useToast();

  const generateToast = ({
    title,
    description,
    status = 'info',
    position = 'bottom',
    variant = 'solid',
  }: MyToastProps): void => {
    toast({
      title,
      description,
      status,
      position,
      variant,
      duration: 5000,
      isClosable: true,
    });
  };

  const closeAllToasts = (): void => {
    toast.closeAll();
  };

  // Cerrar todos los toasts cuando el componente se desmonta
  useEffect(() => {
    return (): void => {
      closeAllToasts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    generateToast,
    closeAllToasts,
  };
};

export default useToastCustom;
