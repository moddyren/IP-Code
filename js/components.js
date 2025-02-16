// 加载组件的函数
function loadComponent(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            
            // 如果是header，设置当前页面的导航链接激活状态
            if (elementId === 'header') {
                setActiveNavLink();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

// 设置当前页面的导航链接激活状态
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // 移除所有active类
    document.querySelectorAll('.nav-links a, .nav-links .dropdown span').forEach(link => {
        link.classList.remove('active');
    });
    
    // 设置当前页面的链接为active
    if (currentPath.includes('access-probes') || 
        currentPath.includes('IP1X') || 
        currentPath.includes('IP2X') || 
        currentPath.includes('IP3X') || 
        currentPath.includes('IP4X')) {
        document.querySelector('.dropdown span').classList.add('active');
    } else if (currentPath.includes('water-ingress') || 
               currentPath.includes('ipx')) {
        document.querySelector('.dropdown span').classList.add('active');
    } else {
        const link = document.querySelector(`.nav-links a[href*="${currentPath}"]`);
        if (link) {
            link.classList.add('active');
        }
    }
}

// 当DOM加载完成后加载组件
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('components/header.html', 'header');
    loadComponent('components/footer.html', 'footer');
}); 