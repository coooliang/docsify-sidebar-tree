(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (factory());
}(this, (function () {
    'use strict';

    function styleInject(css, ref) {
        if (ref === void 0) ref = {};
        var insertAt = ref.insertAt;

        if (!css || typeof document === 'undefined') { return; }

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';

        if (insertAt === 'top') {
            if (head.firstChild) {
                head.insertBefore(style, head.firstChild);
            } else {
                head.appendChild(style);
            }
        } else {
            head.appendChild(style);
        }

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }
    var css = ".sidebar-nav li { position: relative; margin: 0; cursor: pointer } .folder::before { content: ''; display: block; position: absolute; top: 11px; left: -12px; height: 6px; width: 6px; border-right: 1px solid #505d6b; border-bottom: 1px solid #505d6b; transform: rotate(-45deg); transition: transform .1s } .sidebar-nav>ul>li ul { display: none; } .open::before { transform: rotate(45deg) } .collapse::before { transform: rotate(-45deg) }";
    styleInject(css);


    var clickFolderClassCache = [];
    var sidebarTreeOpen = false;
    function docsifySidebarTreeCode(hook, vm) {
        hook.doneEach(function () {
            addFolderFileClass();
            openActiveToRoot();
            console.log('docsify-sidebar-tree hook.doneEach');
        });
        hook.ready(function () {
            // addFolderFileClass();

            console.log('docsify-sidebar-tree hook.ready');
        });

        hook.mounted(function () {
            console.log('docsify-sidebar-tree hook.mounted');
        });
    }

    function folderClick(e) {
        e.target.childNodes.forEach(function (ul) {
            if (ul.tagName === 'UL') {
                if (ul.style.display === '' || ul.style.display === 'none') {
                    ul.style.display = 'block';
                    ul.parentNode.classList.remove('collapse');
                    ul.parentNode.classList.add('open');
                } else {
                    ul.style.display = 'none';
                    ul.parentNode.classList.remove('open');
                    ul.parentNode.classList.add('collapse');
                }
            }
        })

        //add cache
        var isRecord = false;
        if ((sidebarTreeOpen && e.target.classList.contains('collapse')) || (sidebarTreeOpen == false && e.target.classList.contains('open'))) {
            isRecord = true;
        }
        e.target.classList.forEach(cls => {
            if (cls.indexOf('folder-index-') != -1) {
                if (isRecord && !clickFolderClassCache.includes(cls)) {
                    clickFolderClassCache.push(cls);
                } else {
                    clickFolderClassCache.pop(cls);
                }
            }
        });
    }

    function getActiveNode() {
        var node = document.querySelector('.sidebar-nav .active');
        if (!node) {
            var curLink = document.querySelector(".sidebar-nav a[href=\"".concat(decodeURIComponent(location.hash).replace(/ /gi, '%20'), "\"]"));
            node = findTagParent(curLink, 'LI', 2);
            if (node) {
                node.classList.add('active');
            }
        }
        return node;
    }
    function openActiveToRoot() {
        var node = getActiveNode();
        if (node) {
            node.classList.add('open', 'active');
            if (node.parentNode && node.parentNode.tagName === 'UL') {
                node.parentNode.style.display = 'block';
            }
        }
    }

    //main
    function addFolderFileClass() {
        document.querySelectorAll('.sidebar-nav li').forEach(function (li, index) {
            if (li.querySelector('ul')) {
                li.classList.add('folder');
                li.addEventListener('click', folderClick);
            } else {
                li.classList.add('file');
            }
        });

        document.querySelectorAll(".sidebar-nav>ul>li").forEach(function (li, index) {
            li.classList.add('folder-index-'.concat(index));
            if (window.$docsify && window.$docsify.sidebarTree && window.$docsify.sidebarTree.open) {
                sidebarTreeOpen = true;
                li.querySelector("ul").style.display = 'block';
            }
        });

        //cache set folder
        clickFolderClassCache.forEach(function (cls) {
            var _cls = '.'.concat(cls);
            if (sidebarTreeOpen) {
                document.querySelector(_cls).querySelector("ul").style.display = 'none';
            } else {
                document.querySelector(_cls).querySelector("ul").style.display = 'block';
            }
        });
    }

    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = [docsifySidebarTreeCode].concat(window.$docsify.plugins || []);
})));
