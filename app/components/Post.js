import React from "react"
import {Image, StyleSheet, Text, View} from "react-native"

export default ({image, title, subreddit}) => (
    <View style={styles.container}>
        <Image source={image}
               style={styles.thumb}/>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subreddit}>/r/{subreddit}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    thumb: {
        height: 60,
        width: 60,
        borderRadius: 10,
        marginRight: 5
    },
    title: {
        fontSize: 18
    },
    subreddit: {
        color: 'grey'
    },
    textContainer: {
        flex: 1
    }
})
