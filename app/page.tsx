"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Gauge,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  Zap
} from "lucide-react";

const phoneDisplay = "+7 (949) 000-15-15";
const phoneHref = "tel:+79490001515";
const whatsappHref = "https://wa.me/79490001515";

const heroImage =
  "https://images.pexels.com/photos/17429097/pexels-photo-17429097.jpeg?auto=compress&cs=tinysrgb&w=2400";
const truckImage =
  "https://images.unsplash.com/photo-1730514785075-b065c757b653?auto=format&fit=crop&fm=webp&q=72&w=1600";
const fleetImage =
  "https://images.unsplash.com/photo-1686966933735-305bd8fe0a77?auto=format&fit=crop&fm=webp&q=76&w=1400";

const vehicleTypes = [
  { id: "car", label: "Легковой", icon: Car, base: 2500 },
  { id: "suv", label: "Джип", icon: ShieldCheck, base: 2500 },
  { id: "moto", label: "Мото", icon: Gauge, base: 2000 },
  { id: "van", label: "Коммерческий", icon: Truck, base: 3000 },
  { id: "spec", label: "Спецтехника", icon: Wrench, base: 3500 }
];

const damageOptions = [
  { id: "locked", label: "Колеса заблокированы", price: 450 },
  { id: "low", label: "Низкий клиренс", price: 550 },
  { id: "ditch", label: "Нужна сложная погрузка", price: 900 }
];

const benefits = [
  {
    icon: Zap,
    title: "15 минут",
    text: "Ближайший эвакуатор принимает заявку сразу после звонка."
  },
  {
    icon: Clock3,
    title: "24/7",
    text: "Ночь, дождь, трасса или двор без света: работаем без выходных."
  },
  {
    icon: Truck,
    title: "Любой транспорт",
    text: "Легковые авто, джипы, мотоциклы, коммерческий транспорт и техника."
  },
  {
    icon: ShieldCheck,
    title: "Аккуратная погрузка",
    text: "Мягкие стропы, контроль крепления и бережная перевозка кузова."
  }
];

const prices = [
  {
    title: "Легковые",
    price: "от 2 500 ₽",
    text: "Седаны, хэтчбеки, универсалы",
    items: ["Подача по Донецку", "Погрузка на платформу", "Фотоотчет по запросу"]
  },
  {
    title: "Джипы",
    price: "от 2 500 ₽",
    text: "Кроссоверы, внедорожники, полный привод",
    items: ["Усиленная фиксация", "Перевозка после ДТП", "Доставка в сервис"]
  },
  {
    title: "Спецтехника",
    price: "от 3 500 ₽",
    text: "Погрузчики, мини-техника, коммерческий транспорт",
    items: ["Индивидуальный расчет", "Маршрут по ДНР", "Согласование времени"]
  }
];

const steps = ["Заявка", "Выезд", "Погрузка", "Доставка"];

const reviews = [
  {
    name: "Алексей",
    route: "Калининский район -> СТО",
    text: "Машина заглохла ночью. Приехали быстро, цену назвали до выезда и без сюрпризов.",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&fm=webp&q=74&w=220&h=220"
  },
  {
    name: "Марина",
    route: "Макеевка -> Донецк",
    text: "После ДТП переживала за бампер и диски. Погрузили очень аккуратно, водитель был на связи.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&fm=webp&q=74&w=220&h=220"
  },
  {
    name: "Игорь",
    route: "Донецк -> Горловка",
    text: "Нужна была эвакуация авто ДНР по трассе. Оформили быстро, эвакуатор приехал без задержки.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&fm=webp&q=74&w=220&h=220"
  }
];

const faq = [
  {
    question: "Сколько стоит вызвать эвакуатор в Донецке?",
    answer:
      "Базовая стоимость начинается от 2 500 ₽. Итог зависит от типа авто, расстояния, состояния колес и сложности погрузки."
  },
  {
    question: "Как быстро приезжает эвакуатор?",
    answer:
      "Среднее время прибытия по Донецку: 18 минут. Если ближайшая машина свободна рядом, подача может занять около 15 минут."
  },
  {
    question: "Работаете ли вы по ДНР?",
    answer:
      "Да, эвакуатор доступен по Донецку и направлениям ДНР: Макеевка, Горловка, Ясиноватая, Харцызск и другие маршруты."
  },
  {
    question: "Можно ли перевезти авто после ДТП?",
    answer:
      "Да. Используем аккуратную погрузку, фиксируем автомобиль на платформе и доставляем в сервис, гараж или на стоянку."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function currency(value: number) {
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

function CountUp({
  value,
  formatter = (next: number) => Math.round(next).toLocaleString("ru-RU")
}: {
  value: number;
  formatter?: (next: number) => string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(value);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    });

    return controls.stop;
  }, [motionValue, value]);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = formatter(latest);
      }
    });

    return unsubscribe;
  }, [formatter, motionValue]);

  return <span ref={nodeRef}>{formatter(value)}</span>;
}

function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [vehicle, setVehicle] = useState(vehicleTypes[0].id);
  const [distance, setDistance] = useState(12);
  const [damages, setDamages] = useState<string[]>(["low"]);
  const [activeReview, setActiveReview] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 150]);
  const heroScale = useTransform(scrollY, [0, 700], [1.02, 1.12]);
  const routeProgress = useTransform(scrollY, [1850, 2850], ["0%", "100%"]);

  const selectedVehicle = useMemo(
    () => vehicleTypes.find((item) => item.id === vehicle) ?? vehicleTypes[0],
    [vehicle]
  );

  const estimate = useMemo(() => {
    const damagePrice = damages.reduce((sum, id) => {
      const option = damageOptions.find((item) => item.id === id);
      return sum + (option?.price ?? 0);
    }, 0);

    return Math.round((selectedVehicle.base + distance * 42 + damagePrice) / 50) * 50;
  }, [damages, distance, selectedVehicle.base]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Эвакуатор Донецк 24/7",
    telephone: phoneDisplay,
    areaServed: ["Донецк", "ДНР", "Макеевка", "Горловка", "Ясиноватая"],
    priceRange: "от 2500 ₽",
    openingHours: "Mo-Su 00:00-23:59",
    description:
      "Эвакуатор в Донецке и по ДНР. Быстрая подача, аккуратная погрузка, расчет стоимости онлайн."
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 5400);

    return () => window.clearInterval(timer);
  }, []);

  const toggleDamage = (id: string) => {
    setDamages((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const activeReviewItem = reviews[activeReview];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="noise" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#090909]/72 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="На главную">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/10">
              <Truck className="h-5 w-5 text-[var(--orange)]" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">Эвакуатор</span>
              <span className="block text-xs text-white/58">Донецк 24/7</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/68 lg:flex">
            <a className="transition hover:text-white" href="#calculator">
              Расчет
            </a>
            <a className="transition hover:text-white" href="#coverage">
              Карта
            </a>
            <a className="transition hover:text-white" href="#prices">
              Цены
            </a>
            <a className="transition hover:text-white" href="#reviews">
              Отзывы
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-md border border-[rgba(184,255,90,0.35)] bg-[rgba(184,255,90,0.08)] px-3 py-2 text-xs text-[var(--lime)] md:inline-flex">
              Свободно 2 эвакуатора
            </span>
            <a
              href={phoneHref}
              className="glow-button inline-flex min-w-[148px] items-center justify-center gap-2 rounded-lg border border-[rgba(255,106,26,0.72)] bg-[var(--orange)] px-4 py-2 text-sm font-bold text-[#090909] shadow-[0_0_30px_rgba(255,106,26,0.5)] sm:min-w-[190px]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{phoneDisplay}</span>
              <span className="sm:hidden">Звонок</span>
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="relative min-h-[88svh] overflow-hidden pt-16">
        <motion.img
          src={heroImage}
          alt="Эвакуатор ночью в городе"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y: heroY, scale: heroScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/72 to-[#090909]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/20 to-[#090909]/30" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,106,26,0.12),transparent_38%,rgba(97,240,255,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#090909] to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(88svh-4rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.72fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-white/72">
              <span className="rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-xl">
                Среднее прибытие: 18 минут
              </span>
              <span className="rounded-md border border-[rgba(255,106,26,0.38)] bg-[rgba(255,106,26,0.12)] px-3 py-2 text-[var(--orange)] backdrop-blur-xl">
                Донецк и вся ДНР
              </span>
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Эвакуатор в Донецке за 15 минут
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-white/74 sm:text-xl">
              Приедем быстро. Заберем аккуратно. Доставим безопасно.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#calculator"
                className="glow-button inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--orange)] px-6 py-4 text-base font-semibold text-[#090909]"
              >
                Рассчитать стоимость
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={phoneHref}
                className="glow-button inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(97,240,255,0.55)] bg-[rgba(97,240,255,0.16)] px-6 py-4 text-base font-semibold text-white shadow-[0_0_26px_rgba(97,240,255,0.24)] backdrop-blur-xl transition hover:border-[rgba(97,240,255,0.9)] hover:bg-[rgba(97,240,255,0.22)]"
              >
                <Phone className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
                Позвонить сейчас
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.76, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="glass hidden rounded-lg p-4 lg:block"
            aria-label="Быстрый вызов эвакуатора"
          >
            <div className="relative overflow-hidden rounded-lg border border-white/10">
              <img
                src={truckImage}
                alt="Эвакуатор перевозит автомобиль"
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-white/62">Ближайший экипаж</p>
                  <p className="text-2xl font-semibold">4,8 км</p>
                </div>
                <span className="rounded-md bg-[var(--lime)] px-3 py-2 text-sm font-semibold text-[#090909]">
                  На линии
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <p className="block text-sm text-white/68">Быстрый вызов</p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={phoneHref}
                  className="glow-button inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--orange)] px-4 py-3 text-sm font-bold text-[#090909]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Позвонить
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(184,255,90,0.5)] bg-[rgba(184,255,90,0.12)] px-4 py-3 text-sm font-bold text-white shadow-[0_0_22px_rgba(184,255,90,0.18)] transition hover:border-[var(--lime)] hover:bg-[rgba(184,255,90,0.18)]"
                >
                  <MessageCircle className="h-4 w-4 text-[var(--lime)]" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
              <p className="text-xs leading-5 text-white/48">
                Нажмите кнопку, диспетчер уточнит адрес, состояние авто и назовет точную цену до подачи.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="calculator" className="relative py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <Reveal>
            <div className="sticky top-24">
              <p className="mb-3 text-sm font-semibold text-[var(--orange)]">Smart-расчет</p>
              <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                Цена понятна до подачи эвакуатора
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/62">
                Укажите тип транспорта, расстояние и повреждения. Калькулятор сразу покажет
                ориентир, а диспетчер закрепит итоговую стоимость перед выездом.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-white/12 bg-white/7 p-4">
                  <span className="block text-3xl font-semibold text-[var(--lime)]">2</span>
                  <span className="mt-1 block text-white/58">свободных эвакуатора</span>
                </div>
                <div className="rounded-lg border border-white/12 bg-white/7 p-4">
                  <span className="block text-3xl font-semibold text-[var(--cyan)]">18</span>
                  <span className="mt-1 block text-white/58">минут средняя подача</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass rounded-lg p-4 sm:p-6">
              <div className="grid gap-6">
                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold">Тип авто</h3>
                    <span className="text-sm text-white/48">иконки помогают выбрать быстрее</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {vehicleTypes.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.id === vehicle;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setVehicle(item.id)}
                          className={`rounded-lg border p-4 text-left transition ${
                            isActive
                              ? "border-[var(--orange)] bg-[rgba(255,106,26,0.15)] text-white shadow-[0_18px_45px_rgba(255,106,26,0.16)]"
                              : "border-white/12 bg-black/20 text-white/68 hover:border-white/30 hover:bg-white/10"
                          }`}
                        >
                          <Icon className="mb-4 h-6 w-6" aria-hidden="true" />
                          <span className="block text-sm font-semibold">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-lg border border-white/12 bg-black/24 p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">Расстояние</h3>
                      <p className="mt-1 text-sm text-white/52">Маршрут по Донецку или ДНР</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-3xl font-semibold text-white">{distance} км</span>
                      <span className="text-sm text-white/48">примерно</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="120"
                    value={distance}
                    onChange={(event) => setDistance(Number(event.target.value))}
                    className="mt-6 h-2 w-full accent-[var(--orange)]"
                    aria-label="Расстояние перевозки"
                  />
                  <div className="mt-3 flex justify-between text-xs text-white/42">
                    <span>3 км</span>
                    <span>120 км</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Повреждения</h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {damageOptions.map((item) => {
                      const isActive = damages.includes(item.id);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleDamage(item.id)}
                          className={`flex min-h-24 items-start gap-3 rounded-lg border p-4 text-left transition ${
                            isActive
                              ? "border-[rgba(184,255,90,0.46)] bg-[rgba(184,255,90,0.1)]"
                              : "border-white/12 bg-black/20 hover:border-white/30"
                          }`}
                        >
                          <span
                            className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded border ${
                              isActive
                                ? "border-[var(--lime)] bg-[var(--lime)] text-[#090909]"
                                : "border-white/24"
                            }`}
                          >
                            {isActive ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                          </span>
                          <span>
                            <span className="block font-semibold">{item.label}</span>
                            <span className="mt-1 block text-sm text-white/48">+ {currency(item.price)}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-lg border border-[rgba(255,106,26,0.35)] bg-[linear-gradient(135deg,rgba(255,106,26,0.16),rgba(255,255,255,0.06))] p-5 sm:p-6">
                  <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <p className="text-sm text-white/58">Примерная стоимость</p>
                      <div className="mt-2 text-5xl font-semibold text-white sm:text-6xl">
                        <CountUp value={estimate} formatter={currency} />
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/56">
                        Финальная цена подтверждается до выезда. Без скрытых доплат за ночное время
                        в пределах согласованного маршрута.
                      </p>
                    </div>
                    <a
                      href={phoneHref}
                      className="glow-button inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--orange)] px-6 py-4 font-semibold text-[#090909]"
                    >
                      Вызвать за 1 клик
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold text-[var(--lime)]">Почему нам доверяют</p>
            <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Сервис эвакуации авто ДНР без лишней суеты
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <motion.article
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="h-full rounded-lg border border-white/12 bg-white/7 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/10 text-[var(--orange)]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-7 text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-3 leading-7 text-white/58">{item.text}</p>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="coverage" className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <div>
              <p className="mb-3 text-sm font-semibold text-[var(--cyan)]">Карта покрытия</p>
              <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                Донецк, районы города и маршруты по ДНР
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/62">
                Эвакуатор Донецк работает по центральным районам, частному сектору, промзонам,
                трассам и междугородним направлениям. Адрес можно назвать диспетчеру или отправить
                геометку в WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Центр", "Калининский", "Киевский", "Буденновский", "Макеевка", "Горловка", "ДНР"].map(
                  (zone) => (
                    <span
                      key={zone}
                      className="rounded-md border border-white/14 bg-white/8 px-3 py-2 text-sm text-white/70"
                    >
                      {zone}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass overflow-hidden rounded-lg p-2">
              <div className="relative min-h-[440px] overflow-hidden rounded-lg border border-white/10 bg-[#141414]">
                <iframe
                  title="Карта Донецка и зона работы эвакуатора"
                  src="https://yandex.ru/map-widget/v1/?ll=37.805000%2C48.015900&z=11&mode=search&text=%D0%94%D0%BE%D0%BD%D0%B5%D1%86%D0%BA"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0 opacity-80 grayscale"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(9,9,9,0.72),transparent_42%,rgba(255,106,26,0.16))]" />
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-lg border border-white/14 bg-black/70 p-4 backdrop-blur-xl">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-white/56">Работаем по всему ДНР</p>
                      <p className="mt-1 text-xl font-semibold">Подача к адресу, СТО, трассе или парковке</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-md bg-[var(--lime)] px-3 py-2 text-sm font-semibold text-[#090909]">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      Онлайн
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="prices" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold text-[var(--orange)]">Цены</p>
              <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                Форматы перевозки без таблиц и мелкого шрифта
              </h2>
            </div>
            <p className="max-w-md leading-7 text-white/58">
              Услуга рассчитывается прозрачно: тип транспорта, расстояние и состояние автомобиля.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {prices.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="group flex h-full flex-col rounded-lg border border-white/12 bg-white/7 p-6 transition hover:border-[rgba(255,106,26,0.55)] hover:bg-white/10"
                >
                  <div className="mb-7 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                      <p className="mt-2 text-white/55">{item.text}</p>
                    </div>
                    <Sparkles className="h-6 w-6 text-[var(--cyan)] opacity-72" aria-hidden="true" />
                  </div>
                  <p className="text-5xl font-semibold text-[var(--orange)]">{item.price}</p>
                  <ul className="mt-8 space-y-4 text-white/66">
                    {item.items.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--lime)]" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#calculator"
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border border-white/16 bg-black/24 px-4 py-3 font-semibold transition group-hover:border-[var(--orange)]"
                  >
                    Посчитать мой маршрут
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <Reveal>
            <p className="mb-3 text-sm font-semibold text-[var(--lime)]">Как мы работаем</p>
            <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              От звонка до доставки: один понятный маршрут
            </h2>
            <p className="mt-5 leading-8 text-white/62">
              Диспетчер держит связь, водитель уточняет подъезд, а автомобиль фиксируется перед
              выездом. Вся эвакуация авто ДНР проходит без лишних ожиданий.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative rounded-lg border border-white/12 bg-white/7 p-6">
              <div className="absolute left-8 right-8 top-1/2 hidden h-px bg-white/14 md:block" />
              <motion.div
                className="absolute left-8 top-1/2 hidden h-px bg-[var(--orange)] md:block"
                style={{ width: routeProgress }}
              />
              <motion.span
                className="absolute top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded bg-[var(--orange)] shadow-[0_0_32px_rgba(255,106,26,0.9)] md:block"
                style={{ left: routeProgress }}
              />
              <div className="grid gap-4 md:grid-cols-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="relative z-10 rounded-lg border border-white/12 bg-[#121212] p-5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--orange)] font-semibold text-[#090909]">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-xl font-semibold">{step}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/55">
                      {index === 0 && "Оставляете номер или звоните диспетчеру."}
                      {index === 1 && "Ближайший водитель выезжает к точке."}
                      {index === 2 && "Авто крепится и проверяется перед дорогой."}
                      {index === 3 && "Доставляем в сервис, гараж или на стоянку."}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="reviews" className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-lg border border-white/12">
              <img
                src={fleetImage}
                alt="Реальный эвакуатор с автомобилем на платформе"
                loading="lazy"
                className="h-[460px] w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm text-white/58">Социальное доказательство</p>
                <p className="mt-2 max-w-md text-3xl font-semibold">Более 1 800 выездов по Донецку и ДНР</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="mb-3 text-sm font-semibold text-[var(--cyan)]">Отзывы</p>
              <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                Когда машина уже на платформе, важно спокойствие
              </h2>

              <div className="glass mt-8 overflow-hidden rounded-lg p-6">
                <motion.div
                  key={activeReviewItem.name}
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.42 }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={activeReviewItem.avatar}
                      alt={`Фото клиента ${activeReviewItem.name}`}
                      loading="lazy"
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xl font-semibold">{activeReviewItem.name}</p>
                      <p className="text-sm text-white/50">{activeReviewItem.route}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-1 text-[var(--orange)]" aria-label="Рейтинг 5 из 5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                  <p className="mt-5 text-xl leading-9 text-white/78">"{activeReviewItem.text}"</p>
                </motion.div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex gap-2" aria-label="Навигация по отзывам">
                    {reviews.map((item, index) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setActiveReview(index)}
                        className={`h-3 w-9 rounded transition ${
                          activeReview === index
                            ? "bg-[var(--orange)] shadow-[0_0_22px_rgba(255,106,26,0.75)]"
                            : "bg-[rgba(97,240,255,0.72)] shadow-[0_0_18px_rgba(97,240,255,0.45)] hover:bg-[var(--cyan)]"
                        }`}
                        aria-label={`Открыть отзыв ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveReview((current) => (current - 1 + reviews.length) % reviews.length)
                      }
                      className="rounded-lg border border-[rgba(97,240,255,0.5)] bg-[rgba(97,240,255,0.15)] p-3 text-[var(--cyan)] shadow-[0_0_22px_rgba(97,240,255,0.22)] transition hover:border-[rgba(255,106,26,0.72)] hover:bg-[rgba(255,106,26,0.18)] hover:text-[var(--orange)]"
                      aria-label="Предыдущий отзыв"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveReview((current) => (current + 1) % reviews.length)}
                      className="rounded-lg border border-[rgba(97,240,255,0.5)] bg-[rgba(97,240,255,0.15)] p-3 text-[var(--cyan)] shadow-[0_0_22px_rgba(97,240,255,0.22)] transition hover:border-[rgba(255,106,26,0.72)] hover:bg-[rgba(255,106,26,0.18)] hover:text-[var(--orange)]"
                      aria-label="Следующий отзыв"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[linear-gradient(110deg,rgba(255,106,26,0.2),rgba(255,255,255,0.08),rgba(97,240,255,0.12))] p-6 sm:p-10">
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="mb-3 text-sm font-semibold text-[var(--lime)]">Срочный выезд</p>
                  <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                    Нужен эвакуатор прямо сейчас?
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-white/66">
                    Звоните или отправьте геолокацию в WhatsApp. Водитель рассчитает подъезд и
                    подаст платформу к удобному месту.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={phoneHref}
                    className="glow-button inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(255,106,26,0.78)] bg-[var(--orange)] px-6 py-4 font-bold text-[#090909] shadow-[0_0_34px_rgba(255,106,26,0.52)]"
                  >
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    Позвонить
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/16 bg-black/28 px-6 py-4 font-semibold transition hover:border-[var(--lime)] hover:bg-black/42"
                  >
                    <MessageCircle className="h-5 w-5 text-[var(--lime)]" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="mb-3 text-sm font-semibold text-[var(--orange)]">FAQ</p>
            <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Частые вопросы перед вызовом эвакуатора
            </h2>
          </Reveal>

          <div className="mt-10 space-y-3">
            {faq.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.04}>
                <details className="group rounded-lg border border-white/12 bg-white/7 p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                    {item.question}
                    <span className="text-[var(--orange)] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 leading-7 text-white/58">{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm text-white/56 sm:px-6 md:grid-cols-[1fr_auto_auto] lg:px-8">
          <div>
            <p className="text-lg font-semibold text-white">Эвакуатор Донецк 24/7</p>
            <p className="mt-3 max-w-md leading-6">
              Вызвать эвакуатор в Донецке, эвакуация авто ДНР, перевозка после ДТП,
              доставка в сервис и на стоянку.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-white">Контакты</p>
            <a className="block transition hover:text-white" href={phoneHref}>
              {phoneDisplay}
            </a>
            <a className="block transition hover:text-white" href={whatsappHref}>
              WhatsApp
            </a>
            <span className="block">Донецк, ДНР</span>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-white">Быстрые ссылки</p>
            <a className="block transition hover:text-white" href="#calculator">
              Рассчитать стоимость
            </a>
            <a className="block transition hover:text-white" href="#prices">
              Цены
            </a>
            <a className="block transition hover:text-white" href="#coverage">
              Карта покрытия
            </a>
            <a className="block transition hover:text-white" href="#">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </footer>

      <a
        href={phoneHref}
        className="glow-button fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-lg bg-[var(--orange)] px-4 py-4 font-semibold text-[#090909] shadow-[0_18px_60px_rgba(0,0,0,0.36)]"
        aria-label="Позвонить и вызвать эвакуатор"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">Вызвать эвакуатор</span>
      </a>
    </main>
  );
}
