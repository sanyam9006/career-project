import sys
from dotenv import load_dotenv
load_dotenv()
from sanyamwork import PersonalityAnalyzer

p = PersonalityAnalyzer()
res1 = p.analyze_career_essay("I love coding and building software applications using python.")
print("Essay 1 Recs:", res1['career_recommendations'])

res2 = p.analyze_career_essay("I want to help people by counseling them and teaching them how to live better.")
print("Essay 2 Recs:", res2['career_recommendations'])
