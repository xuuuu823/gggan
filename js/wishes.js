class WishPool {
    constructor() {
        this.wishForm = document.getElementById('wishForm');
        this.wishInput = document.getElementById('wishInput');
        this.wishList = document.getElementById('wishList');
        
        // 从 localStorage 加载保存的愿望
        this.wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
        
        this.initEventListeners();
        this.loadWishes();
    }

    initEventListeners() {
        this.wishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const wishText = this.wishInput.value.trim();
            if (wishText) {
                this.addWish(wishText);
                this.wishInput.value = '';
            }
        });
    }

    loadWishes() {
        // 加载所有保存的愿望
        this.wishes.forEach(wish => {
            this.displayWish(wish.text, wish.time);
        });
    }

    addWish(text) {
        const time = this.getCurrentTime();
        this.displayWish(text, time);
        
        // 保存愿望到 localStorage
        this.wishes.push({ text, time });
        localStorage.setItem('wishes', JSON.stringify(this.wishes));
    }

    displayWish(text, time) {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        
        // 计算颜色渐变
        const timeColor = this.getColorByTime(time);
        
        wishItem.innerHTML = `
            <div class="wish-content" style="background: ${timeColor}">
                <p class="wish-text">${text}</p>
                <span class="wish-time">
                    ${time.split(' ')[0].slice(5)}
                    <br>
                    ${time.split(' ')[1]}
                </span>
            </div>
            <div class="wish-stars">
                ✨ ⭐ 💫
            </div>
        `;
        
        // 添加动画效果
        wishItem.style.animationDelay = `${Math.random() * 0.5}s`;
        this.wishList.appendChild(wishItem);
    }

    getColorByTime(timeString) {
        const now = new Date();
        const wishTime = new Date(timeString);
        const diffDays = Math.floor((now - wishTime) / (1000 * 60 * 60 * 24));
        
        // 根据时间差设置不同的渐变色
        if (diffDays < 1) {
            // 今天：粉色渐变
            return 'linear-gradient(135deg, #ffcdd2, #f8bbd0)';
        } else if (diffDays < 3) {
            // 最近3天：紫色渐变
            return 'linear-gradient(135deg, #e1bee7, #ce93d8)';
        } else if (diffDays < 7) {
            // 最近一周：蓝色渐变
            return 'linear-gradient(135deg, #bbdefb, #90caf9)';
        } else if (diffDays < 30) {
            // 最近一月：绿色渐变
            return 'linear-gradient(135deg, #c8e6c9, #a5d6a7)';
        } else {
            // 更早：金色渐变
            return 'linear-gradient(135deg, #fff3e0, #ffe0b2)';
        }
    }

    getCurrentTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WishPool();
}); 