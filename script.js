document.addEventListener('DOMContentLoaded', () => {
    let items = [
        { 
            title: "Alien Egg Lamp", 
            image: "https://picsum.photos/seed/alien/500/500"
        },
        { 
            title: "NFT Toilet Paper", 
            image: "https://picsum.photos/seed/nft/500/500"
        },
        { 
            title: "Floating Dog Statue", 
            image: "https://picsum.photos/seed/dog/500/500"
        },
        { 
            title: "Crypto Banana", 
            image: "https://picsum.photos/seed/banana/500/500"
        },
        { 
            title: "Invisible Chair", 
            image: "https://picsum.photos/seed/chair/500/500"
        }
    ];

    let currentItem = 0;
    let yes = 0;
    let no = 0;
    let points = 0;

    // 图片上传处理
    document.getElementById('imageUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('itemImage').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 添加新物品
    function addNewItem() {
        const itemName = document.getElementById('itemName').value;
        const itemImage = document.getElementById('itemImage').src;
        
        if (itemName && itemImage) {
            items.push({
                title: itemName,
                image: itemImage
            });
            
            // 清空输入
            document.getElementById('itemName').value = '';
            document.getElementById('itemImage').src = 'https://picsum.photos/500/500';
            
            alert('物品添加成功！');
        } else {
            alert('请填写物品名称并上传图片');
        }
    }

    // 更新显示
    function updateDisplay() {
        const item = items[currentItem];
        document.getElementById('itemImage').src = item.image;
        document.getElementById('itemTitle').textContent = item.title;
        document.getElementById('yesVotes').textContent = `Worth It: ${yes}`;
        document.getElementById('noVotes').textContent = `Not Worth It: ${no}`;
        document.getElementById('points').textContent = points;
    }

    // 投票
    function vote(type) {
        if (type === 'yes') {
            yes++;
            points += 10;
        } else {
            no++;
            points -= 5;
        }
        updateDisplay();
    }

    // 下一个物品
    function nextItem() {
        currentItem = (currentItem + 1) % items.length;
        yes = 0;
        no = 0;
        updateDisplay();
    }

    // 初始化显示
    updateDisplay();

    // 添加全局函数
    window.addNewItem = addNewItem;
    window.vote = vote;
    window.nextItem = nextItem;
}); 
