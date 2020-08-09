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
            style={styles.cardWrapper}
          >
            <ContentTemplateCard
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
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
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
    marginLeft: 20,
    marginRight: 20,
  },
});

export default ContentTemplateScrollView;
