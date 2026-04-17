import Mermaid from './Mermaid';

const ChatBubble = ({ message, onImageClick }) => {
    // Kiểm tra xem đây là sơ đồ tư duy hay văn bản thường
    const isMindmap = message.text?.trim().startsWith('mindmap');

    return (
        <div className={`chat-bubble ${message.sender}`}>
            <div className="avatar">{message.sender === 'ai' ? 'AI' : 'Me'}</div>
            <div className="text-content">
                {isMindmap ? (
                    <Mermaid chart={message.text} onImageClick={onImageClick} />
                ) : (
                    <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                )}
            </div>
        </div>
    );
};
export default ChatBubble;