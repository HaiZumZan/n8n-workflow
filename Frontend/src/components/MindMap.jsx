import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' });

const MindMap = ({ chartCode }) => {
    const containerRef = useRef(null);
    const [pngUrl, setPngUrl] = useState('');
    const [svgHtml, setSvgHtml] = useState('');

    useEffect(() => {
        const renderDiagram = async () => {
            if (!chartCode) return;
            try {
                // Làm sạch mã mermaid từ n8n
                const cleanCode = chartCode.replace(/```mermaid/gi, "").replace(/```/g, "").trim();
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, cleanCode);
                setSvgHtml(svg);
            } catch (err) { console.error("Lỗi vẽ sơ đồ:", err); }
        };
        renderDiagram();
    }, [chartCode]);

    return (
        <div ref={containerRef} className="mindmap-wrapper">
            {svgHtml ? <div dangerouslySetInnerHTML={{ __html: svgHtml }} /> : "Đang vẽ sơ đồ..."}
        </div>
    );
};
export default MindMap;