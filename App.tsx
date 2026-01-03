import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import Orientation from 'react-native-orientation-locker';

// Enable sound playback
Sound.setCategory('Playback');

// Load buzzer sound
const buzzer = new Sound('buzzer.mp3', Sound.MAIN_BUNDLE);

type TeamProps = {
  name: string;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

type ButtonProps = {
  label: string;
  onPress: () => void;
};

export default function App(): JSX.Element {
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);

  const [gameTime, setGameTime] = useState<number>(12 * 60);
  const [shotTime, setShotTime] = useState<number>(24);

  const gameTimer = useRef<NodeJS.Timeout | null>(null);
  const shotTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => Orientation.unlockAllOrientations();
  }, []);

  const playBuzzer = (): void => {
    buzzer.stop(() => buzzer.play());
  };

  // GAME CLOCK
  const startGame = (): void => {
    if (gameTimer.current) return;

    gameTimer.current = setInterval(() => {
      setGameTime(prev => {
        if (prev <= 1) {
          stopGame();
          playBuzzer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopGame = (): void => {
    if (gameTimer.current) {
      clearInterval(gameTimer.current);
      gameTimer.current = null;
    }
  };

  // SHOT CLOCK
  const startShot = (): void => {
    if (shotTimer.current) return;

    shotTimer.current = setInterval(() => {
      setShotTime(prev => {
        if (prev <= 1) {
          stopShot();
          playBuzzer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopShot = (): void => {
    if (shotTimer.current) {
      clearInterval(shotTimer.current);
      shotTimer.current = null;
    }
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreRow}>
        <Team name="HOME" score={homeScore} setScore={setHomeScore} />

        <View style={styles.center}>
          <Text style={styles.gameClock}>{formatTime(gameTime)}</Text>
          <Text style={styles.shotClock}>{shotTime}</Text>
        </View>

        <Team name="AWAY" score={awayScore} setScore={setAwayScore} />
      </View>

      <View style={styles.controls}>
        <ControlButton label="Start Game" onPress={startGame} />
        <ControlButton label="Stop Game" onPress={stopGame} />
        <ControlButton
          label="Reset 12:00"
          onPress={() => setGameTime(12 * 60)}
        />

        <ControlButton label="Start Shot" onPress={startShot} />
        <ControlButton label="Stop Shot" onPress={stopShot} />
        <ControlButton label="Reset 24" onPress={() => setShotTime(24)} />
        <ControlButton label="Reset 14" onPress={() => setShotTime(14)} />
      </View>
    </View>
  );
}

// TEAM COMPONENT
const Team = ({ name, score, setScore }: TeamProps): JSX.Element => (
  <View style={styles.team}>
    <Text style={styles.teamName}>{name}</Text>
    <Text style={styles.score}>{score}</Text>

    <ControlButton label="+1" onPress={() => setScore(score + 1)} />
    <ControlButton
      label="-1"
      onPress={() => score > 0 && setScore(score - 1)}
    />
  </View>
);

// BUTTON COMPONENT
const ControlButton = ({ label, onPress }: ButtonProps): JSX.Element => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  scoreRow: { flex: 1, flexDirection: 'row' },
  team: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  teamName: { color: 'white', fontSize: 24 },
  score: { color: 'white', fontSize: 80 },
  gameClock: { color: 'yellow', fontSize: 60 },
  shotClock: { color: 'red', fontSize: 48 },
  controls: { padding: 10, backgroundColor: '#222' },
  button: {
    backgroundColor: '#444',
    padding: 10,
    margin: 4,
    borderRadius: 4,
  },
  buttonText: { color: 'white' },
});
