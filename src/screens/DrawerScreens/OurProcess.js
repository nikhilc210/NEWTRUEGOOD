import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackHeader from "../../components/inc/BackHeader";

import HTML from "react-native-render-html";
import { ourProcess } from "../../api/static";

const OurProcess = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    const loadData = async () => {
      let data = await ourProcess();
      setData(data || "No Data Available");
      setLoading(false);
    };

    loadData();
  }, []);

  const contentWidth = useWindowDimensions().width;

  return (
    <View style={styles.container}>
      <BackHeader title="Our Process" />
      <ScrollView>
        {loading ? (
          <ActivityIndicator color="green" size="large" />
        ) : (
          <HTML source={{ html: data }} contentWidth={contentWidth} />
        )}
      </ScrollView>
    </View>
  );
};
export default OurProcess;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  imageStyle: { width: "100%", height: 200, resizeMode: "contain" },
});
