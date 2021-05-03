import axios from "axios";
import { Alert } from "react-native";
import { API_URL } from "../constants/url";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getRecommendedProducts = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/product/recommendedProducts`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert(
      "UnExpected Error Occured",
      "Unexpected Error Occured. Please try again!"
    );
  }
};

export const getBestSellerProducts = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/product/bestSellerProducts`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert(
      "UnExpected Error Occured",
      "Unexpected Error Occured. Please try again!"
    );
  }
};

export const getRandomProducts = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/product/randomProducts`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert(
      "UnExpected Error Occured",
      "Unexpected Error Occured. Please try again!"
    );
  }
};
