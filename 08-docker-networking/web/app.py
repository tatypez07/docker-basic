import time
import requests

time.sleep(5)

response = requests.get("http://db:5000")

print(response.text)