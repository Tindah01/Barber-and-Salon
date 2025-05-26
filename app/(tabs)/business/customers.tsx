import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Search, User, Award, ChevronRight, UserPlus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Mock customer data
const CUSTOMERS = [
  { 
    id: '1', 
    name: 'Emma Johnson', 
    visits: 12, 
    points: 350, 
    lastVisit: 'June 10, 2025',
    level: 'Gold',
  },
  { 
    id: '2', 
    name: 'Michael Chen', 
    visits: 10, 
    points: 280, 
    lastVisit: 'June 5, 2025',
    level: 'Gold',
  },
  { 
    id: '3', 
    name: 'Sophia Williams', 
    visits: 8, 
    points: 175, 
    lastVisit: 'June 12, 2025',
    level: 'Silver',
  },
  { 
    id: '4', 
    name: 'James Smith', 
    visits: 6, 
    points: 120, 
    lastVisit: 'May 28, 2025',
    level: 'Silver',
  },
  { 
    id: '5', 
    name: 'Isabella Garcia', 
    visits: 5, 
    points: 100, 
    lastVisit: 'May 20, 2025',
    level: 'Silver',
  },
  { 
    id: '6', 
    name: 'Ethan Wilson', 
    visits: 3, 
    points: 60, 
    lastVisit: 'May 15, 2025',
    level: 'Bronze',
  },
  { 
    id: '7', 
    name: 'Olivia Martinez', 
    visits: 2, 
    points: 40, 
    lastVisit: 'April 30, 2025',
    level: 'Bronze',
  },
];

export default function BusinessCustomers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(CUSTOMERS);
  const [activeFilter, setActiveFilter] = useState('all');
  const scrollY = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
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

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = CUSTOMERS.filter(
        customer => customer.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      applyFilter(activeFilter);
    }
  };

  const applyFilter = (filter) => {
    setActiveFilter(filter);
    
    let filtered = [...CUSTOMERS];
    
    switch(filter) {
      case 'gold':
        filtered = CUSTOMERS.filter(customer => customer.level === 'Gold');
        break;
      case 'silver':
        filtered = CUSTOMERS.filter(customer => customer.level === 'Silver');
        break;
      case 'bronze':
        filtered = CUSTOMERS.filter(customer => customer.level === 'Bronze');
        break;
      case 'recent':
        filtered = [...CUSTOMERS].sort((a, b) => {
          // Simplistic sorting - in a real app would use actual date parsing
          return b.lastVisit.localeCompare(a.lastVisit);
        });
        break;
      case 'all':
      default:
        // No specific filtering needed
        break;
    }
    
    setFilteredCustomers(filtered);
  };

  const renderCustomerItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.customerItem}>
        <View style={styles.customerAvatarContainer}>
          <User size={24} color="#1a2151" />
        </View>
        
        <View style={styles.customerInfo}>
          <View style={styles.customerNameRow}>
            <Text style={styles.customerName}>{item.name}</Text>
            <View style={[
              styles.levelBadge,
              {
                backgroundColor: 
                  item.level === 'Gold' 
                    ? 'rgba(255, 215, 0, 0.2)' 
                    : item.level === 'Silver' 
                      ? 'rgba(192, 192, 192, 0.2)' 
                      : 'rgba(205, 127, 50, 0.2)'
              }
            ]}>
              <Text style={[
                styles.levelText,
                {
                  color: 
                    item.level === 'Gold' 
                      ? '#D4AF37' 
                      : item.level === 'Silver' 
                        ? '#71809D' 
                        : '#CD7F32'
                }
              ]}>
                {item.level}
              </Text>
            </View>
          </View>
          
          <View style={styles.customerStatsRow}>
            <View style={styles.customerStat}>
              <Text style={styles.statLabel}>Visits</Text>
              <Text style={styles.statValue}>{item.visits}</Text>
            </View>
            
            <View style={styles.customerStat}>
              <Text style={styles.statLabel}>Points</Text>
              <Text style={styles.statValue}>{item.points}</Text>
            </View>
            
            <View style={styles.customerStat}>
              <Text style={styles.statLabel}>Last Visit</Text>
              <Text style={styles.statValue}>{item.lastVisit}</Text>
            </View>
          </View>
        </View>
        
        <ChevronRight size={20} color="#1a2151" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.header, 
        { opacity: headerOpacity, transform: [{ translateY: headerOpacity.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 0],
        })}] }
      ]}>
        <Text style={styles.headerTitle}>Customers</Text>
      </Animated.View>
      
      <LinearGradient
        colors={['#1a2151', '#2a3172']}
        style={styles.topSection}
      >
        <Text style={styles.topTitle}>Customer Management</Text>
        <Text style={styles.topSubtitle}>View and manage all your customers</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search customers..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>
      </LinearGradient>
      
      <View style={styles.filtersContainer}>
        <ScrollableFilters 
          activeFilter={activeFilter}
          onFilterPress={applyFilter}
        />
      </View>
      
      <FlatList
        data={filteredCustomers}
        keyExtractor={item => item.id}
        renderItem={renderCustomerItem}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No customers found</Text>
          </View>
        }
      />
      
      <TouchableOpacity style={styles.addButton}>
        <UserPlus size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add Customer</Text>
      </TouchableOpacity>
    </View>
  );
}

function ScrollableFilters({ activeFilter, onFilterPress }) {
  const filters = [
    { id: 'all', label: 'All Customers' },
    { id: 'gold', label: 'Gold Members' },
    { id: 'silver', label: 'Silver Members' },
    { id: 'bronze', label: 'Bronze Members' },
    { id: 'recent', label: 'Recent Visits' },
  ];

  return (
    <View style={styles.filtersScroll}>
      {filters.map(filter => (
        <TouchableOpacity 
          key={filter.id}
          style={[
            styles.filterButton,
            activeFilter === filter.id && styles.activeFilterButton
          ]}
          onPress={() => onFilterPress(filter.id)}
        >
          <Text style={[
            styles.filterText,
            activeFilter === filter.id && styles.activeFilterText
          ]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
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
  topSection: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  topTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#F8D9A0',
    marginBottom: 8,
  },
  topSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginLeft: 12,
    color: '#1a2151',
  },
  filtersContainer: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filtersScroll: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f5f6fa',
  },
  activeFilterButton: {
    backgroundColor: '#1a2151',
  },
  filterText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#666',
  },
  activeFilterText: {
    color: '#F8D9A0',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 100,
  },
  customerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  customerAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(26, 33, 81, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  customerInfo: {
    flex: 1,
  },
  customerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#1a2151',
    marginRight: 8,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  customerStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customerStat: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#1a2151',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2151',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
});