function findMatch() {
    const journalText = document.getElementById("journal").value.toLowerCase();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const resultDiv = document.getElementById("result");

    resultDiv.style.display = "block";
    resultDiv.innerHTML = "Analyzing emotional patterns...";

    setTimeout(() => {

        if (
            journalText.includes("suicide") ||
            journalText.includes("suicidal") ||
            journalText.includes("kill myself") ||
            journalText.includes("self harm") ||
            journalText.includes("end my life")
        ) {
            resultDiv.style.background = "#fee2e2";
            resultDiv.innerHTML = `
                <h3 style="color:#b91c1c;">Immediate Support Required</h3>
                <p>Please seek professional help immediately.</p>
                <div style="background:white;padding:12px;border-radius:10px;color:black;">
                    India Mental Health Helpline: 1800-599-0019
                </div>
            `;
            return;
        }

        let userEmotions = [];
        checkboxes.forEach(cb => userEmotions.push(cb.value));

        const sampleUsers = [
            {
                name: "Anonymous_A",
                age: 20,
                bio: "Struggling with anxiety and isolation in college.",
                emotions: ["anxiety", "loneliness"]
            },
            {
                name: "Anonymous_B",
                age: 19,
                bio: "Academic pressure and family expectations.",
                emotions: ["academic", "family"]
            },
            {
                name: "Anonymous_C",
                age: 21,
                bio: "Recovering from a breakup and emotional stress.",
                emotions: ["breakup", "loneliness"]
            }
        ];

        let bestMatch = null;
        let highestScore = 0;

        sampleUsers.forEach(user => {
            let score = user.emotions.filter(e => userEmotions.includes(e)).length;
            if (score > highestScore) {
                highestScore = score;
                bestMatch = user;
            }
        });

        if (bestMatch) {
            let compatibility = Math.round((highestScore / userEmotions.length) * 100);

            resultDiv.style.background = "#d1fae5";
            resultDiv.innerHTML = `
                <h3>Support Match Found</h3>
                <div class="profile-card">
                    <b>${bestMatch.name}</b> (Age ${bestMatch.age})<br>
                    ${bestMatch.bio}
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress"></div>
                    </div>
                    <small>Compatibility: ${compatibility}%</small>
                </div>
            `;

            setTimeout(() => {
                document.getElementById("progress").style.width = compatibility + "%";
            }, 100);

        } else {
            resultDiv.innerHTML = "No close match found, but you are not alone.";
        }

    }, 1200);
}

function toggleTheme() {
    const body = document.body;
    const button = document.querySelector(".theme-toggle");

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        button.textContent = "Dark Mode";
    } else {
        button.textContent = "Light Mode";
    }
}




function openChat() {
    document.getElementById("chatBox").style.display = "block";
}

function sendMessage() {
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    if (input.value.trim() === "") return;

    messages.innerHTML += "<div>User: " + input.value + "</div>";

    setTimeout(() => {
        messages.innerHTML += "<div>AI: I understand how you're feeling. You're not alone.</div>";
        messages.scrollTop = messages.scrollHeight;
    }, 800);

    input.value = "";
}
