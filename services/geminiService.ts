
import { GoogleGenAI } from "@google/genai";
import { SENSOR_LOCATIONS, HISTORICAL_DATA } from '../constants';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const analyzeWaterQuality = async (prompt: string): Promise<string> => {
    try {
        const fullPrompt = `
            Bạn là một chuyên gia phân tích dữ liệu môi trường nước. Dựa vào dữ liệu quan trắc thời gian thực và lịch sử dưới đây, hãy trả lời câu hỏi của người dùng một cách chi tiết và dễ hiểu.

            **Dữ liệu Hiện Tại:**
            ${JSON.stringify(SENSOR_LOCATIONS, null, 2)}

            **Dữ liệu Lịch Sử (24 giờ qua):**
            (Dữ liệu mẫu cho một trạm)
            ${JSON.stringify(HISTORICAL_DATA['sensor-01'].slice(-5), null, 2)}

            **Câu hỏi của người dùng:**
            "${prompt}"

            **Yêu cầu:**
            1. Phân tích câu hỏi và sử dụng dữ liệu được cung cấp để trả lời.
            2. Nếu câu hỏi liên quan đến một chỉ số cụ thể (pH, nhiệt độ, độ đục, oxy hòa tan), hãy giải thích ý nghĩa của chỉ số đó và mức độ an toàn.
            3. Đưa ra nhận định tổng quan về chất lượng nước nếu có thể.
            4. Trả lời bằng tiếng Việt.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Xin lỗi, đã có lỗi xảy ra khi kết nối với trợ lý AI. Vui lòng thử lại sau.";
    }
};
