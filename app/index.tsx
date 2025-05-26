import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { SplashScreen, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Scissors } from 'lucide-react-native';

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const router = useRouter();
  
  const [fontsLoaded, fontError] = useFonts({
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
    'Montserrat-Regular': Montserrat_400Regular, 
    'Montserrat-SemiBold': Montserrat_600SemiBold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a2151', '#2a3172']}
        style={styles.background}
      />
      
      <View style={styles.logoContainer}>
        <Scissors color="#F8D9A0" size={48} />
        <Text style={styles.logoText}>Salon Rewards</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Loyalty that pays off</Text>
        <Text style={styles.subtitle}>
          Reward your customers or earn points with every visit to your favorite salon
        </Text>
        
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3992871/pexels-photo-3992871.jpeg' }} 
          style={styles.heroImage}
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.buttonBusiness}
            onPress={() => router.push('/(auth)/business-login')}
          >
            <Text style={styles.buttonBusinessText}>Business Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.buttonCustomer}
            onPress={() => router.push('/(auth)/customer-login')}
          >
            <Text style={styles.buttonCustomerText}>Customer Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoContainer: {
    marginTop: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoText: {
    marginLeft: 10,
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#F8D9A0',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  heroImage: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  buttonBusiness: {
    backgroundColor: 'rgba(248, 217, 160, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F8D9A0',
    alignItems: 'center',
  },
  buttonBusinessText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#F8D9A0',
  },
  buttonCustomer: {
    backgroundColor: '#F8D9A0',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonCustomerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
  },
});