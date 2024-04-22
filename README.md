#	 Troyanos Alfa

 - ## Daniel Pineda Torres
	 - Lead developer
	 - AI Specialist
 - ## Alan Espinosa Torres
	 - Team leader
	 - Backend Specialist
	 - DataBase Administrator
	 - API developer
 - ## Melissa Ruiz González
	 - Web designer
	 - Lead Visual Design Supervisor
	 - Front-end lead developer
 - ## Antonio Israel Cárdenas Suárez
	 - Visuals Designer
	 - Backend developer
 - ## Viktor Hugo Ramirez Moreno
	 - Design assistant

# Vista general
Heatmaps es una solución para empresas de logística que busca asegurar un entorno más seguro para los camioneros y contribuir a la seguridad vial en general, por medio de un sistema que utiliza servicios en la **nube** como _**MongoDB**, Google Cloud services y GeoCatcher_ en conjunto de la **Inteligencia artificial** "Vertex AI".
## Características

 - Uso de la IA para analizar las noticias más recientes, y conocer la condición en la que se encuentra una cierta ruta de transporte.
 - Escaneo web para la recolección de datos y uso de una base de datos MongoDB para su almacenamiento y procesamiento.
 - Mapa de frecuencias de inciencia delictiva sobre operadores camioneros

# Especificaciones
## API con node.js
La API del proyecto está desarrollada a la medida de acuerdo con las necesidades del proyecto. Basado en el framework **react**, esta api permite la comunicación eficiente entre todos los distintos módulos y arquitecturas que el sistema requiere.
## Base de datos no relacional basada en la nube "MongoDB"
El sistema se conecta directamente con una **base de datos no relacional basada en la nube _MongoDB_**, con el objetivo de tener acceso seguro y eficiente a la información a analizar. El cliente de inteligencia artificial se conecta con la base de datos y obtiene las noticias almacenadas en la misma para la obtención de resultados.

## Inteligencia artificial generativa "VertexAI"
Para implementar el uso de la inteligencia artificial "Vertex AI", el programa utiliza VertexAI API. El sistema inicializa el modelo de procesamiento de texto utilizando una **ID única** de conexión con el servidor, y utiliza un parámetro prompt de tipo String. La IA analiza y retorna la información más relevante en un formato fácil de procesar.

## Renderizado de localizaciones GeoCode
El sistema se conecta a un cliente **GeoCode** para obtener la ubicación que la IA provee, Y devuelve la latitud y longitud del resultado, la cual grafica en el mapa una distribución de densidad de acuerdo con la freuencia de inciencia en una cierta zona.

![FireShot Capture 002 - Heatmaps - ](https://github.com/WeirdCatAFK/Heatmaps2024/assets/131494424/b0d5eeee-f1f5-4806-8a50-dd84e42fabaa)

![image](https://github.com/WeirdCatAFK/Heatmaps2024/assets/131494424/3bbcacc1-9996-44df-a9a7-888b73f5da37)

