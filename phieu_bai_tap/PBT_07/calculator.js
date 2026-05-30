function calculate(num1, operator, num2) {
    // 1. Kiểm tra đầu vào không phải số (bao gồm cả trường hợp là NaN)
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || Number.isNaN(num1) || Number.isNaN(num2)) {
        return "Lỗi: Đầu vào (num1 và num2) phải là một số hợp lệ!";
    }

    // 2. Kiểm tra trường hợp chia cho số 0 (áp dụng cho cả phép chia / và phép chia lấy dư %)
    if ((operator === '/' || operator === '%') && num2 === 0) {
        return `Lỗi: Phép tính không hợp lệ! Không thể thực hiện phép ${operator} cho số 0.`;
    }

    // 3. Xử lý tính toán dựa trên toán tử (operator)
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        case "**":
            return num1 ** num2; // Phép toán lũy thừa
        default:
            // 4. Xử lý toán tử không hợp lệ
            return `Lỗi: Toán tử "${operator}" không hợp lệ! Chỉ chấp nhận +, -, *, /, %, **`;
    }
}

