import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Star, MapPin, Clock, TrendingUp, Users } from 'lucide-react-native';

interface Route {
  id: string;
  name: string;
  creator: {
    name: string;
    avatar: string;
  };
  distance: string;
  elevation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  reviews: number;
  image: string;
  description: string;
  tags: string[];
  runs: number;
}

const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Central Park Loop',
    creator: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    distance: '6.2 km',
    elevation: '45m',
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 324,
    image: 'https://images.pexels.com/photos/2402927/pexels-photo-2402927.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Classic NYC running route with beautiful scenery and well-maintained paths.',
    tags: ['urban', 'scenic', 'beginner-friendly'],
    runs: 1247,
  },
  {
    id: '2',
    name: 'Mountain Trail Challenge',
    creator: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    distance: '12.5 km',
    elevation: '520m',
    difficulty: 'Hard',
    rating: 4.6,
    reviews: 189,
    image: 'https://images.pexels.com/photos/1307710/pexels-photo-1307710.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Challenging mountain trail with stunning views and technical terrain.',
    tags: ['mountain', 'challenging', 'scenic'],
    runs: 567,
  },
  {
    id: '3',
    name: 'Riverside Morning Run',
    creator: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    distance: '8.0 km',
    elevation: '120m',
    difficulty: 'Medium',
    rating: 4.5,
    reviews: 256,
    image: 'https://images.pexels.com/photos/1556710/pexels-photo-1556710.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Peaceful riverside route perfect for morning runs with gentle rolling hills.',
    tags: ['riverside', 'peaceful', 'morning'],
    runs: 892,
  },
];

export default function RoutesScreen() {
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [searchQuery, setSearchQuery] = useState('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#7CB342';
      case 'Medium': return '#FFB74D';
      case 'Hard': return '#E57373';
      default: return '#8e8e93';
    }
  };

  const renderRoute = (route: Route) => (
    <TouchableOpacity key={route.id} style={styles.routeCard}>
      <Image source={{ uri: route.image }} style={styles.routeImage} />
      <View style={styles.routeContent}>
        <View style={styles.routeHeader}>
          <Text style={styles.routeName}>{route.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{route.rating}</Text>
            <Text style={styles.reviews}>({route.reviews})</Text>
          </View>
        </View>

        <View style={styles.creatorInfo}>
          <Image source={{ uri: route.creator.avatar }} style={styles.creatorAvatar} />
          <Text style={styles.creatorName}>by {route.creator.name}</Text>
        </View>

        <Text style={styles.routeDescription}>{route.description}</Text>

        <View style={styles.routeStats}>
          <View style={styles.statItem}>
            <MapPin size={16} color="#8e8e93" />
            <Text style={styles.statText}>{route.distance}</Text>
          </View>
          <View style={styles.statItem}>
            <TrendingUp size={16} color="#8e8e93" />
            <Text style={styles.statText}>{route.elevation}</Text>
          </View>
          <View style={styles.statItem}>
            <Users size={16} color="#8e8e93" />
            <Text style={styles.statText}>{route.runs} runs</Text>
          </View>
        </View>

        <View style={styles.routeFooter}>
          <View style={styles.tagsContainer}>
            {route.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(route.difficulty) }]}>
            <Text style={styles.difficultyText}>{route.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Routes</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8e8e93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search routes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8e8e93"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.routesList}>
          {routes.map(renderRoute)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#43A047',
  },
  createButton: {
    backgroundColor: '#43A047',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  routesList: {
    paddingVertical: 10,
  },
  routeCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  routeImage: {
    width: '100%',
    height: 150,
  },
  routeContent: {
    padding: 16,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  reviews: {
    fontSize: 12,
    color: '#8e8e93',
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  creatorAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  creatorName: {
    fontSize: 12,
    color: '#8e8e93',
  },
  routeDescription: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 18,
    marginBottom: 12,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#8e8e93',
  },
  routeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    color: '#8e8e93',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
});