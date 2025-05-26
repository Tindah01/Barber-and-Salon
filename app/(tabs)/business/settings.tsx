import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { 
  Building, Bell, LogOut, ChevronRight, Award, Clock, 
  DollarSign, Smartphone, MessageSquare, Shield, Save 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function BusinessSettings() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [businessName, setBusinessName] = useState('Luxury Cuts');
  const [businessHours, setBusinessHours] = useState('Mon-Fri: 9AM-7PM, Sat: 10AM-5PM');
  const [businessPhone, setBusinessPhone] = useState('(555) 123-4567');
  
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

  const toggleEdit = () => {
    if (isEditing) {
      // Save changes
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.businessIconContainer}>
            <Building size={36} color="#1a2151" />
          </View>
          
          {!isEditing ? (
            <>
              <Text style={styles.businessName}>{businessName}</Text>
              <Text style={styles.businessDetails}>{businessHours}</Text>
              <Text style={styles.businessDetails}>{businessPhone}</Text>
              
              <TouchableOpacity 
                style={styles.editButton}
                onPress={toggleEdit}
              >
                <Text style={styles.editButtonText}>Edit Business Profile</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.editForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Business Name</Text>
                <TextInput
                  style={styles.input}
                  value={businessName}
                  onChangeText={setBusinessName}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Business Hours</Text>
                <TextInput
                  style={styles.input}
                  value={businessHours}
                  onChangeText={setBusinessHours}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={businessPhone}
                  onChangeText={setBusinessPhone}
                  keyboardType="phone-pad"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={toggleEdit}
              >
                <Save size={18} color="#fff" />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Loyalty Program Settings</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Award size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Rewards Management</Text>
              <Text style={styles.menuItemDescription}>Create and edit rewards</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Clock size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Points System</Text>
              <Text style={styles.menuItemDescription}>Configure points values</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <DollarSign size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Promotions</Text>
              <Text style={styles.menuItemDescription}>Special offers and deals</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Notifications</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Bell size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Push Notifications</Text>
              <Text style={styles.menuItemDescription}>Alerts for new rewards</Text>
            </View>
            <Switch
              trackColor={{ false: "#ddd", true: "rgba(26, 33, 81, 0.6)" }}
              thumbColor={notificationsEnabled ? "#1a2151" : "#ccc"}
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </View>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Smartphone size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>SMS Notifications</Text>
              <Text style={styles.menuItemDescription}>Text message alerts</Text>
            </View>
            <Switch
              trackColor={{ false: "#ddd", true: "rgba(26, 33, 81, 0.6)" }}
              thumbColor={smsEnabled ? "#1a2151" : "#ccc"}
              onValueChange={setSmsEnabled}
              value={smsEnabled}
            />
          </View>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <MessageSquare size={20} color="#1a2151" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemText}>Email Templates</Text>
              <Text style={styles.menuItemDescription}>Customize email messages</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Shield size={20} color="#1a2151" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuItemText}>Privacy & Security</Text>
            <Text style={styles.menuItemDescription}>Manage data and permissions</Text>
          </View>
          <ChevronRight size={20} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#ff6b6b" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Business Version 1.0.0</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 24,
  },
  businessIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  businessName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#1a2151',
    marginBottom: 8,
  },
  businessDetails: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  editButton: {
    backgroundColor: '#1a2151',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 16,
  },
  editButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#F8D9A0',
  },
  editForm: {
    width: '85%',
    marginTop: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#1a2151',
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#f5f6fa',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#1a2151',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  saveButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
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
  menuItemDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#999',
    marginTop: 2,
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