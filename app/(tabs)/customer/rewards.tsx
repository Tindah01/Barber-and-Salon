import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Award, ChevronRight, Sparkles, Gift } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomerRewards() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Header opacity based on scroll position
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Available rewards data
  const availableRewards = [
    {
      id: '1',
      title: 'Free Hair Wash & Blow Dry',
      businessName: "Luxury Cuts",
      pointsCost: 150,
      image: 'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg',
      validity: 'Valid until July 15, 2025',
    },
    {
      id: '2',
      title: '50% Off Any Hair Color Treatment',
      businessName: "Glow Beauty Salon",
      pointsCost: 200,
      image: 'https://images.pexels.com/photos/3993418/pexels-photo-3993418.jpeg',
      validity: 'Valid until August 30, 2025',
    },
  ];

  // Exclusive offers data
  const exclusiveOffers = [
    {
      id: '1',
      title: 'Free Beard Trim with Haircut',
      businessName: "Alex's Barber Shop",
      image: 'https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg',
      validity: 'This week only',
    },
    {
      id: '2',
      title: '20% Off All Hair Products',
      businessName: "Elegant Hair Studio",
      image: 'https://images.pexels.com/photos/3738339/pexels-photo-3738339.jpeg',
      validity: 'Weekend special',
    },
  ];

  // Rotation animation for sparkles
  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.header, 
        { 
          opacity: headerOpacity, 
          transform: [
            { 
              translateY: headerOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              })
            }
          ] 
        }
      ]}>
        <Text style={styles.headerTitle}>Rewards</Text>
      </Animated.View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.pointsOverview}>
          <Text style={styles.pointsTitle}>Your Reward Points</Text>
          <View style={styles.pointsValueContainer}>
            <Text style={styles.pointsValue}>175</Text>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <Sparkles size={20} color="#F8D9A0" />
            </Animated.View>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Next reward at 200 points</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '87.5%' }]} />
            </View>
            <Text style={styles.progressDetails}>25 points to go</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Gift size={20} color="#1a2151" />
              <Text style={styles.sectionTitle}>Available Rewards</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {availableRewards.map(reward => (
            <TouchableOpacity key={reward.id} style={styles.rewardCard}>
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
              <TouchableOpacity style={styles.redeemButton}>
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.levelCard}>
          <LinearGradient
            colors={['#1a2151', '#2a3172']}
            style={styles.levelGradient}
          >
            <View style={styles.levelHeader}>
              <Award size={24} color="#F8D9A0" />
              <Text style={styles.levelTitle}>Silver Member</Text>
            </View>
            <Text style={styles.levelDescription}>
              You're a valued customer! Earn 2x points on weekday visits.
            </Text>
            <View style={styles.levelProgressContainer}>
              <Text style={styles.levelProgressText}>Silver</Text>
              <View style={styles.levelBar}>
                <View style={[styles.levelProgress, { width: '60%' }]} />
              </View>
              <Text style={styles.levelProgressText}>Gold</Text>
            </View>
            <Text style={styles.levelUpgradeText}>
              300 more points to reach Gold status
            </Text>
          </LinearGradient>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={20} color="#1a2151" />
              <Text style={styles.sectionTitle}>Exclusive Offers</Text>
            </View>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.exclusiveOffersContainer}
          >
            {exclusiveOffers.map(offer => (
              <TouchableOpacity key={offer.id} style={styles.offerCard}>
                <Image source={{ uri: offer.image }} style={styles.offerImage} />
                <View style={styles.offerContent}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerBusinessName}>{offer.businessName}</Text>
                  <Text style={styles.offerValidity}>{offer.validity}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.historyButtonText}>View Redemption History</Text>
          <ChevronRight size={20} color="#1a2151" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#1a2151',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#F8D9A0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  pointsOverview: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pointsTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
    marginBottom: 8,
  },
  pointsValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 40,
    color: '#1a2151',
    marginRight: 8,
  },
  progressContainer: {
    width: '100%',
  },
  progressText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F8D9A0',
    borderRadius: 4,
  },
  progressDetails: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#1a2151',
    marginLeft: 8,
  },
  seeAllText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#1a2151',
  },
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
  levelCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  levelGradient: {
    padding: 24,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#F8D9A0',
    marginLeft: 8,
  },
  levelDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 20,
    marginBottom: 24,
  },
  levelProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  levelProgress: {
    height: '100%',
    backgroundColor: '#F8D9A0',
    borderRadius: 4,
  },
  levelProgressText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#F8D9A0',
  },
  levelUpgradeText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  exclusiveOffersContainer: {
    paddingRight: 24,
  },
  offerCard: {
    width: 240,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  offerImage: {
    width: '100%',
    height: 140,
  },
  offerContent: {
    padding: 16,
  },
  offerTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
    marginBottom: 4,
  },
  offerBusinessName: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  offerValidity: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#999',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  historyButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#1a2151',
    marginRight: 8,
  },
});