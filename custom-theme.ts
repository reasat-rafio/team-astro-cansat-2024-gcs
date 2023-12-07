import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
  name: 'my-custom-theme',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-family-base': `system-ui`,
    '--theme-font-family-heading': `system-ui`,
    '--theme-font-color-base': '0 0 0',
    '--theme-font-color-dark': '255 255 255',
    '--theme-rounded-base': '8px',
    '--theme-rounded-container': '6px',
    '--theme-border-base': '1px',
    // =~= Theme On-X Colors =~=
    '--on-primary': '0 0 0',
    '--on-secondary': '0 0 0',
    '--on-tertiary': '0 0 0',
    '--on-success': '0 0 0',
    '--on-warning': '255 255 255',
    '--on-error': '0 0 0',
    '--on-surface': '255 255 255',
    // =~= Theme Colors  =~=
    // primary | #0a998b
    '--color-primary-50': '218 240 238', // #daf0ee
    '--color-primary-100': '206 235 232', // #ceebe8
    '--color-primary-200': '194 230 226', // #c2e6e2
    '--color-primary-300': '157 214 209', // #9dd6d1
    '--color-primary-400': '84 184 174', // #54b8ae
    '--color-primary-500': '10 153 139', // #0a998b
    '--color-primary-600': '9 138 125', // #098a7d
    '--color-primary-700': '8 115 104', // #087368
    '--color-primary-800': '6 92 83', // #065c53
    '--color-primary-900': '5 75 68', // #054b44
    // secondary | #eaed31
    '--color-secondary-50': '252 252 224', // #fcfce0
    '--color-secondary-100': '251 251 214', // #fbfbd6
    '--color-secondary-200': '250 251 204', // #fafbcc
    '--color-secondary-300': '247 248 173', // #f7f8ad
    '--color-secondary-400': '240 242 111', // #f0f26f
    '--color-secondary-500': '234 237 49', // #eaed31
    '--color-secondary-600': '211 213 44', // #d3d52c
    '--color-secondary-700': '176 178 37', // #b0b225
    '--color-secondary-800': '140 142 29', // #8c8e1d
    '--color-secondary-900': '115 116 24', // #737418
    // tertiary | #3bb568
    '--color-tertiary-50': '226 244 232', // #e2f4e8
    '--color-tertiary-100': '216 240 225', // #d8f0e1
    '--color-tertiary-200': '206 237 217', // #ceedd9
    '--color-tertiary-300': '177 225 195', // #b1e1c3
    '--color-tertiary-400': '118 203 149', // #76cb95
    '--color-tertiary-500': '59 181 104', // #3bb568
    '--color-tertiary-600': '53 163 94', // #35a35e
    '--color-tertiary-700': '44 136 78', // #2c884e
    '--color-tertiary-800': '35 109 62', // #236d3e
    '--color-tertiary-900': '29 89 51', // #1d5933
    // success | #9e9f43
    '--color-success-50': '240 241 227', // #f0f1e3
    '--color-success-100': '236 236 217', // #ececd9
    '--color-success-200': '231 231 208', // #e7e7d0
    '--color-success-300': '216 217 180', // #d8d9b4
    '--color-success-400': '187 188 123', // #bbbc7b
    '--color-success-500': '158 159 67', // #9e9f43
    '--color-success-600': '142 143 60', // #8e8f3c
    '--color-success-700': '119 119 50', // #777732
    '--color-success-800': '95 95 40', // #5f5f28
    '--color-success-900': '77 78 33', // #4d4e21
    // warning | #bb3549
    '--color-warning-50': '245 225 228', // #f5e1e4
    '--color-warning-100': '241 215 219', // #f1d7db
    '--color-warning-200': '238 205 210', // #eecdd2
    '--color-warning-300': '228 174 182', // #e4aeb6
    '--color-warning-400': '207 114 128', // #cf7280
    '--color-warning-500': '187 53 73', // #bb3549
    '--color-warning-600': '168 48 66', // #a83042
    '--color-warning-700': '140 40 55', // #8c2837
    '--color-warning-800': '112 32 44', // #70202c
    '--color-warning-900': '92 26 36', // #5c1a24
    // error | #30cd57
    '--color-error-50': '224 248 230', // #e0f8e6
    '--color-error-100': '214 245 221', // #d6f5dd
    '--color-error-200': '203 243 213', // #cbf3d5
    '--color-error-300': '172 235 188', // #acebbc
    '--color-error-400': '110 220 137', // #6edc89
    '--color-error-500': '48 205 87', // #30cd57
    '--color-error-600': '43 185 78', // #2bb94e
    '--color-error-700': '36 154 65', // #249a41
    '--color-error-800': '29 123 52', // #1d7b34
    '--color-error-900': '24 100 43', // #18642b
    // surface | #004a99
    '--color-surface-50': '217 228 240', // #d9e4f0
    '--color-surface-100': '204 219 235', // #ccdbeb
    '--color-surface-200': '191 210 230', // #bfd2e6
    '--color-surface-300': '153 183 214', // #99b7d6
    '--color-surface-400': '77 128 184', // #4d80b8
    '--color-surface-500': '0 74 153', // #004a99
    '--color-surface-600': '0 67 138', // #00438a
    '--color-surface-700': '0 56 115', // #003873
    '--color-surface-800': '0 44 92', // #002c5c
    '--color-surface-900': '0 36 75' // #00244b
  }
};
