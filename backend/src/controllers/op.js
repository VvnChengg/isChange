const copylink = async (req, res) => {
    try {
        const link = req.body.link; // 假設你從前端接收到了要複製的連結
        const clipboardy = await import('clipboardy').then(module => module.default);
        await clipboardy.write(link); // 將連結寫入剪貼板
        res.status(200).json({ message: 'Link copied to clipboard' });
    } catch (error) {
        console.error('Failed to copy link:', error);
        res.status(500).json({ error: 'Failed to copy link' });
    }
};

module.exports = {
    copylink
};