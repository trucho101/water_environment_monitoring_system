
import React, { useState, useRef, useEffect } from 'react';
import { AiChatMessage } from '../types';
import { analyzeWaterQuality } from '../services/geminiService';

const AiAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    { role: 'model', content: 'Xin chào! Tôi là trợ lý AI phân tích chất lượng nước. Bạn muốn biết thông tin gì hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: AiChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await analyzeWaterQuality(input);
      const modelMessage: AiChatMessage = { role: 'model', content: response };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: AiChatMessage = { role: 'error', content: 'Đã có lỗi xảy ra. Vui lòng thử lại.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-800 rounded-lg shadow-lg">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-white">Trợ lý AI Phân tích Dữ liệu</h2>
        <p className="text-sm text-gray-400">Hỏi bất cứ điều gì về dữ liệu chất lượng nước hiện tại.</p>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role !== 'user' && <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 font-bold">AI</div>}
            <div className={`max-w-xl p-3 rounded-lg ${
                msg.role === 'user' ? 'bg-sky-600 text-white' : 
                msg.role === 'model' ? 'bg-slate-700 text-gray-200' : 'bg-red-800 text-white'
            }`}>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 font-bold">AI</div>
                <div className="max-w-xl p-3 rounded-lg bg-slate-700 text-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-700">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ví dụ: Tình hình ở Sông Tô Lịch thế nào?"
            disabled={isLoading}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-sky-600 text-white font-semibold rounded-lg px-5 py-3 transition-colors hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiAssistantView;
