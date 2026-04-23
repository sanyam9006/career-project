import sys
from app import app
import json

client = app.test_client()

def test_register(password):
    response = client.post('/auth/register', json={
        'username': 'testuser123',
        'email': 'testuser123@example.com',
        'password': password
    })
    print(f"Testing password '{password}':")
    print(response.get_json())
    print()

test_register("short")
test_register("no_numbers_here!")
test_register("nospecialchars123")
test_register("ValidP@ssw0rd")
