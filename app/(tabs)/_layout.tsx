import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Scissors, Home, User, Award, QrCode, BarChart, Settings, Users } from 'lucide-react-native';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F8D9A0',
        tabBarInactiveTintColor: '#919CDA',
        tabBarStyle: {
          backgroundColor: '#1a2151',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 11,
        },
        headerStyle: {
          backgroundColor: '#1a2151',
        },
        headerTintColor: '#F8D9A0',
        headerTitleStyle: {
          fontFamily: 'Montserrat-SemiBold',
        },
      }}>
      
      {/* Customer Tabs */}
      <Tabs.Screen
        name="customer/home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          href: null, // This line is required to make conditional tabs work
        }}
      />
      <Tabs.Screen
        name="customer/rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => <Award size={24} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="customer/qrcode"
        options={{
          title: 'Check In',
          tabBarIcon: ({ color }) => <QrCode size={24} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="customer/profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          href: null,
        }}
      />
      
      {/* Business Owner Tabs */}
      <Tabs.Screen
        name="business/dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <BarChart size={24} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="business/customers"
        options={{
          title: 'Customers',
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="business/scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <QrCode size={24} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="business/settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
          href: null,
        }}
      />
    </Tabs>
  );
}