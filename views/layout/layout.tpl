<!doctype html>
{% html %}
    {% head %}
        <link rel="dns-prefetch" href="">
        <meta charset="utf-8"/>
        <script type="text/javascript">var _START_TIME = +new Date;</script>
        {% title %}{% autoescape false %}{{ title }}{% endautoescape %}{% endtitle %}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="keywords" content="{% autoescape false %}{{ keywords }}{% endautoescape %}" />
        <meta name="description" content="{% autoescape false %}{{ description }}{% endautoescape %}" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telphone=no, email=no" />
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="HandheldFriendly" content="true">
        <meta name="MobileOptimized" content="320">
        <meta name="screen-orientation" content="portrait">
        <meta name="x5-orientation" content="portrait">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="preread" content="no">
        <script type='text/javascript' src="./js/ga.js?__inline"></script>
        {% require $id="./layout.css" %}
        {% require $id="./js/md.js" %}
        {% require $id="./js/pagelet.js" %}
    {% endhead %}
    {% body %}
        {% pagelet $id="layout" class="layout" %}
            {% block body %}{% endblock %}
        {% endpagelet %}
        {% require $id="lib/stat" %}
        {% ATF %}
    {% endbody %}
    {% require $id="./layout.js" %}
    <!--livereload-->
{% endhtml %}
