<div class="w-article">
{% if story %}
    <h1 class="w-article-title">{{ story.title|trim }}</h1>
    <div class="w-article-meta"><span class="w-article-source">{{ story.source }}</span><span class="w-article-time">{{ story.publish_time|timeformat }}</span></div>
    <div class="w-article-text">{{ story|content|raw }}</div>
    <div class="w-article-original"><a href="{{ story.original_url }}">READ SOURCE</a></div>
{% else %}
    <div class="w-article-notfound">Story not found.</div>
{% endif %}
</div>
