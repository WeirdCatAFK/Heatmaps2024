import vertexai
from vertexai.language_models import TextGenerationModel


def interview(
    temperature: float,
    project_id: str, # JSON implementation, needs to 
    location = "us-south1"
    
) -> str:
    """Ideation example with a Large Language Model"""

    vertexai.init(project=project_id, location=location)
    # TODO developer - override these parameters as needed:
    parameters = {
        "temperature": temperature,  # Temperature controls the degree of randomness in token selection. 0-1
        "max_output_tokens": 256,  # Token limit determines the maximum amount of text output.
        "top_p": 0.8,  # Tokens are selected from most probable to least until the sum of their probabilities equals the top_p value.
        "top_k": 40,  # A top_k of 1 means the selected token is the most probable among all tokens.
    }

    model = TextGenerationModel.from_pretrained("text-bison")
    response = model.predict(
        "Dime 2 cosas sobre los pinguinos",
        **parameters,
    )
    print(f"Response from Model: {response.text}") #quitar al iniciar el test

    return response.text

interview(0,"")#ProjectID