import {Platform} from 'react-native'

export const getIconVariantForState = (icon, focused) => {
    if (Platform.OS === 'android') {
        return `md-${icon}`
    }
    const iosVariant = `ios-${icon}`
    if (focused) {
        return iosVariant
    }
    return `${iosVariant}-outline`
}
