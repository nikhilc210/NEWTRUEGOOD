import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Button } from "react-native-paper";
import Snackbar from "react-native-snackbar";

const NoInternet = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setInitialLoad(false);
      }
    }, 1000);

    return function cleanup() {
      mounted = false;
    };
  }, [initialLoad]);

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Snackbar.show({
        text: "No Internet Available",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "red",
      });
    }, 2000);
  };

  if (initialLoad) {
    return null;
  }

  return (
    <>
      <LottieView
        style={{ height: hp("60%"), alignSelf: "center", marginTop: hp("5%") }}
        source={require("../../assets/images/NoInternet.json")}
        autoPlay
        loop
      />
      <Button
        mode="contained"
        color="#1CA953"
        onPress={onRefresh}
        disabled={loading}
      >
        {loading ? "Checking Internet connectivity..." : "Refresh"}
      </Button>
    </>
  );
};

export default NoInternet;
