import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, PermissionsAndroid, NativeAppEventEmitter, NativeModules, NativeEventEmitter } from 'react-native';
import { Pedometer } from 'expo-sensors';
import BleManager from 'react-native-ble-manager';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default function SensorConfig() {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const [prevStepCount, setPrevStepCount] = useState(0);
    const [currentCadence, setCurrentCadence] = useState(0);
    const [previousDate, setPreviousDate] = useState(Date.now());
    const [isScanning, setIsScanning] = useState(false);
    const [connectedDevices, setConnectedDevices] = useState<any[]>([]);

    const devices = new Map();
    const BleManagerModule = NativeModules.BleManager;
    
    const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

    //Pedometer setup & watching
    useEffect(() => {
        const subscribeToPedometer = async () => {
            const isAvailable = await Pedometer.isAvailableAsync();
            setIsPedometerAvailable(String(isAvailable));

            if (isAvailable) {
                return Pedometer.watchStepCount(result => {
                    const newStepCount = result.steps;
                    const currentDate = Date.now();
                    const elapsedSeconds = (currentDate - previousDate) / 1000;

                    if (elapsedSeconds > 0) {
                        const stepsDiff = newStepCount - prevStepCount;
                        const newCadence = (stepsDiff / elapsedSeconds) * 60; // steps per minute

                        setCurrentCadence(newCadence);
                        setPrevStepCount(newStepCount);
                        setPreviousDate(currentDate);
                    }

                    setCurrentStepCount(newStepCount);
                });
            }
        };

        const returnFunc = async () => {
            const subscription = await subscribeToPedometer();
            return () => subscription && subscription.remove();
        };

        returnFunc();
    }, [prevStepCount, previousDate]);
    
    //Get heart rate data using bluetooth
    useEffect(() => {
        const requestPermissions = async () => {
            if (Platform.OS === "android" && Platform.Version >= 23) {
                try {
                    const getPerms = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    ]);
                    console.log(getPerms)
                    const allPermsGranted = Object.values(getPerms).every(permission => (permission === PermissionsAndroid.RESULTS.GRANTED) || 
                        (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN));

                    if (!allPermsGranted) {
                        console.log("Some permissions were not granted")
                        return;
                    } else {
                        console.log("All permissions were granted!")
                    }
                } catch (err) {
                    console.error(err)
                    return;
                }
            }
        }
        requestPermissions();
        // enable bluetooth if it's not on
        BleManager.enableBluetooth().then(() => {
            console.log("Bluetooth has been enabled");
        });

        //Scan for devices.
        let stopListener = BleManagerEmitter.addListener(
            'BleManagerStopScan',
            () => {
                setIsScanning(false);
                console.log("Scanning has stopped")

            }
        )
        const startScan = () => {
            if (!isScanning) {
                BleManager.scan([], 5, true).then(() => {
                    setIsScanning(true);
                    console.log("Scanning...");
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }
        const handleGetConnectedDevices = () => {
            BleManager.getConnectedPeripherals([]).then(deviceArray => {
                if (deviceArray.length !== 0) {
                    for (let i=0; i<deviceArray.length; i++) {
                        let device = deviceArray[i];
                        devices.set(device.id, device)
                        setConnectedDevices(Array.from(devices.values()))
                    }
                } else {
                    console.error("No Devices Already Connected!")
                }
            })
        }    

    }, []);
    
    
    //Display bluetooth devices and status.
    const RenderDevices = ({peripheral}: any) => {
        const {name, rssi, connected} = peripheral;
        return (
            <>
                {name && (
                    <View>
                        <View style={styles.deviceListContainer}>
                            <Text style={styles.device}>{name}</Text>
                            <Text>RSSI: {rssi}</Text>
                        </View>
                    <TouchableOpacity
                        onPress={() => {alert("not yet implemented")}}/*{() => 
                            connected
                            ? disconnectFromPeripheral(peripheral)
                            : connectToPeripheral(peripheral)
                        }
                        */    
                        style={styles.deviceButton}>
                        <Text style={styles.deviceButtonText}>{connected ? "Disconnect" : "Connect"}</Text>
                    </TouchableOpacity>
                    </View>
                    
                )}
            </>
        )
    }
    return (
        <View>
            <View>
                <Text>Pedometer Status: {isPedometerAvailable}</Text>
                <Text>Current Cadence: {currentCadence.toFixed(2)} steps/min</Text>
                <Text>Current Steps: {currentStepCount}</Text>
                {connectedDevices.length > 0 ? (
                    <FlatList
                    data={connectedDevices}
                    renderItem={({item}) => <RenderDevices peripheral={item} />}
                    keyExtractor={item => item.id}
                />
                ): (
                    <Text style={styles.device}>No Connected Devices</Text>
                )}
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleBarContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Alumni-Sans',
        fontSize: 45,

    },
    deviceListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    device: {
        fontFamily: 'Alumni-Sans',
        fontSize: 16
    },
    deviceButton: {
        margin: 5,
        justifyContent: 'center',
    },
    deviceButtonText: {
        fontFamily: 'Alumni-Sans',
        fontSize: 12
    }
})