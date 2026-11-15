// ─────────────────────────────────────────────────────────────────────────
//  Portfolio content — EDIT HERE to swap copy, tags, links, images.
//
//  title:       plain string; wrap the accent fragment in **double asterisks**.
//  accent:      color of that highlighted fragment (null = no accent).
//  client:      small italic line under the title (Rubik); null to omit.
//  tags:        array of short labels; [] to omit the tag row.
//  summary:     array of paragraph strings shown beside the image (one <p> each).
//
//  bio.credentials:  plain-text pills (e.g. "6 лет в UX").
//  bio.actions:      contact buttons { label, href, variant: "ghost" | "tg", inHeader? }.
//                    inHeader:true also shows the button in the top-right header row;
//                    the footer shows all of them under bio.contactTitle.
//
//  img.layers use raw Figma design-pixel coordinates inside the img box
//  (img.w × img.h). Each layer:
//    box:    [left, top, width, height]  (design px, origin = box top-left)
//    radius: corner radius (design px)
//    crop:   inner <img> position [left%, top%, width%, height%], or
//            null => object-fit:cover filling the layer box.
// ─────────────────────────────────────────────────────────────────────────

export const bio = {
  name: "Анна Белова",
  role: "Продуктовый дизайнер",
  photo: "assets/bio/photo.webp",
  credentials: ["6 лет в UX", "4 года в Enterprise Fintech"],
  contactTitle: "Связаться со мной",
  actions: [
    { label: "Смотреть CV", href: "cv.html", variant: "ghost", inHeader: true },
    { label: "Написать по почте", href: "mailto:belova.annya@gmail.com", variant: "ghost" },
    { label: "Написать в tg", href: "https://t.me/belovannaaa", variant: "tg", inHeader: true },
  ],
  text:
    "Продуктовый дизайнер, 6 лет в UX. Проектирую B2B-продукты на основе исследований " +
    "и данных: перевожу обратную связь клиентов в решения для бэклога",
};

export const cases = [
  {
    id: "alfa",
    tags: ["Enterprise B2B", "Data Visualization"],
    title: "Сократила путь от клиентской обратной связи до **продуктового решения**",
    accent: "#f1015a",
    client: "Альфа-Банк",
    img: {
      w: 970, h: 556, bg: "#050506", radius: 32,
      layers: [
        { src: "assets/alfa/dashboard.webp", box: [38, 30, 894, 497], radius: 0, crop: null },
      ],
    },
    summary: [
      "Спроектировала VoC-дашборд для продуктовых команд и C-level: обратная связь клиентов, продуктовые и UX-метрики в одном окне вместо 8+ разрозненных отчётов",
    ],
  },
  {
    id: "iontrack",
    tags: ["Health-Tech", "Built from Scratch", "Design System"],
    title: "Превратила **медицинскую технологию** в цифровой продукт",
    accent: "#4963fa",
    client: "IonTrack",
    img: {
      w: 970, h: 539, bg: null, radius: 0,
      layers: [
        { src: "assets/iontrack/main.webp", box: [0, -1, 691, 532], radius: 40, crop: [-0.3, -0.04, 150.09, 106.66] },
        { src: "assets/iontrack/main.webp", box: [714, 7, 246, 524], radius: 34, crop: [-290.82, -5.53, 431.56, 110.93] },
        { src: "assets/iontrack/phone.webp", box: [704, 0, 265.545, 540.862], radius: 0, crop: null },
      ],
    },
    summary: [
      "Спроектировала мобильное приложение и дизайн-систему из 50+ компонентов, провела 3 раунда юзабилити-тестов — доля успешно пройденных сценариев выросла на 40%",
    ],
  },
  {
    id: "corgi",
    tags: ["InsurTech", "B2B SaaS", "Redesign"],
    title: "Разделила страховые процессы **по ролям**",
    accent: "#ff6b48",
    client: "Corgi Insurance Services",
    img: {
      w: 970, h: 539, bg: "#ff6b48", radius: 32,
      layers: [
        { src: "assets/corgi/main.webp", box: [0, 8, 955, 523], radius: 0, crop: null },
      ],
    },
    summary: [
      "Перестроила информационную архитектуру платформы для брокеров и андеррайтеров: каждая роль видит только свои сценарии — новичкам проще разобраться, опытным быстрее работать",
    ],
  },
  {
    id: "drinkit",
    tags: ["FoodTech", "UX Research", "UI Concept"],
    title: "**Снизила барьер входа** без потери данных для персонализации",
    accent: "#3f5bff",
    client: "Drinkit",
    img: {
      w: 970, h: 539, bg: "#ff6b48", radius: 32,
      layers: [
        { src: "assets/drinkit/main.webp", box: [0, 0, 970, 656], radius: 0, crop: [0, -4.14, 100, 109.2] },
      ],
    },
    summary: [
      "Исследовала, как выбирают первый напиток, и спроектировала онбординг, который ускоряет этот выбор и заодно собирает данные для персональных рекомендаций",
    ],
  },
  {
    id: "streaming",
    tags: ["UI Concept", "Entertainment"],
    title: "Ускорила старт просмотра",
    accent: null,
    client: null,
    img: {
      w: 970, h: 539, bg: null, radius: 32,
      layers: [
        { src: "assets/streaming/main.webp", box: [-13, -3, 997, 546], radius: 0, crop: null },
      ],
    },
    summary: [
      "Изучила стриминговые сервисы и спроектировала интерфейс, который сокращает путь от выбора до начала просмотра",
    ],
  },
  {
    id: "ecommerce",
    tags: ["UI Concept", "Retail"],
    title: "Сократила путь от поиска до покупки",
    accent: null,
    client: null,
    img: {
      w: 970, h: 539, bg: "#171719", radius: 32,
      layers: [
        { src: "assets/ecommerce/main.webp", box: [122, -2, 726, 541], radius: 32, crop: [-19.54, -0.04, 135.47, 100.08] },
      ],
    },
    summary: [
      "Спроектировала визуальный поиск и поиск по штрихкоду, которые ускоряют выбор товара и оформление заказа",
    ],
  },
  {
    id: "illustrations",
    tags: [],
    title: "Некоммерческие иллюстрации",
    accent: null,
    client: null,
    img: {
      w: 970, h: 657, bg: null, radius: 0,
      layers: [
        { src: "assets/illustrations/p259.webp", box: [342.33, 0, 285.343, 329.826], radius: 32, crop: [-1.66, 0, 103.29, 118.77] },
        { src: "assets/illustrations/p254.webp", box: [639.92, 0, 330.081, 330.081], radius: 32, crop: null },
        { src: "assets/illustrations/p255.webp", box: [641, 342, 329, 307], radius: 32, crop: [0, 0, 100, 107.34] },
        { src: "assets/illustrations/p256.webp", box: [343, 342, 286, 307], radius: 32, crop: [-5.43, -3.82, 115.99, 103.68] },
        { src: "assets/illustrations/p257.webp", box: [0, 342, 331, 307], radius: 32, crop: [0, -2.15, 100.05, 107.87] },
        { src: "assets/illustrations/p258.webp", box: [0, 0, 330.081, 330.081], radius: 32, crop: null },
      ],
    },
    summary: [
      "Помимо продуктового дизайна рисую иллюстрации и стикерпаки",
      "Выпустила работы вместе с No Kids Stickers (NKS) — у бренда 400 000+ подписчиков",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
//  English version of the portfolio page (RU/EN toggle in the header).
//  Keys are the exact Russian strings from bio / cases above, values are their
//  English versions (written natively, not translated word-for-word). Any string
//  without an entry stays Russian — so after editing Russian copy above, update
//  the matching key here too. Titles keep the **accent** markers.
// ─────────────────────────────────────────────────────────────────────────
export const en = {
  "Анна Белова": "Anna Belova",
  "Продуктовый дизайнер": "Product Designer",
  "6 лет в UX": "6 years in UX",
  "4 года в Enterprise Fintech": "4 years in Enterprise Fintech",
  "Связаться со мной": "Get in touch",
  "Смотреть CV": "View CV",
  "Написать по почте": "Email me",
  "Написать в tg": "Message on tg",
  [bio.text]: "Product designer with 6 years in UX. I design B2B products grounded in research and data, turning customer feedback into backlog decisions",
  "Сократила путь от клиентской обратной связи до **продуктового решения**": "Shortened the path from customer feedback to **product decisions**",
  "Альфа-Банк": "Alfa-Bank",
  "Спроектировала VoC-дашборд для продуктовых команд и C-level: обратная связь клиентов, продуктовые и UX-метрики в одном окне вместо 8+ разрозненных отчётов": "Designed a VoC dashboard for product teams and C-level: customer feedback, product and UX metrics in one view instead of 8+ scattered reports",
  "Превратила **медицинскую технологию** в цифровой продукт": "Turned **medical technology** into a digital product",
  "Спроектировала мобильное приложение и дизайн-систему из 50+ компонентов, провела 3 раунда юзабилити-тестов — доля успешно пройденных сценариев выросла на 40%": "Designed the mobile app and a design system of 50+ components, then ran 3 rounds of usability testing, raising task completion by 40%",
  "Разделила страховые процессы **по ролям**": "Split insurance workflows **by role**",
  "Перестроила информационную архитектуру платформы для брокеров и андеррайтеров: каждая роль видит только свои сценарии — новичкам проще разобраться, опытным быстрее работать": "Rebuilt the information architecture of a platform for brokers and underwriters so each role sees only its own workflows, making it easier for newcomers and faster for experienced users",
  "**Снизила барьер входа** без потери данных для персонализации": "**Lowered the entry barrier** without losing personalization data",
  "Исследовала, как выбирают первый напиток, и спроектировала онбординг, который ускоряет этот выбор и заодно собирает данные для персональных рекомендаций": "Studied how people choose their first drink and designed an onboarding flow that speeds up that choice while collecting data for personal recommendations",
  "Ускорила старт просмотра": "Got viewers watching sooner",
  "Изучила стриминговые сервисы и спроектировала интерфейс, который сокращает путь от выбора до начала просмотра": "Studied streaming services and designed an interface that shortens the path from choosing to watching",
  "Сократила путь от поиска до покупки": "Shortened the path from search to purchase",
  "Спроектировала визуальный поиск и поиск по штрихкоду, которые ускоряют выбор товара и оформление заказа": "Designed visual and barcode search that speeds up product selection and checkout",
  "Некоммерческие иллюстрации": "Non-commercial illustrations",
  "Помимо продуктового дизайна рисую иллюстрации и стикерпаки": "Alongside product design, I draw illustrations and sticker packs",
  "Выпустила работы вместе с No Kids Stickers (NKS) — у бренда 400 000+ подписчиков": "Released work with No Kids Stickers (NKS), a brand with 400,000+ followers",
};

// ─────────────────────────────────────────────────────────────────────────
//  CV page (cv.html, rendered by js/cv.js). Merged from the RU + EN PDF CVs.
//  pdf:          the downloadable file behind «Скачать PDF». It is a static file
//                generated from this page — rebuild both after editing:
//                `node tools/build-cv-pdf.mjs` (see README).
//  experience[].points: { title, text } — title is the bold lead-in (may be null).
//  Two languages: cv.ru and cv.en (cv.html?lang=en). Write each natively — not a
//  literal translation (RU: perfective verb + result; EN: past-tense verb, "…, raising X").
// ─────────────────────────────────────────────────────────────────────────

const cvRu = {
  lang: "ru",
  ui: { back: "← Портфолио", download: "Скачать PDF", about: "О себе", experience: "Опыт", artifacts: "Артефакты", skills: "Навыки", education: "Образование", courses: "Курсы", languages: "Языки" },
  name: "Анна Белова",
  role: "Продуктовый дизайнер · B2B-финтех · Mobile & Web",
  location: "Санкт-Петербург · удалённо, гибрид, командировки, релокация",
  pdf: "assets/cv/anna-belova-cv-ru.pdf",
  pdfName: "Anna_Belova_CV_RU.pdf",
  contacts: [
    { label: "belova.annya@gmail.com", href: "mailto:belova.annya@gmail.com" },
    { label: "Telegram: @belovannaaa", href: "https://t.me/belovannaaa" },
    { label: "Портфолио: belovaaanya.github.io", href: "https://belovaaanya.github.io/" },
  ],
  summary: [
    "Продуктовый дизайнер: 6 лет в UX, из них 4 года в B2B-финтехе Альфа-Банка (2M+ бизнес-клиентов). Enterprise-продукты: платежи, выписки, авторизация, навигация, визуализация данных.",
    "Перевожу обратную связь клиентов и данные в решения для бэклога, после релиза проверяю эффект сравнением до и после, а юридические и технические ограничения встраиваю в UX, чтобы они не становились барьером.",
    "Сейчас довожу VoC-дашборд для продактов и C-level от исследования и макета в Figma до рабочего приложения с LLM-выводами, работая в паре с ИИ-агентами.",
  ],
  experience: [
    {
      role: "Product Designer & Senior UX Analyst",
      company: "Альфа-Банк",
      period: "янв 2026 — сейчас",
      about: "B2B-экосистема банка: 2M+ бизнес-клиентов, 500+ пользовательских сценариев, четыре цифровых канала.",
      points: [
        { title: "VoC-дашборд", text: "Собрала метрики к плану, динамику, причины падения, события и отзывы в одно окно вместо 8+ разрозненных отчётов. Опросила и проинтервьюировала 20+ стейкхолдеров, вывела из их ответов сценарии и информационную архитектуру и защитила концепт перед C-level." },
        { title: "От макета до продукта с ИИ-агентами", text: "Довела дашборд от макета до рабочего приложения в одиночку при загрузке 30% вместе с ИИ-агентами: сверила с Figma 12 из 12 блоков, закрыла 52 замечания руководителей, покрыла код 1 260 автотестами." },
        { title: "Методика и доверие к цифрам", text: "Нашла 3 причины расхождения с отчётами ДКО и перевела дашборд на их методику, вынесла расчёт в интерфейс («Как считается») и подключила внутреннюю LLM банка, чтобы «Главный вывод» формировался автоматически." },
        { title: "UX-аудит и приоритизация", text: "Свела конкурентный анализ (Т-Банк, Точка, Озон), 3 500+ обращений клиентов и 170+ находок экспертного аудита мобильного B2B-приложения в единый бэклог. Построила модель приоритизации «тяжесть × охват × уверенность» для плана быстрых побед и крупных доработок и сузила 117 UX-проблем до 18 приоритетных." },
        { title: "Аудит экосистемы", text: "Пересобрала флоу экспорта выписки и другие сценарии по итогам аудита мобильной B2B-экосистемы, в котором выявила 20+ критических несоответствий." },
        { title: "Дизайн-ревью и прототипы", text: "Проверяю макеты перед релизом и гипотезы на ИИ-прототипах, чтобы ошибки ловились до разработки." },
        { title: "Коммуникация с руководством", text: "Свела VoC, продуктовые метрики и UX-находки в материалы для эскалаций уровня CEO-1. Презентацию, подготовленную в соавторстве, руководитель департамента назвал одной из лучших в истории подразделения." },
      ],
    },
    {
      role: "Senior UX Analyst",
      company: "Альфа-Банк",
      period: "май 2022 — дек 2025",
      about: null,
      points: [
        { title: "Миграция с легаси", text: "Выявила 50+ доработок нового интернет-банка для МСБ и корпоративных клиентов и довела их до бэклогов команд — VoC вернулся к прежним значениям за 8 недель." },
        { title: "Автоматизация аналитики", text: "Запустила анализ обратной связи на Python + LLM для 5 000+ обращений в месяц, ввела метрики качества разметки (точность классификации, поиск дублей) и сократила обработку с 14 до 2 дней — экономия 2M+ ₽ в год." },
        { title: "Единая приоритизация", text: "Свела 300+ проблем из колл-центра, чата, бизнес-поддержки и VoC в общий фреймворк приоритизации для 100+ продуктовых команд." },
        { title: "Data storytelling", text: "Связала релизы с динамикой удовлетворённости клиентов и защитила выводы перед C-level, чтобы продуктовые решения опирались на данные." },
      ],
    },
    {
      role: "Product Designer",
      company: "IonTrack",
      period: "апр 2021 — дек 2023 · стартап, частичная занятость",
      about: "Технологический стартап с собственной разработкой и патентами: железо и софт для анализа макро- и микроэлементов.",
      points: [
        { title: "Продукт с нуля", text: "Спроектировала мобильное приложение от информационной архитектуры и флоу до high-fidelity интерфейсов и прототипов." },
        { title: "Data-driven улучшения", text: "Провела 3 итерации юзабилити-тестов в Maze и внедрила 20+ улучшений — доля успешно пройденных сценариев выросла на 40%." },
        { title: "Дизайн-система", text: "Собрала библиотеку из 50+ компонентов Figma с дизайн-токенами и запустила дизайн и разработку параллельно." },
        { title: "Продуктовая стратегия", text: "Подготовила бизнес-план выхода в Канаду (unit-экономика, TAM/SAM/SOM) и привела стартап к партнёрству с YEDI University и 4M ₽ инвестиций." },
      ],
    },
    {
      role: "UX/UI Designer & CX/UX Researcher",
      company: "CrowdTesting",
      period: "авг 2021 — май 2022",
      about: "Агентство UX-исследований и дизайна; клиенты из B2B и B2C: Philip Morris, М.Видео, МегаФон, Yota, Касперский и др.",
      points: [
        { title: "Прототипы", text: "Собрала 20+ интерактивных прототипов в Figma с состояниями и edge-кейсами, чтобы решения проверялись до разработки." },
        { title: "Исследования", text: "Провела 20+ исследований (юзабилити-тесты, дневники, CJM, конкурентный анализ) и выявила 100+ UX-проблем. Разобрала 50+ сценариев B2B-кабинетов и дашбордов телеком-операторов и нашла 10+ продуктовых возможностей. Обновила CJM для 15M клиентов Philip Morris и собрала 250+ аналитических срезов." },
        { title: "Менторство", text: "Ввела в работу junior-дизайнеров и исследователей и стала для них ментором." },
      ],
    },
    {
      role: "Product Designer · проектно",
      company: "ModumLab",
      period: "мар 2022 — апр 2022",
      about: null,
      points: [
        { title: null, text: "Пересобрала интерфейсы и сценарии iOS-платформы для обучения: user stories, CJM, флоу, high-fidelity макеты и прототипы — довела до тестов и передачи в разработку." },
      ],
    },
    {
      role: "UX/UI Designer · фриланс",
      company: "EvilUnion",
      period: "окт 2020 — авг 2021",
      about: "Студия с внутренними проектами и внешними заказами.",
      points: [
        { title: null, text: "Спроектировала web- и mobile-интерфейсы для e-commerce, доставки еды и образовательной платформы, собрала 30+ компонентов Figma и нашла 40+ инсайтов на юзабилити-тестах." },
      ],
    },
    {
      role: "Системный аналитик",
      company: "TaskData",
      period: "окт 2019 — апр 2021",
      about: null,
      points: [
        { title: null, text: "Перевела бизнес-требования РусГидро и Рослесхоза в user stories, use cases и спецификации для frontend и backend, разобрала edge-кейсы enterprise-процессов и спроектировала часть интерфейсов." },
      ],
    },
  ],
  artifacts: [
    { label: "Журнал VoC-дашборда", href: "https://belovaaanya.github.io/voc-dashboard-releases/journal/", text: "путь дашборда от макета до продукта: решения, метрики, архитектура" },
    { label: "VoC B2B — релизы приложения", href: "https://belovaaanya.github.io/voc-dashboard-releases/", text: "десктопное приложение для продактов" },
  ],
  skills: [
    { group: "Продуктовый дизайн", items: "User flows, информационная архитектура, wireframes, high-fidelity UI, mobile и web, iOS HIG, Material Design, дизайн-системы и токены, BPMN / UML, handoff" },
    { group: "Figma", items: "Auto Layout, Components, Variants, Variables, Design Tokens, интерактивные прототипы" },
    { group: "Исследования", items: "Юзабилити-тесты (Maze), CustDev, интервью, CJM / UJM, JTBD, Service Blueprint, конкурентный анализ, root cause analysis, сегментация, pre/post-анализ, A/B-тесты (p-value, sample size)" },
    { group: "ИИ и аналитика", items: "ИИ-агенты в разработке, собственные скиллы для Claude — правила UX/UI и редактуры, по которым ИИ проектирует и ревьюит экраны, LLM-инсайты и саммари, промптинг, Python, R, Excel" },
    { group: "Метрики", items: "VoC, NPS, CES, Usage, Claim Rate, Contact Rate, Bounce Rate" },
    { group: "Инструменты", items: "Figma, Maze, Jira, Confluence, Python, LLM-инструменты" },
  ],
  education: [
    { title: "Университет ИТМО — магистратура", text: "Мультимедиа-технологии, дизайн и юзабилити · Дизайн человеко-компьютерных систем", period: "2020 — 2022" },
    { title: "СПбГУ — бакалавриат", text: "Прикладная математика и информатика, матмех", period: "2016 — 2020" },
  ],
  courses: [
    "UPROCK: Product Researcher & Designer",
    "Bang Bang Education: UX Design, Behavioral UX Design, Figma",
    "Евгений Иванов (ex-Сбер): UI-дизайн мобильных интерфейсов",
    "Альфа-Банк: CJM, количественные методы, UX-редактура, Data Driven подход в управлении CX, генеративный ИИ и промптинг",
  ],
  languages: "Русский — родной · Английский — Upper-Intermediate (B2)",
};

const cvEn = {
  lang: "en",
  ui: { back: "← Portfolio", download: "Download PDF", about: "About", experience: "Experience", artifacts: "Artifacts", skills: "Skills", education: "Education", courses: "Courses", languages: "Languages" },
  name: "Anna Belova",
  role: "Product Designer · B2B Fintech · Mobile & Web",
  location: "Saint Petersburg, Russia · open to remote, hybrid, travel and relocation",
  pdf: "assets/cv/anna-belova-cv-en.pdf",
  pdfName: "Anna_Belova_CV_EN.pdf",
  contacts: [
    { label: "belova.annya@gmail.com", href: "mailto:belova.annya@gmail.com" },
    { label: "Telegram: @belovannaaa", href: "https://t.me/belovannaaa" },
    { label: "Portfolio: belovaaanya.github.io", href: "https://belovaaanya.github.io/" },
  ],
  summary: [
    "I'm a product designer with 6 years in UX, including 4+ years in B2B fintech at Alfa-Bank, a banking ecosystem serving 2M+ business customers. I focus on enterprise products (payments, statements, authentication, navigation) and data visualization.",
    "I combine design, research and product analytics: I turn customer feedback and data into backlog-ready decisions, check their impact after release with pre/post analysis, and treat legal and technical constraints as part of the UX rather than a blocker.",
    "Right now I'm taking a Voice of Customer dashboard end-to-end, from stakeholder research and Figma design to a working app with LLM-generated insights, built together with AI agents.",
  ],
  experience: [
    {
      role: "Product Designer & Senior UX Analyst",
      company: "Alfa-Bank",
      period: "Jan 2026 — present",
      about: "B2B banking ecosystem: 2M+ business customers, 500+ user journeys, four digital channels.",
      points: [
        { title: "Voice of Customer dashboard", text: "Led discovery and UX/UI for a single dashboard that replaces 8+ disconnected reports, bringing targets, trends, root causes, incidents and customer comments into one view. Interviewed and surveyed 20+ stakeholders to define use cases and information architecture, and defended the concept to senior leadership." },
        { title: "From design to product with AI agents", text: "Designed and shipped the working dashboard as a solo designer at ~30% capacity, pairing with AI agents: matched 12 of 12 blocks to the Figma design, resolved all 52 leadership review comments and covered the code with 1,260 automated tests." },
        { title: "Trustworthy numbers", text: "Traced 3 causes of mismatch with the official CX reports and aligned the dashboard with their methodology, exposing the calculation in the UI and adding an LLM-generated key takeaway via the bank's internal model." },
        { title: "UX audit & prioritization", text: "Combined a competitor analysis of leading business banking apps with 3,500+ customer feedback items and 170+ expert audit findings into a single backlog for the B2B mobile app, then built a severity × reach × confidence prioritization model, narrowing 117 UX issues down to a top-18 roadmap of quick wins and major improvements." },
        { title: "Ecosystem audit", text: "Audited the B2B mobile ecosystem and redesigned the statement export flow and other journeys, flagging 20+ critical UX/UI inconsistencies." },
        { title: "Design reviews & prototyping", text: "Review designs before release and validate hypotheses with AI-assisted interactive prototypes, catching issues before development." },
        { title: "Executive communication", text: "Turned VoC, product metrics and UX findings into briefs for CEO-1 escalations; the department head called a presentation I co-authored one of the best in the department's history." },
      ],
    },
    {
      role: "Senior UX Analyst",
      company: "Alfa-Bank",
      period: "May 2022 — Dec 2025",
      about: null,
      points: [
        { title: "Legacy migration", text: "Identified 50+ fixes for the new SME and corporate internet bank and got them into product backlogs, bringing customer satisfaction back to benchmark within 8 weeks of migration." },
        { title: "Feedback automation", text: "Led a Python + LLM pilot that analyzes 5,000+ customer tickets a month, set up labeling quality metrics (classification accuracy, duplicate detection) and cut processing time from 14 to 2 days, saving ₽2M+ a year." },
        { title: "Shared prioritization", text: "Consolidated 300+ friction points from the call center, chat, business support and VoC into one prioritization framework used by 100+ product teams." },
        { title: "Data storytelling", text: "Tracked how releases moved customer satisfaction and presented the trends to C-level, turning UX insights into inputs for product decisions." },
      ],
    },
    {
      role: "Product Designer",
      company: "IonTrack",
      period: "Apr 2021 — Dec 2023 · startup, part-time",
      about: "Hardware + software startup with patented technology for macro- and micronutrient analysis.",
      points: [
        { title: "0 to 1", text: "Designed a mobile product from scratch, from information architecture and core flows to high-fidelity UI and interactive prototypes." },
        { title: "Iterative testing", text: "Ran 3 rounds of usability testing in Maze and shipped 20+ UX improvements, raising task completion by 40%." },
        { title: "Design system", text: "Built and documented a library of 50+ Figma components with design tokens, enabling design and development to run in parallel." },
        { title: "Go-to-market", text: "Prepared the Canada market-entry plan (unit economics, TAM/SAM/SOM), leading to a partnership with YEDI University and ₽4M in funding." },
      ],
    },
    {
      role: "UX/UI Designer & CX/UX Researcher",
      company: "CrowdTesting",
      period: "Aug 2021 — May 2022",
      about: "UX research and design agency; B2B and B2C clients incl. Philip Morris, M.Video, MegaFon, Yota and Kaspersky.",
      points: [
        { title: "Prototyping", text: "Built 20+ high-fidelity interactive prototypes in Figma with full states and edge cases, so solutions were tested before development." },
        { title: "Research", text: "Delivered 20+ studies (usability tests, diary studies, journey mapping, competitive analysis), uncovering 100+ UX issues. Benchmarked 50+ B2B account and dashboard flows of telecom operators, surfacing 10+ product opportunities, and updated the CJM for Philip Morris's 15M customers with 250+ analytical cuts." },
        { title: "Mentoring", text: "Onboarded and mentored junior designers and researchers." },
      ],
    },
    {
      role: "Product Designer · project-based",
      company: "ModumLab",
      period: "Mar 2022 — Apr 2022",
      about: null,
      points: [
        { title: null, text: "Redesigned an iOS learning platform: user stories, journey maps, detailed flows, high-fidelity UI and prototypes, ready for usability testing and developer handoff." },
      ],
    },
    {
      role: "UX/UI Designer · freelance",
      company: "EvilUnion",
      period: "Oct 2020 — Aug 2021",
      about: "Design studio with in-house and client projects.",
      points: [
        { title: null, text: "Designed web and mobile experiences for e-commerce, food delivery and education products end-to-end, building 30+ reusable Figma components and surfacing 40+ UX insights through usability testing." },
      ],
    },
    {
      role: "System Analyst",
      company: "TaskData",
      period: "Oct 2019 — Apr 2021",
      about: null,
      points: [
        { title: null, text: "Translated business needs into user stories, use cases and specs for frontend and backend teams on enterprise projects (RusHydro, Rosleskhoz), mapping edge cases and technical constraints and designing UI for selected tasks." },
      ],
    },
  ],
  artifacts: [
    { label: "VoC dashboard journal", href: "https://belovaaanya.github.io/voc-dashboard-releases/journal/", text: "how the dashboard went from mockup to product: decisions, metrics, architecture (in Russian)" },
    { label: "VoC B2B releases", href: "https://belovaaanya.github.io/voc-dashboard-releases/", text: "desktop app for product managers" },
  ],
  skills: [
    { group: "Product design", items: "User flows, information architecture, wireframing, high-fidelity UI, mobile & web, iOS HIG, Material Design, design systems & tokens, BPMN / UML, developer handoff" },
    { group: "Figma", items: "Auto Layout, Components, Variants, Variables, Design Tokens, interactive prototyping" },
    { group: "Research", items: "Usability testing (Maze), customer interviews, CJM / UJM, JTBD, service blueprints, competitive analysis, root cause analysis, segmentation, pre/post analysis, A/B testing (p-value, sample size)" },
    { group: "AI & analytics", items: "AI agents in development, custom Claude skills that encode my UX, UI and UX writing rules for designing and reviewing screens, LLM insights & summaries, prompting, Python, R, Excel" },
    { group: "Metrics", items: "VoC, NPS, CES, Usage, Claim Rate, Contact Rate, Bounce Rate" },
    { group: "Tools", items: "Figma, Maze, Jira, Confluence, Python, LLM tools" },
  ],
  education: [
    { title: "ITMO University — Master's degree", text: "Multimedia Technologies, Design & Usability · Human-Computer Systems Design", period: "2020 — 2022" },
    { title: "Saint Petersburg State University — Bachelor's degree", text: "Applied Mathematics and Computer Science", period: "2016 — 2020" },
  ],
  courses: [
    "UPROCK: Product Researcher & Designer",
    "Bang Bang Education: UX Design, Behavioral UX Design, Figma",
    "Evgeny Ivanov (ex-Sber): UI Design for Mobile Interfaces",
    "Alfa-Bank: Customer Journey Mapping, Quantitative Research Methods, UX Writing, Data-Driven CX Management, Generative AI & Prompt Engineering",
  ],
  languages: "English — Upper-Intermediate (B2) · Russian — native",
};

export const cv = { ru: cvRu, en: cvEn };
