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
    "Продуктовый дизайнер с 6-летним опытом в UX. Проектирую сложные B2B-продукты " +
    "на стыке дизайна, исследований и аналитики данных. Помогаю превращать " +
    "пользовательские инсайты в продуктовые решения",
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
      "Спроектировала VoC Dashboard для продуктовых команд и C-level, объединив клиентскую обратную связь, продуктовые и UX-метрики в единый инструмент для принятия решений",
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
      "Спроектировала мобильное приложение, дизайн-систему и пользовательский опыт, помогая подготовить продукт к привлечению инвестиций и выходу на рынок",
    ],
  },
  {
    id: "corgi",
    tags: ["InsurTech", "B2B SaaS", "Redesign"],
    title: "Разделила сложные страховые процессы **по ролям**",
    accent: "#ff6b48",
    client: "Corgi Insurance Services",
    img: {
      w: 970, h: 539, bg: "#ff6b48", radius: 32,
      layers: [
        { src: "assets/corgi/main.webp", box: [0, 8, 955, 523], radius: 0, crop: null },
      ],
    },
    summary: [
      "Перестроила информационную архитектуру платформы для брокеров и андеррайтеров, сделав сложные страховые сценарии понятнее для новых пользователей и быстрее для опытных специалистов",
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
      "Исследовала пользовательские сценарии и спроектировала онбординг, который помогает быстрее выбрать первый напиток и одновременно собирает данные для персональных рекомендаций",
    ],
  },
  {
    id: "streaming",
    tags: ["UI Concept", "Entertainment"],
    title: "Сократила путь до просмотра",
    accent: null,
    client: null,
    img: {
      w: 970, h: 539, bg: null, radius: 32,
      layers: [
        { src: "assets/streaming/main.webp", box: [-13, -3, 997, 546], radius: 0, crop: null },
      ],
    },
    summary: [
      "Исследовала лучшие практики стриминговых сервисов и спроектировала интерфейс, который помогает быстрее принять решение и начать просмотр",
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
      "Исследовала сценарии визуального поиска и поиска по штрихкоду, спроектировав интерфейс, который ускоряет выбор товара и оформление заказа",
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
      "Помимо продуктового дизайна создаю иллюстрации и стикерпаки, в которых исследую атмосферу, композицию и визуальное повествование",
      "Мои работы выпускались совместно с No Kids Stickers (NKS) — брендом с аудиторией более 400 000 подписчиков",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
//  CV page (cv.html, rendered by js/cv.js). Merged from the RU + EN PDF CVs.
//  pdf:          the downloadable file behind «Скачать PDF». It is a static file
//                generated from this page — rebuild it after editing this object:
//                `node tools/build-cv-pdf.mjs` (see README).
//  experience[].points: { title, text } — title is the bold lead-in (may be null).
// ─────────────────────────────────────────────────────────────────────────

export const cv = {
  name: "Анна Белова",
  role: "Продуктовый дизайнер · B2B-финтех · Mobile & Web",
  location: "Санкт-Петербург · удалённо, гибрид, командировки, релокация",
  pdf: "assets/cv/anna-belova-cv.pdf",
  pdfName: "Anna_Belova_CV.pdf",
  contacts: [
    { label: "belova.annya@gmail.com", href: "mailto:belova.annya@gmail.com" },
    { label: "Telegram: @belovannaaa", href: "https://t.me/belovannaaa" },
    { label: "Портфолио: belovaaanya.github.io", href: "https://belovaaanya.github.io/" },
  ],
  summary: [
    "Продуктовый дизайнер: 6 лет в UX, из них 4 года в B2B-финтехе Альфа-Банка (2M+ бизнес-клиентов). Enterprise-продукты, сложные B2B-сценарии, визуализация данных.",
    "Соединяю дизайн, исследования и продуктовую аналитику: перевожу обратную связь клиентов и данные в решения для бэклога, а юридические и технические ограничения встраиваю в UX, чтобы они не становились барьером.",
    "Сейчас довожу VoC-дашборд для продактов и C-level от исследования и макета в Figma до рабочего приложения с LLM-выводами, работая в паре с ИИ-агентами.",
  ],
  experience: [
    {
      role: "Product Designer & Senior UX Analyst",
      company: "Альфа-Банк",
      period: "янв 2026 — сейчас",
      about: "B2B-экосистема банка: 2M+ бизнес-клиентов, четыре цифровых канала.",
      points: [
        { title: "VoC-дашборд", text: "Собрала метрики к плану, динамику, причины падения, события и отзывы в одно окно вместо 8+ разрозненных отчётов. Опросила и проинтервьюировала 20+ стейкхолдеров, вывела из этого сценарии и информационную архитектуру и защитила концепт перед руководителем высшего звена." },
        { title: "От макета до продукта с ИИ-агентами", text: "Довела дашборд от макета до рабочего приложения силами одного дизайнера на 30% времени с ИИ-агентами: сверила с Figma 12 из 12 блоков, закрыла 52 замечания руководителей, покрыла код 1 260 автотестами." },
        { title: "Методика и доверие к цифрам", text: "Нашла 3 причины расхождения с отчётами ДКО и перевела дашборд на их методику, вынесла расчёт в интерфейс («Как считается») и подключила внутреннюю LLM банка, чтобы «Главный вывод» формировался автоматически." },
        { title: "UX-аудит", text: "Провела аудит мобильной B2B-экосистемы и выявила 20+ критических несоответствий, пересобрала флоу экспорта выписки и другие ключевые сценарии." },
        { title: "Дизайн-ревью и прототипы", text: "Проверяю макеты перед релизом и гипотезы на ИИ-прототипах, чтобы ошибки ловились до разработки." },
      ],
    },
    {
      role: "Senior UX Analyst",
      company: "Альфа-Банк",
      period: "май 2022 — дек 2025",
      about: null,
      points: [
        { title: "Миграция с легаси", text: "Выявила 50+ ключевых доработок нового интернет-банка для МСБ и корпоративных клиентов и довела их до бэклогов команд — VoC вернулся к прежним значениям за 8 недель." },
        { title: "Автоматизация аналитики", text: "Запустила анализ обратной связи на Python + LLM для 5 000+ обращений в месяц и сократила обработку с 14 до 2 дней — экономия 2M+ ₽ в год." },
        { title: "Единая приоритизация", text: "Свела 300+ ключевых проблем из колл-центра, чата, бизнес-поддержки и VoC в общий фреймворк приоритизации для 100+ продуктовых команд." },
        { title: "Data storytelling", text: "Связала релизы с динамикой удовлетворённости клиентов и защищала тренды перед C-level, чтобы продуктовые решения принимались на данных." },
      ],
    },
    {
      role: "Product Designer",
      company: "IonTrack",
      period: "апр 2021 — дек 2023 · стартап, частичная занятость",
      about: "Технологический стартап с собственной разработкой и патентами: железо и софт для анализа макро- и микроэлементов.",
      points: [
        { title: "Продукт с нуля", text: "Спроектировала мобильное приложение от информационной архитектуры и ключевых флоу до high-fidelity интерфейсов и прототипов." },
        { title: "Data-driven улучшения", text: "Провела 3 итерации юзабилити-тестов в Maze и внедрила 20+ улучшений — доля успешно пройденных ключевых сценариев выросла на 40%." },
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
        { title: "Исследования", text: "Провела 20+ исследований (юзабилити-тесты, дневники, CJM, конкурентный анализ) и выявила 100+ UX-проблем. Разобрала 50+ сценариев B2B-кабинетов конкурентов и обновила CJM для 15M клиентов Philip Morris." },
        { title: "Менторство", text: "Онбордила и менторила junior-дизайнеров и исследователей." },
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
        { title: null, text: "Спроектировала web- и mobile-интерфейсы для e-commerce, доставки еды и образовательной платформы, собрала 30+ компонентов Figma и нашла 40+ инсайтов на тестах ключевых флоу." },
      ],
    },
    {
      role: "Системный аналитик",
      company: "TaskData",
      period: "окт 2019 — апр 2021",
      about: null,
      points: [
        { title: null, text: "Перевела бизнес-требования РусГидро и Рослесхоза в user stories, use cases и спецификации для frontend и backend, разобрала edge-кейсы enterprise-процессов и сделала UI для отдельных задач." },
      ],
    },
  ],
  artifacts: [
    { label: "Журнал VoC-дашборда", href: "https://belovaaanya.github.io/voc-dashboard-releases/journal/", text: "путь дашборда от макета до продукта: решения, метрики, архитектура" },
    { label: "VoC B2B — релизы приложения", href: "https://belovaaanya.github.io/voc-dashboard-releases/", text: "десктопное приложение для продактов" },
  ],
  skills: [
    { group: "Продуктовый дизайн", items: "User flows, информационная архитектура, wireframes, high-fidelity UI, mobile и web, iOS HIG, Material Design, дизайн-системы и токены, handoff" },
    { group: "Figma", items: "Auto Layout, Components, Variants, Variables, Design Tokens, интерактивные прототипы" },
    { group: "Исследования", items: "Юзабилити-тесты (Maze), CustDev, интервью, CJM / UJM, JTBD, конкурентный анализ, A/B-тесты (p-value, sample size)" },
    { group: "ИИ и аналитика", items: "ИИ-агенты в разработке, LLM-инсайты и саммари, промптинг, Python, R, Excel" },
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
