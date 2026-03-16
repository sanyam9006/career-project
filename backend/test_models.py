import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    print("No API Key found")
else:
    client = genai.Client(api_key=api_key)
    models_to_try = [
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-flash-8b",
        "gemini-1.5-pro",
        "gemini-2.0-flash-lite-preview-02-05"
    ]
    
    for m in models_to_try:
        try:
            print(f"Testing {m}...")
            response = client.models.generate_content(
                model=m,
                contents="hi"
            )
            print(f"SUCCESS with {m}!")
            break
        except Exception as e:
            print(f"FAILED {m}: {e}")
