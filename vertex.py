import vertexai
from vertexai.language_models import CodeGenerationModel

def interview(prompt:str,ProjectID:str):
    vertexai.init(project=ProjectID, location="us-central1")
    parameters = {
    "candidate_count": 1,
    "max_output_tokens": 100,
    "temperature": 0.2
    }
    model = CodeGenerationModel.from_pretrained("code-bison")
    response = model.predict(
        prefix = """dime 2 cosas sobre pinguinos""",
        **parameters
    )   
    print(f"Response from Model: {response.text}")

interview("","") #El projectID va como SEGUNDO argumento de la funcion