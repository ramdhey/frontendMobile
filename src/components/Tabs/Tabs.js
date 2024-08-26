import React, {useRef, useState} from 'react';
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
  Animated,
} from 'react-native';
import Txt from '../Txt/Txt';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';

const Tabs = ({items, loading, tabConfig, backgroundColor}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const bg = theme.tabs || backgroundColor;
  const colorTxtTab = theme.text;
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let newActiveTab = activeTab;
      if (event.nativeEvent.translationX < 0) {
        // Swipe left
        newActiveTab =
          activeTab + 1 < tabConfig.length ? activeTab + 1 : activeTab;
      } else {
        // Swipe right
        newActiveTab = activeTab - 1 >= 0 ? activeTab - 1 : activeTab;
      }
      setActiveTab(newActiveTab);
      translateX.setValue(0); // Reset translation to 0 after gesture ends
    }
  };

  const renderTabContent = () => {
    const ActiveComponent = tabConfig[activeTab].component;
    const propKey = tabConfig[activeTab].prop;
    return <ActiveComponent item={items[propKey]} loading={loading} />;
  };

  return (
    <GestureHandlerRootView style={{flex: 1, width: '100%'}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: '2%',
          backgroundColor: bg,
          paddingVertical: '3%',
          alignItems: 'center',
        }}>
        {tabConfig.map((tab, index) => (
          <TouchableOpacity
            key={tab.label}
            onPress={() => setActiveTab(index)}
            style={{
              ...styles.tab,
              borderBottomWidth: activeTab === index ? 2 : 0,
            }}>
            <Txt
              fontSize={12}
              fontType="Medium"
              style={{
                ...styles.tabLabel,
                color: activeTab === index ? '#0375BC' : colorTxtTab,
              }}>
              {tab.label}
            </Txt>
          </TouchableOpacity>
        ))}
      </View>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={{
            width: '100%',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          {renderTabContent()}
        </Animated.View>
      </PanGestureHandler>
      {/* <View
        style={{
          width: '100%',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        {renderTabContent()}
      </View> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: '2%',
    backgroundColor: '#FFFF',
    paddingVertical: '3%',
  },
  tab: {
    alignItems: 'center',
    paddingVertical: '2%',
    borderBottomColor: '#0375BC',
  },
  tabLabel: {
    fontFamily: 'Poppins-Bold',
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
});

export default Tabs;
