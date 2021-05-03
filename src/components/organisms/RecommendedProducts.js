import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../constants/theme";
import { ActivityIndicator } from "react-native-paper";
import { getRecommendedProducts } from "../../api/product";
import ModifiedProductItem from "../atoms/ModifiedProductItem";

const RecommendedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const getData = async () => {
        let data = await getRecommendedProducts();
        setProducts(data);
        setLoading(false);
      };

      getData();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>Recommended Products</Text>
      <View style={styles.productContainer}>
        {loading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          products?.map((product) => (
            <ModifiedProductItem item={product} key={product._id} />
          ))
        )}
      </View>
    </View>
  );
};

export default RecommendedProducts;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", paddingVertical: hp("2%") },
  titleTextStyle: {
    fontSize: RFValue(16),
    fontFamily: FONTS.primaryFONT,
    fontWeight: "700",
    color: COLORS.black,
    margin: hp("1%"),
  },
  productContainer: { width: "100%", flexDirection: "row", flexWrap: "wrap" },
});
