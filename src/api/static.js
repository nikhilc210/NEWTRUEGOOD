import axios from "axios";
import { Alert } from "react-native";
import { API_URL } from "../constants/url";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const aboutUs = async () => {
  try {
    const response = await axios.get(`${API_URL}/static/getValue`, config);

    return response.data.about_us;
  } catch (error) {
    Alert.alert(
      "UnExpected Error Occured",
      "Unexpected Error Occured. Please try again!"
    );
  }
};

export const contactUs = async () => {
  try {
    const response = await axios.get(`${API_URL}/static/getValue`, config);

    return response.data.contact_us;
  } catch (error) {
    Alert.alert(
      "UnExpected Error Occured",
      "Unexpected Error Occured. Please try again!"
    );
  }
};

export const ourProcess = async () => {
  try {
    const response = await axios.get(`${API_URL}/static/getValue`, config);

    return response.data.our_process;
  } catch (error) {
    Alert.alert(
      "UnExpected Error Occured",
      "Unexpected Error Occured. Please try again!"
    );
  }
};

export const fetchFAQs = async () => {
  try {
    const response = await axios.get(`${API_URL}/static/getValue`, config);

    return response.data.faqs;
  } catch (error) {
    Alert.alert(
      "UnExpected Error Occured",
      "Unexpected Error Occured. Please try again!"
    );
  }
};

export const pincodeList = async () => {
  try {
    const response = await axios.get(`${API_URL}/pincode/list`, config);
    return response.data;
  } catch (error) {
    Alert.alert(
      "UnExpected Error Occured",
      "Unexpected Error Occured. Please try again!"
    );
  }
};
