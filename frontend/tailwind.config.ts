import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        bgaccent: '#242038',
        primaryaccent: '#8D86C9',
        secondaryaccent: '#9067C6',
      },
      boxShadow: {
        'sm': '0px 0px 1px 0px rgba(0, 0, 0, 0.3)',
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
    },
  },
}