// All visible text, per language. English is the source; the other languages
// must provide the same keys (TypeScript checks this).

export type Lang = 'en' | 'ru' | 'kk';

export const LANGUAGES: { code: Lang; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'kk', label: 'KZ', name: 'Қазақша' },
];

const en = {
  name: 'Alibek Khakim',
  greeting: "Hi, I'm Alibek Khakim.",
  roles: ['Full-stack developer', 'Game developer', '3D designer'],
  intro:
    "I'm a full-stack developer, game developer, and 3D designer building thoughtful web, mobile, and interactive experiences. A software development graduate of the College of Astana IT University, I now lead my own game team in the Astana Hub GamePreneurs program.",
  about: [
    'A graduate of the College of Astana IT University in software development, I work across the full product journey—from database design and backend architecture to polished user interfaces. I also create games and 3D experiences with Unity.',
    "I'm currently pursuing Machine Learning at QAIRU University (2026–2029), with a focus on AI-driven tools for education and personalized learning. I'm always open to collaborating on meaningful EdTech and AI projects.",
    "Right now I'm leading my own team in the Astana Hub GamePreneurs program, where we're building a game that we plan to release on Steam and other platforms.",
  ],

  nav: { home: 'Home', projects: 'Projects', contact: 'Contact', main: 'Main' },
  language: 'Language',
  toLight: 'Switch to light theme',
  toDark: 'Switch to dark theme',
  soundOff: 'Turn sounds off',
  soundOn: 'Turn sounds on',

  viewWork: 'View my work',
  getInTouch: 'Get in touch',
  featured: 'Featured projects',
  allProjects: 'All projects',
  aboutTitle: 'About me',
  downloadCv: 'Download CV',
  stackTitle: 'Tech stack',
  contactLabel: 'Contact',
  contactTitle: "Let's build something together.",
  contactLead:
    'Open to collaborating on meaningful EdTech and AI projects. Message me wherever is easiest for you.',

  projectsTitle: 'Projects',
  projectsLead: 'A collection of my recent work.',
  loadingProjects: 'Loading projects…',
  noProjects: 'No projects published yet.',
  filterLabel: 'Filter by technology',
  filterAll: 'All',
  viewProject: 'View project',

  loading: 'Loading…',
  projectNotFound: 'Project not found',
  projectNotFoundLead: 'It may have been removed or renamed.',
  backToProjects: 'Back to projects',
  liveDemo: 'Live demo',
  sourceCode: 'Source code',
  aboutProject: 'About this project',
  builtWith: 'Built with',

  pageNotFound: 'Page not found',
  pageNotFoundLead: 'There is nothing at this address.',
  backHome: 'Back to home',

  skillGroups: {
    languages: 'Languages',
    frameworks: 'Frameworks & Libraries',
    databases: 'Databases',
    gamedev: 'Game Development',
    design: 'Design & Creative Tools',
    tools: 'Tools & Platforms',
  },

  // Text for the bundled projects in src/data/projects.ts, keyed by project id.
  projects: {
    spacebird: {
      title: 'Spacebird',
      status: 'In development',
      shortDescription:
        'A 3D space survival and building game made in Godot: play as a robot drifting in orbit, gather resources, craft parts and build your ship.',
      fullDescription:
        'Spacebird is a first-person 3D game set in an orbital debris field. You play as a robot in zero gravity: scan for resources, collect scrap, and craft tools, equipment and building parts from the inventory.\n\nParts snap together into a ship with its own power system, while a mechanical snake roams the level as the enemy. The game has Survival and Creative modes, saved worlds and a diegetic helmet-style interface.',
    },
    'gaming-cafe-booking': {
      title: 'Gaming Café Booking',
      status: 'Front-end prototype',
      shortDescription:
        'Seat booking for a computer club: pick a seat on an interactive floor map, choose a tariff package, get a booking code.',
      fullDescription:
        'A booking flow for a computer club. Visitors choose an arrival time, pick up to five seats on an interactive map of both floors, and then select a tariff — hourly packages or time-of-day packages priced per seat zone.\n\nPackages are disabled automatically when their time window has passed or a seat is already taken inside the interval. An admin view lists bookings and lets staff approve or cancel them.',
    },
    portfolio: {
      title: 'Portfolio',
      status: 'In progress',
      shortDescription:
        'This site: a personal portfolio with a project catalogue served by its own API.',
      fullDescription:
        'The site you are looking at. The client is a React and TypeScript single-page app; projects come from an Express API backed by PostgreSQL through Prisma, with a JWT-protected admin area. When the API is offline the client falls back to a bundled project list, so it can also be hosted as a static site.',
    },
  } as Record<string, ProjectText>,
};

export interface ProjectText {
  title: string;
  status: string;
  shortDescription: string;
  fullDescription: string;
}

export type Dictionary = typeof en;

const ru: Dictionary = {
  name: 'Алибек Хаким',
  greeting: 'Привет, я Алибек Хаким.',
  roles: ['Full-stack разработчик', 'Разработчик игр', '3D-дизайнер'],
  intro:
    'Я full-stack разработчик, разработчик игр и 3D-дизайнер. Создаю продуманные веб-, мобильные и интерактивные проекты. За плечами — колледж Astana IT University по специальности «Разработка программного обеспечения», а сейчас я руковожу командой собственной игры в программе Astana Hub GamePreneurs.',
  about: [
    'После колледжа Astana IT University (специальность «Разработка программного обеспечения») я работаю над продуктом на всех этапах — от проектирования баз данных и серверной архитектуры до аккуратных интерфейсов. Ещё я создаю игры и 3D-проекты в Unity.',
    'Сейчас изучаю машинное обучение в университете QAIRU (2026–2029) с фокусом на ИИ-инструменты для образования и персонализированного обучения. С удовольствием присоединюсь к значимым EdTech- и ИИ-проектам.',
    'Прямо сейчас я руковожу собственной командой в программе Astana Hub GamePreneurs: мы делаем игру, которую планируем выпустить в Steam и на других платформах.',
  ],

  nav: { home: 'Главная', projects: 'Проекты', contact: 'Контакты', main: 'Основная навигация' },
  language: 'Язык',
  toLight: 'Включить светлую тему',
  toDark: 'Включить тёмную тему',
  soundOff: 'Выключить звуки',
  soundOn: 'Включить звуки',

  viewWork: 'Смотреть работы',
  getInTouch: 'Связаться',
  featured: 'Избранные проекты',
  allProjects: 'Все проекты',
  aboutTitle: 'Обо мне',
  downloadCv: 'Скачать резюме',
  stackTitle: 'Технологии',
  contactLabel: 'Контакты',
  contactTitle: 'Давайте сделаем что-нибудь вместе.',
  contactLead:
    'Жду предложений о сотрудничестве в EdTech- и ИИ-проектах. Пишите туда, где вам удобнее.',

  projectsTitle: 'Проекты',
  projectsLead: 'Подборка моих недавних работ.',
  loadingProjects: 'Загружаем проекты…',
  noProjects: 'Проектов пока нет.',
  filterLabel: 'Фильтр по технологии',
  filterAll: 'Все',
  viewProject: 'Смотреть проект',

  loading: 'Загрузка…',
  projectNotFound: 'Проект не найден',
  projectNotFoundLead: 'Возможно, его удалили или переименовали.',
  backToProjects: 'Назад к проектам',
  liveDemo: 'Демо',
  sourceCode: 'Исходный код',
  aboutProject: 'О проекте',
  builtWith: 'Технологии',

  pageNotFound: 'Страница не найдена',
  pageNotFoundLead: 'По этому адресу ничего нет.',
  backHome: 'На главную',

  skillGroups: {
    languages: 'Языки',
    frameworks: 'Фреймворки и библиотеки',
    databases: 'Базы данных',
    gamedev: 'Разработка игр',
    design: 'Дизайн и творческие инструменты',
    tools: 'Инструменты и платформы',
  },

  projects: {
    spacebird: {
      title: 'Spacebird',
      status: 'В разработке',
      shortDescription:
        '3D-игра про выживание и строительство в космосе на Godot: играйте за робота на орбите, собирайте ресурсы, создавайте детали и стройте корабль.',
      fullDescription:
        'Spacebird — 3D-игра от первого лица в поле орбитальных обломков. Вы играете за робота в невесомости: сканируете ресурсы, собираете металлолом и создаёте инструменты, оборудование и строительные детали прямо из инвентаря.\n\nДетали соединяются в корабль с собственной системой питания, а по уровню бродит враг — механическая змея. В игре есть режимы «Выживание» и «Творчество», сохранение миров и интерфейс в виде шлема.',
    },
    'gaming-cafe-booking': {
      title: 'Gaming Café Booking',
      status: 'Фронтенд-прототип',
      shortDescription:
        'Бронирование мест в компьютерном клубе: выберите место на интерактивной карте зала, подберите тариф и получите код брони.',
      fullDescription:
        'Сценарий бронирования для компьютерного клуба. Посетитель указывает время прихода, выбирает до пяти мест на интерактивной карте двух этажей, а затем тариф — почасовой пакет или пакет по времени суток, цена которого зависит от зоны места.\n\nПакеты автоматически становятся недоступны, если их время прошло или место уже занято в выбранном интервале. В админ-панели сотрудники видят брони и могут подтвердить или отменить их.',
    },
    portfolio: {
      title: 'Портфолио',
      status: 'В работе',
      shortDescription:
        'Этот сайт: личное портфолио с каталогом проектов, который отдаёт собственный API.',
      fullDescription:
        'Сайт, который вы сейчас смотрите. Клиент — одностраничное приложение на React и TypeScript; проекты приходят из API на Express с базой PostgreSQL через Prisma, а админ-зона защищена JWT. Если API недоступен, клиент показывает встроенный список проектов, поэтому сайт можно разместить и как статический.',
    },
  },
};

const kk: Dictionary = {
  name: 'Әлібек Хакім',
  greeting: 'Сәлем, мен Әлібек Хакім.',
  roles: ['Full-stack әзірлеуші', 'Ойын әзірлеуші', '3D дизайнер'],
  intro:
    'Мен full-stack әзірлеуші, ойын әзірлеуші және 3D дизайнермін. Ойластырылған веб, мобильді және интерактивті жобалар жасаймын. Astana IT University колледжін «Бағдарламалық қамтамасыз етуді әзірлеу» мамандығы бойынша бітірдім, қазір Astana Hub GamePreneurs бағдарламасында өз ойынымның командасын басқарамын.',
  about: [
    'Astana IT University колледжін «Бағдарламалық қамтамасыз етуді әзірлеу» мамандығы бойынша бітірдім. Өнімнің барлық кезеңінде жұмыс істеймін — дерекқорды жобалау мен серверлік архитектурадан бастап ұқыпты пайдаланушы интерфейстеріне дейін. Сондай-ақ Unity-де ойындар мен 3D жобалар жасаймын.',
    'Қазір QAIRU университетінде машиналық оқытуды оқып жатырмын (2026–2029), басты назарым — білім беруге және жекелендірілген оқытуға арналған ЖИ құралдары. Мағыналы EdTech және ЖИ жобаларында бірлесіп жұмыс істеуге әрқашан дайынмын.',
    'Дәл қазір Astana Hub GamePreneurs бағдарламасында өз командамды басқарып жатырмын: біз Steam-де және басқа платформаларда шығаруды жоспарлап отырған ойын жасап жатырмыз.',
  ],

  nav: { home: 'Басты бет', projects: 'Жобалар', contact: 'Байланыс', main: 'Негізгі навигация' },
  language: 'Тіл',
  toLight: 'Жарық тақырыпқа ауысу',
  toDark: 'Қараңғы тақырыпқа ауысу',
  soundOff: 'Дыбыстарды өшіру',
  soundOn: 'Дыбыстарды қосу',

  viewWork: 'Жұмыстарымды көру',
  getInTouch: 'Байланысу',
  featured: 'Таңдаулы жобалар',
  allProjects: 'Барлық жобалар',
  aboutTitle: 'Мен туралы',
  downloadCv: 'Түйіндемені жүктеу',
  stackTitle: 'Технологиялар',
  contactLabel: 'Байланыс',
  contactTitle: 'Бірге бір нәрсе жасайық.',
  contactLead:
    'Мағыналы EdTech және ЖИ жобаларында бірлесіп жұмыс істеуге дайынмын. Өзіңізге ыңғайлы жерге жазыңыз.',

  projectsTitle: 'Жобалар',
  projectsLead: 'Соңғы жұмыстарымның жинағы.',
  loadingProjects: 'Жобалар жүктелуде…',
  noProjects: 'Әзірге жобалар жоқ.',
  filterLabel: 'Технология бойынша сүзгі',
  filterAll: 'Барлығы',
  viewProject: 'Жобаны көру',

  loading: 'Жүктелуде…',
  projectNotFound: 'Жоба табылмады',
  projectNotFoundLead: 'Ол жойылған немесе атауы өзгертілген болуы мүмкін.',
  backToProjects: 'Жобаларға оралу',
  liveDemo: 'Демо',
  sourceCode: 'Бастапқы код',
  aboutProject: 'Жоба туралы',
  builtWith: 'Қолданылған технологиялар',

  pageNotFound: 'Бет табылмады',
  pageNotFoundLead: 'Бұл мекенжайда ештеңе жоқ.',
  backHome: 'Басты бетке',

  skillGroups: {
    languages: 'Тілдер',
    frameworks: 'Фреймворктер мен кітапханалар',
    databases: 'Дерекқорлар',
    gamedev: 'Ойын әзірлеу',
    design: 'Дизайн және шығармашылық құралдар',
    tools: 'Құралдар мен платформалар',
  },

  projects: {
    spacebird: {
      title: 'Spacebird',
      status: 'Әзірленуде',
      shortDescription:
        'Godot-та жасалған ғарыштағы тіршілік ету және құрылыс туралы 3D ойын: орбитадағы робот болып ойнап, ресурстар жинаңыз, бөлшектер жасаңыз және кемеңізді құрыңыз.',
      fullDescription:
        'Spacebird — орбиталық қоқыс алаңында өтетін, бірінші жақтан ойналатын 3D ойын. Сіз салмақсыздықтағы робот болып ойнайсыз: ресурстарды сканерлейсіз, металл сынықтарын жинайсыз және инвентарьдан құралдар, жабдықтар мен құрылыс бөлшектерін жасайсыз.\n\nБөлшектер өз қуат жүйесі бар кемеге біріктіріледі, ал деңгейде жау — механикалық жылан жүреді. Ойында «Тіршілік ету» және «Шығармашылық» режимдері, әлемдерді сақтау және дулыға түріндегі интерфейс бар.',
    },
    'gaming-cafe-booking': {
      title: 'Gaming Café Booking',
      status: 'Фронтенд-прототип',
      shortDescription:
        'Компьютерлік клубтағы орындарды брондау: залдың интерактивті картасынан орын таңдаңыз, тарифті белгілеңіз және брондау кодын алыңыз.',
      fullDescription:
        'Компьютерлік клубқа арналған брондау сценарийі. Келуші келу уақытын көрсетеді, екі қабаттың интерактивті картасынан беске дейін орын таңдайды, содан кейін тарифті — сағаттық пакетті немесе тәулік уақытына байланған пакетті таңдайды; баға орынның аймағына байланысты.\n\nУақыты өтіп кеткен немесе таңдалған аралықта орны бос емес пакеттер автоматты түрде қолжетімсіз болады. Әкімші панелінде қызметкерлер брондарды көріп, оларды растай немесе болдырмай алады.',
    },
    portfolio: {
      title: 'Портфолио',
      status: 'Жұмыс үстінде',
      shortDescription:
        'Осы сайт: жобалар каталогын өз API-і арқылы беретін жеке портфолио.',
      fullDescription:
        'Қазір қарап отырған сайтыңыз. Клиент — React пен TypeScript негізіндегі бір беттік қосымша; жобалар Prisma арқылы PostgreSQL дерекқорымен жұмыс істейтін Express API-ден келеді, ал әкімші аймағы JWT арқылы қорғалған. API қолжетімсіз болса, клиент кірістірілген жобалар тізімін көрсетеді, сондықтан сайтты статикалық түрде де орналастыруға болады.',
    },
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, ru, kk };
