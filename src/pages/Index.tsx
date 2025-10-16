import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Deity {
  id: number;
  name: string;
  culture: string;
  title: string;
  description: string;
  attributes: string[];
  symbols: string[];
  imageUrl?: string;
  pronunciation?: string;
  relatedDeities?: number[];
  myths?: string[];
}

interface Timeline {
  culture: string;
  period: string;
  years: string;
  description: string;
}

interface Artifact {
  id: number;
  name: string;
  culture: string;
  type: string;
  description: string;
  location: string;
  significance: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface FamilyTree {
  culture: string;
  nodes: FamilyNode[];
}

interface FamilyNode {
  id: number;
  name: string;
  generation: number;
  parents?: number[];
  children?: number[];
}

interface DeityComparison {
  domain: string;
  greek: string;
  norse: string;
  egyptian: string;
  description: string;
}

const deities: Deity[] = [
  {
    id: 1,
    name: 'Зевс',
    culture: 'greek',
    title: 'Царь богов',
    description: 'Верховный бог древнегреческого пантеона, повелитель грома и молний. Правит с Олимпа, вершит судьбы богов и людей.',
    attributes: ['Власть', 'Справедливость', 'Небо'],
    symbols: ['Молния', 'Орёл', 'Дуб'],
    imageUrl: 'https://cdn.poehali.dev/projects/9c4d6efb-88f2-438a-b665-844501576eff/files/cf406206-3154-44cd-932e-469fd66f4e88.jpg',
    pronunciation: 'Zeus',
    relatedDeities: [2, 3],
    myths: [
      'Зевс сверг своего отца Крона и Титанов, заняв трон Олимпа',
      'Разделил мир между братьями: себе — небо, Посейдону — море, Аиду — подземное царство',
      'Превращался в животных, чтобы соблазнять смертных женщин'
    ],
  },
  {
    id: 2,
    name: 'Посейдон',
    culture: 'greek',
    title: 'Властелин морей',
    description: 'Брат Зевса, повелитель океанов и землетрясений. Держит в руках могучий трезубец, которым усмиряет бури.',
    attributes: ['Море', 'Бури', 'Землетрясения'],
    symbols: ['Трезубец', 'Дельфин', 'Конь'],
    pronunciation: 'Poseidon',
    relatedDeities: [1, 3],
  },
  {
    id: 3,
    name: 'Афина',
    culture: 'greek',
    title: 'Богиня мудрости',
    description: 'Дочь Зевса, рождённая из его головы. Покровительница науки, искусства, справедливой войны и ремёсел.',
    attributes: ['Мудрость', 'Стратегия', 'Ремёсла'],
    symbols: ['Сова', 'Копьё', 'Эгида'],
    pronunciation: 'Athena',
    relatedDeities: [1, 2],
  },
  {
    id: 4,
    name: 'Один',
    culture: 'norse',
    title: 'Всеотец',
    description: 'Верховный бог скандинавского пантеона, бог войны, мудрости и магии. Отдал глаз за знание рун.',
    attributes: ['Мудрость', 'Война', 'Магия'],
    symbols: ['Воронов Хугин и Мунин', 'Копьё Гунгнир', 'Слейпнир'],
    imageUrl: 'https://cdn.poehali.dev/projects/9c4d6efb-88f2-438a-b665-844501576eff/files/663b74fa-e636-4e98-8b7e-9ea4ca4f7451.jpg',
    pronunciation: 'Odin',
    relatedDeities: [5, 6],
    myths: [
      'Отдал свой глаз великану Мимиру за глоток из источника мудрости',
      'Висел на мировом древе Иггдрасиль девять дней, чтобы познать руны',
      'Посылает воронов Хугина и Мунина собирать знания о мире'
    ],
  },
  {
    id: 5,
    name: 'Тор',
    culture: 'norse',
    title: 'Громовержец',
    description: 'Сын Одина, защитник Асгарда и Мидгарда. Владеет молотом Мьёльниром, способным вызывать гром и молнии.',
    attributes: ['Сила', 'Защита', 'Гром'],
    symbols: ['Молот Мьёльнир', 'Козлы', 'Пояс силы'],
    pronunciation: 'Thor',
    relatedDeities: [4, 6],
  },
  {
    id: 6,
    name: 'Фрейя',
    culture: 'norse',
    title: 'Богиня любви',
    description: 'Богиня любви, красоты и плодородия. Владеет магией сейдр и командует валькириями.',
    attributes: ['Любовь', 'Красота', 'Магия'],
    symbols: ['Ожерелье Брисингамен', 'Колесница с кошками', 'Соколиное оперение'],
    pronunciation: 'Freya',
    relatedDeities: [4, 5],
  },
  {
    id: 7,
    name: 'Ра',
    culture: 'egyptian',
    title: 'Солнечное божество',
    description: 'Верховный бог древнего Египта, олицетворение солнца. Каждый день проплывает по небу в солнечной ладье.',
    attributes: ['Солнце', 'Творение', 'Порядок'],
    symbols: ['Солнечный диск', 'Ладья', 'Сокол'],
    imageUrl: 'https://cdn.poehali.dev/projects/9c4d6efb-88f2-438a-b665-844501576eff/files/402abf39-6106-4d0e-bbae-a2c81ad40421.jpg',
    pronunciation: 'Ra',
    relatedDeities: [8, 9],
    myths: [
      'Каждый день проплывает по небу в солнечной ладье, а ночью сражается с змеем Апофисом',
      'Создал людей из своих слёз, когда плакал о своем одиночестве',
      'Сливается с другими богами, становясь Амон-Ра или Атум-Ра'
    ],
  },
  {
    id: 8,
    name: 'Анубис',
    culture: 'egyptian',
    title: 'Страж загробного мира',
    description: 'Бог бальзамирования и проводник душ в царство мёртвых. Взвешивает сердца умерших на весах Маат.',
    attributes: ['Загробная жизнь', 'Бальзамирование', 'Суд'],
    symbols: ['Весы', 'Посох', 'Анкх'],
    pronunciation: 'Anubis',
    relatedDeities: [7, 9],
  },
  {
    id: 9,
    name: 'Исида',
    culture: 'egyptian',
    title: 'Великая Мать',
    description: 'Богиня материнства, магии и плодородия. Воскресила своего мужа Осириса и родила Гора.',
    attributes: ['Материнство', 'Магия', 'Исцеление'],
    symbols: ['Трон', 'Тиет', 'Систрум'],
    pronunciation: 'Isis',
    relatedDeities: [7, 8],
  },
];

const cultures = {
  greek: { name: 'Греческая', icon: 'Columns3' },
  norse: { name: 'Скандинавская', icon: 'Axe' },
  egyptian: { name: 'Египетская', icon: 'Pyramid' },
};

const timeline: Timeline[] = [
  {
    culture: 'egyptian',
    period: 'Древнее царство',
    years: '2686-2181 до н.э.',
    description: 'Расцвет культа Ра, строительство великих пирамид в Гизе',
  },
  {
    culture: 'egyptian',
    period: 'Среднее царство',
    years: '2055-1650 до н.э.',
    description: 'Возвышение культа Амона, слияние с Ра (Амон-Ра)',
  },
  {
    culture: 'greek',
    period: 'Микенская эпоха',
    years: '1600-1100 до н.э.',
    description: 'Формирование олимпийского пантеона, культ Зевса',
  },
  {
    culture: 'greek',
    period: 'Классический период',
    years: '500-323 до н.э.',
    description: 'Золотой век греческой мифологии, строительство Парфенона',
  },
  {
    culture: 'norse',
    period: 'Эпоха викингов',
    years: '793-1066 н.э.',
    description: 'Расцвет скандинавской мифологии, культ Одина и Тора',
  },
  {
    culture: 'norse',
    period: 'Христианизация',
    years: '1000-1200 н.э.',
    description: 'Записаны Эдды, сохранившие скандинавские мифы',
  },
];

const artifacts: Artifact[] = [
  {
    id: 1,
    name: 'Маска Агамемнона',
    culture: 'greek',
    type: 'Погребальная маска',
    description: 'Золотая погребальная маска, найденная в Микенах',
    location: 'Национальный археологический музей, Афины',
    significance: 'Символ микенской цивилизации и эпохи героев',
  },
  {
    id: 2,
    name: 'Парфенон',
    culture: 'greek',
    type: 'Храм',
    description: 'Главный храм Афины на Акрополе',
    location: 'Акрополь, Афины, Греция',
    significance: 'Величайший образец дорического ордера и греческой архитектуры',
  },
  {
    id: 3,
    name: 'Дельфийский Оракул',
    culture: 'greek',
    type: 'Святилище',
    description: 'Священное место предсказаний бога Аполлона',
    location: 'Дельфы, Греция',
    significance: 'Важнейший религиозный центр древней Греции',
  },
  {
    id: 4,
    name: 'Корабль Осеберг',
    culture: 'norse',
    type: 'Погребальная ладья',
    description: 'Викингский корабль IX века с богатыми украшениями',
    location: 'Музей кораблей викингов, Осло',
    significance: 'Лучше всего сохранившийся корабль викингов',
  },
  {
    id: 5,
    name: 'Рунный камень Еллинге',
    culture: 'norse',
    type: 'Рунический камень',
    description: 'Памятник с руническими надписями X века',
    location: 'Еллинге, Дания',
    significance: 'Свидетельство христианизации Дании',
  },
  {
    id: 6,
    name: 'Храм в Упсале',
    culture: 'norse',
    type: 'Языческий храм',
    description: 'Главное святилище скандинавских богов',
    location: 'Упсала, Швеция (разрушен)',
    significance: 'Центр религиозных обрядов и жертвоприношений',
  },
  {
    id: 7,
    name: 'Великая пирамида Хеопса',
    culture: 'egyptian',
    type: 'Гробница',
    description: 'Крупнейшая из пирамид Гизы',
    location: 'Гиза, Египет',
    significance: 'Единственное сохранившееся чудо света древнего мира',
  },
  {
    id: 8,
    name: 'Храм Карнак',
    culture: 'egyptian',
    type: 'Храмовый комплекс',
    description: 'Крупнейший храмовый комплекс Древнего Египта',
    location: 'Луксор, Египет',
    significance: 'Главный храм бога Амона-Ра',
  },
  {
    id: 9,
    name: 'Долина Царей',
    culture: 'egyptian',
    type: 'Некрополь',
    description: 'Место захоронения фараонов Нового царства',
    location: 'Западный берег Нила, Луксор',
    significance: 'Здесь была найдена гробница Тутанхамона',
  },
];

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Кто из богов сверг своего отца Крона?',
    options: ['Посейдон', 'Зевс', 'Аид', 'Аполлон'],
    correctAnswer: 1,
    explanation: 'Зевс возглавил восстание богов-олимпийцев против титанов и сверг своего отца Крона.',
  },
  {
    id: 2,
    question: 'Что отдал Один за мудрость?',
    options: ['Руку', 'Глаз', 'Ногу', 'Сердце'],
    correctAnswer: 1,
    explanation: 'Один отдал свой глаз великану Мимиру за право испить из источника мудрости.',
  },
  {
    id: 3,
    question: 'Какое животное ассоциируется с богиней Афиной?',
    options: ['Орёл', 'Лев', 'Сова', 'Змея'],
    correctAnswer: 2,
    explanation: 'Сова — символ мудрости и священное животное Афины.',
  },
  {
    id: 4,
    question: 'Как называется молот бога Тора?',
    options: ['Гунгнир', 'Мьёльнир', 'Грамр', 'Тюрфинг'],
    correctAnswer: 1,
    explanation: 'Мьёльнир — легендарный молот Тора, способный вызывать гром и молнии.',
  },
  {
    id: 5,
    question: 'Каким образом Ра путешествует по небу?',
    options: ['На колеснице', 'В солнечной ладье', 'На драконе', 'Пешком'],
    correctAnswer: 1,
    explanation: 'Ра каждый день проплывает по небу в своей солнечной ладье.',
  },
  {
    id: 6,
    question: 'Кто взвешивает сердца умерших в египетской мифологии?',
    options: ['Ра', 'Анубис', 'Осирис', 'Гор'],
    correctAnswer: 1,
    explanation: 'Анубис взвешивает сердце умершего на весах Маат, определяя его достойность.',
  },
];

const familyTrees: FamilyTree[] = [
  {
    culture: 'greek',
    nodes: [
      { id: 1, name: 'Кронос', generation: 0 },
      { id: 2, name: 'Рея', generation: 0 },
      { id: 3, name: 'Зевс', generation: 1, parents: [1, 2] },
      { id: 4, name: 'Посейдон', generation: 1, parents: [1, 2] },
      { id: 5, name: 'Аид', generation: 1, parents: [1, 2] },
      { id: 6, name: 'Гера', generation: 1, parents: [1, 2] },
      { id: 7, name: 'Афина', generation: 2, parents: [3] },
      { id: 8, name: 'Аполлон', generation: 2, parents: [3] },
      { id: 9, name: 'Артемида', generation: 2, parents: [3] },
      { id: 10, name: 'Арес', generation: 2, parents: [3, 6] },
    ],
  },
  {
    culture: 'norse',
    nodes: [
      { id: 1, name: 'Бёр', generation: 0 },
      { id: 2, name: 'Бестла', generation: 0 },
      { id: 3, name: 'Один', generation: 1, parents: [1, 2] },
      { id: 4, name: 'Вили', generation: 1, parents: [1, 2] },
      { id: 5, name: 'Фригг', generation: 1 },
      { id: 6, name: 'Тор', generation: 2, parents: [3] },
      { id: 7, name: 'Бальдр', generation: 2, parents: [3, 5] },
      { id: 8, name: 'Локи', generation: 1 },
      { id: 9, name: 'Фрейя', generation: 1 },
      { id: 10, name: 'Фрейр', generation: 1 },
    ],
  },
  {
    culture: 'egyptian',
    nodes: [
      { id: 1, name: 'Геб', generation: 0 },
      { id: 2, name: 'Нут', generation: 0 },
      { id: 3, name: 'Осирис', generation: 1, parents: [1, 2] },
      { id: 4, name: 'Исида', generation: 1, parents: [1, 2] },
      { id: 5, name: 'Сет', generation: 1, parents: [1, 2] },
      { id: 6, name: 'Нефтида', generation: 1, parents: [1, 2] },
      { id: 7, name: 'Гор', generation: 2, parents: [3, 4] },
      { id: 8, name: 'Анубис', generation: 2, parents: [3, 6] },
      { id: 9, name: 'Ра', generation: 0 },
    ],
  },
];

const deityComparisons: DeityComparison[] = [
  {
    domain: 'Верховное божество',
    greek: 'Зевс',
    norse: 'Один',
    egyptian: 'Ра',
    description: 'Главный бог пантеона, правитель всех божеств',
  },
  {
    domain: 'Гром и молнии',
    greek: 'Зевс',
    norse: 'Тор',
    egyptian: 'Сет',
    description: 'Боги бури, грома и природных стихий',
  },
  {
    domain: 'Мудрость',
    greek: 'Афина',
    norse: 'Один',
    egyptian: 'Тот',
    description: 'Покровители знаний, письменности и мудрости',
  },
  {
    domain: 'Загробный мир',
    greek: 'Аид',
    norse: 'Хель',
    egyptian: 'Анубис',
    description: 'Правители царства мёртвых и проводники душ',
  },
  {
    domain: 'Любовь и красота',
    greek: 'Афродита',
    norse: 'Фрейя',
    egyptian: 'Хатхор',
    description: 'Богини любви, красоты и плодородия',
  },
  {
    domain: 'Война',
    greek: 'Арес',
    norse: 'Тюр',
    egyptian: 'Монту',
    description: 'Боги войны, битвы и воинской доблести',
  },
  {
    domain: 'Море и вода',
    greek: 'Посейдон',
    norse: 'Ньёрд',
    egyptian: 'Собек',
    description: 'Повелители водной стихии и морей',
  },
];

const Index = () => {
  const [selectedCulture, setSelectedCulture] = useState<string>('all');
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [showRelations, setShowRelations] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedFamilyTree, setSelectedFamilyTree] = useState<string>('greek');

  const filteredDeities = selectedCulture === 'all' 
    ? deities 
    : deities.filter(d => d.culture === selectedCulture);

  const filteredArtifacts = selectedCulture === 'all' 
    ? artifacts 
    : artifacts.filter(a => a.culture === selectedCulture);

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === quizQuestions[currentQuizQuestion].correctAnswer) {
      setQuizScore(quizScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowQuizResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setShowQuizResult(false);
    setQuizStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTIsIDE3NSwgNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <header className="relative container mx-auto px-4 py-16 text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ПАНТЕОН БОГОВ
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Исследуйте мифологию древних цивилизаций — греческие, скандинавские и египетские божества в одном месте
            </p>
            <div className="flex gap-4 justify-center items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Scroll" size={18} />
                <span>Мифы и легенды</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Crown" size={18} />
                <span>Божественные атрибуты</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={18} />
                <span>Древние символы</span>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main className="container mx-auto px-4 pb-20">
        <div className="mb-12 p-8 bg-card/50 backdrop-blur rounded-lg border-2 border-primary/30 animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary flex items-center justify-center gap-3">
            <Icon name="Clock" size={32} />
            Временная шкала древних цивилизаций
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2"></div>
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div key={index} className={`flex items-center gap-4 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="inline-block p-4 bg-secondary/80 rounded-lg border-2 border-primary/30 hover:border-primary/60 transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name={cultures[event.culture as keyof typeof cultures].icon as any} size={20} className="text-primary" />
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          {cultures[event.culture as keyof typeof cultures].name}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{event.period}</h3>
                      <p className="text-sm text-primary font-semibold mb-2">{event.years}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border-4 border-primary z-10">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowRelations(!showRelations)}
            className="px-6 py-3 bg-primary/10 hover:bg-primary/20 border-2 border-primary rounded-lg transition-all flex items-center gap-2 text-primary font-semibold"
          >
            <Icon name="Network" size={20} />
            {showRelations ? 'Скрыть карту связей' : 'Показать карту связей'}
          </button>
        </div>

        {showRelations && (
          <div className="mb-12 p-8 bg-card/50 backdrop-blur rounded-lg border-2 border-primary/30 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Карта связей божеств</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(cultures).map(([key, culture]) => {
                const culturDeities = deities.filter(d => d.culture === key);
                return (
                  <div key={key} className="space-y-4">
                    <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
                      <Icon name={culture.icon as any} size={24} className="text-primary" />
                      {culture.name}
                    </h3>
                    <div className="space-y-2">
                      {culturDeities.map(deity => (
                        <div key={deity.id} className="p-3 bg-secondary/50 rounded-lg border border-primary/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-foreground">{deity.name}</span>
                            <button
                              onClick={() => setSelectedDeity(deity)}
                              className="text-xs text-primary hover:underline"
                            >
                              Подробнее
                            </button>
                          </div>
                          {deity.relatedDeities && deity.relatedDeities.length > 0 && (
                            <div className="flex flex-wrap gap-1 text-xs">
                              <span className="text-muted-foreground">Связи:</span>
                              {deity.relatedDeities.map(relId => {
                                const relDeity = deities.find(d => d.id === relId);
                                return relDeity ? (
                                  <Badge key={relId} variant="outline" className="text-xs">
                                    {relDeity.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCulture}>
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 h-auto p-2">
            <TabsTrigger value="all" className="text-base py-3">
              Все
            </TabsTrigger>
            <TabsTrigger value="greek" className="text-base py-3 flex items-center gap-2">
              <Icon name="Columns3" size={18} />
              Греция
            </TabsTrigger>
            <TabsTrigger value="norse" className="text-base py-3 flex items-center gap-2">
              <Icon name="Axe" size={18} />
              Скандинавия
            </TabsTrigger>
            <TabsTrigger value="egyptian" className="text-base py-3 flex items-center gap-2">
              <Icon name="Pyramid" size={18} />
              Египет
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCulture} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredDeities.map((deity, index) => (
                <Card 
                  key={deity.id} 
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-card/80 backdrop-blur border-2 border-border hover:border-primary"
                  onClick={() => setSelectedDeity(deity)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {cultures[deity.culture as keyof typeof cultures].name}
                      </Badge>
                      <Icon 
                        name={cultures[deity.culture as keyof typeof cultures].icon as any} 
                        size={24} 
                        className="text-primary/50" 
                      />
                    </div>
                    
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center border-2 border-primary/20 overflow-hidden">
                      {deity.imageUrl ? (
                        <img src={deity.imageUrl} alt={deity.name} className="w-full h-full object-cover" />
                      ) : (
                        <Icon name="Crown" size={64} className="text-primary/30" />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-foreground">{deity.name}</CardTitle>
                        <CardDescription className="text-primary text-base">{deity.title}</CardDescription>
                      </div>
                      {deity.pronunciation && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playPronunciation(deity.pronunciation!);
                          }}
                          className="p-2 hover:bg-primary/20 rounded-full transition-colors"
                          title="Прослушать произношение"
                        >
                          <Icon name="Volume2" size={20} className="text-primary" />
                        </button>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {deity.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                          <Icon name="Sparkles" size={14} />
                          Атрибуты
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {deity.attributes.map((attr) => (
                            <Badge key={attr} variant="secondary" className="text-xs">
                              {attr}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                          <Icon name="Shield" size={14} />
                          Символы
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {deity.symbols.map((symbol) => (
                            <Badge key={symbol} variant="outline" className="text-xs">
                              {symbol}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {selectedDeity && (
          <div 
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedDeity(null)}
          >
            <Card className="max-w-2xl w-full animate-scale-in border-2 border-primary" onClick={e => e.stopPropagation()}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-4xl">{selectedDeity.name}</CardTitle>
                      {selectedDeity.pronunciation && (
                        <button
                          onClick={() => playPronunciation(selectedDeity.pronunciation!)}
                          className="p-2 hover:bg-primary/20 rounded-full transition-colors"
                          title="Прослушать произношение"
                        >
                          <Icon name="Volume2" size={24} className="text-primary" />
                        </button>
                      )}
                    </div>
                    <CardDescription className="text-xl text-primary">{selectedDeity.title}</CardDescription>
                    <Badge className="mt-2 bg-primary/10 text-primary border-primary/30">
                      {cultures[selectedDeity.culture as keyof typeof cultures].name} мифология
                    </Badge>
                  </div>
                  <button 
                    onClick={() => setSelectedDeity(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="X" size={24} />
                  </button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border-2 border-primary/20 overflow-hidden">
                  {selectedDeity.imageUrl ? (
                    <img src={selectedDeity.imageUrl} alt={selectedDeity.name} className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="Crown" size={96} className="text-primary/30" />
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Icon name="BookOpen" size={20} className="text-primary" />
                    Описание
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedDeity.description}</p>
                </div>

                {selectedDeity.myths && selectedDeity.myths.length > 0 && (
                  <div className="p-6 bg-accent/10 rounded-lg border-2 border-accent/30">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-accent">
                      <Icon name="Scroll" size={20} />
                      Мифы и легенды
                    </h3>
                    <div className="space-y-3">
                      {selectedDeity.myths.map((myth, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                            {index + 1}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{myth}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Sparkles" size={20} className="text-primary" />
                      Атрибуты
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDeity.attributes.map((attr) => (
                        <Badge key={attr} className="bg-primary/20 text-primary border-primary/30">
                          {attr}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Shield" size={20} className="text-primary" />
                      Символы
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDeity.symbols.map((symbol) => (
                        <Badge key={symbol} variant="outline" className="border-primary/50">
                          {symbol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedDeity.relatedDeities && selectedDeity.relatedDeities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Network" size={20} className="text-primary" />
                      Связанные божества
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedDeity.relatedDeities.map(relId => {
                        const relDeity = deities.find(d => d.id === relId);
                        return relDeity ? (
                          <button
                            key={relId}
                            onClick={() => setSelectedDeity(relDeity)}
                            className="p-3 bg-secondary/50 hover:bg-secondary rounded-lg border border-primary/20 hover:border-primary/50 transition-all text-left flex items-center justify-between group"
                          >
                            <div>
                              <p className="font-semibold text-foreground">{relDeity.name}</p>
                              <p className="text-sm text-muted-foreground">{relDeity.title}</p>
                            </div>
                            <Icon name="ArrowRight" size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <div className="container mx-auto px-4 pb-20">
        <div className="mb-12 p-8 bg-card/50 backdrop-blur rounded-lg border-2 border-accent/30 animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-6 text-accent flex items-center justify-center gap-3">
            <Icon name="Landmark" size={32} />
            Артефакты и священные места
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtifacts.map((artifact) => (
              <Card key={artifact.id} className="border-2 border-accent/20 hover:border-accent/50 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                      {cultures[artifact.culture as keyof typeof cultures].name}
                    </Badge>
                    <Icon 
                      name={cultures[artifact.culture as keyof typeof cultures].icon as any} 
                      size={24} 
                      className="text-accent/50 group-hover:text-accent transition-colors" 
                    />
                  </div>
                  <CardTitle className="text-xl mb-1">{artifact.name}</CardTitle>
                  <CardDescription className="text-accent/80 font-semibold">{artifact.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{artifact.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <Icon name="MapPin" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{artifact.location}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Info" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{artifact.significance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12 p-8 bg-card/50 backdrop-blur rounded-lg border-2 border-primary/30 animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary flex items-center justify-center gap-3">
            <Icon name="Brain" size={32} />
            Викторина: Проверь свои знания
          </h2>
          
          {!quizStarted ? (
            <div className="text-center space-y-6">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Проверьте свои знания о древних богах и мифологии! Ответьте на 6 вопросов о греческих, скандинавских и египетских божествах.
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all text-lg font-semibold flex items-center gap-2 mx-auto"
              >
                <Icon name="Play" size={24} />
                Начать викторину
              </button>
            </div>
          ) : !showQuizResult ? (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex justify-between items-center mb-6">
                <Badge variant="outline" className="text-sm">
                  Вопрос {currentQuizQuestion + 1} из {quizQuestions.length}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Счёт: {quizScore} / {currentQuizQuestion + (selectedAnswer !== null ? 1 : 0)}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-6">{quizQuestions[currentQuizQuestion].question}</h3>
                <div className="space-y-3">
                  {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectedAnswer === null && handleQuizAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedAnswer === null
                          ? 'border-primary/30 hover:border-primary/60 hover:bg-primary/5'
                          : index === quizQuestions[currentQuizQuestion].correctAnswer
                          ? 'border-green-500 bg-green-500/10'
                          : index === selectedAnswer
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-muted opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          selectedAnswer === null
                            ? 'bg-primary/20 text-primary'
                            : index === quizQuestions[currentQuizQuestion].correctAnswer
                            ? 'bg-green-500/20 text-green-500'
                            : index === selectedAnswer
                            ? 'bg-red-500/20 text-red-500'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {selectedAnswer !== null && index === quizQuestions[currentQuizQuestion].correctAnswer && (
                          <Icon name="Check" size={20} className="text-green-500" />
                        )}
                        {selectedAnswer === index && index !== quizQuestions[currentQuizQuestion].correctAnswer && (
                          <Icon name="X" size={20} className="text-red-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedAnswer !== null && (
                <div className="p-4 bg-accent/10 rounded-lg border-2 border-accent/30 animate-fade-in">
                  <p className="text-sm text-muted-foreground">{quizQuestions[currentQuizQuestion].explanation}</p>
                </div>
              )}

              {selectedAnswer !== null && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all font-semibold flex items-center gap-2"
                  >
                    {currentQuizQuestion < quizQuestions.length - 1 ? 'Следующий вопрос' : 'Показать результаты'}
                    <Icon name="ArrowRight" size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <div className="p-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border-2 border-primary/30">
                <Icon name="Trophy" size={64} className="text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">Викторина завершена!</h3>
                <p className="text-5xl font-bold text-primary mb-4">{quizScore} / {quizQuestions.length}</p>
                <p className="text-lg text-muted-foreground">
                  {quizScore === quizQuestions.length
                    ? '🎉 Превосходно! Вы настоящий эксперт по мифологии!'
                    : quizScore >= quizQuestions.length * 0.7
                    ? '👏 Отлично! Вы хорошо знаете древних богов!'
                    : quizScore >= quizQuestions.length * 0.5
                    ? '👍 Неплохо! Продолжайте изучать мифологию!'
                    : '📚 Стоит больше узнать о древних цивилизациях!'}
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all text-lg font-semibold flex items-center gap-2 mx-auto"
              >
                <Icon name="RotateCcw" size={24} />
                Пройти снова
              </button>
            </div>
          )}
        </div>

        <div className="mb-12 p-8 bg-card/50 backdrop-blur rounded-lg border-2 border-primary/30 animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary flex items-center justify-center gap-3">
            <Icon name="GitBranch" size={32} />
            Генеалогическое древо богов
          </h2>
          
          <div className="flex justify-center gap-4 mb-8">
            {Object.entries(cultures).map(([key, culture]) => (
              <button
                key={key}
                onClick={() => setSelectedFamilyTree(key)}
                className={`px-6 py-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  selectedFamilyTree === key
                    ? 'bg-primary/20 border-primary text-primary font-semibold'
                    : 'border-primary/30 hover:border-primary/60 text-muted-foreground'
                }`}
              >
                <Icon name={culture.icon as any} size={20} />
                {culture.name}
              </button>
            ))}
          </div>

          <div className="max-w-5xl mx-auto">
            {familyTrees
              .filter(tree => tree.culture === selectedFamilyTree)
              .map(tree => {
                const generations = Array.from(new Set(tree.nodes.map(n => n.generation))).sort();
                
                return (
                  <div key={tree.culture} className="space-y-8">
                    {generations.map(gen => (
                      <div key={gen} className="space-y-4">
                        <div className="text-center">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                            Поколение {gen + 1}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                          {tree.nodes
                            .filter(node => node.generation === gen)
                            .map(node => (
                              <div key={node.id} className="relative">
                                <div className="p-4 bg-secondary/80 rounded-lg border-2 border-primary/30 hover:border-primary/60 transition-all min-w-[140px] text-center">
                                  <div className="font-bold text-foreground">{node.name}</div>
                                  {node.parents && node.parents.length > 0 && (
                                    <div className="text-xs text-muted-foreground mt-2">
                                      <div className="flex items-center justify-center gap-1">
                                        <Icon name="ArrowUp" size={12} />
                                        <span>
                                          {node.parents
                                            .map(pid => tree.nodes.find(n => n.id === pid)?.name)
                                            .filter(Boolean)
                                            .join(' + ')}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {gen < generations[generations.length - 1] && (
                                  <div className="absolute left-1/2 -bottom-6 w-0.5 h-6 bg-primary/30 transform -translate-x-1/2"></div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mb-12 p-8 bg-card/50 backdrop-blur rounded-lg border-2 border-accent/30 animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-6 text-accent flex items-center justify-center gap-3">
            <Icon name="Scale" size={32} />
            Сравнительная таблица божеств
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Боги разных культур часто выполняли схожие функции. Эта таблица показывает параллели между греческими, скандинавскими и египетскими божествами.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-accent/30">
                  <th className="p-4 text-left font-bold text-accent">Сфера влияния</th>
                  <th className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="Columns3" size={20} className="text-accent" />
                      <span className="font-bold text-accent">Греция</span>
                    </div>
                  </th>
                  <th className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="Axe" size={20} className="text-accent" />
                      <span className="font-bold text-accent">Скандинавия</span>
                    </div>
                  </th>
                  <th className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="Pyramid" size={20} className="text-accent" />
                      <span className="font-bold text-accent">Египет</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {deityComparisons.map((comparison, index) => (
                  <tr 
                    key={index}
                    className="border-b border-accent/20 hover:bg-accent/5 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-semibold text-foreground">{comparison.domain}</div>
                        <div className="text-xs text-muted-foreground mt-1">{comparison.description}</div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {comparison.greek}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {comparison.norse}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {comparison.egyptian}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>Пантеон Богов — путешествие в мифологию древних цивилизаций</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;