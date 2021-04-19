import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import BackHeader from "../../components/inc/BackHeader";
import { COLORS } from "../../constants/theme";

import HTML from "react-native-render-html";
import { contactUs } from "../../api/static";
import { ScrollView } from "react-native-gesture-handler";

const ContactUsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    const loadContactUs = async () => {
      let data = await contactUs();
      setData(data || "No Data Available");
      setLoading(false);
    };

    loadContactUs();
  }, []);

  const contentWidth = useWindowDimensions().width;
  return (
    <View style={styles.container}>
      <BackHeader title="Contact Us" />
      <ScrollView style={{ padding: 10 }}>
        {loading ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ) : (
          <HTML source={{ html: data }} contentWidth={contentWidth} />
        )}
      </ScrollView>
    </View>
  );
};
export default ContactUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
