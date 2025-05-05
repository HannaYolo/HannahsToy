const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));  // 使用当前目录作为静态文件目录

// 根路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 动画生成 API 端点
app.post('/api/generate-animation', async (req, res) => {
    try {
        const { prompt, duration, fps, style } = req.body;
        
        // 构建 SVD 请求
        const svdRequest = {
            inputs: {
                image: prompt,  // 这里需要将文本转换为图片
                num_frames: Math.min(25, duration * fps),  // 最大25帧
                num_inference_steps: 20,
                motion_bucket_id: 127,
                fps: parseInt(fps)
            }
        };

        // 调用 SVD API
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/stabilityai/stable-video-diffusion-img2vid-xt',
            svdRequest,
            {
                headers: {
                    'Authorization': 'Bearer YOUR_HUGGINGFACE_API_KEY',
                    'Content-Type': 'application/json'
                }
            }
        );

        // 获取生成的视频
        const videoData = response.data;
        
        res.json({
            success: true,
            videoUrl: videoData.url
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: '生成失败: ' + error.message
        });
    }
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
    console.log(`服务器运行在 http://localhost:${port}`);
    console.log('其他设备可以通过您的IP地址访问，例如：http://192.168.1.xxx:3000');
}); 