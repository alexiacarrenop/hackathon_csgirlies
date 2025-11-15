from http.cookiejar import debug

from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os
from huggingface_hub import interpreter_login, whoami, get_token

load_dotenv()


client = OpenAI(
    base_url = "https://router.huggingface.co/v1",
    api_key = os.environ["HF_TOKEN"]
)
app = Flask(__name__)

@app.get("/generate_puzzles")
def generate_puzzles():
    topic = request.args.get("topic", "general")

    prompt = f"""
    Create 3 educational escape room puzzles about "{topic}".
    Format them as JSON with fields:
    -question
    -answer
    -hint
    Puzzles should be short and increase in difficulty from easy to hard
    """

    response = client.chat.completions.create(

        model = "moonshotai/Kimi-K2-Instruct-0905",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    ai_text = response.choices[0].message.content

    print(ai_text);
    return jsonify({"topic": topic, "puzzles": ai_text})
if __name__ == "__main__":
    app.run(debug=True)
