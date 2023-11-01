const noble = require('noble');

// Replace with the UUID of the device you want to connect to
const deviceUUID = 'YOUR_DEVICE_UUID';

noble.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    console.log('Scanning for BLE devices...');
    noble.startScanning();
  } else {
    noble.stopScanning();
    console.log('Bluetooth is not powered on. Please check your Bluetooth adapter.');
  }
});

noble.on('discover', (peripheral) => {
  if (peripheral.uuid === deviceUUID) {
    console.log(`Found your device: ${peripheral.advertisement.localName}`);
    noble.stopScanning();

    peripheral.connect((error) => {
      if (!error) {
        console.log('Connected to the device.');

        peripheral.disconnect((error) => {
          if (!error) {
            console.log('Disconnected from the device.');
          } else {
            console.error('Error disconnecting from the device:', error);
          }
        });
      } else {
        console.error('Error connecting to the device:', error);
      }
    });
  }
});

noble.on('error', (error) => {
  console.error('Error:', error);
});
