from django.test import TestCase
from .models import UserProfile, Team, Activity, Leaderboard, Workout

class ModelSmokeTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Test Team", description="desc")
        self.assertEqual(str(team), "Test Team")
    def test_create_user(self):
        user = UserProfile.objects.create(name="Test User", email="test@example.com", team="Test Team")
        self.assertEqual(str(user), "Test User")
    def test_create_activity(self):
        activity = Activity.objects.create(user="Test User", activity="Run", duration=10)
        self.assertEqual(str(activity), "Test User - Run")
    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(user="Test User", points=5)
        self.assertEqual(str(lb), "Test User - 5")
    def test_create_workout(self):
        workout = Workout.objects.create(user="Test User", workout="Push-ups", reps=20)
        self.assertEqual(str(workout), "Test User - Push-ups")
