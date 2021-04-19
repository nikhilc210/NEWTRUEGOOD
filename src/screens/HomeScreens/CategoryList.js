import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { List } from "react-native-paper";

import HomeHeader from "../../components/inc/HomeHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../constants/theme";
import { navigate } from "../../navigations/RootNavigation";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchViewHome from "../../components/organisms/homescreen/SearchViewHome";
import { setActiveCategory } from "../../redux/actions/category";
//Bottom sheet import
import BottomSheet from "../AuthScreens/BottomSheet";
import RegisterSheet from "../AuthScreens/RegisterSheet";
import OTPBottomSheet from "../AuthScreens/OTPBottomSheet";
import MobileBottomSheet from "../AuthScreens/MobileBottomSheet";
import LoginOTPSheet from "../AuthScreens/LoginOTPSheet";
import RegisterOTPSheet from "../AuthScreens/RegisterOTPSheet";

const CategoryList = ({ categoryData: { categories }, setActiveCategory }) => {
  const setActiveCategoryId = (categoryId) => {
    setActiveCategory(categoryId);
    navigate("Home", { screen: "ProductListScreen" });
  };

  return (
    <View style={styles.container}>
      <HomeHeader title="Categories" />
      <SearchViewHome />
      <ScrollView>
        <List.Section>
          {categories.map((item, key) => (
            <List.Accordion
              title={item.name}
              key={key}
              left={(props) => (
                <MaterialCommunityIcons
                  name="fruit-grapes-outline"
                  color={COLORS.primary}
                  size={30}
                />
              )}
              // onPress={() => setActiveCategoryId(item?._id)}
              // expanded={false}
            >
              {item.sub_categories.map((single) => (
                <List.Item
                  key={single._id}
                  title={single.name}
                  onPress={() => navigate("ProductListScreen")}
                />
              ))}
            </List.Accordion>
          ))}
        </List.Section>
      </ScrollView>
      <BottomSheet />
      <RegisterSheet />
      <OTPBottomSheet />
      <MobileBottomSheet />
      <LoginOTPSheet />
      <RegisterOTPSheet />
    </View>
  );
};

CategoryList.propTypes = {
  categoryData: PropTypes.object,
  setActiveCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categoryData: state.category, //name of prop = alert
});

export default connect(mapStateToProps, { setActiveCategory })(CategoryList);

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
