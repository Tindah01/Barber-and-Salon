import React, { useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { BarChart2, TrendingUp, Users, Award, Plus, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Chart dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 48; // Adjust for padding
const CHART_HEIGHT = 200;
const BAR_WIDTH = 30;
const BAR_GAP = 20;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const VALUES = [15, 25, 18, 30, 20, 38, 28];
const MAX_VALUE = Math.max(...VALUES) * 1.2; // Add some space on top

export default function BusinessDashboard() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Header opacity based on scroll position
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Business stats
  const stats = [
    { id: '1', label: 'Total Customers', value: '128', icon: Users, change: '+12%', positive: true },
    { id: '2', label: 'Points Awarded', value: '2,450', icon: Award, change: '+8%', positive: true },
    { id: '3', label: 'Rewards Claimed', value: '32', icon: Award, change: '-5%', positive: false },
  ];
  
  // Top customers
  const topCustomers = [
    { id: '1', name: 'Emma Johnson', visits: '12', points: '350' },
    { id: '2', name: 'Michael Chen', visits: '10', points: '280' },
    { id: '3', name: 'Sophia Williams', visits: '8', points: '175' },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.header, 
        { 
          opacity: headerOpacity, 
          transform: [{ 
            translateY: headerOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            })
          }] 
        }
      ]}>
        <Text style={styles.headerTitle}>Business Dashboard</Text>
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
          <Text style={styles.businessName}>Luxury Cuts</Text>
        </View>
        
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <TouchableOpacity key={stat.id} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <stat.icon size={20} color="#1a2151" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={[
                styles.statChangeContainer, 
                { backgroundColor: stat.positive ? 'rgba(75, 192, 192, 0.1)' : 'rgba(255, 99, 132, 0.1)' }
              ]}>
                <TrendingUp 
                  size={12} 
                  color={stat.positive ? '#4bc0c0' : '#ff6384'}
                  style={{ transform: [{ rotate: stat.positive ? '0deg' : '180deg' }] }}
                />
                <Text 
                  style={[
                    styles.statChangeText,
                    { color: stat.positive ? '#4bc0c0' : '#ff6384' }
                  ]}
                >
                  {stat.change}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <BarChart2 size={20} color="#1a2151" />
              <Text style={styles.sectionTitle}>Weekly Visits</Text>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <View style={styles.chartYAxis}>
              <Text style={styles.chartAxisLabel}>{Math.round(MAX_VALUE)}</Text>
              <Text style={styles.chartAxisLabel}>{Math.round(MAX_VALUE/2)}</Text>
              <Text style={styles.chartAxisLabel}>0</Text>
            </View>
            
            <View style={styles.chartContent}>
              {/* Horizontal guide lines */}
              <View style={[styles.horizontalLine, { top: 0 }]} />
              <View style={[styles.horizontalLine, { top: CHART_HEIGHT/2 }]} />
              <View style={[styles.horizontalLine, { top: CHART_HEIGHT }]} />
              
              {/* Bars */}
              <View style={styles.barsContainer}>
                {VALUES.map((value, index) => (
                  <View key={index} style={styles.barGroup}>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.bar, 
                          { 
                            height: (value / MAX_VALUE) * CHART_HEIGHT,
                            backgroundColor: index === 5 ? '#F8D9A0' : '#919CDA' 
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.barLabel}>{DAYS[index]}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        
        <LinearGradient
          colors={['#1a2151', '#2a3172']}
          style={styles.insightsCard}
        >
          <View style={styles.insightsHeader}>
            <TrendingUp size={24} color="#F8D9A0" />
            <Text style={styles.insightsTitle}>Business Insights</Text>
          </View>
          
          <Text style={styles.insightsText}>
            Saturday is your busiest day. Consider offering a special reward for weekday visits to balance customer flow.
          </Text>
          
          <TouchableOpacity style={styles.insightsButton}>
            <Text style={styles.insightsButtonText}>Create Weekday Promo</Text>
          </TouchableOpacity>
        </LinearGradient>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Users size={20} color="#1a2151" />
              <Text style={styles.sectionTitle}>Top Customers</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/business/customers')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.customersList}>
            {topCustomers.map((customer, index) => (
              <View key={customer.id} style={styles.customerItem}>
                <View style={styles.customerRank}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{customer.name}</Text>
                  <View style={styles.customerStats}>
                    <Text style={styles.customerStatText}>{customer.visits} visits</Text>
                    <Text style={styles.customerStatDot}>•</Text>
                    <Text style={styles.customerStatText}>{customer.points} points</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.customerAction}>
                  <ChevronRight size={20} color="#1a2151" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        
        <TouchableOpacity style={styles.actionButton}>
          <Plus size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Create New Reward</Text>
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
  welcomeSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  welcomeText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#666',
  },
  businessName: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    color: '#1a2151',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  statCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#1a2151',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  statChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statChangeText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    marginLeft: 4,
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
  viewAllText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#1a2151',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    height: CHART_HEIGHT + 60, // Add space for labels
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartYAxis: {
    width: 40,
    height: CHART_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  chartAxisLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    color: '#999',
  },
  chartContent: {
    flex: 1,
    height: CHART_HEIGHT,
    position: 'relative',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: CHART_HEIGHT,
    paddingLeft: 10,
  },
  barGroup: {
    alignItems: 'center',
  },
  barContainer: {
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
  },
  bar: {
    width: BAR_WIDTH,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  insightsCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightsTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#F8D9A0',
    marginLeft: 8,
  },
  insightsText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 22,
    marginBottom: 20,
  },
  insightsButton: {
    backgroundColor: '#F8D9A0',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  insightsButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#1a2151',
  },
  customersList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  customerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  customerRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#1a2151',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
    marginBottom: 4,
  },
  customerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerStatText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
  },
  customerStatDot: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#ccc',
    marginHorizontal: 6,
  },
  customerAction: {
    padding: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    backgroundColor: '#1a2151',
    borderRadius: 12,
    padding: 16,
  },
  actionButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
});