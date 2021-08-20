var awsIot = require('aws-iot-device-sdk');
// Config
var device = awsIot.device({
   keyPath: "./certs/5df9583f2b-private.pem.key",
  certPath: "./certs/5df9583f2b-certificate.pem.crt",
    caPath: "./certs/AmazonRootCA1.crt",
      host: "abqbrx1j2hcne-ats.iot.us-east-1.amazonaws.com"
});

// Connect
device
  .on('connect', function() {
    console.log('Connected');
// Subscribe to myTopic
    device.subscribe("myTopic");
// Publish to myTopic
    device.publish(“myTopic”, JSON.stringify({
  		key1: ‘hello1’,
  		key2: ‘hello2’,
  		key3: ‘hello3’
	}));  });
// Receiving a message from any topic that this device is
// subscribed to.
device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });