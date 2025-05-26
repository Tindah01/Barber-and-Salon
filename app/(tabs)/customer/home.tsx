import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Scissors, Clock, CalendarClock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CustomerHome() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const pointsScale = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  // Pulse animation for points
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pointsScale, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pointsScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulseAnimation.start();
    
    return () => pulseAnimation.stop();
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

  const recentVisits = [
    {
      id: '1',
      name: "Alex's Barber Shop",
      date: 'June 12, 2025',
      service: 'Haircut & Styling',
      points: 25,
      image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg',
    },
    {
      id: '2',
      name: "Glow Beauty Salon",
      date: 'May 28, 2025',
      service: 'Hair Coloring',
      points: 50,
      image: 'https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg',
    },
  ];

  const nearbyLocations = [
    {
      id: '1',
      name: "Luxury Cuts",
      distance: '0.5 mi',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3992871/pexels-photo-3992871.jpeg',
    },
    {
      id: '2',
      name: "Modern Style",
      distance: '1.2 mi',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg',
    },
    {
      id: '3',
      name: "Elegant Hair Studio",
      distance: '2.0 mi',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
    },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.header, 
        { opacity: headerOpacity, transform: [{ translateY: headerOpacity.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 0],
        })}] }
      ]}>
        <Text style={styles.headerTitle}>Salon Rewards</Text>
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
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>Sophia</Text>
        </View>
        
        <Animated.View 
          style={[styles.pointsCard, {
            transform: [{ scale: pointsScale }]
          }]}
        >
          <View style={styles.pointsHeader}>
            <Scissors color="#F8D9A0" size={24} />
            <Text style={styles.pointsTitle}>Your Points</Text>
          </View>
          <Text style={styles.pointsValue}>175</Text>
          <View style={styles.pointsInfo}>
            <Text style={styles.pointsInfoText}>Next reward at 200 points</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '87.5%' }]} />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.redeemButton}
            onPress={() => router.push('/(tabs)/customer/rewards')}
          >
            <Text style={styles.redeemButtonText}>View Rewards</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Visits</Text>
          {recentVisits.map(visit => (
            <View key={visit.id} style={styles.visitCard}>
              <Image 
                source={{ uri: visit.image }} 
                style={styles.visitImage}
              />
              <View style={styles.visitInfo}>
                <Text style={styles.visitName}>{visit.name}</Text>
                <View style={styles.visitDetail}>
                  <Clock size={14} color="#919CDA" />
                  <Text style={styles.visitDate}>{visit.date}</Text>
                </View>
                <Text style={styles.visitService}>{visit.service}</Text>
                <View style={styles.pointsEarned}>
                  <Text style={styles.pointsEarnedText}>+{visit.points} points earned</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Salons</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.nearbyContainer}
          >
            {nearbyLocations.map(location => (
              <TouchableOpacity key={location.id} style={styles.nearbyCard}>
                <Image 
                  source={{ uri: location.image }} 
                  style={styles.nearbyImage}
                />
                <View style={styles.nearbyInfo}>
                  <Text style={styles.nearbyName}>{location.name}</Text>
                  <View style={styles.nearbyDetail}>
                    <Text style={styles.nearbyDistance}>{location.distance}</Text>
                    <Text style={styles.nearbyRating}>★ {location.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <CalendarClock size={20} color="#F8D9A0" />
              <Text style={styles.appointmentTitle}>Haircut & Style</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.appointmentLocation}>Luxury Cuts</Text>
              <Text style={styles.appointmentTime}>Thursday, June 20 • 2:30 PM</Text>
            </View>
            <View style={styles.appointmentActions}>
              <TouchableOpacity style={styles.rescheduleButton}>
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  welcomeSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  welcomeText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#666',
  },
  nameText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#1a2151',
  },
  pointsCard: {
    backgroundColor: '#1a2151',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#F8D9A0',
    marginLeft: 8,
  },
  pointsValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 48,
    color: '#fff',
    marginVertical: 16,
  },
  pointsInfo: {
    marginBottom: 24,
  },
  pointsInfoText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F8D9A0',
    borderRadius: 4,
  },
  redeemButton: {
    backgroundColor: 'rgba(248, 217, 160, 0.2)',
    borderWidth: 1,
    borderColor: '#F8D9A0',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  redeemButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#F8D9A0',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#1a2151',
    marginBottom: 16,
  },
  visitCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  visitImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  visitInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  visitName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
    marginBottom: 4,
  },
  visitDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  visitDate: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  visitService: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  pointsEarned: {
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  pointsEarnedText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#1a2151',
  },
  nearbyContainer: {
    paddingRight: 24,
  },
  nearbyCard: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  nearbyImage: {
    width: '100%',
    height: 120,
  },
  nearbyInfo: {
    padding: 12,
  },
  nearbyName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#1a2151',
    marginBottom: 4,
  },
  nearbyDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nearbyDistance: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#666',
  },
  nearbyRating: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#F8D9A0',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  appointmentTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
    marginLeft: 8,
  },
  appointmentDetails: {
    marginBottom: 16,
  },
  appointmentLocation: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  appointmentTime: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rescheduleButton: {
    backgroundColor: '#1a2151',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  rescheduleText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#f5f6fa',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#666',
  },
});