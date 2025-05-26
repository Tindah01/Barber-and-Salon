import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Shield, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';

export default function CustomerQRCode() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  useEffect(() => {
    // Setup pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Setup rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
    
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Circular glow animation
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // QR code value - in a real app, this would be a unique customer identifier
  const qrValue = 'CUSTOMER:SOPHIA:175PTS:SILVER';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a2151', '#2a3172']}
        style={styles.background}
      />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your QR Code</Text>
        <Text style={styles.headerSubtitle}>Show this to get rewards</Text>
      </View>
      
      <View style={styles.qrContainer}>
        <Animated.View 
          style={[
            styles.glowEffect,
            { 
              transform: [
                { scale: pulseAnim },
                { rotate }
              ] 
            }
          ]}
        />
        
        <View style={styles.qrContent}>
          <View style={styles.qrCard}>
            <View style={styles.qrNameContainer}>
              <Text style={styles.qrName}>Sophia Williams</Text>
              <View style={styles.membershipBadge}>
                <Text style={styles.membershipText}>Silver</Text>
              </View>
            </View>
            
            <View style={styles.qrCodeWrapper}>
              <QRCode 
                value={qrValue}
                size={200}
                color="#1a2151"
                backgroundColor="#fff"
              />
            </View>
            
            <Text style={styles.pointsText}>175 points</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoHeader}>
          <Info size={18} color="#1a2151" />
          <Text style={styles.infoTitle}>How to use</Text>
        </View>
        
        <View style={styles.infoContent}>
          <Text style={styles.infoText}>
            1. Show this QR code to your stylist after your service
          </Text>
          <Text style={styles.infoText}>
            2. They'll scan it to award your loyalty points
          </Text>
          <Text style={styles.infoText}>
            3. Collect enough points to redeem rewards
          </Text>
        </View>
        
        <View style={styles.securityNote}>
          <Shield size={16} color="#1a2151" />
          <Text style={styles.securityText}>
            Your code refreshes for security purposes
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.historyButton}>
        <Text style={styles.historyButtonText}>View Points History</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');
const glowSize = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#F8D9A0',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#e0e0e0',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: width * 0.9,
  },
  glowEffect: {
    position: 'absolute',
    width: glowSize,
    height: glowSize,
    borderRadius: glowSize / 2,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(248, 217, 160, 0.3)',
    borderStyle: 'dashed',
  },
  qrContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  qrNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#1a2151',
    marginRight: 10,
  },
  membershipBadge: {
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  membershipText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#1a2151',
  },
  qrCodeWrapper: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
  },
  pointsText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
  },
  infoContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
    marginLeft: 8,
  },
  infoContent: {
    marginBottom: 16,
  },
  infoText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 16,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 33, 81, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  securityText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#1a2151',
    marginLeft: 8,
  },
  historyButton: {
    marginHorizontal: 24,
    backgroundColor: '#F8D9A0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  historyButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
  },
});