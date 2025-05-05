document.addEventListener('DOMContentLoaded', () => {
    const previewBox = document.getElementById('preview-box');
    const promptInput = document.getElementById('prompt-input');
    const characterCount = document.querySelector('.character-count');
    const styleButtons = document.querySelectorAll('.style-btn');
    const durationSlider = document.getElementById('duration-slider');
    const durationValue = document.getElementById('duration-value');
    const fpsSelect = document.getElementById('fps-select');
    const generateBtn = document.getElementById('generate-btn');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const downloadBtn = document.getElementById('download-btn');
    const loadingSection = document.getElementById('loading');
    const progressBar = document.getElementById('progress');

    let selectedStyle = 'anime';

    // 更新字符计数
    promptInput.addEventListener('input', () => {
        const count = promptInput.value.length;
        characterCount.textContent = \\/500\;
    });

    // 更新持续时间显示
    durationSlider.addEventListener('input', () => {
        durationValue.textContent = \\s\;
    });

    // 样式选择
    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            styleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedStyle = button.dataset.style;
        });
    });

    // 生成动画
    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('请输入动画描述');
            return;
        }

        loadingSection.style.display = 'block';
        progressBar.style.width = '0%';
        generateBtn.disabled = true;

        try {
            const duration = durationSlider.value;
            const fps = fpsSelect.value;
            const style = selectedStyle;

            const response = await fetch('/api/generate-animation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                    duration,
                    fps,
                    style
                })
            });

            if (!response.ok) {
                throw new Error('生成失败');
            }

            const data = await response.json();
            
            previewBox.innerHTML = \
                <video id=\"animationVideo\" controls>
                    <source src=\"\\" type=\"video/mp4\">
                    您的浏览器不支持视频播放
                </video>
            \;

            playBtn.disabled = false;
            pauseBtn.disabled = false;
            downloadBtn.disabled = false;

            const video = document.getElementById('animationVideo');
            video.addEventListener('play', () => {
                playBtn.disabled = true;
                pauseBtn.disabled = false;
            });
            video.addEventListener('pause', () => {
                playBtn.disabled = false;
                pauseBtn.disabled = true;
            });

        } catch (error) {
            console.error('生成动画时出错:', error);
            alert('生成动画失败，请稍后重试');
        } finally {
            loadingSection.style.display = 'none';
            generateBtn.disabled = false;
        }
    });

    // 播放控制
    playBtn.addEventListener('click', () => {
        const video = document.getElementById('animationVideo');
        if (video) {
            video.play();
        }
    });

    pauseBtn.addEventListener('click', () => {
        const video = document.getElementById('animationVideo');
        if (video) {
            video.pause();
        }
    });

    // 下载
    downloadBtn.addEventListener('click', () => {
        const video = document.getElementById('animationVideo');
        if (video) {
            const link = document.createElement('a');
            link.href = video.src;
            link.download = 'animation.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});
