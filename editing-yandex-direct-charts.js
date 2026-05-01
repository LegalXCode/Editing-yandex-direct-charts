// ==UserScript==
// @name         Yandex Direct Chart Modifier
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Распределяет введённое число на 30 столбцов графика
// @author       You
// @match        https://direct.yandex.ru/wizard/smb-campaign/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function distributeTotal(total, nParts) {
        if (total < nParts) {
            return new Array(nParts).fill(1);
        }

        const splits = [0];
        for (let i = 0; i < nParts - 1; i++) {
            splits.push(Math.floor(Math.random() * (total - 1)) + 1);
        }
        splits.push(total);
        splits.sort((a, b) => a - b);

        const parts = [];
        for (let i = 0; i < nParts; i++) {
            parts.push(splits[i + 1] - splits[i]);
        }

        for (let i = parts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [parts[i], parts[j]] = [parts[j], parts[i]];
        }

        return parts;
    }

    function updateChart(totalValue) {
        const svg = document.querySelector('svg.dc-ChartSvgContainer__svg[data-testid="ClickColumnChart.ColumnsStacked"]');
        if (!svg) {
            alert('График не найден на странице');
            return;
        }

        const rects = svg.querySelectorAll('rect[fill="var(--dc-chart-blue-100)"]');
        if (rects.length !== 30) {
            alert(`Найдено ${rects.length} столбцов, ожидалось 30`);
            return;
        }

        const heights = distributeTotal(totalValue, 30);

        rects.forEach((rect, index) => {
            const height = heights[index];
            const y = 204 - height;

            rect.setAttribute('y', y);
            rect.setAttribute('height', height);
        });

        const textElement = document.querySelector('p[data-testid="Text"].dc-Text__text.dc-verticalAlign');
        if (textElement) {
            textElement.textContent = totalValue.toString();
        }

        alert(`Обновлено 30 столбцов, сумма = ${heights.reduce((a, b) => a + b, 0)}`);
    }

    let panel = null;
    let triggerZone = null;

    function createTriggerZone() {
        triggerZone = document.createElement('div');
        triggerZone.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            width: 60px;
            height: 60px;
            z-index: 999998;
            background: transparent;
            cursor: crosshair;
        `;
        triggerZone.title = 'Двойной клик для открытия меню';

        triggerZone.addEventListener('dblclick', (e) => {
            e.preventDefault();
            showPanel();
        });

        document.body.appendChild(triggerZone);
    }

    function showPanel() {
        if (panel) {
            panel.style.display = 'block';
            return;
        }

        panel = document.createElement('div');
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 999999;
            background: white;
            border: 2px solid #ff6b6b;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-family: Arial, sans-serif;
        `;

        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-weight: bold; color: #333;">📊 Chart Modifier</span>
                <button id="temper-close" style="
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 0 5px;
                    color: #666;
                ">×</button>
            </div>
            <input type="number" id="temper-input" placeholder="Введите число" style="
                width: 120px;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-right: 5px;
            ">
            <button id="temper-btn" style="
                padding: 8px 15px;
                background: #ff6b6b;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
            ">Применить</button>
        `;

        document.body.appendChild(panel);

        const input = document.getElementById('temper-input');
        input.focus();

        document.getElementById('temper-btn').addEventListener('click', () => {
            const value = parseInt(input.value, 10);
            if (isNaN(value) || value < 0) {
                alert('Введите положительное число');
                return;
            }
            updateChart(value);
            hidePanel();
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('temper-btn').click();
            }
        });

        document.getElementById('temper-close').addEventListener('click', () => {
            hidePanel();
        });

        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                hidePanel();
            }
        };
        document.addEventListener('keydown', escapeHandler);

        const outsideClickHandler = (e) => {
            if (!panel.contains(e.target) && e.target !== triggerZone) {
                hidePanel();
            }
        };
        setTimeout(() => {
            document.addEventListener('click', outsideClickHandler);
        }, 100);

        panel._cleanup = () => {
            document.removeEventListener('keydown', escapeHandler);
            document.removeEventListener('click', outsideClickHandler);
        };
    }

    function hidePanel() {
        if (panel) {
            if (panel._cleanup) panel._cleanup();
            panel.remove();
            panel = null;
        }
    }

    function createInputPanel() {
        createTriggerZone();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createInputPanel);
    } else {
        createInputPanel();
    }
})();
