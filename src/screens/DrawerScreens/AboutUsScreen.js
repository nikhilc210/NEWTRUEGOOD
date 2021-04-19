import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { aboutUs } from "../../api/static";
import BackHeader from "../../components/inc/BackHeader";

import HTML from "react-native-render-html";

const AboutUsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    const loadAboutUs = async () => {
      let data = await aboutUs();
      setData(data || "No Data Available");
      setLoading(false);
    };

    loadAboutUs();
  }, []);

  const contentWidth = useWindowDimensions().width;

  return (
    <View style={styles.container}>
      <BackHeader title="About Us" />
      <ScrollView style={{ padding: 10 }}>
        {loading ? (
          <ActivityIndicator color="green" size="large" />
        ) : (
          <HTML source={{ html: data }} contentWidth={contentWidth} />
        )}
        {/* <Text style={styles.titleStyle}>Truegood</Text>

        <Text style={{ marginVertical: 10, fontSize: RFValue(13) }}>
          <Text style={styles.textBoldStyle}>(meaning)</Text>: The Basic essence
          of wellness that comes from{" "}
          <Text style={styles.textBoldStyle}>TRUE</Text> health, as a result of
          your <Text style={styles.textBoldStyle}>GOOD</Text> and proper diet.
        </Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          True Good is a Kolkata based online grocery brand with the vision to
          bring high quality, hygienic produce to the doorstep of every
          household in India.{" "}
        </Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          The brand is proudly in service today as it offers you with over X+
          vegetables, each of which is handpicked with love by the farmers of
          India.
        </Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          The founders have conducted 4+ years of research which paved the path
          for the adoption of the latest O3 washing technology. The Ozone
          sterilizes the produce, washing away all the harmful pesticides and
          chemicals, and retains the major nutrients. This makes the produce
          super healthy and of high quality. True Good truly offers you the best
          harvest, procured from various parts of India.
        </Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          The True Good family invites you to start a journey towards a
          healthier life - a life of good health, quality and taste. Experience
          the products and the quality for yourself, and experience the True
          Value from True Good.
        </Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          We’re here to serve you and make a difference in your life.
        </Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          **The brand also holds certifications from FSSAI and APEDA
        </Text>
        <View style={{ marginVertical: 20 }} />
        <Text style={styles.titleStyle}>Why shop using True Good?</Text>

        <Text style={styles.textBoldStyle}>Hygiene</Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          We’re here to serve you and make a difference in your life.
        </Text>
        <Text style={styles.textBoldStyle}>Quality</Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          We buy our products directly from the best farmers in India. Each and
          every product is tested to ensure that it meets our quality standards.
        </Text>

        <Text style={styles.textBoldStyle}>Quick Service</Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          Our hassle-free service is something that makes us stand apart. We
          strive to serve you with nothing but the best. We have a 24/7 customer
          support aimed at solving any of your queries.
        </Text>
        <Text style={styles.textBoldStyle}>Freshness</Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          True Good guarantees only fresh and chemical free vegetables. Every
          product dispatched is checked for its freshness and quality.
        </Text>
        <Text style={styles.textBoldStyle}>Availability</Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          We provide a wide range of exotic vegetables and regular vegetables in
          one platform. Our regular stock update ensures that all the products
          are available for order.
        </Text>

        <Text style={styles.textBoldStyle}>Convenient & Aggregate</Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          True Good offers you all your fresh vegetables needs in one place.
          Order from a number of products from the comfort of your own home and
          get it delivered right to your doorstep with a just one click away.
        </Text>

        <Text style={styles.textBoldStyle}>Cashless Service</Text>
        <Text style={{ marginVertical: 5, fontSize: RFValue(13) }}>
          We understand the tedious process of carrying cash around these days.
          This is why True Good offers you a cashless service also. You can pay
          for the orders using credit card, debit card, UPI, etc.
        </Text> */}
      </ScrollView>
    </View>
  );
};
export default AboutUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  textBoldStyle: { fontSize: RFValue(14), fontWeight: "bold", marginTop: 5 },
  titleStyle: { fontSize: RFValue(16), fontWeight: "bold" },
});
