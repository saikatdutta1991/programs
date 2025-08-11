import pygame
import time
import random

# Replace with your downloaded song file
SONG_FILE = "song.mp3"

# Configure min and max play time (in seconds)
MIN_PLAY_TIME = 10  # Minimum 10 seconds
MAX_PLAY_TIME = 20  # Maximum 20 seconds

# Initialize pygame mixer
pygame.mixer.init()
pygame.mixer.music.load(SONG_FILE)

def play_music_game():
    while True:
        pygame.mixer.music.play()
        
        # Random duration between MIN_PLAY_TIME and MAX_PLAY_TIME
        play_time = random.uniform(MIN_PLAY_TIME, MAX_PLAY_TIME)
        time.sleep(play_time)
        
        pygame.mixer.music.stop()
        print(f"Music stopped after {play_time:.2f} seconds! Who has the ball?")

        input("Press Enter to continue to the next round...")

play_music_game()