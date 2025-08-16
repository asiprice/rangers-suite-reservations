import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { Game } from '../types';
import GameCard from './GameCard';

interface GameListProps {
  games: Game[];
  selectedGame: Game | null;
  onGameSelect: (game: Game) => void;
}

const GameList: React.FC<GameListProps> = ({ games, selectedGame, onGameSelect }) => {
  const renderGame = ({ item }: { item: Game }) => (
    <GameCard
      game={item}
      isSelected={selectedGame?.id === item.id}
      onPress={() => onGameSelect(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Games</Text>
      <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003278',
    padding: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default GameList;