import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import SelectableListItem from '~/components/SelectableListItem';

const SelectableList = ({
  initialSelectedItem = {},
  items = [], // { key, image, heading, subHeading, action }
}) => {
  const [selected, setSelectedItem] = useState(initialSelectedItem);

  function handlePress(item) {
    setSelectedItem(item);
    item.onSelect && item.onSelect();
  }

  return (
    <ScrollView style={styles.selectableList}>
      {items.map((item, index) => (
        <SelectableListItem
          key={item.key}
          image={item.image}
          heading={item.heading}
          subHeading={item.subHeading}
          action={item.action}
          isSelected={item.key === selected.key}
          onPress={() => handlePress(item)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  selectableList: {
  },
});

export default SelectableList;
