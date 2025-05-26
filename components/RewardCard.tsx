import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

interface RewardCardProps {
  reward: {
    id: string;
    title: string;
    businessName: string;
    pointsCost: number;
    image: string;
    validity: string;
  };
  onRedeem?: () => void;
  isOwned?: boolean;
}

export default function RewardCard({ 
  reward,
  onRedeem,
  isOwned = false
}: RewardCardProps) {
  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.rewardCard}>
      <Image source={{ uri: reward.image }} style={styles.rewardImage} />
      <View style={styles.rewardContent}>
        <View style={styles.rewardInfo}>
          <Text style={styles.rewardTitle}>{reward.title}</Text>
          <Text style={styles.rewardBusinessName}>{reward.businessName}</Text>
          <Text style={styles.rewardValidity}>{reward.validity}</Text>
        </View>
        <View style={styles.rewardPointsContainer}>
          <Text style={styles.rewardPointsCost}>{reward.pointsCost}</Text>
          <Text style={styles.rewardPointsLabel}>points</Text>
        </View>
      </View>
      
      {!isOwned ? (
        <TouchableOpacity 
          style={styles.redeemButton}
          onPress={onRedeem}
        >
          <Text style={styles.redeemButtonText}>Redeem</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.ownedButton}>
          <Text style={styles.ownedButtonText}>Ready to use</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rewardCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rewardImage: {
    width: '100%',
    height: 120,
  },
  rewardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
    marginBottom: 4,
  },
  rewardBusinessName: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rewardValidity: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#999',
  },
  rewardPointsContainer: {
    alignItems: 'center',
    marginLeft: 16,
  },
  rewardPointsCost: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#1a2151',
  },
  rewardPointsLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#666',
  },
  redeemButton: {
    backgroundColor: '#1a2151',
    paddingVertical: 12,
    alignItems: 'center',
  },
  redeemButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#F8D9A0',
  },
  ownedButton: {
    backgroundColor: '#4bc0c0',
    paddingVertical: 12,
    alignItems: 'center',
  },
  ownedButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});