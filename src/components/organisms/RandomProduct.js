import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../constants/theme";
import { ActivityIndicator } from "react-native-paper";
import { getRandomProducts } from "../../api/product";
import ModifiedProductItem from "../atoms/ModifiedProductItem";

const RandomProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const getData = async () => {
        let data = await getRandomProducts();
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

export default RandomProducts;

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
