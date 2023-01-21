export enum TabType {
    General,
    About
}

class Control {
    get tabItems() {
        return [TabType.General, TabType.About]
    }

    getTabTitle(type: TabType) {
        switch (type) {
            case TabType.General:
                return 'option.general.title'
            case TabType.About:
                return 'option.about.title'
        }
    }
}

const control = new Control()

export function useControl() {
    return control
}
