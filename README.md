<div align="center">

<br/>

# 🫧 Yandex Direct Chart Modifier

<img src="https://img.shields.io/badge/Tampermonkey-00485B?style=for-the-badge&logo=tampermonkey&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/version-1.0.0-blueviolet?style=for-the-badge"/>
<img src="https://img.shields.io/badge/license-MIT-0ea5e9?style=for-the-badge"/>

<br/>

> *Тихо. Прозрачно. Без следов.*  
> Перераспределяет клики на графике Яндекс Директ в один клик.

<br/>

https://github.com/user-attachments/assets/31f157c9-8d28-4ee6-918c-69e1778e3f5d

<br/>

</div>

---

## 〇 Что происходит под капотом

```
Введённое число  ──►  Алгоритм случайного разбиения  ──►  30 столбцов SVG
                                                              └─ сумма всегда = N
```

| Шаг | Действие |
|-----|----------|
| 1 | Считывает SVG-график `ClickColumnChart.ColumnsStacked` |
| 2 | Генерирует 30 случайных частей, сумма которых равна введённому числу |
| 3 | Обновляет `y` и `height` каждого `<rect>` |
| 4 | Обновляет текстовый счётчик кликов |

---

## 〇 Установка

**1 —** Установи Tampermonkey

<a href="https://www.tampermonkey.net/"><img src="https://img.shields.io/badge/Скачать_Tampermonkey-00485B?style=for-the-badge&logo=tampermonkey&logoColor=white"/></a>

**2 —** Создай новый скрипт в расширении

**3 —** Вставь содержимое `yandex_direct_temper.user.js` и сохрани `Ctrl+S`

---

## 〇 Использование

Открой страницу кампании:

```
https://direct.yandex.ru/wizard/smb-campaign/*
```

Затем:

```
Двойной клик  →  правый верхний угол (зона 60×60 px)
Ввод числа    →  Enter или кнопка «Применить»
Готово        →  график обновлён
```

---

## 〇 Управление

| Жест / клавиша | Действие |
|----------------|----------|
| `двойной клик` в углу | Открыть меню |
| `Enter` | Применить значение |
| `Escape` | Закрыть меню |
| `×` или клик вне панели | Закрыть меню |

---

## 〇 Требования

- Браузер на Chromium или Firefox
- Tampermonkey (или Violentmonkey)
- Страница Яндекс Директ с активным графиком

---

## 〇 Структура проекта

```
📦 yandex-direct-chart-modifier
 └── yandex_direct_temper.user.js   # единственный файл, всё здесь
```

---

<div align="center">

<br/>

Сделано с холодным расчётом и горячим кофе ☕

<br/>

</div>
