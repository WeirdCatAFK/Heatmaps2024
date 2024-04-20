import sqlite3
import vertex

# Connect to the SQLite database
conn = sqlite3.connect('data.db')
cursor = conn.cursor()

# Create the content table if it doesn't exist
cursor.execute('''CREATE TABLE IF NOT EXISTS content
                  (id INTEGER PRIMARY KEY,
                   url TEXT,
                   text TEXT,
                   analisis TEXT)''')


# Commit changes to the database
conn.commit()

# Retrieve data from the content table
cursor.execute('SELECT id, text FROM content')

#Making prompt for vertex ai
prompt = ("El siguiente contenido es de una pagina web necesito que llenes los datos del siguiente json para analizarlo, si no encuentras el dato deja los datos vacios, solo regresa el JSON\r\nCondicion = Esta noticia presenta algun riesgo para un transportista?\r\n    {\r\n      \"ID\": 2,\r\n      \"LUGARES\": [\"Lugar4\", \"Lugar5\"...],\r\n      \"CONDICION\": false,\r\n      \"FECHA\": \"YYYY-MM-DD\",\r\n      \"CIUDADES\": [\"Ciudad1\", \"Ciudad2\"...]\r\n    }\r\n\r\n")


# Iterate over the retrieved rows
for row in cursor.fetchall():
    # Retrieve the text from the row
    text = row[1]
    if text:
    # Generate analisis content
        analisis_content = vertex.interview(prompt + text)
        print(analisis_content)
    else:
        analisis_content = 'unable to generate analisis'
    # Update the analisis column with the generated content
    cursor.execute('UPDATE content SET analisis = ? WHERE id = ?', (analisis_content, row[0]))

# Commit changes to the database
    conn.commit()

conn.commit()
# Close the cursor and connection
cursor.close()
conn.close()
