import newsSearcher
import webScrapper
import os
import vertex, sqlite3


def main():
    """
    newsSearcher.set_DriverPath(
        r"C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
    )  # Tu path de tu ejecutable de brave
    webScrapper.set_DriverPath(
        r"C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
    )  # Tu path de tu ejecutable de brave

    textbase = "text.db"  # El nombre de tu base de datos de salida
    if not os.path.exists(textbase):
        with open(textbase, "w"):
            pass
    print(f"textbase {textbase} created successfully")

    # Create the table where we will store our content
    webScrapper.createDB(textbase, "content")
    newsSearcher.createDB(textbase, "searchResults")
    # Determine our queries
    search_queries = [
        "Asalto a camiones en",
    ]

    # Initialize an empty list to store all news
    all_the_news = []

    # Batch size for fetching news URLs
    batch_size = 5

    # Fetch news URLs for each query and process them in batches
    for query in search_queries:
        # Fetch news URLs for the current query
        news_urls = newsSearcher.getSearchResults(query)

        # Write the current batch of news URLs to the textbase
        newsSearcher.inserttextIntotextbase(textbase, "searchResults", news_urls)

    news = []
    for entry in newsSearcher.getResultsFromtextbase(textbase, "searchResults"):
        news.append(entry[1])

    for i, entry in enumerate(news):
        print(f'Getting content from  entry no {i} ')
            # Fetch and write the content of the current news URL to the textbase
        webScrapper.writeTextToDB(
            textbase, "content", str(entry), webScrapper.getHtmlText(entry)
        )

        # Close textbase connection after processing each batch
        webScrapper.getContentFromDB(textbase, "content")
    # Confirm that the text is in the textbase
    urls = newsSearcher.getResultsFromtextbase(textbase, "searchResults")
    print("Total news URLs retrieved:", len(urls))
    """

    import sqlite3

    def create_analysis(prompt: str):
        try:
            conn = sqlite3.connect("data.db")
            cursor = conn.cursor()

            cursor.execute("SELECT COUNT(*) FROM content")
            num_entries = cursor.fetchone()[0]

            for i in range(
                1, num_entries + 1
            ):  # Start from 1 and use <= to include num_entries
                cursor.execute("SELECT text, analisis FROM content WHERE id=?", (i,))
                entry = cursor.fetchone()

                if entry:
                    text, analysis = entry
                    if text and not analysis:
                        # Use parameterized query to avoid SQL injection
                        analysis_result = vertex.interview(prompt + text + f'id ={i}')
                        cursor.execute(
                            "UPDATE content SET analisis=? WHERE id=?",
                            (analysis_result, i),
                        )
                        print(analysis_result)

            conn.commit()
            print("Analysis created successfully!")

        except sqlite3.Error as e:
            print("Error creating analysis:", e)
            conn.rollback()
        finally:
            try:
                conn.close()
            except NameError:  # Handle case where conn is not defined
                pass

    prompt = 'El siguiente contenido es de una pagina web necesito que llenes los datos del siguiente json para analizarlo, solo regresa el JSON\r\nCondicion = Esta noticia presenta algun riesgo para un transportista?, o algun riesgo en general para las personas que recorran estos lugares\r\n    {\r\n      "ID":\'\'\'\'\'\r\n      "LUGARES": ["Lugar4", "Lugar5"...],\r\n      "CONDICION": false,\r\n      "FECHA": "YYYY-MM-DD",\r\n      "CIUDADES": ["Ciudad1", "Ciudad2"...]\r\n    }\r\n\r\n'
    create_analysis(prompt)


if __name__ == "__main__":
    main()
