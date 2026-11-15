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
    "6 лет в UX, из них 4 года — в B2B-финтехе Альфа-Банка (экосистема для 2M+ бизнес-клиентов). Специализируюсь на Enterprise-продуктах, сложных B2B-сценариях и визуализации данных.",
    "Проектирую mobile- и web-интерфейсы на стыке дизайна, исследований и продуктовой аналитики: превращаю обратную связь клиентов и данные в понятные решения, а юридические и технические ограничения — в часть UX, а не барьер.",
    "Сейчас проектирую и сама собираю VoC-дашборд для продуктовых команд и C-level, в паре с ИИ-агентами: от исследования и макета в Figma до рабочего приложения с LLM-выводами.",
  ],
  experience: [
    {
      role: "Product Designer & Senior UX Analyst",
      company: "Альфа-Банк",
      period: "янв 2026 — сейчас",
      about: "B2B-экосистема банка: 2M+ бизнес-клиентов, четыре цифровых канала.",
      points: [
        { title: "VoC-дашборд", text: "Веду discovery и UX/UI централизованного дашборда клиентской обратной связи: метрики к плану, динамика, причины падения, события и отзывы в одном окне вместо 8+ разрозненных отчётов. Провела интервью и опросы 20+ стейкхолдеров (Q2: опрос 19 продактов, 5 интервью), определила сценарии, структуру и информационную архитектуру. Защитила концепт перед руководителем высшего звена." },
        { title: "От макета до продукта с ИИ-агентами", text: "Сама собрала рабочий дашборд по своему макету, работая с ИИ-агентами примерно на 30% времени: 12 из 12 блоков сверены с Figma, 1 260 автотестов, закрыты 52 замечания руководителей. «Главный вывод» формирует внутренняя LLM банка; методика расчёта показана прямо в интерфейсе («Как считается»). Сверила цифры с отчётами ДКО и перевела дашборд на их методику." },
        { title: "UX-аудит и редизайн", text: "Провела аудит мобильной B2B-экосистемы: на основе конкурентного анализа, обратной связи и динамики VoC выявила 20+ критических несоответствий и спроектировала улучшенный флоу экспорта выписки и других ключевых сценариев." },
        { title: "Дизайн-ревью и прототипы", text: "Проверяю макеты перед релизом на юзабилити и консистентность; собираю интерактивные прототипы с помощью ИИ, чтобы проверять гипотезы до полноценной разработки." },
      ],
    },
    {
      role: "Senior UX Analyst",
      company: "Альфа-Банк",
      period: "май 2022 — дек 2025",
      about: null,
      points: [
        { title: "Миграция с легаси", text: "Выявила 50+ ключевых доработок новой версии интернет-банка для МСБ и корпоративных клиентов; они вошли в бэклоги продуктовых команд, и VoC вернулся к прежним значениям за 8 недель после миграции." },
        { title: "Автоматизация аналитики", text: "Запустила пилот анализа обратной связи на Python + LLM: 5 000+ обращений в месяц, срок обработки сократился с 14 до 2 дней, экономия 2M+ ₽ в год." },
        { title: "Единая приоритизация", text: "Свела 300+ ключевых проблем из разных каналов (колл-центр, чат, бизнес-поддержка, VoC) в общий фреймворк приоритизации для 100+ продуктовых команд." },
        { title: "Data storytelling", text: "Регулярно оценивала влияние релизов на удовлетворённость клиентов, упаковывала UX-инсайты в презентации и защищала тренды перед C-level." },
      ],
    },
    {
      role: "Product Designer",
      company: "IonTrack",
      period: "апр 2021 — дек 2023 · стартап, частичная занятость",
      about: "Технологический стартап с собственной разработкой и патентами: железо и софт для анализа макро- и микроэлементов.",
      points: [
        { title: "Продукт с нуля", text: "Спроектировала мобильное приложение: информационная архитектура, ключевые флоу, high-fidelity интерфейсы и интерактивные прототипы." },
        { title: "Data-driven улучшения", text: "Провела 3 итерации юзабилити-тестов в Maze и внедрила 20+ улучшений — успешное прохождение ключевых сценариев выросло на 40%." },
        { title: "Дизайн-система", text: "Собрала и задокументировала библиотеку из 50+ компонентов Figma с дизайн-токенами для параллельной работы дизайна и разработки." },
        { title: "Продуктовая стратегия", text: "Подготовила бизнес-план выхода на рынок Канады (unit-экономика, TAM/SAM/SOM): партнёрство с YEDI University и 4M ₽ инвестиций. Презентовала продукт на отраслевых мероприятиях." },
      ],
    },
    {
      role: "UX/UI Designer & CX/UX Researcher",
      company: "CrowdTesting",
      period: "авг 2021 — май 2022",
      about: "Агентство UX-исследований и дизайна; клиенты из B2B и B2C: Philip Morris, М.Видео, МегаФон, Yota, Касперский и др.",
      points: [
        { title: "Прототипы", text: "Создала 20+ интерактивных прототипов в Figma с состояниями и edge-кейсами для тестирования до разработки." },
        { title: "Исследования", text: "Провела 20+ исследований (юзабилити-тесты, дневниковые исследования, CJM, конкурентный анализ), выявила 100+ UX-проблем. Проанализировала 50+ сценариев B2B-кабинетов и дашбордов конкурентов. Актуализировала CJM для 15M клиентов Philip Morris." },
        { title: "Менторство", text: "Онбордила и менторила junior-дизайнеров и исследователей." },
      ],
    },
    {
      role: "Product Designer · проектно",
      company: "ModumLab",
      period: "мар 2022 — апр 2022",
      about: null,
      points: [
        { title: null, text: "Редизайн и новые сценарии iOS-платформы для обучения: user stories, CJM, детальные флоу, high-fidelity интерфейсы и прототипы для тестов и передачи в разработку." },
      ],
    },
    {
      role: "UX/UI Designer · фриланс",
      company: "EvilUnion",
      period: "окт 2020 — авг 2021",
      about: "Студия с внутренними проектами и внешними заказами.",
      points: [
        { title: null, text: "Спроектировала web- и mobile-интерфейсы для e-commerce, доставки еды и образовательной платформы — от информационной архитектуры до финальных макетов. Собрала 30+ компонентов Figma, протестировала ключевые флоу и нашла 40+ инсайтов для улучшения UX." },
      ],
    },
    {
      role: "Системный аналитик",
      company: "TaskData",
      period: "окт 2019 — апр 2021",
      about: null,
      points: [
        { title: null, text: "Переводила бизнес-требования в user stories, use cases и спецификации для frontend- и backend-разработки (проекты РусГидро, Рослесхоз); разбирала edge-кейсы и ограничения enterprise-процессов, делала UI для отдельных задач." },
      ],
    },
  ],
  artifacts: [
    { label: "Журнал VoC-дашборда", href: "https://belovaaanya.github.io/voc-dashboard-releases/journal/", text: "Как дашборд вырос из макета в продукт: решения, метрики, архитектура, что дальше" },
    { label: "VoC B2B — релизы приложения", href: "https://belovaaanya.github.io/voc-dashboard-releases/", text: "Десктопное приложение для продактов" },
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
