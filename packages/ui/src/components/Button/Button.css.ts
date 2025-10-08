import { style, styleVariants } from '@vanilla-extract/css'

export const button = style({
  borderRadius: '8px',
  border: 'none',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  outline: 'none',

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
})

export const variants = styleVariants({
  primary: {
    backgroundColor: '#3b82f6',
    color: 'white',

    ':hover:not(:disabled)': {
      backgroundColor: '#2563eb',
    },
  },
  secondary: {
    backgroundColor: '#f3f4f6',
    color: '#374151',

    ':hover:not(:disabled)': {
      backgroundColor: '#e5e7eb',
    },
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    border: '2px solid #3b82f6',

    ':hover:not(:disabled)': {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
  },
})

export const sizes = styleVariants({
  sm: {
    padding: '8px 16px',
    fontSize: '14px',
  },
  md: {
    padding: '12px 24px',
    fontSize: '16px',
  },
  lg: {
    padding: '16px 32px',
    fontSize: '18px',
  },
})
