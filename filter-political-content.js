// ==UserScript==
// @name         GitHub 搜索屏蔽关键词结果
// @version      1.0
// @description  自动隐藏 GitHub 搜索结果中包含特定关键词的项目（如政治相关）
// @author       Mikanku
// @match        https://github.com/search*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 设置屏蔽关键词（可自行扩展）
    const blockedKeywords = ['politics', '新冠', '中共', '共产主义', '六四', '法轮功', '新疆', 'covid', 'china-dictatorship'];


    function hideBlockedResults() {
        // 选择所有项目块（列表卡片）
        const divs = document.querySelectorAll('[data-testid="results-list"] > div');

        divs.forEach(div => {
            const text = div.innerHTML.toLowerCase();  // 获取 HTML 字符串
            const shouldDelete = blockedKeywords.some(keyword => text.includes(keyword.toLowerCase()));
            if (shouldDelete) {
                div.remove(); // 删除整个包含关键词的 div
            }
        });
    }

    // 初次加载执行
    hideBlockedResults();

    // 如果 GitHub 动态加载（无需刷新），监听页面变化
    const observer = new MutationObserver(() => {
        hideBlockedResults();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
