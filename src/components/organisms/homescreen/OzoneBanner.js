import React, {Component} from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';

let bufferConfig = {
  minBufferMs: 15000,
  maxBufferMs: 50000,
  bufferForPlaybackMs: 2500,
  bufferForPlaybackAfterRebufferMs: 5000,
};

export default class OzoneBanner extends Component {
  render() {
    return (
      <View style={{paddingVertical: 0}}>
        <Video
          source={require('../../../assets/video/InformativeVideo.mp4')}
          ref={(ref) => {
            this.videoRef = ref;
          }}
          bufferConfig={bufferConfig}
          style={{
            height: 200,
          }}
          onError={(err) => {
            console.log(err);
          }}
          resizeMode={'stretch'}
          volume={0}
        />
      </View>
    );
  }
}
