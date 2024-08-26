import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Txt from '../Txt/Txt';

const Countdown = ({initialSeconds}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer =
      seconds > 0 ? setTimeout(() => setSeconds(seconds - 1), 1000) : null;
    return () => clearTimeout(timer);
  }, [seconds]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      secondsLeft < 10 ? '0' : ''
    }${secondsLeft}`;
  };

  return (
    <View>
      {seconds > 0 ? (
        <Txt
          fontSize={13}
          fontType="Bold"
          style={{
            textAlign: 'left',
            width: 'auto',
            color: '#49B4F8',
          }}>
          {formatTime()}
        </Txt>
      ) : (
        <Txt
          fontSize={13}
          fontType="Bold"
          style={{
            textAlign: 'left',
            width: 'auto',
            color: '#fb380e',
          }}>
          Waktu Habis
        </Txt>
      )}
    </View>
  );
};

export default Countdown;
