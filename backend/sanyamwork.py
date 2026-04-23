# -*- coding: utf-8 -*-
# NLP CAREER COUNSELING MODULE - SANYAM JAIN (Updated for new Google Gen AI SDK)

from google import genai
from google.genai import types
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from typing import Dict, List
import json
import os

# Download required NLTK data if not present
try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)

# Create the Gemini client once (singleton for performance)
_gemini_client = None

def get_gemini_client():
    global _gemini_client
    if _gemini_client is None:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            print("WARNING: GEMINI_API_KEY not set.")
            return None
        _gemini_client = genai.Client(api_key=api_key)
    return _gemini_client


class PersonalityAnalyzer:
    """NLP-based personality and interest analyzer using Google Gemini."""

    def __init__(self):
        try:
            self.sia = SentimentIntensityAnalyzer()
        except LookupError:
            self.sia = None
        self.career_categories = [
            "Technology and Engineering", "Healthcare and Medicine", "Business and Finance",
            "Arts and Design", "Education and Teaching", "Science and Research",
            "Law and Public Service", "Media and Communication", "Social Work and Counseling"
        ]
        self.personality_traits = [
            "analytical", "creative", "social", "leadership", "detail_oriented", "adaptable"
        ]

    def analyze_career_essay(self, essay: str) -> Dict:
        """Complete analysis of career essay using Gemini LLM."""
        if not essay or not essay.strip():
            raise ValueError("Essay text cannot be empty.")

        # Keep local sentiment analysis (fast & free)
        if self.sia:
            sentiment = self.sia.polarity_scores(essay)
        else:
            sentiment = {'pos': 0.0, 'neu': 1.0, 'neg': 0.0}

        client = get_gemini_client()
        if not client:
             print("Using fallback analysis (GEMINI_API_KEY missing)")
             return self._fallback_response(sentiment, essay)

        try:
            prompt = f"""Analyze this career-planning essay and return ONLY a JSON object (no markdown, no backticks, just raw JSON) with these three keys:
1. "top_interests": object mapping 2-3 career categories to confidence scores (0.0-1.0). Valid categories: {', '.join(self.career_categories)}
2. "personality_traits": object mapping 3-4 traits to confidence scores (0.0-1.0). Example traits: {', '.join(self.personality_traits)}
3. "career_recommendations": array of exactly 5 specific job titles that best match the user's profile.

Essay: "{essay}"

Respond with ONLY the raw JSON object, no explanation."""

            response = client.models.generate_content(
                model="gemini-1.5-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=1024,
                    response_mime_type="application/json"
                )
            )

            raw = response.text.strip()
            # Clean any accidental markdown fences
            if raw.startswith("```"):
                raw = raw.split("```")[1]
                if raw.startswith("json"):
                    raw = raw[4:]
                raw = raw.strip()

            data = json.loads(raw)
            return {
                'sentiment': {
                    'positive': round(sentiment['pos'], 2),
                    'neutral': round(sentiment['neu'], 2),
                    'negative': round(sentiment['neg'], 2)
                },
                'top_interests': data.get('top_interests', {}),
                'personality_traits': data.get('personality_traits', {}),
                'career_recommendations': data.get('career_recommendations', []),
                'source': 'ai'
            }
        except Exception as e:
            print(f"Gemini API Error: {e}. Using fallback.")
            return self._fallback_response(sentiment, essay)

    def _fallback_response(self, sentiment, essay=""):
        """High-quality simulated analysis fallback"""
        essay_lower = essay.lower()
        
        # Determine likely interests based on keywords
        fallback_interests = {"Technology and Engineering": 0.5, "Media and Communication": 0.4}
        fallback_recs = ["Marketing Specialist", "Event Planner", "HR Coordinator", "Sales Representative", "Operations Analyst"]

        if any(w in essay_lower for w in ['code', 'build', 'tech', 'software', 'compute']):
            fallback_interests = {"Technology and Engineering": 0.9, "Science and Research": 0.7}
            fallback_recs = ["Software Developer", "Digital Architect", "Data Scientist", "Cloud Engineer", "Systems Analyst"]
        elif any(w in essay_lower for w in ['art', 'design', 'creative', 'paint', 'sketch']):
            fallback_interests = {"Arts and Design": 0.9, "Media and Communication": 0.6}
            fallback_recs = ["Graphic Designer", "UI/UX Designer", "Art Director", "Illustrator", "Animator"]
        elif any(w in essay_lower for w in ['help', 'people', 'social', 'counsel', 'teach']):
            fallback_interests = {"Social Work and Counseling": 0.9, "Education and Teaching": 0.7}
            fallback_recs = ["Social Worker", "Teacher", "Counselor", "HR Manager", "Community Outreach Coordinator"]
        elif any(w in essay_lower for w in ['business', 'money', 'finance', 'market', 'lead']):
            fallback_interests = {"Business and Finance": 0.9, "Law and Public Service": 0.6}
            fallback_recs = ["Financial Analyst", "Business Consultant", "Investment Banker", "Project Manager", "Accountant"]

        return {
            'sentiment': {
                'positive': round(sentiment['pos'], 2),
                'neutral': round(sentiment['neu'], 2),
                'negative': round(sentiment['neg'], 2)
            },
            'top_interests': fallback_interests,
            'personality_traits': {
                'analytical': 0.8 if 'solve' in essay_lower or 'logic' in essay_lower else 0.5,
                'creative': 0.8 if 'create' in essay_lower or 'art' in essay_lower else 0.5,
                'social': 0.8 if 'help' in essay_lower or 'people' in essay_lower else 0.4,
                'leadership': 0.8 if 'lead' in essay_lower or 'manage' in essay_lower else 0.4
            },
            'career_recommendations': fallback_recs,
            'source': 'simulated'
        }

    def generate_recommendations(self, interests: Dict, traits: Dict) -> List:
        """Legacy helper - kept for compatibility."""
        return []