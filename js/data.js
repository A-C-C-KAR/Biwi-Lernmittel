        const categories = [
            {
                id: 'wiss',
                title: '1. Wissenschaft, Studium & Professionalisierung',
                questions: [
                    { id: 1, q: 'Erläutern Sie den Unterschied zwischen einem „Brotgelehrten“ und einem „philosophischen Kopf“ nach Friedrich Schiller.', a: 'Brotgelehrter: Zweck des Studiums liegt außen (Erwerb, Karriere), sieht keine Zusammenhänge. Philosophischer Kopf: Zweck liegt in der Sache selbst, sucht die Einheit und Harmonie des Wissens, verbindet Disziplinen.' },
                    { id: 2, q: 'Warum betrachtet Rainer Bolle das Studium als „Bildungsgang“ und welche Rolle spielt dabei das Portfolio?', a: 'Studium ist Persönlichkeitsentwicklung (Bildung), nicht nur Wissenserwerb. Portfolio dient der reflexiven Auseinandersetzung mit der eigenen Entwicklung, Theorie und Praxis.' },
                    { id: 3, q: 'Was bedeutet der Begriff „Professionalität“ im Lehrerberuf aus allgemein-pädagogischer Sicht?', a: 'Nicht nur technisches Können (Handwerk), sondern pädagogischer Takt, reflexive Haltung, Verbindung von Theorie und Praxis, und ethische Verantwortung (Anwaltschaft für das Kind).' },
                    { id: 4, q: 'Inwiefern ist Pädagogik eine „Wissenschaft“ und wie unterscheidet sie sich von reiner Praxiserfahrung?', a: 'Pädagogik reflektiert systematisch über Erziehung (Begriffe, Ziele, Methoden). Praxis ist das Handeln selbst. Wissenschaft liefert die Theorie, um die Praxis kritisch zu hinterfragen und zu verbessern ("Theorie der Praxis").' }
                ]
            },
            {
                id: 'aufkl',
                title: '2. Aufklärung & Mündigkeit',
                questions: [
                    { id: 5, q: 'Definieren Sie „Aufklärung“ nach Immanuel Kant und erläutern Sie den Begriff der „selbstverschuldeten Unmündigkeit“.', a: 'Aufklärung: "Ausgang des Menschen aus seiner selbstverschuldeten Unmündigkeit." Unmündigkeit: Unvermögen, sich seines Verstandes ohne Leitung anderer zu bedienen. Selbstverschuldet: Ursache liegt nicht im Mangel an Verstand, sondern an Mut/Entschließung ("Sapere aude!").' },
                    { id: 6, q: 'Warum ist Erziehung laut Kant das „größte und schwerste Problem“, das dem Menschen aufgegeben werden kann?', a: 'Weil der Mensch nur durch Erziehung zum Menschen wird, aber die Erzieher selbst nur erzogene Menschen sind. Problem der Balance zwischen Freiheit und Zwang.' },
                    { id: 7, q: 'Erläutern Sie die Forderung Adornos: „Die allererste Forderung an Erziehung ist, dass Auschwitz nicht noch einmal sei.“', a: 'Fundamentale moralische Basis der Pädagogik nach dem Holocaust. Erziehung muss zur Reflexion, Autonomie und Widerstand gegen blinden Gehorsam/Barbarei befähigen.' },
                    { id: 8, q: 'Was versteht die Kritische Theorie unter dem Begriff der „Mündigkeit“?', a: 'Fähigkeit zur Kritik, zum Widerspruch, zur Autonomie gegenüber gesellschaftlichen Zwängen und Ideologien. Emanzipation (Weiterentwicklung) von Herrschaft.' },
                    { id: 9, q: 'Erklären Sie das Problem der „Halbbildung“ nach Adorno.', a: 'Oberflächliche Aneignung von Kultur/Wissen ohne tiefes Verständnis oder existentielle Bedeutung. Bildung wird zur Ware und zum Statussymbol, verliert ihre kritische Kraft.' }
                ]
            },
            {
                id: 'adler',
                title: '3. Anthropologie & Individualpsychologie (Alfred Adler)',
                questions: [
                    { id: 10, q: 'Was ist der „Lebensstil“ (oder Lebensplan) in der Individualpsychologie und wie entsteht er?', a: 'Die einzigartige, unbewusste Richtlinie einer Person, wie sie Ziele erreicht und Probleme löst. Entsteht in der frühen Kindheit (ca. bis zum 5. Lebensjahr) als Antwort auf Umwelterfahrungen.' },
                    { id: 11, q: 'Erläutern Sie das „Gemeinschaftsgefühl“ als zentralen Maßstab für psychische Gesundheit.', a: 'Fähigkeit zur Kooperation, Empathie und Beitrag zum Wohl anderer. Psychische Gesundheit = hohes Gemeinschaftsgefühl.' },
                    { id: 12, q: 'Was versteht Adler unter dem „Minderwertigkeitskomplex“ und wie hängen Kompensation und Überlegenheitsstreben damit zusammen?', a: 'Jeder Mensch fühlt sich anfangs (als Kind) minderwertig. Dies treibt zur Entwicklung an (Kompensation). Ein "Komplex" entsteht bei Entmutigung. Überlegenheitsstreben ist der Versuch, dieses Gefühl (oft fehlerhaft) zu überwinden.' },
                    { id: 13, q: 'Welche pädagogischen Konsequenzen zieht Adler aus der „Geschwisterkonstellation“?', a: 'Die Position (Ältester, Jüngster, Einzelkind) prägt den Charakter. Pädagogen müssen verstehen, wie das Kind seine Rolle in der Gruppe interpretiert.' },
                    { id: 14, q: 'Warum betrachtet Adler „Faulheit“ oder „Unterrichtsstörungen“ nicht als isolierte Symptome, sondern als Teil der „Einheit der Persönlichkeit“?', a: 'Alles Verhalten ist zielgerichtet (final). Faulheit kann ein Schutz vor blamablem Versagen sein. Stören kann ein Weg sein, Aufmerksamkeit (Geltung) zu erzwingen.' },
                    { id: 15, q: 'Erläutern Sie den Begriff der „Erziehung zum Mut“ bei Adler.', a: 'Ermutigung ist das wichtigste pädagogische Mittel. Dem Kind Zutrauen in die eigenen Fähigkeiten geben, damit es Aufgaben der Gemeinschaft bewältigt.' },
                    { id: 16, q: 'Was kritisiert Adler am Konzept des „verzärtelten Kindes“?', a: 'Verzärtelung nimmt dem Kind die Erfahrung der Selbstwirksamkeit. Es lernt, dass andere für es sorgen, entwickelt kein Gemeinschaftsgefühl, sondern tyrannische Erwartungshaltungen.' }
                ]
            },
            {
                id: 'rousseau',
                title: '4. Klassische Pädagogik: Rousseau',
                questions: [
                    { id: 17, q: 'Erläutern Sie Rousseaus Grundannahme: „Alles ist gut, wie es aus den Händen des Schöpfers kommt...“', a: 'Naturzustand ist gut. Gesellschaft/Kultur verdirbt den Menschen durch Ungleichheit, Konkurrenz und falsche Bedürfnisse. Erziehung muss die natürliche Güte schützen.' },
                    { id: 18, q: 'Was versteht Rousseau unter „Negativer Erziehung“?', a: 'Im Kindesalter, ist es ein nicht direktes Belehren oder Tugend-Predigen, sondern Bewahren des Zöglings vor schädlichen Einflüssen ("Zeit verlieren statt gewinnen"). Lernen durch Erfahrung, nicht durch Worte.' },
                    { id: 19, q: 'Nennen und erläutern Sie die drei Quellen der Erziehung nach Rousseau.', a: '1. Natur (innere Entwicklung der Organe/Kräfte). 2. Dinge (Erfahrung mit der Umwelt). 3. Menschen (Gebrauch der Fähigkeiten). Sie müssen harmonieren.' },
                    { id: 20, q: 'Warum ist die Kindheit laut Rousseau als Eigenwert und nicht nur als Vorbereitungszeit zu sehen?', a: 'Das Kind hat eine eigene Art zu sehen, zu denken und zu fühlen. Man darf die Gegenwart nicht der Zukunft opfern ("Lasst die Kindheit im Kinder reifen").' },
                    { id: 21, q: 'Erläutern Sie den Begriff der „Perfectibilité“.', a: 'Die Fähigkeit des Menschen zur (unbegrenzten) Vervollkommnung. Unterscheidet ihn vom Tier, ist aber auch Grund für seinen möglichen Niedergang.' },
                    { id: 22, q: 'Skizzieren Sie die Rolle des Erziehers im „Emil“.', a: 'Er ist kein klassischer Lehrer ("Magister"), sondern ein "Gouverneur", der Situationen arrangiert ("inszeniert"), damit Emil scheinbar frei, aber gelenkt durch die Dinge lernt.' }
                ]
            },
            {
                id: 'klassiker',
                title: '5. Klassiker: Kant, Humboldt, Schleiermacher',
                questions: [
                    { id: 23, q: 'Nennen Sie die vier Stufen der Erziehung nach Kant.', a: '1. Disziplinierung (Triebbeherrschung). 2. Kultivierung (Geschicklichkeit/Kulturtechniken). 3. Zivilisierung (Soziale Kompetenz/Manieren). 4. Moralisierung (Handeln aus Einsicht/Pflicht).' },
                    { id: 24, q: 'Warum ist für Kant die „Moralisierung“ der wichtigste, aber schwierigste Teil?', a: 'Weil man Freiheit nicht erzwingen kann. Der Zögling muss lernen, "das Gute" aus eigener innerer Überzeugung zu tun (Kategorischer Imperativ), nicht aus Angst vor Strafe.' },
                    { id: 25, q: 'Erläutern Sie das humboldtsche Bildungsideal.', a: '"Höchste und proportionierlichste Bildung der Kräfte zu einem Ganzen." Allseitige Entfaltung aller menschlichen Anlagen, nicht einseitige Spezialisierung.' },
                    { id: 26, q: 'Unterscheidung „allgemeine Menschenbildung“ vs. „Spezialbildung“ (Humboldt).', a: 'Zuerst muss der Mensch zum Menschen gebildet werden (Allgemeinbildung), erst danach kommt die berufliche Spezialisierung. Bildung ist Selbstzweck.' },
                    { id: 27, q: 'Humboldts Konzept der Universität.', a: 'Einheit von Forschung und Lehre. Einsamkeit (Ruhe zur Vertiefung) und Freiheit (Lehr- und Lernfreiheit). Gemeinschaft von Lehrenden und Lernenden.' },
                    { id: 28, q: 'Was bedeutet „Dialektik der Erziehung“ bei Schleiermacher?', a: 'Spannungsverhältnis zwischen: Einwirkung auf die Zukunft (Entwicklung) vs. Befriedigung der Gegenwart (Eigenrecht des Kindes).' },
                    { id: 29, q: 'Die vier Prinzipien nach Schleiermacher.', a: 'Behüten (vor Schädlichem), Unterstützen (guter Anlagen), Gegenwirken (bei Fehlentwicklungen), Gewährenlassen (Freiheit geben).' },
                    { id: 30, q: 'Wann endet die Erziehung nach Schleiermacher.', a: 'Ablieferung an die vier Lebensbereiche (Staat, Kirche, Geselligkeit, Wissenschaft). Erziehung endet, wenn der Zögling sich selbst weiterbilden kann.' }
                ]
            },
            {
                id: 'herbart',
                title: '6. Systematische Pädagogik: Herbart',
                questions: [
                    { id: 31, q: 'Was versteht Herbart unter „Erziehendem Unterricht“?', a: 'Einheit von Wissensvermittlung und Charakterbildung. Unterricht, der nicht nur Wissen anhäuft, sondern den Willen und Charakter formt.' },
                    { id: 32, q: 'Erläutern Sie den Begriff des „Gedankenkreises“ und der Bedeutung für die Willensbildung.', a: 'Der Wille entspringt den Gedanken ("Wir wollen nur, was wir wissen"). Ein reicher, geordneter Gedankenkreis ermöglicht einen starken, sittlichen Charakter.' },
                    { id: 33, q: 'Definieren Sie die „Vielseitigkeit des Interesses“ und die sechs Interessenklassen.', a: 'Ziel des Unterrichts. 1. Empirisch, 2. Spekulativ, 3. Ästhetisch (Erkenntnis). 4. Sympathisch, 5. Gesellschaftlich, 6. Religiös (Teilnahme).' },
                    { id: 34, q: 'Was ist die „Ästhetische Darstellung der Welt“ bei Herbart.', a: 'Pädagogik soll die Welt so zeigen, dass sie Wohlgefallen (Interesse) und moralisches Urteil anregt. Ästhetik hier im Sinne von Wahrnehmung und Beurteilung.' },
                    { id: 35, q: 'Verhältnis von „Regierung“, „Unterricht“ und „Zucht“.', a: 'Regierung: Äußere Ordnung halten (gegen Wildheit). Unterricht: Bildung des Gedankenkreises. Zucht: Direkte Formung des Charakters/Gesinnung.' },
                    { id: 36, q: 'Was ist der „Pädagogische Takt“?', a: 'Das Bindeglied zwischen Theorie und Praxis. Die Fähigkeit des Lehrers, in der konkreten Situation schnell und richtig zu entscheiden (nicht durch Regeln lernbar, sondern durch Übung/Reflexion).' }
                ]
            },
            {
                id: 'kritik',
                title: '7. Moderne Bildungskritik & Anthropologie',
                questions: [
                    { id: 37, q: 'Unterscheiden Sie „Haben“ und „Sein“ unter Fromm.', a: 'Haben: Wissen als Besitz, Auswendiglernen, Konsum. Sein: Wissen als Prozess, Durchdringung, Veränderung der eigenen Person.' },
                    { id: 38, q: ' Was ist die „Kopernikanische Wende“ in der Sinnfrage nach Viktor Frankl.', a: 'Nicht wir fragen nach dem Sinn des Lebens, sondern das Leben fragt uns. Wir müssen durch unser Handeln antworten.' },
                    { id: 39, q: 'Definieren Sie Liessmanns Begriff der „Unbildung“.', a: 'Wissensgesellschaft ≠ Bildungsgesellschaft. Reduktion von Bildung auf verwertbare Kompetenzen und Informationen. Verlust des Verstehens.' },
                    { id: 40, q: 'Warum lässt sich Wissen laut Liessmann nicht „auslagern“?', a: 'Daten kann man speichern, Wissen muss im Subjekt (im Kopf) geschehen. Wissen erfordert Denken und Verknüpfung.' }
                ]
            },
            {
                id: 'handeln',
                title: '8. Pädagogisches Handeln, Theorie & Praxis',
                questions: [
                    { id: 41, q: 'Was beschreibt Dietrich Benners: Prinzip der „Bildsamkeit“.', a: 'Anerkennung des Anderen als zur Selbstbestimmung fähiges Wesen. Keine bloße Formbarkeit, sondern Mitwirkung des Zöglings.' },
                    { id: 42, q: '„Was ist die Aufforderung zur Selbsttätigkeit“.', a: 'Erziehung ist Interaktion: Der Erzieher fordert den Zögling auf, selbst tätig zu werden. Der Zögling antwortet durch Handeln.' },
                    { id: 43, q: '„Was ist die Negativität der Erfahrung“ (Benner).', a: 'Lernen geschieht oft durch Scheitern, Widerstand, Enttäuschung. Erfahrungen, die bisherige Annahmen widerlegen, sind besonders bildend.' },
                    { id: 44, q: '„Pädagogischer Bezug“ nach Herman Nohl.', a: 'Das leidenschaftliche Verhältnis des Erziehers zum Zögling. Zum Wohl des Zöglings (nicht für Staat/Wirtschaft). Geprägt von Liebe und Autorität.' },
                    { id: 45, q: '„Sokratischer Eid“ von Hartmut von Hentig.', a: 'Verpflichtung der Lehrer/Pädagogen zum Schutz des Kindes. "Ich verpflichte mich, die Eigenart jedes Kindes zu achten...".' },
                    { id: 46, q: 'Verhältnis Theorie und Praxis nach Erich Weniger.', a: 'Theorie ist die "Theorie der Praxis" (für die Praxis, aus der Praxis). Theorie soll die Praxis aufklären, nicht bevormunden.' },
                    { id: 47, q: 'Kritik am Modell der „Trivial-Maschine“.', a: 'Menschen sind nicht-triviale Maschinen (Heinz von Foerster). Gleicher Input führt nicht zu gleichem Output (Wegen innerer Zustände/Freiheit).' },
                    { id: 48, q: 'Bedeutung von „Vertrauen“ bei Royston Maldoom.', a: 'Bedingungsloses Vertrauen in das Potential des Schülers ("Du kannst das!"). Ermöglicht Höchstleistungen und Selbstüberwindung.' },
                    { id: 49, q: '„Nicht-Affirmative Bildungstheorie“.', a: 'Erziehung darf nicht nur bestehende Verhältnisse bestätigen (affirmieren), sondern muss zur Kritik und zur Gestaltung einer besseren Zukunft befähigen.' },
                    { id: 50, q: 'Zusammenhang „Sehen“, „Wahrnehmen“, „Handeln“.', a: 'Pädagogisches Handeln setzt pädagogisches Sehen (Wahrnehmen der Situation/Bedürfnisse des Kindes) voraus. Theorie schult den Blick.' }
                ]
            }
        ];
