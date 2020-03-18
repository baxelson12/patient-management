module.exports = {
  theme: {
    extend: {
      translate: { '1/2': '0.125rem' }
    }
  },
  variants: {
    backgroundColor: ['focus-within', 'hover', 'focus'],
    borderColor: ['active'],
    textColor: ['group-hover', 'hover'],
    margin: ['focus'],
    translate: ['active'],
    borderWidth: ['active']
  },
  plugins: []
};
