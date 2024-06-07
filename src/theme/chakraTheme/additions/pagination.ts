import { Button } from '../components';

const paginationButton = {
  ...Button.baseStyle,
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '32px',
  height: '32px',
  padding: '0px 6px',
  bg: 'transparent',
  border: 0,
  outline: 0,
  lineHeight: 0,
  letterSpacing: 0,
  textDecoration: 'none',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  appearance: 'none',
  _hover: {
    bg: 'rgba(0, 0, 0, 0.06)',
  },
};

export const Pagination = {
  baseStyle: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
    py: 3,
    listStyleType: 'none',

    'li:not(.break)': { a: { ...paginationButton } },

    'li.selected': {
      a: {
        bg: 'blue.600',
        color: 'white',
        _hover: {
          bg: 'blue.600',
        },
      },
    },

    'li.break': { display: 'flex', alignItems: 'flex-end', fontSize: '24px' },
  },
};
