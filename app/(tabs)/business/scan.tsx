import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CircleCheck as CheckCircle2, X, TriangleAlert as AlertTriangle, Scissors } from 'lucide-react-native';

export default function BusinessScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedCustomer, setScannedCustomer] = useState(null);
  const [showPoints, setShowPoints] = useState(false);
  const [pointsToAward, setPointsToAward] = useState(25);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isMounted = useRef(true);

  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (isMounted.current) {
        setHasPermission(status === 'granted');
      }
    })();

    return () => {
      isMounted.current = false;
    };
  }, []);
  
  useEffect(() => {
    if (scanned) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [scanned, fadeAnim]);

  if (!fontsLoaded) {
    return null;
  }

  const handleBarCodeScanned = ({ data }) => {
    if (!isMounted.current) return;
    
    setScanned(true);
    
    try {
      const [prefix, name, points, level] = data.split(':');
      
      if (prefix !== 'CUSTOMER') {
        Alert.alert('Invalid QR Code', 'This is not a valid customer QR code');
        return;
      }
      
      setScannedCustomer({
        name,
        currentPoints: parseInt(points.replace('PTS', '')),
        level
      });
      
    } catch (error) {
      Alert.alert('Error', 'Could not read customer data');
    }
  };

  const handleAwardPoints = () => {
    if (!isMounted.current) return;
    setShowPoints(true);
  };

  const handleConfirmPoints = () => {
    if (!isMounted.current) return;
    Alert.alert(
      'Success', 
      `${pointsToAward} points awarded to ${scannedCustomer.name}!`,
      [{ text: 'OK', onPress: () => handleReset() }]
    );
  };

  const handleReset = () => {
    if (!isMounted.current) return;
    setScanned(false);
    setScannedCustomer(null);
    setShowPoints(false);
    setPointsToAward(25);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Requesting for camera permission</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={() => BarCodeScanner.requestPermissionsAsync()}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scan Customer Code</Text>
        <Text style={styles.headerSubtitle}>Award points to your customers</Text>
      </View>
      
      <View style={styles.scannerContainer}>
        {!scanned ? (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.overlay}>
              <View style={styles.overlayRow}>
                <View style={styles.overlayItem} />
                <View style={styles.transparentBox} />
                <View style={styles.overlayItem} />
              </View>
              <View style={styles.overlayRow}>
                <View style={styles.overlayItem} />
                <View style={styles.overlayItem} />
                <View style={styles.overlayItem} />
              </View>
            </View>
            <View style={styles.scannerFrame} />
            <View style={styles.scannerInfo}>
              <Camera size={24} color="#F8D9A0" />
              <Text style={styles.scannerText}>Align QR code within frame</Text>
            </View>
          </>
        ) : (
          <LinearGradient
            colors={['#1a2151', '#2a3172']}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        
        <Animated.View 
          style={[
            styles.resultContainer, 
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            }
          ]}
        >
          {scannedCustomer && (
            <>
              <View style={styles.resultHeader}>
                <CheckCircle2 size={36} color="#4bc0c0" />
                <Text style={styles.resultTitle}>Customer Found</Text>
              </View>
              
              <View style={styles.customerCard}>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{scannedCustomer.name}</Text>
                  <View style={styles.customerDetails}>
                    <View style={styles.levelBadge}>
                      <Text style={styles.levelText}>{scannedCustomer.level}</Text>
                    </View>
                    <Text style={styles.pointsText}>
                      Current Points: {scannedCustomer.currentPoints}
                    </Text>
                  </View>
                </View>
                
                {!showPoints ? (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.awardButton}
                      onPress={handleAwardPoints}
                    >
                      <Text style={styles.awardButtonText}>Award Points</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={handleReset}
                    >
                      <X size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.pointsSelector}>
                    <Text style={styles.pointsSelectorTitle}>Award Points</Text>
                    <View style={styles.pointsRow}>
                      <TouchableOpacity 
                        style={styles.pointsButton}
                        onPress={() => setPointsToAward(Math.max(5, pointsToAward - 5))}
                      >
                        <Text style={styles.pointsButtonText}>-5</Text>
                      </TouchableOpacity>
                      <View style={styles.pointsValueContainer}>
                        <Text style={styles.pointsValue}>{pointsToAward}</Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.pointsButton}
                        onPress={() => setPointsToAward(pointsToAward + 5)}
                      >
                        <Text style={styles.pointsButtonText}>+5</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.pointsDescription}>
                      <Scissors size={16} color="#1a2151" />
                      <Text style={styles.serviceText}>Regular Haircut</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.confirmButton}
                      onPress={handleConfirmPoints}
                    >
                      <Text style={styles.confirmButtonText}>Confirm Points</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              
              <View style={styles.note}>
                <AlertTriangle size={16} color="#1a2151" />
                <Text style={styles.noteText}>
                  Make sure you're awarding points to the correct customer
                </Text>
              </View>
            </>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#1a2151',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
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
  scannerContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
  },
  overlayRow: {
    flex: 1,
    flexDirection: 'row',
  },
  overlayItem: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  transparentBox: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scannerFrame: {
    position: 'absolute',
    top: '30%',
    left: '15%',
    width: '70%',
    height: '40%',
    borderWidth: 2,
    borderColor: '#F8D9A0',
    borderRadius: 16,
  },
  scannerInfo: {
    position: 'absolute',
    bottom: '20%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
  },
  scannerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f6fa',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#1a2151',
    marginTop: 8,
  },
  customerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  customerInfo: {
    marginBottom: 20,
  },
  customerName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#1a2151',
    marginBottom: 8,
  },
  customerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 12,
  },
  levelText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#1a2151',
  },
  pointsText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  awardButton: {
    flex: 1,
    backgroundColor: '#1a2151',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  awardButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#F8D9A0',
  },
  cancelButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pointsSelector: {
    marginTop: 16,
  },
  pointsSelectorTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
    marginBottom: 12,
    textAlign: 'center',
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
  },
  pointsValueContainer: {
    width: 80,
    height: 60,
    backgroundColor: 'rgba(248, 217, 160, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F8D9A0',
  },
  pointsValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#1a2151',
  },
  pointsDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  serviceText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  confirmButton: {
    backgroundColor: '#F8D9A0',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 33, 81, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    maxWidth: '90%',
  },
  noteText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#1a2151',
    marginLeft: 8,
    flexShrink: 1,
  },
  permissionText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#1a2151',
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#1a2151',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'center',
  },
  permissionButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});