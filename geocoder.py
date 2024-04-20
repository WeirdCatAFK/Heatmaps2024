import json, requests, time
from urllib.parse import quote


def encode_url(url):
    encoded_url = quote(url)
    return encoded_url


def get_location(query):
    # Load API keys from JSON file
    with open('keys\Api_Keys.JSON', 'r') as keys_file:
        keys = json.load(keys_file)

        # Check if the Geocoding key is missing
        if "Geocoding" not in keys or not keys["Geocoding"]:
            print('Missing Geocoding API key')
            return None

    # Construct the Geocoding API endpoint URL
    geocoder_endpoint = "https://geocode.maps.co/search"
    api_key = keys["Geocoding"]
    query = encode_url(query)

    # Construct the complete URL with the query and API key
    url = f"{geocoder_endpoint}?q={query}&api_key={api_key}"

    # Make the request
    response = requests.get(url)
    time.sleep(2)
    # Check the response
    if response.status_code == 200:
        data = response.json()
        if data:
            # Extract latitude and longitude
            lat = data[0].get('lat')
            lon = data[0].get('lon')
            return lat, lon
        else:
            print("No location found for the query.")
            return None
    else:
        print("Error:", response.status_code)
        return None

