import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Users, Lock, Globe, Calendar, MapPin } from 'lucide-react-native';

interface Group {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  isPrivate: boolean;
  admin: {
    name: string;
    avatar: string;
  };
  nextRun?: {
    date: string;
    location: string;
  };
  tags: string[];
}

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Morning Runners NYC',
    description: 'Early morning running group for NYC professionals. We meet at 6:30 AM on weekdays.',
    image: 'https://images.pexels.com/photos/2402927/pexels-photo-2402927.jpeg?auto=compress&cs=tinysrgb&w=400',
    members: 127,
    isPrivate: false,
    admin: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    nextRun: {
      date: 'Tomorrow 6:30 AM',
      location: 'Central Park',
    },
    tags: ['morning', 'weekdays', 'professional'],
  },
  {
    id: '2',
    name: 'Trail Blazers',
    description: 'For serious trail runners who love challenging terrain and mountain adventures.',
    image: 'https://images.pexels.com/photos/1307710/pexels-photo-1307710.jpeg?auto=compress&cs=tinysrgb&w=400',
    members: 89,
    isPrivate: true,
    admin: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    nextRun: {
      date: 'Saturday 8:00 AM',
      location: 'Bear Mountain',
    },
    tags: ['trail', 'advanced', 'weekend'],
  },
  {
    id: '3',
    name: 'Beginner Friendly Runners',
    description: 'Supportive community for new runners. All paces welcome, focus on fun and improvement.',
    image: 'https://images.pexels.com/photos/1556710/pexels-photo-1556710.jpeg?auto=compress&cs=tinysrgb&w=400',
    members: 203,
    isPrivate: false,
    admin: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    nextRun: {
      date: 'Sunday 9:00 AM',
      location: 'Riverside Park',
    },
    tags: ['beginner', 'supportive', 'all-paces'],
  },
  {
    id: '4',
    name: 'Marathon Training Squad',
    description: 'Dedicated group training for upcoming marathons. Structured workouts and long runs.',
    image: 'https://images.pexels.com/photos/2402927/pexels-photo-2402927.jpeg?auto=compress&cs=tinysrgb&w=400',
    members: 64,
    isPrivate: false,
    admin: {
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    nextRun: {
      date: 'Saturday 7:00 AM',
      location: 'Brooklyn Bridge',
    },
    tags: ['marathon', 'training', 'structured'],
  },
];

export default function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [searchQuery, setSearchQuery] = useState('');

  const renderGroup = (group: Group) => (
    <TouchableOpacity key={group.id} style={styles.groupCard}>
      <Image source={{ uri: group.image }} style={styles.groupImage} />
      <View style={styles.groupContent}>
        <View style={styles.groupHeader}>
          <View style={styles.groupTitleContainer}>
            <Text style={styles.groupName}>{group.name}</Text>
            <View style={styles.groupMeta}>
              {group.isPrivate ? (
                <Lock size={12} color="#8e8e93" />
              ) : (
                <Globe size={12} color="#8e8e93" />
              )}
              <Text style={styles.groupType}>
                {group.isPrivate ? 'Private' : 'Public'}
              </Text>
            </View>
          </View>
          <View style={styles.membersContainer}>
            <Users size={16} color="#8e8e93" />
            <Text style={styles.membersText}>{group.members}</Text>
          </View>
        </View>

        <View style={styles.adminInfo}>
          <Image source={{ uri: group.admin.avatar }} style={styles.adminAvatar} />
          <Text style={styles.adminName}>Admin: {group.admin.name}</Text>
        </View>

        <Text style={styles.groupDescription}>{group.description}</Text>

        {group.nextRun && (
          <View style={styles.nextRunContainer}>
            <View style={styles.nextRunHeader}>
              <Calendar size={14} color="#FF6B35" />
              <Text style={styles.nextRunTitle}>Next Run</Text>
            </View>
            <Text style={styles.nextRunDate}>{group.nextRun.date}</Text>
            <View style={styles.nextRunLocation}>
              <MapPin size={12} color="#8e8e93" />
              <Text style={styles.nextRunLocationText}>{group.nextRun.location}</Text>
            </View>
          </View>
        )}

        <View style={styles.tagsContainer}>
          {group.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>
            {group.isPrivate ? 'Request to Join' : 'Join Group'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Groups</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8e8e93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search groups..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8e8e93"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.groupsList}>
          {groups.map(renderGroup)}
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
    color: '#FF6B35',
  },
  createButton: {
    backgroundColor: '#FF6B35',
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
  groupsList: {
    paddingVertical: 10,
  },
  groupCard: {
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
  groupImage: {
    width: '100%',
    height: 120,
  },
  groupContent: {
    padding: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  groupTitleContainer: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  groupType: {
    fontSize: 12,
    color: '#8e8e93',
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  membersText: {
    fontSize: 14,
    color: '#8e8e93',
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  adminAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  adminName: {
    fontSize: 12,
    color: '#8e8e93',
  },
  groupDescription: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 18,
    marginBottom: 12,
  },
  nextRunContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B35',
  },
  nextRunHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  nextRunTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  nextRunDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  nextRunLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nextRunLocationText: {
    fontSize: 12,
    color: '#8e8e93',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
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
  joinButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});