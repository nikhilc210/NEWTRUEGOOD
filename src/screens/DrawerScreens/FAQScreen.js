import React, {Component} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
//import basic react native components
import * as Animatable from 'react-native-animatable';
//import for the animation of Collapse and Expand
//import for the collapsible/Expandable view
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../constants/theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BackHeader from '../../components/inc/BackHeader';
//import for the Accordion view

//Dummy content to show
//You can also use dynamic data by calling web service
const CONTENT = [
  {
    title: 'How do I register?',
    content:
      'You can register by clicking on the "Sign Up" link. Please provide the information in the form that appears. You can review the terms and conditions, provide your payment mode details and submit the registration information.',
  },
  {
    title: 'Are there any charges for registration?',
    content: 'No. Registration on True Good is absolutely free.',
  },
  {
    title:
      'Do I have to necessarily register to shop on True Good Essentials LLP?',
    content:
      'You can surf and add products to the cart without registration but only registered shoppers will be able to checkout and place orders. Registered members have to be logged in at the time of checking out the cart, they will be prompted to do so if they are not logged in.',
  },
  {
    title: 'Can I have multiple registrations?',
    content:
      'Each email address and contact phone number can only be associated with one True Good Essentials LLP account.',
  },
  {
    title: 'Can I add more than one delivery address in an account?',
    content:
      'Yes, you can add multiple delivery addresses in your True Good account. However, remember that all items placed in a single order can only be delivered to one address. If you want different products delivered to different address you need to place them as separate orders.',
  },
  {
    title: 'Can I have multiple accounts with same mobile number and email id?',
    content:
      'Each email address and phone number can be associated with one True Good Essentials LLP account only.',
  },
  {
    title:
      'Can I have multiple accounts for members in my family with different mobile number and email address but same or common delivery address?',
    content:
      'Yes, we do understand the importance of time and the toil involved in shopping groceries. Up to three members in a family can have the same address provided the email address and phone number associated with the accounts are unique.',
  },
  {
    title:
      'Can I have different addresses under one account and still place orders for multiple addresses?',
    content:
      'Yes, orders for multiple addresses can be placed. One order to be placed under one address only.',
  },
  {
    title: 'What is My Account ?',
    content:
      'My Account is the section you reach after you log in at. My Account allows you to track your active orders, credit note details as well as see your order history and update your contact details.',
  },
  {
    title: 'How do I reset my password?',
    content:
      'You need to enter your email address on the Login page and click on forgot password. An email with a reset password will be sent to your email address. This is how you can change your password. For any further issues please contact our customer support team.',
  },
  {
    title: 'What are the modes of payment?',
    content:
      'You can pay for your order on using the following modes of payments. Cash on delivery (COD). Credit and debit cards (VISA / Mastercard / Rupay).',
  },

  {
    title:
      'Are there any other charges or taxes in addition to the price shown? Is VAT added to the invoice?',
    content: 'There is no VAT or GST applicable as per Government Regulations.',
  },

  {
    title: 'Is it safe to use my credit/ debit card on True Good?',
    content:
      'Yes it is absolutely safe to use your card on True Good. A recent directive from RBI makes it mandatory to have an additional authentication pass code verified by VISA (VBV) or MSC (Master Secure Code) which has to be entered by online shoppers while paying online using visa or master credit card. It means extra security for customers, thus making online shopping safer.',
  },

  {
    title: 'What are the modes of payment?',
    content:
      'You can pay for your order on using the following modes of payments. Cash on delivery (COD). Credit and debit cards (VISA / Mastercard / Rupay).',
  },

  {
    title: 'What is the meaning of cash on delivery?',
    content:
      'You can pay for your order on using the following modes of payments. Cash on delivery (COD). Credit and debit cards (VISA / Mastercard / Rupay).',
  },

  {
    title:
      'If I pay by credit card how do I get the amount back for items not delivered?',
    content:
      'If we are not able to delivery all the products in your order and you have already paid for them online, the balance amount will be refunded to the account from which the payment was initiated. ',
  },

  {
    title: 'When will I receive my order?',
    content:
      'Once you are done selecting your products and click on checkout you will be prompted to select delivery slot. Your order will be delivered to you within 24 hours from the time of placing the order.',
  },
  {
    title: 'How are the fruits and vegetables packaged?',
    content:
      'Fresh vegetables are handpicked from the best farmers in India and ozone washed thoroughly. We ensure hygienic and careful handling of all our products.',
  },
  {
    title: 'How are the vegetables weighed?',
    content:
      'Every vegetable varies a little in size and weight. While you shop we show an estimated weight and price for everything priced by kilogram. At the time of delivery we weigh each item to determine final price. This could vary by 10% at maximum. Therefore if you have shopped for something that costs Rs. 100 per kg, and we delivery 1.5 kg of the product to you (eg cabbage, pineapple), you will still be charged a maximum of Rs. 110. In case the weight of the product is lesser than what you ordered, you will pay correspondingly less.',
  },
  {
    title: 'How will the delivery be done?',
    content:
      'We have a dedicated team of delivery personnel and a fleet of vehicles operating across the city which ensures timely and accurate delivery to our customers.',
  },
  {
    title:
      'How do I change the delivery info (address to which I want products delivered)?',
    content:
      'You can change your delivery address by logging into your account and modifying the address details provided by you previously.',
  },
  {
    title: 'Do you deliver in my area?',
    content:
      'You will be able to check this detail at the time of checkout when you enter the address. If we are unable to deliver in your area - we will inform you before checkout.',
  },
  {
    title: 'Will someone inform me if my order delivery gets delayed?',
    content:
      'In case of a delay, our customer support team will keep you updated about your delivery.',
  },
  {
    title: 'What is the minimum order for delivery?',
    content:
      'There is no minimum order for delivery but we charge a nominal delivery fee as below.',
  },
  {
    title:
      'What is a cut-off time and what are the corresponding cut-off timing for each slot?',
    content:
      'Cut off time is the time after which the order gets processed for delivery. After this time you will not be able to modify or cancel your order. Cut off time is 30 min from the time of placing the order. You can cancel or modify the items within this cut off time since post cut off time we begin to process the order we received from you.',
  },
  {
    title: 'Can I add products after the cut off time for a slot?',
    content: 'No changes can be done after cut off time. ',
  },
  {
    title: 'How do I add or remove products after placing my order?',
    content:
      'Once you have placed your order you will only be able to make modifications within the cut-off time. Please contact our customer support team for any modification of order.',
  },
  {
    title: 'Is it possible to order an item which is out of stock?',
    content: 'No you can only order products which are in stock.',
  },
  {
    title: 'How do I check the current status of my order?',
    content:
      'The only way you can check the status of your order is by contacting our customer support team.',
  },
  {
    title: 'What You Receive Is What You Pay For?',
    content:
      'At the time of delivery, we advise you to kindly check every item as in the invoice. Please report any missing item that is invoiced. As a benefit to our customers, if you are not available at the time of order delivery or you haven’t checked the list at the time of delivery we provide a window of 24hrs to report missing items. This is applicable only for items that are invoiced.',
  },
  {
    title: 'When and how can I cancel an order?',
    content:
      'You can cancel an order before the cut off time of your order by contacting our customer support team.  ',
  },
  {
    title: 'How do I contact customer service?',
    content:
      'Our customer service team is available throughout the week. They can be reached at info@truegood.in.',
  },
  {
    title: 'How can I give feedback on the quality of customer service?',
    content:
      'Our customer support team constantly strives to ensure the best shopping experience for all our customers. We would love to hear about your experience with True Good Essentials LLP. Do write to us in case of positive or negative feedback.',
  },
  {
    title:
      'How will I get my money back in case of a cancellation or return? What are the modes of refund?',
    content:
      'The amount will be refunded to your account from where the payment is initiated. In case of credit card payments we can also credit the money back to your credit card. In case of COD, the payment will be done on the bank account whose details were to be provided by you. Please contact customer support for any further assistance regarding this issue.',
  },
  {
    title: 'I am a corporate/ business. Can I place orders with True Good?',
    content:
      'Yes, we do bulk supply of products at special prices to institutions such as schools, restaurants and corporates. Please contact as to know more.',
  },
  {
    title: 'I’d like to suggest some products. Who do I contact?',
    content:
      'If you are unable to find a product or brand that you would like to shop for, please write us on info@truegood.in and we will try our best to make the product available to you.',
  },
  {
    title:
      'There is a difference in the amount mentioned in the invoice sent by the store and the order value shown by True Good Essentials LLP when placing the order. Why should I pay the extra amount?',
    content:
      'True Good has a standard policy of weight variance up to 10% on its orders. However, while you shop we show an estimated weight and price for everything priced by kilogram. At the time of delivery, we weigh each item to determine the final price. This could vary by 10% at maximum. Therefore if you have shopped for something that costs Rs. 100 per kg and we deliver 1.5 kg of the product to you (eg cabbage, pineapple), you will still be charged a maximum of Rs. 110. In case the weight of the product is lesser than what you ordered, you will pay correspondingly less.',
  },
];

export default class FAQScreen extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({collapsed: !this.state.collapsed});
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headerText}>{section.title}</Text>
          <FontAwesome
            name="chevron-down"
            color={COLORS.primary}
            size={hp('2.5%')}
            style={{paddingRight: hp('1.0%'), alignSelf: 'flex-end'}}
          />
        </View>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{textAlign: 'center'}}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const {multipleSelect, activeSections} = this.state;
    return (
      <View style={styles.container}>
        <BackHeader title="FAQs" />
        <Text style={{fontSize: 18, fontWeight: 'bold', padding: hp('2%')}}>
          Frequently Asked Questions
        </Text>
        <ScrollView>
          {/*Code for Accordion/Expandable List starts here*/}
          <Accordion
            activeSections={activeSections}
            //for any default active section
            sections={CONTENT}
            //title and content of accordion
            touchableComponent={TouchableOpacity}
            //which type of touchable component you want
            //It can be the following Touchables
            //TouchableHighlight, TouchableNativeFeedback
            //TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={multipleSelect}
            //Do you want to expand mutiple at a time or single at a time
            renderHeader={this.renderHeader}
            //Header Component(View) to render
            renderContent={this.renderContent}
            //Content Component(View) to render
            duration={400}
            //Duration for Collapse and expand
            onChange={this.setSections}
            //setting the state of active sections
          />
          {/*Code for Accordion/Expandable List ends here*/}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  title: {
    fontSize: 18,
    fontWeight: '300',
  },
  header: {
    padding: 18,
  },
  headerText: {
    textAlign: 'left',
    paddingLeft: hp('3%'),
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: '#f7f7f7',
  },
  inactive: {
    backgroundColor: '#fff',
  },
});
