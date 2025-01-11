import { View, Text, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import ContentItem from './ContentItem';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Content({ content, onChapterFinish }) {
  let contentRef;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const onNextButtonPress = (index) => {
    if (content?.length <= index + 1) {
      //navigation.goBack();

      onChapterFinish();
      return;
    }
    setActiveIndex(index+1)
    contentRef.scrollToIndex({ animated: true, index: index + 1 });
  };

  return (
    <View style={{ paddingBottom: 0 }}>
      <ProgressBar
        contentLength={content?.length}
        contentIndex={activeIndex}
      />
      
      <FlatList
        data={content}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={(ref) => { contentRef = ref; }}
        renderItem={({ item, index }) => (
          <View style={{ width: Dimensions.get('screen').width, padding: 20 }}>
            <ScrollView>
              <Text style={{ fontFamily: 'outfit-medium', fontSize: 22, marginTop: 5 }}>
                {item.title}
              </Text>
              <ContentItem
                description={item?.description?.html}
                output={item?.output?.html}
              />
            </ScrollView>
            <TouchableOpacity 
              onPress={() => onNextButtonPress(index)}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{
                  padding: 15,
                  backgroundColor: Colors.PRIMARY,
                  color: Colors.WHITE,
                  textAlign: 'center',
                  fontFamily: 'outfit',
                  borderRadius: 15,
                  fontSize: 18,
                  margin: 5,
                }}
              >
                {content?.length > index + 1 ? 'Next' : 'Finish'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
