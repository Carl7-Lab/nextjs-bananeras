import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Text: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {
    h1: {
      fontSize: '4.625rem',
      lineHeight: '80px',
    },
    h2: {
      fontSize: '4rem',
      lineHeight: '70px',
    },
    h3: {
      fontSize: '3.375rem',
      lineHeight: '60px',
    },
    h4: {
      fontSize: '2.75rem',
      lineHeight: '50px',
    },
    h5: {
      fontSize: '2.25rem',
      lineHeight: '40px',
    },
    'title-1': {
      fontSize: '1.875rem',
      lineHeight: '36px',
    },
    'title-2': {
      fontSize: '1.5rem',
      lineHeight: '30px',
    },
    'subtitle-1': {
      fontSize: '1.25rem',
      lineHeight: '26px',
    },
    'subtitle-2': {
      fontSize: '1.125rem',
      lineHeight: '22px',
    },
    'bodyText-1': {
      fontSize: '1rem',
      lineHeight: '20px',
    },
    'bodyText-2': {
      fontSize: '0.875rem',
      lineHeight: '18px',
    },
    'paragraph-1': {
      fontSize: '0.75rem',
      lineHeight: '16px',
    },
    'paragraph-2': {
      fontSize: '0.688rem',
      lineHeight: '15px',
    },
  },
  variants: {
    light: {
      color: 'gray.500',
      fontSize: 'sm',
    },
    'subtitle-bold': {
      color: '#3D424D',
      fontWeight: '700',
    },
  },
  defaultProps: {
    color: 'gray.800',
  },
};
