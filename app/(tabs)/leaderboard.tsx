import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Medal, Award, Calendar, TrendingUp, Star } from 'lucide-react-native';

interface LeaderboardEntry {
  id: string;
  rank: number;
  user: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  distance: string;
  runs: number;
  avgPace: string;
  points: number;
}

const mockAllTimeLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    user: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: true,
    },
    distance: '2,847 km',
    runs: 234,
    avgPace: '5:12 /km',
    points: 15420,
  },
  {
    id: '2',
    rank: 2,
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: true,
    },
    distance: '2,634 km',
    runs: 198,
    avgPace: '4:58 /km',
    points: 14250,
  },
  {
    id: '3',
    rank: 3,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: true,
    },
    distance: '2,456 km',
    runs: 187,
    avgPace: '5:23 /km',
    points: 13680,
  },
  {
    id: '4',
    rank: 4,
    user: {
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: false,
    },
    distance: '2,123 km',
    runs: 156,
    avgPace: '5:45 /km',
    points: 11890,
  },
  {
    id: '5',
    rank: 5,
    user: {
      name: 'Lisa Wang',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: false,
    },
    distance: '1,987 km',
    runs: 143,
    avgPace: '5:31 /km',
    points: 10950,
  },
];

const mockMonthlyLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: true,
    },
    distance: '387 km',
    runs: 28,
    avgPace: '4:58 /km',
    points: 1890,
  },
  {
    id: '2',
    rank: 2,
    user: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: true,
    },
    distance: '342 km',
    runs: 24,
    avgPace: '5:12 /km',
    points: 1650,
  },
  {
    id: '3',
    rank: 3,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: true,
    },
    distance: '298 km',
    runs: 22,
    avgPace: '5:23 /km',
    points: 1420,
  },
];

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<'all-time' | 'monthly'>('all-time');
  
  const currentLeaderboard = activeTab === 'all-time' ? mockAllTimeLeaderboard : mockMonthlyLeaderboard;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={20} color="#FFD700" />;
      case 2:
        return <Medal size={20} color="#C0C0C0" />;
      case 3:
        return <Award size={20} color="#CD7F32" />;
      default:
        return <Text style={styles.rankNumber}>{rank}</Text>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return styles.firstPlace;
      case 2:
        return styles.secondPlace;
      case 3:
        return styles.thirdPlace;
      default:
        return styles.otherPlace;
    }
  };

  const renderLeaderboardEntry = (entry: LeaderboardEntry) => (
    <TouchableOpacity key={entry.id} style={[styles.entryCard, getRankStyle(entry.rank)]}>
      <View style={styles.entryHeader}>
        <View style={styles.rankContainer}>
          {getRankIcon(entry.rank)}
        </View>
        <Image source={{ uri: entry.user.avatar }} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{entry.user.name}</Text>
            {entry.user.isVerified && (
              <Star size={14} color="#FFD700" fill="#FFD700" />
            )}
          </View>
          <Text style={styles.userPoints}>{entry.points.toLocaleString()} points</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={styles.statValue}>{entry.distance}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Runs</Text>
          <Text style={styles.statValue}>{entry.runs}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Avg Pace</Text>
          <Text style={styles.statValue}>{entry.avgPace}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all-time' && styles.activeTab]}
            onPress={() => setActiveTab('all-time')}
          >
            <TrendingUp size={16} color={activeTab === 'all-time' ? '#ffffff' : '#8e8e93'} />
            <Text style={[styles.tabText, activeTab === 'all-time' && styles.activeTabText]}>
              All Time
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
            onPress={() => setActiveTab('monthly')}
          >
            <Calendar size={16} color={activeTab === 'monthly' ? '#ffffff' : '#8e8e93'} />
            <Text style={[styles.tabText, activeTab === 'monthly' && styles.activeTabText]}>
              This Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.leaderboardList}>
          {currentLeaderboard.map(renderLeaderboardEntry)}
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 21,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8e8e93',
  },
  activeTabText: {
    color: '#ffffff',
  },
  leaderboardList: {
    paddingVertical: 15,
  },
  entryCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginVertical: 6,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  firstPlace: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  secondPlace: {
    borderLeftWidth: 4,
    borderLeftColor: '#C0C0C0',
  },
  thirdPlace: {
    borderLeftWidth: 4,
    borderLeftColor: '#CD7F32',
  },
  otherPlace: {
    borderLeftWidth: 4,
    borderLeftColor: '#e1e5e9',
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  userPoints: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#8e8e93',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});