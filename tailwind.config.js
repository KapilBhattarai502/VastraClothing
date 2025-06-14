import tailwindcssAnimate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];

export const content = [
	"./pages/**/*.{ts,tsx}",
	"./components/**/*.{ts,tsx}",
	"./app/**/*.{ts,tsx}",
	"./src/**/*.{ts,tsx}",
];
export const prefix = "";
export const theme = {
	container: {
		center: true,
		padding: '2rem',
		screens: {
			'2xl': '1400px'
		}
	},
	extend: {
		colors: {
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			sidebar: {
				DEFAULT: 'hsl(var(--sidebar-background))',
				foreground: 'hsl(var(--sidebar-foreground))',
				primary: 'hsl(var(--sidebar-primary))',
				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
				accent: 'hsl(var(--sidebar-accent))',
				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
				border: 'hsl(var(--sidebar-border))',
				ring: 'hsl(var(--sidebar-ring))'
			},
			saffron: {
				'50': '#fefdf7',
				'100': '#fdf6e7',
				'200': '#fae8c1',
				'300': '#f6d397',
				'400': '#f1b861',
				'500': '#ed9f3a',
				'600': '#e88728',
				'700': '#d16d1e',
				'800': '#b55a1f',
				'900': '#944a1d'
			},
			sandalwood: {
				'50': '#f9f7f4',
				'100': '#f0ebe3',
				'200': '#e1d4c5',
				'300': '#ceb59f',
				'400': '#b8947a',
				'500': '#a8805f',
				'600': '#9b7353',
				'700': '#825f46',
				'800': '#6a503d',
				'900': '#554232'
			},
			sacred: {
				gold: '#d4af37',
				cream: '#fdf6e3',
				orange: '#ff6b35'
			},
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		fontFamily: {
			cinzel: [
				'Cinzel',
				'serif'
			],
			lora: [
				'Lora',
				'serif'
			]
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		keyframes: {
			'accordion-down': {
				from: {
					height: '0'
				},
				to: {
					height: 'var(--radix-accordion-content-height)'
				}
			},
			'accordion-up': {
				from: {
					height: 'var(--radix-accordion-content-height)'
				},
				to: {
					height: '0'
				}
			},
			'fade-in': {
				'0%': {
					opacity: '0',
					transform: 'translateY(20px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			},
			'scale-in': {
				'0%': {
					opacity: '0',
					transform: 'scale(0.9)'
				},
				'100%': {
					opacity: '1',
					transform: 'scale(1)'
				}
			},
			float: {
				'0%, 100%': {
					transform: 'translateY(0px)'
				},
				'50%': {
					transform: 'translateY(-10px)'
				}
			},
			zoom: {
				'0%': {
					transform: 'scale(1)'
				},
				'100%': {
					transform: 'scale(1.1)'
				}
			},
			'count-up': {
				'0%': {
					transform: 'scale(0.5)',
					opacity: '0'
				},
				'50%': {
					transform: 'scale(1.2)',
					opacity: '0.8'
				},
				'100%': {
					transform: 'scale(1)',
					opacity: '1'
				}
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'fade-in': 'fade-in 0.6s ease-out',
			'scale-in': 'scale-in 0.5s ease-out',
			float: 'float 3s ease-in-out infinite',
			zoom: 'zoom 20s ease-in-out infinite alternate',
			'count-up': 'count-up 2s ease-out'
		}
	}
};
export const plugins = [tailwindcssAnimate];
