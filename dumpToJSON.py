import sqlite3
import json

# Connect to the SQLite database
conn = sqlite3.connect('data.db')  # Replace 'your_database_name.db' with your actual database filename
cursor = conn.cursor()

# Fetch all rows from the dataset table
cursor.execute('SELECT * FROM dataset')
rows = cursor.fetchall()

# Convert rows to a list of dictionaries
data = []
for row in rows:
    row_dict = {
        "id": row[0],
        "Lugar": row[1],
        "Coordenadas": row[2],
        "newsUrls": row[3],
        "nVecesAparece": row[4]
    }
    data.append(row_dict)

# Close the database connection
conn.close()

# Write data to a JSON file
with open('dataset.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Data dumped to dataset.json successfully.")
