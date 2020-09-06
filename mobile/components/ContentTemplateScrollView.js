import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ScrollView } from "react-native";

import ContentTemplateCard from "~/components/ContentTemplateCard";

function ContentTemplateScrollView({
  heading,
  templates,
  onTemplatePress = () => {},
}) {
  return (
    <View>
      <Text style={styles.heading}>
        {heading}
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {templates.map((template, index) => (
          <View
            key={index}
            style={[
              styles.cardWrapper,
              index === 0 && styles.cardWrapperFirst
            ]}
          >
            <ContentTemplateCard
              heading={template.heading}
              imageSource={template.imageSource}
              videoSource={template.videoSource}
              onPress={() => onTemplatePress(template)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
  },
  scrollView: {
    overflow: 'visible',
  },
  contentContainer: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  cardWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  cardWrapperFirst: {
    marginLeft: 30,
  },
});

export default ContentTemplateScrollView;
