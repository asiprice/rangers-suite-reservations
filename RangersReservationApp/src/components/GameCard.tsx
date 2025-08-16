import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  isSelected: boolean;
  onPress: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isSelected, onPress }) => {
  const getTeamLogo = (opponent: string) => {
    const teamLogos: { [key: string]: string } = {
      'Cleveland Guardians': 'https://www.mlbstatic.com/team-logos/114.svg',
      'Los Angeles Angels': 'https://www.mlbstatic.com/team-logos/108.svg',
      'Houston Astros': 'https://www.mlbstatic.com/team-logos/117.svg',
      'Milwaukee Brewers': 'https://www.mlbstatic.com/team-logos/158.svg',
      'Miami Marlins': 'https://www.mlbstatic.com/team-logos/146.svg',
      'Minnesota Twins': 'https://www.mlbstatic.com/team-logos/142.svg'
    };
    return teamLogos[opponent] || '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: getTeamLogo(game.opponent) }}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.gameInfo}>
          <Text style={styles.opponent}>{game.opponent}</Text>
          <Text style={styles.date}>{formatDate(game.date)}</Text>
          <Text style={styles.time}>{game.start_time}</Text>
        </View>
      </View>
      
      <View style={styles.capacity}>
        <Text style={[
          styles.availability,
          game.available_spots === 0 && styles.full
        ]}>
          {game.available_spots}/{game.suite_capacity} available
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedCard: {
    borderColor: '#003278',
    backgroundColor: '#f8f9ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  gameInfo: {
    flex: 1,
  },
  opponent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003278',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003278',
  },
  capacity: {
    alignItems: 'flex-end',
  },
  availability: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#e8f5e8',
    color: '#2d7d32',
  },
  full: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
});

export default GameCard;