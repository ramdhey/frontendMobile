import React from 'react';
import {View, RefreshControl} from 'react-native';

const Refresh = ({onRefresh, refreshing, colors, tintColor}) => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={colors}
      tintColor={tintColor}
      // Tambahkan properti lain yang ingin kamu kustomisasi
    />
  );
};

export default Refresh;