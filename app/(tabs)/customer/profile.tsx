import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { User, Settings, Bell, LogOut, ChevronRight, Award, Clock, CalendarClock, Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomerProfile() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  
  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Kelvin Mutinda</Text>
          <View style={styles.profileBadge}>
            <Award size={16} color="#71809D" />
            <Text style={styles.profileLevel}>Silver Member</Text>
          </View>
          <Text style={styles.profileSince}>Member since June 2025</Text>
        </View>
        
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>175</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Visits</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Rewards</Text>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>My Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <User size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Personal Information</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Clock size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Points History</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <CalendarClock size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Appointments</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Award size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>My Rewards</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Preferences</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Bell size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#ddd", true: "rgba(26, 33, 81, 0.6)" }}
              thumbColor={notificationsEnabled ? "#1a2151" : "#ccc"}
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </View>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Settings size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>App Settings</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Shield size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Privacy & Security</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
        <LinearGradient
          colors={['rgba(26, 33, 81, 0.05)', 'rgba(26, 33, 81, 0.1)']}
          style={styles.inviteCard}
        >
          <View style={styles.inviteContent}>
            <Text style={styles.inviteTitle}>Share the Love</Text>
            <Text style={styles.inviteText}>
              Invite friends to join Salon Rewards and earn 50 bonus points when they sign up!
            </Text>
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteButtonText}>Invite Friends</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#ff6b6b" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    backgroundColor: '#1a2151',
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#F8D9A0',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#F8D9A0',
  },
  profileName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#1a2151',
    marginBottom: 8,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(113, 128, 157, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  profileLevel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#71809D',
    marginLeft: 6,
  },
  profileSince: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#1a2151',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#f0f0f0',
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#1a2151',
    marginLeft: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  inviteCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  inviteContent: {
    padding: 24,
  },
  inviteTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#1a2151',
    marginBottom: 12,
  },
  inviteText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  inviteButton: {
    backgroundColor: '#1a2151',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  inviteButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#F8D9A0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  logoutText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#ff6b6b',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
  },
});
