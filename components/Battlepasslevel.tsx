import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

type LevelSectionProps = {
  level: number;
  leftImage: any;  
  rightImage: any; 
};

const LevelSection: React.FC<LevelSectionProps> = ({ level, leftImage, rightImage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.blueSection}>
        <Image source={leftImage} style={styles.image} />
      </View>
      <View style={styles.separator} />
      <View style={styles.yellowSection}>
        <Image source={rightImage} style={styles.image} />
      </View>
      <View style={styles.hexagon}>
        <View style={styles.hexagonInner}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
        <View style={styles.hexagonBefore} />
        <View style={styles.hexagonAfter} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 5,
    borderBottomColor: '#004F60',
  },
  blueSection: {
    flex: 1,
    backgroundColor: '#04769B',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowSection: {
    flex: 1,
    backgroundColor: '#ED9700',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 2,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: 100,
    height: 70,
    resizeMode: 'contain',
  },
  hexagon: {
    position: 'absolute',
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hexagonInner: {
    width: 50,
    height: 30,
    backgroundColor: '#00556C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -15,
    left: 0,
    width: 0, 
    height: 0,
    borderLeftWidth: 25,
    borderLeftColor: 'transparent',
    borderRightWidth: 25,
    borderRightColor: 'transparent',
    borderBottomWidth: 15,
    borderBottomColor: '#00556C',
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 25,
    borderLeftColor: 'transparent',
    borderRightWidth: 25,
    borderRightColor: 'transparent',
    borderTopWidth: 15,
    borderTopColor: '#00556C',
  },
  levelText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});

export default LevelSection;
