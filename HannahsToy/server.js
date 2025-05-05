const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/generate-animation', async (req, res) => {
    try {
        const { prompt, duration, fps, style } = req.body;
        await new Promise(resolve => setTimeout(resolve, 2000));
        res.json({
            success: true,
            videoUrl: 'https://example.com/video.mp4'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: '生成失败'
        });
    }
});

app.listen(port, () => {
    console.log('服务器运行在 http://localhost:' + port);
});
