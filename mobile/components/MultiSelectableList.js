import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import SelectableListItem from '~/components/SelectableListItem';

const MultiSelectableList = ({
  initialSelected = [],
  items = [], // { key, image, heading, subHeading, action }
  onSelect = () => {},
}) => {
  const [selected, setSelected] = useState(initialSelected);

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  function handlePress(item) {
    const updatedSelected = (
      selected.includes(item.key)
        ? selected.filter(key => item.key !== key)
        : [ ...selected, item.key ]
    );

    setSelected(updatedSelected);

    onSelect(updatedSelected);
  }

  return (
    <ScrollView style={styles.selectableList}>
      <TouchableWithoutFeedback>
        <View>
          {items.map((item, index) => (
            <SelectableListItem
              key={item.key}
              image={item.image}
              heading={item.heading}
              subHeading={item.subHeading}
              action={item.action}
              isSelected={selected.includes(item.key)}
              onPress={() => handlePress(item)}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  selectableList: {
  },
});

export default MultiSelectableList;
