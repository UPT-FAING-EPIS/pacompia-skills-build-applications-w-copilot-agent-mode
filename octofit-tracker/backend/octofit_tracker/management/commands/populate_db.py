from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from djongo import models

from django.conf import settings
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Teams
        teams = [
            {"name": "Marvel", "description": "Team Marvel"},
            {"name": "DC", "description": "Team DC"},
        ]
        db.teams.insert_many(teams)

        # Users
        users = [
            {"name": "Spider-Man", "email": "spiderman@marvel.com", "team": "Marvel"},
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
        ]
        db.users.insert_many(users)
        db.users.create_index([("email", 1)], unique=True)

        # Activities
        activities = [
            {"user": "Spider-Man", "activity": "Running", "duration": 30},
            {"user": "Iron Man", "activity": "Cycling", "duration": 45},
            {"user": "Wonder Woman", "activity": "Swimming", "duration": 60},
            {"user": "Batman", "activity": "Yoga", "duration": 20},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {"user": "Spider-Man", "points": 100},
            {"user": "Iron Man", "points": 90},
            {"user": "Wonder Woman", "points": 110},
            {"user": "Batman", "points": 95},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {"user": "Spider-Man", "workout": "Push-ups", "reps": 50},
            {"user": "Iron Man", "workout": "Sit-ups", "reps": 40},
            {"user": "Wonder Woman", "workout": "Squats", "reps": 60},
            {"user": "Batman", "workout": "Pull-ups", "reps": 30},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
