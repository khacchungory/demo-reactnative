import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import GetLocation from 'react-native-get-location';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 40
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default function GoogleMapScreen(props) {
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324
    })

    useEffect(() => {
        _zgetCurrentLocation();
    }, []);

    const _zgetCurrentLocation = async () => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
            },e => {
                console.log('get current location err: ', e)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324
                    }}
                    title={'Demo marker'}
                    description={'this is demo marker'}
                />
            </MapView>
        </View>
    )
}