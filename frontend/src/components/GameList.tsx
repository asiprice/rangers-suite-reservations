import React from 'react';
import { Game } from '../types';

interface GameListProps {
  games: Game[];
  selectedGame: Game | null;
  onGameSelect: (game: Game) => void;
}

const GameList: React.FC<GameListProps> = ({ games, selectedGame, onGameSelect }) => {
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
    <div className="game-list">
      {games.map((game) => (
        <div
          key={game.id}
          className={`game-card ${selectedGame?.id === game.id ? 'selected' : ''}`}
          onClick={() => onGameSelect(game)}
        >
          <div className="game-header">
            <div className="team-logo">
              <img 
                src={getTeamLogo(game.opponent)} 
                alt={`${game.opponent} logo`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="game-info">
              <h3>{game.opponent}</h3>
              <div className="game-details">
                <span className="game-date">{formatDate(game.date)}</span>
                <span className="game-time">{game.start_time}</span>
              </div>
            </div>
          </div>
          <div className="capacity-summary">
            <span className={`availability ${game.available_spots === 0 ? 'full' : ''}`}>
              {game.available_spots}/{game.suite_capacity} available
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;