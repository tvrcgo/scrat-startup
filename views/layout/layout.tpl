<!doctype html>
{% html %}
    {% head %}
        <link rel="dns-prefetch" href="">
        <meta charset="utf-8"/>
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
        <link rel="icon" href="favicon.ico" />
        {% require $id="./layout.css" %}
        {% require $id="./js/md.js" %}
        {% script %}{% endscript %}
    {% endhead %}
    {% body %}
        {% pagelet $id="layout" class="layout" %}
            {% block body %}{# 用于继承的block区域 #}{% endblock %}
        {% endpagelet %}
        {% ATF %}
    {% endbody %}
    <!--livereload-->
{% endhtml %}
