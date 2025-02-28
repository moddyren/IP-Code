// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// 移动端导航栏
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const body = document.body;

mobileNavToggle.addEventListener('click', () => {
    const isOpen = mobileNavToggle.classList.contains('active');
    
    mobileNavToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // 禁止/允许背景滚动
    if (!isOpen) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// 点击移动端导航链接时关闭菜单
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏活动链接
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// 处理所有Web3Forms表单提交
function handleFormSubmit(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const formStatus = this.querySelector('.form-status');
        const originalButtonText = submitButton.textContent;
        
        // 禁用提交按钮
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // 成功提交
                formStatus.textContent = 'Thank you for your message. We will contact you soon!';
                formStatus.className = 'form-status success';
                this.reset();
            } else {
                // 提交失败
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = 'Failed to send message. Please try again later.';
            formStatus.className = 'form-status error';
        } finally {
            // 恢复提交按钮
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            
            // 5秒后清除状态消息
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }
    });
}

// 初始化所有表单
document.addEventListener('DOMContentLoaded', () => {
    // 处理所有Web3Forms表单
    const forms = document.querySelectorAll('form[action*="web3forms"]');
    forms.forEach(form => handleFormSubmit(form));

    // 页面加载动画
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease-in-out';
            hero.style.opacity = '1';
        }, 100);
    }
});

// 产品图片切换功能
function changeImage(src, thumbnail) {
    // 更新主图片
    document.getElementById('main-product-image').src = src;
    
    // 移除所有缩略图的active类
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // 给当前点击的缩略图添加active类
    thumbnail.classList.add('active');
} 