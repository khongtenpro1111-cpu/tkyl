// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Khai báo các phần tử DOM
    const challengeText = document.getElementById('challenge-text');
    const uploadBtn = document.getElementById('upload-btn');
    const postsContainer = document.getElementById('posts-container');
    const topPostsContainer = document.getElementById('top-posts-container');
    const uploadFormModal = document.getElementById('upload-modal');
    const challengeModal = document.getElementById('challenge-modal');
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameInput = document.getElementById('username-input');
    const userInfo = document.getElementById('user-info');
    const userDisplay = document.getElementById('user-display');
    const postTitleInput = document.getElementById('post-title');
    const postIdInput = document.getElementById('post-id');
    const submitBtn = document.getElementById('submit-btn');
    const searchInput = document.getElementById('search-input');
    const proposeChallengeBtn = document.getElementById('propose-challenge-btn');
    const challengeForm = document.getElementById('challenge-form');
    const newChallengeInput = document.getElementById('new-challenge-text');
    const proposedChallengesContainer = document.getElementById('proposed-challenges-container');
    const postImageInput = document.getElementById('post-image');
    const challengeIdInput = document.getElementById('challenge-id');
    
    // Khai báo các phần tử truyện và kỹ năng mềm
    const storyListContainer = document.getElementById('story-list-container');
    const storyContentContainer = document.getElementById('story-content-container');
    const storyTitle = document.getElementById('story-title');
    const storyText = document.getElementById('story-text');
    const backToStoriesBtn = document.getElementById('back-to-stories-btn');

    const softSkillsListContainer = document.getElementById('soft-skills-list-container');
    const softSkillsContentContainer = document.getElementById('soft-skills-content-container');
    const softSkillsTitle = document.getElementById('soft-skills-title');
    const softSkillsText = document.getElementById('soft-skills-text');
    const backToSoftSkillsBtn = document.getElementById('back-to-soft-skills-btn');

    // Khai báo các phần tử bán hàng và giỏ hàng
    const techProductsContainer = document.getElementById('tech-products-container');
    const productDetailContainer = document.getElementById('product-detail-container');
    const productDetailContent = document.getElementById('product-detail-content');
    const backToProductsBtn = document.getElementById('back-to-products-btn');
    const openCartBtn = document.getElementById('open-cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotal = document.getElementById('cart-total');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const closeBtns = document.querySelectorAll('.close-btn');

    let currentUser = localStorage.getItem('currentUser');
    const ADMIN_USER = 'Trung Kien';

    // Dữ liệu tĩnh
    const challenges = [
        "Hãy vẽ một con mèo đang đội mũ phi hành gia.",
        "Viết một câu chuyện 100 chữ về một hành tinh bí ẩn.",
        "Sáng tác một giai điệu ngắn về tiếng mưa rơi.",
        "Thiết kế logo cho một tiệm bánh ngọt ngoài vũ trụ.",
        "Vẽ một bức tranh phong cảnh từ trí tưởng tượng của bạn."
    ];

    const stories = [
        {title: "Chuyến du hành vũ trụ", content: "Trong một đêm trăng tròn, một chú mèo con đã quyết định thực hiện chuyến du hành đầu tiên của mình..." },
        {title: "Bức tranh bị lãng quên", content: "Một họa sĩ già sống một mình trong căn gác xép, ông luôn giữ một bức tranh đã cũ..." },
        {title: "Bí mật của khu vườn", content: "Bên trong khu vườn cũ kỹ của bà ngoại là một bí mật mà không ai biết, một cánh cửa dẫn đến thế giới đầy kỳ diệu và ma thuật..." },
        {title: "Hòn đảo ánh trăng", content: "Mỗi năm một lần, khi trăng lên cao nhất, một hòn đảo nhỏ sẽ hiện lên từ đại dương. Nơi đó chứa đựng những báu vật không thể tưởng tượng..." },
        {title: "Lời nguyền của chiếc đồng hồ cát", content: "Chiếc đồng hồ cát cổ xưa trong thư viện cất giấu một lời nguyền. Mỗi hạt cát rơi xuống, một ký ức lại tan biến..." },
        {title: "Thành phố dưới lòng đất", content: "Trong một thế giới hậu tận thế, một nhóm người sống sót đã tìm thấy một thành phố cổ đại dưới lòng đất..." },
        {title: "Phù thủy và chú rồng con", content: "Một phù thủy già đã dành cả đời mình để tìm kiếm một chú rồng. Nhưng khi tìm thấy, chú rồng đó lại chỉ là một quả trứng nhỏ..." },
        {title: "Đôi giày biết bay", content: "Một đôi giày cũ đã được trao cho một cậu bé nghèo. Đôi giày đó có phép thuật, có thể giúp cậu bé bay lên trời cao..." },
        {title: "Chiếc hộp nhạc của thời gian", content: "Chiếc hộp nhạc của bà ngoại có thể đưa một cô bé quay về quá khứ. Cô bé đã dùng chiếc hộp đó để gặp lại cha mẹ của mình..." },
        {title: "Vùng đất của những giấc mơ", content: "Có một vùng đất mà chỉ những người đang ngủ mới có thể đến. Ở đó, mọi giấc mơ đều trở thành hiện thực..." },
        {title: "Hạt giống của sự sống", content: "Trong một thế giới khô cằn, một cô gái đã tìm thấy một hạt giống nhỏ. Hạt giống đó có phép thuật, có thể mang lại sự sống cho tất cả mọi thứ..." },
        {title: "Lá thư từ tương lai", content: "Một lá thư đã được gửi đến một cô gái từ tương lai. Lá thư đó đã tiết lộ cho cô gái biết về những bí mật của thế giới..." },
        {title: "Chiếc gương của sự thật", content: "Chiếc gương cũ trong căn phòng của một cô gái có thể cho cô gái thấy sự thật của mọi thứ..." },
        {title: "Tiệm bánh ngọt của các vị thần", content: "Có một tiệm bánh ngọt mà chỉ các vị thần mới có thể đến. Ở đó, mọi loại bánh ngọt đều có phép thuật..." },
        {title: "Cuộc phiêu lưu của người cuối cùng", content: "Trong một thế giới bị diệt vong, một người đàn ông đã sống sót. Anh đã quyết định thực hiện một cuộc phiêu lưu cuối cùng để tìm kiếm một vùng đất mới..." },
        {title: "Bóng ma của tòa lâu đài", content: "Trong một tòa lâu đài cổ, có một bóng ma đã sống hàng trăm năm. Bóng ma đó đã chứng kiến nhiều câu chuyện bi thương và đã quyết định giúp một cô gái trẻ tìm thấy hạnh phúc của mình."
        },
        {
            title: "Danh mục kỹ năng mềm",
            content: "1. Kỹ năng giao tiếp: Giao tiếp hiệu quả là khả năng truyền đạt thông tin một cách rõ ràng, mạch lạc, đồng thời lắng nghe và thấu hiểu người khác.\n2. Kỹ năng làm việc nhóm: Đây là khả năng hợp tác, chia sẻ trách nhiệm và hỗ trợ lẫn nhau để đạt được mục tiêu chung.\n3. Kỹ năng giải quyết vấn đề: Là quá trình phân tích tình huống, tìm ra nguyên nhân và đưa ra các giải pháp hiệu quả.\n4. Kỹ năng tư duy phản biện: Khả năng phân tích, đánh giá thông tin một cách khách quan để đưa ra kết luận hợp lý.\n5. Kỹ năng quản lý thời gian: Tổ chức và sắp xếp công việc một cách hợp lý để hoàn thành mục tiêu đúng hạn.\n6. Kỹ năng thích ứng: Khả năng thay đổi và điều chỉnh hành vi, suy nghĩ để đối phó với những thay đổi và tình huống mới.\n7. Kỹ năng lãnh đạo: Khả năng truyền cảm hứng, hướng dẫn và dẫn dắt một nhóm người để đạt được mục tiêu chung."
        }
    ];

    const softSkills = [
        {title: "Kỹ năng giao tiếp", content: "Giao tiếp hiệu quả là khả năng truyền đạt thông tin một cách rõ ràng, mạch lạc, đồng thời lắng nghe và thấu hiểu người khác. Nó bao gồm cả ngôn ngữ cơ thể, giọng nói và thái độ. Giao tiếp tốt giúp xây dựng mối quan hệ, giải quyết xung đột và làm việc nhóm hiệu quả."},
        {title: "Kỹ năng làm việc nhóm", content: "Làm việc nhóm là khả năng hợp tác, chia sẻ trách nhiệm và hỗ trợ lẫn nhau để đạt được mục tiêu chung. Kỹ năng này đòi hỏi sự tin tưởng, tôn trọng và sự đồng lòng giữa các thành viên. Một nhóm làm việc hiệu quả sẽ tận dụng được điểm mạnh của từng cá nhân."},
        {title: "Kỹ năng giải quyết vấn đề", content: "Giải quyết vấn đề là quá trình phân tích tình huống, tìm ra nguyên nhân và đưa ra các giải pháp hiệu quả. Kỹ năng này giúp bạn đối mặt với các thách thức trong công việc và cuộc sống một cách bình tĩnh và có hệ thống. Nó bao gồm việc thu thập thông tin, đánh giá các lựa chọn và thực hiện giải pháp."},
        {title: "Kỹ năng tư duy phản biện", content: "Tư duy phản biện là khả năng phân tích, đánh giá thông tin một cách khách quan để đưa ra kết luận hợp lý. Kỹ năng này giúp bạn tránh bị lừa dối, đưa ra các quyết định sáng suốt và phát triển bản thân. Nó bao gồm việc đặt câu hỏi, phân tích dữ liệu và xem xét nhiều góc độ khác nhau."},
        {title: "Kỹ năng quản lý thời gian", content: "Quản lý thời gian là tổ chức và sắp xếp công việc một cách hợp lý để hoàn thành mục tiêu đúng hạn. Kỹ năng này giúp bạn làm việc hiệu quả hơn, giảm căng thẳng và có nhiều thời gian hơn cho bản thân. Nó bao gồm việc lập kế hoạch, ưu tiên công việc và tránh trì hoãn."},
        {title: "Kỹ năng thích ứng", content: "Thích ứng là khả năng thay đổi và điều chỉnh hành vi, suy nghĩ để đối phó với những thay đổi và tình huống mới. Kỹ năng này giúp bạn tồn tại và phát triển trong một môi trường thay đổi liên tục. Nó bao gồm việc học hỏi cái mới, chấp nhận thử thách và tìm kiếm cơ hội từ khó khăn."},
        {title: "Kỹ năng lãnh đạo", content: "Lãnh đạo là khả năng truyền cảm hứng, hướng dẫn và dẫn dắt một nhóm người để đạt được mục tiêu chung. Kỹ năng này không chỉ dành cho các nhà quản lý mà còn cho bất kỳ ai muốn tạo ra sự ảnh hưởng tích cực đến người khác. Nó bao gồm việc đưa ra quyết định, truyền đạt tầm nhìn và tạo động lực cho đội nhóm."}
    ];

    const techProducts = [
        { id: 't1', name: "Kính thực tế ảo X-Vision", description: "Trải nghiệm thế giới ảo sống động như thật với công nghệ X-Vision đột phá.", price: "20.000.000 VNĐ", image: "https://imgs.search.brave.com/brTZo6vVnlDftA6iAeaxo1SFdrwlujy6BMebvGXgvqw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/LmZwdHNob3AuY29t/LnZuL3Vuc2FmZS9V/cGxvYWRzL2ltYWdl/cy90aW4tdHVjLzE4/MDU0MC9PcmlnaW5h/bHMva2luaC12ci0x/NC5qcGVn" },
        { id: 't2', name: "Máy bay không người lái Nano-Drone", description: "Máy bay không người lái siêu nhỏ gọn, điều khiển bằng cử chỉ tay, hoàn hảo cho việc khám phá và quay phim.", price: "5.000.000 VNĐ", image: "https://imgs.search.brave.com/JdIwAMPeWOwCvpSbPyNvUrqORsfWkbqKau_EYu4hrgI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/YmFiYS1ibG9nLmNv/bS8yMDIzLzEyL2Et/d2hpdGUtZHJvbmUt/d2l0aC1hLXByb3Bl/bGxlci1ndWFyZC1v/bi13aGl0ZS1iYWNr/Z3JvdW5kLmpwZWc_/eC1vc3MtcHJvY2Vz/cz1zdHlsZS9mdWxs" },
        { id: 't3', name: "Đồng hồ thông minh Quantum", description: "Đồng hồ thông minh với màn hình cong linh hoạt, theo dõi sức khỏe toàn diện và kết nối mọi lúc mọi nơi.", price: "12.500.000 VNĐ", image: "https://imgs.search.brave.com/BDjm8Z73-L_QXFlig2Yz8imqZh1D_6i6Qomc8cV86BA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kaWRv/bmd2aWV0LnZuL19u/ZXh0L2ltYWdlP3Vy/bD1odHRwczovL2Nk/bi12Mi5kaWRvbmd2/aWV0LnZuL2ZpbGVz/L3Byb2R1Y3RzLzIw/MjUvNC8xNS8xLzE3/NDcyOTQ5MDA5NDFf/ZG9uZ19ob190aG9u/Z19taW5oX2h1YXdl/aV93YXRjaF9maXRf/NF90aW1fMy5wbmcm/dz0zODQwJnE9NzU" },
        { id: 't4', name: "Robot trợ lý gia đình A-Bot", description: "Robot A-Bot tự động dọn dẹp, nấu ăn và là người bạn đồng hành thông minh cho cả gia đình.", price: "35.000.000 VNĐ", image: "https://imgs.search.brave.com/qNuiO-XorjVo0w1AjQDnBhvu1AwUOW3gQF7iWWhaQ1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbnRl/Y2gtZ3JvdXAudm4v/dXBsb2Fkcy9ub2lk/dW5nL2ltYWdlcy9y/b2JvdC1sYS1naS5q/cGc" },
        { id: 't5', name: "Bút vẽ 3D Holo-Pen", description: "Bút vẽ 3D tạo ra các tác phẩm nghệ thuật trong không gian, mang đến một trải nghiệm sáng tạo hoàn toàn mới.", price: "8.000.000 VNĐ", image: "https://imgs.search.brave.com/JitzBv_q7ff80PrCjak-wNpA2o5xY3uU8TfpUvjTzb0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iaXp3/ZWIuZGt0Y2RuLm5l/dC90aHVtYi9tZWRp/dW0vMTAwLzQ3Mi8w/OTEvcHJvZHVjdHMv/ejM5NjQ5NTAzNTMy/OTgtZTlkM2I3MTVk/MTI2ODllZjU0N2Y5/NDU4MmJjYTQ4NGUu/anBnP3Y9MTY3MTcz/Mjg4MzM5Nw" }
    ];

    // Dữ liệu động
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let posts = [];
    let proposedChallenges = [];

    // Các hàm xử lý dữ liệu (lưu/tải)
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    function savePosts() {
        localStorage.setItem('creativePosts', JSON.stringify(posts));
    }
    function loadPosts() {
        const savedPosts = localStorage.getItem('creativePosts');
        if (savedPosts) {
            posts = JSON.parse(savedPosts);
        } else {
            posts = [
                { id: '1', author: 'Khách', text: "Tác phẩm của bạn A", image: "assets/image/1.jpg", likes: 5, comments: [{text:"Đẹp quá bạn ơi!", likes: 0, author: "Khách"}, {text: "Ý tưởng hay thật!", likes: 0, author: "Khách"}] },
                { id: '2', author: 'Khách', text: "Tác phẩm của bạn B", image: "assets/image/2.jpg", likes: 10, comments: [{text: "Bức ảnh này rất có chiều sâu!", likes: 0, author: "Khách"}, {text: "Thích phong cách này quá.", likes: 0, author: "Khách"}] }
            ];
        }
    }
    function saveChallenges() {
        localStorage.setItem('proposedChallenges', JSON.stringify(proposedChallenges));
    }
    function loadChallenges() {
        const savedChallenges = localStorage.getItem('proposedChallenges');
        if (savedChallenges) {
            proposedChallenges = JSON.parse(savedChallenges);
        } else {
            proposedChallenges = [
                { id: 'c1', text: "Viết một bài thơ về mùa hè", votes: 3, voters: [] },
                { id: 'c2', text: "Vẽ một siêu anh hùng mới", votes: 2, voters: [] },
            ];
        }
    }
    
    // Các hàm xử lý giỏ hàng và thanh toán
    function addToCart(productId) {
        const product = techProducts.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            saveCart();
            alert(`${product.name} đã được thêm vào giỏ hàng!`);
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
            cartTotal.innerText = '0 VNĐ';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                const priceValue = parseInt(item.price.replace(/\./g, '').replace(' VNĐ', ''));
                const itemTotal = priceValue * item.quantity;
                total += itemTotal;

                itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <p>${item.name}</p>
                        <p class="cart-item-price">Giá: ${item.price}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-from-cart-btn" data-id="${item.id}">Xóa</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
            cartTotal.innerText = `${total.toLocaleString('vi-VN')} VNĐ`;

            const quantityButtons = document.querySelectorAll('.quantity-btn');
            quantityButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.currentTarget.dataset.id;
                    const action = e.currentTarget.classList.contains('increase-btn') ? 'increase' : 'decrease';
                    updateCartQuantity(productId, action);
                });
            });

            const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
            removeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.currentTarget.dataset.id;
                    removeFromCart(productId);
                });
            });
        }
    }

    function updateCartQuantity(productId, action) {
        const itemToUpdate = cart.find(item => item.id === productId);
        if (itemToUpdate) {
            if (action === 'increase') {
                itemToUpdate.quantity += 1;
            } else if (action === 'decrease' && itemToUpdate.quantity > 1) {
                itemToUpdate.quantity -= 1;
            } else if (action === 'decrease' && itemToUpdate.quantity === 1) {
                removeFromCart(productId);
                return;
            }
            saveCart();
            renderCart();
        }
    }

    function removeFromCart(productId) {
        const confirmRemove = confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?");
        if (confirmRemove) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            renderCart();
        }
    }

    // Các hàm render giao diện
    function renderStories() {
        storyListContainer.innerHTML = '';
        stories.forEach((story, index) => {
            const storyElement = document.createElement('div');
            storyElement.classList.add('story-item');
            storyElement.dataset.index = index;
            storyElement.innerText = `${index + 1}. ${story.title}`;
            storyListContainer.appendChild(storyElement);
        });

        const storyItems = document.querySelectorAll('.story-item');
        storyItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                const story = stories[index];
                storyTitle.innerText = story.title;
                storyText.innerText = story.content;
                storyListContainer.style.display = 'none';
                storyContentContainer.style.display = 'block';
            });
        });
        backToStoriesBtn.addEventListener('click', () => {
            storyListContainer.style.display = 'grid';
            storyContentContainer.style.display = 'none';
        });
    }

    function renderSoftSkills() {
        softSkillsListContainer.innerHTML = '';
        softSkills.forEach((skill, index) => {
            const skillElement = document.createElement('div');
            skillElement.classList.add('soft-skills-item');
            skillElement.dataset.index = index;
            skillElement.innerText = `${index + 1}. ${skill.title}`;
            softSkillsListContainer.appendChild(skillElement);
        });

        const skillItems = document.querySelectorAll('.soft-skills-item');
        skillItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                const skill = softSkills[index];
                softSkillsTitle.innerText = skill.title;
                softSkillsText.innerText = skill.content;
                softSkillsListContainer.style.display = 'none';
                softSkillsContentContainer.style.display = 'block';
            });
        });
        backToSoftSkillsBtn.addEventListener('click', () => {
            softSkillsListContainer.style.display = 'grid';
            softSkillsContentContainer.style.display = 'none';
        });
    }

    function renderTechProducts() {
        techProductsContainer.innerHTML = '';
        techProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">Giá: ${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Thêm vào giỏ</button>
                <button class="view-detail-btn" data-id="${product.id}">Xem chi tiết</button>
            `;
            techProductsContainer.appendChild(productElement);
        });

        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                addToCart(productId);
            });
        });
        const viewDetailButtons = document.querySelectorAll('.view-detail-btn');
        viewDetailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                renderProductDetail(productId);
            });
        });
    }

    function renderProductDetail(productId) {
        const product = techProducts.find(p => p.id === productId);
        if (product) {
            productDetailContent.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="detail-image">
                <h3 class="detail-title">${product.name}</h3>
                <p class="detail-description">${product.description}</p>
                <p class="detail-price">Giá: ${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Thêm vào giỏ</button>
            `;
            techProductsContainer.style.display = 'none';
            productDetailContainer.style.display = 'block';

            const addToCartBtn = document.querySelector('#product-detail-content .add-to-cart-btn');
            addToCartBtn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                addToCart(productId);
            });
        }
    }


    function getDailyChallenge() {
        const today = new Date();
        const day = today.getDate();
        const topChallenge = proposedChallenges.sort((a, b) => b.votes - a.votes)[0];
        
        if (topChallenge && day % 7 === 0) {
            challengeText.innerText = topChallenge.text;
        } else {
            const challengeIndex = (day - 1) % challenges.length;
            challengeText.innerText = challenges[challengeIndex];
        }
    }

    function renderProposedChallenges() {
        proposedChallengesContainer.innerHTML = '';
        proposedChallenges.forEach((challenge) => {
            const challengeElement = document.createElement('div');
            challengeElement.classList.add('challenge-item');
            
            const challengeTextElement = document.createElement('p');
            challengeTextElement.innerText = challenge.text;

            const challengeActions = document.createElement('div');
            challengeActions.classList.add('challenge-actions');
            
            const voteBtn = document.createElement('button');
            voteBtn.classList.add('vote-btn');
            voteBtn.dataset.id = challenge.id;
            
            if (currentUser && challenge.voters && challenge.voters.includes(currentUser)) {
                voteBtn.innerText = `Hủy bình chọn (${challenge.votes || 0})`;
                voteBtn.classList.add('cancel-vote-btn');
            } else {
                voteBtn.innerText = `Bình chọn (${challenge.votes || 0})`;
            }

            challengeActions.appendChild(voteBtn);

            if (currentUser === ADMIN_USER) {
                const editBtn = document.createElement('button');
                editBtn.classList.add('edit-challenge-btn');
                editBtn.innerText = 'Sửa';
                editBtn.dataset.id = challenge.id;

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-challenge-btn');
                deleteBtn.innerText = 'Xóa';
                deleteBtn.dataset.id = challenge.id;
                
                challengeActions.appendChild(editBtn);
                challengeActions.appendChild(deleteBtn);
            }
            
            challengeElement.appendChild(challengeTextElement);
            challengeElement.appendChild(challengeActions);
            proposedChallengesContainer.appendChild(challengeElement);
        });

        const voteButtons = document.querySelectorAll('.vote-btn');
        voteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!currentUser) {
                    alert("Vui lòng đăng nhập để bình chọn!");
                    return;
                }
                
                const idToVote = e.currentTarget.dataset.id;
                const challengeToUpdate = proposedChallenges.find(c => c.id === idToVote);

                if (challengeToUpdate) {
                    if (challengeToUpdate.voters && challengeToUpdate.voters.includes(currentUser)) {
                        challengeToUpdate.votes = (challengeToUpdate.votes || 0) - 1;
                        challengeToUpdate.voters = challengeToUpdate.voters.filter(voter => voter !== currentUser);
                    } else {
                        challengeToUpdate.votes = (challengeToUpdate.votes || 0) + 1;
                        if (!challengeToUpdate.voters) {
                            challengeToUpdate.voters = [];
                        }
                        challengeToUpdate.voters.push(currentUser);
                    }
                    saveChallenges();
                    renderProposedChallenges();
                    getDailyChallenge();
                }
            });
        });

        const deleteChallengeButtons = document.querySelectorAll('.delete-challenge-btn');
        deleteChallengeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = e.currentTarget.dataset.id;
                const challengeIndex = proposedChallenges.findIndex(c => c.id === idToDelete);
                if (challengeIndex !== -1) {
                    proposedChallenges.splice(challengeIndex, 1);
                    saveChallenges();
                    renderProposedChallenges();
                    getDailyChallenge();
                }
            });
        });

        const editChallengeButtons = document.querySelectorAll('.edit-challenge-btn');
        editChallengeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToEdit = e.currentTarget.dataset.id;
                const challengeToEdit = proposedChallenges.find(c => c.id === idToEdit);
                if (challengeToEdit) {
                    newChallengeInput.value = challengeToEdit.text;
                    challengeIdInput.value = challengeToEdit.id;
                    challengeModal.style.display = 'block';
                }
            });
        });
    }

    function renderPosts(filteredPosts = posts) {
        postsContainer.innerHTML = '';
        filteredPosts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-item');

            const postHeader = document.createElement('div');
            postHeader.classList.add('post-header');
            postHeader.innerHTML = `<h4>${post.author}</h4>`;
            
            if (post.image) {
                const imageElement = document.createElement('img');
                imageElement.src = post.image;
                imageElement.alt = post.text;
                postElement.appendChild(imageElement);
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
        
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const post = posts.find(p => p.id === id);
                if (post) {
                    post.likes = (post.likes || 0) + 1;
                    savePosts();
                    renderPosts();
                    renderTopPosts();
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
                    renderTopPosts();
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
                    uploadFormModal.style.display = 'block';
                }
            });
        });

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
                    renderTopPosts();
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
                    renderTopPosts();
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
            
            if (post.image) {
                const imageElement = document.createElement('img');
                imageElement.src = post.image;
                imageElement.alt = post.text;
                postElement.appendChild(imageElement);
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

    function updateUI() {
        if (currentUser) {
            loginForm.style.display = 'none';
            userInfo.style.display = 'flex';
            userDisplay.innerText = `Chào, ${currentUser}!`;
            uploadBtn.style.display = 'block';
            proposeChallengeBtn.style.display = 'block';
        } else {
            loginForm.style.display = 'flex';
            userInfo.style.display = 'none';
            uploadBtn.style.display = 'none';
            proposeChallengeBtn.style.display = 'none';
        }
        renderPosts();
        renderTopPosts();
        renderProposedChallenges();
        renderStories();
        renderSoftSkills();
        renderTechProducts();
        productDetailContainer.style.display = 'none';
        techProductsContainer.style.display = 'grid';
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

    // Xử lý sự kiện đăng bài
    uploadFormModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const postId = postIdInput.value;
        const postTitle = postTitleInput.value;
        const postImageFile = postImageInput.files.length > 0 ? postImageInput.files[0] : null;

        if (!postTitle && !postImageFile) {
            alert("Vui lòng nhập tiêu đề hoặc chọn một hình ảnh!");
            return;
        }

        if (postId) {
            const postToUpdate = posts.find(p => p.id === postId);
            if (postToUpdate) {
                postToUpdate.text = postTitle;
                if (postImageFile) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        postToUpdate.image = reader.result;
                        savePosts();
                        renderPosts();
                        renderTopPosts();
                        uploadFormModal.style.display = "none";
                        uploadForm.reset();
                        submitBtn.innerText = 'Đăng tác phẩm';
                    };
                    reader.readAsDataURL(postImageFile);
                } else {
                    postToUpdate.image = null;
                    savePosts();
                    renderPosts();
                    renderTopPosts();
                    uploadFormModal.style.display = "none";
                    uploadForm.reset();
                    submitBtn.innerText = 'Đăng tác phẩm';
                }
            }
        } else {
            if (currentUser) {
                const newPost = {
                    id: Date.now().toString(),
                    author: currentUser,
                    text: postTitle,
                    image: null,
                    likes: 0,
                    comments: []
                };

                if (postImageFile) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        newPost.image = reader.result;
                        posts.unshift(newPost);
                        savePosts();
                        renderPosts();
                        renderTopPosts();
                        uploadFormModal.style.display = "none";
                        uploadForm.reset();
                    };
                    reader.readAsDataURL(postImageFile);
                } else {
                    posts.unshift(newPost);
                    savePosts();
                    renderPosts();
                    renderTopPosts();
                    uploadFormModal.style.display = "none";
                    uploadForm.reset();
                }
            } else {
                alert("Vui lòng đăng nhập để gửi tác phẩm!");
            }
        }
    });

    uploadBtn.addEventListener('click', () => {
        if (currentUser) {
            uploadFormModal.style.display = "block";
            postTitleInput.value = '';
            postIdInput.value = '';
            postImageInput.value = '';
            submitBtn.innerText = 'Đăng tác phẩm';
        } else {
            alert("Vui lòng đăng nhập để gửi tác phẩm!");
        }
    });

    proposeChallengeBtn.addEventListener('click', () => {
        if (currentUser) {
            newChallengeInput.value = '';
            challengeIdInput.value = '';
            challengeModal.style.display = 'block';
        } else {
            alert("Vui lòng đăng nhập để đề xuất thử thách!");
        }
    });

    // Xử lý sự kiện giỏ hàng và thanh toán
    openCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCart();
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            cartModal.style.display = 'none';
            checkoutModal.style.display = 'block';
        } else {
            alert("Giỏ hàng của bạn đang trống!");
        }
    });

    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customerName = document.getElementById('customer-name').value;
        const customerAddress = document.getElementById('customer-address').value;
        const customerPhone = document.getElementById('customer-phone').value;
        
        alert(`Cảm ơn anh ${customerName}! Đơn hàng của anh đã được xác nhận. Chúng em sẽ giao đến địa chỉ ${customerAddress} sớm nhất. Tổng tiền là ${cartTotal.innerText}.`);
        
        cart = [];
        saveCart();
        checkoutModal.style.display = 'none';
        renderCart();
    });

    // Xử lý sự kiện quay lại danh sách sản phẩm
    backToProductsBtn.addEventListener('click', () => {
        techProductsContainer.style.display = 'grid';
        productDetailContainer.style.display = 'none';
    });

    // Xử lý sự kiện đóng các modal chung
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            uploadFormModal.style.display = "none";
            challengeModal.style.display = "none";
            uploadForm.reset();
            submitBtn.innerText = 'Đăng tác phẩm';
            postIdInput.value = '';
            challengeForm.reset();
            challengeIdInput.value = '';
            cartModal.style.display = "none";
            checkoutModal.style.display = "none";
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == uploadFormModal) {
            uploadFormModal.style.display = "none";
            uploadForm.reset();
            submitBtn.innerText = 'Đăng tác phẩm';
            postIdInput.value = '';
        }
        if (event.target == challengeModal) {
            challengeModal.style.display = "none";
            challengeForm.reset();
            challengeIdInput.value = '';
        }
        if (event.target == cartModal) {
            cartModal.style.display = "none";
        }
        if (event.target == checkoutModal) {
            checkoutModal.style.display = "none";
        }
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

    // Gọi các hàm khởi tạo khi trang tải xong
    loadPosts();
    loadChallenges();
    getDailyChallenge();
    updateUI();
});
