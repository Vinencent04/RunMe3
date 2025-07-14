import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, CreditCard as Edit3, Star, MapPin, Calendar, Award, TrendingUp, Users, Heart } from 'lucide-react-native';

interface UserStats {
  totalDistance: string;
  totalRuns: number;
  avgPace: string;
  totalTime: string;
  monthlyDistance: string;
  monthlyRuns: number;
  bestPace: string;
  longestRun: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlockedAt: string;
}

const mockUserStats: UserStats = {
  totalDistance: '2,456 km',
  totalRuns: 187,
  avgPace: '5:23 /km',
  totalTime: '220h 45m',
  monthlyDistance: '298 km',
  monthlyRuns: 22,
  bestPace: '4:32 /km',
  longestRun: '42.2 km',
};

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Marathon',
    description: 'Completed your first marathon distance',
    icon: <Award size={20} color="#FFD700" />,
    unlockedAt: '2 months ago',
  },
  {
    id: '2',
    title: 'Consistency Champion',
    description: 'Ran for 30 consecutive days',
    icon: <Calendar size={20} color="#7CB342" />,
    unlockedAt: '3 weeks ago',
  },
  {
    id: '3',
    title: 'Speed Demon',
    description: 'Achieved sub-5 minute kilometer pace',
    icon: <TrendingUp size={20} color="#FF6B35" />,
    unlockedAt: '1 week ago',
  },
  {
    id: '4',
    title: 'Community Builder',
    description: 'Created 5 successful running groups',
    icon: <Users size={20} color="#4A90E2" />,
    unlockedAt: '5 days ago',
  },
];

export default function ProfileScreen() {
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats');

  const renderStatCard = (title: string, value: string, icon: React.ReactNode) => (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const renderAchievement = (achievement: Achievement) => (
    <View key={achievement.id} style={styles.achievementCard}>
      <View style={styles.achievementIcon}>{achievement.icon}</View>
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        <Text style={styles.achievementDate}>Unlocked {achievement.unlockedAt}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={20} color="#8e8e93" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>Sarah Johnson</Text>
                <Star size={16} color="#FFD700" fill="#FFD700" />
              </View>
              <View style={styles.locationContainer}>
                <MapPin size={14} color="#8e8e93" />
                <Text style={styles.location}>New York, NY</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>4.9</Text>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={12} color="#FFD700" fill="#FFD700" />
                  ))}
                </View>
                <Text style={styles.ratingCount}>(127 reviews)</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={18} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Route Creator</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Verified Runner</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
            onPress={() => setActiveTab('stats')}
          >
            <TrendingUp size={16} color={activeTab === 'stats' ? '#ffffff' : '#8e8e93'} />
            <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>
              Statistics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
            onPress={() => setActiveTab('achievements')}
          >
            <Award size={16} color={activeTab === 'achievements' ? '#ffffff' : '#8e8e93'} />
            <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>
              Achievements
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'stats' ? (
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Overall Statistics</Text>
            <View style={styles.statsGrid}>
              {renderStatCard('Total Distance', userStats.totalDistance, <MapPin size={20} color="#FF6B35" />)}
              {renderStatCard('Total Runs', userStats.totalRuns.toString(), <TrendingUp size={20} color="#7CB342" />)}
              {renderStatCard('Average Pace', userStats.avgPace, <TrendingUp size={20} color="#4A90E2" />)}
              {renderStatCard('Total Time', userStats.totalTime, <Calendar size={20} color="#9C27B0" />)}
            </View>

            <Text style={styles.sectionTitle}>This Month</Text>
            <View style={styles.statsGrid}>
              {renderStatCard('Monthly Distance', userStats.monthlyDistance, <MapPin size={20} color="#FF6B35" />)}
              {renderStatCard('Monthly Runs', userStats.monthlyRuns.toString(), <TrendingUp size={20} color="#7CB342" />)}
              {renderStatCard('Best Pace', userStats.bestPace, <TrendingUp size={20} color="#4A90E2" />)}
              {renderStatCard('Longest Run', userStats.longestRun, <Award size={20} color="#9C27B0" />)}
            </View>
          </View>
        ) : (
          <View style={styles.achievementsContainer}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <View style={styles.achievementsList}>
              {achievements.map(renderAchievement)}
            </View>
          </View>
        )}
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
    color: '#FF6B35',
  },
  settingsButton: {
    padding: 4,
  },
  profileSection: {
    backgroundColor: '#ffffff',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  location: {
    fontSize: 14,
    color: '#8e8e93',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingCount: {
    fontSize: 12,
    color: '#8e8e93',
  },
  editButton: {
    padding: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  badgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  statsContainer: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#8e8e93',
    textAlign: 'center',
  },
  achievementsContainer: {
    paddingHorizontal: 15,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#8e8e93',
  },
});