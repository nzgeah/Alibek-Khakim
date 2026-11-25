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
};

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
};

export const dictionaries: Record<Lang, Dictionary> = { en, ru, kk };
