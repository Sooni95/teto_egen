document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "📞 친구가 늦은 밤 전화를 걸어왔다면?",
      options: [
        { text: "무슨 일인지 걱정돼 바로 받는다", type: "teto" },
        { text: "다음날 연락하려고 그냥 넘긴다", type: "egen" }
      ]
    },
    {
      question: "🧍 처음 보는 사람과 단둘이 엘리베이터에 탔다면?",
      options: [
        { text: "가볍게 인사한다", type: "teto" },
        { text: "휴대폰을 본 척하며 조용히 있는다", type: "egen" }
      ]
    }
    // 전체 질문 이어서 작성 가능
  ];

  let current = 0;
  let scores = { teto: 0, egen: 0 };
  const app = document.getElementById("app");

  function renderQuestion() {
    const q = questions[current];
    app.innerHTML = `
      <div class="question">
        <h2>Q${current + 1}. ${q.question}</h2>
        <div class="options">
          ${q.options.map(opt =>
            `<button onclick="handleAnswer('${opt.type}')">${opt.text}</button>`
          ).join("")}
        </div>
      </div>
    `;
  }

  window.handleAnswer = function (type) {
    scores[type]++;
    current++;
    if (current < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  };

  function showResult() {
    const total = scores.teto + scores.egen;
    const tetoPercent = Math.round((scores.teto / total) * 100);
    const egenPercent = 100 - tetoPercent;
    app.innerHTML = `
      <div class="result">
        <h2>🎯 결과</h2>
        <p>🧸 테토: ${tetoPercent}%</p>
        <p>🐺 에겐: ${egenPercent}%</p>
        <p style="margin-top: 1rem;">
          ${tetoPercent > egenPercent
            ? "당신은 따뜻한 <strong>테토 타입</strong>이에요 🤍"
            : "당신은 시크한 <strong>에겐 타입</strong>이에요 🖤"}
        </p>
      </div>
    `;
  }

  renderQuestion();
});
