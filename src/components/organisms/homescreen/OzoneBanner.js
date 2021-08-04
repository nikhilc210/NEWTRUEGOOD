import React, { Component } from "react";
import { View, Image } from "react-native";
import Video from "react-native-video";
import { ozone } from "../../../constants/images";

export default class OzoneBanner extends Component {
  render() {
    return (
      <View style={{ paddingVertical: 0 }}>
        <Image source={ozone} style={{ width: "100%" }} />
      </View>
    );
  }
}
