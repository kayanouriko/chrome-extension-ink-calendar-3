import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
    presets: [presetUno(), presetAttributify(), presetIcons()],
    rules: [
        [/^square-(\d+)$/, ([, d]) => ({ width: `${parseInt(d) / 4}rem`, height: `${parseInt(d) / 4}rem` })],
        ['text-tag-primary', { color: '#84F4CE' }],
        ['text-fest-primary', { color: 'rgb(247,251,65)' }],
        ['text-event-primary', { color: 'rgb(218,67,115)' }],
        ['text-salmonrun-primary', { color: 'rgb(239 68 68)' }],
        ['text-bigrun-primary', { color: '#B322FF' }],
        ['text-eggstra-primary', { color: '#D2B42F' }],
        ['bg-button-blue', { 'background-color': 'rgb(94,77,249)' }],
        ['bg-tag-primary', { 'background-color': '#84F4CE' }],
        ['bg-fest-primary', { 'background-color': 'rgb(247,251,65)' }],
        ['bg-event-primary', { 'background-color': 'rgb(218,67,115)' }],
        ['bg-salmonrun-primary', { 'background-color': 'rgb(239 68 68)' }],
        ['bg-bigrun-primary', { 'background-color': '#B322FF' }],
        ['bg-eggstra-primary', { 'background-color': '#D2B42F' }],
        ['bg-dark1', { 'background-color': 'rgb(42,46,53)' }],
        ['bg-dark2', { 'background-color': 'rgb(32,42,58)' }],
        ['bg-tabbar', { 'background-color': 'rgb(73,86,104)' }],
        ['bg-backdrop', { background: 'rgba(255, 255, 255, 0.3)', 'backdrop-filter': 'blur(10px)' }],
        ['font-splatoon-title', { 'font-family': 'var(--font-family-s1)' }],
        ['font-splatoon-content', { 'font-family': 'var(--font-family-s2)' }],
        [
            'squid-tl',
            {
                'mask-image': 'url("/assets/images/ui/squid-tl.svg")',
                'mask-repeat': 'no-repeat',
                'mask-size': 'contain'
            }
        ],
        [
            'squid-br',
            {
                'mask-image': 'url("/assets/images/ui/squid-br.svg")',
                'mask-repeat': 'no-repeat',
                'mask-size': 'contain'
            }
        ],
        [
            'squid-label',
            {
                'clip-path':
                    'polygon(-5px 10px, 10px 10px, 10px -5px, 100% -5px, 100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) calc(100% + 10px), 0 calc(100% + 10px))'
            }
        ]
    ],
    shortcuts: {
        'flex-center': 'justify-center items-center',
        'button-checked': 'px-3 py-1 rounded-full bg-button-blue text-white',
        'button-unchecked': 'px-3 py-1 rounded-full bg-gray bg-op-10 text-gray-4 hover:text-gray-2 hover:bg-op-25',
        // https://github.com/unocss/unocss/issues/2371
        'thin-scrollbar':
            '[&::-webkit-scrollbar]:[width:6px] [&::-webkit-scrollbar]:[background-color:rgb(30,41,59)] [&::-webkit-scrollbar-thumb]:[background-color:rgb(245,201,59)]'
    }
})
