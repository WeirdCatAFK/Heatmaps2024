import sqlite3
import json

def sqlite_to_json(database_file, table_name, output_file):
    # Connect to the SQLite database
    conn = sqlite3.connect(database_file)
    cursor = conn.cursor()

    # Select all rows from the specified table
    cursor.execute(f"SELECT * FROM {table_name}")
    rows = cursor.fetchall()

    # Get column names
    cursor.execute(f"PRAGMA table_info({table_name})")
    columns = [col[1] for col in cursor.fetchall()]

    # Convert rows to dictionaries
    data = []
    for row in rows:
        row_dict = {}
        for i, column in enumerate(columns):
            row_dict[column] = row[i]
        data.append(row_dict)

    # Close the database connection
    conn.close()

    # Convert data to JSON
    json_data = json.dumps(data, indent=4)

    # Write JSON data to the output file
    with open(output_file, "w") as f:
        f.write(json_data)

# Example usage:
database_file = "data.db"
table_name = "content"
output_file = "output.json"
sqlite_to_json(database_file, table_name, output_file)
print("Data has been successfully exported to", output_file)
