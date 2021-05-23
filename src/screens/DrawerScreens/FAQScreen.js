import React, { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../constants/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BackHeader from "../../components/inc/BackHeader";
import { fetchFAQs } from "../../api/static";
import { ActivityIndicator } from "react-native";

const FAQScreen = () => {
  const [activeSections, setActiveSections] = useState([]);
  const [faqs, setFAQs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      let response = await fetchFAQs();

      if (isMounted) {
        setFAQs(response);
        setLoading(false);
      }
    };

    getData();

    return function cleanup() {
      isMounted = false;
    };
  }, []);

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.headerText}>{section.title}</Text>
          <FontAwesome
            name="chevron-down"
            color={COLORS.primary}
            size={hp("2.5%")}
            style={{ paddingRight: hp("1.0%"), alignSelf: "flex-end" }}
          />
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ textAlign: "center" }}
        >
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <BackHeader title="FAQs" />
      <Text style={{ fontSize: 18, fontWeight: "bold", padding: hp("2%") }}>
        Frequently Asked Questions
      </Text>
      <ScrollView>
        {loading ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ) : (
          <Accordion
            activeSections={activeSections}
            sections={faqs}
            touchableComponent={TouchableOpacity}
            expandMultiple={false}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: {
    fontSize: 18,
    fontWeight: "300",
  },
  header: {
    padding: 18,
  },
  headerText: {
    textAlign: "left",
    paddingLeft: hp("3%"),
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "#f7f7f7",
  },
  inactive: {
    backgroundColor: "#fff",
  },
});
