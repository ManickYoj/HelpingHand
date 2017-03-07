'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { BleManager } from 'react-native-ble-plx';

export default class HelpingHand extends Component {
  constructor() {
    super()
    this.manager = new BleManager()
  },

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') this.scanAndConnect()
      })
    } else this.scanAndConnect()
  },

  scanAndConnect() {
    this.manager.startDeviceScan(
      null,
      null,
      (error, device) => {
        this.info("Scanning...")
        console.log(device)

        if (error) {
          this.error(error.message)
          return
        }

        // TODO: Return to this once testable
        // Code continues from https://www.polidea.com/blog/ReactNative_and_Bluetooth_to_An_Other_level/
        console.log(device.name)
      })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HelpingHand', () => HelpingHand);
