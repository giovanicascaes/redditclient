import {Platform} from 'react-native'

export const getIconVariant = (icon, focused) => {
    if (Platform.OS === 'android') {
        return `md-${icon}`
    }
    const iosVariant = `ios-${icon}`
    if (focused) {
        return iosVariant
    }
    return `${iosVariant}-outline`
}
