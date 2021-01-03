import React, { useState, useEffect, useCallback } from 'react';
import { Text } from 'react-native';

const TimeClock = (props) => {
  const { style } = props;
  const [timer, setTimer] = useState(null);
  const [text, setText] = useState('00:00:00');

  const start = useCallback(() => {
    const now = new Date();
    const options = { hour12: false };
    setText(now.toLocaleTimeString('zh-CN', options));
  }, []);

  useEffect(() => {
    setTimer(setInterval(start, 1000));
  }, [start]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return <Text style={style}>{text}</Text>;
};

export default TimeClock;
