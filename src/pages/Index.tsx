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
  },
  {
    id: 2,
    name: 'Посейдон',
    culture: 'greek',
    title: 'Властелин морей',
    description: 'Брат Зевса, повелитель океанов и землетрясений. Держит в руках могучий трезубец, которым усмиряет бури.',
    attributes: ['Море', 'Бури', 'Землетрясения'],
    symbols: ['Трезубец', 'Дельфин', 'Конь'],
  },
  {
    id: 3,
    name: 'Афина',
    culture: 'greek',
    title: 'Богиня мудрости',
    description: 'Дочь Зевса, рождённая из его головы. Покровительница науки, искусства, справедливой войны и ремёсел.',
    attributes: ['Мудрость', 'Стратегия', 'Ремёсла'],
    symbols: ['Сова', 'Копьё', 'Эгида'],
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
  },
  {
    id: 5,
    name: 'Тор',
    culture: 'norse',
    title: 'Громовержец',
    description: 'Сын Одина, защитник Асгарда и Мидгарда. Владеет молотом Мьёльниром, способным вызывать гром и молнии.',
    attributes: ['Сила', 'Защита', 'Гром'],
    symbols: ['Молот Мьёльнир', 'Козлы', 'Пояс силы'],
  },
  {
    id: 6,
    name: 'Фрейя',
    culture: 'norse',
    title: 'Богиня любви',
    description: 'Богиня любви, красоты и плодородия. Владеет магией сейдр и командует валькириями.',
    attributes: ['Любовь', 'Красота', 'Магия'],
    symbols: ['Ожерелье Брисингамен', 'Колесница с кошками', 'Соколиное оперение'],
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
  },
  {
    id: 8,
    name: 'Анубис',
    culture: 'egyptian',
    title: 'Страж загробного мира',
    description: 'Бог бальзамирования и проводник душ в царство мёртвых. Взвешивает сердца умерших на весах Маат.',
    attributes: ['Загробная жизнь', 'Бальзамирование', 'Суд'],
    symbols: ['Весы', 'Посох', 'Анкх'],
  },
  {
    id: 9,
    name: 'Исида',
    culture: 'egyptian',
    title: 'Великая Мать',
    description: 'Богиня материнства, магии и плодородия. Воскресила своего мужа Осириса и родила Гора.',
    attributes: ['Материнство', 'Магия', 'Исцеление'],
    symbols: ['Трон', 'Тиет', 'Систрум'],
  },
];

const cultures = {
  greek: { name: 'Греческая', icon: 'Columns3' },
  norse: { name: 'Скандинавская', icon: 'Axe' },
  egyptian: { name: 'Египетская', icon: 'Pyramid' },
};

const Index = () => {
  const [selectedCulture, setSelectedCulture] = useState<string>('all');
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);

  const filteredDeities = selectedCulture === 'all' 
    ? deities 
    : deities.filter(d => d.culture === selectedCulture);

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
                    
                    <CardTitle className="text-2xl text-foreground">{deity.name}</CardTitle>
                    <CardDescription className="text-primary text-base">{deity.title}</CardDescription>
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
                    <CardTitle className="text-4xl mb-2">{selectedDeity.name}</CardTitle>
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
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>Пантеон Богов — путешествие в мифологию древних цивилизаций</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;