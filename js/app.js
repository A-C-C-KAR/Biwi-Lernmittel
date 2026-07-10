        const app = {
            state: {
                view: 'dashboard',
                learnedQuestions: JSON.parse(localStorage.getItem('paed_learned') || '[]'),
                currentFocusIndex: 0,
                isFocusAnswerVisible: false,
                isDarkMode: localStorage.getItem('paed_theme') === 'dark',

                // Klausur State
                examActive: false,
                examTimerSeconds: 0,
                examInterval: null,
                currentExamQuestions: [],
                examAnswers: {}
            },

            getTotalQuestions() { return categories.reduce((sum, cat) => sum + cat.questions.length, 0); },

            // Holt sich alle Fragen als flache Liste, um daraus zufällige ziehen zu können
            getAllQuestionsFlat() { return categories.flatMap(c => c.questions.map(q => ({...q, category: c.title}))); },

            init() {
                document.getElementById('lbl-total-q').textContent = this.getTotalQuestions();
                document.getElementById('lbl-total-c').textContent = categories.length;

                this.applyTheme();
                this.renderCategories();
                this.updateCharts();
                this.updateUI();
            },

            setView(viewName) {
                if (this.state.examActive && viewName !== 'exam') {
                    if(!confirm("Klausur läuft! Wenn du die Ansicht wechselst, wird die Klausur abgebrochen. Wirklich verlassen?")) {
                        return;
                    } else {
                        this.finishExam(true); // Abbruch
                    }
                }

                this.state.view = viewName;

                ['dashboard', 'updates', 'learn', 'focus', 'exam'].forEach(v => {
                    // Update Desktop nav
                    const el = document.getElementById(`nav-${v}`);
                    // Update Mobile nav
                    const elMobile = document.getElementById(`nav-${v}-mobile`);
                    const container = document.getElementById(`view-${v}`);

                    if (v === viewName) {
                        if(el) {
                            el.classList.add('bg-stone-100');
                            if(v === 'exam') el.classList.add('text-red-700', 'bg-red-50');
                            else el.classList.add('text-emerald-700', 'bg-emerald-50');
                        }
                        if(elMobile) {
                            elMobile.classList.add('bg-stone-50');
                            if(v === 'exam') elMobile.classList.add('text-red-700');
                            else elMobile.classList.add('text-emerald-700');
                        }
                        if(container) container.classList.remove('hidden');

                        if(v === 'focus') this.renderFocusCard();
                        if(v === 'dashboard') this.updateCharts();
                    } else {
                        if(el) {
                            el.classList.remove('bg-stone-100', 'text-emerald-700', 'bg-emerald-50', 'text-red-700', 'bg-red-50');
                            el.classList.add('text-stone-600');
                        }
                        if(elMobile) {
                            elMobile.classList.remove('bg-stone-50', 'text-emerald-700', 'text-red-700');
                            elMobile.classList.add('text-stone-600');
                        }
                        if(container) container.classList.add('hidden');
                    }
                });

                // Scroll to top when changing view
                window.scrollTo({top: 0, behavior: 'smooth'});
            },

            toggleMobileMenu(forceClose = false) {
                const menu = document.getElementById('mobile-menu');
                if (forceClose || !menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                } else {
                    menu.classList.remove('hidden');
                }
            },

            toggleDarkMode() {
                this.state.isDarkMode = !this.state.isDarkMode;
                localStorage.setItem('paed_theme', this.state.isDarkMode ? 'dark' : 'light');
                this.applyTheme();
                this.updateCharts(); // Re-render charts to match theme
            },

            applyTheme() {
                const html = document.documentElement;
                const sunIcon = document.getElementById('icon-sun');
                const moonIcon = document.getElementById('icon-moon');
                const sunIconMobile = document.getElementById('icon-sun-mobile');
                const moonIconMobile = document.getElementById('icon-moon-mobile');

                if (this.state.isDarkMode) {
                    html.classList.add('dark');
                    if(sunIcon) sunIcon.classList.remove('hidden');
                    if(moonIcon) moonIcon.classList.add('hidden');
                    if(sunIconMobile) sunIconMobile.classList.remove('hidden');
                    if(moonIconMobile) moonIconMobile.classList.add('hidden');
                } else {
                    html.classList.remove('dark');
                    if(sunIcon) sunIcon.classList.add('hidden');
                    if(moonIcon) moonIcon.classList.remove('hidden');
                    if(sunIconMobile) sunIconMobile.classList.add('hidden');
                    if(moonIconMobile) moonIconMobile.classList.remove('hidden');
                }
            },

            resetProgress() {
                if(confirm("Möchtest du deinen gesamten Lernfortschritt wirklich zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.")) {
                    this.state.learnedQuestions = [];
                    this.saveState();
                    this.updateCharts();
                    this.updateUI();
                    this.renderCategories();
                    alert("Lernfortschritt erfolgreich zurückgesetzt.");
                }
            },

            // --- Klausur Logik ---

            startExam() {
                const minutes = parseInt(document.getElementById('exam-time-input').value) || 90;
                let questionCount = parseInt(document.getElementById('exam-question-count').value) || 3;

                // Sicherheitshalber nicht mehr Fragen abfragen, als existieren
                const maxQuestions = this.getTotalQuestions();
                if (questionCount > maxQuestions) questionCount = maxQuestions;

                this.state.examTimerSeconds = minutes * 60;
                this.state.examActive = true;
                this.state.examAnswers = {};

                // ZUFÄLLIGE FRAGEN AUS DEM NORMALEN POOL ZIEHEN
                const allQuestions = this.getAllQuestionsFlat();
                const shuffledPool = [...allQuestions].sort(() => 0.5 - Math.random());

                // Die ausgewählten Fragen für die Klausur aufbereiten
                this.state.currentExamQuestions = shuffledPool.slice(0, questionCount).map(q => ({
                    id: 'k_' + q.id,
                    type: 'open',
                    question: q.q,
                    solutionText: q.a,
                    category: q.category
                }));

                // UI umstellen
                document.getElementById('exam-setup').classList.add('hidden');
                document.getElementById('exam-results').classList.add('hidden');
                document.getElementById('exam-active').classList.remove('hidden');

                document.getElementById('nav-links').classList.add('pointer-events-none', 'opacity-30');
                document.getElementById('exam-timer-bar').classList.remove('hidden');

                this.renderExamQuestions();
                this.updateTimerDisplay();

                clearInterval(this.state.examInterval);
                this.state.examInterval = setInterval(() => {
                    this.state.examTimerSeconds--;
                    this.updateTimerDisplay();

                    if(this.state.examTimerSeconds <= 0) {
                        alert("Die Zeit ist abgelaufen! Die Klausur wird nun automatisch abgegeben.");
                        this.finishExam();
                    }
                }, 1000);
            },

            updateTimerDisplay() {
                const h = Math.floor(this.state.examTimerSeconds / 3600);
                const m = Math.floor((this.state.examTimerSeconds % 3600) / 60);
                const s = this.state.examTimerSeconds % 60;
                let timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                if (h > 0) timeStr = `${h}:${timeStr}`;
                document.getElementById('exam-timer-display').textContent = timeStr;
            },

            renderExamQuestions() {
                const container = document.getElementById('exam-questions-container');
                container.innerHTML = '';

                this.state.currentExamQuestions.forEach((q, index) => {
                    let html = `
                        <div class="bg-white p-6 rounded-xl border border-stone-200 shadow-sm" id="q-container-${q.id}">
                            <div class="flex items-start mb-4">
                                <span class="bg-stone-800 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full mr-4 flex-shrink-0">${index + 1}</span>
                                <div>
                                    <span class="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">${q.category.replace(/^\d+\.\s*/, '')}</span>
                                    <h3 class="text-lg font-bold text-stone-800 leading-relaxed">${q.question}</h3>
                                </div>
                            </div>

                            <div class="ml-12 mt-4">
                                <div class="bg-blue-50 text-blue-800 text-sm p-3 rounded mb-3 border border-blue-200">
                                    ℹ️ Die eigentliche Beantwortung dieser Frage erfolgt extern auf Papier oder digital. Dieses Feld hier dient nur für deine kurzen Konzept-Notizen.
                                    Gebe deine Texte einfach deine:r Tutor:in ab. (Natürlich mit Aufgabenstellung ;) )
                                </div>
                                <textarea id="ans_${q.id}" class="w-full h-24 p-3 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-stone-800" placeholder="Kurze Stichpunkte / Konzept (Optional)"></textarea>
                            </div>
                        </div>
                    `;
                    container.innerHTML += html;
                });
            },

            finishExam(aborted = false) {
                clearInterval(this.state.examInterval);
                this.state.examActive = false;

                document.getElementById('nav-links').classList.remove('pointer-events-none', 'opacity-30');
                document.getElementById('exam-timer-bar').classList.add('hidden');

                if(aborted) {
                    this.resetExam();
                    return;
                }

                // Antworten (Notizen) einsammeln
                this.state.currentExamQuestions.forEach(q => {
                    const el = document.getElementById(`ans_${q.id}`);
                    this.state.examAnswers[q.id] = el ? el.value : '';
                });

                document.getElementById('exam-active').classList.add('hidden');
                document.getElementById('exam-results').classList.remove('hidden');

                this.renderExamResults();
                window.scrollTo(0, 0);
            },

            renderExamResults() {
                const container = document.getElementById('exam-results-container');
                container.innerHTML = '';

                this.state.currentExamQuestions.forEach((q, index) => {
                    const userAnswer = this.state.examAnswers[q.id] || "Keine Notizen gemacht.";
                    let html = `
                        <div class="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <h3 class="text-lg font-bold text-stone-800 mb-4">Aufgabe ${index + 1}: ${q.question}</h3>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 class="font-bold text-stone-600 border-b border-stone-200 pb-2 mb-3">Deine Notizen:</h4>
                                    <div class="bg-stone-50 p-4 rounded border border-stone-200 text-stone-700 whitespace-pre-wrap">${userAnswer}</div>
                                </div>
                                <div>
                                    <h4 class="font-bold text-emerald-700 border-b border-emerald-200 pb-2 mb-3">Musterlösung aus dem Katalog:</h4>
                                    <div class="bg-emerald-50 p-4 rounded border border-emerald-200 text-emerald-800 whitespace-pre-wrap">${q.solutionText}</div>
                                </div>
                            </div>
                        </div>
                    `;
                    container.innerHTML += html;
                });
            },

            resetExam() {
                document.getElementById('exam-setup').classList.remove('hidden');
                document.getElementById('exam-active').classList.add('hidden');
                document.getElementById('exam-results').classList.add('hidden');
                this.setView('dashboard');
            },

            exportExamToClipboard() {
                let exportText = "KLAUSUR - ALLGEMEINE PÄDAGOGIK\n";
                exportText += "===================================\n\n";

                this.state.currentExamQuestions.forEach((q, index) => {
                    exportText += `Aufgabe ${index + 1}: ${q.question}\n`;
                    exportText += `-----------------------------------\n`;

                    const userAnswer = this.state.examAnswers[q.id] || "Keine Notizen gemacht.";
                    exportText += `Meine Notizen:\n${userAnswer}\n\n`;
                });

                exportText += "===================================\n";
                exportText += "Generiert mit Klausurtrainer Pädagogik";

                navigator.clipboard.writeText(exportText).then(() => {
                    const btn = document.getElementById('btn-export-exam');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Kopiert!';
                    btn.classList.replace('bg-blue-600', 'bg-emerald-600');
                    btn.classList.replace('hover:bg-blue-700', 'hover:bg-emerald-700');

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.replace('bg-emerald-600', 'bg-blue-600');
                        btn.classList.replace('hover:bg-emerald-700', 'hover:bg-blue-700');
                    }, 3000);
                }).catch(err => {
                    console.error('Fehler beim Kopieren: ', err);
                    alert("Kopieren in die Zwischenablage ist fehlgeschlagen. Bitte versuche es manuell.");
                });
            },

            // --- Learning Logic (Rest des Kodes) ---
            toggleQuestion(id) {
                const answerEl = document.getElementById(`answer-${id}`);
                const chevron = document.getElementById(`chevron-${id}`);
                answerEl.classList.toggle('hidden');
                chevron.style.transform = answerEl.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            },

            toggleLearned(id) {
                const index = this.state.learnedQuestions.indexOf(id);
                if (index === -1) this.state.learnedQuestions.push(id);
                else this.state.learnedQuestions.splice(index, 1);
                this.saveState();
                this.updateQuestionStatusUI(id);
                this.updateCharts();
            },

            updateQuestionStatusUI(id) {
                const btn = document.getElementById(`btn-learn-${id}`);
                if (!btn) return;
                if (this.state.learnedQuestions.includes(id)) {
                    btn.classList.remove('bg-stone-200', 'text-stone-700');
                    btn.classList.add('bg-emerald-100', 'text-emerald-700', 'border-emerald-200');
                    btn.innerHTML = '✓ Gelernt';
                } else {
                    btn.classList.add('bg-stone-200', 'text-stone-700');
                    btn.classList.remove('bg-emerald-100', 'text-emerald-700', 'border-emerald-200');
                    btn.innerHTML = 'Als gelernt markieren';
                }
            },

            saveState() {
                localStorage.setItem('paed_learned', JSON.stringify(this.state.learnedQuestions));
                this.updateUI();
            },

            updateUI() {
                const total = this.getTotalQuestions();
                const learned = this.state.learnedQuestions.length;
                document.getElementById('total-progress-text').textContent = `${learned}/${total} Fragen gemeistert`;
            },

            expandAll() {
                document.querySelectorAll('[id^="answer-"]').forEach(el => el.classList.remove('hidden'));
                document.querySelectorAll('[id^="chevron-"]').forEach(el => el.style.transform = 'rotate(180deg)');
            },

            collapseAll() {
                document.querySelectorAll('[id^="answer-"]').forEach(el => el.classList.add('hidden'));
                document.querySelectorAll('[id^="chevron-"]').forEach(el => el.style.transform = 'rotate(0deg)');
            },

            // --- Focus Mode Logic ---
            renderFocusCard() {
                const allQuestions = this.getAllQuestionsFlat();
                if(allQuestions.length === 0) return;

                const q = allQuestions[this.state.currentFocusIndex];

                document.getElementById('focus-question').textContent = q.q;
                document.getElementById('focus-answer').textContent = q.a;
                document.getElementById('focus-category').textContent = q.category.replace(/^\d+\.\s*/, '');
                document.getElementById('focus-counter').textContent = `${this.state.currentFocusIndex + 1}/${allQuestions.length}`;

                this.state.isFocusAnswerVisible = false;
                document.getElementById('focus-answer-container').classList.add('hidden');
                document.getElementById('btn-reveal').textContent = "Antwort zeigen";

                const markBtn = document.getElementById('btn-mark-learned');
                if (this.state.learnedQuestions.includes(q.id)) {
                     markBtn.classList.add('opacity-50', 'cursor-not-allowed');
                     markBtn.innerHTML = '✓ Bereits gelernt';
                } else {
                     markBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                     markBtn.innerHTML = '✓ Als gelernt markieren';
                }
            },

            toggleFocusAnswer() {
                this.state.isFocusAnswerVisible = !this.state.isFocusAnswerVisible;
                const containerEl = document.getElementById('focus-answer-container');
                const btnEl = document.getElementById('btn-reveal');

                if (this.state.isFocusAnswerVisible) {
                    containerEl.classList.remove('hidden');
                    btnEl.textContent = "Antwort verbergen";
                } else {
                    containerEl.classList.add('hidden');
                    btnEl.textContent = "Antwort zeigen";
                }
            },

            nextFocus() {
                if (this.state.currentFocusIndex < this.getTotalQuestions() - 1) {
                    this.state.currentFocusIndex++;
                    this.renderFocusCard();
                }
            },

            prevFocus() {
                if (this.state.currentFocusIndex > 0) {
                    this.state.currentFocusIndex--;
                    this.renderFocusCard();
                }
            },

            markCurrentFocusLearned() {
                const currentId = this.getAllQuestionsFlat()[this.state.currentFocusIndex].id;
                if (!this.state.learnedQuestions.includes(currentId)) {
                    this.toggleLearned(currentId);
                    this.renderFocusCard();
                }
            },

            renderCategories() {
                const container = document.getElementById('categories-container');
                container.innerHTML = categories.map(cat => `
                    <div class="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                        <div class="bg-stone-50 px-6 py-4 border-b border-stone-100 flex justify-between items-center">
                            <h3 class="font-bold text-stone-700">${cat.title}</h3>
                            <span class="text-xs font-mono bg-white px-2 py-1 rounded border border-stone-200 text-stone-500">
                                ${cat.questions.filter(q => this.state.learnedQuestions.includes(q.id)).length}/${cat.questions.length}
                            </span>
                        </div>
                        <div class="divide-y divide-stone-100">
                            ${cat.questions.map(q => `
                                <div class="p-6 hover:bg-stone-50/50 transition-colors group">
                                    <div class="flex items-start justify-between cursor-pointer" onclick="app.toggleQuestion(${q.id})">
                                        <div class="flex items-start space-x-4">
                                            <span class="font-mono text-stone-400 text-sm mt-1">#${q.id}</span>
                                            <p class="font-medium text-stone-800 text-lg pr-4">${q.q}</p>
                                        </div>
                                        <svg id="chevron-${q.id}" class="w-5 h-5 text-stone-400 transform transition-transform duration-200 mt-1 flex-shrink-0 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                    <div id="answer-${q.id}" class="hidden mt-4 ml-10 pl-4 border-l-2 border-emerald-200 animate-fade-in">
                                        <p class="text-stone-600 leading-relaxed mb-4">${q.a}</p>
                                        <button id="btn-learn-${q.id}" onclick="event.stopPropagation(); app.toggleLearned(${q.id})" class="text-xs px-3 py-1.5 rounded border transition-colors ${this.state.learnedQuestions.includes(q.id) ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-stone-200 text-stone-700 border-stone-200 hover:bg-stone-300'}">
                                            ${this.state.learnedQuestions.includes(q.id) ? '✓ Gelernt' : 'Als gelernt markieren'}
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('');
            },

            // --- Charts ---
            charts: {},
            updateCharts() {
                const labels = categories.map(c => c.title.replace(/^\d+\.\s*/, '').substring(0, 15) + '...');
                const dataTotal = categories.map(c => c.questions.length);
                const dataLearned = categories.map(c => c.questions.filter(q => this.state.learnedQuestions.includes(q.id)).length);
                const totalLearned = this.state.learnedQuestions.length;
                const totalQuestions = this.getTotalQuestions();

                // Theme colors
                const textColor = this.state.isDarkMode ? '#e7e5e4' : '#1c1917';
                const gridColor = this.state.isDarkMode ? '#44403c' : '#f5f5f4';
                const openColor = this.state.isDarkMode ? '#44403c' : '#e7e5e4';

                const ctxTopic = document.getElementById('topicChart').getContext('2d');
                if (this.charts.topic) this.charts.topic.destroy();
                this.charts.topic = new Chart(ctxTopic, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            { label: 'Gelernt', data: dataLearned, backgroundColor: '#10b981', borderRadius: 4 },
                            { label: 'Offen', data: dataTotal.map((t, i) => t - dataLearned[i]), backgroundColor: openColor, borderRadius: 4 }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        color: textColor,
                        scales: {
                            x: { stacked: true, grid: { display: false }, ticks: { color: textColor } },
                            y: { stacked: true, beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor } }
                        },
                        plugins: { legend: { display: false } }
                    }
                });

                const ctxOverall = document.getElementById('overallChart').getContext('2d');
                if (this.charts.overall) this.charts.overall.destroy();
                this.charts.overall = new Chart(ctxOverall, {
                    type: 'doughnut',
                    data: {
                        labels: ['Gelernt', 'Noch offen'],
                        datasets: [{ data: [totalLearned, totalQuestions - totalLearned], backgroundColor: ['#10b981', openColor], borderWidth: 0 }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '70%',
                        color: textColor,
                        plugins: { legend: { position: 'bottom', labels: { color: textColor } } }
                    },
                    plugins: [{
                        id: 'textCenter',
                        beforeDraw: (chart) => {
                            var width = chart.width, height = chart.height, ctx = chart.ctx;
                            ctx.restore();
                            var fontSize = (height / 114).toFixed(2);
                            ctx.font = "bold " + fontSize + "em sans-serif";
                            ctx.textBaseline = "middle";
                            ctx.fillStyle = textColor;
                            var percentageStr = totalQuestions > 0 ? Math.round((totalLearned/totalQuestions)*100) + "%" : "0%";
                            var textX = Math.round((width - ctx.measureText(percentageStr).width) / 2), textY = height / 2;
                            ctx.fillText(percentageStr, textX, textY);
                            ctx.save();
                        }
                    }]
                });
            }
        };

        // Start App
