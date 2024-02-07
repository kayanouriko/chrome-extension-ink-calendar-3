export interface SettingItem {
    key: string
    name: string
    icon: string
}

export const settingItems: SettingItem[] = [
    {
        key: 'home',
        name: 'navbar.home',
        icon: '/assets/images/menu/logo.webp'
    },
    {
        key: 'gear',
        name: 'splatnet-shop.title',
        icon: '/assets/images/menu/network-shop.png'
    },
    {
        key: 'fest',
        name: 'splatfest.title',
        icon: '/assets/images/menu/splatfest.png'
    },
    {
        key: 'option',
        name: 'option.title',
        icon: '/assets/images/menu/option.png'
    }
]
