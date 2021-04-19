import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../../constants/theme";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setActiveCategory } from "../../../redux/actions/category";

const CategoryTabView = ({
  categoryData: { categories, activeCategory },
  setActiveCategory,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <Pressable
          style={
            category._id === activeCategory
              ? styles.singleContainerStyle
              : styles.singleInactiveStyle
          }
          onPress={() => setActiveCategory(category._id)}
          key={category._id}
        >
          <Text
            style={{
              color:
                category._id === activeCategory ? "white" : COLORS.textGrey,
              height: 20,
            }}
          >
            {category.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

CategoryTabView.propTypes = {
  categoryData: PropTypes.object,
  categoryId: PropTypes.string,
  setActiveCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categoryData: state.category, //name of prop = alert
});

export default connect(mapStateToProps, { setActiveCategory })(CategoryTabView);

const styles = StyleSheet.create({
  singleContainerStyle: {
    padding: hp("1%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: hp("0.5%"),
    margin: hp("1%"),
  },
  singleInactiveStyle: {
    padding: hp("1%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: hp("0.5%"),
    margin: hp("1%"),
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});
