document.addEventListener('DOMContentLoaded', () => {
    // Khai báo các phần tử DOM
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameInput = document.getElementById('username-input');
    const userInfo = document.getElementById('user-info');
    const userDisplay = document.getElementById('user-display');
    const searchInput = document.getElementById('search-input');
    const postsContainer = document.getElementById('posts-container');
    const topPostsContainer = document.getElementById('top-posts-container');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    
    let currentUser = localStorage.getItem('currentUser');
    const ADMIN_USER = 'Trung Kien';
    let posts = JSON.parse(localStorage.getItem('creativePosts')) || [];
    let userPoints = JSON.parse(localStorage.getItem('userPoints')) || {};
    let proposedChallenges = JSON.parse(localStorage.getItem('proposedChallenges')) || [];

    // Các hàm xử lý dữ liệu
    function savePosts() {
        localStorage.setItem('creativePosts', JSON.stringify(posts));
    }
    
    function saveUserPoints() {
        localStorage.setItem('userPoints', JSON.stringify(userPoints));
    }

    function updateUserPoints(username, pointsToAdd) {
        if (!userPoints[username]) {
            userPoints[username] = 0;
        }
        userPoints[username] += pointsToAdd;
        saveUserPoints();
    }
    
    function renderPosts(filteredPosts = posts) {
        postsContainer.innerHTML = '';
        filteredPosts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-item');

            const postHeader = document.createElement('div');
            postHeader.classList.add('post-header');
            postHeader.innerHTML = `<h4>${post.author}</h4>`;
            
            let mediaHtml = '';
            if (post.fileType && post.fileUrl) {
                if (post.fileType.startsWith('image')) {
                    mediaHtml = `<img src="${post.fileUrl}" alt="${post.text}">`;
                } else if (post.fileType.startsWith('video')) {
                    mediaHtml = `<video controls src="${post.fileUrl}"></video>`;
                } else if (post.fileType.startsWith('audio')) {
                    mediaHtml = `<audio controls src="${post.fileUrl}"></audio>`;
                }
            }
            
            if (mediaHtml) {
                postElement.appendChild(document.createRange().createContextualFragment(mediaHtml));
            }

            if (post.text) {
                const textElement = document.createElement('p');
                textElement.innerText = post.text;
                postElement.appendChild(textElement);
            }
            
            const actionsElement = document.createElement('div');
            actionsElement.classList.add('actions');

            let manageBtnsHtml = '';
            if (currentUser && (post.author === currentUser || currentUser === ADMIN_USER)) {
                manageBtnsHtml = `
                    <button class="edit-btn" data-id="${post.id}">Sửa</button>
                    <button class="delete-btn" data-id="${post.id}">Xóa</button>
                `;
            } else if (currentUser === ADMIN_USER) {
                    manageBtnsHtml = `<button class="delete-btn" data-id="${post.id}">Xóa</button>`;
            }
            
            actionsElement.innerHTML = `
                <button class="like-btn" data-id="${post.id}">❤️ <span class="like-count">${post.likes || 0}</span></button>
                <input type="text" class="comment-input" placeholder="Viết bình luận..." data-id="${post.id}">
                ${manageBtnsHtml}
            `;
            
            postElement.appendChild(postHeader);
            postElement.appendChild(actionsElement);
            
            if (post.comments && post.comments.length > 0) {
                const commentsContainer = document.createElement('div');
                commentsContainer.classList.add('comments-container');
                post.comments.forEach((comment, commentIndex) => {
                    const commentElement = document.createElement('p');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `
                        <strong>${comment.author}</strong>: <span>${comment.text}</span>
                        <span class="comment-actions">
                            <button class="like-comment-btn" data-post-id="${post.id}" data-comment-index="${commentIndex}">❤️ <span class="like-count">${comment.likes || 0}</span></button>
                            <button class="edit-comment-btn" data-post-id="${post.id}" data-comment-index="${commentIndex}">Sửa</button>
                            <button class="delete-comment-btn" data-post-id="${post.id}" data-comment-index="${commentIndex}">Xóa</button>
                        </span>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
                postElement.appendChild(commentsContainer);
            }

            postsContainer.appendChild(postElement);
        });
        
        // Cần thêm các Event Listener cho các nút Like, Comment, Edit, Delete
        // ... (phần này sẽ được thêm vào trong file main.js hoàn chỉnh)
    }

    function renderTopPosts() {
        topPostsContainer.innerHTML = '';
        const sortedPosts = [...posts].sort((a, b) => (b.likes || 0) - (a.likes || 0));
        const top1Posts = sortedPosts.slice(0, 1);

        top1Posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-item', 'top-post-item');

            const postHeader = document.createElement('div');
            postHeader.classList.add('post-header');
            postHeader.innerHTML = `<h4>${post.author}</h4>`;
            
            let mediaHtml = '';
            if (post.fileType && post.fileUrl) {
                if (post.fileType.startsWith('image')) {
                    mediaHtml = `<img src="${post.fileUrl}" alt="${post.text}">`;
                } else if (post.fileType.startsWith('video')) {
                    mediaHtml = `<video controls src="${post.fileUrl}"></video>`;
                } else if (post.fileType.startsWith('audio')) {
                    mediaHtml = `<audio controls src="${post.fileUrl}"></audio>`;
                }
            }

            if (mediaHtml) {
                postElement.appendChild(document.createRange().createContextualFragment(mediaHtml));
            }
            
            if (post.text) {
                const textElement = document.createElement('p');
                textElement.innerText = post.text;
                postElement.appendChild(textElement);
            }
            
            const likesElement = document.createElement('p');
            likesElement.classList.add('top-likes');
            likesElement.innerText = `❤️ ${post.likes || 0} lượt thích`;
            
            postElement.appendChild(postHeader);
            postElement.appendChild(likesElement);

            topPostsContainer.appendChild(postElement);
        });
    }

    function renderLeaderboard() {
        leaderboardContainer.innerHTML = '';
        
        const sortedUsers = Object.entries(userPoints)
                                .sort(([,a],[,b]) => b - a)
                                .slice(0, 10);

        if (sortedUsers.length > 0) {
            const list = document.createElement('ol');
            sortedUsers.forEach(([username, points], index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('leaderboard-item');
                listItem.innerHTML = `
                    <span class="leaderboard-rank">${index + 1}.</span>
                    <span class="leaderboard-user">${username}</span>
                    <span class="leaderboard-points">${points} điểm</span>
                `;
                list.appendChild(listItem);
            });
            leaderboardContainer.appendChild(list);
        } else {
            leaderboardContainer.innerHTML = '<p>Chưa có ai ghi điểm. Hãy là người đầu tiên!</p>';
        }
    }
    
    // Cập nhật giao diện trang chủ
    function updateUI() {
        if (currentUser) {
            loginForm.style.display = 'none';
            userInfo.style.display = 'flex';
            userDisplay.innerText = `Chào, ${currentUser}!`;
        } else {
            loginForm.style.display = 'flex';
            userInfo.style.display = 'none';
        }
        renderPosts();
        renderTopPosts();
        renderLeaderboard();
    }

    // Xử lý sự kiện đăng nhập, đăng xuất
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            localStorage.setItem('currentUser', username);
            currentUser = username;
            updateUI();
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        currentUser = null;
        updateUI();
        location.reload();
    });

    // Xử lý sự kiện tìm kiếm
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredPosts = posts.filter(post => 
            (post.text && post.text.toLowerCase().includes(query)) ||
            (post.author && post.author.toLowerCase().includes(query)) ||
            (post.comments && post.comments.some(comment => comment.text.toLowerCase().includes(query)))
        );
        renderPosts(filteredPosts);
    });

    // Gọi hàm khởi tạo khi trang tải xong
    updateUI();
});