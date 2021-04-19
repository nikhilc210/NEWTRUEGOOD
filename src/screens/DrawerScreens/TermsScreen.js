import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import BackHeader from '../../components/inc/BackHeader';
import {COLORS} from '../../constants/theme';

const TermsScreen = () => {
  return (
    <View style={styles.container}>
      <BackHeader title="Terms & Conditions" />
      <ScrollView style={{padding: 10}}>
        <Text style={styles.titleStyle}>Personal Information</Text>
        <Text style={styles.textStyle}>
          True Good Essentials LLP is a licensed brand and the website
          is……………………. We respects your privacy. It is highly recommended that as
          a visitor to the site, you read and understand the Terms and
          conditions carefully. By accessing the services provided on this site,
          you agree to the collection and use of your data by True Good in the
          manner provided in this Terms and conditions.
        </Text>
        <Text style={styles.textStyle}>
          If you have any doubts regarding the Terms and conditions, please do
          not hesitate to contact us at info@truegood.in.
        </Text>
        <Text style={styles.titleStyle}>Account & Registration</Text>
        <Text style={styles.textStyle}>
          Obligations All customers will have to complete the registration
          process and login to place orders on the marketplace. The customers
          must keep their account details updated and correct for communications
          related to their purchases. By agreeing to the terms and conditions,
          the customer agrees to receive promotional communication emails and
          messages upon registration. The customer can opt-out if needed either
          by unsubscribing to the mailing list or by contacting the customer
          service.
        </Text>
        <Text style={styles.textStyle}>
          As part of the registration process on the Site, True Good may collect
          the following personally identifiable information about you: Name,
          email address, mobile phone number, contact details, Postal code and
          Demographic profile (like your age, gender, address etc.) and your
          browsing information in the site.
        </Text>

        <Text style={styles.titleStyle}>License & Site access</Text>
        <Text style={styles.textStyle}>
          Any kind of resale or commercial use of this site or its contents is
          not acceptable; any collection and use of any product listings,
          descriptions, or prices; any derivative use of this site or its
          contents; any downloading or copying of account information for the
          benefit of another merchant; or any use of data mining, robots, or
          similar data gathering and extraction tools is not permissible. This
          site or any portion of this site may not be reproduced, duplicated,
          copied, sold, resold, visited, or otherwise exploited for any
          commercial purpose without express .You may not frame or utilize
          framing techniques to enclose any trademark, logo, or other
          proprietary information (including images, text, page layout, or form)
          of the Site.
        </Text>
        <Text style={styles.titleStyle}>
          Account & Registration Obligations
        </Text>
        <Text style={styles.textStyle}>
          Registration and login of all shoppers is must for placing orders on
          the Site. You have to keep your account and registration details
          current and correct for communications related to your purchases from
          the site. By agreeing to the terms and conditions, the shopper agrees
          to receive promotional communication and newsletters upon
          registration.
        </Text>
        <Text style={styles.titleStyle}>Pricing</Text>
        <Text style={styles.textStyle}>
          All the products listed on the Site will be sold at MRP unless
          otherwise specified. Ordering prices will be the prices charged on the
          date of the delivery. Although prices of most of the products do not
          fluctuate on a daily basis but some of the commodities and fresh food
          prices do change on a daily basis. No additional charges will be
          collected or refunded at the time of the delivery of the order, in
          case the prices are higher or lower on the date of delivery.
        </Text>
        <Text style={styles.titleStyle}>Cancellation & Refund</Text>
        <Text style={styles.textStyle}>
          In case you wish to cancel an order, you as a customer can contact the
          customer service at any point of time before the order enters the
          dispatched or shipped state. Once the order has been dispatched, the
          cancellation will not be possible and the subsequent refund will not
          be provided. Once you have cancelled your order before dispatch, you
          will receive a refund to your mode of payment within 5 working days.
          In case we suspect any fraudulent transaction by the customer or a
          transaction that defies the terms & conditions of using our website,
          True Good at our sole discretion can cancel the orders. We will
          maintain a negative list of all the fraudulent transactions and the
          customers and would deny them access to place any orders or cancel any
          orders already placed by them.
        </Text>

        <Text style={styles.titleStyle}>You Agree and Confirm</Text>
        <Text style={styles.textStyle}>
          1. That in the event that a non-delivery occurs on account of a
          mistake by you (i.e. wrong name or address or any other wrong
          information) any extra cost incurred by True Good for redelivery shall
          be claimed from you.
        </Text>
        <Text style={styles.textStyle}>
          2. That you will use the services provided by the Site, its
          affiliates, consultants and contracted companies, for lawful purposes
          only and comply with all applicable laws and regulations while using
          and transacting on the Site.
        </Text>
        <Text style={styles.textStyle}>
          3. You will provide authentic and true information in all instances
          where such information is requested of you. True Good Essentials LLP
          reserves the right to confirm and validate the information and other
          details provided by you at any point of time. If upon confirmation
          your details are found not to be true (wholly or partly), it has the
          right in its sole discretion to reject the registration and debar you
          from using the Services and / or other affiliated websites without
          prior intimation whatsoever.
        </Text>
        <Text style={styles.textStyle}>
          4. You authorise True Good to contact you for any transactional
          purposes related to your order/account.
        </Text>
        <Text style={styles.textStyle}>
          5. That you are accessing the services available on this Site and
          transacting at your own risk and are using your best and wise judgment
          before entering into any transaction through this Site.
        </Text>
        <Text style={styles.textStyle}>
          6. The delivery address will be correct and proper in all respects.
        </Text>
        <Text style={styles.textStyle}>
          7. That before placing an order you will check the product description
          carefully. By placing an order for a product you are agreed to be
          bound by the conditions of sale
        </Text>
        <Text style={styles.titleStyle}>
          You may not use the Site for any of the following purposes:
        </Text>
        <Text style={styles.textStyle}>
          1. Proclaim any unlawful, harassing, libellous, abusive, threatening,
          harmful, vulgar, obscene, or otherwise objectionable material.
        </Text>
        <Text style={styles.textStyle}>
          2. Transmitting material that encourages conduct that constitutes a
          criminal offence or results in civil liability or otherwise breaches
          any relevant laws, regulations or code of practice.
        </Text>
        <Text style={styles.textStyle}>
          3. Gaining unauthorized access to other computer systems.
        </Text>
        <Text style={styles.textStyle}>
          4. Interfering with any other person's use or enjoyment of the Site.
        </Text>
        <Text style={styles.textStyle}>5. Breaching any applicable laws.</Text>
        <Text style={styles.textStyle}>
          6. Interfering or disrupting networks or web sites connected to the
          Site.{' '}
        </Text>
        <Text style={styles.textStyle}>
          7. Making, transmitting or storing electronic copies of materials
          protected by copyright without the permission of the owner.
        </Text>

        <Text style={styles.titleStyle}>Colours</Text>
        <Text style={styles.textStyle}>
          We have made every effort to display the colours of our products that
          appear on the Website as accurately as possible. However, as the
          actual colours you see will depend on your monitor, we cannot
          guarantee the accuracy of your monitor's display of any colour.
        </Text>
        <Text style={styles.titleStyle}>
          {' '}
          Modification of Terms & Conditions of Service
        </Text>
        <Text style={styles.textStyle}>
          True Good Essentials LLP may modify the Terms & Conditions of Use of
          the Website at any time without any prior notification to you. You can
          access the latest version of these Terms & Conditions at any given
          time on the Site. You should regularly review the Terms & Conditions
          on the Site. In the event the modified Terms & Conditions is not
          acceptable to you, you should discontinue using the Service. However,
          if you continue to use the Service you have to agree, accept and abide
          by the modified Terms & Conditions of Use of this Site.
        </Text>
        <Text style={styles.titleStyle}>Governing Law and Jurisdiction</Text>
        <Text style={styles.textStyle}>
          This User Agreement shall be understand in accordance with the
          applicable laws of India. This Agreement will be governed by the laws
          of the State without regard to its conflict of law principles to the
          contrary. Dispute or any difference either in interpretation or
          otherwise, of any terms of this User Agreement between the parties
          hereto, proceeding or claim to enforce the provisions of this
          Agreement, to recover damages for breach of or default of this
          Agreement, or otherwise arising under or by reason of this Agreement,
          other than in courts located in State of West Bengal. By using this
          Website or ordering Products, you consent to the jurisdiction and
          venue of such courts in connection with any action, suit, proceeding
          or claim arising under or by reason of this Agreement. You hereby
          waive any right to trial by jury arising out of this Agreement and any
          related documents.
        </Text>

        <Text style={styles.titleStyle}>Feedback and Submissions</Text>
        <Text style={styles.textStyle}>
          You agree you shall remain solely responsible for the contents of any
          submissions you make, and you will not submit material that is
          unlawful, defamatory, abusive or obscene. You agree that you will not
          submit anything to the site that will violate any right of any third
          party, including copyright, trademark, privacy or other personal or
          proprietary right(s). While we appreciate your interest in True Good,
          we do not want and cannot accept any ideas you consider to be
          proprietary regarding designs, product technology or other suggestions
          you may have developed. Consequently, any material you submit to this
          site will be deemed a grant of a royalty free non-exclusive right and
          license to use, reproduce, modify, display, transmit, adapt, publish,
          translate, create derivative works from and distribute these materials
          throughout the universe in any medium and through any methods of
          distribution, transmission and display whether now known or hereafter
          devised. In addition, you warrant that all so-called "moral rights"
          have been waived.
        </Text>

        <Text style={styles.titleStyle}>Force Majeure</Text>
        <Text style={styles.textStyle}>
          True Good will not be deemed in default hereunder or held responsible
          for any cessation, interruption or delay in the performance of its
          obligations hereunder due to earthquake, flood, fire, storm, natural
          disaster, act of God, war, terrorism, armed conflict, labour strike,
          lockout, or boycott.
        </Text>
        <Text style={styles.titleStyle}>Termination</Text>
        <Text style={styles.textStyle}>
          True Good will not be deemed in default hereunder or held responsible
          for any cessation, interruption or delay in the performance of its
          obligations hereunder due to earthquake, flood, fire, storm, natural
          disaster, act of God, war, terrorism, armed conflict, labour strike,
          lockout, or boycott.
        </Text>
      </ScrollView>
    </View>
  );
};
export default TermsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  textBoldStyle: {fontSize: RFValue(14), fontWeight: 'bold'},
  titleStyle: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },
  textStyle: {marginVertical: 10, fontSize: RFValue(13)},
});
