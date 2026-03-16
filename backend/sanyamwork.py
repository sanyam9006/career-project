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
        self.sia = SentimentIntensityAnalyzer()
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
        sentiment = self.sia.polarity_scores(essay)

        client = get_gemini_client()
        if not client:
            return self._fallback_response(sentiment)

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
                'career_recommendations': data.get('career_recommendations', [])
            }

        except Exception as e:
            print(f"Gemini essay analysis error: {e}")
            return self._fallback_response(sentiment)

    def _fallback_response(self, sentiment):
        return {
            'sentiment': {
                'positive': round(sentiment['pos'], 2),
                'neutral': round(sentiment['neu'], 2),
                'negative': round(sentiment['neg'], 2)
            },
            'top_interests': {"Technology and Engineering": 0.5, "Business and Finance": 0.3},
            'personality_traits': {'analytical': 0.7, 'adaptable': 0.5},
            'career_recommendations': ["Software Developer", "Business Analyst", "Data Scientist", "Financial Analyst", "Project Manager"]
        }

    def generate_recommendations(self, interests: Dict, traits: Dict) -> List:
        """Legacy helper - kept for compatibility."""
        return []