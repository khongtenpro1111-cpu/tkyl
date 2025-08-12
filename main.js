// main.js

document.addEventListener('DOMContentLoaded', () => {
    const challengeText = document.getElementById('challenge-text');
    const uploadBtn = document.getElementById('upload-btn');
    const postsContainer = document.getElementById('posts-container');
    const uploadForm = document.getElementById('upload-form');
    const modal = document.getElementById('upload-modal');
    const closeBtn = document.getElementsByClassName('close-btn')[0];
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameInput = document.getElementById('username-input');
    const userInfo = document.getElementById('user-info');
    const userDisplay = document.getElementById('user-display');
    const postTitleInput = document.getElementById('post-title');
    const postIdInput = document.getElementById('post-id');
    const submitBtn = document.getElementById('submit-btn');

    let currentUser = localStorage.getItem('currentUser');
    const ADMIN_USER = 'Trung Kien';

    const challenges = [
        "Hãy vẽ một con mèo đang đội mũ phi hành gia.",
        "Viết một câu chuyện 100 chữ về một hành tinh bí ẩn.",
        "Sáng tác một giai điệu ngắn về tiếng mưa rơi.",
        "Thiết kế logo cho một tiệm bánh ngọt ngoài vũ trụ.",
        "Vẽ một bức tranh phong cảnh từ trí tưởng tượng của bạn."
    ];

    let posts = [];

    function savePosts() {
        localStorage.setItem('creativePosts', JSON.stringify(posts));
    }

    function loadPosts() {
    const savedPosts = localStorage.getItem('creativePosts');
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
    } else {
        posts = [
            // Thêm tên dự án của anh vào đầu đường dẫn
            { id: '1', author: 'Khách', text: "Tác phẩm của bạn A", image: "/tkyl/1.jpg", likes: 5, comments: ["Đẹp quá bạn ơi!", "Ý tưởng hay thật!"] },
            { id: '2', author: 'Khách', text: "Tác phẩm của bạn B", image: "/tkyl/2.jpg", likes: 10, comments: ["Bức ảnh này rất có chiều sâu!", "Thích phong cách này quá."] }
        ];
    }
}
    function getDailyChallenge() {
        const today = new Date();
        const day = today.getDate();
        const challengeIndex = (day - 1) % challenges.length;
        challengeText.innerText = challenges[challengeIndex];
    }

    function renderPosts() {
        postsContainer.innerHTML = '';
        posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-item');

            const postHeader = document.createElement('div');
            postHeader.classList.add('post-header');
            postHeader.innerHTML = `<h4>${post.author}</h4>`;

            const imageElement = document.createElement('img');
            imageElement.src = post.image;
            imageElement.alt = post.text;
            
            const textElement = document.createElement('p');
            textElement.innerText = post.text;
            
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
            postElement.appendChild(imageElement);
            postElement.appendChild(textElement);
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
        
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const post = posts.find(p => p.id === id);
                if (post) {
                    post.likes = (post.likes || 0) + 1;
                    savePosts();
                    renderPosts();
                }
            });
        });

        const commentInputs = document.querySelectorAll('.comment-input');
        commentInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && currentUser) {
                    const id = e.currentTarget.dataset.id;
                    const commentText = e.currentTarget.value;
                    const post = posts.find(p => p.id === id);
                    if (commentText.trim() !== '' && post) {
                        if (!post.comments) {
                            post.comments = [];
                        }
                        const newComment = {text: commentText, likes: 0, author: currentUser};
                        post.comments.push(newComment);
                        savePosts();
                        renderPosts();
                    }
                } else if (e.key === 'Enter' && !currentUser) {
                    alert("Vui lòng đăng nhập để bình luận!");
                }
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = e.currentTarget.dataset.id;
                const postIndex = posts.findIndex(p => p.id === idToDelete);
                if (postIndex !== -1) {
                    posts.splice(postIndex, 1);
                    savePosts();
                    renderPosts();
                }
            });
        });

        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToEdit = e.currentTarget.dataset.id;
                const postToEdit = posts.find(p => p.id === idToEdit);
                if (postToEdit) {
                    postTitleInput.value = postToEdit.text;
                    postIdInput.value = postToEdit.id;
                    submitBtn.innerText = 'Cập nhật';
                    modal.style.display = 'block';
                }
            });
        });

        // Xử lý sự kiện cho bình luận
        const deleteCommentButtons = document.querySelectorAll('.delete-comment-btn');
        deleteCommentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = e.currentTarget.dataset.postId;
                const commentIndex = e.currentTarget.dataset.commentIndex;
                const post = posts.find(p => p.id === postId);
                if (post && (post.comments[commentIndex].author === currentUser || currentUser === ADMIN_USER)) {
                    post.comments.splice(commentIndex, 1);
                    savePosts();
                    renderPosts();
                } else if (!currentUser) {
                    alert("Vui lòng đăng nhập để xóa bình luận!");
                } else {
                     alert("Bạn không có quyền xóa bình luận này!");
                }
            });
        });

        const likeCommentButtons = document.querySelectorAll('.like-comment-btn');
        likeCommentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = e.currentTarget.dataset.postId;
                const commentIndex = e.currentTarget.dataset.commentIndex;
                const post = posts.find(p => p.id === postId);
                 if (post) {
                    post.comments[commentIndex].likes = (post.comments[commentIndex].likes || 0) + 1;
                    savePosts();
                    renderPosts();
                }
            });
        });

        const editCommentButtons = document.querySelectorAll('.edit-comment-btn');
        editCommentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = e.currentTarget.dataset.postId;
                const commentIndex = e.currentTarget.dataset.commentIndex;
                const post = posts.find(p => p.id === postId);
                if (post && (post.comments[commentIndex].author === currentUser || currentUser === ADMIN_USER)) {
                    const newCommentText = prompt("Chỉnh sửa bình luận:", post.comments[commentIndex].text);
                    if (newCommentText !== null && newCommentText.trim() !== '') {
                        post.comments[commentIndex].text = newCommentText;
                        savePosts();
                        renderPosts();
                    }
                } else if (!currentUser) {
                    alert("Vui lòng đăng nhập để sửa bình luận!");
                } else {
                     alert("Bạn không có quyền sửa bình luận này!");
                }
            });
        });
    }

    function updateUI() {
        if (currentUser) {
            loginForm.style.display = 'none';
            userInfo.style.display = 'flex';
            userDisplay.innerText = `Chào, ${currentUser}!`;
            uploadBtn.style.display = 'block';
        } else {
            loginForm.style.display = 'flex';
            userInfo.style.display = 'none';
            uploadBtn.style.display = 'none';
        }
        renderPosts();
    }

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

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postId = postIdInput.value;
        const postTitle = postTitleInput.value;
        const postImageInput = document.getElementById('post-image');
        const postImageFile = postImageInput.files.length > 0 ? postImageInput.files[0] : null;

        if (postId) { // Chức năng sửa bài viết
            const postToUpdate = posts.find(p => p.id === postId);
            if (postToUpdate) {
                postToUpdate.text = postTitle;
                if (postImageFile) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        postToUpdate.image = reader.result;
                        savePosts();
                        renderPosts();
                        modal.style.display = "none";
                        uploadForm.reset();
                        submitBtn.innerText = 'Đăng tác phẩm';
                    };
                    reader.readAsDataURL(postImageFile);
                } else {
                    savePosts();
                    renderPosts();
                    modal.style.display = "none";
                    uploadForm.reset();
                    submitBtn.innerText = 'Đăng tác phẩm';
                }
            }
        } else { // Chức năng đăng bài mới
            if (postTitle && postImageFile && currentUser) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Image = reader.result;
                    const newPost = {
                        id: Date.now().toString(),
                        author: currentUser,
                        text: postTitle,
                        image: base64Image,
                        likes: 0,
                        comments: []
                    };
                    posts.unshift(newPost);
                    savePosts();
                    renderPosts();
                    modal.style.display = "none";
                    uploadForm.reset();
                };
                reader.readAsDataURL(postImageFile);
            } else if (!currentUser) {
                alert("Vui lòng đăng nhập để gửi tác phẩm!");
            }
        }
    });

    uploadBtn.addEventListener('click', () => {
        if (currentUser) {
            modal.style.display = "block";
            postTitleInput.value = '';
            postIdInput.value = '';
            submitBtn.innerText = 'Đăng tác phẩm';
        } else {
            alert("Vui lòng đăng nhập để gửi tác phẩm!");
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        uploadForm.reset();
        submitBtn.innerText = 'Đăng tác phẩm';
        postIdInput.value = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            uploadForm.reset();
            submitBtn.innerText = 'Đăng tác phẩm';
            postIdInput.value = '';
        }
    });

    loadPosts();
    getDailyChallenge();
    updateUI();

});

