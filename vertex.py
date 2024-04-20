import vertexai, json
from vertexai.language_models import CodeGenerationModel

# Load API keys from JSON file
def GetKey():
    with open('keys/API_Keys.json', 'r') as keys_file:
        keys = json.load(keys_file)
        # Check if the Geocoding key is missing
        if "Google_Vertex" not in keys or not keys["Google_Vertex"]:
            print('Missing Google cloud project id')
    ProjectID = keys["Google_Vertex"]
    print(ProjectID)
    return ProjectID

#Call Vertex AI
def interview(prompt:str): #Prompt must be specific and clear
    ProjectID = GetKey()
    vertexai.init(project=ProjectID, location="us-central1")
    parameters = {
    "candidate_count": 1, #Amount of responses
    "max_output_tokens": 100, #Max length of response
    "temperature": 0.2 #Randomness of result. 0 means less random, 1 means more random and creative
    }
    #wake up the model and prompt it
    model = CodeGenerationModel.from_pretrained("code-bison")
    response = model.predict(
        prefix = prompt,
        **parameters
    )   
    return response.text #Returns a String