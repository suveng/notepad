const { app } = require('electron');
export var appMenuTemplate = [
    {
        label: '文件',
        submenu: []
    },
    {
        label: '编辑',
        submenu: [
            {   
            	label: '撤销',
                role: 'undo'
            },
            {
            	label: '回退',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
            	label: '剪切',
                role: 'cut'
            },
            {
            	label: '复制',
                role: 'copy'
            },
            {
            	label: '粘贴',
                role: 'paste'
            },
            {
            	label: '带样式粘贴',
                role: 'pasteandmatchstyle'
            },
            {
            	label: '删除',
                role: 'delete'
            },
            {
            	label: '选择全部',
                role: 'selectall'
            }
        ]
    },
    {
        label: '视图',
        submenu: [
            {
            	label: '重载',
                role: 'reload'
            },
            {
            	label: '强制重载',
                role: 'forcereload'
            },
            {
            	label: '打开devtools',
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
            	label: '还原尺寸',
                role: 'resetzoom'
            },
            {
            	label: '放大',
                role: 'zoomin'
            },
            {
            	label: '缩小',
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
            	label: '全屏',
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: '帮助',
        submenu: [
            {
                label: 'Home Page',
                click() { require('electron').shell.openExternal('http://www.jianshu.com/u/a7454e40399d'); }
            }
        ]
    }
];