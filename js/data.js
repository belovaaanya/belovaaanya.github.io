// ─────────────────────────────────────────────────────────────────────────
//  Portfolio content — EDIT HERE to swap copy, tags, links, images.
//
//  title:  plain string; wrap the accent fragment in **double asterisks**.
//  accent: color of that highlighted fragment.
//  client: small italic line under the title (Rubik); null to omit.
//  tags:   array of short labels; [] to omit the tag row.
//  body:   array of blocks. { h, t } renders a bold heading + muted body;
//          { t } alone renders a muted paragraph.
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
  photo: "assets/bio/photo.png",
  tags: [
    { label: "CV", href: "#" },
    { label: "TG", href: "#" },
  ],
  text:
    "Product Designer and UX Analyst with 5+ years of experience specializing in " +
    "B2B enterprise ecosystems, systemic design, and customer experience. Adept at " +
    "translating complex data and Voice of Customer (VoC) into intuitive interfaces " +
    "and strategic business solutions",
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
        { src: "assets/alfa/dashboard.png", box: [38, 30, 894, 497], radius: 0, crop: null },
      ],
    },
    body: [
      { h: "Контекст", t: "100+ продуктовых команд работали с тысячами обращений клиентов, но для подготовки продуктовых выводов UX-аналитикам приходилось вручную собирать и анализировать данные" },
      { h: "Что сделала", t: "Провела CustDev с продуктовыми командами, изучила частотные запросы к UX-аналитикам и выявила ключевые сценарии использования данных. На основе исследований спроектировала централизованный VoC Dashboard с метриками, инсайтами и возможностью быстро переходить от общей картины к конкретным обращениям" },
      { h: "Результат", t: "Сократила объём ручной аналитики, объединила клиентскую обратную связь в единый инструмент и упростила принятие продуктовых решений" },
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
        { src: "assets/iontrack/main.png", box: [0, -1, 691, 532], radius: 40, crop: [-0.3, -0.04, 150.09, 106.66] },
        { src: "assets/iontrack/main.png", box: [714, 7, 246, 524], radius: 34, crop: [-290.82, -5.53, 431.56, 110.93] },
        { src: "assets/iontrack/phone.png", box: [704, 0, 265.545, 540.862], radius: 0, crop: null },
      ],
    },
    body: [
      { h: "Контекст", t: "У стартапа была запатентованная технология диагностики, но отсутствовал цифровой продукт, через который пользователи могли бы взаимодействовать с устройством и получать результаты исследований" },
      { h: "Что сделала", t: "Спроектировала мобильное приложение с нуля, разработала дизайн-систему из 30+ компонентов и провела две итерации юзабилити-тестирования в Maze до начала разработки" },
      { h: "Результат", t: "Помогла подтвердить инвестиционную привлекательность продукта: проект привлёк 4 млн ₽, а также заключил партнёрство с YEDI University" },
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
        { src: "assets/corgi/main.png", box: [0, 8, 955, 523], radius: 0, crop: null },
      ],
    },
    body: [
      { h: "Контекст", t: "Интерфейс одновременно обслуживал брокеров и андеррайтеров, из-за чего был перегружен для новых пользователей и замедлял работу опытных специалистов. Дополнительно бизнесу не хватало современного визуального образа продукта" },
      { h: "Что сделала", t: "Переработала информационную архитектуру на основе пользовательских ролей. Добавила Smart Header со статусом заявки по воронке, вынесла ключевую информацию в ленту заявок без дополнительных переходов и обновила визуальный стиль платформы" },
      { h: "Результат", t: "Снизила когнитивную нагрузку, сократила количество лишних действий в основных сценариях и сделала интерфейс ближе к ожиданиям пользователей и бизнеса" },
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
        { src: "assets/drinkit/main.png", box: [0, 0, 970, 656], radius: 0, crop: [0, -4.14, 100, 109.2] },
      ],
    },
    body: [
      { h: "Контекст", t: "Новым пользователям было сложно выбрать первый напиток, а бизнесу требовалось получать больше данных для персонализации рекомендаций" },
      { h: "Что сделала", t: "Изучила более 10 конкурентов, провела UX-тестирование прототипов и спроектировала онбординг по модели self-select, позволяющей естественно собирать предпочтения пользователя ещё до первого заказа" },
      { h: "Результат", t: "Увеличила конверсию в добавление напитка в корзину на 3%, одновременно упростив первый опыт использования приложения" },
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
        { src: "assets/streaming/main.png", box: [-13, -3, 997, 546], radius: 0, crop: null },
      ],
    },
    body: [
      { t: "Разработала концепцию стримингового сервиса, в которой пользователь быстрее переходит от выбора фильма к просмотру" },
      { t: "Опираясь на лучшие практики Netflix и HBO Max, выстроила навигацию вокруг пользовательских сценариев и усилила главный экран как основную точку принятия решения" },
    ],
  },
  {
    id: "ecommerce",
    tags: ["UI Concept", "Retail"],
    title: "Сократила путь от поиска до **покупки**",
    accent: "#80ff82",
    client: null,
    img: {
      w: 970, h: 539, bg: "#171719", radius: 32,
      layers: [
        { src: "assets/ecommerce/main.png", box: [122, -2, 726, 541], radius: 32, crop: [-19.54, -0.04, 135.47, 100.08] },
      ],
    },
    body: [
      { t: "Исследовала, как визуальный поиск и поиск по штрихкоду могут сократить путь пользователя от поиска товара до покупки" },
      { t: "Спроектировала мобильный сценарий с быстрым поиском, удобными карточками товаров и ускоренным оформлением заказа, используя лучшие практики ведущих e-commerce продуктов" },
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
        { src: "assets/illustrations/p259.png", box: [342.33, 0, 285.343, 329.826], radius: 32, crop: [-1.66, 0, 103.29, 118.77] },
        { src: "assets/illustrations/p254.png", box: [639.92, 0, 330.081, 330.081], radius: 32, crop: null },
        { src: "assets/illustrations/p255.png", box: [641, 342, 329, 307], radius: 32, crop: [0, 0, 100, 107.34] },
        { src: "assets/illustrations/p256.png", box: [343, 342, 286, 307], radius: 32, crop: [-5.43, -3.82, 115.99, 103.68] },
        { src: "assets/illustrations/p257.png", box: [0, 342, 331, 307], radius: 32, crop: [0, -2.15, 100.05, 107.87] },
        { src: "assets/illustrations/p258.png", box: [0, 0, 330.081, 330.081], radius: 32, crop: null },
      ],
    },
    body: [
      { t: "Помимо продуктового дизайна создаю иллюстрации и стикерпаки, в которых исследую атмосферу, композицию и визуальное повествование" },
      { t: "Мои работы выпускались совместно с No Kids Stickers (NKS) — брендом с аудиторией более 400 000 подписчиков" },
    ],
  },
];
