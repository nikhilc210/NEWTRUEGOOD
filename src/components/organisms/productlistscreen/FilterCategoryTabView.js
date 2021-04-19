import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../../constants/theme";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setActiveFilterCategory } from "../../../redux/actions/category";

const FilterCategoryTabView = ({
  categoryData: { categories, filterCategory },
  setActiveFilterCategory,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <Pressable
          style={
            category._id === filterCategory
              ? styles.singleContainerStyle
              : styles.singleInactiveStyle
          }
          onPress={() =>
            setActiveFilterCategory(
              category._id,
              category._id === filterCategory ? "deselect" : "select"
            )
          }
          key={category._id}
        >
          <Text
            style={{
              color:
                category._id === filterCategory ? "white" : COLORS.textGrey,
            }}
          >
            {category.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

FilterCategoryTabView.propTypes = {
  categoryData: PropTypes.object,
  categoryId: PropTypes.string,
  setActiveFilterCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categoryData: state.category, //name of prop = alert
});

export default connect(mapStateToProps, { setActiveFilterCategory })(
  FilterCategoryTabView
);

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
