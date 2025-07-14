import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Share2, MoveVertical as MoreVertical, Star } from 'lucide-react-native';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  activity?: {
    distance: string;
    pace: string;
    duration: string;
  };
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: true,
    },
    content: 'Just completed the Central Park loop! Beautiful morning for a run 🌅',
    image: 'https://images.pexels.com/photos/2402927/pexels-photo-2402927.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 24,
    comments: 8,
    timestamp: '2h ago',
    activity: {
      distance: '6.2 km',
      pace: '5:42 /km',
      duration: '35:24',
    },
  },
  {
    id: '2',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: false,
    },
    content: 'New personal best on my 5K! Training is paying off 💪',
    likes: 18,
    comments: 5,
    timestamp: '4h ago',
    activity: {
      distance: '5.0 km',
      pace: '4:58 /km',
      duration: '24:52',
    },
  },
  {
    id: '3',
    user: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      isVerified: true,
    },
    content: 'Trail running in the mountains today. The views were incredible! 🏔️',
    image: 'https://images.pexels.com/photos/1307710/pexels-photo-1307710.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 42,
    comments: 12,
    timestamp: '6h ago',
    activity: {
      distance: '8.5 km',
      pace: '6:15 /km',
      duration: '53:08',
    },
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const renderPost = (post: Post) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{post.user.name}</Text>
            {post.user.isVerified && (
              <Star size={14} color="#FFD700" fill="#FFD700" />
            )}
          </View>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
        <TouchableOpacity>
          <MoreVertical size={20} color="#8e8e93" />
        </TouchableOpacity>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      {post.activity && (
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>Distance</Text>
            <Text style={styles.activityValue}>{post.activity.distance}</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>Pace</Text>
            <Text style={styles.activityValue}>{post.activity.pace}</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>Duration</Text>
            <Text style={styles.activityValue}>{post.activity.duration}</Text>
          </View>
        </View>
      )}

      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(post.id)}
        >
          <Heart size={20} color="#FF6B35" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#8e8e93" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color="#8e8e93" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>RunConnect</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>New Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.feed}>
          {posts.map(renderPost)}
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
  headerButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  feed: {
    paddingVertical: 10,
  },
  postCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  timestamp: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 2,
  },
  postContent: {
    fontSize: 15,
    color: '#1a1a1a',
    lineHeight: 20,
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activityItem: {
    alignItems: 'center',
  },
  activityLabel: {
    fontSize: 12,
    color: '#8e8e93',
    marginBottom: 4,
  },
  activityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#8e8e93',
  },
});