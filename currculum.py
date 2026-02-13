import streamlit as st

# ==========================
# PAGE CONFIG
# ==========================
st.set_page_config(page_title="GenAI Curriculum Generator", layout="wide")

st.title("📚 GenAI Curriculum Generator (Offline)")
st.write("Generate AI-powered curriculum without API keys.")

# ==========================
# INPUT SECTION
# ==========================
st.sidebar.header("Course Details")

subject = st.sidebar.text_input("Enter Subject", "Python Programming")
level = st.sidebar.selectbox("Select Level", ["Beginner", "Intermediate", "Advanced"])
duration = st.sidebar.slider("Course Duration (Weeks)", 1, 12, 4)

generate = st.sidebar.button("Generate Curriculum")

# ==========================
# CURRICULUM LOGIC
# ==========================

def generate_curriculum(subject, level, duration):
    curriculum = ""

    if level == "Beginner":
        topics = [
            "Introduction and Basics",
            "Core Concepts",
            "Simple Projects",
            "Practice & Revision"
        ]
    elif level == "Intermediate":
        topics = [
            "Advanced Concepts",
            "Real-world Applications",
            "Mini Projects",
            "Performance Optimization"
        ]
    else:
        topics = [
            "Expert-Level Topics",
            "Architecture & Design",
            "Industry Case Studies",
            "Capstone Project"
        ]

    week = 1
    for i in range(duration):
        curriculum += f"\n### Week {week}\n"
        curriculum += f"- Topic Focus: {topics[i % len(topics)]}\n"
        curriculum += f"- Learning Objective: Understand key concepts of {subject}\n"
        curriculum += f"- Practical Task: Hands-on exercises\n"
        curriculum += f"- Assignment: Mini project submission\n"
        week += 1

    return curriculum


# ==========================
# OUTPUT SECTION
# ==========================

if generate:
    st.subheader("Generated Curriculum")
    result = generate_curriculum(subject, level, duration)
    st.markdown(result)

    st.success("Curriculum Generated Successfully 🎉")