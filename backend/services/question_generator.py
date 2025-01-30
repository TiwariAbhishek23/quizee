import openai
import pdfplumber
from config.settings import OPENAI_API_KEY, MAX_PDF_FILE_SIZE, MAX_PDF_PAGES
from fastapi import HTTPException


openai.api_key = OPENAI_API_KEY

def generate_quiz_questions(topic: str, num_questions: int = 5):
    prompt = f"Generate {num_questions} multiple-choice quiz questions on the topic '{topic}'. Each question should have four options and the correct answer should be indicated."
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a helpful quiz generator."},
                  {"role": "user", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]

def get_text_pdf(file_path: str):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        if len(pdf.pages) > MAX_PDF_PAGES:
            raise ValueError(f"PDF file has more than {MAX_PDF_PAGES} pages.")
        for page in pdf.pages:
            text += page.extract_text() + "\n"
            if len(text) > MAX_PDF_FILE_SIZE:
                raise ValueError(f"PDF file is larger than {MAX_PDF_FILE_SIZE} bytes.")

        if len(text.split()) == 0:
            raise HTTPException(status_code=400, detail="PDF file is empty.")
    return text.strip()

def generate_questions_from_pdf(file_path: str, num_questions: int = 5):
    text = get_text_pdf(file_path)
    prompt = f"Generate {num_questions} multiple-choice quiz questions based on the following text:\n\n{text}\n\nEach question should have four options and the correct answer should be indicated."
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a helpful quiz generator."},
                  {"role": "user", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]