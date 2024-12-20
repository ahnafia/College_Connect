from flask import Flask, request, jsonify
import spacy
import psycopg2

nlp= spacy.load("en_core_web_lg")

def get_db_connection():
    conn = psycopg2.connect(
        dbname= "CollegeConnect",
        user="postgres",
        password="Tanu@1976",
        host="localhost",
        port=5432
    )
    return conn

def similiarity_comparisons(username):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students WHERE username = %s;", (username,))
    user = cursor.fetchone()
    cursor.execute('SELECT * FROM students;')
    student_list = cursor.fetchall()
    cursor.execute('SELECT * FROM Matches;')
    matches_list = cursor.fetchall()
    cursor.close()
    conn.close()
    user_text = nlp(user[2])
    similiar = []
    for student in student_list:
        if student[13] != user[13]:
            student_text = nlp(student[2])
            similarity = user_text.similarity(student_text)
            if similarity > 0.75:
                similiar.append(student)
    return similiar

app = Flask(__name__)

@app.route("/get_similiar/<username>")
def get_similiar(username):
    return similiarity_comparisons(f"{username}")


if __name__ == "__main__":
    app.run(debug=True)
