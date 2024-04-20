from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

# Function to fetch data from SQLite database and convert to JSON
def fetch_data():
    conn = sqlite3.connect('data.db')  # Replace 'your_database.db' with your actual SQLite database file
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM dataset')
    data = cursor.fetchall()
    conn.close()

    # Convert data to a list of dictionaries
    json_data = []
    for row in data:
        json_data.append({
            'id': row[0],
            'Lugar': row[1],
            'Coordenadas': row[2],
            'newsUrls': row[3],
            'nVecesAparece': row[4]
        })

    return json_data

@app.route('/', methods=['GET'])
def get_data():
    response.headers.add('Access-Control-Allow-Origin', '*')
    data = fetch_data()
    response = jsonify(data)
    return response

if __name__ == '__main__':
    app.run(debug=True)
