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
  contactTitle: "Свяжитесь со мной",
  actions: [
    { label: "Смотреть CV", href: "https://drive.google.com/file/d/1Leu2IMuaoQ2Q-Z0E0Wx5vSA7uhreS-Vx/view?usp=sharing", variant: "ghost", inHeader: true },
    { label: "Написать по почте", href: "#", variant: "ghost" }, // TODO: mailto: real email
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
    tags: ["Health-Tech", "0 to 1", "Design System"],
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
