/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	plugins: [...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()]
};
