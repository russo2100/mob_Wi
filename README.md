# Natively - Приложение умного дома

![Natively Logo](./assets/images/natively-dark.png)

Мобильное приложение для управления умными устройствами в доме, разработанное с использованием React Native, Expo и TypeScript.

## 🚀 Возможности

- **Управление устройствами**: Контроль освещения, климата, розеток и других умных устройств
- **Управление по комнатам**: Организация устройств по комнатам для удобного управления
- **Быстрые действия**: Мгновенное управление всеми устройствами одной кнопкой
- **Мониторинг сети**: Отслеживание статуса подключения к Wi-Fi
- **Кроссплатформенность**: Работает на iOS, Android и в браузере
- **Современный UI**: Темная тема с интуитивным интерфейсом

## 📱 Поддерживаемые устройства

- 💡 Освещение (с регулировкой яркости)
- 🌡️ Термостаты и кондиционеры (с контролем температуры)
- 📺 Телевизоры
- 🔌 Умные розетки
- 🔐 Замки
- 📹 Камеры
- 🔊 Колонки
- 🪟 Жалюзи
- 💨 Вентиляторы

## 🛠 Технологии

- **React Native 0.81.4** - основной фреймворк
- **Expo 54.0.1** - платформа для разработки
- **TypeScript 5.8.3** - типобезопасность
- **Expo Router 6.0.0** - файловая навигация
- **React Native Reanimated** - анимации
- **Expo Network** - мониторинг сети

## 📦 Установка

### Предварительные требования

- Node.js (версия 18 или выше)
- npm или yarn
- Expo CLI
- Android Studio (для разработки под Android)
- Xcode (для разработки под iOS, только на macOS)

### Установка зависимостей

```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/natively.git
cd natively

# Установите зависимости
npm install

# Или с yarn
yarn install
```

## 🚀 Запуск приложения

### Режим разработки

```bash
# Запуск в режиме разработки
npm run dev

# Запуск на Android
npm run android

# Запуск на iOS
npm run ios

# Запуск в браузере
npm run web
```

### Сборка для продакшена

```bash
# Сборка веб-версии
npm run build:web

# Подготовка к сборке Android
npm run build:android
```

## 📱 Платформы

### iOS
- Поддержка iPhone и iPad
- Минимальная версия: iOS 13.0
- Использует нативные SF Symbols

### Android
- Поддержка смартфонов и планшетов
- Минимальная версия: Android 6.0 (API 23)
- Edge-to-edge дизайн
- Материальные иконки

### Web (PWA)
- Прогрессивное веб-приложение
- Работает во всех современных браузерах
- Поддержка Service Workers

## 🏗 Архитектура

```
app/
├── _layout.tsx              # Корневая навигация
├── (index)/                 # Главный экран
│   ├── _layout.tsx         # Layout главного экрана
│   └── index.tsx           # Домашняя страница
├── device/[id].tsx         # Детали устройства
├── room/[id].tsx           # Управление комнатой
└── settings.tsx            # Настройки

components/
├── DeviceCard.tsx          # Карточка устройства
├── RoomCard.tsx            # Карточка комнаты
├── QuickActions.tsx        # Быстрые действия
├── NetworkStatus.tsx       # Статус сети
└── IconSymbol.tsx          # Кроссплатформенные иконки

hooks/
└── useDevices.ts           # Логика управления устройствами

types/
└── Device.ts               # TypeScript типы
```

## 🎨 Настройка

### Цветовая схема

Приложение использует темную цветовую схему, которую можно настроить в файле `styles/commonStyles.ts`:

```typescript
export const colors = {
  primary: '#162456',
  secondary: '#193cb8',
  accent: '#64B5F6',
  background: '#101824',
  backgroundAlt: '#162133',
  text: '#e3e3e3',
  grey: '#90CAF9',
};
```

### Добавление новых устройств

1. Обновите тип `DeviceType` в `types/Device.ts`
2. Добавьте обработку в компонентах
3. Обновите моковые данные в `hooks/useDevices.ts`

## 🔧 Разработка

### Структура кода

- **TypeScript**: Весь код написан на TypeScript для типобезопасности
- **Компонентный подход**: Переиспользуемые компоненты
- **Файловая навигация**: Expo Router с file-based routing
- **Custom hooks**: Логика вынесена в кастомные хуки

### Линтинг и форматирование

```bash
# Проверка кода
npm run lint

# ESLint настроен в .eslintrc.js
```

### Отладка

- **Flipper**: Поддержка отладки через Flipper
- **Console logs**: Подробное логирование действий
- **Error boundary**: Обработка ошибок

## 🧪 Тестирование

```bash
# В планах добавить тесты
npm test
```

## 📚 API

### useDevices Hook

```typescript
const {
  devices,           // Список всех устройств
  rooms,             // Список комнат
  loading,           // Состояние загрузки
  toggleDevice,      // Переключить устройство
  updateDeviceProperty, // Обновить свойство
  getDevicesByRoom,  // Получить устройства комнаты
  getOnlineDevicesCount, // Количество онлайн устройств
  refreshDevices     // Обновить список
} = useDevices();
```

### Device Interface

```typescript
interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  room: string;
  icon: string;
  color: string;
  properties?: DeviceProperties;
}
```

## 🚀 Развертывание

### EAS Build (рекомендуется)

```bash
# Установите EAS CLI
npm install -g @expo/eas-cli

# Войдите в аккаунт
eas login

# Настройте проект
eas build:configure

# Соберите для Android
eas build --platform android

# Соберите для iOS
eas build --platform ios
```

### Веб-развертывание

```bash
# Сборка статических файлов
npm run build:web

# Файлы готовы для развертывания из папки dist/
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Поддержка

- 📧 Email: support@natively.app
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/natively/issues)
- 📖 Документация: [Wiki](https://github.com/your-username/natively/wiki)

## 🎯 Roadmap

### В разработке
- [ ] Интеграция с реальными IoT устройствами
- [ ] Система аутентификации
- [ ] Облачная синхронизация
- [ ] Автоматизация и сценарии

### Планируется
- [ ] Голосовое управление
- [ ] Виджеты для домашнего экрана
- [ ] Интеграция с HomeKit/Google Home
- [ ] Аналитика потребления энергии

---

**Сделано с ❤️ для умного дома**