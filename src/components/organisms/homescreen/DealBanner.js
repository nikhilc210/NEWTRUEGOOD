import React, {PureComponent} from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

//Required Imports
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const images = [
  require('../../../assets/images/banner1.jpg'),
  require('../../../assets/images/banner2.jpg'),
  require('../../../assets/images/banner3.jpg'),
  require('../../../assets/images/banner4.jpg'),
  require('../../../assets/images/banner5.jpg'),
];

const DOT_SIZE = 7;
const TIME = 4000;
export class DealBanner extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
    this.scrollView = React.createRef();
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.handleScroll();
    }, TIME);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  handleScroll = () => {
    const newIndex = this.state.currentIndex + 1;
    if (newIndex < images.length) {
      this.scrollView.current.scrollTo({
        x: newIndex * WIDTH,
        animated: true,
      });

      this.setState({
        currentIndex: newIndex,
      });
    } else {
      this.scrollView.current.scrollTo({
        x: 0,
        animated: true,
      });

      this.setState({
        currentIndex: 0,
      });
    }
  };

  onScroll = (event) => {
    const {contentOffset} = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / WIDTH);

    if (this.state.currentIndex !== currentIndex) {
      this.setState({
        currentIndex,
      });
    }
  };
  render() {
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={this.scrollView}
          onScroll={this.onScroll}>
          {images.map((img, i) => (
            <View
              key={i}
              style={{height: hp('22%'), width: WIDTH, position: 'relative'}}>
              <Image
                source={img}
                style={{
                  resizeMode: 'stretch',
                  width: WIDTH,
                  height: hp('22%'),
                }}
              />
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            height: hp('22%'),
            width: WIDTH,
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 10,
          }}>
          {Array.from({length: images.length}).map((_, index) => (
            <View
              key={index}
              style={{
                height: DOT_SIZE,
                margin: 3,
                width: DOT_SIZE,
                borderRadius: DOT_SIZE / 2,
                backgroundColor:
                  index === this.state.currentIndex ? '#1CA953' : '#E8EDF7',
              }}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default DealBanner;
