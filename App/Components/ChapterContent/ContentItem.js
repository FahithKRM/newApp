import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RenderHtml from 'react-native-render-html';
import Colors from '../../Utils/Colors';

const tagsStyles = {
  body: {
    fontFamily: 'outfit',
    fontSize: 18
  },
  code: {
    backgroundColor:Colors.BLACK,
    color:Colors.WHITE,
    padding:20,
    borderRadius:15,
  }
};

export default function ContentItem({description, output}) {
  const { width } = useWindowDimensions();
  const [isRun, setIsRun] = useState(false);
  const descriptionSource = {
    html:description
  }
  const outputSource = {
    html:output
  }

  return description &&(
    <View>
      {/* <Text>{description}</Text> */}
      <RenderHtml
      contentWidth={width}
      source={descriptionSource}
      tagsStyles={tagsStyles}
      />

    
    {output != null ?<TouchableOpacity 
    onPress={() => setIsRun(true)}>
      <Text style={{padding:10, backgroundColor:Colors.PRIMARY, borderRadius:15, fontFamily:'outfit-medium', fontSize:18, color:Colors.WHITE, textAlign:'center', width:100}}>Run</Text>
    </TouchableOpacity> : null}

   {isRun ?
   <> <RenderHtml
      contentWidth={width}
      source={outputSource}
      tagsStyles={tagsStyles}
      /></> : null}

    </View>
  )
}

